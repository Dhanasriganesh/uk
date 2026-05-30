import { HERO_VIDEO_URL } from './mediaPaths'
import { PAGE_DEFAULTS } from './defaultContent'

/**
 * Site-hosted files (place under `public/` so URLs resolve).
 * Example: public/media/logo.png → /media/logo.png
 */
export const LOCAL_MEDIA_SEED = [
  { id: 'local_logo', name: 'ATS Logo', url: '/media/logo.png', type: 'image/png' },
  { id: 'local_hero_video', name: 'Hero video (ATS UK)', url: HERO_VIDEO_URL, type: 'video/mp4' },
  {
    id: 'local_video_rotary_capping',
    name: 'Rotary capping machine video',
    url: '/videos/Rotary Capping Machine with Automatic Rejection System _ ATS UK Ltd.mp4',
    type: 'video/mp4',
  },
  {
    id: 'local_video_linear_capping',
    name: 'Linear capping machine video',
    url: '/videos/ATS Liner Capping Machine with Reverse Thread Engagement _ ATS UK Ltd.mp4',
    type: 'video/mp4',
  },
  { id: 'local_pdf_brochure', name: 'Product brochure PDF', url: '/media/pdf_1718978495.pdf', type: 'application/pdf' },
]

const URL_FIELD_PATTERN = /(https?:\/\/[^\s"'<>]+|\/[a-zA-Z0-9_./%-]+)/g

export function isShortMediaUrl(value) {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (!trimmed) return false
  if (trimmed.startsWith('data:image/')) return true
  if (trimmed.startsWith('data:')) return false
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return true
  if (trimmed.startsWith('/')) return true
  return false
}

export function normalizeShortUrl(url) {
  const trimmed = (url || '').trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('data:image/')) return trimmed
  if (trimmed.startsWith('data:')) return ''
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const u = new URL(trimmed)
      return u.href
    } catch {
      return ''
    }
  }
  if (trimmed.startsWith('/')) return trimmed.split('?')[0]
  return ''
}

export function guessMediaType(url, fallback = '') {
  const trimmed = (url || '').trim()
  if (trimmed.startsWith('data:image/')) {
    const match = trimmed.match(/^data:(image\/[^;]+)/i)
    return match ? match[1].toLowerCase() : 'image/jpeg'
  }
  const path = trimmed.split('?')[0].toLowerCase()
  if (path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.mov')) return 'video/mp4'
  if (path.endsWith('.pdf')) return 'application/pdf'
  if (path.endsWith('.svg')) return 'image/svg+xml'
  if (path.endsWith('.png')) return 'image/png'
  if (path.endsWith('.webp')) return 'image/webp'
  if (path.endsWith('.gif')) return 'image/gif'
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg'
  return fallback || 'image/jpeg'
}

function collectUrlsFromValue(value, out) {
  if (value == null) return
  if (typeof value === 'string') {
    if (isShortMediaUrl(value)) {
      out.add(normalizeShortUrl(value))
      return
    }
    const matches = value.match(URL_FIELD_PATTERN)
    if (matches) {
      matches.forEach((m) => {
        if (isShortMediaUrl(m)) out.add(normalizeShortUrl(m))
      })
    }
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectUrlsFromValue(item, out))
    return
  }
  if (typeof value === 'object') {
    Object.values(value).forEach((v) => collectUrlsFromValue(v, out))
  }
}

/** URLs referenced in default CMS content (https + site paths). */
export function collectDefaultContentMediaUrls() {
  const out = new Set()
  collectUrlsFromValue(PAGE_DEFAULTS, out)
  return [...out].filter(Boolean)
}

export function buildMediaSeedRecords() {
  const byUrl = new Map()

  for (const item of LOCAL_MEDIA_SEED) {
    const url = normalizeShortUrl(item.url)
    if (!url) continue
    byUrl.set(url, {
      id: item.id,
      name: item.name,
      url,
      type: item.type || guessMediaType(url),
      source: 'local',
    })
  }

  for (const url of collectDefaultContentMediaUrls()) {
    if (byUrl.has(url)) continue
    const name = url.split('/').pop() || 'media'
    byUrl.set(url, {
      id: `seed_${name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80)}`,
      name,
      url,
      type: guessMediaType(url),
      source: 'defaults',
    })
  }

  return [...byUrl.values()]
}
