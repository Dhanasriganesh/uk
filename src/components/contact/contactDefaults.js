export const CONTACT_CARD_DEFAULTS = [
  {
    icon: '📍',
    title: 'Head Office',
    details: 'Unit 1, 2-4 Beddow Way, Aylesford, Kent, ME20 7BT, UK',
    description: 'Our main headquarters and manufacturing facility.',
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
    details: 'Mon - Fri: 8:30 AM - 5:30 PM',
    description: "We're available during these hours for consultations and support.",
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
      'We have 3 manufacturing facilities in the South East of England with satellite support in the North of England and Asia.',
  },
]

export const CONTACT_HUB_DEFAULTS = {
  eyebrow: 'GET IN TOUCH',
  pageTitle: 'Contact',
  pageTitleHighlight: 'ATS',
  intro:
    'Have a question about our packaging solutions, machinery, or services? Get in touch with our team and we will be happy to assist you.',
  cardsSectionTitle: 'How Can We Help You?',
  formSectionTitle: 'Send Us an Enquiry',
  formSubmitLabel: 'Send Enquiry',
  formSuccessMessage: 'Thank you for contacting ATS! We will get back to you soon.',
  mapEmbedUrl: '',
  quickContactTitle: 'Quick Contact',
  socialSectionTitle: 'Connect With Us',
  faqSectionTitle: 'Frequently Asked Questions',
}

export function mergeContactCards(cmsCards, settings = {}) {
  const settingDetails = [
    settings.contact?.address || settings.footer?.address,
    settings.contact?.phone || settings.footer?.phone,
    settings.contact?.email || settings.footer?.email,
    settings.contact?.businessHours || 'Mon - Fri: 8:30 AM - 5:30 PM',
  ]

  return CONTACT_CARD_DEFAULTS.map((def, i) => {
    const card = cmsCards?.[i] || {}
    return {
      icon: card.icon || def.icon,
      title: card.title || def.title,
      details: card.details?.trim() || settingDetails[i] || def.details,
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
