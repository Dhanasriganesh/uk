import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LuArrowRight,
  LuDatabase,
  LuFileText,
  LuGlobe,
  LuHouse,
  LuLayers,
  LuNewspaper,
  LuPackage,
  LuSearch,
  LuSettings,
  LuUsers,
  LuWrench,
} from 'react-icons/lu'
import { PAGE_GROUPS, ALL_PAGE_IDS } from '../../cms/pageRegistry'
import { PAGE_DEFAULTS } from '../../cms/defaultContent'
import { savePageContent, saveSiteSettings, seedMediaLibrary } from '../../firebase/cmsService'
import { useAuth } from '../../context/AuthContext'
import AdminPageShell from '../components/ui/AdminPageShell'
import PageHeader from '../components/ui/PageHeader'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const GROUP_ICONS = {
  Site: LuSettings,
  'Home Page': LuHouse,
  'Main Pages': LuGlobe,
  Services: LuPackage,
  'Packaging Products (Legacy)': LuPackage,
  Products: LuPackage,
  'Consultation Services': LuWrench,
  'ATS at a Glance': LuUsers,
}

const PAGE_ICONS = {
  settings: LuSettings,
  home: LuHouse,
  news: LuNewspaper,
}

function getPageIcon(pageId) {
  return PAGE_ICONS[pageId] || LuFileText
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [seeding, setSeeding] = useState(false)
  const [seedMessage, setSeedMessage] = useState('')
  const [query, setQuery] = useState('')

  const totalPages = ALL_PAGE_IDS.filter((id) => id !== 'settings').length

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PAGE_GROUPS
    return PAGE_GROUPS.map((group) => ({
      ...group,
      pages: group.pages.filter(
        (p) =>
          p.label.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      ),
    })).filter((g) => g.pages.length > 0)
  }, [query])

  const seedDatabase = async () => {
    if (
      !confirm(
        'This will upload default content for all pages. Existing content will be merged/overwritten per page. Continue?'
      )
    ) {
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
      const media = await seedMediaLibrary({ migrateLegacy: true })
      setSeedMessage(
        `Database seeded. Media library: ${media.added} new URL(s) added (${media.total} total).`
      )
    } catch (err) {
      setSeedMessage(`Error: ${err.message}`)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <AdminPageShell>
      <PageHeader
        title="Content Dashboard"
        description="Browse and edit every page on your website. Changes are saved to Firebase and reflected on the live site."
        actions={
          <Button
            variant="secondary"
            icon={LuDatabase}
            fullWidth
            onClick={seedDatabase}
            disabled={seeding}
            className="sm:w-auto"
          >
            {seeding ? 'Seeding…' : 'Seed defaults'}
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-red-500/10" />
          <p className="text-sm font-medium text-slate-500">Managed pages</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{totalPages + 1}</p>
          <p className="mt-1 text-xs text-slate-400">Including global settings</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-slate-500">Content groups</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{PAGE_GROUPS.length}</p>
          <p className="mt-1 text-xs text-slate-400">Organized by site section</p>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-1">
          <p className="text-sm font-medium text-slate-500">Quick tip</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Upload images in <Link to="/admin/media" className="font-semibold text-red-600 hover:underline">Media Library</Link>, then paste URLs into page fields.
          </p>
        </Card>
      </div>

      {seedMessage && (
        <Alert
          variant={seedMessage.startsWith('Error') ? 'error' : 'success'}
          className="mb-6"
          onDismiss={() => setSeedMessage('')}
        >
          {seedMessage}
        </Alert>
      )}

      <div className="relative mb-6 w-full sm:mb-8 sm:max-w-xl">
        <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
        <input
          type="search"
          placeholder="Search pages…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 sm:text-sm"
        />
      </div>

      <div className="space-y-8 sm:space-y-10">
        {filteredGroups.length === 0 ? (
          <Card className="text-center">
            <p className="text-sm text-slate-500">No pages match your search.</p>
          </Card>
        ) : (
          filteredGroups.map((group) => {
            const GroupIcon = GROUP_ICONS[group.label] || LuLayers
            return (
              <section key={group.label}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <GroupIcon className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{group.label}</h2>
                    <p className="text-xs text-slate-500">{group.pages.length} page{group.pages.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                  {group.pages.map((page) => {
                    const PageIcon = getPageIcon(page.id)
                    return (
                      <Link
                        key={page.id}
                        to={`/admin/pages/${page.id}`}
                        className="group relative flex min-h-[120px] flex-col rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all active:scale-[0.99] sm:rounded-2xl sm:p-5 sm:hover:-translate-y-0.5 sm:hover:border-red-200 sm:hover:shadow-md sm:hover:shadow-red-100/50"
                      >
                        <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-red-50 group-hover:text-red-600">
                            <PageIcon className="h-5 w-5" aria-hidden />
                          </span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-all sm:text-slate-300 sm:group-hover:bg-red-600 sm:group-hover:text-white">
                            <LuArrowRight className="h-4 w-4" aria-hidden />
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-900 group-hover:text-red-700">{page.label}</h3>
                        <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-2 sm:line-clamp-none">{page.description}</p>
                        <span className="mt-3 inline-flex items-center text-xs font-semibold text-red-600 sm:mt-4 sm:uppercase sm:tracking-wide sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                          Edit content →
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )
          })
        )}
      </div>
    </AdminPageShell>
  )
}
