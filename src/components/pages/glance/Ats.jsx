import React from 'react'
import CmsPageProvider from '../../cms/CmsPageProvider'
import { CmsImage } from '../../cms/CmsMedia'
import GlancePageTitle from '../../glance/GlancePageTitle'
import { glanceTitleFromContent } from '../../glance/glanceTitleFromContent'

const serif = { fontFamily: 'Playfair Display, serif' }
const RED = '#c00000'
const HERO_ASPECT = 'aspect-[16/10]'

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

function HeroImageFrame({ src, fallback, alt }) {
  return (
    <div className={`relative w-full overflow-hidden bg-neutral-200 ${HERO_ASPECT}`}>
      <CmsImage
        src={src}
        fallback={fallback}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  )
}

function AtsContent({ content }) {
  const glanceTitle = glanceTitleFromContent(content)
  const leftHeading = (content.leftHeading ?? '').trim()
  const tagline =
    content.rightTagline || content.heroTagline || 'A World Leading Engineering Service Provider'
  const welcomeHeading = content.welcomeHeading || 'Welcome to Advanced Tooling Systems UK'
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
        className="mb-6 lg:mb-8"
      />

      <div className="mb-6 flex justify-end sm:mb-8">
        <a
          href={`mailto:${contactEmail}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-white sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"
          style={{ backgroundColor: RED }}
        >
          <MailIcon />
          {contactEmail}
        </a>
      </div>

      {tagline ? (
        <h2
          className="mx-auto mb-8 max-w-4xl text-center text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight text-black sm:mb-10"
          style={serif}
        >
          {tagline}
        </h2>
      ) : null}

      <div className="mb-8 grid grid-cols-1 items-stretch gap-5 sm:gap-6 lg:mb-10 lg:grid-cols-2 lg:gap-8">
        <div className="flex min-w-0 flex-col">
          {leftHeading ? (
            <h3 className="mb-2 text-center text-lg font-bold text-[#555555] sm:text-xl lg:text-left" style={serif}>
              {leftHeading}
            </h3>
          ) : null}
          <HeroImageFrame
            src={content.heroImageUrl}
            fallback={FALLBACK_IMAGES.heroAircraft}
            alt="ATS engineering and manufacturing"
          />
        </div>

        <div className="flex min-w-0 flex-col">
          <HeroImageFrame
            src={content.rightHeroImageUrl}
            fallback={FALLBACK_IMAGES.cabinInterior}
            alt="ATS facilities and capabilities"
          />
          <div className="mt-3 h-px w-full sm:mt-4" style={{ backgroundColor: RED }} aria-hidden />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
        <div id="company-history" className="scroll-mt-28">
          <h3 className="mb-2 text-lg font-bold text-[#555555] sm:text-xl lg:text-[1.35rem]">{welcomeHeading}</h3>
          <div className="mb-4 h-px w-full sm:mb-5" style={{ backgroundColor: RED }} aria-hidden />
          <div className="space-y-3.5 text-[13px] leading-[1.65] text-black sm:space-y-4 sm:text-sm sm:leading-[1.7]">
            {welcomeParagraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>

        <div id="why-ats-uk" className="scroll-mt-28">
          <div className="space-y-3.5 text-[13px] leading-[1.65] text-black sm:space-y-4 sm:text-sm sm:leading-[1.7]">
            {rightParagraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3">
            {thumbnails.map((img, i) => (
              <div key={img.alt || i} className="overflow-hidden bg-neutral-200">
                <CmsImage
                  src={img.imageUrl}
                  fallback={FALLBACK_THUMBNAILS[i]?.imageUrl}
                  alt={img.alt || ''}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Ats() {
  return (
    <CmsPageProvider pageId="ats">
      {({ content }) => <AtsContent content={content} />}
    </CmsPageProvider>
  )
}

export default Ats
