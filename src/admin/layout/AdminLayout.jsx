import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LuMenu } from 'react-icons/lu'
import { useAuth } from '../../context/AuthContext'
import AdminSidebar, { ADMIN_NAV } from '../components/AdminSidebar'
import { useIsDesktop } from '../hooks/useMediaQuery'

function getPageTitle(pathname) {
  if (pathname.startsWith('/admin/media')) return 'Media Library'
  if (pathname.startsWith('/admin/pages/')) return 'Page Editor'
  if (pathname === '/admin' || pathname === '/admin/') return 'Dashboard'
  return 'Admin'
}

export default function AdminLayout() {
  const { logout, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isDesktop = useIsDesktop()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pageTitle = getPageTitle(location.pathname)

  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : 'AD'

  const closeSidebar = () => setSidebarOpen(false)

  useEffect(() => {
    closeSidebar()
  }, [location.pathname])

  useEffect(() => {
    if (isDesktop) closeSidebar()
  }, [isDesktop])

  useEffect(() => {
    if (!sidebarOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [sidebarOpen])

  useEffect(() => {
    if (!sidebarOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeSidebar()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const isNavActive = (item) =>
    item.end
      ? location.pathname === item.to || location.pathname === `${item.to}/`
      : location.pathname.startsWith(item.to)

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-slate-100">
      {/* Desktop sidebar */}
      <div className="hidden w-[280px] shrink-0 border-r border-slate-800/50 shadow-xl shadow-slate-950/20 lg:flex">
        <AdminSidebar
          className="w-full"
          location={location}
          user={user}
          initials={initials}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile drawer overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          aria-label="Close menu overlay"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[min(100vw-3rem,280px)] transform transition-transform duration-300 ease-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal={sidebarOpen}
        aria-hidden={!sidebarOpen}
        aria-label="Navigation menu"
      >
        <AdminSidebar
          className="h-full shadow-2xl"
          location={location}
          user={user}
          initials={initials}
          onNavigate={closeSidebar}
          onLogout={handleLogout}
          showClose
          onClose={closeSidebar}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200/80 bg-white/90 px-3 backdrop-blur-md sm:px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
          >
            <LuMenu className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1">
            <p className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-400 min-[400px]:block sm:text-xs">
              Admin panel
            </p>
            <p className="truncate text-sm font-semibold text-slate-900 sm:text-base">{pageTitle}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600 sm:px-3 sm:py-1.5 sm:text-xs"
              title="Connected"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 sm:h-2 sm:w-2" aria-hidden />
              <span className="hidden sm:inline">Connected</span>
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
          <Outlet />
        </main>

        {/* Mobile bottom navigation */}
        <nav
          className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-200 bg-white/95 backdrop-blur-md lg:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          aria-label="Quick navigation"
        >
          {ADMIN_NAV.map((item) => {
            const active = isNavActive(item)
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 px-2 py-2 text-[10px] font-semibold transition-colors sm:text-xs ${
                  active ? 'text-red-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`h-5 w-5 sm:h-[22px] sm:w-[22px] ${active ? 'text-red-600' : ''}`} aria-hidden />
                <span className="truncate max-w-full">{item.label.split(' ')[0]}</span>
              </Link>
            )
          })}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 px-2 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-800 sm:text-xs"
          >
            <LuMenu className="h-5 w-5 sm:h-[22px] sm:w-[22px]" aria-hidden />
            <span>More</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
