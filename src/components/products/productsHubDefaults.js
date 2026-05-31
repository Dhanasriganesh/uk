import cappingImg from '../../assets/capping.png'
import bottleImg from '../../assets/bottle.png'
import pumpImg from '../../assets/pump.png'
import turnkeyImg from '../../assets/turnkey.png'
import bespokeImg from '../../assets/bespoke.png'
import foodImg from '../../assets/food.png'
import i1 from '../../assets/i1.jpg'
import i4 from '../../assets/i4.jpg'
import i5 from '../../assets/i5.jpg'
import food1 from '../../assets/food1.png'
import turnkey1 from '../../assets/turnkey1.png'
import pump1 from '../../assets/pump1.png'
import be1 from '../../assets/be1.png'
import b1 from '../../assets/b1.jpg'

export const PRODUCT_SLIDES = [
  {
    title: 'Capping Machines',
    description:
      'Flexible linear capping and high-speed rotary capping machines for a wide range of applications.',
    link: '/capping',
    imageUrl: cappingImg,
  },
  {
    title: 'Bottle Unscramblers',
    description:
      'Versatile machines for sorting and orienting multiple container formats in a single system.',
    link: '/bottle',
    imageUrl: bottleImg,
  },
  {
    title: 'Pump & Trigger Feeding Systems',
    description:
      'High-speed systems for sorting, feeding, and delivering pumps and triggers with precision and reliability.',
    link: '/pump',
    imageUrl: pumpImg,
  },
  {
    title: 'Turnkey Filling Lines',
    description:
      'Complete filling line solutions from 10ml to 200-litre, including end-to-end automation.',
    link: '/turnkey',
    imageUrl: turnkeyImg,
  },
  {
    title: 'Bespoke Packaging Solutions',
    description:
      'Custom conveyors, product handling, ultrasonic cap welding, assembly systems, and more.',
    link: '/bespoke',
    imageUrl: bespokeImg,
  },
  {
    title: 'Food & Beverage Lines (FBL)',
    description:
      'Comprehensive food and beverage manufacturing machinery for the UK and Ireland.',
    link: '/foodbeverage',
    imageUrl: foodImg,
  },
]

export const PRODUCT_MARQUEE_IMAGES = [i1, i4, i5, food1, turnkey1, pump1, be1, b1]

export const PRODUCTS_HUB_DEFAULTS = {
  eyebrow: 'PRODUCT RANGE',
  pageTitle: 'Packaging Machinery',
  pageTitleHighlight: 'Solutions',
  intro:
    'Explore our range of packaging machinery and automation solutions — from capping and unscrambling to complete turnkey filling lines.',
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
