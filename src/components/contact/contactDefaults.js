export const ATS_HEAD_OFFICE_ADDRESS =
  'Mfd House, Parkwood Industrial Estate, Coldred Road, Maidstone, Kent, ME15 9XX, UK'

export const ATS_BUSINESS_HOURS = 'Mon - Thu: 8:30 AM - 5:30 PM, Fri: 8:30 AM - 3:00 PM'

export const ATS_MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Mfd+House,+Coldred+Road,+Parkwood+Industrial+Estate,+Maidstone,+ME15+9XX,+UK&hl=en&z=15&output=embed'

export const CONTACT_CARD_DEFAULTS = [
  {
    icon: '📍',
    title: 'Head Office',
    details: ATS_HEAD_OFFICE_ADDRESS,
    description: 'Our Maidstone headquarters at Parkwood Industrial Estate.',
  },
  {
    icon: '📞',
    title: 'Call Us',
    details: '+44 1622 678143',
    description: 'Speak directly with our team for sales, support, or service.',
  },
  {
    icon: '✉️',
    title: 'Email Us',
    details: 'sales@atsuk.com',
    description: 'Send us your enquiry and our team will respond promptly.',
  },
  {
    icon: '⏰',
    title: 'Business Hours',
    details: ATS_BUSINESS_HOURS,
    description: 'Friday closing time is 3:00 PM. We are closed at weekends.',
  },
]

export const CONTACT_ENQUIRY_TYPES = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
  { value: 'service', label: 'Service' },
  { value: 'partnership', label: 'Partnership' },
]

export const CONTACT_FAQ_DEFAULTS = [
  {
    question: 'What industries do you serve?',
    answer:
      'We serve FMCG, Cosmetic, Pharmaceutical, Food & Beverage, Chemical, Automotive, and more.',
  },
  {
    question: 'How can I request a quote?',
    answer: 'Fill out the contact form or call us directly. Our team will respond promptly.',
  },
  {
    question: 'Where are your facilities located?',
    answer:
      'We have manufacturing facilities in Maidstone and Folkestone, Kent, with satellite design, service, and support in the North of England and Asia.',
  },
]

export const CONTACT_HUB_DEFAULTS = {
  eyebrow: 'GET IN TOUCH',
  pageTitle: 'Contact',
  pageTitleHighlight: 'ATS',
  intro:
    'Have a question about our engineering, tooling, automation, or consultation services? Get in touch with our team and we will be happy to assist you.',
  cardsSectionTitle: 'How Can We Help You?',
  formSectionTitle: 'Send Us an Enquiry',
  formSubmitLabel: 'Send Enquiry',
  formSuccessMessage: 'Thank you for contacting ATS! We will get back to you soon.',
  mapEmbedUrl: ATS_MAP_EMBED_URL,
  quickContactTitle: 'Quick Contact',
  socialSectionTitle: 'Connect With Us',
  faqSectionTitle: 'Frequently Asked Questions',
}

const STALE_ADDRESS_MARKERS = ['Beddow Way', 'Aylesford', 'ME20 7BT']

function isStaleAddress(value) {
  const text = value?.trim() || ''
  return STALE_ADDRESS_MARKERS.some((marker) => text.includes(marker))
}

function resolveContactDetail(index, cardDetail, settingDetail, defaultDetail) {
  const trimmed = cardDetail?.trim()
  if (index === 0 && trimmed && isStaleAddress(trimmed)) {
    return settingDetail?.trim() && !isStaleAddress(settingDetail)
      ? settingDetail.trim()
      : defaultDetail
  }
  if (index === 3 && trimmed && trimmed.includes('Mon - Fri: 8:30 AM - 5:30 PM')) {
    return settingDetail?.trim() || defaultDetail
  }
  return trimmed || settingDetail?.trim() || defaultDetail
}

export function resolveSiteAddress(settings = {}) {
  const addr = settings.contact?.address || settings.footer?.address
  if (addr?.trim() && !isStaleAddress(addr)) return addr.trim()
  return ATS_HEAD_OFFICE_ADDRESS
}

export function mergeContactCards(cmsCards, settings = {}) {
  const settingDetails = [
    resolveSiteAddress(settings),
    settings.contact?.phone || settings.footer?.phone,
    settings.contact?.email || settings.footer?.email,
    settings.contact?.businessHours || ATS_BUSINESS_HOURS,
  ]

  return CONTACT_CARD_DEFAULTS.map((def, i) => {
    const card = cmsCards?.[i] || {}
    return {
      icon: card.icon || def.icon,
      title: card.title || def.title,
      details: resolveContactDetail(i, card.details, settingDetails[i], def.details),
      description: card.description || def.description,
    }
  })
}

export function mergeEnquiryTypes(cmsTypes) {
  return CONTACT_ENQUIRY_TYPES.map((def, i) => {
    const item = cmsTypes?.[i] || {}
    return {
      value: item.value || def.value,
      label: item.label || def.label,
    }
  })
}

export function mergeFaq(cmsFaq) {
  return CONTACT_FAQ_DEFAULTS.map((def, i) => {
    const item = cmsFaq?.[i] || {}
    return {
      question: item.question || def.question,
      answer: item.answer || def.answer,
    }
  })
}
