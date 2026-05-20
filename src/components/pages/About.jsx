import React from 'react'
import { useCmsPage } from '../../hooks/useCmsPage'

function About() {
  const { content } = useCmsPage('about')
  const paragraphs = content.paragraphs || []

  return (
    <main className="site-container section-py">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-xl sm:gap-6 sm:p-6 md:p-8 lg:p-10">
        <h1 className="page-title mb-1 font-bold text-blue-800 sm:mb-2">{content.pageTitle || 'About Us'}</h1>
        <h2 className="mb-2 text-base font-semibold text-gray-700 sm:mb-4 sm:text-lg md:text-xl">{content.companyName || 'Advanced Tooling Systems UK Ltd'}</h2>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">{p}</p>
        ))}
      </div>
    </main>
  )
}

export default About
