import React from 'react'
import { LuPlus, LuTrash2, LuExternalLink } from 'react-icons/lu'
import MediaUploader from './MediaUploader'

const URL_KEY_PATTERN = /(url|image|video|logo|src|background|brochure|embed)/i

function isUrlField(key) {
  return URL_KEY_PATTERN.test(key)
}

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
}

function FieldLabel({ label }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
      {formatLabel(label)}
    </label>
  )
}

const inputClass =
  'w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-base text-slate-900 transition-colors placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 sm:text-sm'

function StringField({ path, value, onChange }) {
  const key = path[path.length - 1]
  const isLong =
    (value?.length || 0) > 80 ||
    key === 'body' ||
    key === 'summary' ||
    key === 'intro' ||
    key === 'description'
  const isUrl = isUrlField(key)

  return (
    <div className="mb-5">
      <FieldLabel label={key} />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        {isLong ? (
          <textarea
            className={`${inputClass} min-h-[120px] flex-1 resize-y`}
            value={value ?? ''}
            onChange={(e) => onChange(path, e.target.value)}
          />
        ) : (
          <input
            type="text"
            className={`${inputClass} flex-1`}
            value={value ?? ''}
            onChange={(e) => onChange(path, e.target.value)}
          />
        )}
        {isUrl && !/video/i.test(key) && (
          <div className="shrink-0 sm:pt-0">
            <MediaUploader onUploaded={(url) => onChange(path, url)} />
          </div>
        )}
      </div>
      {/video/i.test(key) && (
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          Videos: paste a hosted URL (YouTube, CDN, or /public path). Images use the media library (max 680 KB).
        </p>
      )}
      {isUrl && value && (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
        >
          Preview link
          <LuExternalLink className="h-3 w-3" aria-hidden />
        </a>
      )}
    </div>
  )
}

function ArrayOfStrings({ path, value, onChange }) {
  const items = Array.isArray(value) ? value : []
  return (
    <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
      <FieldLabel label={`${path[path.length - 1]} (list)`} />
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={inputClass}
              value={item}
              onChange={(e) => {
                const next = [...items]
                next[i] = e.target.value
                onChange(path, next)
              }}
            />
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-600 transition-colors hover:bg-red-50"
              onClick={() => onChange(path, items.filter((_, j) => j !== i))}
              aria-label="Remove item"
            >
              <LuTrash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
        onClick={() => onChange(path, [...items, ''])}
      >
        <LuPlus className="h-3.5 w-3.5" aria-hidden />
        Add item
      </button>
    </div>
  )
}

function ArrayOfObjects({ path, value, onChange }) {
  const items = Array.isArray(value) ? value : []
  const sample = items[0] || {}

  return (
    <div className="mb-5 space-y-4">
      <FieldLabel label={`${path[path.length - 1]} (${items.length} items)`} />
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <span className="text-sm font-semibold text-slate-800">Item {i + 1}</span>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
              onClick={() => onChange(path, items.filter((_, j) => j !== i))}
            >
              <LuTrash2 className="h-3.5 w-3.5" aria-hidden />
              Remove
            </button>
          </div>
          <DynamicFormFields data={item} path={[...path, i]} onChange={onChange} />
        </div>
      ))}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-red-300 hover:bg-red-50/50 hover:text-red-700"
        onClick={() => {
          const empty = Object.fromEntries(
            Object.keys(sample).map((k) => [
              k,
              typeof sample[k] === 'string' ? '' : Array.isArray(sample[k]) ? [] : '',
            ])
          )
          onChange(path, [...items, empty])
        }}
      >
        <LuPlus className="h-4 w-4" aria-hidden />
        Add {formatLabel(path[path.length - 1].replace(/s$/, ''))}
      </button>
    </div>
  )
}

function ObjectFields({ path, value, onChange }) {
  if (!value || typeof value !== 'object') return null
  return <DynamicFormFields data={value} path={path} onChange={onChange} />
}

function DynamicFormFields({ data, path = [], onChange }) {
  if (!data || typeof data !== 'object') return null

  return (
    <>
      {Object.entries(data).map(([key, val]) => {
        const fieldPath = [...path, key]
        if (val === null || val === undefined) return null
        if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
          return (
            <StringField
              key={fieldPath.join('.')}
              path={fieldPath}
              value={String(val)}
              onChange={onChange}
            />
          )
        }
        if (Array.isArray(val)) {
          if (val.length === 0 || typeof val[0] === 'string') {
            return <ArrayOfStrings key={fieldPath.join('.')} path={fieldPath} value={val} onChange={onChange} />
          }
          return <ArrayOfObjects key={fieldPath.join('.')} path={fieldPath} value={val} onChange={onChange} />
        }
        if (typeof val === 'object') {
          return (
            <div
              key={fieldPath.join('.')}
              className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/30"
            >
              <div className="border-b border-slate-200 bg-white px-4 py-3">
                <h4 className="text-sm font-bold text-slate-800">{formatLabel(key)}</h4>
              </div>
              <div className="p-4">
                <ObjectFields path={fieldPath} value={val} onChange={onChange} />
              </div>
            </div>
          )
        }
        return null
      })}
    </>
  )
}

export default function DynamicForm({ data, onChange }) {
  const handleChange = (path, newValue) => {
    const next = structuredClone(data)
    let cursor = next
    for (let i = 0; i < path.length - 1; i++) {
      cursor = cursor[path[i]]
    }
    cursor[path[path.length - 1]] = newValue
    onChange(next)
  }

  return (
    <div className="w-full min-w-0 max-w-4xl">
      <DynamicFormFields data={data} path={[]} onChange={handleChange} />
    </div>
  )
}
