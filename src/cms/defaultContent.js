import { HERO_VIDEO_URL } from './mediaPaths'
import { DEFAULT_SUPPORTED_CUSTOMERS, DEFAULT_TRUSTED_PARTNERS } from './partnerFallbacks'
/** Global site settings */
export const defaultSettings = {
  siteName: 'ATS Packaging',
  logoUrl: '/media/logo.png',
  footer: {
    tagline: 'PACKAGING & AUTOMATION',
    companyDescription:
      'Advanced Tooling Systems UK Ltd designs and manufactures innovative packaging and automation solutions for global industries.',
    address: 'Mfd House, Parkwood Industrial Estate, Coldred Road, Maidstone, Kent, ME15 9XX, UK',
    phone: '+44 1622 678143',
    email: 'sales@atsuk.com',
    copyrightName: 'Advanced Tooling Systems UK Ltd',
    showMadeInBritain: true,
    linkColumns: [
      {
        title: 'Products',
        links: [
          { name: 'Capping Machines', url: '/capping' },
          { name: 'Bottle Unscramblers', url: '/bottle' },
          { name: 'Pump & Trigger Systems', url: '/pump' },
          { name: 'Turnkey Filling Lines', url: '/turnkey' },
          { name: 'Bespoke Solutions', url: '/bespoke' },
          { name: 'Food & Beverage Lines', url: '/foodbeverage' },
          { name: 'All Products', url: '/products' },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { name: 'Pharmaceutical', url: '/sectors' },
          { name: 'Personal Care', url: '/sectors' },
          { name: 'Home Care', url: '/sectors' },
          { name: 'Automotive', url: '/sectors' },
          { name: 'Food & Beverage', url: '/sectors' },
          { name: 'Medical & Veterinary', url: '/sectors' },
          { name: 'All Sectors', url: '/sectors' },
        ],
      },
      {
        title: 'Company',
        links: [
          { name: 'ATS at a Glance', url: '/about' },
          { name: 'Our Team', url: '/team' },
          { name: 'Partners', url: '/partners' },
          { name: 'News & Insights', url: '/news' },
          { name: 'Consultation', url: '/consultation' },
          { name: 'Contact', url: '/contact' },
        ],
      },
      {
        title: 'Support',
        links: [
          { name: 'Project Management', url: '/project-management' },
          { name: 'Project Planning', url: '/project-planning' },
          { name: 'Lifecycle Management', url: '/lifecycle-management' },
          { name: 'Turnkey Automation', url: '/turnkey-automation' },
          { name: 'Bespoke Show and Review Models', url: '/bespoke-show-review-models' },
          { name: 'Contact Support', url: '/contact' },
        ],
      },
    ],
    highlights: [
      { icon: 'years', title: '35+ Years', subtitle: 'Engineering Excellence' },
      { icon: 'uk', title: 'UK Manufactured', subtitle: 'Built to the Highest Standards' },
      { icon: 'puzzle', title: 'Bespoke Solutions', subtitle: 'Tailored to Your Needs' },
      { icon: 'globe', title: 'Global Support', subtitle: 'Trusted Worldwide' },
    ],
    socialLinks: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/ats-packaging/' },
      { name: 'YouTube', url: 'https://www.youtube.com/@ATSPackaging-AdvancedToolingSystemsUKLtd' },
    ],
    legalLinks: [
      { name: 'Privacy Policy', url: '#' },
      { name: 'Terms & Conditions', url: '#' },
      { name: 'Cookie Policy', url: '#' },
      { name: 'Sitemap', url: '/contact' },
    ],
  },
  contact: {
    heroTitle: 'Contact ATS',
    heroSubtitle:
      'Have a question about our engineering, tooling, automation, or consultation services? Get in touch with our team and we\'ll be happy to assist you.',
    phone: '+44 1622 678143',
    email: 'sales@atsuk.com',
    address: 'Mfd House, Parkwood Industrial Estate, Coldred Road, Maidstone, Kent, ME15 9XX, UK',
    businessHours: 'Mon - Thu: 8:30 AM - 5:30 PM, Fri: 8:30 AM - 3:00 PM',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Mfd+House,+Coldred+Road,+Parkwood+Industrial+Estate,+Maidstone,+ME15+9XX,+UK&hl=en&z=15&output=embed',
  },
}

export const defaultHome = {
  hero: {
    line1: 'Continuous',
    line1Highlight: 'innovation',
    line2: 'from product',
    line2Highlight: 'diversity',
    description:
      'Advanced Tooling Systems UK Ltd offers engineering solutions across multiple and varied business sectors enabling shared innovation and experience.',
    videoUrl: HERO_VIDEO_URL,
    videoAriaLabel: 'Industrial machinery and packaging lines',
  },
}

