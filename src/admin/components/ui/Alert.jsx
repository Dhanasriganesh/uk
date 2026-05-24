import React from 'react'
import { LuCircleAlert, LuCircleCheck, LuInfo, LuTriangleAlert, LuX } from 'react-icons/lu'

const variants = {
  success: {
    wrap: 'border-emerald-200/80 bg-emerald-50 text-emerald-900',
    icon: LuCircleCheck,
    iconClass: 'text-emerald-600',
  },
  error: {
    wrap: 'border-red-200/80 bg-red-50 text-red-900',
    icon: LuCircleAlert,
    iconClass: 'text-red-600',
  },
  warning: {
    wrap: 'border-amber-200/80 bg-amber-50 text-amber-900',
    icon: LuTriangleAlert,
    iconClass: 'text-amber-600',
  },
  info: {
    wrap: 'border-sky-200/80 bg-sky-50 text-sky-900',
    icon: LuInfo,
    iconClass: 'text-sky-600',
  },
}

export default function Alert({ variant = 'info', children, onDismiss, className = '' }) {
  const config = variants[variant] || variants.info
  const Icon = config.icon

  return (
    <div
      role="alert"
      className={`flex gap-3 rounded-xl border px-4 py-3 text-sm shadow-sm ${config.wrap} ${className}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconClass}`} aria-hidden />
      <div className="min-w-0 flex-1 leading-relaxed">{children}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-lg p-1 opacity-60 transition-opacity hover:opacity-100"
          aria-label="Dismiss"
        >
          <LuX className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
