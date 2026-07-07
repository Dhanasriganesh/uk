import React from 'react'
import { useCmsPage } from '../../hooks/useCmsPage'
import SectorCardIcon from '../icons/SectorCardIcon'

const CARD_DEFAULTS = [
  {
    title: 'CAD Design and DFM',
    description:
      'Injection moulding and post mould process DFM and design service to the Automotive and Aerospace industries.',
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=500&q=80',
    icon: 'cad',
  },
  {
    title: 'Inspection Equipment',
    description:
      'Quality assurance equipment from gap and flush gauges to fully automated, recording surface measurement equipment.',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&h=500&q=80',
    icon: 'inspection',
  },
  {
    title: 'Aerospace Models',
    description:
      'Aircraft interior mock-ups and monuments from spatial models to full scale, show standard fuselage structures.',
    imageUrl:
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&h=500&q=80',
    icon: 'aerospace',
  },
  {
    title: 'Automotive Engineering',
    description:
      'A complete package of post mould processing equipment, from Pressure Laminators and Ultrasonic Welders to Punching and Assembly Stations.',
    imageUrl:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&h=500&q=80',
    icon: 'automotive',
  },
  {
    title: 'Foundry Patterns',
    description:
      'The reverse engineering and recreation of heritage building casting patterns for the building renovation industry.',
    imageUrl:
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&h=500&q=80',
    icon: 'foundry',
  },
  {
    title: 'Injection Moulding',
    description:
      'Plastic injection moulding tools manufactured to all budgets and volumes, maintained in our UK toolroom.',
    imageUrl:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&h=500&q=80',
    icon: 'moulding',
  },
  {
    title: 'Packaging Solutions',
    description:
      'From capping and filling to robotised packing and palletisation, including pallet wrapping.',
    imageUrl:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&h=500&q=80',
    icon: 'packaging',
  },
  {
    title: 'Machining and Prototyping',
    description:
      'Full support of low volume manufacture including moulding, machining, assembly and painting.',
    imageUrl:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&h=500&q=80',
    icon: 'machining',
  },
]

const CARD_IMAGE_ASPECT = 'aspect-[16/10]'

