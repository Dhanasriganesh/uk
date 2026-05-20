import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPageMeta } from '../../cms/pageRegistry'
import { getDefaultContent } from '../../cms/defaultContent'
import { getPageContent, savePageContent, getSiteSettings, saveSiteSettings } from '../../firebase/cmsService'
import { deepMerge } from '../../utils/deepMerge'
import { useAuth } from '../../context/AuthContext'
import DynamicForm from '../components/DynamicForm'

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
          if (!cancelled) setData(deepMerge(defaults, remote || {}))
        } else {
          const remote = await getPageContent(pageId)
          const defaults = getDefaultContent(pageId)
          if (!cancelled) setData(deepMerge(defaults, remote || {}))
        }
      } catch (err) {
        if (!cancelled) setMessage(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [pageId, isSettings])

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      if (isSettings) {
        await saveSiteSettings(data, user?.email)
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

  if (loading || !data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-600" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link to="/admin" className="text-sm text-gray-500 hover:text-red-600">← Dashboard</Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">{meta.label}</h1>
        <p className="text-sm text-gray-500">{meta.description}</p>
      </div>

      {message && (
        <div className={`mb-6 rounded-lg p-3 text-sm ${message.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <DynamicForm data={data} onChange={setData} />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Commit changes'}
        </button>
        <button
          type="button"
          onClick={() => setData(structuredClone(getDefaultContent(pageId)))}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Reset to defaults (local)
        </button>
      </div>
    </div>
  )
}
