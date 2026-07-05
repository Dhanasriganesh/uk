import { isEmbedVideoUrl } from '../utils/videoEmbed'

export const ACCEPTED_IMAGE_MIME = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]

export const ACCEPTED_VIDEO_MIME = ['video/mp4', 'video/webm', 'video/quicktime']

export const ACCEPTED_PDF_MIME = ['application/pdf']

export const ACCEPTED_IMAGE_INPUT = ACCEPTED_IMAGE_MIME.join(',')
export const ACCEPTED_VIDEO_INPUT = ACCEPTED_VIDEO_MIME.join(',')
export const ACCEPTED_PDF_INPUT = 'application/pdf,.pdf'
export const ACCEPTED_MEDIA_INPUT = [
  ...ACCEPTED_IMAGE_MIME,
  ...ACCEPTED_VIDEO_MIME,
  ...ACCEPTED_PDF_MIME,
].join(',')

/** Base64 in Firestore (~1 MiB doc limit; encoding adds ~33%). */
export const MAX_IMAGE_FIRESTORE_BYTES = 700 * 1024

/** Site folder uploads (public/media — free, no Firebase Storage). */
export const MAX_IMAGE_STORAGE_BYTES = 5 * 1024 * 1024

/** @deprecated Use MAX_IMAGE_STORAGE_BYTES or MAX_IMAGE_FIRESTORE_BYTES */
export const MAX_IMAGE_BYTES = MAX_IMAGE_STORAGE_BYTES

export const MAX_VIDEO_BYTES = 150 * 1024 * 1024
export const MAX_PDF_BYTES = 25 * 1024 * 1024

export const MEDIA_LIMITS_COPY = {
  headline: 'Media library',
  whyTitle: 'How uploads work',
  whyBody:
    'Live admin uploads go to Vercel Blob (free on Hobby) and Firestore stores the short https URL — not base64. Local dev saves to public/media/ as /media/… paths.',
  maxFile: `Images up to ${MAX_IMAGE_STORAGE_BYTES / (1024 * 1024)} MB. Live site uses Vercel Blob (free); local dev uses public/media/.`,
  maxSaved: 'Firestore stores short URLs only (https://… or /media/…). Files live in Vercel Blob or your project folder.',
  formats: 'JPEG, PNG, WebP, GIF, SVG, MP4, WebM — or paste an existing URL.',
  heic: 'HEIC/HEIF (iPhone photos) are not supported — export as JPG or WebP first.',
  videoNote: 'Use MP4 files under `/videos/`, or paste a YouTube/Vimeo link (embedded player).',
  tips: [
    'Live site: Vercel dashboard → Storage → Create Blob Store (free), then redeploy.',
    'Local dev: npm run dev uploads to public/media/ — commit those files if you also want them on static hosting.',
    'Copy a URL from the media library into any image field, then save the page.',
  ],
}

