import { SERVICES } from '../../cms/servicesRegistry'

/** Default main navigation — seeded into CMS and used as fallback on the live site. */
export function buildDefaultNavLinks() {
  return [
    { name: 'Home', path: '/' },
    {
      name: 'ATS at a Glance',
      path: '/about',
      dropdown: [
        { name: 'ATS', path: '/ats' },
        { name: 'Team', path: '/team' },
        { name: 'Partners', path: '/partners' },
        { name: 'News', path: '/news' },
      ],
    },
    {
      name: 'Services',
      path: '/services',
      dropdown: SERVICES.map((service) => ({
        name: service.shortTitle,
        path: service.path,
      })),
    },
    {
      name: 'Consultation',
      path: '/consultation',
      dropdown: [
        { name: 'Project Management', path: '/project-management' },
        { name: 'Project Planning', path: '/project-planning' },
        { name: 'Lifecycle Management', path: '/lifecycle-management' },
        { name: 'Turn-key Automation', path: '/turnkey-automation' },
        { name: 'Bespoke Show and Review Models', path: '/bespoke-show-review-models' },
      ],
    },
    { name: 'Sectors', path: '/sectors' },
    { name: 'Contact', path: '/contact' },
  ]
}

export const DEFAULT_NAV_LINKS = buildDefaultNavLinks()

function mergeDropdown(defaultDropdown, remoteDropdown) {
  if (!defaultDropdown?.length) return remoteDropdown || []
  const remoteList = Array.isArray(remoteDropdown) ? remoteDropdown : []
  const merged = defaultDropdown.map((def, i) => ({
    ...def,
    ...(remoteList[i] || {}),
  }))
  if (remoteList.length > defaultDropdown.length) {
    merged.push(...remoteList.slice(defaultDropdown.length))
  }
  return merged
}

export function mergeNavLinks(cmsNavLinks) {
  return DEFAULT_NAV_LINKS.map((def, i) => {
    const link = cmsNavLinks?.[i] || {}
    return {
      name: link.name || def.name,
      path: link.path || def.path,
      dropdown: link.dropdown?.length
        ? mergeDropdown(def.dropdown, link.dropdown)
        : def.dropdown,
    }
  })
}
