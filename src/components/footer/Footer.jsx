import React from 'react'
import { Link } from 'react-router-dom'
import { useSiteSettings } from '../../context/CmsContext'

function Footer() {
  const { settings } = useSiteSettings()
  const currentYear = new Date().getFullYear()
  const footer = settings.footer || {}

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'ATS at a Glance', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Consultation', path: '/consultation' },
    { name: 'Sectors', path: '/sectors' },
    { name: 'Contact', path: '/contact' },
  ]

  const contactInfo = [
    { icon: '📍', text: footer.address },
    { icon: '📞', text: footer.phone },
    { icon: '✉️', text: footer.email },
  ].filter((c) => c.text)

  const socialLinks = (footer.socialLinks || []).map((social) => ({
    name: social.name,
    url: social.url,
    icon:
      social.name === 'LinkedIn' ? (
        <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6">
          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z" />
        </svg>
      ) : (
        <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6">
          <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 7.88 0 12 0 12s0 4.12.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.308 20.5 12 20.5 12 20.5s7.692 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 16.12 24 12 24 12s0-4.12-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
  }))

  const legalLinks = footer.legalLinks || []

  return (
    <footer className="w-full max-w-full overflow-x-hidden bg-gray-900 text-gray-300">
      <div className="site-container py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl lg:text-3xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              {settings.siteName || 'ATS Packaging'}
            </h3>
            <p className="mb-5 max-w-md text-sm leading-relaxed text-gray-400 sm:text-base">{footer.companyDescription}</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-300 hover:scale-110 hover:bg-blue-600"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-base font-bold text-white sm:mb-4 sm:text-lg">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1 sm:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-sm text-gray-400 transition-colors duration-300 hover:text-blue-400 sm:text-base">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="mb-3 text-base font-bold text-white sm:mb-4 sm:text-lg">Contact Info</h4>
            <ul className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="shrink-0 text-base text-blue-400 sm:text-lg">{info.icon}</span>
                  <span className="text-sm leading-relaxed text-gray-400 sm:text-base">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 sm:py-6">
        <div className="site-container">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
            <div className="text-xs text-gray-400 sm:text-sm">
              &copy; {currentYear} {footer.copyrightName || 'ATS Advanced Tooling Systems UK Ltd'}. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400 sm:gap-6 sm:text-sm">
              {legalLinks.map((link, i) => (
                <a key={i} href={link.url} className="transition-colors duration-300 hover:text-blue-400">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
