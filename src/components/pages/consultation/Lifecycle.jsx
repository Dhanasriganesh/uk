import React from 'react';
import { motion } from 'framer-motion';
import lifecycleImg from '../../../assets/i3.png';
 
const summary = `Proactive Maintenance and Strategic Upgrades\nOur team takes a proactive approach to maintenance, conducting regular inspections and implementing strategic upgrades to keep your systems operating at their best upon request. By staying ahead of potential issues, we help you avoid costly downtime and maintain productivity.`;
 
const cards = [
  {
    title: 'Comprehensive Support from Installation to End-of-Life',
    desc: 'From initial installation to end-of-life planning, we provide comprehensive support and guidance every step of the way. Our team is dedicated to helping you make informed decisions that align with your long-term objectives, ensuring the continued success of your business.'
  },
  {
    title: 'Enhance Resilience, Advanced Lifecycle Solutions',
    desc: 'Sustaining Peak Performance\nEnsure the longevity and efficiency of your systems with Advanced Tooling Systems Group\'s expert lifecycle management solutions. We understand that effective lifecycle management is essential for maximizing your return on investment and minimizing disruptions to your operations.'
  }
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
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="14" fill="#2563eb"/>
      <path d="M8.5 14.5L13 19L20 11" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
 
export default function LifecycleManagement() {
  return (
    <motion.div
      className="min-h-screen bg-[#f5f5f5] py-12 px-4 flex flex-col items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          className="w-full flex flex-col md:flex-row items-center gap-8 mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <motion.img
            src={lifecycleImg}
            alt="Lifecycle Management"
            className="rounded-2xl shadow-lg object-cover bg-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{ cursor: 'pointer', maxWidth: '320px', maxHeight: '220px', width: '100%', height: 'auto', margin: '0 auto' }}
          />
          <div className="flex-1">
            <motion.div
              variants={sectionVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-xs font-semibold text-gray-700 mb-2 tracking-widest"
            >
              LIFECYCLE MANAGEMENT: SUSTAINING PEAK PERFORMANCE
            </motion.div>
            <motion.h1
              variants={sectionVariants}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-2xl md:text-2xl font-semibold font-sans text-gray-900 mb-4 leading-tight"
            >
              PROACTIVE, STRATEGIC, COMPREHENSIVE
            </motion.h1>
            <motion.p
              variants={sectionVariants}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-lg text-gray-700 max-w-3xl mb-8"
            >
              {summary}
            </motion.p>
          </div>
        </motion.div>
        {/* Premium Row-wise Cards Section */}
        <motion.div variants={containerVariants} className="flex flex-col gap-6 mb-16">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              variants={sectionVariants}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.025, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="flex items-center bg-white rounded-xl shadow-md px-6 py-5 border border-gray-100 hover:border-blue-400 transition-all cursor-pointer premium-task-card"
              style={{ minHeight: '90px' }}
            >
              <span className="mr-5">
                <PremiumCheckIcon />
              </span>
              <div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{card.title}</div>
                <div className="text-gray-600 text-base whitespace-pre-line">{card.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}