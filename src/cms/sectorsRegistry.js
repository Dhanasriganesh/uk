/**
 * Canonical ATS UK industry sectors for /sectors and CMS defaults.
 */
export const SECTORS = [
  {
    id: 'automotive',
    name: 'Automotive',
    icon: 'automotive',
    imageUrl:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Laminating and wrapping machines for interior trim',
      'Ultrasonic welding and post-mould assembly equipment',
      'Inspection fixtures, gap and flush gauges',
      'Production lines and semi-automated assembly stations',
      'Packaging and filling solutions for automotive fluids',
    ],
  },
  {
    id: 'aerospace',
    name: 'Aerospace',
    icon: 'aerospace',
    imageUrl:
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Interior show and engineering review models',
      'Full-scale monuments and spatial mock-ups',
      'Cockpit simulators and training environments',
      'CAD design, DFM, and prototype assembly',
      'Bespoke machining for aerospace programmes',
    ],
  },
  {
    id: 'defence',
    name: 'Defence',
    icon: 'machining',
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Cockpit and mission training simulators',
      'Bespoke manufacture and low-volume production',
      'Precision machining and prototyping',
      'Assembly equipment and inspection workstations',
      'Secure, programme-managed project delivery',
    ],
  },
  {
    id: 'heritage-construction',
    name: 'Heritage Construction',
    icon: 'foundry',
    imageUrl:
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Foundry patterns and sand casting support',
      'Reverse engineering of heritage building castings',
      'Pattern recreation for renovation projects',
      'Bespoke machining from site survey data',
      'Collaboration with foundries through casting trials',
    ],
  },
  {
    id: 'bespoke-manufacture',
    name: 'Bespoke Manufacture/Startup',
    icon: 'machining',
    imageUrl:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Prototype and small-batch manufacture',
      'Injection mould tooling and post-mould assembly',
      'Design-for-manufacture and CAD support',
      'Low-volume machining, assembly, and finishing',
      'Flexible support from concept to pre-production',
    ],
  },
  {
    id: 'pharmaceutical-cosmetic',
    name: 'Pharmaceutical and Cosmetic',
    icon: 'packaging',
    imageUrl:
      'https://images.unsplash.com/photo-1587854692152-cf2652783a5c?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Sterile feeding and capping systems',
      'Container unscrambling and orientation',
      'Track and trace cap tightening systems',
      'Assembly systems for sprays, tubes, and vials',
      'Equipment produced to FDA, CGMP, CE, UL & Ex standards',
    ],
  },
  {
    id: 'food-beverage',
    name: 'Food and Beverage',
    icon: 'packaging',
    imageUrl:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Turnkey filling lines and end-to-end automation',
      'Sauce, oil, and beverage filling solutions',
      'Coffee capsule and container feeding systems',
      'Capping, unscrambling, and pump feeding',
      'Micro-brewery and specialist food packaging lines',
    ],
  },
  {
    id: 'medical',
    name: 'Medical',
    icon: 'inspection',
    imageUrl:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Hand sanitiser and medical liquid filling lines',
      'Vial feeding and stopper assembly systems',
      'Sterile cap feeding and capping solutions',
      'Inspection fixtures and quality workstations',
      'Track and trace and validation support',
    ],
  },
  {
    id: 'home-care',
    name: 'Home Care',
    icon: 'packaging',
    imageUrl:
      'https://images.unsplash.com/photo-1585421514284-efb74c2d69ba?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Bottle unscramblers and capping machines',
      'Dispensing pump and trigger feeding systems',
      'Turnkey filling lines for household products',
      'Disinfectant and bleach filling solutions',
      'Custom conveyors and product handling',
    ],
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    icon: 'packaging',
    imageUrl:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Deodorant and aerosol filling line solutions',
      'Lipstick, mascara, and cosmetic assembly systems',
      'Pump, trigger, and cap feeding equipment',
      'High-speed capping and unscrambling',
      'Integrated turnkey packaging lines',
    ],
  },
  {
    id: 'safety-equipment',
    name: 'Safety Equipment',
    icon: 'inspection',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Inspection fixtures and test workstations',
      'Assembly equipment for PPE and safety products',
      'Automated measurement and recording systems',
      'Small-batch and prototype assembly',
      'Bespoke tooling for safety product manufacture',
    ],
  },
  {
    id: 'motorsport',
    name: 'Motorsport',
    icon: 'automotive',
    imageUrl:
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&h=500&q=80',
    solutions: [
      'Rapid prototyping and CNC machining',
      'Composite and interior component tooling',
      'Small-batch assembly for race programmes',
      'Inspection gauges and fit-check fixtures',
      'Fast-turnaround engineering support',
    ],
  },
]

export const SECTOR_IDS = SECTORS.map((s) => s.id)

export function getSectorById(id) {
  return SECTORS.find((s) => s.id === id)
}
