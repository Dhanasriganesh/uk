import React from 'react'
import { Link } from 'react-router-dom'
import { FaFilePdf } from 'react-icons/fa'
import { LuArrowRight } from 'react-icons/lu'
import { cmsStringOrFallback } from '../../utils/cmsString'

export default function ProductInfoCta({
  title,
  description,
  cta = {},
}) {
  const displayTitle = cmsStringOrFallback(title, 'Need More Information?')
  const displayDescription = cmsStringOrFallback(
    description,
    'Download our product brochure or speak to our team about your capping requirements.'
  )
  const brochureUrl = (cta.brochureUrl || '').trim()
  const brochureLabel = cmsStringOrFallback(cta.brochureLabel, 'Download Brochure')
  const enquireLabel = cmsStringOrFallback(cta.enquireLabel, 'Enquire about this Product')
  const enquireLink = cmsStringOrFallback(cta.enquireLink, '/contact')

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[140px] w-[140px] opacity-50 sm:h-[200px] sm:w-[200px]"
        style={{
          backgroundImage: 'radial-gradient(rgba(220,38,38,0.28) 1.3px, transparent 1.3px)',
          backgroundSize: '12px 12px',
          WebkitMaskImage: 'radial-gradient(circle at 0% 100%, black 0%, black 55%, transparent 72%)',
          maskImage: 'radial-gradient(circle at 0% 100%, black 0%, black 55%, transparent 72%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[min(22vw,200px)] w-[min(38vw,340px)]"
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 8% 100%)',
          background: 'linear-gradient(160deg, #f87171 0%, #ef4444 45%, #b91c1c 100%)',
        }}
        aria-hidden
      />

      <div className="site-container relative z-10 flex flex-col items-center text-center">
        {displayTitle ? (
          <h2 className="text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl lg:text-4xl">
            {displayTitle}
          </h2>
        ) : null}
        {displayDescription ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5f5f5f] sm:text-base">
            {displayDescription}
          </p>
        ) : null}
        {(brochureUrl || enquireLabel) ? (
          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-lg sm:flex-row sm:justify-center">
          {brochureUrl ? (
            <a
              href={brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#ef4444] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#dc2626] sm:text-base"
            >
              <FaFilePdf className="text-lg" aria-hidden />
              {brochureLabel}
            </a>
          ) : null}
          {enquireLabel ? (
            <Link
              to={enquireLink}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#111111] bg-white px-5 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#f5f5f5] sm:text-base"
            >
              {enquireLabel}
              <LuArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
