import React, { useRef } from 'react'
import Why from './Why'
import Connect from './Connect'
import Brands from './Brands'
import { HERO_VIDEO_URL } from '../../cms/mediaPaths'
import WhatWeDo from '../sections/WhatWeDo'
import CmsPageProvider from '../cms/CmsPageProvider'
import { CmsVideo } from '../cms/CmsMedia'

function Home() {
  const videoRef = useRef(null)

  return (
    <CmsPageProvider pageId="home">
      {({ content }) => {
  const hero = content.hero || {}

  return (
    <div className="page-shell bg-white text-[#111111]">
      <main className="m-0 w-full max-w-full p-0">
        <section
          className="relative overflow-hidden bg-white py-8 sm:py-12 lg:py-14 xl:py-16"
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

          <div className="site-container relative z-10 w-full min-w-0">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8 lg:gap-10 xl:gap-14 2xl:gap-16">
              <div className="flex w-full min-w-0 flex-col justify-center self-center text-center md:text-left">
                <h1 className="text-[clamp(1.75rem,3.5vw+0.5rem,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-black">
                  <span className="block">
                    {hero.line1 || 'Continuous'}{' '}
                    <span className="text-[#dc2626]">{hero.line1Highlight || 'innovation'}</span>
                  </span>
                  <span className="block">
                    {hero.line2 || 'from product'}{' '}
                    <span className="text-[#dc2626]">{hero.line2Highlight || 'diversity'}</span>
                  </span>
                </h1>
                <div className="mx-auto mb-4 mt-4 h-[3px] w-full max-w-[200px] rounded-full bg-[#dc2626] sm:mb-6 sm:mt-6 sm:max-w-[300px] md:mx-0" />
                <p className="mx-auto mt-4 max-w-xl text-[clamp(1rem,1.5vw+0.5rem,1.375rem)] font-normal leading-[1.75] text-[#5f5f5f] sm:leading-[1.85] md:mx-0 md:max-w-[34rem]">
                  {hero.description ||
                    'Advanced Tooling Systems UK Ltd offers engineering solutions across multiple and varied business sectors enabling shared innovation and experience.'}
                </p>
              </div>

              <div className="flex w-full min-w-0">
                <div className="flex w-full max-w-full overflow-hidden rounded-2xl bg-[#111] shadow-[0_16px_48px_rgba(0,0,0,0.12)] sm:rounded-[20px]">
                  <CmsVideo
                    ref={videoRef}
                    src={hero.videoUrl}
                    fallback={HERO_VIDEO_URL}
                    className="aspect-video h-auto w-full max-h-[min(56vw,420px)] object-cover sm:max-h-[min(50vw,460px)] md:max-h-[min(42vw,480px)] lg:max-h-[min(48vh,520px)] xl:max-h-[560px] 2xl:max-h-[600px]"
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
      }}
    </CmsPageProvider>
  )
}

export default Home
