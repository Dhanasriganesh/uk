import React from 'react'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

const features = [
  {
    // Gear/Machine icon
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.94-2.34l-1.42-1.42a7.03 7.03 0 0 0 0-2.48l1.42-1.42a1 1 0 0 0-1.42-1.42l-1.42 1.42a7.03 7.03 0 0 0-2.48 0l-1.42-1.42a1 1 0 0 0-1.42 1.42l1.42 1.42a7.03 7.03 0 0 0 0 2.48l-1.42 1.42a1 1 0 0 0 1.42 1.42l1.42-1.42a7.03 7.03 0 0 0 2.48 0l1.42 1.42a1 1 0 0 0 1.42-1.42z"/></svg>
    ),
    label: 'Advanced Machinery',
    description: 'State-of-the-art capping, filling, and feeding systems for every packaging need.'
  },
  {
    // Target icon
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
    ),
    label: 'Precision & Reliability',
    description: 'Engineered for accuracy, uptime, and consistent performance in demanding environments.'
  },
  {
    // Conveyor belt icon
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="14" width="20" height="4" rx="2"/><rect x="6" y="6" width="12" height="6" rx="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>
    ),
    label: 'Turnkey Solutions',
    description: 'From consultation to installation, we deliver complete, integrated packaging lines.'
  },
  {
    // Award/trophy icon
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M17 5V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2a5 5 0 0 0 10 0z"/><path d="M17 5a5 5 0 0 1-10 0"/></svg>
    ),
    label: 'Industry Expertise',
    description: '35+ years serving food, beverage, pharma, home care, and more.'
  },

];

const promises = [
  {
    label: 'On-Time Delivery',
    icon: '⏰',
    description: 'We deliver your packaging solution on schedule, every time.'
  },
  {
    label: 'Unmatched Quality',
    icon: '⭐',
    description: 'Robust engineering, premium materials, and rigorous testing.'
  },
  {
    label: 'Innovation',
    icon: '💡',
    description: 'Continuous R&D for smarter, more efficient packaging systems.'
  },
  {
    label: 'Customer Focus',
    icon: '🤝',
    description: 'Tailored solutions and dedicated support for your business.'
  },
];

function Why() {
  return (
    <section className="w-full min-h-screen bg-gray-50 py-6 sm:py-10 lg:py-20 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-20">
          <h2
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em' }}
          >
            Why Choose ATS Packaging?
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine engineering excellence, innovation, and industry experience to deliver packaging solutions that drive your business forward.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16 lg:mb-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-6 sm:px-6 sm:py-10 min-h-[30px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400 group"
            >
              <div className="mb-4 sm:mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-800 text-center mb-2 sm:mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {feature.label}
              </h3>
              <p className="text-xs sm:text-base text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="w-20 sm:w-24 h-1 bg-blue-500 rounded-full"></div>
        </div>

        {/* Promises Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h3
            className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-10"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Commitment to You
          </h3>
          {/* Promises Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {promises.map((promise, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-2xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {promise.icon}
                </div>
                <h4 className="text-base sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {promise.label}
                </h4>
                <p className="text-xs sm:text-base text-gray-600 leading-relaxed">
                  {promise.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      
      </div>
    </section>
  )
}

export default Why