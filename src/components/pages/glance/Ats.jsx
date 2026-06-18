import React from 'react'
import { useCmsPage } from '../../../hooks/useCmsPage'
import { CmsImage } from '../../cms/CmsMedia'
import GlancePageTitle from '../../glance/GlancePageTitle'
import { glanceTitleFromContent } from '../../glance/glanceTitleFromContent'

const serif = { fontFamily: 'Playfair Display, serif' }
const RED = '#c00000'

const FALLBACK_IMAGES = {
  heroAircraft:
    'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=960&h=640&q=80',
  cabinInterior:
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=960&h=560&q=80',
}

const FALLBACK_WELCOME_PARAGRAPHS = [
  'The ATS group was originally founded in 2002 with the goal of becoming a complete solution provider to a wide range of industry sectors.',
  'After over 20 years, ATS has invested heavily in technology, completed a number of acquisitions and have ultimately sought the skilled personnel required to become the leading industry experts in product design, development and manufacturing for both production parts and turn-key processes.',
  'Our increasing range of services, all housed within our 2 manufacturing sites based in Maidstone & Folkestone in Kent, give ATS the unique ability to take on projects from initial concept to delivered, production parts or processes with close management throughout by our team of engineers and project managers.',
  'Adrian Gander – Group MD comments "We recognise the importance of trust in our industry and our ethos has always been to grow relationships with our customers by ensuring they return, thus creating long-term partnerships and opportunities for both parties. Our impressive client base is testament to our success in this goal"',
  'ATS are a ISO9001-2015 quality and standards certified company, committed to customer service and satisfaction',
]

const FALLBACK_RIGHT_PARAGRAPHS = [
  'Projects over the last 20 years in the Aerospace, Automotive, Packaging and Injection Moulding space in both prototype and production guises, have brought in-depth experience and expertise across such a variety of business sectors, giving a competitive edge due to the significant cross-sector initiatives and learning, ensuring project exceeds expectation.',
  'Whether it be producing high quality, individual components to customer drawings, or the design and build of complete production processes and equipment for final, high-volume manufacture, the cross-sector expertise offer the scope for fresh new ideas for manufacture methods, complex engineering solutions and confidence in our products.',
  'This, in turn brings ATS the diversity that is essential to maintaining consistent sales growth and work flow without the fluctuations all too familiar in the alternative, monoculture style of business.',
]

const FALLBACK_THUMBNAILS = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=320&h=240&q=80',
    alt: 'Aircraft wing above the clouds',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=320&h=240&q=80',
    alt: 'Automotive interior',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=320&h=240&q=80',
    alt: 'Precision engineering component',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=320&h=240&q=80',
    alt: 'Industrial manufacturing',
  },
]

function MailIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function CenterNav({ companyHistoryLabel, whyAtsLabel }) {
  return (
    <nav className="mx-auto w-full max-w-[140px] border border-[#d8d8d8] bg-[#ebebeb] lg:mx-0">
      <a
        href="#company-history"
        className="block border-b border-[#d8d8d8] px-3 py-4 text-center text-[13px] font-bold leading-tight text-[#c00000] hover:bg-[#e0e0e0] sm:px-4 sm:text-sm"
      >
        {companyHistoryLabel}
      </a>
      <a
        href="#why-ats-uk"
        className="block bg-white px-3 py-4 text-center text-[13px] font-bold leading-tight text-[#c00000] hover:bg-[#fafafa] sm:px-4 sm:text-sm"
      >
        {whyAtsLabel}
      </a>
    </nav>
  )
}

