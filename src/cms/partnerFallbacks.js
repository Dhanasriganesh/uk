import auria from '../assets/clients/auria.png'
import jlr from '../assets/clients/jlr.png'
import antolin from '../assets/clients/antolin.png'
import artifex from '../assets/clients/artifex.png'
import bentley from '../assets/clients/bentley.png'
import boeing from '../assets/clients/boeing.png'
import rollsRoyce from '../assets/clients/RR.png'
import adient from '../assets/clients/adient.png'
import safran from '../assets/clients/safran.png'
import cabin from '../assets/clients/cabin.png'
import thompson from '../assets/clients/thompson.png'
import baesystems from '../assets/clients/baesystems.png'

import gms from '../assets/partners/gms.png'
import smc from '../assets/partners/smc.png'
import balluff from '../assets/partners/balluff.png'
import keyence from '../assets/partners/keyence.png'
import siemens from '../assets/partners/siemens.png'
import matco from '../assets/partners/matco.png'
import chaoda from '../assets/partners/chaoda.png'
import sick from '../assets/partners/sick.png'
import gtma from '../assets/partners/gtma.png'

export const supportedCustomerFallbacks = [
  auria,
  jlr,
  antolin,
  artifex,
  bentley,
  boeing,
  rollsRoyce,
  adient,
  safran,
  cabin,
  thompson,
  baesystems,
]

export const trustedPartnerFallbacks = [
  gms,
  smc,
  balluff,
  keyence,
  siemens,
  matco,
  chaoda,
  sick,
  gtma,
]

export const DEFAULT_SUPPORTED_CUSTOMERS = [
  { name: 'Auria', logoUrl: '' },
  { name: 'JLR', logoUrl: '' },
  { name: 'Grupo Antolin', logoUrl: '' },
  { name: 'Artifex', logoUrl: '' },
  { name: 'Bentley', logoUrl: '' },
  { name: 'Boeing', logoUrl: '' },
  { name: 'Rolls-Royce', logoUrl: '' },
  { name: 'Adient', logoUrl: '' },
  { name: 'Safran', logoUrl: '' },
  { name: 'Avic Cabin Systems', logoUrl: '' },
  { name: 'Thompson Aero Seating', logoUrl: '' },
  { name: 'BAE Systems', logoUrl: '' },
]

export const DEFAULT_TRUSTED_PARTNERS = [
  { name: 'GMS Feeding Systems', logoUrl: '' },
  { name: 'SMC', logoUrl: '' },
  { name: 'Balluff', logoUrl: '' },
  { name: 'Keyence', logoUrl: '' },
  { name: 'Siemens', logoUrl: '' },
  { name: 'Matco International', logoUrl: '' },
  { name: 'Chao Da', logoUrl: '' },
  { name: 'Sick Sensor Intelligence', logoUrl: '' },
  { name: 'GTMA', logoUrl: '' },
]

/** Map partner name → bundled logo for reliable display in all environments. */
export function partnerLogoByName(defaults, fallbacks) {
  return Object.fromEntries(defaults.map((item, i) => [item.name.toLowerCase(), fallbacks[i]]))
}

export const supportedCustomerLogoByName = partnerLogoByName(
  DEFAULT_SUPPORTED_CUSTOMERS,
  supportedCustomerFallbacks
)

export const trustedPartnerLogoByName = partnerLogoByName(
  DEFAULT_TRUSTED_PARTNERS,
  trustedPartnerFallbacks
)
