import React from 'react'
import par1 from '../../../assets/par1.png'
import par2 from '../../../assets/par2.png'
import par3 from '../../../assets/par3.png'
import par4 from '../../../assets/par4.png'
import par5 from '../../../assets/par5.png'
import par6 from '../../../assets/par6.png'
import par7 from '../../../assets/par7.png'
import par8 from '../../../assets/par8.png'
import par9 from '../../../assets/par9.png'

const partners = [par1, par2, par3, par4, par5, par6, par7, par8, par9];

function Partners() {
  return (
    <section className="max-w-6xl mx-auto py-8 px-2 sm:py-12 sm:px-4 md:py-16 md:px-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-6 sm:mb-10 text-center">Our Partners</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center">
        {partners.map((img, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-2 sm:p-4 flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ minHeight: 80 }}
          >
            <img
              src={img}
              alt={`Partner ${idx + 1}`}
              className="max-h-14 sm:max-h-20 w-auto object-contain mx-auto transition-all duration-300"
              style={{ transition: 'filter 0.3s' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Partners
