import React from 'react'
import { FaFilePdf } from 'react-icons/fa'

export default function ProductCta({ cta = {} }) {
  const brochureUrl = (cta.brochureUrl || '').trim()
  const brochureLabel = cta.brochureLabel || 'Download Brochure'
  const enquireLabel = cta.enquireLabel || 'Enquire about this Product'
  const enquireLink = cta.enquireLink || '/contact'

  return (
    <section className="site-container flex w-full flex-col items-center justify-center py-8">
      <div className="flex w-full max-w-xs flex-col justify-center gap-3 sm:max-w-xl">
        {brochureUrl ? (
          <a
            href={brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-black px-6 py-3 text-center text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-900 hover:shadow-2xl sm:text-lg"
          >
            <FaFilePdf className="mr-2 inline-block align-middle text-lg sm:text-xl" />
            {brochureLabel}
          </a>
        ) : null}
        <a
          href={enquireLink}
          className="w-full rounded-full border border-blue-200 bg-white px-6 py-3 text-center text-base font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-2xl sm:text-lg"
        >
          {enquireLabel}
        </a>
      </div>
    </section>
  )
}
