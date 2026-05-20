import React from 'react'

/** Standard page hero: stacks on mobile, two columns from md up */
export function PageHero({ children, className = '' }) {
  return (
    <section className={`site-container py-8 sm:py-12 lg:py-14 ${className}`}>
      <div className="page-hero-grid">{children}</div>
    </section>
  )
}

/** Centered content section with vertical padding */
export function PageSection({ children, className = '', as: Tag = 'section' }) {
  return <Tag className={`site-container section-py ${className}`}>{children}</Tag>
}

/** Full-width band with inner site-container */
export function PageBand({ children, className = '', innerClassName = '' }) {
  return (
    <section className={className}>
      <div className={`site-container section-py ${innerClassName}`}>{children}</div>
    </section>
  )
}
