function extractBlobPathname(url) {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('blob.vercel-storage.com')) {
      const path = decodeURIComponent(parsed.pathname.replace(/^\/+/, ''))
      return path.startsWith('cms/') ? path : null
    }
  } catch {
    return null
  }
  return null
}

function extractFirebaseStoragePath(url) {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()

  const objectPath = trimmed.match(/\/o\/([^?]+)/)
  if (objectPath) return decodeURIComponent(objectPath[1])

  if (trimmed.startsWith('cms/')) return trimmed.split('?')[0]

  return null
}

function sanitizeFileName(name) {
  return (name || 'file')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 120)
}

export function buildUploadPath(fileName, replaceUrl) {
  if (replaceUrl) {
    const blobPath = extractBlobPathname(replaceUrl)
    if (blobPath) return blobPath

    const storagePath = extractFirebaseStoragePath(replaceUrl)
    if (storagePath?.startsWith('cms/')) return storagePath
  }

  return `cms/${Date.now()}_${sanitizeFileName(fileName)}`
}