export const defaultHomeWhatWeDo = {
  eyebrow: 'WHAT WE DO',
  heading: 'Our Services and',
  headingHighlight: 'Business Sectors',
  intro:
    'Explore the varied nature of our business below and see how we can support your industry with precision engineering and innovative solutions.',
  cards: [
    {
      title: 'CAD Design and DFM',
      description:
        'Injection moulding and post mould process DFM and design service to the Automotive and Aerospace industries.',
      imageUrl:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=500&q=80',
      icon: 'cad',
    },
    {
      title: 'Inspection Equipment',
      description:
        'Quality assurance equipment from gap and flush gauges to fully automated, recording surface measurement equipment.',
      imageUrl:
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&h=500&q=80',
      icon: 'inspection',
    },
    {
      title: 'Aerospace Models',
      description:
        'Aircraft interior mock-ups and monuments from spatial models to full scale, show standard fuselage structures.',
      imageUrl:
        'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&h=500&q=80',
      icon: 'aerospace',
    },
    {
      title: 'Automotive Engineering',
      description:
        'A complete package of post mould processing equipment, from Pressure Laminators and Ultrasonic Welders to Punching and Assembly Stations.',
      imageUrl:
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&h=500&q=80',
      icon: 'automotive',
    },
    {
      title: 'Foundry Patterns',
      description:
        'The reverse engineering and recreation of heritage building casting patterns for the building renovation industry.',
      imageUrl:
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&h=500&q=80',
      icon: 'foundry',
    },
    {
      title: 'Injection Moulding',
      description:
        'Plastic injection moulding tools manufactured to all budgets and volumes, maintained in our UK toolroom.',
      imageUrl:
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&h=500&q=80',
      icon: 'moulding',
    },
    {
      title: 'Packaging Solutions',
      description:
        'From capping and filling to robotised packing and palletisation, including pallet wrapping.',
      imageUrl:
        'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&h=500&q=80',
      icon: 'packaging',
    },
    {
      title: 'Machining and Prototyping',
      description:
        'Full support of low volume manufacture including moulding, machining, assembly and painting.',
      imageUrl:
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&h=500&q=80',
      icon: 'machining',
    },
  ],
}

export const defaultHomeWhy = {
  titleLine1: 'Why Choose',
  titleHighlight: 'ATS UK?',
  intro:
    'We combine engineering excellence, innovation, and industry experience to deliver packaging solutions that drive your business forward.',
  features: [
    { label: 'Advanced Machinery', description: 'State-of-the-art capping, filling, and feeding systems for every packaging need.' },
    { label: 'Precision & Reliability', description: 'Engineered for accuracy, uptime, and consistent performance in demanding environments.' },
    { label: 'Turnkey Solutions', description: 'From consultation to installation, we deliver complete, integrated packaging lines.' },
    { label: 'Industry Expertise', description: '35+ years serving food, beverage, pharma, home care, and more.' },
  ],
  promisesTitle: 'Our Commitment to You',
  promises: [
    { label: 'On-Time Delivery', icon: '⏰', description: 'We deliver your packaging solution on schedule, every time.' },
    { label: 'Unmatched Quality', icon: '⭐', description: 'Robust engineering, premium materials, and rigorous testing.' },
    { label: 'Innovation', icon: '💡', description: 'Continuous R&D for smarter, more efficient packaging systems.' },
    { label: 'Customer Focus', icon: '🤝', description: 'Tailored solutions and dedicated support for your business.' },
  ],
}

export const defaultHomeBrands = {
  title: 'Brands',
  /** Logos are sourced from the Partners page “Supported Customers” list. */
}

export const defaultHomeConnect = {
  backgroundImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  title: "Let's Connect",
  subtitle: 'REQUEST A PACKAGING MACHINERY CONSULTATION',
  body: 'With over 35 years of experience, ATS Packaging delivers advanced packaging machinery and automation solutions for a wide range of industries. Fill out the form to request a free consultation with our experts and discover how we can optimize your packaging process.',
  formTitle: 'Submit',
  successMessage: 'Consultation request sent! We will contact you soon.',
}

export const defaultAbout = {
  pageTitleLine1: 'About',
  pageTitleHighlight: 'Us',
  watermarkImageUrl: '',
  companyName: 'Advanced Tooling Systems UK Ltd',
  paragraphs: [
    'Advanced Tooling Systems UK Ltd is a privately owned company originally formed in 1979 with the Advanced Tooling Systems Group created in 2002. Our name is one of pedigree and reliability and we have 3-manufacturing facilities in the South East of England with satellite design, service and support facilities in the North of England and Asia.',
    "With a global footprint of end users including some of the world's largest manufacturers, our Packaging Machinery range of equipment is used throughout the packaging industry including the FMCG, Cosmetic, Pharmaceutical, Food & Beverage, Chemical and Automotive sectors. Together with a trusted network of partners we are able to deliver turnkey packaging lines into reality with 'best in class' after-sales service and support.",
    "Our extensive and 'award winning' manufacturing capabilities include CAD / CAM, CNC machinery, pattern making, mould tool manufacture, sheet metal fabrication, 3D-design, control system design and machine control software.",
  ],
}

export const defaultContact = {
  eyebrow: 'GET IN TOUCH',
  pageTitle: 'Contact',
  pageTitleHighlight: 'ATS',
  intro:
    'Have a question about our engineering, tooling, automation, or consultation services? Get in touch with our team and we will be happy to assist you.',
  cardsSectionTitle: 'How Can We Help You?',
  contactCards: [
    {
      icon: '📍',
      title: 'Head Office',
      details: 'Mfd House, Parkwood Industrial Estate, Coldred Road, Maidstone, Kent, ME15 9XX, UK',
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
      details: 'Mon - Thu: 8:30 AM - 5:30 PM, Fri: 8:30 AM - 3:00 PM',
      description: 'Friday closing time is 3:00 PM. We are closed at weekends.',
    },
  ],
  formSectionTitle: 'Send Us an Enquiry',
  formSubmitLabel: 'Send Enquiry',
  formSuccessMessage: 'Thank you for contacting ATS! We will get back to you soon.',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Mfd+House,+Coldred+Road,+Parkwood+Industrial+Estate,+Maidstone,+ME15+9XX,+UK&hl=en&z=15&output=embed',
  quickContactTitle: 'Quick Contact',
  socialSectionTitle: 'Connect With Us',
  faqSectionTitle: 'Frequently Asked Questions',
  enquiryTypes: [
    { value: 'general', label: 'General Enquiry' },
    { value: 'sales', label: 'Sales' },
    { value: 'support', label: 'Support' },
    { value: 'service', label: 'Service' },
    { value: 'partnership', label: 'Partnership' },
  ],
  faq: [
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
  ],
}

export const defaultProducts = {
  eyebrow: 'PRODUCT RANGE',
  pageTitle: 'Packaging Machinery',
  pageTitleHighlight: 'Solutions',
  intro:
    'Explore our range of packaging machinery and automation solutions — from capping and unscrambling to complete turnkey filling lines.',
  slides: [
    {
      title: 'Capping Machines',
      description:
        'Flexible linear capping and high-speed rotary capping machines for a wide range of applications.',
      link: '/capping',
      imageUrl: '',
    },
    {
      title: 'Bottle Unscramblers',
      description:
        'Versatile machines for sorting and orienting multiple container formats in a single system.',
      link: '/bottle',
      imageUrl: '',
    },
    {
      title: 'Pump & Trigger Feeding Systems',
      description:
        'High-speed systems for sorting, feeding, and delivering pumps and triggers with precision and reliability.',
      link: '/pump',
      imageUrl: '',
    },
    {
      title: 'Turnkey Filling Lines',
      description:
        'Complete filling line solutions from 10ml to 200-litre, including end-to-end automation.',
      link: '/turnkey',
      imageUrl: '',
    },
    {
      title: 'Bespoke Packaging Solutions',
      description:
        'Custom conveyors, product handling, ultrasonic cap welding, assembly systems, and more.',
      link: '/bespoke',
      imageUrl: '',
    },
    {
      title: 'Food & Beverage Lines (FBL)',
      description:
        'Comprehensive food and beverage manufacturing machinery for the UK and Ireland.',
      link: '/foodbeverage',
      imageUrl: '',
    },
  ],
  galleryImageUrls: [],
  ctaSection: {
    title: 'Ready to Optimise Your Packaging?',
    description:
      'Speak to our team about your requirements and discover how ATS can deliver the right solution for your production line.',
  },
  cta: {
    enquireLabel: 'Connect with Us',
    enquireLink: '/contact',
  },
}

