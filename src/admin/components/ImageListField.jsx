import React, { useState } from 'react'
import { LuImage, LuPlus, LuTrash2 } from 'react-icons/lu'
import MediaUploader from './MediaUploader'
import AdminImagePreview from './AdminImagePreview'
import { withAdminPreviewBust } from '../../utils/adminMediaPreview'

function formatLabel(key) {
  const str = String(key ?? '')
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
}

/**
 * Multi-image admin field for gallery / carousel lists.
 * Uploads append to the list; thumbnails show every saved image.
 */
export default function ImageListField({ path, value, onChange }) {
  const key = path[path.length - 1]
  const label = formatLabel(key)
  const urls = (Array.isArray(value) ? value : []).filter(Boolean)
  const [replaceIndex, setReplaceIndex] = useState(null)

  const saveUrls = (nextUrls, options = {}) => {
    onChange(path, nextUrls, options)
  }

  const handleAppend = (url) => {
    if (!url) return
    onChange(path, null, { autoSave: true, appendUrl: url })
    setReplaceIndex(null)
  }

  const handleReplace = (url) => {
    if (replaceIndex === null || !url) return
    onChange(path, null, {
      autoSave: true,
      replaceIndex,
      replaceUrl: url,
    })
    setReplaceIndex(null)
  }

  const handleRemove = (index) => {
    saveUrls(
      urls.filter((_, i) => i !== index),
      { autoSave: true }
    )
    if (replaceIndex === index) setReplaceIndex(null)
  }

  const uploadHandler = replaceIndex !== null ? handleReplace : handleAppend
  const replaceUrl = replaceIndex !== null ? urls[replaceIndex] : undefined

  return (
    <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-0.5 text-xs text-slate-500">
            {urls.length === 0
              ? 'No images yet — upload below to add.'
              : `${urls.length} image${urls.length === 1 ? '' : 's'} — carousel slides when 2 or more.`}
          </p>
        </div>
        {urls.length > 0 ? (
          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
            {urls.length} saved
          </span>
        ) : null}
      </div>

      {urls.length > 0 ? (
        <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {urls.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className={`group relative overflow-hidden rounded-lg border bg-white shadow-sm ${
                replaceIndex === index ? 'border-red-500 ring-2 ring-red-500/30' : 'border-slate-200'
              }`}
            >
              <div className="aspect-square bg-slate-100">
                <AdminImagePreview
                  src={withAdminPreviewBust(url)}
                  alt={`${label} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-black/70 to-transparent px-1.5 pb-1.5 pt-6">
                <span className="text-[10px] font-semibold text-white">{index + 1}</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-slate-800 hover:bg-white"
                    onClick={() => setReplaceIndex(replaceIndex === index ? null : index)}
                  >
                    {replaceIndex === index ? 'Cancel' : 'Replace'}
                  </button>
                  <button
                    type="button"
                    className="rounded bg-red-600/90 p-1 text-white hover:bg-red-600"
                    onClick={() => handleRemove(index)}
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <LuTrash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4 flex aspect-[3/1] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-slate-400">
          <div className="text-center">
            <LuImage className="mx-auto h-8 w-8 opacity-40" aria-hidden />
            <p className="mt-2 text-xs">Uploaded images appear here as thumbnails</p>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3">
        <p className="mb-2 text-xs font-medium text-slate-700">
          {replaceIndex !== null
            ? `Replace image ${replaceIndex + 1}`
            : 'Add another image (keeps existing images)'}
        </p>
        <MediaUploader variant="inline" accept="image" replaceUrl={replaceUrl} onUploaded={uploadHandler} />
        {replaceIndex === null ? (
          <p className="mt-2 text-[11px] text-slate-500">
            Each upload adds a new slide. Add at least 2 images to see the carousel effect on the website.
          </p>
        ) : null}
      </div>
    </div>
  )
}
