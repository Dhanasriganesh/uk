import { deepMerge } from '../utils/deepMerge'
import { cmsStringOrFallback } from '../utils/cmsString'
import { SERVICE_PAGE_IDS } from './servicesRegistry'

const LEGACY_PRODUCT_PAGE_IDS = ['capping', 'bottle', 'pump', 'turnkey', 'bespoke', 'foodbeverage']
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

function mergeIndexedStrings(defaultItems = [], remoteItems) {
  if (!Array.isArray(remoteItems)) {
    return Array.isArray(defaultItems) ? [...defaultItems] : []
  }
  if (remoteItems.length === 0) return []
  const maxLen = Math.max(defaultItems.length, remoteItems.length)
  return Array.from({ length: maxLen }, (_, i) => {
    if (i < remoteItems.length) {
      const value = remoteItems[i]
      if (typeof value === 'string') return value
      if (value === undefined || value === null) return defaultItems[i] ?? ''
      return String(value)
    }
    return defaultItems[i] ?? ''
  })
}

function mergeProductFeatureCard(def = {}, remote = {}) {
  return {
    title: cmsStringOrFallback(remote.title, def.title),
    linkLabel: cmsStringOrFallback(remote.linkLabel, def.linkLabel),
    icon: cmsStringOrFallback(remote.icon, def.icon),
    items: Array.isArray(remote.items)
      ? mergeIndexedStrings(def.items, remote.items)
      : Array.isArray(def.items)
        ? [...def.items]
        : [],
  }
}

function mergeProductSection(def = {}, remote = {}) {
  return {
    eyebrow: cmsStringOrFallback(remote.eyebrow, def.eyebrow),
    title: cmsStringOrFallback(remote.title, def.title),
    body: cmsStringOrFallback(remote.body, def.body),
    footer: cmsStringOrFallback(remote.footer, def.footer),
    exploreLabel: cmsStringOrFallback(remote.exploreLabel, def.exploreLabel),
    imageUrl: cmsStringOrFallback(remote.imageUrl, def.imageUrl),
    videoUrl: cmsStringOrFallback(remote.videoUrl, def.videoUrl),
    bullets: Array.isArray(remote.bullets)
      ? mergeIndexedStrings(def.bullets, remote.bullets)
      : Array.isArray(def.bullets)
        ? [...def.bullets]
        : [],
  }
}

function mergeProductHighlight(def = {}, remote = {}) {
  return {
    label: cmsStringOrFallback(remote.label, def.label),
    icon: cmsStringOrFallback(remote.icon, def.icon),
  }
}

function mergeConsultationTaskItem(def = {}, remote = {}) {
  return {
    number: cmsStringOrFallback(remote.number, def.number),
    title: cmsStringOrFallback(remote.title, def.title),
    desc: cmsStringOrFallback(remote.desc ?? remote.description, def.desc),
  }
}

function mergeConsultationHighlight(def = {}, remote = {}) {
  return {
    title: cmsStringOrFallback(remote.title, def.title),
    desc: cmsStringOrFallback(remote.desc ?? remote.text, def.desc),
  }
}

function mergeConsultationTaskList(defaultItems = [], remoteList, mergedList) {
  if (remoteList && Array.isArray(remoteList) && remoteList.length === 0) return []
  return defaultItems.map((def, i) =>
    mergeConsultationTaskItem(def, mergedList?.[i] ?? remoteList?.[i] ?? {})
  )
}

function mergeConsultationHighlightList(defaultItems = [], remoteList, mergedList) {
  if (remoteList && Array.isArray(remoteList) && remoteList.length === 0) return []
  return defaultItems.map((def, i) =>
    mergeConsultationHighlight(def, mergedList?.[i] ?? remoteList?.[i] ?? {})
  )
}

