import pump1 from '../../assets/pump1.png'
import pump2 from '../../assets/pump2.png'
import pump3 from '../../assets/pump3.png'
import pump4 from '../../assets/pump4.png'
import pump5 from '../../assets/pump5.png'
import pump6 from '../../assets/pump6.png'
import pump7 from '../../assets/pump7.png'
import pump8 from '../../assets/pump8.png'

export const PUMP_GALLERY = [pump1, pump2, pump3, pump4, pump5, pump6, pump7, pump8]

export const PUMP_DEFAULTS = {
  hero: {
    eyebrow: 'PRODUCT RANGE',
    title: 'Pump & Trigger Feeding for Precision',
    titleHighlight: 'High-Speed Production',
    intro:
      'A range of dispensing pump and trigger feeding systems that carefully sort, feed and deliver pumps at up to 300 upm. Our cap, dispensing pump and trigger feeding systems have been designed and developed to provide an unrivalled combination of precision, quality and reliability.',
    bullets: [
      'Sort, feed and deliver at speeds up to 300 upm',
      'Precision handling for caps, pumps and triggers',
      'Multiple system types for low to high output',
      'SMED change-over in under 10 minutes',
    ],
  },
  featureCards: [
    {
      title: 'Feeding System Types',
      items: [
        'Vibratory Bowl Feeding — up to 80 upm',
        'Single Stage Centrifugal — up to 300 upm for caps and dispensing pumps',
        'Double Stage Centrifugal — up to 300 bpm for push-on and screw-on spray triggers',
      ],
      linkLabel: 'View system types',
      icon: 'gears',
    },
    {
      title: 'Closure Types',
      items: [
        'Push-On Caps',
        'Screw-On Caps',
        'ROPP Shells (caps)',
        'Dispensing Pumps',
        'Spray Triggers',
      ],
      linkLabel: 'View closure types',
      icon: 'cap',
    },
    {
      title: 'SMED Change-over',
      items: [
        'Single Minute Exchange of Die principles',
        'All change-parts swapped in under 10 minutes',
        'Minimal fuss with instant return to maximum efficiency',
      ],
      linkLabel: 'View change-over',
      icon: 'wrench',
    },
  ],
  sections: [
    {
      eyebrow: 'FEEDING SYSTEMS',
      title: 'Sorting & Feeding Technologies',
      body: 'We offer a range of feeding technologies to match your output speed and closure type — from low-speed vibratory bowls to high-speed double-stage centrifugal systems for spray triggers.',
      bullets: [
        'Vibratory Bowl Feeding Systems — designed for low output speeds up to 80 upm.',
        'Single stage Centrifugal Feeding Systems — designed for medium to high output speeds up to 300 upm for caps and dispensing pumps.',
        'Double stage Centrifugal Feeding Systems — designed for medium to high output speeds for push-on and screw-on spray triggers at up to 300 bpm.',
      ],
      footer: 'Each system is built for reliable sorting, gentle handling, and seamless integration with your capping or filling line.',
      imageUrl: pump2,
      exploreLabel: 'Explore feeding systems',
    },
    {
      eyebrow: 'SMED CHANGE-OVER',
      title: 'Rapid Format Changeover',
      body: 'Change-over between formats has been simplified by adopting SMED (Single Minute Exchange of Die) principles that allow all change-parts to be changed over quickly with minimal fuss.',
      bullets: [
        'Push-On Caps',
        'Screw-On Caps',
        'ROPP Shells (caps)',
        'Dispensing Pumps',
        'Spray Triggers',
      ],
      footer: 'Instant return to maximum production efficiency — typically in under 10 minutes.',
      imageUrl: pump6,
      exploreLabel: 'Explore closure types',
    },
  ],
  highlights: [
    { label: 'UP TO 300 UPM', icon: 'gauge' },
    { label: 'SMED Under 10 Min', icon: 'target' },
    { label: 'UK Manufactured', icon: 'uk' },
    { label: 'BESPOKE Integration', icon: 'puzzle' },
  ],
  ctaSection: {
    title: 'Need More Information?',
    description: 'Download our product brochure or speak to our team about your pump and trigger feeding requirements.',
  },
  cta: {
    brochureUrl: '/media/pdf_1718978495.pdf',
    brochureLabel: 'Download Brochure',
    enquireLabel: 'Enquire about this Product',
    enquireLink: '/contact',
  },
  defaultBrochureUrl: '/media/pdf_1718978495.pdf',
}
