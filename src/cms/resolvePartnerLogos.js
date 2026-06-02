import { resolveCmsImageUrl } from './resolveCmsImageUrl'

export function resolvePartnerItems(items, defaults, fallbacks, logoByName) {
  const list = items?.length ? items : defaults
  return list.map((item, i) => {
    const nameKey = item.name?.toLowerCase()
    const fallback = logoByName[nameKey] ?? fallbacks[i % fallbacks.length]
    return {
      ...item,
      resolvedLogoUrl: resolveCmsImageUrl(item.logoUrl, fallback),
      logoFallback: fallback,
    }
  })
}
