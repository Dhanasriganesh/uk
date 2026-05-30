import { ref, getDownloadURL } from 'firebase/storage'
import { storage, isStorageConfigured } from './config'

/** Upload REST shape — not playable in a video element */
export function isBrokenFirebaseStorageUrl(url) {
  if (!url || typeof url !== 'string') return false
  return /firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\?name=/i.test(url.trim())
}

export function isFirebaseStorageDownloadUrl(url) {
  if (!url || typeof url !== 'string') return false
  const t = url.trim()
  return (
    t.includes('firebasestorage.googleapis.com') &&
    /\/o\/[^?]+/.test(t) &&
    (t.includes('alt=media') || t.includes('token='))
  )
}

export function extractStoragePathFromUrl(url) {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()

  const nameParam = trimmed.match(/[?&]name=([^&]+)/)
  if (nameParam) return decodeURIComponent(nameParam[1])

  const objectPath = trimmed.match(/\/o\/([^?]+)/)
  if (objectPath) return decodeURIComponent(objectPath[1])

  if (trimmed.startsWith('gs://')) {
    const withoutScheme = trimmed.slice(5)
    const slash = withoutScheme.indexOf('/')
    if (slash > 0) return withoutScheme.slice(slash + 1)
  }

  if (trimmed.startsWith('cms/')) return trimmed

  return null
}

/**
 * Turn broken or path-only Storage references into a tokenized download URL.
 */
export async function resolveFirebaseStorageMediaUrl(url) {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()
  if (!trimmed.includes('firebasestorage') && !trimmed.startsWith('gs://') && !trimmed.startsWith('cms/')) {
    return trimmed
  }

  if (isFirebaseStorageDownloadUrl(trimmed) && !isBrokenFirebaseStorageUrl(trimmed)) {
    return trimmed
  }

  if (!isStorageConfigured || !storage) return null

  const path = extractStoragePathFromUrl(trimmed)
  if (!path) return null

  try {
    return await getDownloadURL(ref(storage, path))
  } catch (err) {
    console.warn('[Storage] Could not resolve media URL:', path, err?.message || err)
    return null
  }
}
