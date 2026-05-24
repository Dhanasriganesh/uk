import React from 'react'
import { Link } from 'react-router-dom'
import {
  LuExternalLink,
  LuImage,
  LuLayoutDashboard,
  LuLogOut,
  LuPanelLeft,
  LuSettings2,
  LuX,
} from 'react-icons/lu'

export const ADMIN_NAV = [
  { to: '/admin', label: 'Dashboard', description: 'Pages & content', icon: LuLayoutDashboard, end: true },
  { to: '/admin/media', label: 'Media Library', description: 'Images & assets', icon: LuImage, end: false },
]

export default function AdminSidebar({
  location,
  user,
  initials,
  onNavigate,
  onLogout,
  showClose = false,
  onClose,
  className = '',
}) {
  return (
    <aside className={`flex h-full flex-col bg-slate-950 text-white ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-5 sm:px-5">
        <Link to="/admin" onClick={onNavigate} className="group flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-900/40 ring-1 ring-white/10">
            <LuPanelLeft className="h-5 w-5 text-white" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-base font-bold tracking-tight">
              ATS <span className="text-red-400">CMS</span>
            </p>
            <p className="truncate text-xs text-slate-400">Content management</p>
          </div>
        </Link>
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <LuX className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Admin navigation">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-500">Workspace</p>
        {ADMIN_NAV.map((item) => {
          const active = item.end
            ? location.pathname === item.to || location.pathname === `${item.to}/`
            : location.pathname.startsWith(item.to)
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`group flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-3 transition-all ${
                active
                  ? 'bg-white/10 text-white shadow-inner ring-1 ring-white/10'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  active ? 'bg-red-600 text-white' : 'bg-white/5 text-slate-300 group-hover:bg-white/10'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="block truncate text-xs text-slate-500 group-hover:text-slate-400">
                  {item.description}
                </span>
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3 ring-1 ring-white/5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-xs font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{user?.email || 'Admin'}</p>
            <p className="flex items-center gap-1 text-xs text-slate-400">
              <LuSettings2 className="h-3 w-3 shrink-0" aria-hidden />
              Administrator
            </p>
          </div>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LuExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          View live website
        </a>
        <button
          type="button"
          onClick={onLogout}
          className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-400 transition-colors hover:bg-red-950/50 hover:text-red-300"
        >
          <LuLogOut className="h-4 w-4 shrink-0" aria-hidden />
          Sign out
        </button>
      </div>
    </aside>
  )
}
