import { SERVICES } from '../cms/servicesRegistry'

const EXTRA_PAGES = [
  { name: 'About Us', path: '/about', category: 'Company', keywords: ['about', 'glance'] },
  { name: 'Capping Machines', path: '/capping', category: 'Products', keywords: ['capping', 'cap', 'packaging'] },
  { name: 'Bottle Unscramblers', path: '/bottle', category: 'Products', keywords: ['bottle', 'unscrambler'] },
  { name: 'Pump & Trigger', path: '/pump', category: 'Products', keywords: ['pump', 'trigger', 'dispenser'] },
  { name: 'Turnkey Filling Lines', path: '/turnkey', category: 'Products', keywords: ['filling', 'turnkey'] },
  { name: 'Bespoke Solutions', path: '/bespoke', category: 'Products', keywords: ['bespoke', 'custom'] },
  { name: 'Food & Beverage Lines', path: '/foodbeverage', category: 'Products', keywords: ['food', 'beverage', 'drink'] },
]

function addItem(items, seen, item) {
  if (!item.path || seen.has(item.path)) return
  seen.add(item.path)
  items.push({
    name: item.name,
    path: item.path,
    category: item.category || 'Pages',
    keywords: item.keywords || [],
  })
}

/** Flatten nav links and merge with all routable site pages for header search. */
export function buildSiteSearchIndex(navLinks = []) {
  const items = []
  const seen = new Set()

  navLinks.forEach((link) => {
    if (link.dropdown?.length) {
      link.dropdown.forEach((sub) => {
        addItem(items, seen, { name: sub.name, path: sub.path, category: link.name })
      })
    }
    addItem(items, seen, { name: link.name, path: link.path, category: 'Pages' })
  })

  SERVICES.forEach((service) => {
    addItem(items, seen, {
      name: service.shortTitle,
      path: service.path,
      category: 'Services',
      keywords: [service.title, service.id.replace(/-/g, ' ')],
    })
  })

  EXTRA_PAGES.forEach((page) => addItem(items, seen, page))

  return items
}

function itemHaystack(item) {
  return [item.name, item.category, item.path, ...(item.keywords || [])].join(' ').toLowerCase()
}

export function filterSiteSearch(items, query, limit = 8) {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const words = q.split(/\s+/).filter(Boolean)

  return items
    .filter((item) => {
      const haystack = itemHaystack(item)
      return words.every((word) => haystack.includes(word))
    })
    .sort((a, b) => {
      const aName = a.name.toLowerCase()
      const bName = b.name.toLowerCase()
      const aStarts = aName.startsWith(q) ? 0 : 1
      const bStarts = bName.startsWith(q) ? 0 : 1
      if (aStarts !== bStarts) return aStarts - bStarts
      return aName.localeCompare(bName)
    })
    .slice(0, limit)
}
