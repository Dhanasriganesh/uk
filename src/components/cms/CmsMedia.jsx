import React, { forwardRef, useEffect, useState } from 'react'
import { resolveHeroVideoUrl } from '../../cms/mediaPaths'
import { resolveCmsImageUrl } from '../../cms/resolveCmsImageUrl'
import { withPublicMediaVersion } from '../../utils/adminMediaPreview'
import { useCmsMediaVersion } from '../../cms/useCmsMediaVersion'
import { isFirebaseStoragePath } from '../../cms/mediaSeed'
import { resolveFirebaseStorageMediaUrl } from '../../firebase/resolveStorageMediaUrl'
import { getVideoPlayback } from '../../utils/videoEmbed'
import VideoEmbed from './VideoEmbed'

function needsStorageResolve(url) {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  return trimmed.includes('firebasestorage') || isFirebaseStoragePath(trimmed)
}

function resolveVersion(cacheVersion, contextVersion) {
  return cacheVersion || contextVersion || 0
}

function versionedImageUrl(src, fallback, version) {
  const resolved = resolveCmsImageUrl(src, fallback)
  return withPublicMediaVersion(resolved, version)
}

/** Plain <img> for CMS uploads with cache busting and optional fallback. */
export function CmsRawImage({
  src,
  fallback,
  alt = '',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  cacheVersion = 0,
  onError,
  ...props
}) {
  const contextVersion = useCmsMediaVersion()
  const version = resolveVersion(cacheVersion, contextVersion)
  const primary = versionedImageUrl(src, '', version)
  const fallbackUrl = fallback ? withPublicMediaVersion(fallback, version) : ''
  const [currentSrc, setCurrentSrc] = useState(primary || fallbackUrl)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
    setCurrentSrc(primary || fallbackUrl)
  }, [primary, fallbackUrl])

  const handleError = (event) => {
    if (!failed && fallbackUrl && currentSrc !== fallbackUrl) {
      setFailed(true)
      setCurrentSrc(fallbackUrl)
    }
    onError?.(event)
  }

  if (!currentSrc) return null

  return (
    <img
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      {...props}
    />
  )
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
  const contextVersion = useCmsMediaVersion()
  const version = resolveVersion(cacheVersion, contextVersion)
  const initial = needsStorageResolve(src) ? '' : versionedImageUrl(src, fallback, version)
  const [url, setUrl] = useState(initial)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    setFailed(false)
    const sync = versionedImageUrl(src, fallback, version)
    setUrl(sync)

    async function resolveStorage() {
      const trimmed = typeof src === 'string' ? src.trim() : ''
      if (!trimmed || !needsStorageResolve(trimmed)) return
      const resolved = await resolveFirebaseStorageMediaUrl(trimmed)
      if (!cancelled && resolved) {
        setUrl(withPublicMediaVersion(resolved, version))
      }
    }

    resolveStorage()
    return () => {
      cancelled = true
    }
  }, [src, fallback, version])

  if (!url) return null

  const handleError = () => {
    if (!failed && fallback) {
      const fallbackResolved = withPublicMediaVersion(
        resolveCmsImageUrl('', fallback),
        version
      )
      if (fallbackResolved && url !== fallbackResolved) {
        setFailed(true)
        setUrl(fallbackResolved)
      }
    }
  }

  return (
    <img
      key={url}
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
  { src, fallback, className = '', resolveSrc = resolveHeroVideoUrl, cacheVersion = 0, ...props },
  ref
) {
  const contextVersion = useCmsMediaVersion()
  const version = resolveVersion(cacheVersion, contextVersion)
  const resolvedFallback = fallback || resolveSrc()
  const syncUrl = needsStorageResolve(src) ? '' : resolveSrc(src, resolvedFallback)
  const [url, setUrl] = useState(
    syncUrl ? withPublicMediaVersion(syncUrl, version) : ''
  )

  useEffect(() => {
    let cancelled = false
    const nextSync = resolveSrc(src, resolvedFallback)
    setUrl(nextSync ? withPublicMediaVersion(nextSync, version) : '')

    async function resolveStorage() {
      const trimmed = typeof src === 'string' ? src.trim() : ''
      if (!trimmed || !needsStorageResolve(trimmed)) return
      const resolved = await resolveFirebaseStorageMediaUrl(trimmed)
      if (!cancelled && resolved) {
        setUrl(withPublicMediaVersion(resolved, version))
      }
    }

    resolveStorage()
    return () => {
      cancelled = true
    }
  }, [src, resolvedFallback, resolveSrc, version])

  if (!url) return null

  const playback = getVideoPlayback(url)

  const handleError = () => {
    if (playback.kind === 'file' && url !== resolvedFallback) {
      setUrl(withPublicMediaVersion(resolvedFallback, version))
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
