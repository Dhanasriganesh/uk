import React from 'react'
import { Navigate } from 'react-router-dom'
import { LuSettings } from 'react-icons/lu'
import { useAuth } from '../../context/AuthContext'
import Spinner from './ui/Spinner'

export default function ProtectedRoute({ children }) {
  const { user, loading, isFirebaseConfigured } = useAuth()

  if (!isFirebaseConfigured) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-slate-100 p-4 sm:p-8">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-200/60 sm:p-10">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <LuSettings className="h-7 w-7" aria-hidden />
          </span>
          <h2 className="text-lg font-bold text-slate-900">Admin is not configured</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Copy <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">.env.example</code> to{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">.env.local</code> and add your
            project keys, then restart the dev server.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-slate-100 p-4">
        <Spinner label="Checking session…" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
