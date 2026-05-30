import React, { forwardRef, useEffect, useState } from 'react'
import { resolveHeroVideoUrl } from '../../cms/mediaPaths'
<<<<<<< HEAD
import { resolveCmsImageUrl } from '../../cms/resolveCmsImageUrl'
=======
import { getVideoPlayback } from '../../utils/videoEmbed'
import VideoEmbed from './VideoEmbed'
>>>>>>> 2456c060222b6e08d9bd41deadfda5e2b3a6fca2

export function CmsImage({ src, fallback, alt = '', className = '', ...props }) {
  const initial = resolveCmsImageUrl(src, fallback)
  const [url, setUrl] = useState(initial)

  useEffect(() => {
    setUrl(resolveCmsImageUrl(src, fallback))
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
  const initialUrl = resolveSrc(src, resolvedFallback)
  const [url, setUrl] = useState(initialUrl)

  useEffect(() => {
    setUrl(resolveSrc(src, resolvedFallback))
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
