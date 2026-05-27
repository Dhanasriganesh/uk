import React, { useState } from 'react'
import { LuExternalLink, LuFileText, LuPencil, LuX } from 'react-icons/lu'
import MediaUploader from './MediaUploader'

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
}

const inputClass =
  'w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-base text-slate-900 transition-colors placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 sm:text-sm'

export default function BrochureUrlField({ path, value, onChange }) {
  const key = path[path.length - 1]
  const [editingUrl, setEditingUrl] = useState(false)
  const trimmed = (value || '').trim()
  const fileName = trimmed ? trimmed.split('/').pop() : ''

  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {formatLabel(key)}
      </label>

      {trimmed ? (
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <LuFileText className="h-6 w-6" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">{fileName || 'Brochure PDF'}</p>
            <p className="truncate text-xs text-slate-500" title={trimmed}>
              {trimmed}
            </p>
          </div>
          <a
            href={trimmed}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
          >
            Open
            <LuExternalLink className="h-3 w-3" aria-hidden />
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
            onClick={() => onChange(path, '')}
          >
            <LuX className="h-3 w-3" aria-hidden />
            Clear
          </button>
        </div>
      ) : (
        <p className="mb-2 text-xs text-slate-500">No brochure yet — upload a PDF below.</p>
      )}

      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3">
        <p className="mb-2 text-xs font-medium text-slate-700">Upload brochure (PDF)</p>
        <MediaUploader
          variant="inline"
          accept="pdf"
          onUploaded={(url) => {
            onChange(path, url)
            setEditingUrl(false)
          }}
        />
        <p className="mt-2 text-[11px] text-slate-500">
          Saved under <code className="rounded bg-slate-100 px-1">public/media/</code> (max 25 MB).
        </p>
      </div>

      {!editingUrl ? (
        <button
          type="button"
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-red-600"
          onClick={() => setEditingUrl(true)}
        >
          <LuPencil className="h-3 w-3" aria-hidden />
          Paste PDF URL manually
        </button>
      ) : (
        <div className="mt-3 space-y-2">
          <input
            type="text"
            className={inputClass}
            value={value ?? ''}
            placeholder="/media/brochure.pdf or https://…"
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
