import React from 'react'
import { useCmsPage } from '../../../hooks/useCmsPage'
import { CmsImage } from '../../cms/CmsMedia'
import p1 from '../../../assets/p1.png'
import p2 from '../../../assets/p2.png'
import p3 from '../../../assets/p3.png'
import p4 from '../../../assets/p4.png'
import p5 from '../../../assets/p5.png'
import p6 from '../../../assets/p6.png'   
const serif = { fontFamily: 'Playfair Display, serif' }

const IMAGE_FALLBACKS = [p1, p2, p3, p4, p5, p6]

const DEFAULT_MEMBERS = [
  { name: 'Adrian Gander', title: 'Group Managing Director', imageUrl: '' },
  { name: 'Rob Ward', title: 'General Manager', imageUrl: '' },
  { name: 'Cara Davidson', title: 'Group Head of Finance', imageUrl: '' },
  { name: 'Matt Kerby', title: 'Technical Sales Manager', imageUrl: '' },
  { name: 'Dominic Cust', title: 'Head of Project Management', imageUrl: '' },
  { name: 'Steve Holt', title: 'Works Manager', imageUrl: '' },
]

const DEFAULT_INTRO = [
  'Our senior management team brings together extensive experience across engineering, manufacturing, and customer support.',
  'Committed to innovation and excellence, they provide strategic leadership across all areas of the business.',
  'Together, they ensure Advanced Tooling Systems UK Ltd continues to deliver outstanding results for our clients worldwide.',
]

function TeamMemberCard({ member, imageFallback }) {
  return (
    <article className="min-w-0">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900">
        <CmsImage
          src={member.imageUrl}
          fallback={imageFallback}
          alt={member.name}
          className="aspect-[4/5] w-full object-cover object-top grayscale"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3 pb-3 pt-14 sm:px-4 sm:pb-4 sm:pt-16"
          aria-hidden
        />
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 sm:px-4 sm:pb-4">
          <h3 className="text-sm font-bold leading-tight text-white sm:text-base lg:text-lg">{member.name}</h3>
          <p className="mt-0.5 text-xs font-normal leading-snug text-white/90 sm:text-sm">{member.title}</p>
        </div>
      </div>
    </article>
  )
}

function Team() {
  const { content } = useCmsPage('team')

  const members = content.members?.length ? content.members : DEFAULT_MEMBERS

  const introLines = content.intro
    ? String(content.intro)
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
    : DEFAULT_INTRO

  return (
    <section className="site-container section-py bg-white">
      <header className="mx-auto mb-10 max-w-4xl text-center sm:mb-12 lg:mb-14">
        <h1
          className="page-title mb-4 font-bold tracking-tight text-black sm:mb-5"
          style={serif}
        >
          {content.title || 'ATS At a Glance'}
        </h1>
        <h2
          className="mb-5 text-xl font-bold text-[#dc2626] sm:mb-6 sm:text-2xl lg:text-3xl"
          style={serif}
        >
          {content.sectionHeading || 'Our Senior Management Team'}
        </h2>
        <div className="mx-auto max-w-3xl space-y-2 text-sm leading-relaxed text-[#5f5f5f] sm:space-y-2.5 sm:text-base lg:text-lg">
          {introLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6 lg:gap-4 xl:gap-5">
        {members.map((member, idx) => (
          <TeamMemberCard
            key={`${member.name}-${idx}`}
            member={member}
            imageFallback={IMAGE_FALLBACKS[idx % IMAGE_FALLBACKS.length]}
          />
        ))}
      </div>
    </section>
  )
}

export default Team
