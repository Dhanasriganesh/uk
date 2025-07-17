import React from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import Routers from '../routers/Routers'
import Footer from '../footer/Footer'
import Header from '../header/Header'

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <Router>
      <div style={{ width: '100vw', maxWidth: '100vw', overflowX: 'hidden', position: 'relative' }}>
        <ScrollToTop />
        <Header/>
        <Routers/>
        <Footer/>
      </div>
    </Router>
  )
}

export default Layout
