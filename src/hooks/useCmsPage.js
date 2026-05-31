import { useEffect, useState } from 'react'
import { subscribePageContent } from '../firebase/cmsService'
import { getDefaultContent } from '../cms/defaultContent'
import { mergePageContent } from '../cms/mergePageContent'

export function useCmsPage(pageId) {
  const [content, setContent] = useState(() => getDefaultContent(pageId))
  const [loading, setLoading] = useState(true)
  const [fromFirestore, setFromFirestore] = useState(false)

  useEffect(() => {
    setLoading(true)
    const defaults = getDefaultContent(pageId)
    const unsub = subscribePageContent(pageId, (remote) => {
      if (remote) {
        setContent(mergePageContent(pageId, defaults, remote))
        setFromFirestore(true)
      } else {
        setContent(defaults)
        setFromFirestore(false)
      }
      setLoading(false)
    })
    return unsub
  }, [pageId])

  return { content, loading, fromFirestore }
}
