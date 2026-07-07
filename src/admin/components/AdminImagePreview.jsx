import React, { useEffect, useState } from 'react'
import { withAdminPreviewBust } from '../../utils/adminMediaPreview'

export default function AdminImagePreview({ src, alt = '', className = '' }) {
  const [displaySrc, setDisplaySrc] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const trimmed = (src || '').trim()

    if (!trimmed) {
      setDisplaySrc('')
      setReady(false)
      return undefined
    }

    const busted = withAdminPreviewBust(trimmed)
    setReady(false)

    const img = new Image()
    img.onload = () => {
      if (!cancelled) {
        setDisplaySrc(busted)
        setReady(true)
      }
    }
    img.onerror = () => {
      if (!cancelled) {
        setDisplaySrc(busted)
        setReady(true)
      }
    }
    img.src = busted

    return () => {
      cancelled = true
    }
  }, [src])

  if (!ready || !displaySrc) {
    return <div className="h-full w-full bg-slate-100" aria-hidden />
  }

  return <img src={displaySrc} alt={alt} className={className} decoding="async" />
}
