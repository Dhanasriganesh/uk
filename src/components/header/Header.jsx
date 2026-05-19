import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'ATS at a Glance',
    path: '/about',
    dropdown: [
      { name: 'ATS', path: '/ats' },
      { name: 'Team', path: '/team' },
      { name: 'Partners', path: '/partners' },
      { name: 'News', path: '/news' },
    ],
  },
  {
    name: 'Products',
    path: '/products',
    dropdown: [
      { name: 'Capping Machines', path: '/capping' },
      { name: 'Bottle Unscramblers', path: '/bottle' },
      { name: 'Pump & Trigger Feeding Systems', path: '/pump' },
      { name: 'Turnkey Filling Lines', path: '/turnkey' },
      { name: 'Bespoke Packaging Solutions', path: '/bespoke' },
      { name: 'Food & Beverage Lines (FBL)', path: '/foodbeverage' },
    ],
  },
  {
    name: 'Consultation',
    path: '/consultation',
    dropdown: [
      { name: 'Project Management', path: '/project-management' },
      { name: 'Project Planning', path: '/project-planning' },
      { name: 'Lifecycle Management', path: '/lifecycle-management' },
      { name: 'Turn-key Automation', path: '/turnkey-automation' },
    ],
  },
  { name: 'Sectors', path: '/sectors' },
  { name: 'Contact', path: '/contact' },
]

function ChevronDown() {
  return (
    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function Header() {
  const location = useLocation()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)

  useEffect(() => {
    if (!mobileOpen) return
    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [location.pathname])

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-24 bg-white border-b border-[#f1f1f1]">
      <div className="mx-auto h-full max-w-[1280px] px-6">
        <div className="grid h-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
          <Link to="/" className="flex shrink-0 items-center" aria-label="ATS home">
            <img src={logo} alt="ATS" className="h-14 w-auto object-contain lg:h-[68px]" />
          </Link>

          <nav className="hidden min-w-0 justify-center justify-self-center lg:flex" aria-label="Main">
            <ul className="flex items-center gap-[42px]">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="relative list-none"
                  onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`relative inline-flex items-center gap-1 text-[14px] font-semibold leading-none transition-colors ${
                      location.pathname === link.path
                        ? 'text-[#dc2626]'
                        : 'text-[#111111] hover:text-[#dc2626]'
                    }`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown />}
                    {location.pathname === link.path && (
                      <span
                        className="pointer-events-none absolute -bottom-3 left-1/2 h-[2px] w-[28px] -translate-x-1/2 rounded-full bg-[#dc2626]"
                        aria-hidden
                      />
                    )}
                  </Link>

                  {link.dropdown && openDropdown === link.name && (
                    <div className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-xl border border-[#f1f1f1] bg-white py-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-5 py-3 text-[14px] font-medium text-[#111111] transition-colors hover:bg-[#fef2f2] hover:text-[#dc2626]"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-3">
            <Link
              to="/contact"
              className="hidden h-[46px] items-center gap-2 rounded-[12px] bg-[#ef4444] px-[26px] text-[14px] font-semibold text-white transition-colors hover:bg-[#dc2626] lg:inline-flex"
            >
              Request a Quote
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7M21 12H3" />
              </svg>
            </Link>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#f1f1f1] text-[#111111] lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div id="mobile-nav" className="fixed inset-0 z-40 bg-black/40 pt-24 lg:hidden" onClick={closeMobile}>
          <div
            className="ml-auto flex h-[calc(100vh-6rem)] w-full max-w-sm flex-col overflow-y-auto border-l border-[#f1f1f1] bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col p-6" aria-label="Mobile">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-[#f1f1f1] py-3 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={link.path}
                      className={`text-[15px] font-semibold ${
                        location.pathname === link.path ? 'text-[#dc2626]' : 'text-[#111111]'
                      }`}
                      onClick={(e) => {
                        if (link.dropdown) e.preventDefault()
                        else closeMobile()
                      }}
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <button
                        type="button"
                        className="p-2 text-[#111111]"
                        aria-expanded={mobileExpanded === link.name}
                        aria-label={`Toggle ${link.name}`}
                        onClick={() => setMobileExpanded((n) => (n === link.name ? null : link.name))}
                      >
                        <ChevronDown />
                      </button>
                    )}
                  </div>
                  {link.dropdown && mobileExpanded === link.name && (
                    <div className="mt-2 flex flex-col gap-1 pl-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="py-2 text-[14px] text-[#5f5f5f] hover:text-[#dc2626]"
                          onClick={closeMobile}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                onClick={closeMobile}
                className="mt-4 flex h-[46px] items-center justify-center gap-2 rounded-[12px] bg-[#ef4444] px-[26px] text-[14px] font-semibold text-white hover:bg-[#dc2626]"
              >
                Request a Quote
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7M21 12H3" />
                </svg>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
