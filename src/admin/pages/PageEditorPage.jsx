import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LuRotateCcw, LuSave } from 'react-icons/lu'
import { getPageMeta } from '../../cms/pageRegistry'
import { getDefaultContent } from '../../cms/defaultContent'
import { getPageContent, savePageContent, getSiteSettings, saveSiteSettings } from '../../firebase/cmsService'
import { mergePageContent } from '../../cms/mergePageContent'
import { useAuth } from '../../context/AuthContext'
import DynamicForm from '../components/DynamicForm'
import SettingsEditor, { stripSettingsMeta } from '../components/SettingsEditor'
import AdminPageShell from '../components/ui/AdminPageShell'
import PageHeader from '../components/ui/PageHeader'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Spinner from '../components/ui/Spinner'

export default function PageEditorPage() {
  const { pageId } = useParams()
  const meta = getPageMeta(pageId)
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const isSettings = pageId === 'settings'

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        if (isSettings) {
          const remote = await getSiteSettings()
          const defaults = getDefaultContent('settings')
          const rest = remote ? { ...remote } : {}
          delete rest.updatedAt
          delete rest.updatedBy
          if (!cancelled) setData(mergePageContent('settings', defaults, rest))
        } else {
          const remote = await getPageContent(pageId)
          const defaults = getDefaultContent(pageId)
          if (!cancelled) setData(mergePageContent(pageId, defaults, remote))
        }
      } catch (err) {
        if (!cancelled) setMessage(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [pageId, isSettings])

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      if (isSettings) {
        await saveSiteSettings(stripSettingsMeta(data), user?.email)
      } else {
        await savePageContent(pageId, data, user?.email)
      }
      setMessage('Saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(`Error: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const resetLocal = () =>
    setData(
      isSettings
        ? mergePageContent('settings', getDefaultContent('settings'), {})
        : structuredClone(getDefaultContent(pageId))
    )

  if (loading || !data) {
    return (
      <AdminPageShell>
        <div className="flex min-h-[40vh] items-center justify-center sm:min-h-[50vh]">
          <Spinner label="Loading page content…" />
        </div>
      </AdminPageShell>
    )
  }

  return (
    <AdminPageShell className="pb-[calc(7rem+env(safe-area-inset-bottom,0px))] lg:pb-8">
      <PageHeader
        breadcrumbs={[
          { label: 'Dashboard', to: '/admin' },
          { label: meta.group || 'Pages', to: '/admin' },
          { label: meta.label },
        ]}
        title={meta.label}
        description={meta.description}
        actions={
          <>
            <Button variant="secondary" size="md" icon={LuRotateCcw} fullWidth onClick={resetLocal} className="lg:w-auto">
              <span className="sm:hidden">Reset</span>
              <span className="hidden sm:inline">Reset locally</span>
            </Button>
            <Button size="md" icon={LuSave} fullWidth onClick={handleSave} disabled={saving} className="lg:w-auto">
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </>
        }
        actionsClassName="hidden lg:flex"
      />

      {message && (
        <Alert
          variant={message.startsWith('Error') ? 'error' : 'success'}
          className="mb-4 sm:mb-6"
          onDismiss={() => setMessage('')}
        >
          {message}
        </Alert>
      )}

      <Card className="mb-0 overflow-hidden">
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
          {isSettings ? (
            <SettingsEditor data={data} onChange={setData} />
          ) : (
            <DynamicForm data={data} onChange={setData} />
          )}
        </div>
      </Card>

      {/* Fixed save bar — sits above mobile bottom nav */}
      <div className="fixed inset-x-0 bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] z-20 flex flex-col gap-2 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:p-4 lg:relative lg:bottom-auto lg:mt-6 lg:rounded-2xl lg:border lg:shadow-sm">
        <Button variant="secondary" icon={LuRotateCcw} fullWidth onClick={resetLocal} className="sm:flex-1 lg:flex-none lg:w-auto">
          <span className="lg:hidden">Reset defaults</span>
          <span className="hidden lg:inline">Reset to defaults (local)</span>
        </Button>
        <Button icon={LuSave} fullWidth onClick={handleSave} disabled={saving} className="sm:flex-1 lg:flex-none lg:w-auto">
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </AdminPageShell>
  )
}
