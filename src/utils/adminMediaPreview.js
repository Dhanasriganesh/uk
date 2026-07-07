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
