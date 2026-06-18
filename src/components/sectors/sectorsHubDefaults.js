import pharmaImg from '../../assets/pharma.png'
import autoImg from '../../assets/auto.png'
import foodindImg from '../../assets/foodind.png'
import medImg from '../../assets/med.png'
import homeImg from '../../assets/home.png'
import persImg from '../../assets/pers.png'
import { SECTORS } from '../../cms/sectorsRegistry'
import { cmsStringOrFallback } from '../../utils/cmsString'

const LEGACY_IMAGES = {
  automotive: autoImg,
  'pharmaceutical-cosmetic': pharmaImg,
  'food-beverage': foodindImg,
  medical: medImg,
  'home-care': homeImg,
  'personal-care': persImg,
}

export const SECTOR_ITEMS = SECTORS.map((sector) => ({
  id: sector.id,
  name: sector.name,
  iconId: sector.icon,
  imageUrl: LEGACY_IMAGES[sector.id] || sector.imageUrl,
  solutions: sector.solutions,
}))

export const SECTORS_HUB_DEFAULTS = {
  eyebrow: 'INDUSTRIES',
  pageTitle: 'Sectors We',
  pageTitleHighlight: 'Serve',
  intro:
    'Advanced Tooling Systems UK Ltd delivers engineering, automation, tooling, and packaging solutions across a wide range of industry sectors — from automotive and aerospace to heritage construction, medical, and motorsport.',
  ctaSection: {
    title: 'Need a Solution for Your Sector?',
    description:
      'Speak to our team about your industry requirements and discover how ATS UK can support your project with precision engineering and innovative solutions.',
  },
  cta: {
    enquireLabel: 'Connect with Us',
    enquireLink: '/contact',
  },
}

export function getSectorLocalDefaults(sectorId) {
  return SECTOR_ITEMS.find((s) => s.id === sectorId) || null
}

/** Merge CMS sector rows by index (and id fallback) so admin edits always apply. */
export function mergeSectorsForDisplay(cmsSectors) {
  const cmsList = Array.isArray(cmsSectors) ? cmsSectors : []
  const cmsById = Object.fromEntries(
    cmsList.filter((sector) => sector?.id).map((sector) => [sector.id, sector])
  )

  return SECTOR_ITEMS.map((def, i) => {
    const sector =
      (cmsList[i]?.id === def.id ? cmsList[i] : null) ||
      cmsById[def.id] ||
      cmsList[i] ||
      {}

    const cmsImage = cmsStringOrFallback(sector.imageUrl, '')
    const solutions = Array.isArray(sector.solutions)
      ? sector.solutions
          .map((item, j) => cmsStringOrFallback(item, def.solutions?.[j] ?? ''))
          .filter(Boolean)
      : [...def.solutions]

    return {
      id: def.id,
      name: cmsStringOrFallback(sector.name, def.name),
      iconId: cmsStringOrFallback(sector.icon, def.iconId),
      imageUrl: cmsImage || def.imageUrl,
      fallbackImageUrl: def.imageUrl,
      solutions,
    }
  })
}
