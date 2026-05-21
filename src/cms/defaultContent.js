import atsVideo from '../assets/ats-uk.mp4'
import logo from '../assets/logo.png'

/** Global site settings */
export const defaultSettings = {
  siteName: 'ATS Packaging',
  logoUrl: logo,
  footer: {
    companyDescription:
      'Advanced Tooling Systems UK Ltd. Over 35 years of experience in advanced packaging machinery for a wide range of industries.',
    address: 'Unit 1, 2-4 Beddow Way, Aylesford, Kent, ME20 7BT, UK',
    phone: '+44 1622 678143',
    email: 'sales@atsuk.com',
    copyrightName: 'ATS Advanced Tooling Systems UK Ltd',
    socialLinks: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/ats-packaging/' },
      { name: 'YouTube', url: 'https://www.youtube.com/@ATSPackaging-AdvancedToolingSystemsUKLtd' },
    ],
    legalLinks: [
      { name: 'Privacy Policy', url: '#' },
      { name: 'Terms & Conditions', url: '#' },
      { name: 'Cookie Policy', url: '#' },
    ],
  },
  contact: {
    heroTitle: 'Contact ATS',
    heroSubtitle:
      'Have a question about our packaging solutions, machinery, or services? Get in touch with our team and we\'ll be happy to assist you.',
    phone: '+44 1622 678143',
    email: 'sales@atsuk.com',
    address: 'Unit 1, 2-4 Beddow Way, Aylesford, Kent, ME20 7BT, UK',
    businessHours: 'Mon - Fri: 8:30 AM - 5:30 PM',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.0!2d0.480!3d51.301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDE4JzAzLjYiTiAwwrAyOCc0OC4wIkU!5e0!3m2!1sen!2suk!4v1',
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
    videoUrl: atsVideo,
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
  title: 'Why Choose ATS Packaging?',
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
  brands: [
    { name: 'Henkel', logoUrl: '' },
    { name: 'Unilever', logoUrl: '' },
    { name: 'P&G', logoUrl: '' },
    { name: 'Nestle', logoUrl: '' },
    { name: 'Mondelez', logoUrl: '' },
    { name: 'Bayer', logoUrl: '' },
    { name: 'Frosch', logoUrl: '' },
    { name: 'Reckitt Benckiser', logoUrl: '' },
    { name: 'PepsiCo', logoUrl: '' },
    { name: 'Coca-Cola', logoUrl: '' },
    { name: 'Compo', logoUrl: '' },
  ],
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
  pageTitle: 'About Us',
  companyName: 'Advanced Tooling Systems UK Ltd',
  paragraphs: [
    'Advanced Tooling Systems UK Ltd is a privately owned company originally formed in 1979 with the Advanced Tooling Systems Group created in 2002. Our name is one of pedigree and reliability and we have 3-manufacturing facilities in the South East of England with satellite design, service and support facilities in the North of England and Asia.',
    "With a global footprint of end users including some of the world's largest manufacturers, our Packaging Machinery range of equipment is used throughout the packaging industry including the FMCG, Cosmetic, Pharmaceutical, Food & Beverage, Chemical and Automotive sectors. Together with a trusted network of partners we are able to deliver turnkey packaging lines into reality with 'best in class' after-sales service and support.",
    "Our extensive and 'award winning' manufacturing capabilities include CAD / CAM, CNC machinery, pattern making, mould tool manufacture, sheet metal fabrication, 3D-design, control system design and machine control software.",
  ],
}

export const defaultContact = {
  heroTitle: 'Contact ATS',
  heroSubtitle:
    'Have a question about our packaging solutions, machinery, or services? Get in touch with our team.',
  contactCards: [
    { icon: '📍', title: 'Head Office', details: 'Unit 1, 2-4 Beddow Way, Aylesford, Kent, ME20 7BT, UK', description: 'Our main headquarters and manufacturing facility.' },
    { icon: '📞', title: 'Call Us', details: '+44 1622 678143', description: 'Speak directly with our team for sales, support, or service.' },
    { icon: '✉️', title: 'Email Us', details: 'sales@atsuk.com', description: 'Send us your enquiry and our team will respond promptly.' },
    { icon: '⏰', title: 'Business Hours', details: 'Mon - Fri: 8:30 AM - 5:30 PM', description: "We're available during these hours for consultations and support." },
  ],
  formSuccessMessage: 'Thank you for contacting ATS! We will get back to you soon.',
  faq: [
    { question: 'What industries do you serve?', answer: 'We serve FMCG, Cosmetic, Pharmaceutical, Food & Beverage, Chemical, Automotive, and more.' },
    { question: 'How can I request a quote?', answer: 'Fill out the contact form or call us directly. Our team will respond promptly.' },
    { question: 'Where are your facilities located?', answer: 'We have 3 manufacturing facilities in the South East of England with satellite support in the North of England and Asia.' },
  ],
}

