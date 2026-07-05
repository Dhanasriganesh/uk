import { auth, isStorageConfigured } from './config'
import { waitForAuthReady } from './authHelpers'
import { normalizeShortUrl } from '../cms/mediaSeed'
import { resolveReplaceTarget } from '../cms/resolveReplacePath'
import { validateMediaFile } from '../cms/mediaLimits'
import { uploadFileToStorage, isFirebaseStorageUrl } from './mediaStorageService'

async function getIdToken() {
  await waitForAuthReady()
  const user = auth?.currentUser
  if (!user) {
    throw new Error('You must be signed in at /admin/login before uploading.')
  }
  return user.getIdToken(true)
}

/**
 * Dev → public/media (vite plugin).
 * Live → Vercel Blob (free) or Firebase Storage fallback via /api/admin/upload.
 * Pass replaceUrl to overwrite the same file path (same URL).
 */
async function uploadViaServerApi(file, { onProgress, replaceUrl } = {}) {
  const token = await getIdToken()
  onProgress?.(5)

  const body = new FormData()
  body.append('file', file)
  if (replaceUrl) body.append('replaceUrl', replaceUrl)

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

  const url =
    typeof data.url === 'string' && data.url.startsWith('http')
      ? data.url
      : normalizeShortUrl(data.url)

  return {
    url,
    size: data.size ?? file.size,
    type: data.type ?? file.type,
    name: data.name ?? file.name,
    storagePath: data.storagePath ?? null,
    source: data.source || (import.meta.env.DEV ? 'local' : 'blob'),
    replaced: Boolean(replaceUrl),
  }
}

async function finalizeUpload(uploaded, file) {
  const shortUrl =
    typeof uploaded.url === 'string' && uploaded.url.startsWith('http')
      ? uploaded.url
      : normalizeShortUrl(uploaded.url)
  const displayName = (file.name || shortUrl.split('/').pop() || 'media').slice(0, 140)

  return {
    id: null,
    url: shortUrl,
    name: displayName,
    isStorageUrl: isFirebaseStorageUrl(shortUrl) || uploaded.source === 'blob',
    storagePath: uploaded.storagePath || null,
    replaced: uploaded.replaced,
  }
}

async function uploadImage(file, { onProgress, replaceUrl } = {}) {
  const validation = validateMediaFile(file, { accept: 'image', target: 'storage' })
  if (!validation.ok) {
    const err = new Error(validation.error)
    if (validation.hint) err.hint = validation.hint
    throw err
  }

  const reuse = resolveReplaceTarget(replaceUrl)
  const failures = []

  try {
    const uploaded = await uploadViaServerApi(file, { onProgress, replaceUrl })
    return finalizeUpload(uploaded, file)
  } catch (err) {
    failures.push(err)
    console.warn('[upload] Server image upload failed:', err.message)
  }

  if (isStorageConfigured && reuse?.kind === 'storage') {
    try {
      const storageResult = await uploadFileToStorage(file, {
        onProgress,
        target: 'storage',
        storagePath: reuse.path,
      })
      return finalizeUpload(
        {
          url: storageResult.downloadUrl,
          storagePath: storageResult.storagePath,
          size: storageResult.size,
          type: storageResult.type,
          source: 'storage',
          replaced: true,
        },
        file
      )
    } catch (err) {
      failures.push(err)
      console.warn('[upload] Client Storage fallback failed:', err.message)
    }
  }

  const err = new Error('Image upload failed.')
  err.hint =
    failures.find((item) => item.hint)?.hint ||
    (import.meta.env.PROD
      ? 'On Vercel: create a Blob store (Storage tab, free on Hobby), redeploy, then try again.'
      : 'Run npm run dev and sign in at /admin/login before uploading.')
  throw err
}

/**
 * Upload → short URL in Firestore (no base64).
 * Pass replaceUrl to overwrite an existing upload (same path / same URL).
 */
export async function uploadMediaFile(file, { onProgress, accept = 'any', replaceUrl } = {}) {
  const mime = (file.type || '').toLowerCase()
  const isVideo = mime.startsWith('video/') || accept === 'video'
  const isImage =
    mime.startsWith('image/') ||
    accept === 'image' ||
    (/image|logo|photo|background|thumbnail/i.test(accept) && !isVideo)

  if (isImage && !isVideo) {
    return uploadImage(file, { onProgress, replaceUrl })
  }

  const validation = validateMediaFile(file, { accept, target: 'storage' })
  if (!validation.ok) {
    const err = new Error(validation.error)
    if (validation.hint) err.hint = validation.hint
    throw err
  }

  let uploaded = null

  try {
    uploaded = await uploadViaServerApi(file, { onProgress, replaceUrl })
  } catch (err) {
    console.warn('[upload] Server upload failed:', err.message)
  }

  if (!uploaded && isStorageConfigured && isVideo) {
    const reuse = resolveReplaceTarget(replaceUrl)
    try {
      const storageResult = await uploadFileToStorage(file, {
        onProgress,
        target: 'storage',
        storagePath: reuse?.kind === 'storage' ? reuse.path : undefined,
      })
      uploaded = {
        url: storageResult.downloadUrl,
        size: storageResult.size,
        type: storageResult.type,
        name: file.name,
        storagePath: storageResult.storagePath,
        source: 'storage',
        replaced: Boolean(replaceUrl),
      }
    } catch (err) {
      console.warn('[upload] Storage fallback failed:', err.message)
    }
  }

  if (!uploaded) {
    const err = new Error(
      import.meta.env.DEV
        ? 'Upload failed. Run npm run dev, or use Paste URL.'
        : 'Upload failed on the live site.'
    )
    err.hint = import.meta.env.PROD
      ? 'Create a Vercel Blob store (free on Hobby) in your Vercel project → Storage, then redeploy.'
      : 'Sign in at /admin/login and ensure npm run dev is running.'
    throw err
  }

  return finalizeUpload(uploaded, file)
}
