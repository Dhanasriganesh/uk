import React, { forwardRef, useEffect, useState } from 'react'
import { resolveHeroVideoUrl } from '../../cms/mediaPaths'
import { resolveCmsImageUrl } from '../../cms/resolveCmsImageUrl'
import { resolveFirebaseStorageMediaUrl } from '../../firebase/resolveStorageMediaUrl'
import { getVideoPlayback } from '../../utils/videoEmbed'
import VideoEmbed from './VideoEmbed'

export function CmsImage({ src, fallback, alt = '', className = '', ...props }) {
  const initial = resolveCmsImageUrl(src, fallback)
  const [url, setUrl] = useState(initial)

  useEffect(() => {
    let cancelled = false
    const sync = resolveCmsImageUrl(src, fallback)
    setUrl(sync)

    async function resolveStorage() {
      const trimmed = typeof src === 'string' ? src.trim() : ''
      if (!trimmed || !trimmed.includes('firebasestorage')) return
      const resolved = await resolveFirebaseStorageMediaUrl(trimmed)
      if (!cancelled && resolved) setUrl(resolved)
    }

    resolveStorage()
    return () => {
      cancelled = true
    }
  }, [src, fallback])

  if (!url) return null

  const handleError = () => {
    if (fallback && url !== fallback) setUrl(fallback)
  }

  return <img src={url} alt={alt} className={className} onError={handleError} {...props} />
}

export const CmsVideo = forwardRef(function CmsVideo(
  { src, fallback, className = '', resolveSrc = resolveHeroVideoUrl, ...props },
  ref
) {
  const resolvedFallback = fallback || resolveSrc()
  const syncUrl = resolveSrc(src, resolvedFallback)
  const [url, setUrl] = useState(syncUrl)

  useEffect(() => {
    let cancelled = false
    const nextSync = resolveSrc(src, resolvedFallback)
    setUrl(nextSync)

    async function resolveStorage() {
      const trimmed = typeof src === 'string' ? src.trim() : ''
      if (!trimmed || !trimmed.includes('firebasestorage')) return
      const resolved = await resolveFirebaseStorageMediaUrl(trimmed)
      if (!cancelled && resolved) setUrl(resolved)
    }

    resolveStorage()
    return () => {
      cancelled = true
    }
  }, [src, resolvedFallback, resolveSrc])

  if (!url) return null

  const playback = getVideoPlayback(url)

  const handleError = () => {
    if (playback.kind === 'file' && url !== resolvedFallback) {
      setUrl(resolvedFallback)
    }
  }

  return (
    <VideoEmbed
      ref={ref}
      src={url}
      className={className}
      onError={handleError}
      {...props}
    />
  )
})
