import React from 'react'

const variants = {
  primary:
    'bg-red-600 text-white shadow-sm shadow-red-600/20 hover:bg-red-700 focus-visible:ring-red-500/40 disabled:shadow-none',
  secondary:
    'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-300/60',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-300/60',
  danger:
    'border border-red-200 bg-white text-red-700 shadow-sm hover:border-red-300 hover:bg-red-50 focus-visible:ring-red-300/50',
}

const sizes = {
  sm: 'min-h-[36px] gap-1.5 rounded-lg px-3 text-xs sm:min-h-[32px]',
  md: 'min-h-[44px] gap-2 rounded-xl px-4 text-sm',
  lg: 'min-h-[48px] gap-2 rounded-xl px-5 text-sm',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  children,
  icon: Icon,
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex touch-manipulation items-center justify-center font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
      {children}
    </button>
  )
}
