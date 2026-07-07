const PREFIX = 'cms_page_v1_'

export function readPageContentCache(pageId) {
  if (!pageId || typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(`${PREFIX}${pageId}`)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

export function writePageContentCache(pageId, remote) {
  if (!pageId || !remote || typeof window === 'undefined') return
  try {
    sessionStorage.setItem(`${PREFIX}${pageId}`, JSON.stringify(remote))
  } catch {
    // Ignore quota / private mode errors.
  }
}

export function clearPageContentCache(pageId) {
  if (!pageId || typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(`${PREFIX}${pageId}`)
  } catch {
    // ignore
  }
}
