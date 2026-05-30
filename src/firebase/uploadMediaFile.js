import { auth } from './config'
import { waitForAuthReady } from './authHelpers'
import { uploadMedia } from './cmsService'
import { uploadFileToStorage, isFirebaseStorageUrl } from './mediaStorageService'
import { validateMediaFile } from '../cms/mediaLimits'

async function getIdToken() {
  await waitForAuthReady()
  const user = auth?.currentUser
  if (!user) {
    throw new Error('You must be signed in at /admin/login before uploading.')
  }
  return user.getIdToken(true)
}

/** Dev server: write file to public/media or public/videos */
async function uploadToLocalPublic(file, { onProgress } = {}) {
  const token = await getIdToken()
  onProgress?.(5)

  const body = new FormData()
  body.append('file', file)

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || `Upload failed (${res.status})`)
    if (data.hint) err.hint = data.hint
    throw err
  }

  onProgress?.(100)
  return {
    url: data.url,
    size: data.size ?? file.size,
    type: data.type ?? file.type,
    name: data.name ?? file.name,
    storagePath: null,
    source: 'local',
  }
}

/**
 * Upload image/video → get URL → save row in Firestore `media`.
 * Dev: saves under public/ (short paths). Production: Firebase Storage if configured.
 */
export async function uploadMediaFile(file, { onProgress, accept = 'any' } = {}) {
  const validation = validateMediaFile(file, { accept })
  if (!validation.ok) {
    const err = new Error(validation.error)
    if (validation.hint) err.hint = validation.hint
    throw err
  }

  let uploaded = null

  if (import.meta.env.DEV) {
    try {
      uploaded = await uploadToLocalPublic(file, { onProgress })
    } catch (localErr) {
      console.warn('[upload] Local public upload failed:', localErr.message)
    }
  }

  if (!uploaded) {
    const storageResult = await uploadFileToStorage(file, { onProgress })
    uploaded = {
      url: storageResult.downloadUrl,
      size: storageResult.size,
      type: storageResult.type,
      name: file.name,
      storagePath: storageResult.storagePath,
      source: 'storage',
    }
  }

  const displayName = (file.name || uploaded.url.split('/').pop() || 'media').slice(0, 140)
  const record = await uploadMedia({
    url: uploaded.url,
    name: displayName,
    type: uploaded.type,
    size: uploaded.size,
    source: uploaded.source,
    storagePath: uploaded.storagePath,
  })

  return {
    ...record,
    isStorageUrl: isFirebaseStorageUrl(uploaded.url),
    storagePath: uploaded.storagePath,
  }
}
