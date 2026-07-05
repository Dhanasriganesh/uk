import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage, auth, isStorageConfigured } from './config'
import { waitForAuthReady } from './authHelpers'
import { validateMediaFile } from '../cms/mediaLimits'
import { isBrokenFirebaseStorageUrl, isFirebaseStorageDownloadUrl } from './resolveStorageMediaUrl'

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

function sanitizeFileName(name) {
  return (name || 'file')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 120)
}

export function buildCmsStoragePath(fileName) {
  return `cms/${Date.now()}_${sanitizeFileName(fileName)}`
}

export function isFirebaseStorageUrl(url) {
  if (!url || typeof url !== 'string') return false
  return (
    url.includes('firebasestorage.googleapis.com') ||
    url.includes('storage.googleapis.com') ||
    url.startsWith('gs://')
  )
}

/**
 * Upload file to Firebase Storage, return public download URL.
 */
export async function uploadFileToStorage(file, { onProgress, target = 'storage', storagePath } = {}) {
  if (!isStorageConfigured || !storage) {
    throw new Error(
      'Firebase Storage is not configured. Add VITE_FIREBASE_STORAGE_BUCKET to .env and enable Storage in Firebase Console.'
    )
  }

  const validation = validateMediaFile(file, { target })
  if (!validation.ok) {
    const err = new Error(validation.error)
    if (validation.hint) err.hint = validation.hint
    throw err
  }

  await ensureUploadAuth()

  const resolvedPath = storagePath || buildCmsStoragePath(file.name)
  const storageRef = ref(storage, resolvedPath)

  await new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file, { contentType: file.type })
    task.on(
      'state_changed',
      (snap) => {
        if (onProgress && snap.totalBytes > 0) {
          onProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
        }
      },
      reject,
      resolve
    )
  })

  const downloadUrl = await getDownloadURL(storageRef)
  if (isBrokenFirebaseStorageUrl(downloadUrl) || !isFirebaseStorageDownloadUrl(downloadUrl)) {
    throw new Error(
      'Upload succeeded but the download URL is invalid. Configure Storage CORS (see FIREBASE_SETUP.md) and try again.'
    )
  }
  return { downloadUrl, storagePath: resolvedPath, size: file.size, type: file.type }
}

export async function deleteStorageObject(storagePath) {
  if (!storagePath || !isStorageConfigured || !storage) return
  try {
    await deleteObject(ref(storage, storagePath))
  } catch {
    // ignore missing objects
  }
}
