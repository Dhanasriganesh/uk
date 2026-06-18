import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LuTarget, LuPuzzle, LuGauge } from 'react-icons/lu'
import { useCmsPage } from '../../hooks/useCmsPage'
import ProductInfoCta from '../products/ProductInfoCta'
import {
  cmsFirstArray,
  cmsStringOrFallback,
  mergeCmsHighlightItems,
  mergeCmsObjectStrings,
  mergeCmsTaskItems,
} from '../../utils/cmsString'

function HighlightIcon({ index }) {
  const className = 'h-7 w-7 text-[#dc2626] sm:h-8 sm:w-8'
  if (index === 1) return <LuTarget className={className} aria-hidden />
  if (index === 2) return <LuPuzzle className={className} aria-hidden />
  return <LuGauge className={className} aria-hidden />
}

function HeroImage({ src, alt }) {
  const [failed, setFailed] = useState(false)
  const url = !failed && src ? src : null

  if (!url) return null

  return (
    <div className="overflow-hidden rounded-2xl bg-[#f5f5f5] shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
      <img
        src={url}
        alt={alt}
        className="aspect-[4/3] w-full object-cover"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export default function ConsultationDetailPage({
  pageId,
  breadcrumbLabel,
  parentLabel = 'Consultation',
  parentLink = '/consultation',
  defaults = {},
}) {
  const { content, fromFirestore } = useCmsPage(pageId)

  const eyebrow = cmsStringOrFallback(
    content.eyebrow,
    fromFirestore ? '' : defaults.eyebrow
  )
  const title = cmsStringOrFallback(content.title, fromFirestore ? '' : defaults.title)
  const titleHighlight = cmsStringOrFallback(
    content.titleHighlight,
    fromFirestore ? '' : defaults.titleHighlight
  )
  const summary = cmsStringOrFallback(
    content.summary ?? content.intro,
    fromFirestore ? '' : defaults.summary
  )

  const cmsHeroImage = typeof content.heroImageUrl === 'string' ? content.heroImageUrl.trim() : ''
  const heroImageUrl = fromFirestore
    ? cmsHeroImage
    : cmsHeroImage || (defaults.heroImageUrl ?? '')

  const tasksSectionTitle = cmsStringOrFallback(
    content.tasksSectionTitle ?? content.stepsSectionTitle,
    fromFirestore ? '' : (defaults.tasksSectionTitle ?? defaults.stepsSectionTitle)
  )

  const defaultTaskItems =
    defaults.tasks ?? defaults.steps ?? defaults.cards ?? defaults.competencies ?? []
  const taskSourceKey = Array.isArray(content.tasks)
    ? 'tasks'
    : Array.isArray(content.steps)
      ? 'steps'
      : Array.isArray(content.cards)
        ? 'cards'
        : null
  const tasks = mergeCmsTaskItems(
    taskSourceKey ? content[taskSourceKey] : cmsFirstArray(content, ['tasks', 'steps', 'cards'], []),
    taskSourceKey ? [] : defaultTaskItems
  )

  const defaultHighlights = defaults.highlights ?? []
  const highlights = mergeCmsHighlightItems(
    cmsFirstArray(content, ['highlights'], []),
    fromFirestore ? [] : defaultHighlights
  )

  const ctaSection = mergeCmsObjectStrings(
    content.ctaSection,
    fromFirestore ? {} : defaults.ctaSection,
    ['title', 'description']
  )
  const cta = mergeCmsObjectStrings(
    content.cta,
    fromFirestore ? {} : defaults.cta,
    ['enquireLabel', 'enquireLink', 'brochureUrl', 'brochureLabel']
  )

  const showHeroText = eyebrow || title || titleHighlight || summary
  const showHeroImage = Boolean(heroImageUrl)
  const showCta =
    ctaSection.title ||
    ctaSection.description ||
    cta.enquireLabel ||
    cta.brochureUrl

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
              <li>
                <Link to={parentLink} className="hover:text-[#dc2626]">
                  {parentLabel}
                </Link>
              </li>
              <li aria-hidden>&gt;</li>
              <li className="font-medium text-[#111111]">{breadcrumbLabel}</li>
            </ol>
          </nav>

          {(showHeroText || showHeroImage) && (
            <div
              className={`grid grid-cols-1 gap-8 ${
                showHeroText && showHeroImage ? 'lg:grid-cols-2 lg:gap-12' : ''
              } items-center`}
            >
              {showHeroText ? (
                <div className={`min-w-0 ${showHeroImage ? 'order-2 lg:order-1' : ''}`}>
                  {eyebrow ? (
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#dc2626] sm:text-sm">
                      {eyebrow}
                    </p>
                  ) : null}
                  {title || titleHighlight ? (
                    <h1 className="text-[clamp(1.75rem,5vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#111111]">
                      {title ? <>{title} </> : null}
                      {titleHighlight ? (
                        <span className="text-[#dc2626]">{titleHighlight}</span>
                      ) : null}
                    </h1>
                  ) : null}
                  {title || titleHighlight ? (
                    <div className="mb-5 mt-4 h-[3px] w-full max-w-[120px] rounded-full bg-[#dc2626] sm:max-w-[160px]" />
                  ) : null}
                  {summary ? (
                    <p className="max-w-xl text-sm leading-relaxed text-[#5f5f5f] sm:text-base lg:text-lg">
                      {summary}
                    </p>
                  ) : null}
                </div>
              ) : null}
              {showHeroImage ? (
                <div className={showHeroText ? 'order-1 lg:order-2' : ''}>
                  <HeroImage src={heroImageUrl} alt={breadcrumbLabel} />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {tasks.length > 0 && (
        <section className="site-container pb-12 sm:pb-16">
          {tasksSectionTitle ? (
            <h2 className="mb-6 text-center text-xl font-bold text-[#111111] sm:mb-8 sm:text-2xl">
              {tasksSectionTitle}
            </h2>
          ) : null}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {tasks.map((task) => (
              <article
                key={task.number ? `${task.number}-${task.title}` : task.title}
                className="flex flex-col rounded-2xl border border-[#f1f1f1] bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                {task.number ? (
                  <span className="mb-3 text-2xl font-extrabold text-[#dc2626]">{task.number}</span>
                ) : (
                  <span className="mb-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fef2f2] text-[#dc2626]">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
                {task.title ? (
                  <h3 className="mb-1 text-base font-bold text-[#111111] sm:text-lg">{task.title}</h3>
                ) : null}
                {task.desc ? (
                  <p className="text-sm leading-relaxed text-[#5f5f5f]">{task.desc}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      )}

      {highlights.length > 0 && (
        <section className="border-y border-[#f1f1f1] bg-[#fafafa] py-12 sm:py-16">
          <div className="site-container">
            <div
              className={`grid grid-cols-1 gap-5 md:gap-6 ${
                highlights.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'
              }`}
            >
              {highlights.map((item, idx) => {
                if (!item.title && !item.desc) return null
                return (
                <article
                  key={item.title || idx}
                  className="flex flex-col items-center rounded-2xl border border-[#f1f1f1] bg-white p-6 text-center shadow-sm"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#fef2f2]">
                    <HighlightIcon index={idx} />
                  </div>
                  {item.title ? (
                    <h3 className="mb-2 text-lg font-bold text-[#111111]">{item.title}</h3>
                  ) : null}
                  {item.title ? (
                    <div className="mb-3 h-[2px] w-8 rounded-full bg-[#dc2626]" />
                  ) : null}
                  {item.desc ? (
                    <p className="text-sm leading-relaxed text-[#5f5f5f]">{item.desc}</p>
                  ) : null}
                </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {showCta ? (
        <ProductInfoCta
          title={ctaSection.title}
          description={ctaSection.description}
          cta={cta}
        />
      ) : null}
    </div>
  )
}
