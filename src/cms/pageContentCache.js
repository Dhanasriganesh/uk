const PREFIX = 'cms_page_v1_'

function readStorage(storage, pageId) {
  try {
    const raw = storage.getItem(`${PREFIX}${pageId}`)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

export function readPageContentCache(pageId) {
  if (!pageId || typeof window === 'undefined') return null
  return readStorage(localStorage, pageId) ?? readStorage(sessionStorage, pageId)
}

export function writePageContentCache(pageId, remote) {
  if (!pageId || !remote || typeof window === 'undefined') return
  const payload = JSON.stringify(remote)
  try {
    localStorage.setItem(`${PREFIX}${pageId}`, payload)
  } catch {
    // Ignore quota / private mode errors.
  }
  try {
    sessionStorage.setItem(`${PREFIX}${pageId}`, payload)
  } catch {
    // Ignore quota / private mode errors.
  }
}

export function clearPageContentCache(pageId) {
  if (!pageId || typeof window === 'undefined') return
  try {
    localStorage.removeItem(`${PREFIX}${pageId}`)
    sessionStorage.removeItem(`${PREFIX}${pageId}`)
  } catch {
    // ignore
  }
}
