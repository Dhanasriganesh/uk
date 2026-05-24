import React from 'react'

export default function Spinner({ className = 'h-8 w-8', label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status">
      <div
        className={`animate-spin rounded-full border-[3px] border-slate-200 border-t-red-600 ${className}`}
        aria-hidden
      />
      {label && <p className="text-sm font-medium text-slate-500">{label}</p>}
    </div>
  )
}
