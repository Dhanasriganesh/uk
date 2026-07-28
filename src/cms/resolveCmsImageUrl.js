/**
 * CMS may store Vite dev paths (/src/assets/...) or stale /assets/<hash> URLs from
 * an old build. Only remote URLs (Firebase Storage, CDN) are safe across deploys.
 */
export function isPersistentCmsImageUrl(url) {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  if (!trimmed) return false
  if (trimmed.startsWith('data:')) return true
  if (trimmed.startsWith('cms/')) return true
  if (trimmed.startsWith('/media/') || trimmed.startsWith('/videos/')) return true
  if (/^https?:\/\//i.test(trimmed)) {
    return !/localhost|127\.0\.0\.1/i.test(trimmed)
  }
  return false
}

export function resolveCmsImageUrl(src, fallback) {
  const trimmed = typeof src === 'string' ? src.trim() : ''
  if (isPersistentCmsImageUrl(trimmed)) return trimmed
  const fallbackTrimmed = typeof fallback === 'string' ? fallback.trim() : ''
  if (isPersistentCmsImageUrl(fallbackTrimmed)) return fallbackTrimmed
  return ''
}
