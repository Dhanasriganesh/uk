import food1 from '../../assets/food1.png'
import food2 from '../../assets/food2.png'
import food3 from '../../assets/food3.png'
import food4 from '../../assets/food4.png'
import food5 from '../../assets/food5.png'
import food6 from '../../assets/food6.png'
import food7 from '../../assets/food7.png'
import food8 from '../../assets/food8.png'
import food9 from '../../assets/food9.png'
import food10 from '../../assets/food10.png'

export const FOODBEVERAGE_GALLERY = [
  food1,
  food2,
  food3,
  food4,
  food5,
  food6,
  food7,
  food8,
  food9,
  food10,
]

export const FOODBEVERAGE_DEFAULTS = {
  hero: {
    eyebrow: 'PRODUCT RANGE',
    title: 'Food & Beverage Lines for Complete',
    titleHighlight: 'Production',
    intro:
      'Our Food & Beverage Line equipment is the most complete range of food manufacturing machinery available in the UK and Ireland from a single source supplier. This comprehensive brand of machinery is designed to provide either individual machines or turnkey food and beverage production lines for products packed in glass jars, bottles or metal cans.',
    bullets: [
      'Most complete FBL range from a single UK supplier',
      'Individual machines or full turnkey production lines',
      'Glass jars, bottles and metal cans',
      'Vacuum and piston filling with CIP systems',
    ],
  },
  featureCards: [
    {
      title: 'Infeed & Preparation',
      items: [
        'Depalletiser — automatic unpacking onto the line',
        'Universal Blower — dry or wet jar and bottle cleaning',
      ],
      linkLabel: 'View infeed equipment',
      icon: 'conveyor',
    },
    {
      title: 'Filling & Capping',
      items: [
        'Rotary Filling — vacuum or piston, up to 500 upm with CIP',
        'Linear Filling — piston with scroll feed, up to 100 upm with CIP',
        'Twist Off Capping — TO/PTO lids under vacuum, up to 500 upm',
      ],
      linkLabel: 'View filling & capping',
      icon: 'gears',
    },
    {
      title: 'Post-Processing',
      items: [
        'Pasteuriser & Cooler — tunnel treatment for jars, bottles and cans',
        'Vacuum Detection — verify TO and PTO lids applied correctly',
      ],
      linkLabel: 'View post-processing',
      icon: 'formats',
    },
  ],
  sections: [
    {
      eyebrow: 'FILLING & CAPPING',
      title: 'High-Speed Filling & Capping',
      body: 'From high-speed rotary filling to flexible linear piston systems and twist-off capping — our FBL equipment delivers accuracy, hygiene, and throughput for food and beverage production.',
      bullets: [
        'Rotary Filling Machine — vacuum or piston filling at up to 500 upm with automatic Clean-In-Place systems.',
        'Linear Filling Machine — flexible piston filling with scroll feeding, up to 100 upm with automatic CIP.',
        'Twist Off Capping Machines — automatic linear capping to tighten TO or PTO metallic lids under vacuum by steam injection (optional), up to 500 upm.',
      ],
      footer: 'Engineered for consistent fill accuracy, hygienic operation, and seamless integration across your production line.',
      imageUrl: food3,
      exploreLabel: 'Explore filling & capping',
    },
    {
      eyebrow: 'COMPLETE LINE',
      title: 'End-to-End FBL Equipment',
      body: 'A single source for every stage of food and beverage packaging — from depalletising and container preparation through pasteurisation, cooling, and quality inspection.',
      bullets: [
        'Depalletiser — automatic unpacking of jars, bottles or cans directly onto the production line.',
        'Universal Blower — automatic dry or wet cleaning of glass jars and bottles.',
        'Pasteuriser & Cooler — tunnel pasteuriser for thermic treatment of glass jars, bottles and metal cans.',
        'Vacuum Detection — systems to detect that TO or PTO lids have been applied correctly.',
      ],
      footer: 'Talk to our team about your product, container format, and throughput for a tailored food and beverage line solution.',
      imageUrl: food7,
      exploreLabel: 'Explore complete lines',
    },
  ],
  highlights: [
    { label: 'UP TO 500 UPM', icon: 'gauge' },
    { label: 'CIP Systems', icon: 'target' },
    { label: 'UK Single Source', icon: 'uk' },
    { label: 'BESPOKE Integration', icon: 'puzzle' },
  ],
  ctaSection: {
    title: 'Need More Information?',
    description: 'Download our product brochure or speak to our team about your food and beverage line requirements.',
  },
  cta: {
    brochureUrl: '/media/pdf_1718978495.pdf',
    brochureLabel: 'Download Brochure',
    enquireLabel: 'Enquire about this Product',
    enquireLink: '/contact',
  },
  defaultBrochureUrl: '/media/pdf_1718978495.pdf',
}
