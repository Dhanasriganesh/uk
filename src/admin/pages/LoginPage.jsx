import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { LuLock, LuMail, LuPanelLeft, LuShield } from 'react-icons/lu'
import { useAuth } from '../../context/AuthContext'
import Alert from '../components/ui/Alert'

export default function LoginPage() {
  const { login, user, loading, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed. Check your email and password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-[100dvh]">
      <div className="relative hidden w-1/2 overflow-hidden bg-slate-950 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-900/40 via-slate-950 to-slate-950" />
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative z-10 p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-900/50">
              <LuPanelLeft className="h-6 w-6 text-white" aria-hidden />
            </div>
            <div>
              <p className="text-xl font-bold text-white">
                ATS <span className="text-red-400">CMS</span>
              </p>
              <p className="text-sm text-slate-400">Professional content management</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-md px-12 pb-16">
          <h2 className="text-3xl font-bold leading-tight text-white">
            Manage your website content with confidence
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Edit pages, upload media, and publish updates — all from a secure admin workspace connected to Firebase.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              'Edit every page section from one dashboard',
              'Media library with size validation',
              'Live sync to your public website',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600/20 text-red-400">
                  <LuShield className="h-3.5 w-3.5" aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-12">
        <div className="w-full max-w-md">
          <div className="mb-6 sm:mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600">
                <LuPanelLeft className="h-5 w-5 text-white" aria-hidden />
              </div>
              <p className="text-xl font-bold text-slate-900">
                ATS <span className="text-red-600">Admin</span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Welcome back</h1>
              <p className="mt-2 text-sm text-slate-500">Sign in to manage website content</p>
            </div>

            {!isFirebaseConfigured && (
              <Alert variant="warning" className="mb-6">
                Admin sign-in is not configured. Create <strong>.env.local</strong> from{' '}
                <strong>.env.example</strong> and add your project keys.
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email address
                </label>
                <div className="relative">
                  <LuMail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-base text-slate-900 transition-colors focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <LuLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-base text-slate-900 transition-colors focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <Alert variant="error">{error}</Alert>
              )}

              <button
                type="submit"
                disabled={submitting || !isFirebaseConfigured}
                className="flex min-h-[48px] w-full touch-manipulation items-center justify-center rounded-xl bg-red-600 text-sm font-semibold text-white shadow-sm shadow-red-600/25 transition-all hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? 'Signing in…' : 'Sign in to dashboard'}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              Admin panel is only available at{' '}
              <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600">/admin</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
