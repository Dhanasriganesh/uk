import i1 from '../../assets/i1.jpg'
import i3 from '../../assets/i3.png'
import i4 from '../../assets/i4.jpg'
import i5 from '../../assets/i5.jpg'
import i7 from '../../assets/i7.jpg'
import i8 from '../../assets/i8.jpg'
import i9 from '../../assets/i9.jpg'
import i10 from '../../assets/i10.jpg'

export const CAPPING_GALLERY = [i1, i3, i4, i5, i7, i8, i9, i10]

export const CAPPING_DEFAULTS = {
  hero: {
    eyebrow: 'PRODUCT RANGE',
    title: 'Capping Machines for High-Performance',
    titleHighlight: 'Production',
    intro:
      'Discover our advanced capping machines, engineered for precision, speed, and reliability. From linear to rotary systems, our solutions ensure secure, consistent closures for a wide range of products and industries.',
    bullets: [
      'High-speed, high-precision capping',
      'Supports screw, press-on, and specialty caps',
      'Easy changeover and minimal downtime',
      'Customizable for your production needs',
    ],
  },
  featureCards: [
    {
      title: 'Unique Systems',
      items: ['Single Spindle Capping Machine', 'Linear Capping Machine', 'Rotary Capping Machine'],
      linkLabel: 'View systems',
      icon: 'gears',
    },
    {
      title: 'Closure Applications',
      items: ['Screw-on Caps', 'Press-on Caps', 'ROPP Caps', 'Dispensing Pumps', 'Spray Triggers', 'Ultrasonic Welded Caps'],
      linkLabel: 'View applications',
      icon: 'cap',
    },
    {
      title: 'Tightening Technology',
      items: ['Friction, Magnetic, Hysteresis Clutch', 'Servo-controlled Tightening', 'Torque Sensor Tightening'],
      linkLabel: 'View technologies',
      icon: 'wrench',
    },
  ],
  sections: [
    {
      eyebrow: 'ROTARY SYSTEMS',
      title: 'Rotary Capping Machines',
      body: "Our higher speed rotary capping machines can be supplied with up to 10-heads and achieve speeds of up to 240bpm. Both 'traditional' magnetic clutch and 'advanced servo-controlled' tightening technologies can be used.",
      bullets: [
        '(SS) Servo Scroll – provides total scroll feed-worm control should a capping head need to be switched off for any reason.',
        '(ECL) Electronic Cam Lift – provides configurable control on the vertical movement of the capping head.',
        '(DTA) Dip Tube Alignment – provides configurable control on the alignment and insertion of dispensing pump and spray trigger dip tubes.',
        '(STA) Spray Trigger Alignment – provides radial control and alignment of spray trigger devices relative to container orientation.',
      ],
      footer: 'Suitable for screw-caps, push-on caps, dispensing pumps, spray triggers and ultrasonic cap welding applications.',
      videoUrl: '/videos/Rotary Capping Machine with Automatic Rejection System _ ATS UK Ltd.mp4',
      exploreLabel: 'Explore rotary systems',
    },
    {
      eyebrow: 'LINEAR SYSTEMS',
      title: 'Linear Capping Machines',
      body: 'This revolutionary new style of machine removes the need for expensive bottle change-parts and allows the machine to be mounted over an existing conveyor system and moved between production lines.',
      bullets: [
        '(PG) Pneumatic gate feeding',
        '(FS) Feed-worm scroll feeding',
        '(CM) Continuous move / transfer system feeding',
      ],
      footer:
        "Both 'traditional' magnetic clutch and 'advanced servo-controlled' tightening technologies can be used. Maximum output speed depends on the number of capping heads and bottle handling system selected but typically up to 80bpm is easily achievable.",
      videoUrl: '/videos/ATS Liner Capping Machine with Reverse Thread Engagement _ ATS UK Ltd.mp4',
      exploreLabel: 'Explore linear systems',
    },
  ],
  highlights: [
    { label: 'UP TO 240 BPM', icon: 'gauge' },
    { label: 'PRECISE Torque Control', icon: 'target' },
    { label: 'UK Manufactured', icon: 'uk' },
    { label: 'BESPOKE Integration', icon: 'puzzle' },
  ],
  ctaSection: {
    title: 'Need More Information?',
    description: 'Download our product brochure or speak to our team about your capping requirements.',
  },
  cta: {
    brochureUrl: '/media/pdf_1718978495.pdf',
    brochureLabel: 'Download Brochure',
    enquireLabel: 'Enquire about this Product',
    enquireLink: '/contact',
  },
  defaultBrochureUrl: '/media/pdf_1718978495.pdf',
}