/** Merge Firestore content with defaults so admin always shows the full field set. */
export function mergePageContent(pageId, defaults, remote) {
  const merged = deepMerge(defaults, remote || {})

  if (pageId === 'services') {
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
    merged.sectors = defaults.sectors.map((def, i) => {
      const remoteSector = remote?.sectors?.[i]
      const mergedSector = {
        ...def,
        ...(merged.sectors?.[i] || {}),
      }
      if (remoteSector && Array.isArray(remoteSector.solutions)) {
        mergedSector.solutions = mergeIndexedStrings(def.solutions, remoteSector.solutions)
      } else if (Array.isArray(mergedSector.solutions)) {
        mergedSector.solutions = mergeIndexedStrings(def.solutions, mergedSector.solutions)
      } else {
        mergedSector.solutions = [...def.solutions]
      }
      return mergedSector
    })
    merged.eyebrow = cmsStringOrFallback(merged.eyebrow, defaults.eyebrow)
    merged.pageTitle = cmsStringOrFallback(merged.pageTitle, defaults.pageTitle)
    merged.pageTitleHighlight = cmsStringOrFallback(
      merged.pageTitleHighlight,
      defaults.pageTitleHighlight
    )
    merged.intro = cmsStringOrFallback(merged.intro, defaults.intro)
    merged.ctaSection = {
      title: cmsStringOrFallback(merged.ctaSection?.title, defaults.ctaSection?.title),
      description: cmsStringOrFallback(
        merged.ctaSection?.description,
        defaults.ctaSection?.description
      ),
    }
    merged.cta = {
      enquireLabel: cmsStringOrFallback(merged.cta?.enquireLabel, defaults.cta?.enquireLabel),
      enquireLink: cmsStringOrFallback(merged.cta?.enquireLink, defaults.cta?.enquireLink),
    }
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

  if (pageId === 'settings' && defaults.header?.navLinks?.length) {
    merged.header = { ...defaults.header, ...merged.header }
    merged.header.navLinks = defaults.header.navLinks.map((defLink, i) => {
      const remoteLink = merged.header.navLinks?.[i] || {}
      return {
        ...defLink,
        ...remoteLink,
        dropdown: mergeIndexedObjects(defLink.dropdown, remoteLink.dropdown),
      }
    })
    if (merged.header.navLinks?.length > defaults.header.navLinks.length) {
      merged.header.navLinks.push(
        ...merged.header.navLinks.slice(defaults.header.navLinks.length)
      )
    }
  }

  if (pageId === 'settings' && defaults.contact) {
    merged.contact = { ...defaults.contact, ...merged.contact }
  }

  if (CONSULTATION_SERVICE_IDS.includes(pageId)) {
    merged.eyebrow = cmsStringOrFallback(merged.eyebrow, defaults.eyebrow)
    merged.title = cmsStringOrFallback(merged.title, defaults.title)
    merged.titleHighlight = cmsStringOrFallback(merged.titleHighlight, defaults.titleHighlight)
    merged.summary = cmsStringOrFallback(merged.summary ?? merged.intro, defaults.summary)
    merged.heroImageUrl = cmsStringOrFallback(merged.heroImageUrl, defaults.heroImageUrl)
    const sectionTitle = cmsStringOrFallback(
      merged.tasksSectionTitle ?? merged.stepsSectionTitle,
      defaults.tasksSectionTitle ?? defaults.stepsSectionTitle
    )
    merged.tasksSectionTitle = sectionTitle
    merged.stepsSectionTitle = sectionTitle
    if (defaults.tasks?.length) {
      merged.tasks = mergeConsultationTaskList(
        defaults.tasks,
        remote?.tasks,
        merged.tasks
      )
    }
    if (defaults.steps?.length) {
      merged.steps = mergeConsultationTaskList(
        defaults.steps,
        remote?.steps,
        merged.steps
      )
    }
    merged.highlights = mergeConsultationHighlightList(
      defaults.highlights || [],
      remote?.highlights,
      merged.highlights
    )
    merged.ctaSection = {
      title: cmsStringOrFallback(merged.ctaSection?.title, defaults.ctaSection?.title),
      description: cmsStringOrFallback(
        merged.ctaSection?.description,
        defaults.ctaSection?.description
      ),
    }
    merged.cta = {
      enquireLabel: cmsStringOrFallback(merged.cta?.enquireLabel, defaults.cta?.enquireLabel),
      enquireLink: cmsStringOrFallback(merged.cta?.enquireLink, defaults.cta?.enquireLink),
      brochureUrl: cmsStringOrFallback(merged.cta?.brochureUrl, defaults.cta?.brochureUrl),
      brochureLabel: cmsStringOrFallback(merged.cta?.brochureLabel, defaults.cta?.brochureLabel),
    }
  }

  if (SERVICE_PAGE_IDS.includes(pageId) || LEGACY_PRODUCT_PAGE_IDS.includes(pageId)) {
    const remoteHero = remote?.hero || {}
    merged.hero = {
      eyebrow: cmsStringOrFallback(merged.hero?.eyebrow, defaults.hero?.eyebrow),
      title: cmsStringOrFallback(merged.hero?.title, defaults.hero?.title),
      titleHighlight: cmsStringOrFallback(merged.hero?.titleHighlight, defaults.hero?.titleHighlight),
      intro: cmsStringOrFallback(merged.hero?.intro, defaults.hero?.intro),
      bullets: Array.isArray(remoteHero.bullets)
        ? mergeIndexedStrings(defaults.hero?.bullets, remoteHero.bullets)
        : Array.isArray(merged.hero?.bullets)
          ? mergeIndexedStrings(defaults.hero?.bullets, merged.hero.bullets)
          : [...(defaults.hero?.bullets || [])],
    }
    merged.featureCards = (defaults.featureCards || []).map((def, i) =>
      mergeProductFeatureCard(def, merged.featureCards?.[i] || remote?.featureCards?.[i] || {})
    )
    merged.sections = (defaults.sections || []).map((def, i) =>
      mergeProductSection(def, merged.sections?.[i] || remote?.sections?.[i] || {})
    )
    merged.highlights = (defaults.highlights || []).map((def, i) =>
      mergeProductHighlight(def, merged.highlights?.[i] || remote?.highlights?.[i] || {})
    )
    merged.ctaSection = {
      title: cmsStringOrFallback(merged.ctaSection?.title, defaults.ctaSection?.title),
      description: cmsStringOrFallback(
        merged.ctaSection?.description,
        defaults.ctaSection?.description
      ),
    }
    merged.cta = {
      brochureUrl: cmsStringOrFallback(merged.cta?.brochureUrl, defaults.cta?.brochureUrl),
      brochureLabel: cmsStringOrFallback(merged.cta?.brochureLabel, defaults.cta?.brochureLabel),
      enquireLabel: cmsStringOrFallback(merged.cta?.enquireLabel, defaults.cta?.enquireLabel),
      enquireLink: cmsStringOrFallback(merged.cta?.enquireLink, defaults.cta?.enquireLink),
    }
  }

  return merged
}
