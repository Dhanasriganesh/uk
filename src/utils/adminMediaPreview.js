/** URLs that should bypass browser/CDN cache in admin previews. */
export function isCacheBustedMediaUrl(url) {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  return (
    trimmed.includes('blob.vercel-storage.com') ||
    trimmed.includes('firebasestorage.googleapis.com') ||
    trimmed.startsWith('/media/') ||
    trimmed.startsWith('/videos/')
  )
}

export function withAdminPreviewBust(url, bust = Date.now()) {
  const trimmed = (url || '').trim()
  if (!trimmed) return ''
  if (!isCacheBustedMediaUrl(trimmed)) return trimmed
  const sep = trimmed.includes('?') ? '&' : '?'
  return `${trimmed}${sep}_pv=${bust}`
}

/** Bust CDN/browser cache for uploaded media on the public site. */
export function withPublicMediaVersion(url, version) {
  const trimmed = (url || '').trim()
  if (!trimmed || !version) return trimmed
  if (!isCacheBustedMediaUrl(trimmed)) return trimmed
  try {
    const parsed = new URL(trimmed)
    parsed.searchParams.set('cv', String(version))
    return parsed.toString()
  } catch {
    const sep = trimmed.includes('?') ? '&' : '?'
    return `${trimmed}${sep}cv=${version}`
  }
}

export function toCacheVersion(updatedAt) {
  if (!updatedAt) return 0
  if (typeof updatedAt === 'number') return updatedAt
  if (typeof updatedAt?.toMillis === 'function') return updatedAt.toMillis()
  if (typeof updatedAt?.seconds === 'number') return updatedAt.seconds * 1000
  return 0
}

export function isUploadedMediaUrl(url) {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  return (
    trimmed.includes('blob.vercel-storage.com') ||
    trimmed.includes('firebasestorage.googleapis.com') ||
    trimmed.startsWith('/media/') ||
    trimmed.startsWith('/videos/') ||
    trimmed.startsWith('cms/')
  )
}
