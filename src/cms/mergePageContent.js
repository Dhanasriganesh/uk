import { deepMerge } from '../utils/deepMerge'

const PRODUCT_PAGE_IDS = ['capping', 'bottle', 'pump', 'turnkey', 'bespoke', 'foodbeverage']
const CONSULTATION_SERVICE_IDS = [
  'project-management',
  'project-planning',
  'lifecycle-management',
  'turnkey-automation',
  'bespoke-show-review-models',
]

function mergeIndexedObjects(defaultItems, remoteItems) {
  if (!defaultItems?.length) return remoteItems || []
  const remoteList = Array.isArray(remoteItems) ? remoteItems : []
  const merged = defaultItems.map((def, i) => ({
    ...def,
    ...(remoteList[i] || {}),
  }))
  if (remoteList.length > defaultItems.length) {
    merged.push(...remoteList.slice(defaultItems.length))
  }
  return merged
}

/** Merge Firestore content with defaults so admin always shows the full field set. */
export function mergePageContent(pageId, defaults, remote) {
  const merged = deepMerge(defaults, remote || {})

  if (pageId === 'products') {
    merged.slides = mergeIndexedObjects(defaults.slides, merged.slides)
    merged.ctaSection = { ...defaults.ctaSection, ...merged.ctaSection }
    merged.cta = { ...defaults.cta, ...merged.cta }
  }

  if (pageId === 'consultation') {
    merged.services = mergeIndexedObjects(defaults.services, merged.services)
    merged.ctaSection = { ...defaults.ctaSection, ...merged.ctaSection }
    merged.cta = { ...defaults.cta, ...merged.cta }
  }

  if (pageId === 'sectors') {
    merged.sectors = mergeIndexedObjects(defaults.sectors, merged.sectors)
    merged.ctaSection = { ...defaults.ctaSection, ...merged.ctaSection }
    merged.cta = { ...defaults.cta, ...merged.cta }
  }

  if (pageId === 'contact') {
    merged.contactCards = mergeIndexedObjects(defaults.contactCards, merged.contactCards)
    merged.enquiryTypes = mergeIndexedObjects(defaults.enquiryTypes, merged.enquiryTypes)
    merged.faq = mergeIndexedObjects(defaults.faq, merged.faq)
  }

  if (pageId === 'settings' && defaults.footer) {
    merged.footer = { ...defaults.footer, ...merged.footer }
    if (defaults.footer.linkColumns?.length) {
      merged.footer.linkColumns = defaults.footer.linkColumns.map((defCol, i) => ({
        ...defCol,
        ...(merged.footer.linkColumns?.[i] || {}),
        links: mergeIndexedObjects(defCol.links, merged.footer.linkColumns?.[i]?.links),
      }))
    }
    merged.footer.highlights = mergeIndexedObjects(
      defaults.footer.highlights,
      merged.footer.highlights
    )
    merged.footer.socialLinks = mergeIndexedObjects(
      defaults.footer.socialLinks,
      merged.footer.socialLinks
    )
    merged.footer.legalLinks = mergeIndexedObjects(
      defaults.footer.legalLinks,
      merged.footer.legalLinks
    )
  }

  if (CONSULTATION_SERVICE_IDS.includes(pageId)) {
    if (defaults.tasks?.length) {
      merged.tasks = mergeIndexedObjects(defaults.tasks, merged.tasks)
    }
    if (defaults.steps?.length) {
      merged.steps = mergeIndexedObjects(defaults.steps, merged.steps)
    }
    merged.highlights = mergeIndexedObjects(defaults.highlights, merged.highlights)
    merged.ctaSection = { ...defaults.ctaSection, ...merged.ctaSection }
    merged.cta = { ...defaults.cta, ...merged.cta }
  }

  if (PRODUCT_PAGE_IDS.includes(pageId)) {
    merged.hero = { ...defaults.hero, ...merged.hero }
    merged.featureCards = mergeIndexedObjects(defaults.featureCards, merged.featureCards)
    merged.sections = mergeIndexedObjects(defaults.sections, merged.sections)
    merged.highlights = mergeIndexedObjects(defaults.highlights, merged.highlights)
    merged.ctaSection = { ...defaults.ctaSection, ...merged.ctaSection }
    merged.cta = { ...defaults.cta, ...merged.cta }
  }

  return merged
}
