import React from 'react'

import { useCmsPage } from '../../hooks/useCmsPage'

import { CmsImage } from '../cms/CmsMedia'



const defaultIcon = (

  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>

    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-6 0a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-6 0v4h6V3" />

  </svg>

)



function ImageBlock({ imageUrl }) {

  if (imageUrl) {

    return <CmsImage src={imageUrl} alt="" className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] sm:h-[200px]" />

  }

  return <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#f5f5f5] to-white sm:aspect-[16/10] sm:h-[200px]" aria-hidden />

}



export default function WhatWeDo() {

  const { content } = useCmsPage('home-what-we-do')

  const cards = content.cards || []



  return (

    <section className="section-py relative w-full max-w-full overflow-x-hidden bg-white">

      <div className="pointer-events-none absolute inset-0 hidden sm:block">

        <div

          className="absolute left-0 top-0 h-full w-[200px] opacity-60 md:w-[320px]"

          style={{

            backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)',

            backgroundSize: '12px 12px',

            WebkitMaskImage: 'radial-gradient(circle at 0% 50%, black 0%, black 55%, transparent 75%)',

            maskImage: 'radial-gradient(circle at 0% 50%, black 0%, black 55%, transparent 75%)',

          }}

        />

      </div>



      <div className="site-container relative">

        <div className="text-center">

          <div className="text-[11px] font-semibold tracking-[0.18em] text-[#dc2626] sm:text-[12px]">

            {content.eyebrow || 'WHAT WE DO'}

          </div>

          <h2 className="section-title mt-3 font-extrabold tracking-[-0.02em] text-[#111111] sm:mt-4">

            {content.heading || 'Our Services and'}{' '}

            <span className="text-[#dc2626]">{content.headingHighlight || 'Business Sectors'}</span>

          </h2>

          <p className="mx-auto mt-3 max-w-[680px] text-[13px] leading-[1.8] text-[#5f5f5f] sm:mt-4 sm:text-[14px]">

            {content.intro ||

              'Explore the varied nature of our business below and see how we can support your industry with precision engineering and innovative solutions.'}

          </p>

        </div>



        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">

          {cards.map((card) => (

            <div

              key={card.title}

              className="relative overflow-hidden rounded-[14px] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.06)] ring-1 ring-[#f1f1f1]"

            >

              <div className="relative pb-6">

                <ImageBlock imageUrl={card.imageUrl} />

                <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 rounded-full bg-white p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-[#f1f1f1] sm:p-3">

                  <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#dc2626] sm:h-10 sm:w-10">

                    {defaultIcon}

                  </div>

                </div>

              </div>

              <div className="px-4 pb-5 pt-8 text-center sm:px-6 sm:pb-6 sm:pt-10">

                <h3 className="text-[13px] font-extrabold tracking-[-0.01em] text-[#111111] sm:text-[14px]">{card.title}</h3>

                <div className="mx-auto mt-2 h-[2px] w-7 rounded-full bg-[#dc2626] sm:mt-3" />

                <p className="mt-3 text-[11px] leading-[1.8] text-[#5f5f5f] sm:mt-4 sm:text-[12px]">{card.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}

