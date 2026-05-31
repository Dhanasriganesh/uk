import be1 from '../../assets/be1.png'
import be2 from '../../assets/be2.png'
import be3 from '../../assets/be3.png'
import be4 from '../../assets/be4.png'
import be5 from '../../assets/be5.png'
import be6 from '../../assets/be6.png'
import be7 from '../../assets/be7.png'
import be8 from '../../assets/be8.png'
import be9 from '../../assets/be9.png'
import be10 from '../../assets/be10.png'
import be11 from '../../assets/be11.png'

export const BESPOKE_GALLERY = [be1, be2, be3, be4, be5, be6, be7, be8, be9, be10, be11]

export const BESPOKE_DEFAULTS = {
  hero: {
    eyebrow: 'PRODUCT RANGE',
    title: 'Bespoke Packaging for Custom',
    titleHighlight: 'Automation Solutions',
    intro:
      'From general conveyors, product feeding and handling, ultrasonic cap welding, vibrator bowls and assembly systems — we design and build bespoke packaging and automation solutions tailored to your production requirements.',
    bullets: [
      'Conveyors, feeding and handling systems',
      'Ultrasonic cap welding and vibrator bowls',
      'Robotics integration — Fanuc, Staubli, Kuka and more',
      'Vision system inspection (VSI) for quality assurance',
    ],
  },
  featureCards: [
    {
      title: 'Automation & Assembly',
      items: [
        'Smart Feeder intelligent feeding and assembly',
        'Collaborative and industrial robotics',
        'Fanuc, Staubli, Adept, Kuka integration',
        'Vision system inspection (VSI) before dispatch',
      ],
      linkLabel: 'View automation',
      icon: 'gears',
    },
    {
      title: 'Packaging Automation',
      items: [
        'Automatic case erecting',
        'Automatic packing and product placement',
        'Automatic case sealing',
        'Automatic palletising',
      ],
      linkLabel: 'View packaging',
      icon: 'conveyor',
    },
    {
      title: 'End-of-Line Systems',
      items: [
        'Case erecting and packing — 18–20 cases per minute',
        'Fixed-format automated case sealing',
        'Robot palletising — up to 18–20 cases per minute',
        'Turnkey solutions from concept to commissioning',
      ],
      linkLabel: 'View end-of-line',
      icon: 'formats',
    },
  ],
  sections: [
    {
      eyebrow: 'AUTOMATION & ASSEMBLY',
      title: 'Smart Feeder & Robotics',
      body: 'Our Smart Feeder product is an intelligent system for the feeding and assembly of a wide range of packaging material products. Robotic control, collaborative or otherwise, is part of our DNA — with an experienced team ready for your next automation or assembly application.',
      bullets: [
        'Smart Feeder for intelligent feeding and assembly',
        'Experience with Fanuc, Staubli, Adept, Kuka and more',
        'Automotive-grade engineering and project delivery',
        'Vision system inspection (VSI) guarantees handled, assembled and checked products',
      ],
      footer: 'We provide turnkey solutions designed to exceed your requirements — from concept through to commissioning and support.',
      imageUrl: be2,
      exploreLabel: 'Explore automation systems',
    },
    {
      eyebrow: 'PACKAGING AUTOMATION',
      title: 'End-of-Line Packaging Solutions',
      body: 'ATS packaging automation revolutionises production efficiency, streamlining processes and ensuring consistent quality — with heightened productivity and reduced labour costs across your packaging operations.',
      bullets: [
        'Automatic case erecting for swift and precise box assembly',
        'Automatic packing for efficient and uniform product placement',
        'Automatic case sealing for secure closure and product protection',
        'Automatic palletising for seamless stacking and loading',
      ],
      footer: 'Case erecting, packing and palletising systems typically achieve 18–20 cases per minute, keeping pace with filling station throughputs.',
      imageUrl: be6,
      exploreLabel: 'Explore packaging automation',
    },
  ],
  highlights: [
    { label: 'SMART FEEDER', icon: 'gauge' },
    { label: 'Robot Integration', icon: 'target' },
    { label: 'UK Manufactured', icon: 'uk' },
    { label: 'BESPOKE Integration', icon: 'puzzle' },
  ],
  ctaSection: {
    title: 'Need More Information?',
    description: 'Download our product brochure or speak to our team about your bespoke packaging and automation requirements.',
  },
  cta: {
    brochureUrl: '/media/pdf_1718978495.pdf',
    brochureLabel: 'Download Brochure',
    enquireLabel: 'Enquire about this Product',
    enquireLink: '/contact',
  },
  defaultBrochureUrl: '/media/pdf_1718978495.pdf',
}
