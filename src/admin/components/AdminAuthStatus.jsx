import React, { useEffect, useState } from 'react'
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
      className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
        status.email
          ? 'border-green-200 bg-green-50 text-green-900'
          : 'border-amber-200 bg-amber-50 text-amber-900'
      }`}
    >
      {status.email ? (
        <p>
          Signed in as <strong>{status.email}</strong> — images are saved to Firestore as base64 URLs.
        </p>
      ) : (
        <p>
          <strong>Not signed in.</strong> Open <a href="/admin/login" className="underline">/admin/login</a> before uploading.
        </p>
      )}
    </div>
  )
}
