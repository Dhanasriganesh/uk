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
      { name: 'Turnkey Filling Lines', path: "/turnkey" },
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
];

function Header() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    // Keyboard accessibility: close mobile menu on Esc
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMobileDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Add/remove body and html class to prevent background scroll when menu is open
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
    };
  }, [lastScrollY, mobileMenuOpen]);

  const handleDropdown = (name) => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setOpenDropdown(name);
  };

  const closeDropdown = () => {
    setCloseTimeout(setTimeout(() => setOpenDropdown(null), 120));
  };

  const handleMobileDropdown = (name) => {
    setMobileDropdown(mobileDropdown === name ? null : name);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  return (
    <header className={`bg-white shadow-lg sticky top-0 z-50 border-b border-blue-100 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="/ ">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ATS Packaging Logo" className="h-12 w-auto rounded-full shadow-md bg-white p-1" />
          </div>
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-10 relative">
          {navLinks.map(link => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout) clearTimeout(closeTimeout);
                link.dropdown && handleDropdown(link.name);
              }}
              onMouseLeave={closeDropdown}
              tabIndex={0}
              onFocus={() => link.dropdown && handleDropdown(link.name)}
              onBlur={closeDropdown}
            >
              <Link
                to={link.path}
                className={`text-lg font-medium px-2 py-1 rounded transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 ${location.pathname === link.path ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700'} flex items-center gap-1`}
              >
                {link.name}
                {link.dropdown && (
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                )}
              </Link>
              {/* Dropdown */}
              {link.dropdown && openDropdown === link.name && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-blue-100 py-2 animate-fade-in z-50"
                  onMouseEnter={() => {
                    if (closeTimeout) clearTimeout(closeTimeout);
                  }}
                  onMouseLeave={closeDropdown}
                >
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-6 py-3 text-base text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
                      onClick={() => {
                        if (closeTimeout) clearTimeout(closeTimeout);
                        closeDropdown();
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        {/* CTA Button (Desktop) */}
        <a href="/contact" className="ml-4 px-6 py-2 bg-blue-700 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition-colors duration-200 hidden sm:inline-block md:inline-block">Request a Quote</a>
        {/* Hamburger Menu (Mobile) */}
        <button
          className={`md:hidden flex flex-col items-center justify-center w-10 h-10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="relative w-7 h-7 block">
            <span className={`absolute left-0 top-2 w-7 h-1 bg-blue-700 rounded transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 top-3' : ''}`}></span>
            <span className={`absolute left-0 top-4 w-7 h-1 bg-blue-700 rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`absolute left-0 top-6 w-7 h-1 bg-blue-700 rounded transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 top-3' : ''}`}></span>
          </span>
        </button>
      </div>
      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(0,0,0,0.4)' }}
        onClick={closeMobileMenu}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={`fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-lg p-6 flex flex-col gap-4 transition-transform duration-300 overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
          tabIndex={-1}
          style={{ minHeight: '100vh', maxHeight: '100vh' }}
        >
          <div className="flex items-center justify-between mb-4">
            <img src={logo} alt="ATS Packaging Logo" className="h-10 w-auto rounded-full bg-white p-1" />
            <button onClick={closeMobileMenu} aria-label="Close menu">
              <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            {navLinks.map(link => (
              <div key={link.name} className="relative">
                <div className="flex items-center justify-between">
                  <Link
                    to={link.path}
                    className={`block text-lg font-medium px-2 py-2 rounded transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 ${location.pathname === link.path ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700'} flex-1 text-left`}
                    onClick={e => {
                      if (link.dropdown) {
                        e.preventDefault();
                        handleMobileDropdown(link.name);
                      } else {
                        closeMobileMenu();
                      }
                    }}
                    tabIndex={0}
                    onKeyDown={e => {
                      if ((e.key === 'Enter' || e.key === ' ') && link.dropdown) {
                        e.preventDefault();
                        handleMobileDropdown(link.name);
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <button
                      type="button"
                      className="ml-2 focus:outline-none"
                      aria-label={mobileDropdown === link.name ? `Collapse ${link.name}` : `Expand ${link.name}`}
                      tabIndex={0}
                      onClick={e => {
                        e.preventDefault();
                        handleMobileDropdown(link.name);
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleMobileDropdown(link.name);
                        }
                      }}
                    >
                      <svg className={`w-4 h-4 transition-transform duration-300 ${mobileDropdown === link.name ? 'rotate-180 text-blue-700' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                {/* Mobile Dropdown */}
                {link.dropdown && (
                  <div
                    className={`mobile-dropdown pl-4 mt-1 flex flex-col gap-1 bg-white ${mobileDropdown === link.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{ willChange: 'max-height' }}
                  >
                    {link.dropdown.map(item => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-2 text-base text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium rounded"
                        onClick={closeMobileMenu}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="/contact" className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition-colors duration-200 text-center">Request a Quote</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
