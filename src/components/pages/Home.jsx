import React, { useRef } from 'react'
import Why from './Why'
import Connect from './Connect'
import Brands from './Brands'
import { HERO_VIDEO_URL } from '../../cms/mediaPaths'
import WhatWeDo from '../sections/WhatWeDo'
import { useCmsPage } from '../../hooks/useCmsPage'
import { CmsVideo } from '../cms/CmsMedia'

function Home() {
  const videoRef = useRef(null)
  const { content } = useCmsPage('home')
  const hero = content.hero || {}

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white text-[#111111]">
      <main className="m-0 w-full max-w-full p-0">
        <section
          className="relative flex min-h-[min(calc(100svh-var(--header-height)),900px)] items-center overflow-hidden bg-white py-8 sm:min-h-[calc(100svh-var(--header-height))] sm:py-12 lg:py-0"
          aria-label="Hero"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-full rounded-br-[min(20vw,120px)] bg-[#f5f5f5] sm:w-[75%] sm:rounded-br-[min(24vw,160px)] lg:w-[68%] lg:rounded-br-[min(28vw,200px)]" />
            <div
              className="absolute inset-y-0 left-0 w-full rounded-br-[min(20vw,120px)] opacity-80 sm:w-[75%] lg:w-[68%] lg:rounded-br-[min(28vw,200px)]"
              style={{
                background:
                  'linear-gradient(125deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.35) 45%, rgba(245,245,245,0) 72%)',
              }}
            />
            <div
              className="absolute -left-2 bottom-0 h-[120px] w-[120px] opacity-60 sm:h-[180px] sm:w-[180px] sm:opacity-80 lg:h-[260px] lg:w-[260px]"
              style={{
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)',
                backgroundSize: '11px 11px',
                WebkitMaskImage: 'radial-gradient(circle at 0% 100%, black 0%, black 55%, transparent 72%)',
                maskImage: 'radial-gradient(circle at 0% 100%, black 0%, black 55%, transparent 72%)',
              }}
            />
            <div
              className="absolute bottom-0 right-0 h-[min(18vw,100px)] w-[min(42vw,200px)] sm:h-[min(20vw,140px)] sm:w-[min(38vw,280px)] lg:h-[min(22vw,200px)] lg:w-[min(38vw,340px)]"
              style={{
                clipPath: 'polygon(100% 0, 100% 100%, 8% 100%)',
                background: 'linear-gradient(160deg, #f87171 0%, #ef4444 45%, #b91c1c 100%)',
              }}
            />
            <div
              className="absolute bottom-0 right-0 hidden h-[180px] w-[180px] opacity-60 sm:block lg:h-[260px] lg:w-[260px]"
              style={{
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)',
                backgroundSize: '11px 11px',
                WebkitMaskImage: 'radial-gradient(circle at 100% 100%, black 0%, black 55%, transparent 72%)',
                maskImage: 'radial-gradient(circle at 100% 100%, black 0%, black 55%, transparent 72%)',
              }}
            />
            <div
              className="absolute right-0 top-[100px] hidden h-[200px] w-[200px] opacity-70 lg:block lg:top-[140px] lg:h-[260px] lg:w-[260px]"
              style={{
                backgroundImage: 'radial-gradient(rgba(220,38,38,0.32) 1.3px, transparent 1.3px)',
                backgroundSize: '12px 12px',
                WebkitMaskImage: 'radial-gradient(circle at 100% 0%, black 0%, black 55%, transparent 72%)',
                maskImage: 'radial-gradient(circle at 100% 0%, black 0%, black 55%, transparent 72%)',
              }}
              aria-hidden
            />
          </div>

          <div className="site-container relative z-10 w-full">
            <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex w-full min-w-0 flex-col justify-center self-center text-center lg:text-left">
                <h1 className="text-[clamp(1.75rem,6vw,4rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-black">
                  <span className="block">
                    {hero.line1 || 'Continuous'}{' '}
                    <span className="text-[#dc2626]">{hero.line1Highlight || 'innovation'}</span>
                  </span>
                  <span className="block">
                    {hero.line2 || 'from product'}{' '}
                    <span className="text-[#dc2626]">{hero.line2Highlight || 'diversity'}</span>
                  </span>
                </h1>
                <div className="mx-auto mb-4 mt-4 h-[3px] w-full max-w-[200px] rounded-full bg-[#dc2626] sm:mb-6 sm:mt-6 sm:max-w-[300px] lg:mx-0" />
                <p className="mx-auto mt-4 max-w-xl text-[clamp(1.125rem,3vw,1.5rem)] font-normal leading-[1.75] text-[#5f5f5f] sm:leading-[1.85] lg:mx-0 lg:max-w-[480px]">
                  {hero.description ||
                    'Advanced Tooling Systems UK Ltd offers engineering solutions across multiple and varied business sectors enabling shared innovation and experience.'}
                </p>
              </div>

              <div className="flex w-full min-w-0 lg:h-full lg:min-h-[calc(100svh-var(--header-height)-6rem)]">
                <div className="flex w-full flex-1 overflow-hidden rounded-2xl bg-[#111] shadow-[0_16px_48px_rgba(0,0,0,0.12)] sm:rounded-[20px] lg:h-full">
                  <CmsVideo
                    ref={videoRef}
                    src={hero.videoUrl}
                    fallback={HERO_VIDEO_URL}
                    className="aspect-video w-full min-h-[400px] object-cover sm:min-h-[460px] md:min-h-[500px] lg:aspect-auto lg:h-full lg:min-h-full lg:max-h-none"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    aria-label={hero.videoAriaLabel || 'Industrial machinery and packaging lines'}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="w-full max-w-full overflow-x-hidden">
        <WhatWeDo />
      </div>
      <div className="w-full max-w-full overflow-x-hidden">
        <Why />
      </div>
      <div className="w-full max-w-full overflow-x-hidden">
        <Brands />
      </div>
      <div id="connect-section" className="w-full max-w-full overflow-x-hidden">
        <Connect />
      </div>
    </div>
  )
}

export default Home
