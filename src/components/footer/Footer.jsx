import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'ATS at a Glance', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Consultation', path: '/consultation' },
    { name: 'Sectors', path: '/sectors' },
    { name: 'Contact', path: '/contact' },
  ];

  const contactInfo = [
    { icon: '📍', text: 'Unit 1, 2-4 Beddow Way, Aylesford, Kent, ME20 7BT, UK' },
    { icon: '📞', text: '+44 1622 678143' },
    { icon: '✉️', text: 'sales@atsuk.com' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62zm-12.5-10h-.03c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76z"/></svg>
    ), url: 'https://www.linkedin.com/company/ats-packaging/' },
    { name: 'YouTube', icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 7.88 0 12 0 12s0 4.12.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.308 20.5 12 20.5 12 20.5s7.692 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 16.12 24 12 24 12s0-4.12-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    ), url: 'https://www.youtube.com/@ATSPackaging-AdvancedToolingSystemsUKLtd' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 
              className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              ATS Packaging
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
              Advanced Tooling Systems UK Ltd. Over 35 years of experience in advanced packaging machinery for a wide range of industries.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                  target="_blank" rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm sm:text-base text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
              Contact Info
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-blue-400 text-lg flex-shrink-0">{info.icon}</span>
                  <span className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {info.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm sm:text-base text-gray-400 text-center sm:text-left">
              &copy; {currentYear} ATS Advanced Tooling Systems UK Ltd. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm sm:text-base text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer