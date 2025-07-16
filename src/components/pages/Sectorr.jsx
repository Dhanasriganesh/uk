import React from 'react';
import { motion } from 'framer-motion';
 
const sectors = [
  {
    name: 'Pharmaceutical & Cosmetic',
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#FDE68A"/><ellipse cx="26" cy="14" rx="6" ry="3" fill="#F59E42"/><rect x="10" y="22" width="12" height="6" rx="3" fill="#F59E42"/><rect x="10" y="22" width="12" height="6" rx="3" fill="#fff" fillOpacity=".5"/><path d="M16 25h4" stroke="#F59E42" strokeWidth="1.5" strokeLinecap="round"/></svg>
    ),
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
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#BFDBFE"/><rect x="12" y="22" width="16" height="6" rx="2" fill="#2563EB"/><rect x="14" y="18" width="12" height="6" rx="2" fill="#60A5FA"/><circle cx="16" cy="28" r="2" fill="#1D4ED8"/><circle cx="24" cy="28" r="2" fill="#1D4ED8"/></svg>
    ),
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
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#BBF7D0"/><path d="M20 10c3 0 5 2 5 5 0 4-2 8-5 8s-5-4-5-8c0-3 2-5 5-5zm0 13v5m-3 2h6" stroke="#059669" strokeWidth="2" strokeLinecap="round"/><ellipse cx="20" cy="15" rx="5" ry="3" fill="#34D399" fillOpacity=".7"/></svg>
    ),
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
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#FCA5A5"/><rect x="17" y="12" width="6" height="16" rx="2" fill="#DC2626"/><rect x="12" y="17" width="16" height="6" rx="2" fill="#DC2626"/></svg>
    ),
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
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#C7D2FE"/><path d="M12 22l8-8 8 8" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round"/><rect x="16" y="22" width="8" height="6" rx="2" fill="#6366F1"/></svg>
    ),
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
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#FBCFE8"/><circle cx="20" cy="16" r="4" fill="#DB2777"/><rect x="15" y="22" width="10" height="6" rx="3" fill="#DB2777"/></svg>
    ),
    solutions: [
      'Bottle Unscramblers',
      'Capping Machines',
      'Cap Feeding Systems',
      'Dispensing Pump & Spray Trigger Feeding Systems',
      'Turn-key Filling Lines',
      'Deodorant & Aerosol Filling Line Solutions',
    ],
  },
];
 
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, type: 'spring' },
  }),
};
 
export default function Sectors() {
  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4 flex flex-col items-center">
      <h1 className="text-2xl md:text-2xl font-semibold text-gray-900 mb-2 text-center">Sectors</h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
        We provide advanced packaging and automation solutions for a wide range of industries.
      </p>
      <div className="w-full max-w-3xl flex flex-col gap-4">
        {sectors.map((sector, i) => (
          <motion.div
            key={sector.name}
            className="relative bg-white rounded-2xl shadow-lg flex items-start gap-4 border border-gray-100 p-4 overflow-hidden sector-card-glow group"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <motion.div
              className="flex-shrink-0 flex items-center justify-center w-12 h-12"
              whileHover={{ scale: 1.18, rotate: 8 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {sector.icon}
            </motion.div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-gray-800 mb-1">{sector.name}</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                {sector.solutions.map((solution, idx) => (
                  <li key={idx}>{solution}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`
        .sector-card-glow::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: 60%;
          height: 100%;
          background: radial-gradient(circle at 90% 60%, rgba(255,0,0,0.08) 0%, rgba(255,0,0,0.04) 60%, rgba(255,0,0,0) 100%);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}