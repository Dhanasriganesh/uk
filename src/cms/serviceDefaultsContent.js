import { SERVICES } from './servicesRegistry'

function makeServiceDefault(service, { intro, bullets = [], sections = [], highlights = [], featureCards = [] }) {
  return {
    hero: {
      eyebrow: 'SERVICES',
      title: service.title,
      titleHighlight: '',
      intro,
      bullets,
    },
    gallery: [],
    featureCards,
    sections,
    highlights,
    ctaSection: {
      title: 'Discuss Your Requirements',
      description: `Speak to our team about ${service.shortTitle.toLowerCase()} and discover how ATS UK can support your project with engineering expertise and proven delivery.`,
    },
    cta: {
      brochureUrl: '',
      brochureLabel: 'Download Brochure',
      enquireLabel: 'Enquire about this Service',
      enquireLink: '/contact',
    },
  }
}

const SERVICE_CONTENT = {
  'laminating-wrapping': {
    intro:
      'We design and manufacture laminating and wrapping machines for automotive interior applications — delivering consistent finishes, reliable throughput, and equipment tailored to your trim processes.',
    bullets: [
      'Pressure laminators for soft-touch and decorative finishes',
      'Film wrapping systems for interior trim components',
      'Integration with upstream moulding and downstream assembly',
      'Built and supported from our UK facility',
    ],
    sections: [
      {
        eyebrow: 'CASE STUDY',
        title: 'Automotive Interior Trim Laminating',
        body: 'ATS UK has supplied laminating equipment for automotive interior programmes where repeatable film application and surface quality were critical to production sign-off.',
        bullets: [
          'Custom laminator designed around component geometry',
          'Process parameters tuned for material compatibility',
          'Operator-friendly controls with quick changeover',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'Automotive Focus', icon: 'target' },
      { label: 'UK Manufactured', icon: 'uk' },
      { label: 'Bespoke Design', icon: 'puzzle' },
    ],
  },
  'assembly-equipment': {
    intro:
      'From semi-automated workstations to fully automated assembly cells, we deliver equipment that improves repeatability, reduces manual handling, and integrates with your existing production flow.',
    bullets: [
      'Fully and semi-automated assembly stations',
      'Poka-yoke and quality-check integration',
      'Modular designs for future expansion',
      'Commissioning and operator training included',
    ],
    sections: [
      {
        eyebrow: 'PREVIOUS WORK',
        title: 'Post-Mould Assembly Stations',
        body: 'We have delivered assembly equipment for automotive interior suppliers requiring consistent fastening, clipping, and sub-assembly operations at production rates.',
        bullets: [
          'Multi-station assembly lines with sequential operations',
          'Fixture design for component location and access',
          'Safety interlocks and ergonomic workstation layout',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'Flexible Automation', icon: 'gears' },
      { label: 'Quality Built-In', icon: 'target' },
      { label: 'Turnkey Delivery', icon: 'puzzle' },
    ],
  },
  'production-lines-robotics': {
    intro:
      'We engineer complete production lines and robotic solutions — from concept and layout through build, programming, and on-site commissioning.',
    bullets: [
      'Line layout and throughput analysis',
      'Robot integration and end-of-arm tooling',
      'Conveyors, buffering, and material handling',
      'Full FAT, SAT, and production support',
    ],
    sections: [
      {
        eyebrow: 'CASE STUDY',
        title: 'Robotic Handling and Line Integration',
        body: 'ATS UK has integrated robotic cells into customer production environments, combining pick-and-place, vision guidance, and line-side buffering for stable output.',
        bullets: [
          'Robot programming and safety-rated integration',
          'Synchronisation with upstream and downstream equipment',
          'Remote support and lifecycle maintenance options',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'Robotics Expertise', icon: 'gears' },
      { label: 'End-to-End Delivery', icon: 'target' },
      { label: 'UK Engineering', icon: 'uk' },
    ],
  },
  'ultrasonic-welding': {
    intro:
      'Our ultrasonic welding systems provide reliable joining of plastic components for automotive and industrial applications, with tooling and fixturing designed for your parts.',
    bullets: [
      'Standalone and in-line ultrasonic welders',
      'Custom nest tooling and part location',
      'Process development and weld validation',
      'Maintenance and spare parts support',
    ],
    sections: [
      {
        eyebrow: 'PREVIOUS WORK',
        title: 'Interior Component Welding',
        body: 'We have supplied ultrasonic welding equipment for interior trim assemblies where joint strength, aesthetics, and cycle time were key project requirements.',
        bullets: [
          'Multi-cavity tooling for batch efficiency',
          'Integrated quality monitoring options',
          'Compact footprint for line-side installation',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'Precision Joining', icon: 'target' },
      { label: 'Custom Tooling', icon: 'wrench' },
      { label: 'Production Ready', icon: 'gauge' },
    ],
  },
  'punching-machines': {
    intro:
      'Precision punching machines for trimming, piercing, and forming operations on moulded and fabricated components — engineered for accuracy and durability.',
    bullets: [
      'Pneumatic and servo-driven punching systems',
      'Custom die sets and part nests',
      'Safety guarding and two-hand controls',
      'Integration with laminating and assembly lines',
    ],
    sections: [
      {
        eyebrow: 'CASE STUDY',
        title: 'Post-Mould Punching Stations',
        body: 'ATS UK has built punching equipment for automotive interior suppliers requiring clean edges and repeatable hole patterns on moulded trim parts.',
        bullets: [
          'Quick-change tooling for multiple part variants',
          'Scrap extraction and part ejection',
          'Cycle times matched to upstream process',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'High Precision', icon: 'target' },
      { label: 'Robust Design', icon: 'gears' },
      { label: 'Quick Changeover', icon: 'puzzle' },
    ],
  },
  'inspection-fixtures': {
    intro:
      'Quality assurance equipment from manual gap and flush gauges to fully automated inspection fixtures and recording surface measurement systems.',
    bullets: [
      'Gap, flush, and profile checking fixtures',
      'Manual and automated inspection workstations',
      'Data recording and traceability options',
      'Designed for shop-floor repeatability',
    ],
    sections: [
      {
        eyebrow: 'PREVIOUS WORK',
        title: 'Automotive Interior Inspection',
        body: 'We have delivered inspection fixtures for tier-one automotive suppliers where dimensional verification and audit trails were required for production release.',
        bullets: [
          'Fixture design aligned to customer datum schemes',
          'Go/no-go and variable measurement options',
          'Ergonomic access for operator repeatability',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'Quality Focus', icon: 'target' },
      { label: 'Custom Fixtures', icon: 'wrench' },
      { label: 'Shop-Floor Proven', icon: 'gauge' },
    ],
  },
  'packaging-machines': {
    intro:
      'From individual capping and feeding machines to complete turnkey filling lines, ATS UK delivers packaging automation for food, beverage, pharma, home care, and industrial sectors.',
    bullets: [
      'Capping, unscrambling, and feeding systems',
      'Turnkey filling lines from 10ml to 200-litre',
      'Custom conveyors and product handling',
      'UK manufacture with global support',
    ],
    featureCards: [
      {
        title: 'Capping Machines',
        items: ['Linear capping', 'Rotary capping', 'High-speed applications'],
        linkLabel: 'View capping',
        icon: 'cap',
      },
      {
        title: 'Bottle Unscramblers',
        items: ['Multi-format sorting', 'High throughput', 'Flexible orientation'],
        linkLabel: 'View unscramblers',
        icon: 'bottle',
      },
      {
        title: 'Pump & Trigger Feeding',
        items: ['High-speed feeding', 'Precision delivery', 'Multiple formats'],
        linkLabel: 'View feeding systems',
        icon: 'formats',
      },
    ],
    sections: [
      {
        eyebrow: 'PACKAGING RANGE',
        title: 'Complete Packaging Line Solutions',
        body: 'Our packaging division covers the full spectrum from standalone machines to integrated filling lines. Explore our dedicated product pages for detailed specifications and case studies.',
        bullets: [
          'Turnkey filling lines and end-to-end automation',
          'Food & beverage manufacturing machinery',
          'Bespoke conveyors and assembly systems',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: 'View all packaging products',
      },
    ],
    highlights: [
      { label: '35+ Years Experience', icon: 'gauge' },
      { label: 'Turnkey Lines', icon: 'gears' },
      { label: 'Global Support', icon: 'target' },
    ],
  },
  'foundry-patterns': {
    intro:
      'Reverse engineering and recreation of heritage building casting patterns for the building renovation industry, alongside sand casting pattern support.',
    bullets: [
      'Heritage pattern reverse engineering',
      'Sand casting pattern manufacture',
      'Restoration and renovation project support',
      'Precision machining from site surveys',
    ],
    sections: [
      {
        eyebrow: 'PREVIOUS WORK',
        title: 'Heritage Building Castings',
        body: 'ATS UK has recreated historic casting patterns for building restoration projects where original patterns were unavailable or damaged beyond repair.',
        bullets: [
          'Site survey and dimensional capture',
          'Pattern manufacture to foundry requirements',
          'Support through casting trials and approval',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'Heritage Expertise', icon: 'puzzle' },
      { label: 'Precision Patterns', icon: 'target' },
      { label: 'UK Toolroom', icon: 'uk' },
    ],
  },
  'machining-prototyping': {
    intro:
      'Full support for low-volume manufacture including moulding, machining, assembly, and painting — from one-off prototypes to small production runs.',
    bullets: [
      'CNC machining and manual finishing',
      'Prototype and pre-production parts',
      'Assembly and painting services',
      'Design-for-manufacture input',
    ],
    sections: [
      {
        eyebrow: 'CASE STUDY',
        title: 'Prototype to Pre-Production',
        body: 'We support customers who need fast-turnaround machined and assembled prototypes before committing to full production tooling and automation.',
        bullets: [
          'Rapid machining from CAD data',
          'Material and process selection guidance',
          'Assembly validation builds',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'Rapid Turnaround', icon: 'gauge' },
      { label: 'Full Capability', icon: 'gears' },
      { label: 'DFM Support', icon: 'puzzle' },
    ],
  },
  'small-batch-assembly': {
    intro:
      'Small batch and prototype assembly services for validation builds, show vehicles, pre-production trials, and specialist product runs.',
    bullets: [
      'Prototype and pre-production assembly',
      'Low-volume specialist builds',
      'Quality records and traceability',
      'Flexible resource to support peak demand',
    ],
    sections: [
      {
        eyebrow: 'PREVIOUS WORK',
        title: 'Validation and Show Builds',
        body: 'Our team has assembled prototype and show-standard builds where attention to detail, finish quality, and programme timing were equally critical.',
        bullets: [
          'Structured build sequences and checklists',
          'Cross-functional engineering support',
          'Delivery to customer site or event deadlines',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'Flexible Capacity', icon: 'puzzle' },
      { label: 'Show Quality', icon: 'target' },
      { label: 'Experienced Team', icon: 'gauge' },
    ],
  },
  'aerospace-models': {
    intro:
      'Aircraft interior mock-ups and monuments — from spatial models to full-scale, show-standard fuselage structures for customer review and engineering sign-off.',
    bullets: [
      'Spatial and engineering review models',
      'Full-scale interior monuments',
      'Show-standard finish and lighting',
      'Programme management from concept to delivery',
    ],
    sections: [
      {
        eyebrow: 'CASE STUDY',
        title: 'Interior Show and Review Models',
        body: 'ATS UK has delivered aerospace interior models for airline and OEM review programmes, enabling stakeholders to assess layout, ergonomics, and brand experience before production commitment.',
        bullets: [
          'Full-scale fuselage sections and monuments',
          'Accurate spatial representation from CAD',
          'Transport and installation to customer venues',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'Aerospace Grade', icon: 'target' },
      { label: 'Show Standard', icon: 'gauge' },
      { label: 'Full Scale', icon: 'puzzle' },
    ],
  },
  'cockpit-simulators': {
    intro:
      'Design and build of cockpit simulators and training environments for aerospace and defence — combining structural fidelity with functional systems integration.',
    bullets: [
      'Cockpit structure and interior fit-out',
      'Controls and interface integration',
      'Training and demonstration environments',
      'Bespoke builds to customer specifications',
    ],
    sections: [
      {
        eyebrow: 'PREVIOUS WORK',
        title: 'Simulator Environments',
        body: 'We apply our aerospace modelling and engineering capability to cockpit simulator projects where realism, durability, and programme delivery are essential.',
        bullets: [
          'Structural and cosmetic fidelity to reference aircraft',
          'Integration of customer-supplied avionics and controls',
          'Factory acceptance and on-site commissioning',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'Aerospace Expertise', icon: 'target' },
      { label: 'Systems Integration', icon: 'gears' },
      { label: 'Bespoke Builds', icon: 'puzzle' },
    ],
  },
  'injection-moulding': {
    intro:
      'Plastic injection moulding tools manufactured to all budgets and volumes, with post-mould assembly and maintenance supported from our UK toolroom.',
    bullets: [
      'Injection mould tool design and manufacture',
      'Post-mould DFM and process support',
      'Toolroom maintenance and modification',
      'Post-mould assembly integration',
    ],
    sections: [
      {
        eyebrow: 'CASE STUDY',
        title: 'Automotive and Aerospace Tooling',
        body: 'ATS UK supports customers in automotive and aerospace with injection mould tooling and post-mould process equipment, from single-cavity prototypes to production tools.',
        bullets: [
          'DFM reviews with customer engineering teams',
          'Tool manufacture and sampling support',
          'Post-mould trimming, welding, and assembly equipment',
        ],
        footer: '',
        imageUrl:
          'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&h=600&q=80',
        videoUrl: '',
        exploreLabel: '',
      },
    ],
    highlights: [
      { label: 'UK Toolroom', icon: 'uk' },
      { label: 'DFM Expertise', icon: 'target' },
      { label: 'Full Process Chain', icon: 'gears' },
    ],
  },
}

export function buildServicePageDefaults() {
  const defaults = {}
  for (const service of SERVICES) {
    const content = SERVICE_CONTENT[service.id]
    defaults[service.id] = makeServiceDefault(service, content)
  }
  return defaults
}

export const SERVICE_PAGE_DEFAULTS = buildServicePageDefaults()

export function getServicePageDefault(serviceId) {
  return SERVICE_PAGE_DEFAULTS[serviceId] || null
}
