import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LuCheck } from 'react-icons/lu'
import { useCmsPage } from '../../hooks/useCmsPage'
import ProductInfoCta from '../products/ProductInfoCta'
import {
  SECTOR_ITEMS,
  SECTORS_HUB_DEFAULTS,
} from '../sectors/sectorsHubDefaults'

function SectorCardImage({ src, fallback, alt }) {
  const [failed, setFailed] = useState(false)
  const url = !failed && src ? src : fallback

  return (
    <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-44 lg:h-48">
      {url ? (
        <img
          src={url}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5] to-[#ebebeb]" aria-hidden />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden />
    </div>
  )
}

function mergeSectors(cmsSectors) {
  return SECTOR_ITEMS.map((def, i) => {
    const sector = cmsSectors?.[i] || {}
    const cmsImage = sector.imageUrl?.trim()
    return {
      name: sector.name || def.name,
      solutions: sector.solutions?.length ? sector.solutions : def.solutions,
      imageUrl: cmsImage || def.imageUrl,
      fallbackImageUrl: def.imageUrl,
      icon: def.icon,
    }
  })
}

export default function Sectors() {
  const { content } = useCmsPage('sectors')
  const hub = { ...SECTORS_HUB_DEFAULTS, ...content }
  const sectors = mergeSectors(content.sectors)
  const ctaSection = { ...SECTORS_HUB_DEFAULTS.ctaSection, ...content.ctaSection }
  const cta = { ...SECTORS_HUB_DEFAULTS.cta, ...content.cta }

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
              <li className="font-medium text-[#111111]">Sectors</li>
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
          {sectors.map((sector) => {
            const Icon = sector.icon
            return (
              <article
                key={sector.name}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#f1f1f1] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <SectorCardImage
                  src={sector.imageUrl}
                  fallback={sector.fallbackImageUrl}
                  alt={sector.name}
                />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fef2f2]">
                      <Icon className="h-5 w-5 text-[#dc2626]" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-bold text-[#111111] sm:text-xl">{sector.name}</h2>
                      <div className="mt-2.5 h-[2px] w-8 rounded-full bg-[#dc2626]" />
                    </div>
                  </div>
                  <ul className="mt-1 space-y-2">
                    {sector.solutions.map((solution, idx) => (
                      <li key={idx} className="flex gap-2 text-sm leading-relaxed text-[#5f5f5f]">
                        <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" aria-hidden />
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <ProductInfoCta
        title={ctaSection.title}
        description={ctaSection.description}
        cta={cta}
      />
    </div>
  )
}
