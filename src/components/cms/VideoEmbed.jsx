import React, { forwardRef, useEffect, useState } from 'react'
import { getVideoPlayback } from '../../utils/videoEmbed'

/**
 * Renders direct MP4/WebM via <video> or YouTube/Vimeo via <iframe>.
 */
const VideoEmbed = forwardRef(function VideoEmbed(
  {
    src,
    className = '',
    autoPlay = false,
    muted = false,
    loop = false,
    controls = true,
    playsInline = true,
    preload = 'metadata',
    title = 'Video',
    onError,
    ...rest
  },
  ref
) {
  const playback = getVideoPlayback(src, {
    autoplay: autoPlay,
    mute: muted,
    loop,
  })

  const [fileSrc, setFileSrc] = useState(playback.kind === 'file' ? playback.src : '')

  useEffect(() => {
    if (playback.kind === 'file') setFileSrc(playback.src)
  }, [src, playback.kind, playback.src])

  if (playback.kind === 'none') return null

  if (playback.kind === 'youtube' || playback.kind === 'vimeo') {
    return (
      <iframe
        ref={ref}
        src={playback.embedUrl}
        title={title}
        className={className}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        {...rest}
      />
    )
  }

  const handleError = (e) => {
    onError?.(e)
  }

  return (
    <video
      ref={ref}
      key={fileSrc}
      src={fileSrc}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline={playsInline}
      preload={preload}
      onError={handleError}
      aria-label={title}
      {...rest}
    />
  )
})

export default VideoEmbed
