import pharmaImg from '../../assets/pharma.png'
import autoImg from '../../assets/auto.png'
import foodindImg from '../../assets/foodind.png'
import medImg from '../../assets/med.png'
import homeImg from '../../assets/home.png'
import persImg from '../../assets/pers.png'
import {
  LuFlaskConical,
  LuCar,
  LuCoffee,
  LuHeartPulse,
  LuHouse,
  LuSparkles,
} from 'react-icons/lu'

export const SECTOR_ITEMS = [
  {
    name: 'Pharmaceutical & Cosmetic',
    imageUrl: pharmaImg,
    icon: LuFlaskConical,
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
    imageUrl: autoImg,
    icon: LuCar,
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
    imageUrl: foodindImg,
    icon: LuCoffee,
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
    imageUrl: medImg,
    icon: LuHeartPulse,
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
    imageUrl: homeImg,
    icon: LuHouse,
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
    imageUrl: persImg,
    icon: LuSparkles,
    solutions: [
      'Bottle Unscramblers',
      'Capping Machines',
      'Cap Feeding Systems',
      'Dispensing Pump & Spray Trigger Feeding Systems',
      'Turn-key Filling Lines',
      'Deodorant & Aerosol Filling Line Solutions',
    ],
  },
]

export const SECTORS_HUB_DEFAULTS = {
  eyebrow: 'INDUSTRIES',
  pageTitle: 'Sectors We',
  pageTitleHighlight: 'Serve',
  intro:
    'We deliver advanced packaging machinery solutions tailored to diverse industries worldwide — from pharmaceutical and automotive to food, medical, and personal care.',
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
