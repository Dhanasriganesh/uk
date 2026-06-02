import { LuCog, LuGlobe, LuPuzzle, LuFlag } from 'react-icons/lu'

export const FOOTER_LINK_COLUMNS = [
  {
    title: 'Products',
    links: [
      { name: 'Capping Machines', url: '/capping' },
      { name: 'Bottle Unscramblers', url: '/bottle' },
      { name: 'Pump & Trigger Systems', url: '/pump' },
      { name: 'Turnkey Filling Lines', url: '/turnkey' },
      { name: 'Bespoke Solutions', url: '/bespoke' },
      { name: 'Food & Beverage Lines', url: '/foodbeverage' },
      { name: 'All Products', url: '/products' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { name: 'Pharmaceutical', url: '/sectors' },
      { name: 'Personal Care', url: '/sectors' },
      { name: 'Home Care', url: '/sectors' },
      { name: 'Automotive', url: '/sectors' },
      { name: 'Food & Beverage', url: '/sectors' },
      { name: 'Medical & Veterinary', url: '/sectors' },
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
    const cmsLinks = col.links?.length ? col.links : null
    return {
      title: col.title || defCol.title,
      links: cmsLinks
        ? cmsLinks.map((link, j) => ({
            name: link.name || defCol.links[j]?.name || '',
            url: link.url || defCol.links[j]?.url || '#',
          }))
        : defCol.links,
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
