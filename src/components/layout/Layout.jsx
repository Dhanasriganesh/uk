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
        <ScrollToTop />
        <Header/>
        <Routers/>
        <Footer/>
    </Router>
  )
}

export default Layout
