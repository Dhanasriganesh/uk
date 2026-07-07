import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore'
import { db, auth, isFirebaseConfigured } from './config'
import { waitForAuthReady } from './authHelpers'
import { isStorageSizeError, storageLimitExceededMessage } from '../cms/mediaLimits'
import {
  buildMediaSeedRecords,
  guessMediaType,
  isShortMediaUrl,
  normalizeShortUrl,
} from '../cms/mediaSeed'
import { writePageContentCache } from '../cms/pageContentCache'

const PAGES_COLLECTION = 'cms_pages'
/** Firestore "media" table — short paths (cms/…, /media/…) or https URLs only. */
export const MEDIA_COLLECTION = 'media'
const LEGACY_MEDIA_COLLECTION = 'cms_media'

export function formatMediaError(error) {
  const code = error?.code || ''
  if (code === 'permission-denied') {
    return 'Permission denied. Sign in at /admin/login before saving media.'
  }
  if (isStorageSizeError(error)) {
    return storageLimitExceededMessage()
  }
  if (error?.hint) {
    return `${error.message} ${error.hint}`
  }
  return error?.message || 'Save failed'
}

async function ensureUploadAuth() {
  if (!auth) throw new Error('Firebase Auth is not configured.')
  await waitForAuthReady()
  const user = auth.currentUser
  if (!user) {
    throw new Error('You must be signed in at /admin/login before saving media.')
  }
  await user.getIdToken(true)
  return user
}

function assertMediaUrl(url) {
  const trimmed = (url || '').trim()
  if (trimmed.startsWith('data:image/')) {
    throw new Error(
      'Base64 images are not supported. Upload the file to Firebase Storage instead (short cms/… URL).'
    )
  }
  if (trimmed.startsWith('cms/')) return trimmed
  const normalized = normalizeShortUrl(url)
  if (!normalized || !isShortMediaUrl(normalized)) {
    throw new Error(
      'Please paste a valid media URL (https://…, /media/…, cms/…) or upload an image file.'
    )
  }
  return normalized
}

function mediaIdFromUrl(url) {
  if (url.startsWith('data:image/')) {
    let hash = 0
    const sample = `${url.length}:${url.slice(64, 128)}`
    for (let i = 0; i < sample.length; i++) {
      hash = (hash * 31 + sample.charCodeAt(i)) | 0
    }
    return `b64_${Math.abs(hash)}_${url.length}`
  }
  const base = url
    .replace(/^https?:\/\//, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '')
  return `url_${base.slice(0, 100)}`
}

function handleSnapshotError(label, error, callback) {
  if (error?.code === 'permission-denied') {
    console.warn(`[CMS] Firestore permission denied for ${label}. See FIREBASE_SETUP.md`)
  } else {
    console.warn(`[CMS] Firestore listener error (${label}):`, error?.message || error)
  }
  callback(null)
}

export async function getPageContent(pageId) {
  if (!isFirebaseConfigured || !db) return null
  const snap = await getDoc(doc(db, PAGES_COLLECTION, pageId))
  return snap.exists() ? snap.data().content : null
}

export function subscribePageContent(pageId, callback) {
  if (!isFirebaseConfigured || !db) {
    callback(null, null)
    return () => {}
  }
  return onSnapshot(
    doc(db, PAGES_COLLECTION, pageId),
    (snap) => {
      if (!snap.exists()) {
        callback(null, null)
        return
      }
      const data = snap.data()
      callback(data.content ?? null, data.updatedAt ?? null)
    },
    (error) => handleSnapshotError(`cms_pages/${pageId}`, error, () => callback(null, null))
  )
}

export async function savePageContent(pageId, content, userEmail) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured. Add credentials to .env')
  }
  await setDoc(
    doc(db, PAGES_COLLECTION, pageId),
    {
      content,
      updatedAt: serverTimestamp(),
      updatedBy: userEmail || 'admin',
    },
    { merge: true }
  )
  writePageContentCache(pageId, content, Date.now())
}

export async function getAllPagesFromFirestore() {
  if (!isFirebaseConfigured || !db) return {}
  const snap = await getDocs(collection(db, PAGES_COLLECTION))
  const result = {}
  snap.forEach((d) => {
    result[d.id] = d.data().content
  })
  return result
}

export async function getSiteSettings() {
  if (!isFirebaseConfigured || !db) return null
  const snap = await getDoc(doc(db, 'cms_settings', 'global'))
  return snap.exists() ? snap.data() : null
}

export function subscribeSiteSettings(callback) {
  if (!isFirebaseConfigured || !db) {
    callback(null, null)
    return () => {}
  }
  return onSnapshot(
    doc(db, 'cms_settings', 'global'),
    (snap) => {
      if (!snap.exists()) {
        callback(null, null)
        return
      }
      const data = snap.data()
      callback(data, data.updatedAt ?? null)
    },
    (error) => handleSnapshotError('cms_settings/global', error, () => callback(null, null))
  )
}

