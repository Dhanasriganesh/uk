import React from 'react';
import { motion } from 'framer-motion';
import trunkeyImg from '../../../assets/i1.jpg';
 
const summary = `Turn-Key Automation - a Backbone for your Plant\nATS offers turnkey automation solutions leveraging industry experience and expertise to deliver swift automation and packaging applications that meet rigorous standards. Our professionals combine a diverse packaging experience and technical knowledge with disciplined implementation, providing and securing robust automated solutions across all sectors.`;
 
const competencies = [
  'Bottle Unscramblers',
  'Liquid Filling Machines',
  'Capping Machines',
  'Inkjet Coding',
  'Induction Sealing',
  'Labelling',
  'Automatic Cartoning & Carton Sealing Equipment',
  'Case-packing & Palletising Systems',
];
 
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.7, type: 'spring' },
  }),
};
 
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};
 
function PremiumCheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="14" fill="#0ea5e9"/>
      <path d="M8.5 14.5L13 19L20 11" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
 
export default function Trunkey() {
  return (
    <motion.div
      className="min-h-screen bg-[#f8fafc] py-12 px-4 flex flex-col items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <motion.img
          src={trunkeyImg}
          alt="Turnkey Automation"
          className="rounded-2xl shadow-xl object-contain bg-white mb-8"
          style={{ maxWidth: '700px', maxHeight: '260px', width: '100%', height: 'auto' }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, type: 'spring' }}
        />
        <motion.div
          variants={sectionVariants}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-xs font-semibold text-sky-700 mb-2 tracking-widest text-center"
        >
          TURN-KEY AUTOMATION SOLUTIONS
        </motion.div>
        <motion.h1
          variants={sectionVariants}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl md:text-3xl font-bold font-sans text-gray-900 mb-4 leading-tight text-center"
        >
          A Backbone for Your Plant
        </motion.h1>
        <motion.p
          variants={sectionVariants}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-lg text-gray-700 max-w-3xl mb-10 text-center"
        >
          {summary}
        </motion.p>
        {/* Competencies Section - Timeline Style */}
        <motion.div variants={containerVariants} className="relative flex flex-col gap-0 w-full max-w-2xl mx-auto mt-8">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-1 bg-sky-100 rounded-full z-0" style={{ minHeight: '100%' }} />
          {competencies.map((item, idx) => (
            <motion.div
              key={item}
              variants={sectionVariants}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="relative flex items-start gap-4 py-6 group"
            >
              {/* Timeline dot */}
              <span className="z-10 mt-1 flex items-center justify-center w-7 h-7 rounded-full bg-sky-500 shadow-lg ring-4 ring-white group-hover:bg-sky-600 transition-all">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 8.5L7 11.5L12 5.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-lg md:text-xl font-semibold text-gray-900 leading-tight">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
 