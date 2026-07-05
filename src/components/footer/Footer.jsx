import React from 'react'
import { Link } from 'react-router-dom'
import { LuMapPin, LuPhone, LuMail } from 'react-icons/lu'
import { useSiteSettings } from '../../context/CmsContext'
import logo from '../../assets/logo.png'
import { resolveSiteAddress } from '../contact/contactDefaults'
import {
  FOOTER_HIGHLIGHT_ICONS,
  mergeFooterHighlights,
  mergeLinkColumns,
} from './footerDefaults'

function SocialIcon({ name }) {
  if (name === 'LinkedIn') {
    return (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z" />
      </svg>
    )
  }
  if (name === 'YouTube') {
    return (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 7.88 0 12 0 12s0 4.12.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.308 20.5 12 20.5 12 20.5s7.692 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 16.12 24 12 24 12s0-4.12-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  }
  if (name === 'Instagram') {
    return (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  }
  return (
    <span className="text-xs font-semibold" aria-hidden>
      {name?.charAt(0) || '?'}
    </span>
  )
}

function FooterNavLink({ url, children }) {
  const isInternal = url?.startsWith('/')
  const className = 'text-[11px] leading-snug text-[#9ca3af] transition-colors hover:text-white'

  if (isInternal) {
    return (
      <Link to={url} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={url || '#'} className={className}>
      {children}
    </a>
  )
}

function MadeInBritainBadge() {
  return (
    <div
      className="flex h-8 w-[3.75rem] shrink-0 flex-col items-center justify-center rounded border border-[#374151] bg-[#111827] px-1 py-0.5 text-center"
      aria-label="Made in Britain"
    >
      <svg viewBox="0 0 48 32" className="h-3 w-7 text-[#9ca3af]" aria-hidden>
        <rect x="1" y="1" width="46" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M24 6 L28 14 L36 14 L29 19 L32 27 L24 22 L16 27 L19 19 L12 14 L20 14 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <span className="mt-0.5 text-[5px] font-bold uppercase leading-none tracking-wide text-[#9ca3af]">
        Made in Britain
      </span>
    </div>
  )
}

function ColumnTitle({ children }) {
  return (
    <div className="mb-2">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] text-white">
        {children}
      </h4>
      <div className="mt-1 h-[2px] w-5 rounded-full bg-[#dc2626]" />
    </div>
  )
}

function Footer() {
  const { settings } = useSiteSettings()
  const currentYear = new Date().getFullYear()
  const footer = settings.footer || {}
  const logoSrc = settings.logoUrl || logo

  const linkColumns = mergeLinkColumns(footer.linkColumns)
  const highlights = mergeFooterHighlights(footer.highlights)
  const socialLinks = footer.socialLinks || []
  const legalLinks = footer.legalLinks || []

  const contactRows = [
    { Icon: LuMapPin, text: resolveSiteAddress(settings) },
    { Icon: LuPhone, text: footer.phone },
    { Icon: LuMail, text: footer.email },
  ].filter((row) => row.text)

  return (
    <footer className="w-full max-w-full overflow-x-hidden bg-[#0c1220] text-white">
      <div className="site-container py-5 sm:py-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-4">
          <div className="lg:col-span-4">
            <Link to="/" className="mb-2 inline-block" aria-label="ATS home">
              <span className="inline-flex rounded-md bg-white px-8.5 py-0.5 shadow-sm">
                <img
                  src={logoSrc}
                  alt={settings.siteName || 'ATS'}
                  className="h-6 w-90 object-contain sm:h-6"
                />
              </span>
            </Link>
            {footer.tagline && (
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9ca3af]">
                {footer.tagline}
              </p>
            )}
            {footer.companyDescription && (
              <p className="mb-3 line-clamp-2 max-w-xs text-[11px] leading-relaxed text-[#9ca3af]">
                {footer.companyDescription}
              </p>
            )}
            <ul className="mb-3 space-y-1.5">
              {contactRows.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-2 text-[11px] text-[#d1d5db]">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#dc2626]" aria-hidden />
                  <span className="leading-snug">{text}</span>
                </li>
              ))}
            </ul>
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="flex h-7 w-7 items-center justify-center rounded border border-[#374151] text-[#d1d5db] transition hover:border-[#dc2626] hover:text-white"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon name={social.name} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {linkColumns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <ColumnTitle>{column.title}</ColumnTitle>
              <ul className="space-y-1">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.name}`}>
                    <FooterNavLink url={link.url}>{link.name}</FooterNavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {highlights.length > 0 && (
        <div className="border-y border-[#1f2937] bg-[#0a0f1a]">
          <div className="site-container py-3 sm:py-3.5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#1f2937]">
              {highlights.map((item) => {
                const Icon = FOOTER_HIGHLIGHT_ICONS[item.icon] || FOOTER_HIGHLIGHT_ICONS.years
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-2 px-0 sm:px-3 lg:px-4 first:sm:pl-0 last:sm:pr-0"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#dc2626]/30 bg-[#dc2626]/10">
                      <Icon className="h-3.5 w-3.5 text-[#dc2626]" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white">{item.title}</p>
                      <p className="text-[9px] leading-snug text-[#9ca3af] sm:text-[10px]">{item.subtitle}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-[#1f2937] py-2.5">
        <div className="site-container">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <p className="text-center text-[10px] text-[#6b7280] sm:text-left sm:text-[11px]">
              &copy; {currentYear} {footer.copyrightName || 'Advanced Tooling Systems UK Ltd'}. All
              rights reserved.
            </p>

            {legalLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-x-1 text-[10px] sm:text-[11px]">
                {legalLinks.map((link, i) => (
                  <React.Fragment key={link.name}>
                    {i > 0 && <span className="px-1 text-[#dc2626]" aria-hidden>|</span>}
                    <a
                      href={link.url}
                      className="text-[#9ca3af] transition-colors hover:text-white"
                    >
                      {link.name}
                    </a>
                  </React.Fragment>
                ))}
              </div>
            )}

            {footer.showMadeInBritain !== false && <MadeInBritainBadge />}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
