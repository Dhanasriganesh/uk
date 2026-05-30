/**
 * Seed Firestore with default pages + local media URLs.
 * Requires admin credentials in .env (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD).
 */
import { createServer } from 'vite'
import { readFileSync, existsSync, mkdirSync, copyFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { signInWithEmailAndPassword } from 'firebase/auth'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

function loadEnvFile() {
  const envPath = path.join(root, '.env')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = val
  }
}

function ensurePublicMedia() {
  const mediaDir = path.join(root, 'public', 'media')
  const logoSrc = path.join(root, 'src', 'assets', 'logo.png')
  const logoDest = path.join(mediaDir, 'logo.png')
  if (!existsSync(logoSrc)) return
  mkdirSync(mediaDir, { recursive: true })
  if (!existsSync(logoDest)) {
    copyFileSync(logoSrc, logoDest)
    console.log('Copied src/assets/logo.png → public/media/logo.png')
  }
}

loadEnvFile()
ensurePublicMedia()

const email = process.env.SEED_ADMIN_EMAIL
const password = process.env.SEED_ADMIN_PASSWORD

if (!email || !password) {
  console.error(
    'Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD in uk/.env\n' +
      'Create an admin in Firebase Auth (Email/Password), add those two variables, then run: npm run seed:local'
  )
  process.exit(1)
}

const vite = await createServer({
  root,
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { auth, isFirebaseConfigured } = await vite.ssrLoadModule('/src/firebase/config.js')
  if (!isFirebaseConfigured || !auth) {
    console.error('Firebase is not configured. Fill VITE_FIREBASE_* in uk/.env')
    process.exit(1)
  }

  const { seedMediaLibrary, savePageContent, saveSiteSettings } = await vite.ssrLoadModule(
    '/src/firebase/cmsService.js'
  )
  const { PAGE_DEFAULTS } = await vite.ssrLoadModule('/src/cms/defaultContent.js')
  const { ALL_PAGE_IDS } = await vite.ssrLoadModule('/src/cms/pageRegistry.js')

  console.log('Signing in…')
  const cred = await signInWithEmailAndPassword(auth, email, password)
  console.log(`Signed in as ${cred.user.email}`)

  console.log('Seeding site settings and pages…')
  await saveSiteSettings(structuredClone(PAGE_DEFAULTS.settings), cred.user.email)
  for (const pageId of ALL_PAGE_IDS) {
    if (pageId === 'settings') continue
    const content = PAGE_DEFAULTS[pageId]
    if (!content) continue
    await savePageContent(pageId, structuredClone(content), cred.user.email)
    console.log(`  ${pageId}`)
  }

  console.log('Seeding media library (collection: media)…')
  const media = await seedMediaLibrary({ migrateLegacy: true })
  console.log(
    `Done. Media: ${media.added} new, ${media.skipped} already present (${media.total} total URLs).`
  )
} catch (err) {
  console.error('Seed failed:', err.message || err)
  if (err.code === 'auth/invalid-credential') {
    console.error('Check SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD match your Firebase Auth user.')
  }
  if (err.code === 'permission-denied') {
    console.error('Publish firestore.rules (media + cms_pages) in Firebase Console.')
  }
  process.exit(1)
} finally {
  await vite.close()
}
