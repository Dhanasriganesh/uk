import { auth, isStorageConfigured } from './config'
import { waitForAuthReady } from './authHelpers'
import { uploadMedia } from './cmsService'
import { uploadFileToStorage, isFirebaseStorageUrl } from './mediaStorageService'
import { validateMediaFile } from '../cms/mediaLimits'
import { assertImageFitsInFirestore, readFileAsDataUrl } from './imageDataUrl'

async function getIdToken() {
  await waitForAuthReady()
  const user = auth?.currentUser
  if (!user) {
    throw new Error('You must be signed in at /admin/login before uploading.')
  }
  return user.getIdToken(true)
}

/** Local dev only: save videos/PDFs to public/ */
async function uploadToPublicFolder(file, { onProgress } = {}) {
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

/** Images → base64 data URL saved in Firestore (works on Vercel without Storage). */
async function uploadImageToFirestore(file, { onProgress } = {}) {
  const validation = validateMediaFile(file, { accept: 'image' })
  if (!validation.ok) {
    const err = new Error(validation.error)
    if (validation.hint) err.hint = validation.hint
    throw err
  }

  onProgress?.(15)
  const dataUrl = await readFileAsDataUrl(file)
  assertImageFitsInFirestore(file, dataUrl)
  onProgress?.(85)

  const displayName = (file.name || 'image').slice(0, 140)
  const record = await uploadMedia({
    url: dataUrl,
    name: displayName,
    type: file.type || 'image/jpeg',
    size: file.size,
    source: 'firestore-base64',
    storagePath: null,
  })

  onProgress?.(100)
  return {
    ...record,
    isStorageUrl: false,
    storagePath: null,
  }
}

/**
 * Upload → URL stored in Firestore.
 * - Images: base64 in Firestore (dev + production)
 * - Videos: local public/ in dev only; not on Vercel without Storage
 */
export async function uploadMediaFile(file, { onProgress, accept = 'any' } = {}) {
  const mime = (file.type || '').toLowerCase()
  const isVideo = mime.startsWith('video/') || accept === 'video'
  const isImage =
    mime.startsWith('image/') ||
    accept === 'image' ||
    (/image|logo|photo|background|thumbnail/i.test(accept) && !isVideo)

  if (isImage && !isVideo) {
    return uploadImageToFirestore(file, { onProgress })
  }

  const validation = validateMediaFile(file, { accept })
  if (!validation.ok) {
    const err = new Error(validation.error)
    if (validation.hint) err.hint = validation.hint
    throw err
  }

  if (isVideo && import.meta.env.PROD) {
    const err = new Error('Video upload is not available without Firebase Storage (Blaze plan).')
    err.hint =
      'Paste a YouTube/Vimeo URL, or add the MP4 under public/videos/ in your repo and deploy, then use /videos/your-file.mp4.'
    throw err
  }

  let uploaded = null

  if (import.meta.env.DEV) {
    try {
      uploaded = await uploadToPublicFolder(file, { onProgress })
    } catch (err) {
      console.warn('[upload] Dev public folder upload failed:', err.message)
    }

    if (!uploaded && isStorageConfigured && isVideo) {
      try {
        const storageResult = await uploadFileToStorage(file, { onProgress })
        uploaded = {
          url: storageResult.downloadUrl,
          size: storageResult.size,
          type: storageResult.type,
          name: file.name,
          storagePath: storageResult.storagePath,
          source: 'storage',
        }
      } catch (err) {
        console.warn('[upload] Dev Storage fallback:', err.message)
      }
    }
  }

  if (!uploaded) {
    const err = new Error(
      import.meta.env.DEV
        ? 'Upload failed. Run npm run dev for videos/PDFs, or use Paste URL.'
        : 'This file type cannot be uploaded on the live site without Firebase Storage.'
    )
    throw err
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
