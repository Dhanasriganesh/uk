import React from 'react'
import { useCmsPage } from '../../hooks/useCmsPage'
import { CmsImage } from '../cms/CmsMedia'
import { brandLogoFallbacks } from '../../cms/brandFallbacks'
import { resolveCmsImageUrl } from '../../cms/resolveCmsImageUrl'

function Brands() {
  const { content } = useCmsPage('home-brands')
  const brands = content.brands || []
  const carouselBrands = [...brands, ...brands]

  return (
    <section className="w-full max-w-full overflow-x-hidden py-8 sm:py-12 lg:py-14">
      <div className="site-container">
        <h2
          className="section-title mb-6 text-center sm:mb-8 lg:mb-10"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {content.title || 'Brands'}
        </h2>
        <div className="relative overflow-x-hidden">
          <div className="animate-marquee flex w-max gap-6 sm:gap-10 lg:gap-12">
            {carouselBrands.map((brand, idx) => {
              const i = idx % (brands.length || 1)
              const fallback = brandLogoFallbacks[i % brandLogoFallbacks.length]
              return (
              <div
                key={idx}
                className="flex h-16 w-28 shrink-0 items-center justify-center sm:h-24 sm:w-36 md:h-28 md:w-44"
              >
                <CmsImage
                  src={resolveCmsImageUrl(brand.logoUrl, fallback)}
                  fallback={fallback}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )})}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Brands
