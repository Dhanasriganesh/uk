import React from 'react'
import MediaUploader from './MediaUploader'

const URL_KEY_PATTERN = /(url|image|video|logo|src|background|brochure|embed)/i

function isUrlField(key) {
  return URL_KEY_PATTERN.test(key)
}

function FieldLabel({ label }) {
  return (
    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
      {label}
    </label>
  )
}

function StringField({ path, value, onChange }) {
  const key = path[path.length - 1]
  const isLong = (value?.length || 0) > 80 || key === 'body' || key === 'summary' || key === 'intro' || key === 'description'
  const isUrl = isUrlField(key)

  return (
    <div className="mb-4">
      <FieldLabel label={key} />
      <div className="flex gap-2">
        {isLong ? (
          <textarea
            className="min-h-[100px] flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={value ?? ''}
            onChange={(e) => onChange(path, e.target.value)}
          />
        ) : (
          <input
            type="text"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={value ?? ''}
            onChange={(e) => onChange(path, e.target.value)}
          />
        )}
        {isUrl && !/video/i.test(key) && (
          <MediaUploader onUploaded={(url) => onChange(path, url)} />
        )}
      </div>
      {/video/i.test(key) && (
        <p className="mt-1 text-xs text-gray-500">Videos: paste a hosted URL (YouTube, CDN, or /public path). Images upload to Firestore.</p>
      )}
      {isUrl && value && (
        <a href={value} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs text-blue-600">
          Preview link
        </a>
      )}
    </div>
  )
}

function ArrayOfStrings({ path, value, onChange }) {
  const items = Array.isArray(value) ? value : []
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <FieldLabel label={`${path[path.length - 1]} (list)`} />
      {items.map((item, i) => (
        <div key={i} className="mb-2 flex gap-2">
          <input
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
            value={item}
            onChange={(e) => {
              const next = [...items]
              next[i] = e.target.value
              onChange(path, next)
            }}
          />
          <button
            type="button"
            className="text-xs text-red-600"
            onClick={() => onChange(path, items.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-xs font-medium text-blue-600"
        onClick={() => onChange(path, [...items, ''])}
      >
        + Add item
      </button>
    </div>
  )
}

function ArrayOfObjects({ path, value, onChange }) {
  const items = Array.isArray(value) ? value : []
  const sample = items[0] || {}

  return (
    <div className="mb-4 space-y-4">
      <FieldLabel label={`${path[path.length - 1]} (${items.length} items)`} />
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Item {i + 1}</span>
            <button
              type="button"
              className="text-xs text-red-600"
              onClick={() => onChange(path, items.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
          <DynamicFormFields data={item} path={[...path, i]} onChange={onChange} />
        </div>
      ))}
      <button
        type="button"
        className="rounded-lg border border-dashed border-blue-400 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
        onClick={() => {
          const empty = Object.fromEntries(Object.keys(sample).map((k) => [k, typeof sample[k] === 'string' ? '' : Array.isArray(sample[k]) ? [] : '']))
          onChange(path, [...items, empty])
        }}
      >
        + Add {path[path.length - 1].replace(/s$/, '')}
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
            <div key={fieldPath.join('.')} className="mb-6 rounded-xl border border-gray-200 p-4">
              <h4 className="mb-3 text-sm font-bold capitalize text-gray-800">{key}</h4>
              <ObjectFields path={fieldPath} value={val} onChange={onChange} />
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
    <div className="max-w-3xl">
      <DynamicFormFields data={data} path={[]} onChange={handleChange} />
    </div>
  )
}
