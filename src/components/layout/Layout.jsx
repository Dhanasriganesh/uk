import React from 'react'
import { useLocation } from 'react-router-dom'
import Routers from '../routers/Routers'
import Footer from '../footer/Footer'
import Header from '../header/Header'

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout() {
  return (
    <div className="relative w-full max-w-full overflow-x-hidden">
      <ScrollToTop />
      <Header />
      <main className="site-main w-full">
        <Routers />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
