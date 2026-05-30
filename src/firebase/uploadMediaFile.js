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

/** Dev: public folder. Production (Vercel): Firebase Storage via server API (no browser CORS). */
async function uploadViaServerApi(file, { onProgress } = {}) {
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
    storagePath: data.storagePath ?? null,
    source: data.source || (import.meta.env.DEV ? 'local' : 'storage'),
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

  try {
    uploaded = await uploadViaServerApi(file, { onProgress })
  } catch (apiErr) {
    if (import.meta.env.DEV) {
      console.warn('[upload] Server upload API failed:', apiErr.message)
    } else {
      console.warn('[upload] /api/admin/upload failed:', apiErr.message)
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
