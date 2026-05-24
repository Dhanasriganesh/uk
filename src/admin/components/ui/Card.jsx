import React from 'react'

export default function Card({ children, className = '', padding = true }) {
  return (
    <div
      className={`rounded-xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50 sm:rounded-2xl ${
        padding ? 'p-4 sm:p-6' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, description, action }) {
  return (
    <div className="mb-4 flex flex-col gap-3 border-b border-slate-100 pb-4 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
      <div className="min-w-0">
        {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
