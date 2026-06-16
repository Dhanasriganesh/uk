/**
 * Canonical list of ATS UK industry services shown under the Services nav (/services).
 * Used by the public site, CMS defaults, admin registry, header, and footer.
 */
export const SERVICES = [
  {
    id: 'laminating-wrapping',
    path: '/laminating-wrapping',
    title: 'Laminating and Wrapping Machines for Automotive Interiors',
    shortTitle: 'Laminating & Wrapping',
    description:
      'Pressure laminators and wrapping systems for automotive interior trim — from soft-touch finishes to precision film application.',
    imageUrl:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'assembly-equipment',
    path: '/assembly-equipment',
    title: 'Fully and Semi-Automated Assembly Equipment',
    shortTitle: 'Assembly Equipment',
    description:
      'Custom assembly stations and automation cells for repeatable, high-quality production across automotive and industrial sectors.',
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'production-lines-robotics',
    path: '/production-lines-robotics',
    title: 'Production Lines and Robotics',
    shortTitle: 'Production Lines & Robotics',
    description:
      'Integrated production lines and robotic cells designed, built, and commissioned for your manufacturing workflow.',
    imageUrl:
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'ultrasonic-welding',
    path: '/ultrasonic-welding',
    title: 'Ultrasonic Welding',
    shortTitle: 'Ultrasonic Welding',
    description:
      'Ultrasonic welding systems for joining plastics and components with consistent, repeatable results on the production line.',
    imageUrl:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'punching-machines',
    path: '/punching-machines',
    title: 'Punching Machines',
    shortTitle: 'Punching Machines',
    description:
      'Precision punching and trimming equipment for automotive interior components and post-mould processing applications.',
    imageUrl:
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'inspection-fixtures',
    path: '/inspection-fixtures',
    title: 'Inspection Fixtures and Workstations',
    shortTitle: 'Inspection Fixtures',
    description:
      'Gap and flush gauges, inspection fixtures, and workstations — from manual checks to automated surface measurement.',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'packaging-machines',
    path: '/packaging-machines',
    title: 'Packaging Machines, including capping, feeding and filling solutions',
    shortTitle: 'Packaging Machines',
    description:
      'Capping, feeding, filling, and complete packaging line solutions — from individual machines to turnkey automation.',
    imageUrl:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'foundry-patterns',
    path: '/foundry-patterns',
    title: 'Foundry Patterns and Sand Casting',
    shortTitle: 'Foundry Patterns',
    description:
      'Reverse engineering and recreation of heritage building casting patterns, plus sand casting support for renovation projects.',
    imageUrl:
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'machining-prototyping',
    path: '/machining-prototyping',
    title: 'Bespoke Machining and Prototyping',
    shortTitle: 'Machining & Prototyping',
    description:
      'CNC machining, prototyping, and low-volume manufacture — supporting moulding, assembly, and finishing under one roof.',
    imageUrl:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'small-batch-assembly',
    path: '/small-batch-assembly',
    title: 'Small Batch, Prototype Assembly',
    shortTitle: 'Small Batch Assembly',
    description:
      'Prototype and small-batch assembly services for validation builds, pre-production trials, and specialist product runs.',
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'aerospace-models',
    path: '/aerospace-models',
    title: 'Aerospace Interior Show and Engineering Review Models',
    shortTitle: 'Aerospace Models',
    description:
      'Aircraft interior mock-ups and monuments — from spatial models to full-scale, show-standard fuselage structures.',
    imageUrl:
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'cockpit-simulators',
    path: '/cockpit-simulators',
    title: 'Cockpit Simulators',
    shortTitle: 'Cockpit Simulators',
    description:
      'Design and build of cockpit simulators and training environments for aerospace and defence applications.',
    imageUrl:
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 'injection-moulding',
    path: '/injection-moulding',
    title: 'Injection Moulding and Post Mould Assembly',
    shortTitle: 'Injection Moulding',
    description:
      'Plastic injection moulding tools manufactured to all budgets and volumes, with post-mould assembly maintained in our UK toolroom.',
    imageUrl:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&h=500&q=80',
  },
]

export const SERVICE_PAGE_IDS = SERVICES.map((s) => s.id)

export function getServiceById(id) {
  return SERVICES.find((s) => s.id === id)
}

export function getServiceByPath(path) {
  return SERVICES.find((s) => s.path === path)
}
