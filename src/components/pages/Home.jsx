import React, { useRef } from 'react'
import Why from './Why'
import Connect from './Connect'
import Brands from './Brands'
import atsVideo from '../../assets/ats-uk.mp4'
import WhatWeDo from '../sections/WhatWeDo'

function Home() {
  const videoRef = useRef(null)

  return (
    <div className="w-full bg-white text-[#111111]">
      <main className="m-0 w-full p-0">
        <section
          className="relative flex min-h-svh items-center bg-white"
          aria-label="Hero"
        >
          {/* Decorative backgrounds */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Left ~68% light grey + curved edge */}
            <div className="absolute inset-y-0 left-0 w-[68%] rounded-br-[min(28vw,200px)] bg-[#f5f5f5]" />

            {/* Subtle diagonal overlay */}
            <div
              className="absolute inset-y-0 left-0 w-[68%] rounded-br-[min(28vw,200px)] opacity-80"
              style={{
                background:
                  'linear-gradient(125deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.35) 45%, rgba(245,245,245,0) 72%)',
              }}
            />

            {/* Bottom-left subtle grey dots */}
            <div
              className="absolute -left-2 bottom-0 h-[260px] w-[260px] opacity-80"
              style={{
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)',
                backgroundSize: '11px 11px',
                WebkitMaskImage: 'radial-gradient(circle at 0% 100%, black 0%, black 55%, transparent 72%)',
                maskImage: 'radial-gradient(circle at 0% 100%, black 0%, black 55%, transparent 72%)',
              }}
            />

            {/* Bottom-right red angled shape */}
            <div
              className="absolute bottom-0 right-0 h-[min(22vw,200px)] w-[min(38vw,340px)]"
              style={{
                clipPath: 'polygon(100% 0, 100% 100%, 8% 100%)',
                background: 'linear-gradient(160deg, #f87171 0%, #ef4444 45%, #b91c1c 100%)',
              }}
            />

            {/* Bottom-right grey dot grid */}
            <div
              className="absolute bottom-0 right-0 h-[260px] w-[260px] opacity-60"
              style={{
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)',
                backgroundSize: '11px 11px',
                WebkitMaskImage: 'radial-gradient(circle at 100% 100%, black 0%, black 55%, transparent 72%)',
                maskImage: 'radial-gradient(circle at 100% 100%, black 0%, black 55%, transparent 72%)',
              }}
            />

            {/* Right-side red dot grid (as per reference) */}
            <div
              className="absolute right-0 top-[140px] hidden h-[260px] w-[260px] opacity-70 lg:block"
              style={{
                backgroundImage: 'radial-gradient(rgba(220,38,38,0.32) 1.3px, transparent 1.3px)',
                backgroundSize: '12px 12px',
                WebkitMaskImage: 'radial-gradient(circle at 100% 0%, black 0%, black 55%, transparent 72%)',
                maskImage: 'radial-gradient(circle at 100% 0%, black 0%, black 55%, transparent 72%)',
              }}
              aria-hidden
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 py-24 lg:py-0">
            <div className="grid grid-cols-1 items-center gap-8  lg:grid-cols-[minmax(0,40%)_minmax(0,60%)] lg:gap-0">

              {/* Left copy — pushed to left edge */}
              <div className="w-full min-w-0 justify-self-start text-left md:-ml-10 xl:-ml-36 lg:-ml-28">
                <h1 className="text-[36px] font-extrabold leading-[1.08] tracking-[-0.02em] text-black sm:text-[48px] lg:text-[56px] xl:text-[64px]">
                  <span className="block lg:whitespace-nowrap ">
                    Continuous <span className="text-[#dc2626]">innovation</span>
                  </span>
                  <span className="block lg:whitespace-nowrap">
                    from product <span className="text-[#dc2626]">diversity</span>
                  </span>
                </h1>
                <div className="mt-6 mb-6 h-[3px] w-[300px] rounded-full bg-[#dc2626] "  />
                <p className="max-w-[380px] text-[20px] font-normal leading-[1.85] text-[#5f5f5f] lg:max-w-[360px] ml-35 mt-15">
                  Advanced Tooling Systems UK Ltd offers engineering solutions
                  across multiple and varied business sectors enabling shared
                  innovation and experience.
                </p>
              </div>

              {/* Right video — shifted right with left margin */}
              <div className="w-full min-w-0 justify-self-center lg:ml-38 lg:pl-0 mt-15">
                <div className="overflow-hidden rounded-[20px] bg-[#111] shadow-[0_16px_48px_rgba(0,0,0,0.12)] ">
                  <video
                    ref={videoRef}
                    src={atsVideo}
                    className="h-[240px] w-full object-cover sm:h-[320px] lg:h-[460px]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    aria-label="Industrial machinery and packaging lines"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <div className="w-full"><WhatWeDo /></div>
      <div className="w-full"><Why /></div>
      <div className="w-full"><Brands /></div>
      <div id="connect-section" className="w-full"><Connect /></div>
    </div>
  )
}

export default Home