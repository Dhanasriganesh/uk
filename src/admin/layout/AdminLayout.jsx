import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const nav = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/media', label: 'Media Library' },
]

export default function AdminLayout() {
  const { logout, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="flex w-64 shrink-0 flex-col bg-gray-900 text-white">
        <div className="border-b border-gray-800 px-6 py-5">
          <Link to="/admin" className="text-lg font-bold tracking-tight">
            ATS <span className="text-red-500">CMS</span>
          </Link>
          <p className="mt-1 truncate text-xs text-gray-400">{user?.email}</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {nav.map((item) => {
            const active = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  active ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="space-y-2 border-t border-gray-800 p-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            View website ↗
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg px-4 py-2 text-left text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
