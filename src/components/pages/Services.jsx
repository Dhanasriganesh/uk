import React from 'react'
import { Link } from 'react-router-dom'
import { LuArrowRight } from 'react-icons/lu'
import CmsPageProvider from '../cms/CmsPageProvider'
import { CmsRawImage } from '../cms/CmsMedia'
import ProductInfoCta from '../products/ProductInfoCta'
import {
  SERVICE_SLIDES,
  SERVICES_HUB_DEFAULTS,
} from '../services/serviceDefaults'
import { PRODUCT_MARQUEE_IMAGES } from '../products/productsHubDefaults'

function ServiceCardImage({ src, fallback, alt }) {
  return (
    <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-48 lg:h-52">
      {src || fallback ? (
        <CmsRawImage
          src={src}
          fallback={fallback}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5] to-[#ebebeb]" aria-hidden />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden />
    </div>
  )
}

function mergeSlides(cmsSlides) {
  const remoteByLink = Object.fromEntries(
    (Array.isArray(cmsSlides) ? cmsSlides : [])
      .filter((slide) => slide?.link)
      .map((slide) => [slide.link, slide])
  )

  return SERVICE_SLIDES.map((def) => {
    const slide = remoteByLink[def.link] || {}
    const cmsImage = slide.imageUrl?.trim()
    return {
      title: slide.title || def.title,
      description: slide.description || def.description,
      link: def.link,
      imageUrl: cmsImage || def.imageUrl,
      fallbackImageUrl: def.imageUrl,
    }
  })
}

function ServiceMarquee({ images }) {
  const urls = images?.length ? images : PRODUCT_MARQUEE_IMAGES
  const track = [...urls, ...urls]

  return (
    <div className="relative overflow-x-hidden border-y border-[#f1f1f1] bg-[#f5f5f5] py-4 sm:py-5">
      <div className="animate-marquee flex w-max items-center gap-3 sm:gap-4">
        {track.map((src, idx) => (
          <div
            key={idx}
            className="h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] sm:h-16 sm:w-28"
          >
            <CmsRawImage
              src={src}
              alt=""
              className="h-full w-full max-w-none object-cover select-none"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <CmsPageProvider pageId="services">
      {({ content }) => {
  const hub = {
    ...SERVICES_HUB_DEFAULTS,
    eyebrow: content.eyebrow || SERVICES_HUB_DEFAULTS.eyebrow,
    pageTitle: content.pageTitle || SERVICES_HUB_DEFAULTS.pageTitle,
    pageTitleHighlight: content.pageTitleHighlight || SERVICES_HUB_DEFAULTS.pageTitleHighlight,
    intro: content.intro || SERVICES_HUB_DEFAULTS.intro,
  }
  const slides = mergeSlides(content.slides)
  const ctaSection = { ...SERVICES_HUB_DEFAULTS.ctaSection, ...content.ctaSection }
  const cta = { ...SERVICES_HUB_DEFAULTS.cta, ...content.cta }
  const marqueeImages = content.galleryImageUrls?.filter(Boolean)?.length
    ? content.galleryImageUrls.filter(Boolean)
    : null

  return (
    <div className="w-full overflow-x-hidden bg-white text-[#111111]">
      <section className="relative overflow-hidden bg-white pb-10 pt-6 sm:pb-14 sm:pt-8 lg:pb-16">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[68%] rounded-br-[min(28vw,200px)] bg-[#f5f5f5]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[min(18vw,100px)] w-[min(42vw,200px)] sm:h-[min(20vw,140px)] sm:w-[min(38vw,280px)]"
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 8% 100%)',
            background: 'linear-gradient(160deg, #f87171 0%, #ef4444 45%, #b91c1c 100%)',
          }}
          aria-hidden
        />

        <div className="site-container relative">
          <nav className="mb-6 text-xs text-[#5f5f5f] sm:text-sm" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-[#dc2626]">
                  Home
                </Link>
              </li>
              <li aria-hidden>&gt;</li>
              <li className="font-medium text-[#111111]">Services</li>
            </ol>
          </nav>

          <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#dc2626] sm:text-sm">
              {hub.eyebrow}
            </p>
            <h1 className="mt-3 text-[clamp(1.75rem,5vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#111111]">
              {hub.pageTitle}{' '}
              <span className="text-[#dc2626]">{hub.pageTitleHighlight}</span>
            </h1>
            <div className="mx-auto mb-5 mt-4 h-[3px] w-full max-w-[120px] rounded-full bg-[#dc2626] sm:max-w-[160px]" />
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#5f5f5f] sm:text-base lg:text-lg">
              {hub.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="site-container pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {slides.map((slide) => (
            <Link
              key={slide.link}
              to={slide.link}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#f1f1f1] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
            >
              <ServiceCardImage
                src={slide.imageUrl}
                fallback={slide.fallbackImageUrl}
                alt={slide.title}
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h2 className="text-lg font-bold text-[#111111] sm:text-xl">{slide.title}</h2>
                <div className="mb-3 mt-2.5 h-[2px] w-8 rounded-full bg-[#dc2626]" />
                <p className="flex-1 text-sm leading-relaxed text-[#5f5f5f]">{slide.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#dc2626]">
                  Learn more
                  <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ServiceMarquee images={marqueeImages} />

      <ProductInfoCta
        title={ctaSection.title}
        description={ctaSection.description}
        cta={cta}
      />
    </div>
  )
      }}
    </CmsPageProvider>
  )
}
