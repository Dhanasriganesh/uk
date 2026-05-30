import React, { forwardRef, useEffect, useState } from 'react'
import { resolveHeroVideoUrl } from '../../cms/mediaPaths'
import { resolveCmsImageUrl } from '../../cms/resolveCmsImageUrl'

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

  const handleError = () => {
    if (url !== resolvedFallback) setUrl(resolvedFallback)
  }

  return (
    <video
      ref={ref}
      key={url}
      src={url}
      className={className}
      onError={handleError}
      {...props}
    />
  )
})
