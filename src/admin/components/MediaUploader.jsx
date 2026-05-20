import React, { useState } from 'react'
import { uploadMedia, formatMediaError } from '../../firebase/cmsService'

const ACCEPT = 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml'

export default function MediaUploader({ onUploaded }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const result = await uploadMedia(file)
      onUploaded?.(result.url, result)
    } catch (err) {
      setError(formatMediaError(err) || err.message || 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="inline-flex flex-col gap-1">
      <label className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
        {uploading ? 'Saving…' : 'Upload image'}
        <input type="file" accept={ACCEPT} className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
      {error && <span className="max-w-xs text-xs text-red-600">{error}</span>}
    </div>
  )
}
