import React, { useEffect, useState } from 'react'
import { CmsImage } from '../cms/CmsMedia'

const AUTO_SLIDE_MS = 4000

export default function AutoSlideCarousel({ images = [], altPrefix = 'Gallery', className = '' }) {
  const urls = images.filter(Boolean)
  const total = urls.length
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    setCurrent(0)
  }, [total])

  useEffect(() => {
    if (paused || total <= 1) return undefined
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, AUTO_SLIDE_MS)
    return () => clearInterval(timer)
  }, [paused, total])

  if (total === 0) return null

  return (
    <div
      className={`w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.08)] ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-media-frame">
        <div
          className="carousel-media-frame__track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {urls.map((url, idx) => (
            <div key={`${url}-${idx}`} className="carousel-media-frame__slide">
              <CmsImage
                src={url}
                alt={`${altPrefix} ${idx + 1}`}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
      {total > 1 ? (
        <div className="flex items-center justify-center gap-1.5 border-t border-[#f1f1f1] px-4 py-3">
          {urls.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-colors ${
                idx === current ? 'bg-[#dc2626]' : 'bg-[#e5e5e5]'
              }`}
              aria-hidden
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
