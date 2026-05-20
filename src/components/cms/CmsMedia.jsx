import React, { forwardRef } from 'react'

export function CmsImage({ src, fallback, alt = '', className = '', ...props }) {
  const url = src || fallback
  if (!url) return null
  return <img src={url} alt={alt} className={className} {...props} />
}

export const CmsVideo = forwardRef(function CmsVideo({ src, fallback, className = '', ...props }, ref) {
  const url = src || fallback
  if (!url) return null
  return <video ref={ref} src={url} className={className} {...props} />
})
