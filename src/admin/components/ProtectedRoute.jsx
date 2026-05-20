import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading, isFirebaseConfigured } = useAuth()

  if (!isFirebaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
        <div className="max-w-md rounded-xl bg-white p-8 shadow-lg text-center">
          <h2 className="text-lg font-bold text-gray-900">Firebase not configured</h2>
          <p className="mt-2 text-sm text-gray-600">
            Copy <code className="bg-gray-100 px-1">.env.example</code> to <code className="bg-gray-100 px-1">.env.local</code> and add your Firebase keys, then restart the dev server.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-600" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
