import React from 'react'
import henkel from '../../assets/hen.png'
import unilever from '../../assets/unilever.png'
import pg from '../../assets/pg.png'
import nestle from '../../assets/nestle.png'
import mon from '../../assets/mon.png'
import bayer from '../../assets/bayer.png'
import frosch from '../../assets/Frosch_logo.png'
import rb from '../../assets/rb.png'
import pepsico from '../../assets/pepsico.png'
import cocacola from '../../assets/Coca-Cola_logo.png'
import compo from '../../assets/compo.png'

const brands = [
  { name: 'Henkel', img: henkel },
  { name: 'Unilever', img: unilever },
  { name: 'P&G', img: pg },
  { name: 'Nestle', img: nestle },
  { name: 'Mondelez', img: mon },
  { name: 'Unilever2', img: unilever },
  { name: 'Bayer', img: bayer },
  { name: 'Frosch', img: frosch },
  { name: 'Reckitt Benckiser', img: rb },
  { name: 'PepsiCo', img: pepsico },
  { name: 'CocaCola', img: cocacola },
  { name: 'Compo', img: compo },
];

function Brands() {
  return (
    <section className="w-full py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl mb-10 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>
          Brands
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center group"
            >
              <div className="rounded-xl shadow-md p-4 flex items-center justify-center w-32 h-24 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:bg-blue-50 group-hover:ring-2 group-hover:ring-blue-200">
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="max-h-16 max-w-[100px] object-contain transition-all duration-300"
                  draggable="false"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands
