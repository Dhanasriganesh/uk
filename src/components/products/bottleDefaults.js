import b1 from '../../assets/b1.jpg'
import b2 from '../../assets/b2.jpg'
import b3 from '../../assets/b3.jpg'
import b4 from '../../assets/b4.jpg'
import b5 from '../../assets/b5.jpg'
import b6 from '../../assets/b6.jpg'
import b7 from '../../assets/b7.jpg'
import b8 from '../../assets/b8.jpg'
import b9 from '../../assets/b9.jpg'
import sys from '../../assets/sys.jpg'
import bott from '../../assets/bott.jpg'

export const BOTTLE_GALLERY = [b1, b2, b3, b4, b5, b6, b7, b8, b9]

export const BOTTLE_DEFAULTS = {
  hero: {
    eyebrow: 'PRODUCT RANGE',
    title: 'Bottle Unscramblers for Reliable',
    titleHighlight: 'Production Flow',
    intro:
      'Our bottle unscramblers are designed for seamless integration into your production line, ensuring bottles are correctly oriented and fed for downstream processes. Engineered for efficiency, flexibility, and minimal operator intervention.',
    bullets: [
      'High-speed bottle orientation and feeding',
      'Handles a wide range of bottle shapes and sizes',
      'Tool-less changeover for rapid format changes',
      'Robust stainless steel construction',
    ],
  },
  featureCards: [
    {
      title: 'System Types',
      items: [
        'Vibratory Bowl Sorting — up to 50 upm',
        'Step Feeding Sorting — up to 80 upm with seamless change-over',
        'Cavity / Centrifugal Sorting — up to 240 bpm for dedicated production',
      ],
      linkLabel: 'View system types',
      icon: 'gears',
    },
    {
      title: 'Bottle Formats',
      items: [
        'Ophthalmic containers',
        'Plastic tubes for the cosmetic industry',
        'Personal care & hygienic containers',
        'Agro-Chem & Petro-Chem sector containers',
        'Flexible bag & pouch sorting systems',
      ],
      linkLabel: 'View bottle formats',
      icon: 'formats',
    },
    {
      title: 'Supporting Solutions',
      items: [
        'Vacuum conveyor systems for unstable bottles',
        'SMED change-over in under 10 minutes',
        'Full transfer support between unscrambler and next operation',
      ],
      linkLabel: 'View solutions',
      icon: 'conveyor',
    },
  ],
  sections: [
    {
      eyebrow: 'SYSTEM TYPES',
      title: 'Sorting & Unscrambling Systems',
      body: 'We offer a range of unscrambling technologies to match your output speed, bottle geometry, and changeover requirements — from low-speed vibratory bowls to high-speed centrifugal systems.',
      bullets: [
        'Vibratory Bowl Sorting Machines — for low output speeds up to 50 upm.',
        'Step Feeding Sorting Machines — for medium output speeds up to 80 upm with seamless product change-over.',
        'Cavity / Centrifugal Sorting Unscrambling Machines — for higher output & dedicated production needs with speeds up to 240 bpm.',
      ],
      footer: 'Each system is built for reliable orientation, gentle handling, and integration with your existing line equipment.',
      imageUrl: sys,
      exploreLabel: 'Explore system types',
    },
    {
      eyebrow: 'BOTTLE FORMATS',
      title: 'Versatile Bottle Handling',
      body: 'Our unscramblers handle diverse container types across cosmetics, personal care, pharmaceutical, and industrial sectors — with change parts designed for rapid format switching.',
      bullets: [
        'Ophthalmic containers',
        'Plastic tubes for the cosmetic industry',
        'Personal care products',
        'Hygienic containers',
        'Containers for the Agro-Chem & Petro-Chem sector',
        'Flexible bag & pouch sorting systems',
      ],
      footer: 'Talk to our team about your container geometry and we will recommend the right unscrambling solution.',
      imageUrl: bott,
      exploreLabel: 'Explore bottle formats',
    },
  ],
  highlights: [
    { label: 'UP TO 240 BPM', icon: 'gauge' },
    { label: 'SMED Under 10 Min', icon: 'target' },
    { label: 'UK Manufactured', icon: 'uk' },
    { label: 'BESPOKE Integration', icon: 'puzzle' },
  ],
  ctaSection: {
    title: 'Need More Information?',
    description: 'Download our product brochure or speak to our team about your bottle unscrambling requirements.',
  },
  cta: {
    brochureUrl: '/media/pdf_1718978495.pdf',
    brochureLabel: 'Download Brochure',
    enquireLabel: 'Enquire about this Product',
    enquireLink: '/contact',
  },
  defaultBrochureUrl: '/media/pdf_1718978495.pdf',
}
