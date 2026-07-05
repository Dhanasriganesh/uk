import { extractStoragePathFromUrl } from '../firebase/resolveStorageMediaUrl.js'

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

function safeLocalFileName(name) {
  if (!name || typeof name !== 'string') return null
  const base = name.split('/').pop() || ''
  if (!base || base.includes('..')) return null
  return base
}

/**
 * When replacing media, reuse the same storage path so the file is overwritten
 * and the public URL stays the same where possible.
 */
export function resolveReplaceTarget(replaceUrl) {
  if (!replaceUrl || typeof replaceUrl !== 'string') return null
  const trimmed = replaceUrl.trim()
  if (!trimmed) return null

  const blobPath = extractBlobPathname(trimmed)
  if (blobPath) return { kind: 'blob', path: blobPath }

  const storagePath = extractStoragePathFromUrl(trimmed)
  if (storagePath?.startsWith('cms/')) {
    return { kind: 'storage', path: storagePath }
  }

  if (trimmed.startsWith('/media/')) {
    const fileName = safeLocalFileName(trimmed.slice('/media/'.length))
    if (fileName) return { kind: 'local', folder: 'media', fileName }
  }

  if (trimmed.startsWith('/videos/')) {
    const fileName = safeLocalFileName(trimmed.slice('/videos/'.length))
    if (fileName) return { kind: 'local', folder: 'videos', fileName }
  }

  return null
}

export function buildUploadPath(fileName, replaceUrl) {
  const target = resolveReplaceTarget(replaceUrl)
  if (target?.kind === 'blob' || target?.kind === 'storage') {
    return target.path
  }
  const safe = (fileName || 'file')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 120)
  return `cms/${Date.now()}_${safe}`
}
