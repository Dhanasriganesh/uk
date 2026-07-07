import React from 'react'
import { isPersistentCmsImageUrl, resolveCmsImageUrl } from '../../cms/resolveCmsImageUrl'
import CmsPageProvider from '../cms/CmsPageProvider'
import { CmsRawImage } from '../cms/CmsMedia'
import engWatermark from '../../assets/ats/eng.jpg'

function AboutContent({ content }) {
  const paragraphs = content.paragraphs || []
  const cmsWatermark = content.watermarkImageUrl?.trim() || ''
  const watermarkSrc = resolveCmsImageUrl(
    isPersistentCmsImageUrl(cmsWatermark) ? cmsWatermark : '',
    engWatermark
  )

  return (
    <main className="section-py bg-gray-50">
      <div className="site-container">
        <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-xl sm:p-6 md:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 flex min-h-full items-center justify-center overflow-hidden" aria-hidden>
            <CmsRawImage
              src={watermarkSrc !== engWatermark ? watermarkSrc : ''}
              fallback={engWatermark}
              alt=""
              className="h-[min(80%,720px)] w-[min(80%,960px)] max-h-none max-w-none object-contain opacity-[0.28] sm:opacity-[0.32]"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.9) 55%, rgba(255,255,255,0.94) 100%)',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
            <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-black">
              {content.pageTitleLine1 || 'About'}{' '}
              <span className="text-[#dc2626]">{content.pageTitleHighlight || 'Us'}</span>
            </h1>
            <div className="h-[3px] w-16 rounded-full bg-[#dc2626] sm:w-20" />
            <h2 className="text-base font-bold text-[#111111] sm:text-lg md:text-xl">
              {content.companyName || 'Advanced Tooling Systems UK Ltd'}
            </h2>
            {paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-[#5f5f5f] sm:text-base lg:text-lg">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function About() {
  return (
    <CmsPageProvider pageId="about">
      {({ content }) => <AboutContent content={content} />}
    </CmsPageProvider>
  )
}

export default About
