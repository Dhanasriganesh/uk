/** Use CMS text when the field exists (including empty string); otherwise fall back. */
export function cmsStringOrFallback(contentValue, fallback = '') {
  if (typeof contentValue === 'string') return contentValue.trim()
  if (contentValue === undefined || contentValue === null) {
    return typeof fallback === 'string' ? fallback.trim() : fallback ?? ''
  }
  return String(contentValue)
}

/** Prefer the first array explicitly set on CMS content (including empty). */
export function cmsFirstArray(content, keys, fallback = []) {
  for (const key of keys) {
    if (Array.isArray(content[key])) return content[key]
  }
  return Array.isArray(fallback) ? fallback : []
}

export function mergeCmsTaskItems(items, defaultItems = []) {
  if (!Array.isArray(items) || items.length === 0) return []

  return items
    .map((task, i) => {
      const def = defaultItems[i] || {}
      const title = cmsStringOrFallback(task.title, def.title)
      const desc = cmsStringOrFallback(task.desc ?? task.description, def.desc)
      const number = cmsStringOrFallback(task.number, def.number)
      if (!title && !desc && !number) return null
      return { title, desc, number }
    })
    .filter(Boolean)
}

export function mergeCmsHighlightItems(items, defaultItems = []) {
  if (!Array.isArray(items) || items.length === 0) return []

  return items
    .map((item, i) => {
      const def = defaultItems[i] || {}
      const title = cmsStringOrFallback(item.title, def.title)
      const desc = cmsStringOrFallback(item.desc ?? item.text, def.desc)
      if (!title && !desc) return null
      return { title, desc }
    })
    .filter(Boolean)
}

export function mergeCmsObjectStrings(contentObj = {}, defaultObj = {}, keys) {
  const merged = {}
  for (const key of keys) {
    merged[key] = cmsStringOrFallback(contentObj[key], defaultObj[key])
  }
  return merged
}

/** Merge a list of CMS strings by index; empty saved list stays empty. */
export function mergeCmsStringList(items, defaultItems = []) {
  if (!Array.isArray(items)) return Array.isArray(defaultItems) ? [...defaultItems] : []
  if (items.length === 0) return []
  return items
    .map((item, i) => cmsStringOrFallback(item, defaultItems[i] ?? ''))
    .filter(Boolean)
}

export function mergeCmsLabelHighlights(items, defaultItems = []) {
  if (!Array.isArray(items) || items.length === 0) return []

  return items
    .map((item, i) => {
      const def = defaultItems[i] || {}
      const label = cmsStringOrFallback(item.label, def.label)
      const icon = cmsStringOrFallback(item.icon, def.icon)
      if (!label) return null
      return { label, icon }
    })
    .filter(Boolean)
}