export const defaultConsultation = {
  eyebrow: 'CONSULTATION',
  title: 'Consultation & Solutions',
  titleHighlight: 'Hub',
  intro:
    'Explore our professional consultation services — from project management and planning through turnkey automation, lifecycle support, and bespoke aerospace show and review models.',
  services: [
    {
      title: 'Project Management',
      description: 'Professional, seamless project execution and coordination.',
      path: '/project-management',
    },
    {
      title: 'Project Planning',
      description: 'Innovation and foresight in advanced machinery design.',
      path: '/project-planning',
    },
    {
      title: 'Turnkey Automation',
      description: 'Swift, robust automation and packaging solutions.',
      path: '/turnkey-automation',
    },
    {
      title: 'Lifecycle Management',
      description: 'Proactive maintenance and advanced lifecycle solutions.',
      path: '/lifecycle-management',
    },
    {
      title: 'Bespoke Show and Review Models',
      description: 'Aerospace consultation, show models, and interior review structures.',
      path: '/bespoke-show-review-models',
    },
  ],
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

export const defaultSectors = {
  eyebrow: 'INDUSTRIES',
  pageTitle: 'Sectors We',
  pageTitleHighlight: 'Serve',
  intro:
    'We deliver advanced packaging machinery solutions tailored to diverse industries worldwide — from pharmaceutical and automotive to food, medical, and personal care.',
  sectors: [
    {
      name: 'Pharmaceutical & Cosmetic',
      imageUrl: '',
      solutions: [
        'Ophthalmic Container & Tube Unscramblers',
        'Sterile Feeding Systems',
        'Nasal & Mouth Spray Stopper Assembly Systems',
        'Lipstick & Mascara Feeding & Assembly Systems',
        'Syringe Sorting Systems',
        "Advanced 'Track & Trace' Cap Tightening Systems",
        '(Produced to FDA, CGMP, CE, UL & Ex standards)',
      ],
    },
    {
      name: 'Automotive',
      imageUrl: '',
      solutions: [
        'Engine Oil & Brake Fluid Filling Line Solutions',
        'Adblue Filling Line Solutions',
        'Car Cleaning Products',
        'Bottle Unscramblers',
        'Cap Sorting & Feeding Systems',
        'Dispensing Pump & Spray Trigger Feeding Systems',
      ],
    },
    {
      name: 'Food & Beverage',
      imageUrl: '',
      solutions: [
        'Sauce Filling Line Solutions',
        'Coffee Capsule Feeding Systems',
        'Vegetable Oil Filling Lines',
        'Micro-Brewery Filling Lines',
        'Dispensing Pump & Cap Feeding Systems',
        'Container Unscramblers',
      ],
    },
    {
      name: 'Medical & Veterinary',
      imageUrl: '',
      solutions: [
        'Hand Sanitiser Filling Lines',
        'Container Unscramblers',
        'Sterile Cap Feeding Solutions',
        'Vial Feeding Systems',
        'Stopper Feeding & Assembly Systems',
        "Advanced 'Track & Trace' Cap Tightening Solutions",
      ],
    },
    {
      name: 'Home Care',
      imageUrl: '',
      solutions: [
        'Bottle Unscramblers',
        'Capping Machines',
        'Cap Feeding Systems',
        'Dispensing Pump & Spray Trigger Feeding Systems',
        'Turn-key Filling Lines',
        'Disinfectant & Bleach Filling Line Solutions',
      ],
    },
    {
      name: 'Personal Care',
      imageUrl: '',
      solutions: [
        'Bottle Unscramblers',
        'Capping Machines',
        'Cap Feeding Systems',
        'Dispensing Pump & Spray Trigger Feeding Systems',
        'Turn-key Filling Lines',
        'Deodorant & Aerosol Filling Line Solutions',
      ],
    },
  ],
  ctaSection: {
    title: 'Need a Solution for Your Sector?',
    description:
      'Speak to our team about your industry requirements and discover how ATS can deliver the right packaging machinery for your production line.',
  },
  cta: {
    enquireLabel: 'Connect with Us',
    enquireLink: '/contact',
  },
}

/** Generic product page default — admin can override per product */
export function defaultProductPage(title) {
  return {
    hero: {
      eyebrow: 'PRODUCT RANGE',
      title,
      titleHighlight: '',
      intro: '',
      bullets: [],
    },
    gallery: [],
    featureCards: [],
    sections: [],
    highlights: [],
    ctaSection: {
      title: 'Need More Information?',
      description: '',
    },
    cta: {
      brochureUrl: '/media/pdf_1718978495.pdf',
      brochureLabel: 'Download Brochure',
      enquireLabel: 'Enquire about this Product',
      enquireLink: '/contact',
    },
  }
}

export const defaultCapping = {
  ...defaultProductPage('Capping Machines'),
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
  gallery: [],
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
      imageUrl: '',
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
        "Both 'traditional' magnetic clutch and 'advanced servo-controlled' tightening technologies can be used. Maximum output speed depends on the number of capping heads and bottle handling system selected but typically up to 80bpm is easily achievable. Suitable for screw-caps, push-on caps, dispensing pumps, spray triggers and ultrasonic cap welding applications.",
      imageUrl: '',
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
}

export const defaultBottle = {
  ...defaultProductPage('Bottle Unscramblers'),
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
  gallery: [],
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
      imageUrl: '',
      videoUrl: '',
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
      imageUrl: '',
      videoUrl: '',
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
}

export const defaultPump = {
  ...defaultProductPage('Pump & Trigger Feeding Systems'),
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
  gallery: [],
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
      imageUrl: '',
      videoUrl: '',
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
      imageUrl: '',
      videoUrl: '',
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
}

export const defaultTurnkey = {
  ...defaultProductPage('Turnkey Filling Lines'),
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
  gallery: [],
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
      imageUrl: '',
      videoUrl: '',
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
      imageUrl: '',
      videoUrl: '',
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
}

export const defaultBespoke = {
  ...defaultProductPage('Bespoke Packaging Solutions'),
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
  gallery: [],
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
      imageUrl: '',
      videoUrl: '',
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
      imageUrl: '',
      videoUrl: '',
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
}

export const defaultFoodbeverage = {
  ...defaultProductPage('Food & Beverage Lines (FBL)'),
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
  gallery: [],
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
      imageUrl: '',
      videoUrl: '',
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
      imageUrl: '',
      videoUrl: '',
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
}

export const defaultProjectManagement = {
  eyebrow: 'PROJECT MANAGEMENT',
  title: 'Professionalism in',
  titleHighlight: 'Every Step',
  summary:
    'For us, professional, seamless project management is our signature move. Once your order is received, our project manager will spearhead the task of processing your project and fulfilling contractual obligations. Collaborating with a team of designers and engineers, we ensure project completion aligns with both yours and our exacting quality standards, within agreed timelines. We prioritize speed, transparency, and flexibility throughout this process. Through a rigorous quality gate process, our project manager monitors your project and associated milestones.',
  heroImageUrl: '',
  tasksSectionTitle: 'What Our Project Managers Deliver',
  tasks: [
    { title: 'Keeping You Informed', desc: 'Regularly sharing updates and progress to keep you in the loop.' },
    { title: 'Clarifying Requirements', desc: 'Clarifying commercial and technical aspects for new project requirements.' },
    { title: 'Internal Coordination', desc: 'Coordinating different departments internally for seamless execution.' },
    { title: 'Risk Management', desc: 'Assessing and managing risks to ensure project stability.' },
    { title: 'Decision Making', desc: 'Making decisions if there are any deviations from the plan.' },
    { title: 'Quality Assurance', desc: 'Ensuring quality through checks and rigorous standards.' },
    { title: 'Logistics & Scheduling', desc: 'Organizing logistics such as scheduling, validation, and dispatching test materials.' },
    { title: 'Test & Acceptance', desc: 'Supporting and managing tests and system acceptances.' },
    { title: 'System Commissioning', desc: 'Overseeing the commissioning of your system for a smooth start.' },
  ],
  highlights: [
    {
      title: 'Seamless Coordination',
      desc: "Our dedicated project manager ensures seamless coordination and execution from inception to system commissioning, guaranteeing your project's success.",
    },
    {
      title: 'Transparency & Flexibility',
      desc: 'We prioritize speed, transparency, and flexibility, adapting to your needs and keeping you informed at every stage.',
    },
    {
      title: 'Quality at Every Step',
      desc: 'Through a rigorous quality gate process, we monitor your project and associated milestones, ensuring the highest standards are met.',
    },
  ],
  ctaSection: {
    title: 'Ready to Start Your Project?',
    description: 'Speak to our project management team about your packaging or automation requirements.',
  },
  cta: {
    enquireLabel: 'Connect with Us',
    enquireLink: '/contact',
  },
}

export const defaultProjectPlanning = {
  eyebrow: 'PROJECT PLANNING',
  title: 'Innovation Starts with',
  titleHighlight: 'Foresight',
  summary:
    'At ATS, we prioritize efficiency and excellence in every step of the process. Our professionals specialize in crafting customized project plans tailored to your unique goals and requirements — from inception to execution, ensuring alignment with your vision and objectives.',
  heroImageUrl: '',
  stepsSectionTitle: 'Our Project Planning Process',
  steps: [
    { number: '01', title: 'Customer Kick Off Meeting', desc: 'Engage with the client to understand requirements and expectations thoroughly.' },
    { number: '02', title: 'Design and Review', desc: 'Meticulously craft and refine the machine design to meet client specifications and industry standards.' },
    { number: '03', title: 'Procurement and Assembly', desc: 'Source high-quality materials, machine components, and assemble the machine with precision and expertise.' },
    { number: '04', title: 'Testing and Optimization', desc: "Conduct comprehensive trials to ensure the machine's performance and functionality meet or exceed expectations." },
    { number: '05', title: 'Client Approval and Delivery', desc: 'Obtain final client sign-off and deliver the finished machine, ready to enhance their operations.' },
  ],
  highlights: [
    {
      title: 'Crafting Your Blueprint',
      desc: 'We believe that innovation is the key to achieving first-rate products for our customers. Our team is always searching for ways to develop better solutions for our customers.',
    },
    {
      title: 'Tailored Solutions for Your Goals',
      desc: 'Our professionals specialize in crafting customized project plans tailored to your unique goals and requirements. From inception to execution, we prioritize every aspect of your project, ensuring alignment with your vision and objectives.',
    },
    {
      title: 'Driving Efficiency and Maximizing ROI',
      desc: 'Our goal-oriented approach focuses on delivering results that exceed expectations, driving efficiency and maximizing return on investment. By carefully analyzing potential challenges and opportunities, we proactively adapt our plans to keep your project on track.',
    },
    {
      title: 'Precision and Clarity Every Step of the Way',
      desc: 'Using cutting-edge tools and industry-leading practices, we outline project scopes, schedules, and milestones. Our emphasis on clarity and precision ensures that every team member is aligned and equipped to execute their tasks with excellence.',
    },
  ],
  ctaSection: {
    title: 'Ready to Plan Your Project?',
    description: 'Speak to our team about strategic planning for your packaging or automation line.',
  },
  cta: {
    enquireLabel: 'Connect with Us',
    enquireLink: '/contact',
  },
}

export const defaultLifecycleManagement = {
  eyebrow: 'LIFECYCLE MANAGEMENT',
  title: 'Proactive, Strategic,',
  titleHighlight: 'Comprehensive',
  summary:
    'Ensure the longevity and efficiency of your systems with Advanced Tooling Systems expert lifecycle management solutions. We understand that effective lifecycle management is essential for maximizing your return on investment and minimizing disruptions to your operations. Our team takes a proactive approach to maintenance, conducting regular inspections and implementing strategic upgrades to keep your systems operating at their best.',
  heroImageUrl: '',
  tasksSectionTitle: 'Lifecycle Management Solutions',
  tasks: [
    {
      title: 'Proactive Maintenance and Strategic Upgrades',
      desc: 'Our team takes a proactive approach to maintenance, conducting regular inspections and implementing strategic upgrades to keep your systems operating at their best upon request. By staying ahead of potential issues, we help you avoid costly downtime and maintain productivity.',
    },
    {
      title: 'Comprehensive Support from Installation to End-of-Life',
      desc: 'From initial installation to end-of-life planning, we provide comprehensive support and guidance every step of the way. Our team is dedicated to helping you make informed decisions that align with your long-term objectives, ensuring the continued success of your business.',
    },
    {
      title: 'Enhance Resilience with Advanced Lifecycle Solutions',
      desc: 'Sustaining peak performance across your production line. We help you maximize return on investment while minimizing operational disruptions through expert lifecycle planning and support.',
    },
  ],
  highlights: [
    {
      title: 'Sustaining Peak Performance',
      desc: 'Keep your packaging and automation systems running at optimal efficiency throughout their operational life.',
    },
    {
      title: 'Minimizing Disruptions',
      desc: 'Proactive inspections and strategic upgrades help you avoid costly downtime and maintain productivity.',
    },
    {
      title: 'Long-Term Partnership',
      desc: 'From installation through end-of-life planning, we guide informed decisions aligned with your business objectives.',
    },
  ],
  ctaSection: {
    title: 'Ready to Protect Your Investment?',
    description: 'Speak to our team about lifecycle management and maintenance support for your equipment.',
  },
  cta: {
    enquireLabel: 'Connect with Us',
    enquireLink: '/contact',
  },
}

export const defaultBespokeShowReviewModels = {
  eyebrow: 'AEROSPACE CONSULTATION',
  title: 'Bespoke Show &',
  titleHighlight: 'Review Models',
  summary:
    'Advanced Tooling Systems UK provides specialist consultation and manufacture of aerospace show, review, and spatial models. From early design validation through to show-standard interior monuments and full-scale fuselage structures, we support OEMs, tier suppliers, and cabin integrators with models built to exacting visual and dimensional standards.',
  heroImageUrl: '',
  tasksSectionTitle: 'Examples of Delivered Products & Their Uses',
  tasks: [
    {
      title: 'Spatial & Design-Review Models',
      desc: 'Compact and mid-scale models used to evaluate layout, ergonomics, and stakeholder sign-off before tooling commitment.',
    },
    {
      title: 'Aircraft Interior Mock-Ups',
      desc: 'Representative cabin sections for customer demonstrations, sales events, and internal design reviews.',
    },
    {
      title: 'Monuments & Galley/Lavatory Units',
      desc: 'Show-standard monuments produced to match finish, form, and interface requirements for programme reviews.',
    },
    {
      title: 'Full-Scale Fuselage Structures',
      desc: 'Large-format assemblies for integration trials, exhibition display, and programme communication.',
    },
    {
      title: 'Seat & Interior Component Models',
      desc: 'Detailed models supporting comfort studies, certification discussions, and supplier selection.',
    },
    {
      title: 'Engineering Change & Retrofit Models',
      desc: 'Rapid-turn models to assess modifications, retrofits, and product refresh programmes.',
    },
  ],
  highlights: [
    {
      title: 'Aerospace-Focused Consultation',
      desc: 'Dedicated support from concept through delivery, aligned with programme milestones and customer quality requirements.',
    },
    {
      title: 'Cross-Sector Engineering',
      desc: 'Capabilities drawn from decades of precision tooling across aerospace, automotive, and advanced manufacturing.',
    },
    {
      title: 'UK Manufacturing',
      desc: 'Models produced at our South East facilities with project management, inspection, and delivery coordination.',
    },
  ],
  ctaSection: {
    title: 'Discuss Your Aerospace Model Requirements',
    description:
      'Speak to our team about show models, review models, and bespoke interior structures for your programme.',
  },
  cta: {
    enquireLabel: 'Connect with Us',
    enquireLink: '/contact',
  },
}

export const defaultTurnkeyAutomation = {
  eyebrow: 'TURNKEY AUTOMATION',
  title: 'A Backbone for',
  titleHighlight: 'Your Plant',
  summary:
    'ATS offers turnkey automation solutions leveraging industry experience and expertise to deliver swift automation and packaging applications that meet rigorous standards. Our professionals combine diverse packaging experience and technical knowledge with disciplined implementation, providing and securing robust automated solutions across all sectors.',
  heroImageUrl: '',
  tasksSectionTitle: 'Our Turnkey Capabilities',
  tasks: [
    { title: 'Bottle Unscramblers', desc: '' },
    { title: 'Liquid Filling Machines', desc: '' },
    { title: 'Capping Machines', desc: '' },
    { title: 'Inkjet Coding', desc: '' },
    { title: 'Induction Sealing', desc: '' },
    { title: 'Labelling', desc: '' },
    { title: 'Automatic Cartoning & Carton Sealing Equipment', desc: '' },
    { title: 'Case-packing & Palletising Systems', desc: '' },
  ],
  highlights: [
    {
      title: 'Swift Automation Solutions',
      desc: 'Industry experience and expertise deliver automation and packaging applications that meet rigorous standards.',
    },
    {
      title: 'Cross-Sector Expertise',
      desc: 'Diverse packaging experience and technical knowledge applied across all industry sectors.',
    },
    {
      title: 'Disciplined Implementation',
      desc: 'Robust automated solutions secured through structured project delivery from concept to commissioning.',
    },
  ],
  ctaSection: {
    title: 'Ready to Automate Your Line?',
    description: 'Speak to our team about turnkey automation from bottle unscrambling to palletising.',
  },
  cta: {
    enquireLabel: 'Connect with Us',
    enquireLink: '/contact',
  },
}

export const defaultTeam = {
  pageTitleLine1: 'ATS At a',
  pageTitleHighlight: 'Glance',
  sectionHeading: 'Our Senior Management Team',
  intro:
    'Our senior management team brings together extensive experience across engineering, manufacturing, and customer support.\nCommitted to innovation and excellence, they provide strategic leadership across all areas of the business.\nTogether, they ensure Advanced Tooling Systems UK Ltd continues to deliver outstanding results for our clients worldwide.',
  members: [
    { name: 'Adrian Gander', title: 'Group Managing Director', imageUrl: '' },
    { name: 'Rob Ward', title: 'General Manager', imageUrl: '' },
    { name: 'Cara Davidson', title: 'Group Head of Finance', imageUrl: '' },
    { name: 'Matt Kerby', title: 'Technical Sales Manager', imageUrl: '' },
    { name: 'Dominic Cust', title: 'Head of Project Management', imageUrl: '' },
    { name: 'Steve Holt', title: 'Works Manager', imageUrl: '' },
  ],
}

export const defaultNews = {
  pageTitleLine1: 'ATS At a',
  pageTitleHighlight: 'Glance',
  intro: '',
  articles: [
    {
      title: 'Boeing EnCore Clearly Ahead Award',
      date: '',
      imageUrl: '',
      body:
        'It is with great pleasure that we accept the Boeing EnCore Clearly Ahead award after many years of supporting both Boeing and EnCore with some of the largest and most visually impressive projects we\'ve delivered.\n\nHere\'s to many more years, supporting a company that make it so easy to go the extra mile for!\n\nPlease see the link below to our LinkedIn Post:',
      linkedInUrl:
        'https://www.linkedin.com/feed/update/urn:li:activity:7437123987547189248',
      linkedInLabel: 'View on LinkedIn',
    },
  ],
}

export const defaultPartners = {
  pageTitleLine1: 'ATS At a',
  pageTitleHighlight: 'Glance',
  supportedCustomersHeading: 'Supported Customers',
  trustedPartnersHeading: 'Trusted Partners',
  supportedCustomers: DEFAULT_SUPPORTED_CUSTOMERS,
  trustedPartners: DEFAULT_TRUSTED_PARTNERS,
}

export const defaultAts = {
  pageTitleLine1: 'ATS At a',
  pageTitleHighlight: 'Glance',
  leftHeading: 'ATS',
  heroTagline: 'A World Leading Engineering Service Provider',
  heroImageUrl:
    'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=960&h=640&q=80',
  welcomeHeading: 'Welcome to Advanced Tooling Systems UK',
  welcomeParagraphs: [
    'The ATS group was originally founded in 2002 with the goal of becoming a complete solution provider to a wide range of industry sectors.',
    'After over 20 years, ATS has invested heavily in technology, completed a number of acquisitions and have ultimately sought the skilled personnel required to become the leading industry experts in product design, development and manufacturing for both production parts and turn-key processes.',
    'Our increasing range of services, all housed within our 2 manufacturing sites based in Maidstone & Folkestone in Kent, give ATS the unique ability to take on projects from initial concept to delivered, production parts or processes with close management throughout by our team of engineers and project managers.',
    'Adrian Gander – Group MD comments "We recognise the importance of trust in our industry and our ethos has always been to grow relationships with our customers by ensuring they return, thus creating long-term partnerships and opportunities for both parties. Our impressive client base is testament to our success in this goal"',
    'ATS are a ISO9001-2015 quality and standards certified company, committed to customer service and satisfaction',
  ],
  rightTagline: 'A World Leading Engineering Service Provider',
  contactEmail: 'info@atsuk.com',
  rightHeroImageUrl:
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=960&h=560&q=80',
  rightParagraphs: [
    'Projects over the last 20 years in the Aerospace, Automotive, Packaging and Injection Moulding space in both prototype and production guises, have brought in-depth experience and expertise across such a variety of business sectors, giving a competitive edge due to the significant cross-sector initiatives and learning, ensuring project exceeds expectation.',
    'Whether it be producing high quality, individual components to customer drawings, or the design and build of complete production processes and equipment for final, high-volume manufacture, the cross-sector expertise offer the scope for fresh new ideas for manufacture methods, complex engineering solutions and confidence in our products.',
    'This, in turn brings ATS the diversity that is essential to maintaining consistent sales growth and work flow without the fluctuations all too familiar in the alternative, monoculture style of business.',
  ],
  thumbnails: [
    {
      imageUrl:
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=320&h=240&q=80',
      alt: 'Aircraft wing above the clouds',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=320&h=240&q=80',
      alt: 'Automotive interior',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=320&h=240&q=80',
      alt: 'Precision engineering component',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=320&h=240&q=80',
      alt: 'Industrial manufacturing',
    },
  ],
  navCompanyHistory: 'Company History',
  navWhyAts: 'Why ATS UK?',
}

export const PAGE_DEFAULTS = {
  settings: defaultSettings,
  home: defaultHome,
  'home-what-we-do': defaultHomeWhatWeDo,
  'home-why': defaultHomeWhy,
  'home-brands': defaultHomeBrands,
  'home-connect': defaultHomeConnect,
  about: defaultAbout,
  contact: defaultContact,
  products: defaultProducts,
  consultation: defaultConsultation,
  sectors: defaultSectors,
  capping: defaultCapping,
  bottle: defaultBottle,
  pump: defaultPump,
  turnkey: defaultTurnkey,
  bespoke: defaultBespoke,
  foodbeverage: defaultFoodbeverage,
  'project-management': defaultProjectManagement,
  'project-planning': defaultProjectPlanning,
  'turnkey-automation': defaultTurnkeyAutomation,
  'lifecycle-management': defaultLifecycleManagement,
  'bespoke-show-review-models': defaultBespokeShowReviewModels,
  ats: defaultAts,
  team: defaultTeam,
  news: defaultNews,
  partners: defaultPartners,
}

export function getDefaultContent(pageId) {
  return PAGE_DEFAULTS[pageId] ? structuredClone(PAGE_DEFAULTS[pageId]) : {}
}
