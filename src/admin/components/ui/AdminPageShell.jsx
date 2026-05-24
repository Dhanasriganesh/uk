import React from 'react'

export default function AdminPageShell({ children, className = '', noBottomPad = false }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1600px] px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8 ${
        noBottomPad ? '' : 'lg:pb-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}
