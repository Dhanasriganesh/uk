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
      { name: 'Project Management', path: '/consultation/project-management' },
      { name: 'Project Planning', path: '/consultation/project-planning' },
      { name: 'Lifecycle Management', path: '/consultation/lifecycle-management' },
      { name: 'Turn-key Automation', path: '/consultation/turnkey-automation' },
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleDropdown = (name) => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setOpenDropdown(name);
  };

  const closeDropdown = () => {
    setCloseTimeout(setTimeout(() => setOpenDropdown(null), 120));
  };

  return (
    <header className={`bg-white shadow-lg sticky top-0 z-50 border-b border-blue-100 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="ATS Packaging Logo" className="h-12 w-auto rounded-full shadow-md bg-white p-1" />
        </div>
        {/* Navigation */}
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
        {/* CTA Button */}
        <a href="/contact" className="ml-4 px-6 py-2 bg-blue-700 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition-colors duration-200 hidden sm:inline-block">Request a Quote</a>
        {/* Mobile menu placeholder */}
        <div className="md:hidden">
          {/* Add mobile menu button here if needed */}
        </div>
      </div>
    </header>
  )
}

export default Header
