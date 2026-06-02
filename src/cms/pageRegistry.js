/**
 * Registry of all CMS-managed pages for the admin panel.
 * Each page has a default content shape in defaultContent.js
 */
export const PAGE_GROUPS = [
  {
    label: 'Site',
    pages: [
      { id: 'settings', label: 'Global Settings', description: 'Logo, footer columns, highlights, contact, social & legal links' },
    ],
  },
  {
    label: 'Home Page',
    pages: [
      { id: 'home', label: 'Home Hero', description: 'Hero headline, video, intro text' },
      { id: 'home-what-we-do', label: 'What We Do', description: 'Service cards section' },
      { id: 'home-why', label: 'Why Choose ATS', description: 'Features and promises' },
      { id: 'home-brands', label: 'Brands', description: 'Section title only; logos match Partners → Supported Customers' },
      { id: 'home-connect', label: 'Connect / Consultation Form', description: 'Home page contact section' },
    ],
  },
  {
    label: 'Main Pages',
    pages: [
      { id: 'about', label: 'About Us', description: '/about page' },
      { id: 'contact', label: 'Contact', description: '/contact — hero, cards, form, map, FAQ' },
      { id: 'sectors', label: 'Sectors', description: '/sectors — hero, sector cards, CTA' },
      { id: 'consultation', label: 'Consultation Hub', description: '/consultation — hero, service cards, CTA' },
    ],
  },
  {
    label: 'Products',
    pages: [
      {
        id: 'products',
        label: 'Products Hub',
        description: '/products listing — hero, product cards, image strip, CTA',
      },
      { id: 'capping', label: 'Capping Machines', description: '/capping' },
      { id: 'bottle', label: 'Bottle Unscramblers', description: '/bottle' },
      { id: 'pump', label: 'Pump & Trigger', description: '/pump' },
      { id: 'turnkey', label: 'Turnkey Filling Lines', description: '/turnkey' },
      { id: 'bespoke', label: 'Bespoke Solutions', description: '/bespoke' },
      { id: 'foodbeverage', label: 'Food & Beverage Lines', description: '/foodbeverage' },
    ],
  },
  {
    label: 'Consultation Services',
    pages: [
      { id: 'project-management', label: 'Project Management', description: '/project-management — hero, tasks, highlights, CTA' },
      { id: 'project-planning', label: 'Project Planning', description: '/project-planning — hero, process steps, highlights, CTA' },
      { id: 'turnkey-automation', label: 'Turnkey Automation', description: '/turnkey-automation — hero, capabilities, highlights, CTA' },
      { id: 'lifecycle-management', label: 'Lifecycle Management', description: '/lifecycle-management — hero, solutions, highlights, CTA' },
      {
        id: 'bespoke-show-review-models',
        label: 'Bespoke Show and Review Models',
        description: '/bespoke-show-review-models — aerospace consultation, delivered examples, CTA',
      },
    ],
  },
  {
    label: 'ATS at a Glance',
    pages: [
      { id: 'ats', label: 'ATS Overview', description: '/ats' },
      { id: 'team', label: 'Team', description: '/team' },
      { id: 'news', label: 'News', description: '/news' },
      { id: 'partners', label: 'Partners', description: '/partners' },
    ],
  },
]

export const ALL_PAGE_IDS = PAGE_GROUPS.flatMap((g) => g.pages.map((p) => p.id))

export function getPageMeta(pageId) {
  for (const group of PAGE_GROUPS) {
    const page = group.pages.find((p) => p.id === pageId)
    if (page) return { ...page, group: group.label }
  }
  return { id: pageId, label: pageId, description: '' }
}
