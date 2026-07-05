import { put } from '@vercel/blob'
import admin from 'firebase-admin'
import Busboy from 'busboy'
import { randomUUID } from 'crypto'
import { buildUploadPath } from '../lib/uploadPath.mjs'

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
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

function getAdminApp() {
  if (admin.apps.length) return admin.app()

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (!json) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not configured on the server.')
  }

  const serviceAccount = JSON.parse(json)
  const storageBucket =
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.VITE_FIREBASE_STORAGE_BUCKET ||
    `${serviceAccount.project_id}.appspot.com`

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket,
  })
}

function buildDownloadUrl(bucketName, storagePath, token) {
  const encoded = encodeURIComponent(storagePath)
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encoded}?alt=media&token=${token}`
}

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    let replaceUrl = ''
    const bb = Busboy({ headers: req.headers, limits: { files: 1, fileSize: MAX_VIDEO_BYTES } })
    let fileBuffer = null
    let fileName = ''
    let mimeType = 'application/octet-stream'
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
          fileError = new Error('File exceeds size limit.')
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

    bb.on('error', reject)
    bb.on('finish', () => {
      if (fileError) reject(fileError)
      else resolve({ fileBuffer, fileName, mimeType, replaceUrl })
    })

    req.pipe(bb)
  })
}

async function uploadToVercelBlob(fileBuffer, fileName, mimeType, replaceUrl) {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) return null

  const pathname = buildUploadPath(fileName, replaceUrl)
  const blob = await put(pathname, fileBuffer, {
    access: 'public',
    contentType: mimeType,
    token,
    addRandomSuffix: false,
    allowOverwrite: Boolean(replaceUrl),
  })

  return {
    url: blob.url,
    storagePath: pathname,
    source: 'blob',
  }
}

async function uploadToFirebaseStorage(fileBuffer, fileName, mimeType, replaceUrl) {
  getAdminApp()
  const bucket = admin.storage().bucket()
  const storagePath = buildUploadPath(fileName, replaceUrl)
  const downloadToken = randomUUID()
  const file = bucket.file(storagePath)

  await file.save(fileBuffer, {
    metadata: {
      contentType: mimeType,
      metadata: {
        firebaseStorageDownloadTokens: downloadToken,
      },
    },
  })

  return {
    url: buildDownloadUrl(bucket.name, storagePath, downloadToken),
    storagePath,
    source: 'storage',
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY
  if (!apiKey) {
    res.status(500).json({
      error: 'Server missing Firebase API key.',
      hint: 'Add VITE_FIREBASE_API_KEY to Vercel environment variables, then redeploy.',
    })
    return
  }

  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  const user = await verifyIdToken(token, apiKey)
  if (!user) {
    res.status(401).json({ error: 'Sign in at /admin/login before uploading.' })
    return
  }

  let fileBuffer
  let fileName
  let mimeType
  let replaceUrl
  try {
    ;({ fileBuffer, fileName, mimeType, replaceUrl } = await parseMultipart(req))
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not read upload.' })
    return
  }

  if (!fileBuffer?.length) {
    res.status(400).json({ error: 'No file received.' })
    return
  }

  if (!isImageMime(mimeType) && !isVideoMime(mimeType) && !isPdfMime(mimeType, fileName)) {
    res.status(400).json({ error: 'Only images, videos, and PDF brochures are allowed.' })
    return
  }

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN

  try {
    let result = null
    let blobError = null

    if (isImageMime(mimeType) || isPdfMime(mimeType, fileName) || isVideoMime(mimeType)) {
      if (!blobToken) {
        res.status(503).json({
          error: 'Vercel Blob is not configured for this project.',
          hint:
            'Vercel dashboard → your project → Storage → Create Blob Store → Connect to project → Redeploy.',
        })
        return
      }

      try {
        result = await uploadToVercelBlob(fileBuffer, fileName, mimeType, replaceUrl)
      } catch (err) {
        blobError = err
        console.error('[api/admin/upload] Blob upload failed:', err)
      }
    }

    if (!result && process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      try {
        result = await uploadToFirebaseStorage(fileBuffer, fileName, mimeType, replaceUrl)
      } catch (err) {
        console.error('[api/admin/upload] Firebase Storage fallback failed:', err)
        if (!blobError) blobError = err
      }
    }

    if (!result) {
      res.status(500).json({
        error: blobError?.message || 'Upload failed.',
        hint: blobToken
          ? 'Check Vercel Blob store is linked to this project and redeploy after creating it.'
          : 'Create a Vercel Blob store (free on Hobby), connect it to this project, then redeploy.',
      })
      return
    }

    res.status(200).json({
      url: result.url,
      storagePath: result.storagePath,
      size: fileBuffer.length,
      type: mimeType,
      name: fileName,
      source: result.source,
    })
  } catch (err) {
    console.error('[api/admin/upload]', err)
    res.status(500).json({
      error: err.message || 'Upload failed',
      hint: 'Check Vercel function logs and confirm BLOB_READ_WRITE_TOKEN is set.',
    })
  }
}
