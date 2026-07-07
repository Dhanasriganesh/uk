import React from 'react'
import { useCmsPage } from '../../hooks/useCmsPage'
import { CmsMediaVersionProvider } from '../../cms/CmsMediaVersionContext'

/** Wraps a page/section so CmsImage and CmsRawImage auto-bust uploaded media cache. */
export default function CmsPageProvider({ pageId, children }) {
  const page = useCmsPage(pageId)

  return (
    <CmsMediaVersionProvider version={page.updatedAt}>
      {typeof children === 'function' ? children(page) : children}
    </CmsMediaVersionProvider>
  )
}