export const defaultProducts = {
  pageTitle: 'Products',
  slides: [
    { title: 'Capping Machines', link: '/capping', imageUrl: '' },
    { title: 'Bottle Unscramblers', link: '/bottle', imageUrl: '' },
    { title: 'Pump & Trigger Feeding Systems', link: '/pump', imageUrl: '' },
    { title: 'Turnkey Filling Lines', link: '/turnkey', imageUrl: '' },
    { title: 'Bespoke Packaging Solutions', link: '/bespoke', imageUrl: '' },
    { title: 'Food & Beverage Lines (FBL)', link: '/foodbeverage', imageUrl: '' },
  ],
  galleryImageUrls: [],
}

export const defaultConsultation = {
  title: 'Consultation & Solutions Hub',
  intro: 'Explore our professional consultation services designed to support your packaging and automation projects from concept to completion.',
  services: [
    { title: 'Project Management', description: 'Professional, seamless project execution and coordination.', path: '/project-management' },
    { title: 'Project Planning', description: 'Innovation and foresight in advanced machinery design.', path: '/project-planning' },
    { title: 'Turnkey Automation', description: 'Swift, robust automation and packaging solutions.', path: '/turnkey-automation' },
    { title: 'Lifecycle Management', description: 'Proactive maintenance and advanced lifecycle solutions.', path: '/lifecycle-management' },
  ],
}

export const defaultSectors = {
  title: 'Sectors',
  intro: 'We deliver advanced packaging machinery solutions tailored to diverse industries worldwide.',
  sectors: [
    { name: 'Pharmaceutical & Cosmetic', solutions: ['Ophthalmic Container & Tube Unscramblers', 'Sterile Feeding Systems', 'Nasal & Mouth Spray Stopper Assembly Systems', 'Lipstick & Mascara Feeding & Assembly Systems', 'Syringe Sorting Systems', "Advanced 'Track & Trace' Cap Tightening Systems", '(Produced to FDA, CGMP, CE, UL & Ex standards)'] },
    { name: 'Automotive', solutions: ['Engine Oil & Brake Fluid Filling Line Solutions', 'Adblue Filling Line Solutions', 'Car Cleaning Products', 'Bottle Unscramblers', 'Cap Sorting & Feeding Systems', 'Dispensing Pump & Spray Trigger Feeding Systems'] },
    { name: 'Food & Beverage', solutions: ['Sauce Filling Line Solutions', 'Coffee Capsule Feeding Systems', 'Vegetable Oil Filling Lines', 'Micro-Brewery Filling Lines', 'Dispensing Pump & Cap Feeding Systems', 'Container Unscramblers'] },
    { name: 'Medical & Veterinary', solutions: ['Hand Sanitiser Filling Lines', 'Container Unscramblers', 'Sterile Cap Feeding Solutions', 'Vial Feeding Systems', 'Stopper Feeding & Assembly Systems', "Advanced 'Track & Trace' Cap Tightening Solutions"] },
    { name: 'Home Care', solutions: ['Detergent Filling Lines', 'Trigger Spray Assembly', 'Bottle Unscramblers', 'Cap Feeding Systems'] },
    { name: 'Personal Care', solutions: ['Cosmetic Filling Lines', 'Pump Feeding Systems', 'Tube Handling', 'Cap Tightening Solutions'] },
  ],
}

/** Generic product page default — admin can override per product */
export function defaultProductPage(title) {
  return {
    hero: {
      title,
      intro: '',
      bullets: [],
    },
    gallery: [],
    featureCards: [],
    sections: [],
    videos: [],
    cta: {
      brochureUrl: '',
      brochureLabel: 'Download Brochure',
      enquireLabel: 'Enquire Now',
      enquireLink: '/contact',
    },
  }
}

export const defaultCapping = {
  ...defaultProductPage('Capping Machines'),
  hero: {
    title: 'Capping Machines',
    intro: 'Discover our advanced capping machines, engineered for precision, speed, and reliability. From linear to rotary systems, our solutions ensure secure, consistent closures for a wide range of products and industries.',
    bullets: [
      'High-speed, high-precision capping',
      'Supports screw, press-on, and specialty caps',
      'Easy changeover and minimal downtime',
      'Customizable for your production needs',
    ],
  },
  featureCards: [
    { title: 'Unique Systems', items: ['Single Spindle Capping Machine', 'Linear Capping Machine', 'Rotary Capping Machine'] },
    { title: 'Closure Applications', items: ['Screw-on Caps', 'Press-on Caps', 'ROPP Caps', 'Dispensing Pumps', 'Spray Triggers', 'Ultrasonic Welded Caps'] },
    { title: 'Tightening Technology', items: ['Friction, Magnetic, Hysteresis Clutch', 'Servo-controlled Tightening', 'Torque Sensor Tightening'] },
  ],
  sections: [
    {
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
    },
    {
      title: 'Linear Capping Machines',
      body: 'Our linear capping machines are ideal for lower to medium speed applications with flexible configuration options.',
      bullets: [],
      footer: '',
      videoUrl: '/videos/ATS Liner Capping Machine with Automatic Rejection System _ ATS UK Ltd.mp4',
    },
  ],
}

