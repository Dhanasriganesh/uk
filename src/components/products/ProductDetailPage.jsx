import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGears } from 'react-icons/fa6'
import { FaQuinscape } from 'react-icons/fa'
import { BsWrenchAdjustable } from 'react-icons/bs'
import {
  LuArrowRight,
  LuChevronLeft,
  LuChevronRight,
  LuDownload,
  LuGauge,
  LuPackage,
  LuPuzzle,
  LuTarget,
  LuTruck,
} from 'react-icons/lu'
import { useCmsPage } from '../../hooks/useCmsPage'
import { CmsVideo } from '../cms/CmsMedia'
import ProductInfoCta from './ProductInfoCta'

const AUTO_SLIDE_MS = 4000

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-[#5f5f5f] sm:text-base">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fef2f2] text-[#dc2626]">
        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  )
}

function FeatureCardIcon({ type }) {
  const className = 'h-6 w-6 text-[#dc2626]'
  if (type === 'cap') return <FaQuinscape className={className} aria-hidden />
  if (type === 'wrench') return <BsWrenchAdjustable className={className} aria-hidden />
  if (type === 'bottle' || type === 'formats') return <LuPackage className={className} aria-hidden />
  if (type === 'conveyor') return <LuTruck className={className} aria-hidden />
  return <FaGears className={className} aria-hidden />
}

function HighlightIcon({ type }) {
  const className = 'h-7 w-7 text-[#dc2626] sm:h-8 sm:w-8'
  if (type === 'target') return <LuTarget className={className} aria-hidden />
  if (type === 'puzzle') return <LuPuzzle className={className} aria-hidden />
  if (type === 'uk') {
    return (
      <span className="text-xl font-bold text-[#dc2626]" aria-hidden>
        UK
      </span>
    )
  }
  return <LuGauge className={className} aria-hidden />
}

function ProductMedia({ section }) {
  if (section.videoUrl) {
    return (
      <div className="overflow-hidden rounded-2xl bg-[#111111] shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
        <CmsVideo
          src={section.videoUrl}
          className="aspect-video w-full object-cover"
          controls
          playsInline
          preload="metadata"
          title={section.title}
        />
      </div>
    )
  }
  if (section.imageUrl) {
    return (
      <div className="overflow-hidden rounded-2xl bg-[#f5f5f5] shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
        <img
          src={section.imageUrl}
          alt={section.title || ''}
          className="aspect-[4/3] w-full object-contain p-4"
        />
      </div>
    )
  }
  return null
}

