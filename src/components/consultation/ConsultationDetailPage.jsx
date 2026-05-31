import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LuTarget, LuPuzzle, LuGauge } from 'react-icons/lu'
import { useCmsPage } from '../../hooks/useCmsPage'
import ProductInfoCta from '../products/ProductInfoCta'

function HighlightIcon({ index }) {
  const className = 'h-7 w-7 text-[#dc2626] sm:h-8 sm:w-8'
  if (index === 1) return <LuTarget className={className} aria-hidden />
  if (index === 2) return <LuPuzzle className={className} aria-hidden />
  return <LuGauge className={className} aria-hidden />
}

function HeroImage({ src, fallback, alt }) {
  const [failed, setFailed] = useState(false)
  const url = !failed && src ? src : fallback

  return (
    <div className="overflow-hidden rounded-2xl bg-[#f5f5f5] shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
      {url ? (
        <img
          src={url}
          alt={alt}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#f5f5f5] to-[#ebebeb]" aria-hidden />
      )}
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
  const { content } = useCmsPage(pageId)

  const eyebrow = content.eyebrow || defaults.eyebrow
  const title = content.title || defaults.title
  const titleHighlight = content.titleHighlight || defaults.titleHighlight
  const summary = content.summary || content.intro || defaults.summary
  const heroImageUrl = (content.heroImageUrl || '').trim() || defaults.heroImageUrl

  const tasksSectionTitle =
    content.tasksSectionTitle || content.stepsSectionTitle || defaults.tasksSectionTitle || defaults.stepsSectionTitle
  const tasks = content.tasks?.length
    ? content.tasks
    : content.competencies?.length
      ? content.competencies.map((item) =>
          typeof item === 'string' ? { title: item, desc: '' } : item
        )
      : content.cards?.length
        ? content.cards
        : content.steps?.length
          ? content.steps
          : defaults.tasks?.length
            ? defaults.tasks
            : defaults.competencies?.length
              ? defaults.competencies.map((item) =>
                  typeof item === 'string' ? { title: item, desc: '' } : item
                )
              : defaults.cards?.length
                ? defaults.cards
                : defaults.steps || []
  const highlights = content.highlights?.length ? content.highlights : defaults.highlights || []
  const ctaSection = { ...defaults.ctaSection, ...content.ctaSection }
  const cta = { ...defaults.cta, ...content.cta }

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

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0 order-2 lg:order-1">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#dc2626] sm:text-sm">
                {eyebrow}
              </p>
              <h1 className="text-[clamp(1.75rem,5vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#111111]">
                {title}{' '}
                {titleHighlight ? <span className="text-[#dc2626]">{titleHighlight}</span> : null}
              </h1>
              <div className="mb-5 mt-4 h-[3px] w-full max-w-[120px] rounded-full bg-[#dc2626] sm:max-w-[160px]" />
              <p className="max-w-xl text-sm leading-relaxed text-[#5f5f5f] sm:text-base lg:text-lg">
                {summary}
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <HeroImage src={heroImageUrl} fallback={defaults.heroImageUrl} alt={breadcrumbLabel} />
            </div>
          </div>
        </div>
      </section>

      {tasks.length > 0 && (
        <section className="site-container pb-12 sm:pb-16">
          <h2 className="mb-6 text-center text-xl font-bold text-[#111111] sm:mb-8 sm:text-2xl">
            {tasksSectionTitle || 'What We Deliver'}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {tasks.map((task, idx) => {
              const def = defaults.tasks?.[idx] || defaults.steps?.[idx] || {}
              const taskTitle = task.title || def.title
              const taskDesc = task.desc || task.description || def.desc
              const taskNumber = task.number || def.number
              return (
                <article
                  key={taskNumber ? `${taskNumber}-${taskTitle}` : taskTitle}
                  className="flex flex-col rounded-2xl border border-[#f1f1f1] bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                >
                  {taskNumber ? (
                    <span className="mb-3 text-2xl font-extrabold text-[#dc2626]">{taskNumber}</span>
                  ) : (
                    <span className="mb-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fef2f2] text-[#dc2626]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  <h3 className="mb-1 text-base font-bold text-[#111111] sm:text-lg">{taskTitle}</h3>
                  {taskDesc ? (
                    <p className="text-sm leading-relaxed text-[#5f5f5f]">{taskDesc}</p>
                  ) : null}
                </article>
              )
            })}
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
                const def = defaults.highlights?.[idx] || {}
                const itemTitle = item.title || def.title
                const itemDesc = item.desc || item.text || def.desc
                return (
                  <article
                    key={itemTitle}
                    className="flex flex-col items-center rounded-2xl border border-[#f1f1f1] bg-white p-6 text-center shadow-sm"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#fef2f2]">
                      <HighlightIcon index={idx} />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-[#111111]">{itemTitle}</h3>
                    <div className="mb-3 h-[2px] w-8 rounded-full bg-[#dc2626]" />
                    <p className="text-sm leading-relaxed text-[#5f5f5f]">{itemDesc}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <ProductInfoCta
        title={ctaSection.title}
        description={ctaSection.description}
        cta={cta}
      />
    </div>
  )
}
