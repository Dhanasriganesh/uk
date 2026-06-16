import { LuCog, LuGlobe, LuPuzzle, LuFlag } from 'react-icons/lu'
import { SERVICES } from '../../cms/servicesRegistry'

export const FOOTER_LINK_COLUMNS = [
  {
    title: 'Services',
    links: [
      ...SERVICES.slice(0, 6).map((s) => ({ name: s.shortTitle, url: s.path })),
      { name: 'All Services', url: '/services' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { name: 'Automotive', url: '/sectors' },
      { name: 'Aerospace', url: '/sectors' },
      { name: 'Defence', url: '/sectors' },
      { name: 'Heritage Construction', url: '/sectors' },
      { name: 'Medical', url: '/sectors' },
      { name: 'Motorsport', url: '/sectors' },
      { name: 'All Sectors', url: '/sectors' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'ATS at a Glance', url: '/about' },
      { name: 'Our Team', url: '/team' },
      { name: 'Partners', url: '/partners' },
      { name: 'News & Insights', url: '/news' },
      { name: 'Consultation', url: '/consultation' },
      { name: 'Contact', url: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Project Management', url: '/project-management' },
      { name: 'Project Planning', url: '/project-planning' },
      { name: 'Lifecycle Management', url: '/lifecycle-management' },
      { name: 'Turnkey Automation', url: '/turnkey-automation' },
      { name: 'Bespoke Show and Review Models', url: '/bespoke-show-review-models' },
      { name: 'Contact Support', url: '/contact' },
    ],
  },
]

export const FOOTER_HIGHLIGHTS = [
  { icon: 'years', title: '35+ Years', subtitle: 'Engineering Excellence' },
  { icon: 'uk', title: 'UK Manufactured', subtitle: 'Built to the Highest Standards' },
  { icon: 'puzzle', title: 'Bespoke Solutions', subtitle: 'Tailored to Your Needs' },
  { icon: 'globe', title: 'Global Support', subtitle: 'Trusted Worldwide' },
]

export const FOOTER_HIGHLIGHT_ICONS = {
  years: LuCog,
  uk: LuFlag,
  puzzle: LuPuzzle,
  globe: LuGlobe,
}

export function mergeLinkColumns(cmsColumns) {
  return FOOTER_LINK_COLUMNS.map((defCol, i) => {
    const col = cmsColumns?.[i] || {}
    return {
      title: col.title || defCol.title,
      links: (col.links?.length ? col.links : defCol.links).map((link, j) => ({
        name: link.name || defCol.links[j]?.name || '',
        url: link.url || defCol.links[j]?.url || '#',
      })),
    }
  })
}

export function mergeFooterHighlights(cmsHighlights) {
  return FOOTER_HIGHLIGHTS.map((def, i) => {
    const item = cmsHighlights?.[i] || {}
    return {
      icon: item.icon || def.icon,
      title: item.title || def.title,
      subtitle: item.subtitle || def.subtitle,
    }
  })
}
