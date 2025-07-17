import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cappingImg from '../../assets/capping.png'
import bottle from "../../assets/bottle.png"
import bespoke from "../../assets/bespoke.png"
import food from "../../assets/food.png"
import pump from "../../assets/pump.png"
import turnkey from "../../assets/turnkey.png"
// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

const services = [
  {
    img: cappingImg,
    title: 'Capping Machines',
    description: 'Flexible linear capping and high-speed rotary capping machines for a wide range of applications.',
    path: '/capping',
  },
  {
    img: bottle,
    title: 'Bottle Unscramblers',
    description: 'Versatile machines for sorting and orienting multiple container formats in a single system.',
    path: '/bottle',
  },
  {
    img: pump,
    title: 'Pump & Trigger Feeding Systems',
    description: 'High-speed systems for sorting, feeding, and delivering pumps and triggers with precision and reliability.',
    path: '/pump',
  },
  {
    img: turnkey,
    title: 'Turnkey Filling Lines',
    description: 'Complete filling line solutions from 10ml to 200-litre, including end-to-end automation.',
    path: '/turnkey',
  },
  {
    img: bespoke,
    title: 'Bespoke Packaging and Automation & Assembly Systems',
    description: 'Custom conveyors, product handling, ultrasonic cap welding, assembly systems, and more.',
    path: '/bespoke',
  },
  {
    img: food,
    title: 'Food & Beverage Lines (FBL)',
    description: 'Comprehensive food and beverage manufacturing machinery for the UK & Ireland.',
    path: '/foodbeverage',
  },
];

function Services() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  // No categories for services, so always show all
  const filteredServices = services;

  return (
    <section className="w-full min-h-screen bg-white py-6 sm:py-10 lg:py-20 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-20">
          <h2
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em' }}
          >
            Our Services
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our advanced packaging machinery and automation solutions designed to meet the needs of diverse industries.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredServices.map((service, idx) => (
            <Link to={service.path} key={idx} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-blue-200">
              {/* Image Container */}
              <div className="relative overflow-hidden h-36 xs:h-40 sm:h-48 lg:h-64">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  draggable="false"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
  {/* Call to Action */}
  <div className="text-center rounded-2xl p-6 sm:p-10 lg:p-16 shadow-xl mt-8 sm:mt-12 bg-blue-50">
          <h3
            className="text-xl sm:text-2xl lg:text-4xl font-bold text-black mb-3 sm:mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Optimize Your Packaging?
          </h3>
          <p className="text-base sm:text-lg text-black/90 mb-6 sm:mb-10 max-w-2xl mx-auto">
            Let’s discuss your requirements and see how ATS Packaging can deliver the right solution for your business.
          </p>
          <a href="/contact">
            <button className="px-6 sm:px-10 py-3 sm:py-4 bg-white text-blue-600 font-semibold text-base sm:text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Connect with Us
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services