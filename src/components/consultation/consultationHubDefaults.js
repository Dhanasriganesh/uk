import {
  LuArrowRight,
  LuClipboardList,
  LuCog,
  LuRefreshCw,
  LuCompass,
  LuPlane,
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
  {
    title: 'Bespoke Show and Review Models',
    description: 'Aerospace consultation, show models, and interior review structures.',
    path: '/bespoke-show-review-models',
    icon: LuPlane,
  },
]

export const CONSULTATION_HUB_DEFAULTS = {
  eyebrow: 'CONSULTATION',
  title: 'Consultation & Solutions',
  titleHighlight: 'Hub',
  intro:
    'Explore our professional consultation services — from project management and planning through turnkey automation, lifecycle support, and bespoke aerospace show and review models.',
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
