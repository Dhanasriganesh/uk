import React, { useState } from 'react'
import { withAdminPreviewBust } from '../../utils/adminMediaPreview'

export default function AdminImagePreview({ src, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false)
  const displaySrc = withAdminPreviewBust((src || '').trim())

  if (!displaySrc) {
    return <div className="h-full w-full bg-slate-100" aria-hidden />
  }

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-slate-100 px-3 text-center text-xs text-slate-500">
        <span>Preview unavailable</span>
        <span className="truncate font-mono text-[10px]">{displaySrc}</span>
      </div>
    )
  }

  return (
    <img
      key={displaySrc}
      src={displaySrc}
      alt={alt}
      className={className}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
