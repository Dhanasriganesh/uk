import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuCircleCheck, LuCircleAlert } from 'react-icons/lu'
import { auth } from '../../firebase/config'
import { waitForAuthReady } from '../../firebase/authHelpers'

export default function AdminAuthStatus() {
  const [status, setStatus] = useState({ loading: true, email: null })

  useEffect(() => {
    waitForAuthReady().then(() => {
      setStatus({
        loading: false,
        email: auth?.currentUser?.email ?? null,
      })
    })
  }, [])

  if (status.loading) return null

  return (
    <div
      className={`mb-4 flex items-start gap-3 rounded-xl border px-3 py-3 text-sm shadow-sm sm:mb-6 sm:px-4 ${
        status.email
          ? 'border-emerald-200/80 bg-emerald-50 text-emerald-900'
          : 'border-amber-200/80 bg-amber-50 text-amber-900'
      }`}
    >
      {status.email ? (
        <LuCircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
      ) : (
        <LuCircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
      )}
      <div className="leading-relaxed">
        {status.email ? (
          <p>
            Signed in as <strong>{status.email}</strong> — you can upload images and videos from page fields or Media Library.
          </p>
        ) : (
          <p>
            <strong>Not signed in.</strong> Open{' '}
            <Link to="/admin/login" className="font-semibold underline hover:no-underline">
              /admin/login
            </Link>{' '}
            before uploading.
          </p>
        )}
      </div>
    </div>
  )
}
