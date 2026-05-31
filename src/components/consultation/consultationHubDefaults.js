import {
  LuArrowRight,
  LuClipboardList,
  LuCog,
  LuRefreshCw,
  LuCompass,
} from 'react-icons/lu'

export const CONSULTATION_SERVICES = [
  {
    title: 'Project Management',
    description: 'Professional, seamless project execution and coordination.',
    path: '/project-management',
    icon: LuClipboardList,
  },
  {
    title: 'Project Planning',
    description: 'Innovation and foresight in advanced machinery design.',
    path: '/project-planning',
    icon: LuCompass,
  },
  {
    title: 'Turnkey Automation',
    description: 'Swift, robust automation and packaging solutions.',
    path: '/turnkey-automation',
    icon: LuCog,
  },
  {
    title: 'Lifecycle Management',
    description: 'Proactive maintenance and advanced lifecycle solutions.',
    path: '/lifecycle-management',
    icon: LuRefreshCw,
  },
]

export const CONSULTATION_HUB_DEFAULTS = {
  eyebrow: 'CONSULTATION',
  title: 'Consultation & Solutions',
  titleHighlight: 'Hub',
  intro:
    'Explore our professional consultation services designed to support your packaging and automation projects from concept to completion.',
  ctaSection: {
    title: 'Ready to Start Your Project?',
    description:
      'Speak to our team about your requirements and discover how ATS can support you from planning through to lifecycle management.',
  },
  cta: {
    enquireLabel: 'Connect with Us',
    enquireLink: '/contact',
  },
}
