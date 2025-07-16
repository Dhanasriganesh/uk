import React from 'react'
import foodind from "../../assets/foodind.png"
import med from "../../assets/med.png"
import home from "../../assets/home.png"
import pharma from "../../assets/pharma.png"
import pers from "../../assets/pers.png"
import auto from "../../assets/auto.png"
const sectors = [
  {
    name: 'Pharmaceutical',
    img: pharma,
    description: 'Packaging solutions for medicines, vials, bottles, and pharmaceutical products with strict hygiene and safety standards.',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a4 4 0 1 1 8 0v2"/><path d="M12 12v4"/><path d="M10 14h4"/></svg>
    )
  },
  {
    name: "Automotive",
    img: auto,
    description: 'Robust packaging for automotive parts, fluids, and components, ensuring safe transport and storage.',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="6" rx="3"/><path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>
    )
  },
  {
    name: 'Food & Beverage',
    img: foodind,
    description: 'Hygienic and efficient packaging for food and beverage products, maintaining freshness and quality.',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 22V2h16v20"/><rect x="8" y="6" width="8" height="10" rx="2"/><path d="M12 16v4"/></svg>
    )
  },
  {
    name: 'Medical',
    img: med,
    description: 'Precision packaging for medical devices, diagnostics, and healthcare products, meeting regulatory requirements.',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M12 8v4"/><path d="M10 10h4"/></svg>
    )
  },
  {
    name: 'Home Care',
    img: home,
    description: 'Reliable packaging for cleaning products, detergents, and home care solutions, designed for safety and convenience.',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l9-9 9 9"/><path d="M9 21V9h6v12"/><path d="M21 21H3"/></svg>
    )
  },
  {
    name: 'Personal Care',
    img: pers,
    description: 'Attractive and functional packaging for cosmetics, toiletries, and personal care products.',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
    )
  },
];

function Sectors() {
  return (
    <section className="w-full min-h-screen bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em' }}
          >
            Sectors We Work In
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ATS Packaging delivers advanced packaging solutions for a wide range of industries.
          </p>
        </div>
        {/* Sectors Grid (same card UI as Services) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {sectors.map((sector, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64 w-full flex items-center justify-center">
                <img
                  src={sector.img}
                  alt={sector.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  draggable="false"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              {/* Icon */}
              <div className="flex items-center justify-center -mt-8 mb-4 z-10 relative">
                <div className="bg-white rounded-full shadow p-2 border border-blue-100">{sector.icon}</div>
              </div>
              {/* Content */}
              <div className="px-4 pb-6 flex flex-col items-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {sector.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                  {sector.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sectors
