import React, { useMemo } from 'react'
import { useCmsPage } from '../../../hooks/useCmsPage'
import { CmsImage } from '../../cms/CmsMedia'
import { resolveCmsImageUrl } from '../../../cms/resolveCmsImageUrl'
import {
  DEFAULT_SUPPORTED_CUSTOMERS,
  DEFAULT_TRUSTED_PARTNERS,
  supportedCustomerFallbacks,
  supportedCustomerLogoByName,
  trustedPartnerFallbacks,
  trustedPartnerLogoByName,
} from '../../../cms/partnerFallbacks'

const serif = { fontFamily: 'Playfair Display, serif' }

function resolvePartnerItems(items, defaults, fallbacks, logoByName) {
  const list = items?.length ? items : defaults
  return list.map((item, i) => {
    const nameKey = item.name?.toLowerCase()
    const fallback = logoByName[nameKey] ?? fallbacks[i % fallbacks.length]
    return {
      ...item,
      resolvedLogoUrl: resolveCmsImageUrl(item.logoUrl, fallback),
      logoFallback: fallback,
    }
  })
}

function LogoMarquee({ items }) {
  const track = [...items, ...items]

  return (
    <div className="relative w-full overflow-x-hidden">
      <ul className="animate-marquee-slow flex w-max list-none gap-8 sm:gap-10 lg:gap-14">
        {track.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="flex h-14 w-[7.5rem] shrink-0 items-center justify-center sm:h-16 sm:w-32 md:h-[4.5rem] md:w-36 lg:w-40"
          >
            <CmsImage
              src={item.resolvedLogoUrl}
              fallback={item.logoFallback}
              alt={item.name}
              className="max-h-full max-w-full object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Partners() {
  const { content } = useCmsPage('partners')

  const supportedCustomers = useMemo(
    () =>
      resolvePartnerItems(
        content.supportedCustomers,
        DEFAULT_SUPPORTED_CUSTOMERS,
        supportedCustomerFallbacks,
        supportedCustomerLogoByName
      ),
    [content.supportedCustomers]
  )

  const trustedPartners = useMemo(() => {
    const cmsItems = content.trustedPartners?.length
      ? content.trustedPartners
      : content.partners?.length
        ? content.partners
        : null
    return resolvePartnerItems(
      cmsItems,
      DEFAULT_TRUSTED_PARTNERS,
      trustedPartnerFallbacks,
      trustedPartnerLogoByName
    )
  }, [content.trustedPartners, content.partners])

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <section className="pb-8 sm:pb-12">
        <div className="site-container section-py pb-6 sm:pb-8">
          <h2 className="section-title text-center font-bold text-black" style={serif}>
            {content.supportedCustomersHeading || 'Supported Customers'}
          </h2>
        </div>
        <LogoMarquee items={supportedCustomers} />
      </section>

      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="site-container pb-6 sm:pb-8">
          <h2 className="section-title text-center font-bold text-black" style={serif}>
            {content.trustedPartnersHeading || 'Trusted Partners'}
          </h2>
        </div>
        <LogoMarquee items={trustedPartners} />
      </section>
    </div>
  )
}

export default Partners