export default function ProductDetailPage({
  pageId,
  breadcrumbLabel,
  galleryAltPrefix = 'Product',
  fallbackImages = [],
  defaults = {},
}) {
  const { content } = useCmsPage(pageId)
  const hero = { ...defaults.hero, ...content.hero }
  const featureCards = content.featureCards?.length ? content.featureCards : defaults.featureCards || []
  const sections = content.sections?.length ? content.sections : defaults.sections || []
  const highlights = content.highlights?.length ? content.highlights : defaults.highlights || []
  const cta = { ...defaults.cta, ...content.cta }
  const ctaSection = { ...defaults.ctaSection, ...content.ctaSection }
  const brochureUrl = (cta.brochureUrl || '').trim() || defaults.defaultBrochureUrl || '/media/pdf_1718978495.pdf'

  const galleryUrls = content.gallery?.filter(Boolean)?.length
    ? content.gallery.filter(Boolean)
    : fallbackImages

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const total = galleryUrls.length

  useEffect(() => {
    if (paused || total <= 1) return undefined
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, AUTO_SLIDE_MS)
    return () => clearInterval(timerRef.current)
  }, [paused, total])

  const goTo = (idx) => {
    setCurrent((idx + total) % total)
    setPaused(true)
    setTimeout(() => setPaused(false), 5000)
  }

  return (
    <div className="w-full overflow-x-hidden bg-white text-[#111111]">
      <section className="relative overflow-hidden bg-white pb-10 pt-6 sm:pb-14 sm:pt-8 lg:pb-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[68%] rounded-br-[min(28vw,200px)] bg-[#f5f5f5]" aria-hidden />
        <div className="site-container relative">
          <nav className="mb-6 text-xs text-[#5f5f5f] sm:text-sm" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-[#dc2626]">
                  Home
                </Link>
              </li>
              <li aria-hidden>&gt;</li>
              <li>
                <Link to="/products" className="hover:text-[#dc2626]">
                  Products
                </Link>
              </li>
              <li aria-hidden>&gt;</li>
              <li className="font-medium text-[#111111]">{breadcrumbLabel}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#dc2626] sm:text-sm">
                {hero.eyebrow}
              </p>
              <h1 className="text-[clamp(1.75rem,5vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#111111]">
                {hero.title}{' '}
                {hero.titleHighlight ? (
                  <span className="text-[#dc2626]">{hero.titleHighlight}</span>
                ) : null}
              </h1>
              <div className="mb-5 mt-4 h-[3px] w-full max-w-[120px] rounded-full bg-[#dc2626] sm:max-w-[160px]" />
              <p className="mb-6 max-w-xl text-sm leading-relaxed text-[#5f5f5f] sm:text-base lg:text-lg">
                {hero.intro}
              </p>
              <ul className="mb-8 space-y-3">
                {(hero.bullets || []).map((b) => (
                  <CheckItem key={b}>{b}</CheckItem>
                ))}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-[#ef4444] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#dc2626]"
                >
                  Request a Quote
                  <LuArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                {brochureUrl ? (
                  <a
                    href={brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-[#111111] bg-white px-6 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#f5f5f5]"
                  >
                    <LuDownload className="h-4 w-4" aria-hidden />
                    {cta.brochureLabel || 'Download Brochure'}
                  </a>
                ) : null}
              </div>
            </div>

            <div className="min-w-0">
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-[4/3] bg-[#f5f5f5]">
                  {galleryUrls[current] ? (
                    <img
                      src={galleryUrls[current]}
                      alt={`${galleryAltPrefix} ${current + 1}`}
                      className="h-full w-full object-contain p-4"
                      draggable={false}
                    />
                  ) : null}
                </div>
                {total > 1 && (
                  <div className="flex items-center justify-between border-t border-[#f1f1f1] px-4 py-3">
                    <button
                      type="button"
                      onClick={() => goTo(current - 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#f1f1f1] text-[#111111] transition-colors hover:border-[#dc2626] hover:text-[#dc2626]"
                      aria-label="Previous image"
                    >
                      <LuChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#111111]">
                        {current + 1} / {total}
                      </span>
                      <div className="hidden gap-1.5 sm:flex">
                        {galleryUrls.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => goTo(idx)}
                            className={`h-2 w-2 rounded-full transition-colors ${
                              idx === current ? 'bg-[#dc2626]' : 'bg-[#e5e5e5] hover:bg-[#fca5a5]'
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => goTo(current + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#f1f1f1] text-[#111111] transition-colors hover:border-[#dc2626] hover:text-[#dc2626]"
                      aria-label="Next image"
                    >
                      <LuChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {featureCards.length > 0 && (
        <section className="site-container pb-12 sm:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {featureCards.map((card, idx) => {
              const def = defaults.featureCards?.[idx] || {}
              const title = card.title || def.title
              const items = card.items?.length ? card.items : def.items || []
              const linkLabel = card.linkLabel || def.linkLabel || 'Learn more'
              const icon = card.icon || def.icon || 'gears'
              return (
                <article
                  key={title}
                  className="flex flex-col rounded-2xl border border-[#f1f1f1] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fef2f2]">
                    <FeatureCardIcon type={icon} />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-[#111111]">{title}</h3>
                  <ul className="mb-4 flex-1 space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#5f5f5f]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#dc2626]" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="text-sm font-semibold text-[#dc2626]">{linkLabel} →</span>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {sections.map((section, idx) => {
        const def = defaults.sections?.[idx] || {}
        const merged = { ...def, ...section }
        const reversed = idx % 2 === 1
        const textBlock = (
          <div className="min-w-0">
            {merged.eyebrow ? (
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#dc2626]">
                {merged.eyebrow}
              </p>
            ) : null}
            <h2 className="mb-4 text-2xl font-bold text-[#111111] sm:text-3xl lg:text-4xl">{merged.title}</h2>
            <p className="mb-4 text-sm leading-relaxed text-[#5f5f5f] sm:text-base lg:text-lg">{merged.body}</p>
            {merged.bullets?.length > 0 && (
              <ul className="mb-4 space-y-2.5">
                {merged.bullets.map((b) => (
                  <CheckItem key={b}>{b}</CheckItem>
                ))}
              </ul>
            )}
            {merged.footer ? (
              <p className="mb-4 text-sm leading-relaxed text-[#5f5f5f] sm:text-base">{merged.footer}</p>
            ) : null}
            {merged.exploreLabel ? (
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#dc2626]">
                {merged.exploreLabel} <LuArrowRight className="h-4 w-4" />
              </span>
            ) : null}
          </div>
        )
        const mediaBlock = <ProductMedia section={merged} />
        return (
          <section
            key={merged.title}
            className={`site-container py-10 sm:py-12 lg:py-14 ${idx > 0 ? 'border-t border-[#f1f1f1]' : ''}`}
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              {reversed ? (
                <>
                  <div className="order-2 lg:order-1">{mediaBlock}</div>
                  <div className="order-1 lg:order-2">{textBlock}</div>
                </>
              ) : (
                <>
                  {textBlock}
                  {mediaBlock}
                </>
              )}
            </div>
          </section>
        )
      })}

      {highlights.length > 0 && (
        <section className="border-y border-[#f1f1f1] bg-[#f5f5f5] py-8 sm:py-10">
          <div className="site-container">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
              {highlights.map((item, idx) => {
                const def = defaults.highlights?.[idx] || {}
                const label = item.label || def.label
                const icon = item.icon || def.icon
                return (
                  <div key={label} className="flex flex-col items-center text-center">
                    <HighlightIcon type={icon} />
                    <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#111111] sm:text-sm">
                      {label}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <ProductInfoCta
        title={ctaSection.title || 'Need More Information?'}
        description={ctaSection.description || ''}
        cta={{ ...cta, brochureUrl }}
      />
    </div>
  )
}