export function formatBytes(bytes) {
  if (bytes == null || Number.isNaN(bytes)) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes >= 10240 ? 0 : 1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function acceptAllowsMime(accept, mime) {
  if (accept === 'video') return mime.startsWith('video/')
  if (accept === 'image') return mime.startsWith('image/')
  if (accept === 'pdf' || accept === 'brochure') {
    return mime === 'application/pdf' || (mime === '' && accept === 'pdf')
  }
  return mime.startsWith('image/') || mime.startsWith('video/') || mime === 'application/pdf'
}

export function validateMediaFile(file, { accept = 'any', target = 'storage' } = {}) {
  if (!file || typeof file.size !== 'number') {
    return { ok: false, error: 'No file selected.' }
  }

  const mime = (file.type || '').toLowerCase()
  const isVideo = mime.startsWith('video/')
  const isImage = mime.startsWith('image/')

  const isPdf = mime === 'application/pdf' || (!mime && accept === 'pdf')

  if (!acceptAllowsMime(accept, mime || (isPdf ? 'application/pdf' : ''))) {
    const errorByAccept = {
      video: 'Please choose a video file.',
      image: 'Please choose an image file.',
      pdf: 'Please choose a PDF file.',
      brochure: 'Please choose a PDF brochure.',
    }
    return {
      ok: false,
      error: errorByAccept[accept] || 'File type not allowed.',
      hint: MEDIA_LIMITS_COPY.formats,
    }
  }

  if (isPdf || accept === 'pdf' || accept === 'brochure') {
    const pdfMime = mime || 'application/pdf'
    if (pdfMime !== 'application/pdf' && !file.name?.toLowerCase().endsWith('.pdf')) {
      return { ok: false, error: 'Brochure must be a PDF file.', hint: 'Use .pdf format only.' }
    }
    if (file.size > MAX_PDF_BYTES) {
      return {
        ok: false,
        error: `PDF is too large (max ${MAX_PDF_BYTES / (1024 * 1024)} MB).`,
        hint: 'Compress the PDF or split into smaller files.',
        fileBytes: file.size,
      }
    }
    return { ok: true, fileBytes: file.size }
  }

  if (isImage && !ACCEPTED_IMAGE_MIME.includes(mime)) {
    return {
      ok: false,
      error: 'Unsupported image type.',
      hint: 'Use JPEG, PNG, WebP, GIF, or SVG.',
    }
  }

  if (isVideo && !ACCEPTED_VIDEO_MIME.includes(mime)) {
    return {
      ok: false,
      error: 'Unsupported video type.',
      hint: 'Use MP4 or WebM (convert MOV to MP4 if needed).',
    }
  }

  if (!isImage && !isVideo) {
    return { ok: false, error: 'Only images and videos can be uploaded.' }
  }

  const maxImageBytes = target === 'firestore' ? MAX_IMAGE_FIRESTORE_BYTES : MAX_IMAGE_STORAGE_BYTES
  const maxBytes = isVideo ? MAX_VIDEO_BYTES : maxImageBytes
  if (file.size > maxBytes) {
    return {
      ok: false,
      error: isVideo
        ? `Video is too large (max ${MAX_VIDEO_BYTES / (1024 * 1024)} MB).`
        : target === 'firestore'
          ? `Image is too large for Firestore (max ${Math.round(MAX_IMAGE_FIRESTORE_BYTES / 1024)} KB).`
          : `Image is too large (max ${MAX_IMAGE_STORAGE_BYTES / (1024 * 1024)} MB).`,
      hint: isVideo
        ? 'Compress the video or use a shorter clip.'
        : target === 'firestore'
          ? 'Resize the image, save as WebP, or enable Firebase Storage for larger files.'
          : 'Resize the image or save as WebP/JPEG.',
      fileBytes: file.size,
    }
  }

  return { ok: true, fileBytes: file.size }
}

/** @deprecated */
export function validateImageFile(file, options) {
  return validateMediaFile(file, { accept: 'image', ...options })
}

export function isStorageSizeError(error) {
  const msg = (error?.message || '').toLowerCase()
  return (
    msg.includes('payload too large') ||
    msg.includes('too large') ||
    error?.code === 'invalid-argument' ||
    error?.code === 'storage/quota-exceeded'
  )
}

export function storageLimitExceededMessage() {
  return `Upload failed — image may be too large (max ${MAX_IMAGE_STORAGE_BYTES / (1024 * 1024)} MB). Resize or compress and try again.`
}

export function isVideoUrl(url) {
  if (!url || typeof url !== 'string') return false
  if (isEmbedVideoUrl(url)) return true
  const path = url.split('?')[0].toLowerCase()
  return path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.mov') || path.includes('/videos/')
}

export function isDirectVideoFile(url) {
  if (!url || isEmbedVideoUrl(url)) return false
  const path = url.split('?')[0].toLowerCase()
  return path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.mov') || path.includes('/videos/')
}
