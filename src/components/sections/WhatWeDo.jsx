import React from 'react'

function Icon({ children }) {
  return (
    <div className="absolute left-1/2 top-[168px] z-10 -translate-x-1/2 rounded-full bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-[#f1f1f1]">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#dc2626]">
        {children}
      </div>
    </div>
  )
}

const cards = [
  {
    title: 'CAD Design and DFM',
    description:
      'Injection moulding and post mould process DFM and design service to the Automotive and Aerospace industries.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-6 0a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-6 0v4h6V3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h6" />
      </svg>
    ),
  },
  {
    title: 'Inspection Equipment',
    description:
      'Quality assurance equipment from gap and flush gauges to fully automated, recording surface measurement equipment.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
        <circle cx="11" cy="11" r="6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 20l-3.5-3.5" />
      </svg>
    ),
  },
  {
    title: 'Aerospace Models',
    description:
      'Aircraft interior mock-ups and monuments from special models to full scale, show standard fuselage structures.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12l10.5-4-10.5-4v8Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12L4 14.5V9.5L10.5 12Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12v8l2.5-2 2-6" />
      </svg>
    ),
  },
  {
    title: 'Automotive Engineering',
    description:
      'A complete package of post mould processing equipment, from Pressure Laminators and Ultrasonic Welders to Punching and Assembly Stations.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17h10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 11l2-5h8l2 5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 11h14v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17a1 1 0 1 0 0.01 0M16 17a1 1 0 1 0 0.01 0" />
      </svg>
    ),
  },
  {
    title: 'Foundry Patterns',
    description:
      'The reverse engineering and recreation of heritage building casting patterns for the building renovation industry.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M6 7v14h12V7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11h6M9 15h6" />
      </svg>
    ),
  },
  {
    title: 'Injection Moulding',
    description:
      'Plastic injection moulding tools manufactured to all budgets and volumes, maintained in our UK toolroom.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10v10H7V7Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h3M17 12h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v3M12 17v3" />
      </svg>
    ),
  },
  {
    title: 'Packaging Solutions',
    description: 'From capping and filling to robotised packing and palletisation, including pallet wrapping.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10v10H7V7Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10" />
      </svg>
    ),
  },
  {
    title: 'Machining and Prototyping',
    description:
      'Full support of low volume manufacture including moulding, machining, assembly and painting.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 19V7l5-3 5 3v12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11h6M9 15h6" />
      </svg>
    ),
  },
]

function ImagePlaceholder() {
  return (
    <div className="h-[200px] w-full bg-gradient-to-br from-[#f5f5f5] to-white" aria-hidden />
  )
}

export default function WhatWeDo() {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-0 top-0 h-full w-[320px] opacity-60"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)',
            backgroundSize: '12px 12px',
            WebkitMaskImage: 'radial-gradient(circle at 0% 50%, black 0%, black 55%, transparent 75%)',
            maskImage: 'radial-gradient(circle at 0% 50%, black 0%, black 55%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-6">
        <div className="text-center">
          <div className="text-[12px] font-semibold tracking-[0.18em] text-[#dc2626]">WHAT WE DO</div>
          <h2 className="mt-4 text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#111111] sm:text-[40px]">
            Our Services and <span className="text-[#dc2626]">Business Sectors</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-[14px] leading-[1.8] text-[#5f5f5f]">
            Explore the varied nature of our business below and see how we can support your industry with precision
            engineering and innovative solutions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-[14px] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.06)] ring-1 ring-[#f1f1f1]"
            >
              <div className="relative">
                <ImagePlaceholder />
                <Icon>{card.icon}</Icon>
              </div>

              <div className="px-6 pb-6 pt-10 text-center">
                <h3 className="text-[14px] font-extrabold tracking-[-0.01em] text-[#111111]">{card.title}</h3>
                <div className="mx-auto mt-3 h-[2px] w-7 rounded-full bg-[#dc2626]" />
                <p className="mt-4 text-[12px] leading-[1.8] text-[#5f5f5f]">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

