import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { subscribeSiteSettings } from '../firebase/cmsService'
import { defaultSettings } from '../cms/defaultContent'
import { mergePageContent } from '../cms/mergePageContent'
import { toCacheVersion, withPublicMediaVersion } from '../utils/adminMediaPreview'

const CmsContext = createContext(null)

export function CmsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings)
  const [settingsLoading, setSettingsLoading] = useState(true)
  const [settingsUpdatedAt, setSettingsUpdatedAt] = useState(0)

  useEffect(() => {
    const unsub = subscribeSiteSettings((data, updatedAt) => {
      if (data) {
        const rest = { ...data }
        delete rest.updatedAt
        delete rest.updatedBy
        setSettings(mergePageContent('settings', defaultSettings, rest))
        setSettingsUpdatedAt(toCacheVersion(updatedAt) || Date.now())
      } else {
        setSettings(defaultSettings)
        setSettingsUpdatedAt(0)
      }
      setSettingsLoading(false)
    })
    return unsub
  }, [])

  const refreshSettings = useCallback(() => {
    setSettingsLoading(true)
  }, [])

  const settingsMediaUrl = useCallback(
    (url) => withPublicMediaVersion(typeof url === 'string' ? url.trim() : '', settingsUpdatedAt),
    [settingsUpdatedAt]
  )

  return (
    <CmsContext.Provider
      value={{ settings, settingsLoading, settingsUpdatedAt, settingsMediaUrl, refreshSettings }}
    >
      {children}
    </CmsContext.Provider>
  )
}

export function useSiteSettings() {
  const ctx = useContext(CmsContext)
  if (!ctx) {
    return {
      settings: defaultSettings,
      settingsLoading: false,
      settingsUpdatedAt: 0,
      settingsMediaUrl: (url) => url,
      refreshSettings: () => {},
    }
  }
  return ctx
}