export const defaultTeam = {
  title: 'Our Team',
  intro: 'Meet the experienced professionals behind ATS Packaging.',
  members: [
    { name: 'Richard Aitchison', title: 'Technical Sales', imageUrl: '' },
    { name: 'Adrian Gander', title: 'Group MD', imageUrl: '' },
    { name: 'Rob Ward', title: 'Project Engineering', imageUrl: '' },
    { name: 'Dominic Cust', title: 'Projects & Service', imageUrl: '' },
  ],
}

export const defaultNews = {
  title: 'News',
  intro: 'Stay up to date with the latest developments, achievements, and updates from Advanced Tooling Systems UK Ltd.',
  articles: [
    { title: 'News 1', imageUrl: '', date: '', excerpt: '' },
    { title: 'News 2', imageUrl: '', date: '', excerpt: '' },
  ],
}

export const defaultPartners = {
  title: 'Our Partners',
  partners: Array.from({ length: 9 }, (_, i) => ({ name: `Partner ${i + 1}`, logoUrl: '' })),
}

export const defaultAts = {
  mission: {
    title: 'Our Mission',
    body: 'To deliver world-class packaging machinery and engineering solutions with innovation, reliability, and customer focus.',
    tagline: 'Worldwide around the clock.',
    carouselImageUrls: [],
  },
  competence: {
    title: 'Our Competence',
    imageUrl: '',
    cards: [
      { title: 'State-of-the-art Technology', description: 'Advanced engineering and manufacturing capabilities.' },
      { title: 'Customer Focus', description: 'Dedicated support and tailored solutions for every client.' },
    ],
  },
  hero: {
    title: 'Where Excellence meets Innovation',
    body: 'Advanced Tooling Systems UK Ltd combines decades of experience with cutting-edge technology.',
    imageUrl: '',
  },
  culture: {
    title: 'Corporate Culture',
    values: [
      { title: 'Pragmatic', description: 'Practical solutions that work in real production environments.' },
      { title: 'Passionate', description: 'Dedicated to excellence in every project we undertake.' },
      { title: 'Innovative', description: 'Continuous improvement and forward-thinking engineering.' },
      { title: 'Excellence', description: 'Quality without compromise in design and delivery.' },
    ],
  },
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
  bottle: defaultProductPage('Bottle Unscramblers'),
  pump: defaultProductPage('Pump & Trigger Feeding Systems'),
  turnkey: defaultProductPage('Turnkey Filling Lines'),
  bespoke: defaultProductPage('Bespoke Packaging Solutions'),
  foodbeverage: defaultProductPage('Food & Beverage Lines (FBL)'),
  'project-management': {
    eyebrow: 'PROJECT MANAGEMENT',
    title: 'PROFESSIONALISM IN EVERY STEP',
    summary: 'For us, Professional, Seamless Project Management is Our Signature Move. Once your order is received, our project manager will spearhead the task of processing your project and fulfilling contractual obligations.',
    heroImageUrl: '',
    tasks: [
      { title: 'Keeping You Informed', desc: 'Regularly sharing updates and progress to keep you in the loop.' },
      { title: 'Clarifying Requirements', desc: 'Clarifying commercial and technical aspects for new project requirements.' },
      { title: 'Internal Coordination', desc: 'Coordinating different departments internally for seamless execution.' },
      { title: 'Risk Management', desc: 'Assessing and managing risks to ensure project stability.' },
      { title: 'Decision Making', desc: 'Making decisions if there are any deviations from the plan.' },
      { title: 'Quality Assurance', desc: 'Rigorous quality gate process at every milestone.' },
    ],
    highlights: [
      { title: 'Seamless Coordination', desc: 'Cross-functional teams working in sync.' },
      { title: 'Transparency & Flexibility', desc: 'Open communication throughout the project lifecycle.' },
      { title: 'Quality at Every Step', desc: 'Exacting standards from design to delivery.' },
    ],
  },
  'project-planning': {
    eyebrow: 'PROJECT PLANNING',
    title: 'INNOVATION STARTS WITH FORESIGHT',
    intro: 'Strategic planning ensures your packaging line meets current and future production goals.',
    heroImageUrl: '',
    steps: [],
    blueprintSections: [],
  },
  'turnkey-automation': {
    eyebrow: 'TURNKEY AUTOMATION',
    title: 'A Backbone for Your Plant',
    summary: 'Complete automation solutions from bottle unscrambling to palletising.',
    heroImageUrl: '',
    competencies: [],
  },
  'lifecycle-management': {
    eyebrow: 'LIFECYCLE MANAGEMENT',
    title: 'PROACTIVE, STRATEGIC, COMPREHENSIVE',
    summary: 'End-to-end support for your equipment throughout its operational life.',
    heroImageUrl: '',
    cards: [],
  },
  ats: defaultAts,
  team: defaultTeam,
  news: defaultNews,
  partners: defaultPartners,
}

export function getDefaultContent(pageId) {
  return PAGE_DEFAULTS[pageId] ? structuredClone(PAGE_DEFAULTS[pageId]) : {}
}
