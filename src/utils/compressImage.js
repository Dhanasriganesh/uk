const DEFAULT_MAX_DIMENSION = 1600
const DEFAULT_QUALITY = 0.84
const DEFAULT_MAX_BYTES = 480 * 1024
const SKIP_BELOW_BYTES = 220 * 1024
const SKIP_TYPES = new Set(['image/svg+xml', 'image/gif'])

function supportsWebP() {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    return canvas.toDataURL('image/webp').startsWith('data:image/webp')
  } catch {
    return false
  }
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read image for compression.'))
    }
    img.src = url
  })
}

function scaleDimensions(width, height, maxDimension) {
  const longest = Math.max(width, height)
  if (longest <= maxDimension) return { width, height }
  const ratio = maxDimension / longest
  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio)),
  }
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality)
  })
}

function buildFileName(originalName, extension, replaceUrl) {
  const base = (originalName || 'image').replace(/\.[^.]+$/, '').slice(0, 100) || 'image'
  if (replaceUrl) {
    try {
      const path = new URL(replaceUrl).pathname
      const existing = path.split('/').pop() || ''
      const existingExt = existing.includes('.') ? existing.slice(existing.lastIndexOf('.')) : ''
      if (existingExt) return existing
    } catch {
      const localName = replaceUrl.split('/').pop()?.split('?')[0] || ''
      const localExt = localName.includes('.') ? localName.slice(localName.lastIndexOf('.')) : ''
      if (localExt) return localName
    }
  }
  return `${base}${extension}`
}

function pickOutputType(originalMime, useWebP) {
  if (useWebP) {
    return { mime: 'image/webp', extension: '.webp' }
  }
  if (originalMime === 'image/png') {
    return { mime: 'image/png', extension: '.png' }
  }
  return { mime: 'image/jpeg', extension: '.jpg' }
}

function needsCompression(file, img, maxDimension, skipBelowBytes) {
  if (SKIP_TYPES.has((file.type || '').toLowerCase())) return false
  const longest = Math.max(img.naturalWidth, img.naturalHeight)
  if (longest > maxDimension) return true
  return file.size > skipBelowBytes
}

/**
 * Resize and compress raster images before upload.
 * SVG/GIF are left unchanged. Small files under ~220 KB are skipped unless oversized.
 */
export async function compressImageForUpload(
  file,
  {
    maxDimension = DEFAULT_MAX_DIMENSION,
    quality = DEFAULT_QUALITY,
    maxBytes = DEFAULT_MAX_BYTES,
    skipBelowBytes = SKIP_BELOW_BYTES,
    replaceUrl,
  } = {}
) {
  const mime = (file.type || '').toLowerCase()
  if (!mime.startsWith('image/') || SKIP_TYPES.has(mime)) {
    return { file, didCompress: false, originalBytes: file.size, finalBytes: file.size }
  }

  const img = await loadImage(file)
  if (!needsCompression(file, img, maxDimension, skipBelowBytes)) {
    return { file, didCompress: false, originalBytes: file.size, finalBytes: file.size }
  }

  const { width, height } = scaleDimensions(img.naturalWidth, img.naturalHeight, maxDimension)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) {
    return { file, didCompress: false, originalBytes: file.size, finalBytes: file.size }
  }

  ctx.drawImage(img, 0, 0, width, height)

  const useWebP = supportsWebP()
  let { mime: outputMime, extension } = pickOutputType(mime, useWebP)
  let currentQuality = quality
  let blob = null

  for (let attempt = 0; attempt < 8; attempt += 1) {
    blob = await canvasToBlob(canvas, outputMime, currentQuality)
    if (!blob && outputMime === 'image/webp') {
      outputMime = 'image/jpeg'
      extension = '.jpg'
      blob = await canvasToBlob(canvas, outputMime, currentQuality)
    }
    if (!blob) break
    if (blob.size <= maxBytes) break
    currentQuality -= 0.08
    if (currentQuality < 0.52) break
  }

  if (!blob || blob.size >= file.size) {
    return { file, didCompress: false, originalBytes: file.size, finalBytes: file.size }
  }

  const compressedFile = new File([blob], buildFileName(file.name, extension, replaceUrl), {
    type: outputMime,
    lastModified: Date.now(),
  })

  return {
    file: compressedFile,
    didCompress: true,
    originalBytes: file.size,
    finalBytes: compressedFile.size,
  }
}
