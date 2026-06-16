import { SERVICES } from '../../cms/servicesRegistry'
import { getServicePageDefault } from '../../cms/serviceDefaultsContent'

export const SERVICE_SLIDES = SERVICES.map((service) => ({
  title: service.title,
  description: service.description,
  link: service.path,
  imageUrl: service.imageUrl,
}))

export const SERVICES_HUB_DEFAULTS = {
  eyebrow: 'SERVICES',
  pageTitle: 'Typical Services to',
  pageTitleHighlight: 'our Industry',
  intro:
    'Explore the engineering services ATS UK delivers across automotive, aerospace, packaging, and industrial sectors — from laminating and assembly equipment to inspection fixtures, foundry patterns, and injection moulding.',
  ctaSection: {
    title: 'Ready to Discuss Your Project?',
    description:
      'Speak to our team about your requirements and discover how ATS UK can deliver the right engineering solution for your application.',
  },
  cta: {
    enquireLabel: 'Connect with Us',
    enquireLink: '/contact',
  },
}

export function getServiceLocalDefaults(serviceId) {
  const cmsDefaults = getServicePageDefault(serviceId)
  if (!cmsDefaults) return {}

  return {
    hero: cmsDefaults.hero,
    featureCards: cmsDefaults.featureCards,
    sections: cmsDefaults.sections,
    highlights: cmsDefaults.highlights,
    ctaSection: cmsDefaults.ctaSection,
    cta: cmsDefaults.cta,
    defaultBrochureUrl: '/media/pdf_1718978495.pdf',
  }
}

export function getServiceGallery(serviceId) {
  const service = SERVICES.find((s) => s.id === serviceId)
  return service?.imageUrl ? [service.imageUrl] : []
}
