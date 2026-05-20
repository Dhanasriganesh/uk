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

const HEIC_TYPES = ['image/heic', 'image/heif']
const HEIC_EXT = /\.(heic|heif)$/i
/** Firestore document limit is 1 MiB; base64 adds ~33% overhead */
const MAX_IMAGE_BYTES = 750 * 1024

const PAGES_COLLECTION = 'cms_pages'
const MEDIA_COLLECTION = 'cms_media'

export function formatMediaError(error) {
  const code = error?.code || ''
  if (code === 'permission-denied') {
    return 'Permission denied. Sign in at /admin/login and publish Firestore rules (see FIREBASE_SETUP.md).'
  }
  return error?.message || 'Upload failed'
}

async function ensureUploadAuth() {
  if (!auth) throw new Error('Firebase Auth is not configured.')
  await waitForAuthReady()
  const user = auth.currentUser
  if (!user) {
    throw new Error('You must be signed in at /admin/login before uploading.')
  }
  await user.getIdToken(true)
  return user
}

function assertImageFile(file) {
  const type = (file.type || '').toLowerCase()
  if (HEIC_TYPES.includes(type) || HEIC_EXT.test(file.name)) {
    throw new Error('HEIC/HEIF is not supported. Convert to JPG or PNG first.')
  }
  const isImage =
    type.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name)
  if (!isImage) {
    throw new Error(
      'Only images are stored in Firestore (PNG, JPG, WebP, GIF, SVG). For videos, paste an external URL in the content field.'
    )
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(`Image is too large (max ${Math.round(MAX_IMAGE_BYTES / 1024)} KB for Firestore storage).`)
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Could not read image file'))
    reader.readAsDataURL(file)
  })
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
    callback(null)
    return () => {}
  }
  return onSnapshot(
    doc(db, PAGES_COLLECTION, pageId),
    (snap) => {
      callback(snap.exists() ? snap.data().content : null)
    },
    (error) => handleSnapshotError(`cms_pages/${pageId}`, error, callback)
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
    callback(null)
    return () => {}
  }
  return onSnapshot(
    doc(db, 'cms_settings', 'global'),
    (snap) => {
      callback(snap.exists() ? snap.data() : null)
    },
    (error) => handleSnapshotError('cms_settings/global', error, callback)
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

/** Upload image to Firestore as base64 data URL */
export async function uploadMedia(file) {
  if (!db) throw new Error('Firestore is not configured')
  assertImageFile(file)
  const user = await ensureUploadAuth()

  const dataUrl = await fileToDataUrl(file)
  const id = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`

  const record = {
    name: file.name,
    url: dataUrl,
    dataUrl,
    type: file.type || 'image/png',
    size: file.size,
    uploadedBy: user.email || 'admin',
    createdAt: serverTimestamp(),
  }

  await setDoc(doc(db, MEDIA_COLLECTION, id), record)

  return { id, url: dataUrl, name: file.name }
}

export async function listMedia() {
  if (!isFirebaseConfigured || !db) return []
  const snap = await getDocs(collection(db, MEDIA_COLLECTION))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
}

export async function deleteMediaItem(mediaId) {
  if (!db || !mediaId) return
  await deleteDoc(doc(db, MEDIA_COLLECTION, mediaId))
}
