/** Firestore document limit is ~1 MiB; base64 adds ~33% overhead. */
export const MAX_IMAGE_RAW_BYTES = 700 * 1024
export const MAX_DATA_URL_CHARS = 980_000

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Could not read image file.'))
        return
      }
      resolve(reader.result)
    }
    reader.onerror = () => reject(new Error('Could not read image file.'))
    reader.readAsDataURL(file)
  })
}

export function assertImageFitsInFirestore(file, dataUrl) {
  if (file.size > MAX_IMAGE_RAW_BYTES) {
    const err = new Error(
      `Image is too large for Firestore (max ${Math.round(MAX_IMAGE_RAW_BYTES / 1024)} KB). Resize or compress before uploading.`
    )
    err.hint = 'Firestore stores images as embedded data (no Storage bucket). Use WebP or JPEG under 700 KB.'
    throw err
  }
  if (dataUrl.length > MAX_DATA_URL_CHARS) {
    const err = new Error('Image is too large after encoding for Firestore.')
    err.hint = 'Use a smaller image (under ~700 KB file size).'
    throw err
  }
}

export function isDataImageUrl(url) {
  return typeof url === 'string' && url.trim().startsWith('data:image/')
}
