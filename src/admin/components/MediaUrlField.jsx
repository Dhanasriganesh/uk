import React, { useState } from 'react'
import { LuExternalLink, LuPencil, LuX } from 'react-icons/lu'
import MediaUploader from './MediaUploader'
import { isVideoUrl } from '../../cms/mediaLimits'
import VideoEmbed from '../../components/cms/VideoEmbed'
import AdminImagePreview from './AdminImagePreview'
import { isFirebaseStoragePath } from '../../cms/mediaSeed'
import { withAdminPreviewBust } from '../../utils/adminMediaPreview'

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
}

const inputClass =
  'w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-base text-slate-900 transition-colors placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 sm:text-sm'

export default function MediaUrlField({ path, value, onChange }) {
  const key = path[path.length - 1]
  const accept = /video/i.test(key) ? 'video' : /image|logo|photo|background/i.test(key) ? 'image' : 'any'
  const [editingUrl, setEditingUrl] = useState(false)
  const [previewVersion, setPreviewVersion] = useState(0)
  const trimmed = (value || '').trim()
  const isVideo = isVideoUrl(trimmed) || /video/i.test(key)
  const previewSrc =
    trimmed && previewVersion > 0
      ? withAdminPreviewBust(trimmed, previewVersion)
      : trimmed
  const canOpenDirectly =
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    (trimmed.startsWith('/') && !isFirebaseStoragePath(trimmed))
  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {formatLabel(key)}
      </label>

      {trimmed ? (
        <div className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <div className="relative aspect-[16/10] max-h-48 w-full bg-slate-100">
            {isVideo ? (
              <VideoEmbed
                src={trimmed}
                className="h-full w-full border-0 object-cover"
                controls
                playsInline
                preload="metadata"
                title="Preview"
              />
            ) : (
              <AdminImagePreview src={previewSrc} alt="" className="h-full w-full object-cover object-center" />
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 px-3 py-2">
            <p className="min-w-0 flex-1 truncate text-xs text-slate-600" title={trimmed}>
              {trimmed}
            </p>
            {canOpenDirectly ? (
              <a
                href={trimmed}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
              >
                Open
                <LuExternalLink className="h-3 w-3" aria-hidden />
              </a>
            ) : null}
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
              onClick={() => onChange(path, '')}
            >
              <LuX className="h-3 w-3" aria-hidden />
              Clear
            </button>
          </div>
        </div>
      ) : (
        <p className="mb-2 text-xs text-slate-500">No file selected — upload or paste a URL below.</p>
      )}

      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3">
        <p className="mb-2 text-xs font-medium text-slate-700">
          {accept === 'video' ? 'Upload video' : 'Upload image'}
        </p>
        <MediaUploader
          variant="inline"
          accept={accept}
          replaceUrl={trimmed || undefined}
          onUploaded={(url) => {
            onChange(path, url, { autoSave: true })
            setPreviewVersion((v) => v + 1)
            setEditingUrl(false)
          }}
        />
        <p className="mt-2 text-[11px] text-slate-500">
          Upload saves to Vercel Blob and auto-saves this page to Firebase.
        </p>
      </div>

      {!editingUrl ? (
        <button
          type="button"
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-red-600"
          onClick={() => setEditingUrl(true)}
        >
          <LuPencil className="h-3 w-3" aria-hidden />
          Paste URL manually
        </button>
      ) : (
        <div className="mt-3 space-y-2">
          <input
            type="text"
            className={inputClass}
            value={value ?? ''}
            placeholder={
              isVideo
                ? '/videos/clip.mp4 or https://www.youtube.com/watch?v=…'
                : '/media/photo.jpg or https://…'
            }
            onChange={(e) => onChange(path, e.target.value)}
          />
          <button
            type="button"
            className="text-xs font-medium text-slate-500 hover:text-slate-800"
            onClick={() => setEditingUrl(false)}
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}
