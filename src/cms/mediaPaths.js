/** Stable public URL — survives Vite builds and Vercel deploys */
export const HERO_VIDEO_URL = '/videos/ats-uk.mp4'

/** Firestore seeds often store a hashed /assets/ path that breaks on the next deploy */
export function isStaleBundledHeroVideo(url) {
  if (!url || typeof url !== 'string') return false
  const path = url.split('?')[0].trim()
  return /^\/assets\/ats-uk[\w-]*\.mp4$/i.test(path)
}

/** Upload REST shape saved by mistake — not a playable file URL */
export function isBrokenFirebaseStorageUrl(url) {
  if (!url || typeof url !== 'string') return false
  return /firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\?name=/i.test(url.trim())
}

export function resolveHeroVideoUrl(cmsUrl, fallback = HERO_VIDEO_URL) {
  const trimmed = typeof cmsUrl === 'string' ? cmsUrl.trim() : ''
  if (!trimmed || isStaleBundledHeroVideo(trimmed) || isBrokenFirebaseStorageUrl(trimmed)) {
    return fallback
  }
  return trimmed
}
