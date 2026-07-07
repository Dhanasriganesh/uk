import { useEffect, useState } from 'react'
import { subscribePageContent } from '../firebase/cmsService'
import { getDefaultContent } from '../cms/defaultContent'
import { mergePageContent } from '../cms/mergePageContent'
import { readPageContentCache, writePageContentCache } from '../cms/pageContentCache'
import { toCacheVersion } from '../utils/adminMediaPreview'

export function useCmsPage(pageId) {
  const [content, setContent] = useState(() => {
    const defaults = getDefaultContent(pageId)
    const cached = readPageContentCache(pageId)
    return cached?.content
      ? mergePageContent(pageId, defaults, cached.content)
      : defaults
  })
  const [updatedAt, setUpdatedAt] = useState(() => readPageContentCache(pageId)?.updatedAt ?? 0)
  const [loading, setLoading] = useState(() => !readPageContentCache(pageId))
  const [fromFirestore, setFromFirestore] = useState(() => Boolean(readPageContentCache(pageId)))

  useEffect(() => {
    const defaults = getDefaultContent(pageId)
    const hadCache = Boolean(readPageContentCache(pageId))
    if (!hadCache) setLoading(true)

    const unsub = subscribePageContent(pageId, (remote, remoteUpdatedAt) => {
      const remoteVersion = toCacheVersion(remoteUpdatedAt)
      if (remote) {
        const merged = mergePageContent(pageId, defaults, remote)
        setContent(merged)
        writePageContentCache(pageId, remote, remoteVersion || Date.now())
        setUpdatedAt(remoteVersion || Date.now())
        setFromFirestore(true)
      } else {
        setContent(defaults)
        setUpdatedAt(0)
        setFromFirestore(false)
      }
      setLoading(false)
    })
    return unsub
  }, [pageId])

  return { content, loading, fromFirestore, updatedAt }
}
