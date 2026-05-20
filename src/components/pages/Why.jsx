import React from 'react'
import { useCmsPage } from '../../hooks/useCmsPage'

const featureIcons = [
  <svg key="0" className="h-7 w-7 sm:h-8 md:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.94-2.34l-1.42-1.42a7.03 7.03 0 0 0 0-2.48l1.42-1.42a1 1 0 0 0-1.42-1.42l-1.42 1.42a7.03 7.03 0 0 0-2.48 0l-1.42-1.42a1 1 0 0 0-1.42 1.42l1.42 1.42a7.03 7.03 0 0 0 0 2.48l-1.42 1.42a1 1 0 0 0 1.42 1.42l1.42-1.42a7.03 7.03 0 0 0 2.48 0l1.42 1.42a1 1 0 0 0 1.42-1.42z"/></svg>,
  <svg key="1" className="h-7 w-7 sm:h-8 md:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  <svg key="2" className="h-7 w-7 sm:h-8 md:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="14" width="20" height="4" rx="2"/><rect x="6" y="6" width="12" height="6" rx="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>,
  <svg key="3" className="h-7 w-7 sm:h-8 md:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M17 5V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2a5 5 0 0 0 10 0z"/><path d="M17 5a5 5 0 0 1-10 0"/></svg>,
]

function Why() {
  const { content } = useCmsPage('home-why')
  const features = content.features || []
  const promises = content.promises || []

  return (
    <section className="section-py w-full bg-gray-50">
      <div className="site-container">
        <div className="mb-8 text-center sm:mb-12 lg:mb-16">
          <h2
            className="section-title mb-3 font-bold tracking-tight text-gray-900 sm:mb-4"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em' }}
          >
            {content.title || 'Why Choose ATS Packaging?'}
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
            {content.intro || 'We combine engineering excellence, innovation, and industry experience to deliver packaging solutions that drive your business forward.'}
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:mb-14 sm:grid-cols-2 sm:gap-6 lg:mb-16 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-2xl sm:px-6 sm:py-8 lg:py-10"
            >
              <div className="mb-4 text-blue-600 transition-transform duration-300 group-hover:scale-110 sm:mb-5">
                {featureIcons[idx] || featureIcons[0]}
              </div>
              <h3 className="mb-2 text-center text-base font-bold text-gray-800 sm:text-lg lg:text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                {feature.label}
              </h3>
              <p className="text-center text-xs leading-relaxed text-gray-600 sm:text-sm lg:text-base">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 flex justify-center sm:mb-10">
          <div className="h-1 w-16 rounded-full bg-blue-500 sm:w-24" />
        </div>

        <div className="text-center">
          <h3 className="mb-6 text-lg font-bold text-gray-900 sm:mb-8 sm:text-xl lg:text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            {content.promisesTitle || 'Our Commitment to You'}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {promises.map((promise, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-gray-100 bg-white p-4 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 sm:text-center lg:p-8"
              >
                <div className="mb-3 text-2xl transition-transform duration-300 group-hover:scale-110 sm:mb-4 sm:text-3xl lg:text-4xl">
                  {promise.icon}
                </div>
                <h4 className="mb-2 text-base font-bold text-gray-800 sm:text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {promise.label}
                </h4>
                <p className="text-xs leading-relaxed text-gray-600 sm:text-sm lg:text-base">{promise.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Why
