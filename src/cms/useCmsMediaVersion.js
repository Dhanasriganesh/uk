import { createContext, useContext } from 'react'

export const CmsMediaVersionContext = createContext(0)

export function useCmsMediaVersion() {
  return useContext(CmsMediaVersionContext)
}