function Ats() {
  const { content } = useCmsPage('ats')

  const glanceTitle = glanceTitleFromContent(content)
  const leftHeading = (content.leftHeading ?? '').trim()
  const heroTagline = content.heroTagline || 'A World Leading Engineering Service Provider'
  const welcomeHeading = content.welcomeHeading || 'Welcome to Advanced Tooling Systems UK'
  const rightTagline = content.rightTagline || heroTagline
  const contactEmail = content.contactEmail || 'info@atsuk.com'

  const welcomeParagraphs =
    content.welcomeParagraphs?.length > 0 ? content.welcomeParagraphs : FALLBACK_WELCOME_PARAGRAPHS
  const rightParagraphs =
    content.rightParagraphs?.length > 0 ? content.rightParagraphs : FALLBACK_RIGHT_PARAGRAPHS
  const thumbnails = content.thumbnails?.length > 0 ? content.thumbnails : FALLBACK_THUMBNAILS

  return (
    <section className="site-container bg-white pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20">
      <GlancePageTitle
        line1={glanceTitle.line1}
        highlight={glanceTitle.highlight}
        className="mb-8 lg:mb-10"
      />

      <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(110px,0.22fr)_minmax(0,1fr)] lg:gap-x-3 xl:gap-x-4">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          {leftHeading ? (
            <h2 className="mb-2 text-[2rem] font-bold leading-none text-black sm:text-[2.35rem] lg:text-[2.5rem]" style={serif}>
              {leftHeading}
            </h2>
          ) : null}
          <div className="relative overflow-hidden bg-neutral-200">
            <CmsImage
              src={content.heroImageUrl}
              fallback={FALLBACK_IMAGES.heroAircraft}
              alt="Commercial aircraft in flight"
              className="block aspect-[16/11] w-full object-cover sm:aspect-[16/10]"
            />
            <div className="absolute bottom-3 left-3 max-w-[200px] bg-white/95 px-3 py-2.5 sm:bottom-4 sm:left-4 sm:max-w-[230px] sm:px-3.5 sm:py-3">
              <p className="text-[11px] font-bold leading-snug text-[#c00000] sm:text-xs">{heroTagline}</p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-center lg:col-start-2 lg:row-start-1 lg:self-end">
          <CenterNav
            companyHistoryLabel={content.navCompanyHistory || 'Company History'}
            whyAtsLabel={content.navWhyAts || 'Why ATS UK?'}
          />
        </div>

        <div className="min-w-0 lg:col-start-3 lg:row-start-1">
          <div className="mb-2 flex justify-end">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-white sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"
              style={{ backgroundColor: RED }}
            >
              <MailIcon />
              {contactEmail}
            </a>
          </div>
          <p className="mb-2 text-[11px] italic text-[#888888] sm:mb-2.5 sm:text-xs">{rightTagline}</p>
          <div className="overflow-hidden bg-neutral-200">
            <CmsImage
              src={content.rightHeroImageUrl}
              fallback={FALLBACK_IMAGES.cabinInterior}
              alt="Luxury aircraft cabin interior"
              className="block aspect-[16/10] w-full object-cover"
            />
          </div>
          <div className="mt-3 h-px w-full sm:mt-4" style={{ backgroundColor: RED }} aria-hidden />
        </div>

        <div id="company-history" className="scroll-mt-28 lg:col-start-1 lg:row-start-2 lg:pt-6">
          <h3 className="mb-2 text-lg font-bold text-[#555555] sm:text-xl lg:text-[1.35rem]">{welcomeHeading}</h3>
          <div className="mb-4 h-px w-full sm:mb-5" style={{ backgroundColor: RED }} aria-hidden />
          <div className="space-y-3.5 text-[13px] leading-[1.65] text-black sm:space-y-4 sm:text-sm sm:leading-[1.7]">
            {welcomeParagraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>

        <div className="hidden lg:col-start-2 lg:row-start-2 lg:block" aria-hidden />

        <div id="why-ats-uk" className="scroll-mt-28 lg:col-start-3 lg:row-start-2 lg:pt-6">
          <h3
            className="pointer-events-none mb-2 hidden text-lg font-bold sm:text-xl lg:invisible lg:block lg:text-[1.35rem]"
            aria-hidden
          >
            {welcomeHeading}
          </h3>
          <div className="mb-4 hidden h-px w-full sm:mb-5 lg:invisible lg:block" aria-hidden />
          <div className="flex gap-3 sm:gap-4">
            <div className="min-w-0 flex-1 space-y-3.5 text-[13px] leading-[1.65] text-black sm:space-y-4 sm:text-sm sm:leading-[1.7]">
              {rightParagraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
            <div className="flex w-[68px] shrink-0 flex-col gap-1.5 sm:w-[76px] sm:gap-2 lg:w-[82px]">
              {thumbnails.map((img, i) => (
                <CmsImage
                  key={img.alt || i}
                  src={img.imageUrl}
                  fallback={FALLBACK_THUMBNAILS[i]?.imageUrl}
                  alt={img.alt || ''}
                  className="aspect-square w-full object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ats
