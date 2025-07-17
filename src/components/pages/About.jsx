import React from 'react'

function About() {
  return (
    <main className="max-w-4xl w-full mx-auto py-8 px-2 sm:py-12 sm:px-4 md:py-16 md:px-6">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-1 sm:mb-2">About Us</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-2 sm:mb-4">Advanced Tooling Systems UK Ltd</h2>
        <p className="text-gray-700 text-base sm:text-lg">
          Advanced Tooling Systems UK Ltd is a privately owned company originally formed in 1979 with the Advanced Tooling Systems Group created in 2002. Our name is one of pedigree and reliability and we have 3-manufacturing facilities in the South East of England with satellite design, service and support facilities in the North of England and Asia.
        </p>
        <p className="text-gray-700 text-base sm:text-lg">
          With a global footprint of end users including some of the world's largest manufacturers, our Packaging Machinery range of equipment is used throughout the packaging industry including the FMCG, Cosmetic, Pharmaceutical, Food & Beverage, Chemical and Automotive sectors. Together with a trusted network of partners we are able to deliver turnkey packaging lines into reality with 'best in class' after-sales service and support.
        </p>
        <p className="text-gray-700 text-base sm:text-lg">
          Our extensive and 'award winning' manufacturing capabilities include CAD / CAM, CNC machinery, pattern making, mould tool manufacture, sheet metal fabrication, 3D-design, control system design and machine control software.
        </p>
      </div>
    </main>
  )
}

export default About
