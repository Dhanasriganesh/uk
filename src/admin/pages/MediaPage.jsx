import React, { useEffect, useState } from 'react'
import { listMedia, deleteMediaItem } from '../../firebase/cmsService'
import MediaUploader from '../components/MediaUploader'
import AdminAuthStatus from '../components/AdminAuthStatus'

export default function MediaPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    try {
      setItems(await listMedia())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url)
    alert('Base64 image URL copied. Paste into any imageUrl field in the page editor.')
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this image from Firestore?')) return
    await deleteMediaItem(id)
    refresh()
  }

  return (
    <div className="p-8">
      <AdminAuthStatus />

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="mt-1 max-w-xl text-sm text-gray-500">
            Images are stored in Firestore as base64 data URLs (no Firebase Storage). Max ~750 KB per image.
            For videos, use a text field and paste an external URL (e.g. YouTube or your CDN).
          </p>
        </div>
        <MediaUploader onUploaded={() => refresh()} />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-500">
          No images yet. Upload a PNG or JPG above.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <img src={item.url || item.dataUrl} alt={item.name} className="h-40 w-full object-contain bg-gray-50 p-2" />
              <div className="p-3">
                <p className="truncate text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-400">{Math.round((item.size || 0) / 1024)} KB</p>
                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url || item.dataUrl)}
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Copy URL
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-xs font-medium text-gray-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
