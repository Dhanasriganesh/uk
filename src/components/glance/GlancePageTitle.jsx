import React from 'react'

/**
 * Shared main heading for pages under ATS at a Glance (black + red hero style).
 */
export default function GlancePageTitle({
  line1 = 'ATS At a',
  highlight = 'Glance',
  className = '',
}) {
  return (
    <header className={`text-center ${className}`}>
      <h1 className="page-hero-title-sm text-black">
        {line1}{' '}
        <span className="text-[#dc2626]">{highlight}</span>
      </h1>
      <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#dc2626] sm:mt-5 sm:w-20" aria-hidden />
    </header>
  )
}