function CardImage({ src, fallback, alt, priority = false }) {
  const [activeUrl, setActiveUrl] = React.useState(src || fallback || '')
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setActiveUrl(src || fallback || '')
    setLoaded(false)
  }, [src, fallback])

  if (!activeUrl) {
    return (
      <div
        className={`w-full shrink-0 rounded-t-[10px] bg-gradient-to-br from-[#f5f5f5] to-[#ebebeb] ${CARD_IMAGE_ASPECT}`}
      />
    )
  }

  return (
    <div
      className={`relative w-full shrink-0 overflow-hidden rounded-t-[10px] bg-gradient-to-br from-[#f5f5f5] to-[#ebebeb] ${CARD_IMAGE_ASPECT}`}
    >
      {!loaded ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5] to-[#ebebeb]" aria-hidden />
      ) : null}
      <img
        src={activeUrl}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (fallback && activeUrl !== fallback) {
            setActiveUrl(fallback)
            setLoaded(false)
          }
        }}
        className={`h-full w-full object-cover object-center transition-opacity duration-200 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

/** Old seeded URLs that return 404 from Unsplash — ignore so defaults load */
const BROKEN_IMAGE_URLS = new Set([
  'https://images.unsplash.com/photo-1436491865339-7a61a1099695?auto=format&fit=crop&w=800&h=500&q=80',
  'https://images.unsplash.com/photo-1486262715619-67b85e443008?auto=format&fit=crop&w=800&h=500&q=80',
  'https://images.unsplash.com/photo-1565793298595-6a879b1f2c42?auto=format&fit=crop&w=800&h=500&q=80',
  'https://images.unsplash.com/photo-1621905252507-b35492cc74b6?auto=format&fit=crop&w=800&h=500&q=80',
  'https://images.unsplash.com/photo-1586528116311-ad8dd90c14dc?auto=format&fit=crop&w=800&h=500&q=80',
  'https://images.unsplash.com/photo-1565043666747-69f9a6deea28?auto=format&fit=crop&w=800&h=500&q=80',
])

function resolveImageUrl(cmsUrl, defaultUrl) {
  const trimmed = cmsUrl?.trim()
  if (!trimmed || BROKEN_IMAGE_URLS.has(trimmed)) return defaultUrl
  if (trimmed.includes('blob.vercel-storage.com') || trimmed.includes('firebasestorage.googleapis.com')) {
    return trimmed
  }
  return trimmed
}

function isUploadedImage(url) {
  return (
    url.includes('blob.vercel-storage.com') || url.includes('firebasestorage.googleapis.com')
  )
}

function mergeCards(cmsCards, { cmsReady = true } = {}) {
  const list = cmsCards?.length ? cmsCards : CARD_DEFAULTS
  return CARD_DEFAULTS.map((def, i) => {
    const card = list[i] || {}
    const cmsImage = card.imageUrl?.trim()
    const hasCmsImage = cmsImage && !BROKEN_IMAGE_URLS.has(cmsImage)
    const imageUrl =
      hasCmsImage && isUploadedImage(cmsImage)
        ? cmsImage
        : cmsReady
          ? resolveImageUrl(card.imageUrl, def.imageUrl)
          : ''
    return {
      title: card.title || def.title,
      description: card.description || def.description,
      imageUrl,
      defaultImageUrl: def.imageUrl,
      icon: card.icon || def.icon,
    }
  })
}

export default function WhatWeDo() {
  const { content, loading, fromFirestore } = useCmsPage('home-what-we-do')
  const cards = mergeCards(content.cards, { cmsReady: !loading || fromFirestore })

  return (
    <section className="section-py relative w-full overflow-x-hidden bg-white !pb-6 sm:!pb-8 lg:!pb-10">
      <div
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-[min(320px,40%)] opacity-50 sm:block"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '12px 12px',
          WebkitMaskImage: 'radial-gradient(circle at 0% 50%, black 0%, black 50%, transparent 78%)',
          maskImage: 'radial-gradient(circle at 0% 50%, black 0%, black 50%, transparent 78%)',
        }}
        aria-hidden
      />

      <div className="site-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#dc2626] sm:text-xs">
            {content.eyebrow || 'WHAT WE DO'}
          </p>
          <h2
            className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-[#111111] sm:mt-4 sm:text-[34px] lg:text-[40px]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {content.heading || 'Our Services and'}{' '}
            <span className="text-[#dc2626]">{content.headingHighlight || 'Business Sectors'}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-sm leading-relaxed text-[#5f5f5f] sm:text-[15px]">
            {content.intro ||
              'Explore the varied nature of our business below and see how we can support your industry with precision engineering and innovative solutions.'}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-8">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className="flex h-full flex-col overflow-hidden rounded-[10px] border border-[#ececec] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="relative shrink-0">
                <CardImage
                  src={card.imageUrl}
                  fallback={card.defaultImageUrl}
                  alt={card.title}
                  priority={index < 4}
                />
                <div
                  className="absolute bottom-0 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 border-[#fecaca] bg-white shadow-md sm:h-14 sm:w-14"
                  aria-hidden
                >
                  <SectorCardIcon type={card.icon} />
                </div>
              </div>

              <div className="flex flex-1 flex-col px-4 pb-6 pt-10 text-center sm:px-5 sm:pb-7 sm:pt-11">
                <h3
                  className="text-[15px] font-bold leading-snug text-[#111111] sm:text-base"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {card.title}
                </h3>
                <div className="mx-auto mt-2.5 h-[2px] w-8 rounded-full bg-[#dc2626]" />
                <p className="mt-3 flex-1 text-[12px] leading-[1.75] text-[#5f5f5f] sm:text-[13px]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
