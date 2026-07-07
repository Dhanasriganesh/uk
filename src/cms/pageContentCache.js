const PREFIX = 'cms_page_v1_'

function readStorage(storage, pageId) {
  try {
    const raw = storage.getItem(`${PREFIX}${pageId}`)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    if (parsed.content && typeof parsed.content === 'object') {
      return {
        content: parsed.content,
        updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : 0,
      }
    }
    return { content: parsed, updatedAt: 0 }
  } catch {
    return null
  }
}

export function readPageContentCache(pageId) {
  if (!pageId || typeof window === 'undefined') return null
  return readStorage(localStorage, pageId) ?? readStorage(sessionStorage, pageId)
}

export function writePageContentCache(pageId, remote, updatedAt = Date.now()) {
  if (!pageId || !remote || typeof window === 'undefined') return
  const payload = JSON.stringify({
    content: remote,
    updatedAt: typeof updatedAt === 'number' ? updatedAt : Date.now(),
  })
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
