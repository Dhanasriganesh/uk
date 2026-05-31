import turnkey1 from '../../assets/turnkey1.png'
import turnkey2 from '../../assets/turnkey2.png'
import turnkey3 from '../../assets/turnkey3.png'
import turnkey4 from '../../assets/turnkey4.png'
import turnkey5 from '../../assets/turnkey5.png'
import turnkey6 from '../../assets/turnkey6.png'
import turnkey7 from '../../assets/turnkey7.png'
import turnkey8 from '../../assets/turnkey8.png'
import turnkey9 from '../../assets/turnkey9.png'

export const TURNKEY_GALLERY = [
  turnkey1,
  turnkey2,
  turnkey3,
  turnkey4,
  turnkey5,
  turnkey6,
  turnkey7,
  turnkey8,
  turnkey9,
]

export const TURNKEY_DEFAULTS = {
  hero: {
    eyebrow: 'PRODUCT RANGE',
    title: 'Turnkey Filling Lines for Complete',
    titleHighlight: 'Production Solutions',
    intro:
      'Complete filling line solutions from 10ml to 200-litre with the most diverse range of filling technologies available — from bottle unscramblers to end-of-line palletising. Together with our long-established partners we offer turn-key filling lines for the widest range of products, from highly viscous to foamy formulations.',
    bullets: [
      'Complete lines from 10ml to 200-litre capacity',
      'Most diverse range of filling technologies',
      'Bottle unscramblers through to palletising',
      'Single source for a fully balanced, maximised output line',
    ],
  },
  featureCards: [
    {
      title: 'Filling Technologies',
      items: [
        'Volumetric displacement',
        'Flow-meter for hygienic applications',
        'High accuracy weigh filling',
        'Rotary Gear Pump',
        'Integrated Clean-in-Place systems',
      ],
      linkLabel: 'View technologies',
      icon: 'gears',
    },
    {
      title: 'Machine Types',
      items: [
        'Bench Top systems',
        'Linear Filling machines (up to 12-heads)',
        'Twin-track filling machines (up to 24-heads)',
        'Continuous Move / Walking Beam solutions',
        'High speed rotary (up to 24-heads)',
        'Drum filling (by weight or flow-meter)',
        'Monobloc (clean / fill / cap)',
      ],
      linkLabel: 'View machine types',
      icon: 'formats',
    },
    {
      title: 'Equipment Supplied',
      items: [
        'Bottle Unscramblers & Liquid Filling Machines',
        'Capping Machines & Induction Sealing',
        'Inkjet Coding & Labelling',
        'Cartoning, Case-packing & Palletising',
        'Ex / FDA / CGMP certification available',
      ],
      linkLabel: 'View equipment',
      icon: 'conveyor',
    },
  ],
  sections: [
    {
      eyebrow: 'FILLING TECHNOLOGIES',
      title: 'Advanced Filling Solutions',
      body: 'We offer the most diverse range of filling technologies available — engineered for accuracy, hygiene, and reliability across products from highly viscous to foamy formulations.',
      bullets: [
        'Volumetric displacement',
        'Flow-meter for hygienic applications',
        'High accuracy weigh filling',
        'Rotary Gear Pump',
        'Integrated Clean-in-Place systems',
      ],
      footer: 'All machine types are available with Ex, FDA and CGMP certification where required.',
      imageUrl: turnkey2,
      exploreLabel: 'Explore filling technologies',
    },
    {
      eyebrow: 'COMPLETE LINES',
      title: 'End-to-End Line Integration',
      body: 'A single source option for your complete filling line ensures every stage is fully balanced to maximise output — from container handling through to end-of-line palletising.',
      bullets: [
        'Bottle Unscramblers',
        'Liquid Filling Machines',
        'Capping Machines',
        'Inkjet Coding',
        'Induction Sealing',
        'Labelling',
        'Automatic Cartoning & Carton Sealing Equipment',
        'Case-packing & Palletising Systems',
      ],
      footer: 'Talk to our team about your product, container, and throughput requirements for a tailored turnkey solution.',
      imageUrl: turnkey6,
      exploreLabel: 'Explore complete lines',
    },
  ],
  highlights: [
    { label: '10ml TO 200 LITRE', icon: 'gauge' },
    { label: 'UP TO 24 HEADS', icon: 'target' },
    { label: 'UK Manufactured', icon: 'uk' },
    { label: 'BESPOKE Integration', icon: 'puzzle' },
  ],
  ctaSection: {
    title: 'Need More Information?',
    description: 'Download our product brochure or speak to our team about your turnkey filling line requirements.',
  },
  cta: {
    brochureUrl: '/media/pdf_1718978495.pdf',
    brochureLabel: 'Download Brochure',
    enquireLabel: 'Enquire about this Product',
    enquireLink: '/contact',
  },
  defaultBrochureUrl: '/media/pdf_1718978495.pdf',
}
