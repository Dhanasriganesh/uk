import React, { useMemo, useState } from 'react'
import SectorCardIcon from '../../components/icons/SectorCardIcon'
import {
  SECTOR_ICON_OPTIONS,
  EMOJI_ICON_OPTIONS,
  isSectorIcon,
  isEmojiIcon,
  getDefaultIconTab,
} from '../../cms/iconOptions'

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
}

function IconPreview({ value }) {
  if (isSectorIcon(value)) {
    return <SectorCardIcon type={value} className="h-8 w-8 text-red-600" />
  }
  if (value) {
    return <span className="text-3xl leading-none" aria-hidden>{value}</span>
  }
  return <span className="text-sm text-slate-400">None</span>
}

export default function IconPickerField({ path, value, onChange }) {
  const key = path[path.length - 1]
  const selected = value ?? ''
  const initialTab = useMemo(() => getDefaultIconTab(selected, path), [path, selected])
  const [tab, setTab] = useState(initialTab)

  const options = tab === 'sector' ? SECTOR_ICON_OPTIONS : EMOJI_ICON_OPTIONS

  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {formatLabel(key)}
      </label>

      <div className="mb-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
        <IconPreview value={selected} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-800">Selected icon</p>
          <p className="truncate text-xs text-slate-500">{selected || 'Pick an option below'}</p>
        </div>
      </div>

      <div className="mb-3 flex gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setTab('sector')}
          className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
            tab === 'sector' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Service icons
        </button>
        <button
          type="button"
          onClick={() => setTab('emoji')}
          className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
            tab === 'emoji' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Emojis
        </button>
      </div>

      <div
        className="grid grid-cols-4 gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-6 sm:gap-2.5"
        role="listbox"
        aria-label="Icon options"
      >
        {options.map((opt) => {
          const isSelected = selected === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              role="option"
              aria-selected={isSelected}
              title={opt.label}
              onClick={() => onChange(path, opt.id)}
              className={`flex flex-col items-center justify-center gap-1 rounded-lg border p-2 transition-all sm:p-2.5 ${
                isSelected
                  ? 'border-red-500 bg-red-50 ring-2 ring-red-500/30'
                  : 'border-slate-200 bg-slate-50 hover:border-red-300 hover:bg-red-50/50'
              }`}
            >
              {tab === 'sector' ? (
                <SectorCardIcon type={opt.id} className="h-6 w-6 text-red-600" />
              ) : (
                <span className="text-xl leading-none sm:text-2xl">{opt.id}</span>
              )}
              <span className="line-clamp-2 text-center text-[10px] font-medium leading-tight text-slate-600 sm:text-[11px]">
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>

      {selected && !isSectorIcon(selected) && !isEmojiIcon(selected) && (
        <p className="mt-2 text-xs text-amber-700">
          Current value is custom. Select an option above to replace it.
        </p>
      )}
    </div>
  )
}
