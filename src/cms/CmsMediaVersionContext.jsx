import React from 'react'
import { CmsMediaVersionContext } from './useCmsMediaVersion'

export function CmsMediaVersionProvider({ version = 0, children }) {
  return (
    <CmsMediaVersionContext.Provider value={version || 0}>{children}</CmsMediaVersionContext.Provider>
  )
}
