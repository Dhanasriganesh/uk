import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PAGE_GROUPS, ALL_PAGE_IDS } from '../../cms/pageRegistry'
import { PAGE_DEFAULTS } from '../../cms/defaultContent'
import { savePageContent, saveSiteSettings } from '../../firebase/cmsService'
import { useAuth } from '../../context/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()
  const [seeding, setSeeding] = useState(false)
  const [seedMessage, setSeedMessage] = useState('')

  const seedDatabase = async () => {
    if (!confirm('This will upload default content for all pages. Existing content will be merged/overwritten per page. Continue?')) {
      return
    }
    setSeeding(true)
    setSeedMessage('')
    try {
      await saveSiteSettings(PAGE_DEFAULTS.settings, user?.email)
      for (const pageId of ALL_PAGE_IDS) {
        if (pageId === 'settings') continue
        const content = PAGE_DEFAULTS[pageId]
        if (content) {
          await savePageContent(pageId, structuredClone(content), user?.email)
        }
      }
      setSeedMessage('Database seeded successfully with default content.')
    } catch (err) {
      setSeedMessage(`Error: ${err.message}`)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Manage all website pages, images, and text from the content library.</p>
        </div>
        <button
          type="button"
          onClick={seedDatabase}
          disabled={seeding}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {seeding ? 'Seeding…' : 'Seed defaults '}
        </button>
      </div>

      {seedMessage && (
        <div className={`mb-6 rounded-lg p-4 text-sm ${seedMessage.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {seedMessage}
        </div>
      )}

      <div className="space-y-8">
        {PAGE_GROUPS.map((group) => (
          <section key={group.label}>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">{group.label}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.pages.map((page) => (
                <Link
                  key={page.id}
                  to={`/admin/pages/${page.id}`}
                  className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-red-200 hover:shadow-md"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-red-600">{page.label}</h3>
                  <p className="mt-1 text-xs text-gray-500">{page.description}</p>
                  <span className="mt-3 inline-block text-xs font-medium text-red-600">Edit →</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
