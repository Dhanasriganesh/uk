import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Busboy from 'busboy'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

const MAX_IMAGE_BYTES = 12 * 1024 * 1024
const MAX_VIDEO_BYTES = 150 * 1024 * 1024
const MAX_PDF_BYTES = 25 * 1024 * 1024

function sanitizeFileName(name) {
  return (name || 'file')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 120)
}

function isVideoMime(mime) {
  return typeof mime === 'string' && mime.startsWith('video/')
}

function isImageMime(mime) {
  return typeof mime === 'string' && mime.startsWith('image/')
}

function isPdfMime(mime, fileName) {
  if (mime === 'application/pdf') return true
  return typeof fileName === 'string' && fileName.toLowerCase().endsWith('.pdf')
}

function safeLocalFileName(name) {
  if (!name || typeof name !== 'string') return null
  const base = (name.split('/').pop() || '').split('?')[0].split('#')[0]
  if (!base || base.includes('..')) return null
  return base
}

function resolveLocalReplaceTarget(replaceUrl) {
  if (!replaceUrl || typeof replaceUrl !== 'string') return null
  const trimmed = replaceUrl.trim()
  if (!trimmed) return null

  if (trimmed.startsWith('/media/')) {
    const fileName = safeLocalFileName(trimmed.slice('/media/'.length))
    if (fileName) return { folder: 'media', fileName }
  }

  if (trimmed.startsWith('/videos/')) {
    const fileName = safeLocalFileName(trimmed.slice('/videos/'.length))
    if (fileName) return { folder: 'videos', fileName }
  }

  return null
}

async function verifyIdToken(idToken, apiKey) {
  if (!idToken || !apiKey) return null
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.users?.[0] ?? null
}

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

/**
 * Dev-only: save uploads to public/media or public/videos and return site paths.
 */
export function uploadApiPlugin({ apiKey } = {}) {
  return {
    name: 'ats-upload-api',
    configureServer(server) {
      server.middlewares.use('/api/admin/upload', (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        ;(async () => {
          const authHeader = req.headers.authorization || ''
          const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
          const user = await verifyIdToken(token, apiKey)
          if (!user) {
            sendJson(res, 401, { error: 'Sign in at /admin/login before uploading.' })
            return
          }

          const bb = Busboy({ headers: req.headers, limits: { files: 1, fileSize: MAX_VIDEO_BYTES } })
          let fileBuffer = null
          let fileName = ''
          let mimeType = 'application/octet-stream'
          let replaceUrl = ''
          let fileError = null

          bb.on('field', (name, value) => {
            if (name === 'replaceUrl') replaceUrl = value
          })

          bb.on('file', (fieldname, stream, info) => {
            if (fieldname !== 'file') {
              stream.resume()
              return
            }
            fileName = info.filename
            mimeType = info.mimeType || mimeType
            const chunks = []
            let total = 0
            stream.on('data', (chunk) => {
              total += chunk.length
              const max = isVideoMime(mimeType)
                ? MAX_VIDEO_BYTES
                : isPdfMime(mimeType, fileName)
                  ? MAX_PDF_BYTES
                  : MAX_IMAGE_BYTES
              if (total > max) {
                fileError = new Error(
                  isVideoMime(mimeType)
                    ? `Video too large (max ${MAX_VIDEO_BYTES / (1024 * 1024)} MB).`
                    : isPdfMime(mimeType, fileName)
                      ? `PDF too large (max ${MAX_PDF_BYTES / (1024 * 1024)} MB).`
                      : `Image too large (max ${MAX_IMAGE_BYTES / (1024 * 1024)} MB).`
                )
                stream.destroy()
                return
              }
              chunks.push(chunk)
            })
            stream.on('end', () => {
              if (!fileError) fileBuffer = Buffer.concat(chunks)
            })
            stream.on('error', (err) => {
              fileError = err
            })
          })

          bb.on('error', (err) => sendJson(res, 400, { error: err.message }))
          bb.on('finish', async () => {
            if (fileError) {
              sendJson(res, 400, { error: fileError.message })
              return
            }
            if (!fileBuffer?.length) {
              sendJson(res, 400, { error: 'No file received.' })
              return
            }
            if (!isImageMime(mimeType) && !isVideoMime(mimeType) && !isPdfMime(mimeType, fileName)) {
              sendJson(res, 400, {
                error: 'Only images, videos, and PDF brochures are allowed.',
              })
              return
            }

            const replaceTarget = resolveLocalReplaceTarget(replaceUrl)
            let folder
            let safeName

            if (replaceTarget) {
              folder = replaceTarget.folder
              safeName = replaceTarget.fileName
            } else {
              folder = isVideoMime(mimeType) ? 'videos' : 'media'
              safeName = `${Date.now()}_${sanitizeFileName(fileName)}`
            }

            const destDir = path.join(projectRoot, 'public', folder)
            const destPath = path.join(destDir, safeName)

            fs.mkdirSync(destDir, { recursive: true })
            fs.writeFileSync(destPath, fileBuffer)

            const url = `/${folder}/${safeName}`
            sendJson(res, 200, {
              url,
              size: fileBuffer.length,
              type: mimeType,
              name: fileName,
            })
          })

          req.pipe(bb)
        })().catch((err) => {
          sendJson(res, 500, { error: err.message || 'Upload failed' })
        })
      })
    },
  }
}
