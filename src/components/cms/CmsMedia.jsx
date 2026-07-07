import React, { forwardRef, useEffect, useState } from 'react'
import { resolveHeroVideoUrl } from '../../cms/mediaPaths'
import { resolveCmsImageUrl } from '../../cms/resolveCmsImageUrl'
import { withPublicMediaVersion } from '../../utils/adminMediaPreview'
import { isFirebaseStoragePath } from '../../cms/mediaSeed'
import { resolveFirebaseStorageMediaUrl } from '../../firebase/resolveStorageMediaUrl'
import { getVideoPlayback } from '../../utils/videoEmbed'
import VideoEmbed from './VideoEmbed'

function needsStorageResolve(url) {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  return trimmed.includes('firebasestorage') || isFirebaseStoragePath(trimmed)
}

export function CmsImage({
  src,
  fallback,
  alt = '',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  cacheVersion = 0,
  ...props
}) {
  const initial = needsStorageResolve(src) ? '' : resolveCmsImageUrl(src, fallback)
  const [url, setUrl] = useState(initial)

  useEffect(() => {
    let cancelled = false
    const sync = withPublicMediaVersion(resolveCmsImageUrl(src, fallback), cacheVersion)
    setUrl(sync)

    async function resolveStorage() {
      const trimmed = typeof src === 'string' ? src.trim() : ''
      if (!trimmed || !needsStorageResolve(trimmed)) return
      const resolved = await resolveFirebaseStorageMediaUrl(trimmed)
      if (!cancelled && resolved) {
        setUrl(withPublicMediaVersion(resolved, cacheVersion))
      }
    }

    resolveStorage()
    return () => {
      cancelled = true
    }
  }, [src, fallback, cacheVersion])

  if (!url) return null

  const handleError = () => {
    if (fallback && url !== fallback) setUrl(fallback)
  }

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      {...props}
    />
  )
}

export const CmsVideo = forwardRef(function CmsVideo(
  { src, fallback, className = '', resolveSrc = resolveHeroVideoUrl, ...props },
  ref
) {
  const resolvedFallback = fallback || resolveSrc()
  const syncUrl = needsStorageResolve(src) ? '' : resolveSrc(src, resolvedFallback)
  const [url, setUrl] = useState(syncUrl)

  useEffect(() => {
    let cancelled = false
    const nextSync = resolveSrc(src, resolvedFallback)
    setUrl(nextSync)

    async function resolveStorage() {
      const trimmed = typeof src === 'string' ? src.trim() : ''
      if (!trimmed || !needsStorageResolve(trimmed)) return
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
