import React from 'react'
import { useCmsPage } from '../../../hooks/useCmsPage'
import { CmsImage } from '../../cms/CmsMedia'
import par1 from '../../../assets/par1.png'
import par2 from '../../../assets/par2.png'
import par3 from '../../../assets/par3.png'
import par4 from '../../../assets/par4.png'
import par5 from '../../../assets/par5.png'
import par6 from '../../../assets/par6.png'
import par7 from '../../../assets/par7.png'
import par8 from '../../../assets/par8.png'
import par9 from '../../../assets/par9.png'

const fallbacks = [par1, par2, par3, par4, par5, par6, par7, par8, par9]

function Partners() {
  const { content } = useCmsPage('partners')
  const partners = content.partners?.length ? content.partners : fallbacks.map((_, i) => ({ name: `Partner ${i + 1}` }))

  return (
    <section className="site-container section-py">
      <h1 className="page-title mb-6 text-center font-bold text-blue-800 sm:mb-10">{content.title || 'Our Partners'}</h1>
      <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 md:gap-8">
        {partners.map((partner, idx) => (
          <div
            key={idx}
            className="flex min-h-[80px] items-center justify-center rounded-2xl bg-white p-2 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl sm:p-4"
          >
            <CmsImage
              src={partner.logoUrl}
              fallback={fallbacks[idx]}
              alt={partner.name || `Partner ${idx + 1}`}
              className="mx-auto max-h-14 w-auto object-contain sm:max-h-20"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Partners
