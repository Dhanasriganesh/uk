/**
 * Seed demo carousel images on laminating-wrapping for local testing.
 * Only updates carouselLeft / carouselRight — does not overwrite other page content.
 * Usage: node scripts/seed-carousel-demo.mjs
 */
import { createServer } from 'vite'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const PAGE_ID = 'laminating-wrapping'

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

loadEnvFile()

const email = process.env.SEED_ADMIN_EMAIL
const password = process.env.SEED_ADMIN_PASSWORD

if (!email || !password) {
  console.error('Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD in uk/.env')
  process.exit(1)
}

const DEMO_LEFT = [
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&h=600&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&h=600&q=80',
  'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=900&h=600&q=80',
]

const DEMO_RIGHT = [
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&h=600&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&h=600&q=80',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&h=600&q=80',
]

const vite = await createServer({
  root,
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { auth, db, isFirebaseConfigured } = await vite.ssrLoadModule('/src/firebase/config.js')
  if (!isFirebaseConfigured || !auth || !db) {
    console.error('Firebase is not configured.')
    process.exit(1)
  }

  console.log('Signing in…')
  const cred = await signInWithEmailAndPassword(auth, email, password)

  const pageRef = doc(db, 'cms_pages', PAGE_ID)
  const snap = await getDoc(pageRef)
  if (!snap.exists()) {
    console.error(`Page ${PAGE_ID} not found in Firestore. Run npm run seed:local first.`)
    process.exit(1)
  }

  const existing = snap.data()?.content || {}
  await updateDoc(pageRef, {
    'content.carouselLeft': DEMO_LEFT,
    'content.carouselRight': DEMO_RIGHT,
    updatedAt: serverTimestamp(),
    updatedBy: cred.user.email,
  })

  console.log(`Demo carousels saved for ${PAGE_ID} (gallery and other fields preserved)`)
  console.log(`  Left:  ${DEMO_LEFT.length} images`)
  console.log(`  Right: ${DEMO_RIGHT.length} images`)
  console.log(`  Gallery preserved: ${(existing.gallery || []).filter(Boolean).length} images`)
  console.log('\nOpen: http://localhost:5173/laminating-wrapping')
  console.log('Admin: http://localhost:5173/admin/login')
} catch (err) {
  console.error('Seed failed:', err.message || err)
  process.exit(1)
} finally {
  await vite.close()
}