export async function saveSiteSettings(settings, userEmail) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured. Add credentials to .env')
  }
  await setDoc(
    doc(db, 'cms_settings', 'global'),
    {
      ...settings,
      updatedAt: serverTimestamp(),
      updatedBy: userEmail || 'admin',
    },
    { merge: true }
  )
}

function normalizeMediaDoc(id, data) {
  const raw = (data.url || data.dataUrl || '').trim()
  const url = raw.startsWith('data:image/') ? raw : normalizeShortUrl(raw)
  if (!url) return null
  const name =
    data.name ||
    (url.startsWith('data:') ? 'Uploaded image' : url.split('/').pop() || 'media')
  return {
    id,
    name,
    url,
    type: data.type || guessMediaType(url),
    size: data.size ?? null,
    source: data.source || '',
    uploadedBy: data.uploadedBy || '',
    createdAt: data.createdAt,
  }
}

/**
 * Save a media row: short Storage path (cms/…), site path, or https URL in Firestore.
 */
export async function uploadMedia({ url, name, type, size, source, storagePath } = {}) {
  if (!db) throw new Error('Firestore is not configured')
  const user = await ensureUploadAuth()
  const safeUrl = assertMediaUrl(url)
  const safeName = (name || safeUrl.split('/').pop() || 'media').toString().slice(0, 140)
  const id = mediaIdFromUrl(safeUrl)

  const record = {
    name: safeName,
    url: safeUrl,
    type: type || guessMediaType(safeUrl),
    size: Number.isFinite(size) ? size : null,
    source: source || 'manual',
    storagePath: storagePath || null,
    uploadedBy: user.email || 'admin',
    createdAt: serverTimestamp(),
  }

  await setDoc(doc(db, MEDIA_COLLECTION, id), record, { merge: true })

  return { id, url: safeUrl, name: safeName }
}

async function readCollectionMedia(collectionName) {
  if (!db) return []
  const snap = await getDocs(collection(db, collectionName))
  return snap.docs
    .map((d) => normalizeMediaDoc(d.id, d.data()))
    .filter(Boolean)
}

export async function listMedia() {
  if (!isFirebaseConfigured || !db) return []
  const [current, legacy] = await Promise.all([
    readCollectionMedia(MEDIA_COLLECTION),
    readCollectionMedia(LEGACY_MEDIA_COLLECTION),
  ])

  const byUrl = new Map()
  for (const item of [...legacy, ...current]) {
    if (!byUrl.has(item.url)) byUrl.set(item.url, item)
  }

  return [...byUrl.values()].sort(
    (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
  )
}

export async function deleteMediaItem(mediaId) {
  if (!db || !mediaId) return
  await deleteDoc(doc(db, MEDIA_COLLECTION, mediaId)).catch(() => {})
  await deleteDoc(doc(db, LEGACY_MEDIA_COLLECTION, mediaId)).catch(() => {})
}

/**
 * Seed / migrate: local site paths + URLs from default content.
 * Skips base64 data URLs. Does not use Firebase Storage.
 */
export async function seedMediaLibrary({ migrateLegacy = true } = {}) {
  if (!db) throw new Error('Firestore is not configured')
  const user = await ensureUploadAuth()

  const existing = await listMedia()
  const existingUrls = new Set(existing.map((m) => m.url))
  let added = 0
  let skipped = 0

  const records = buildMediaSeedRecords()
  for (const item of records) {
    if (existingUrls.has(item.url)) {
      skipped += 1
      continue
    }
    await setDoc(
      doc(db, MEDIA_COLLECTION, item.id),
      {
        name: item.name,
        url: item.url,
        type: item.type,
        source: item.source,
        uploadedBy: user.email || 'admin',
        createdAt: serverTimestamp(),
      },
      { merge: true }
    )
    existingUrls.add(item.url)
    added += 1
  }

  if (migrateLegacy) {
    const legacySnap = await getDocs(collection(db, LEGACY_MEDIA_COLLECTION))
    for (const d of legacySnap.docs) {
      const data = d.data()
      const url = normalizeShortUrl(data.url || data.dataUrl || '')
      if (!url || url.startsWith('data:') || existingUrls.has(url)) continue
      await setDoc(
        doc(db, MEDIA_COLLECTION, mediaIdFromUrl(url)),
        {
          name: data.name || url.split('/').pop(),
          url,
          type: data.type || guessMediaType(url),
          size: data.size ?? null,
          source: 'migrated',
          uploadedBy: user.email || 'admin',
          createdAt: serverTimestamp(),
        },
        { merge: true }
      )
      existingUrls.add(url)
      added += 1
    }
  }

  return { added, skipped, total: existingUrls.size }
}
