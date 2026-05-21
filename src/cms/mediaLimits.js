/** Max bytes saved per image record in the CMS database */
export const STORAGE_RECORD_MAX_BYTES = 1_048_576

/** Bytes reserved for filename, type, and other fields beside the image data */
export const MEDIA_METADATA_BYTES = 2048

/**
 * Max raw file size before encoding.
 * Saved images are embedded as text (~33% larger than the file on disk).
 */
export const MAX_IMAGE_FILE_BYTES = 680 * 1024

export const ACCEPTED_IMAGE_MIME = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]

export const ACCEPTED_IMAGE_INPUT = ACCEPTED_IMAGE_MIME.join(',')

export const MEDIA_LIMITS_COPY = {
  headline: 'Before you upload',
  whyTitle: 'Why is there a size limit?',
  whyBody:
    'Images are stored directly in the website’s content library (not as separate hosted files). Each image must stay under 1 MB when saved. Encoding usually makes the stored size about one-third larger than the file on your computer.',
  maxFile: `Maximum file size: ${formatBytes(MAX_IMAGE_FILE_BYTES)}`,
  maxSaved: `Maximum saved size: ${formatBytes(STORAGE_RECORD_MAX_BYTES)}`,
  formats: 'JPEG, PNG, WebP, GIF, SVG',
  heic: 'HEIC/HEIF (iPhone photos) are not supported — export as JPG or PNG first.',
  videoNote: 'Videos cannot be uploaded here. Paste a hosted URL (YouTube, CDN, or /videos/… on this site).',
  tips: [
    'Screenshots and PNGs are often too large — try JPG or WebP.',
    'Resize to about 1200–1600 px wide before uploading.',
    'Use TinyPNG, Squoosh, or your editor’s “Export for web” to compress.',
  ],
}

const HEIC_TYPES = ['image/heic', 'image/heif']
const HEIC_EXT = /\.(heic|heif)$/i

export function formatBytes(bytes) {
  if (bytes == null || Number.isNaN(bytes)) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes >= 10240 ? 0 : 1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function estimateSavedBytes(fileBytes) {
  const encoded = Math.ceil((fileBytes * 4) / 3) + 80
  return encoded + MEDIA_METADATA_BYTES
}

/**
 * @returns {{ ok: boolean, error?: string, hint?: string, fileBytes: number, estimatedSavedBytes: number }}
 */
export function validateImageFile(file) {
  if (!file) {
    return { ok: false, error: 'No file selected.', fileBytes: 0, estimatedSavedBytes: 0 }
  }

  const fileBytes = file.size
  const estimatedSavedBytes = estimateSavedBytes(fileBytes)
  const type = (file.type || '').toLowerCase()

  if (HEIC_TYPES.includes(type) || HEIC_EXT.test(file.name)) {
    return {
      ok: false,
      error: 'HEIC/HEIF is not supported.',
      hint: MEDIA_LIMITS_COPY.heic,
      fileBytes,
      estimatedSavedBytes,
    }
  }

  const isImage =
    type.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name)
  if (!isImage) {
    return {
      ok: false,
      error: 'Only image files can be added to the media library.',
      hint: MEDIA_LIMITS_COPY.videoNote,
      fileBytes,
      estimatedSavedBytes,
    }
  }

  if (fileBytes > MAX_IMAGE_FILE_BYTES) {
    return {
      ok: false,
      error: `This image is too large (${formatBytes(fileBytes)}). Maximum file size is ${formatBytes(MAX_IMAGE_FILE_BYTES)}.`,
      hint: 'Compress or resize the image, then choose it again.',
      fileBytes,
      estimatedSavedBytes,
    }
  }

  if (estimatedSavedBytes > STORAGE_RECORD_MAX_BYTES) {
    return {
      ok: false,
      error: `This image cannot be saved — it would exceed the ${formatBytes(STORAGE_RECORD_MAX_BYTES)} limit after processing.`,
      hint: 'Use a smaller or more compressed file.',
      fileBytes,
      estimatedSavedBytes,
    }
  }

  return { ok: true, fileBytes, estimatedSavedBytes }
}

export function isStorageSizeError(error) {
  const msg = (error?.message || '').toLowerCase()
  return (
    msg.includes('exceeds the maximum allowed size') ||
    msg.includes('maximum allowed size') ||
    msg.includes('payload too large') ||
    (msg.includes('over the') && msg.includes('limit')) ||
    error?.code === 'invalid-argument'
  )
}

export function storageLimitExceededMessage() {
  return `This image is too large to save. Use a file under ${formatBytes(MAX_IMAGE_FILE_BYTES)}, or host it elsewhere and paste the URL in the field.`
}

/** @deprecated Use STORAGE_RECORD_MAX_BYTES — kept for older import paths */
export const FIRESTORE_DOC_MAX_BYTES = STORAGE_RECORD_MAX_BYTES
