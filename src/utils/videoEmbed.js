/**
 * Parse YouTube / Vimeo URLs for iframe embeds.
 * HTML5 <video> only plays direct files (.mp4, .webm), not YouTube watch links.
 */

export function parseYouTubeId(url) {
  const trimmed = (url || '').trim()
  if (!trimmed) return null

  try {
    const u = new URL(trimmed)
    const host = u.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0]
      return id && id.length >= 6 ? id : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const fromQuery = u.searchParams.get('v')
      if (fromQuery) return fromQuery

      const embed = u.pathname.match(/^\/embed\/([^/?]+)/)
      if (embed) return embed[1]

      const shorts = u.pathname.match(/^\/shorts\/([^/?]+)/)
      if (shorts) return shorts[1]
    }
  } catch {
    // fall through to regex
  }

  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

export function parseVimeoId(url) {
  const trimmed = (url || '').trim()
  if (!trimmed) return null
  try {
    const u = new URL(trimmed)
    if (!u.hostname.includes('vimeo.com')) return null
    const m = u.pathname.match(/\/(\d+)/)
    return m ? m[1] : null
  } catch {
    const m = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    return m ? m[1] : null
  }
}

export function isYouTubeUrl(url) {
  return Boolean(parseYouTubeId(url))
}

export function isVimeoUrl(url) {
  return Boolean(parseVimeoId(url))
}

export function isEmbedVideoUrl(url) {
  return isYouTubeUrl(url) || isVimeoUrl(url)
}

export function getYouTubeEmbedUrl(url, { autoplay = false, mute = false, loop = false } = {}) {
  const id = parseYouTubeId(url)
  if (!id) return null
  const params = new URLSearchParams()
  if (autoplay) params.set('autoplay', '1')
  if (mute) params.set('mute', '1')
  if (loop) {
    params.set('loop', '1')
    params.set('playlist', id)
  }
  params.set('rel', '0')
  params.set('modestbranding', '1')
  const qs = params.toString()
  return `https://www.youtube.com/embed/${id}${qs ? `?${qs}` : ''}`
}

export function getVimeoEmbedUrl(url, { autoplay = false, mute = false, loop = false } = {}) {
  const id = parseVimeoId(url)
  if (!id) return null
  const params = new URLSearchParams()
  if (autoplay) params.set('autoplay', '1')
  if (mute) params.set('muted', '1')
  if (loop) params.set('loop', '1')
  const qs = params.toString()
  return `https://player.vimeo.com/video/${id}${qs ? `?${qs}` : ''}`
}

/** @returns {{ kind: 'youtube'|'vimeo'|'file'|'none', embedUrl?: string, src?: string, id?: string }} */
export function getVideoPlayback(url, options = {}) {
  const trimmed = (url || '').trim()
  if (!trimmed) return { kind: 'none' }

  const ytId = parseYouTubeId(trimmed)
  if (ytId) {
    return {
      kind: 'youtube',
      id: ytId,
      embedUrl: getYouTubeEmbedUrl(trimmed, options),
      thumbnail: `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`,
    }
  }

  const vimeoId = parseVimeoId(trimmed)
  if (vimeoId) {
    return {
      kind: 'vimeo',
      id: vimeoId,
      embedUrl: getVimeoEmbedUrl(trimmed, options),
    }
  }

  return { kind: 'file', src: trimmed }
}
