import pharmaImg from '../../assets/pharma.png'
import autoImg from '../../assets/auto.png'
import foodindImg from '../../assets/foodind.png'
import medImg from '../../assets/med.png'
import homeImg from '../../assets/home.png'
import persImg from '../../assets/pers.png'
import { SECTORS } from '../../cms/sectorsRegistry'

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
