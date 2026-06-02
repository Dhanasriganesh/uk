import React, { useMemo } from 'react'
import { useCmsPage } from '../../hooks/useCmsPage'
import { CmsImage } from '../cms/CmsMedia'
import { resolvePartnerItems } from '../../cms/resolvePartnerLogos'
import {
  DEFAULT_SUPPORTED_CUSTOMERS,
  supportedCustomerFallbacks,
  supportedCustomerLogoByName,
} from '../../cms/partnerFallbacks'

export default function Brands() {
  const { content: brandsContent } = useCmsPage('home-brands')
  const { content: partnersContent } = useCmsPage('partners')

  const brands = useMemo(
    () =>
      resolvePartnerItems(
        partnersContent.supportedCustomers,
        DEFAULT_SUPPORTED_CUSTOMERS,
        supportedCustomerFallbacks,
        supportedCustomerLogoByName
      ),
    [partnersContent.supportedCustomers]
  )

  const carouselBrands = [...brands, ...brands]

  return (
    <section className="w-full max-w-full overflow-x-hidden py-8 sm:py-12 lg:py-14">
      <div className="site-container">
        <h2
          className="section-title mb-6 text-center sm:mb-8 lg:mb-10"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {brandsContent.title || 'Brands'}
        </h2>
        <div className="relative overflow-x-hidden">
          <div className="animate-marquee flex w-max gap-6 sm:gap-10 lg:gap-12">
            {carouselBrands.map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex h-16 w-28 shrink-0 items-center justify-center sm:h-24 sm:w-36 md:h-28 md:w-44"
              >
                <CmsImage
                  src={brand.resolvedLogoUrl}
                  fallback={brand.logoFallback}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
