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
  // Duplicate brands for seamless loop
  const carouselBrands = [...brands, ...brands];
  return (
    <section className="w-full py-8 px-2 sm:py-12 sm:px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-10 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
          Brands
        </h2>
        <div className="relative overflow-x-hidden hide-scrollbar">
          <div className="flex w-max animate-marquee gap-4 sm:gap-12" style={{ animationDuration: '32s' }}>
            {carouselBrands.map((brand, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center group w-24 sm:w-32"
              >
                <div className=" p-2 sm:p-4 flex items-center justify-center w-24 h-16 sm:w-32 sm:h-24 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover: group-hover: group-hover: ">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="max-h-10 sm:max-h-16 max-w-[70px] sm:max-w-[100px] object-contain transition-all duration-300"
                    draggable="false"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Carousel animation CSS and hide-scrollbar utility */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee linear infinite;
          }
          .hide-scrollbar {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* IE and Edge */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
      </div>
    </section>
  )
}

export default Brands
