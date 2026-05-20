import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { subscribeSiteSettings } from '../firebase/cmsService'
import { defaultSettings } from '../cms/defaultContent'
import { deepMerge } from '../utils/deepMerge'

const CmsContext = createContext(null)

export function CmsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings)
  const [settingsLoading, setSettingsLoading] = useState(true)

  useEffect(() => {
    const unsub = subscribeSiteSettings((data) => {
      if (data) {
        const { updatedAt, updatedBy, ...rest } = data
        setSettings(deepMerge(defaultSettings, rest))
      } else {
        setSettings(defaultSettings)
      }
      setSettingsLoading(false)
    })
    return unsub
  }, [])

  const refreshSettings = useCallback(() => {
    setSettingsLoading(true)
  }, [])

  return (
    <CmsContext.Provider value={{ settings, settingsLoading, refreshSettings }}>
      {children}
    </CmsContext.Provider>
  )
}

export function useSiteSettings() {
  const ctx = useContext(CmsContext)
  if (!ctx) throw new Error('useSiteSettings must be used within CmsProvider')
  return ctx
}
