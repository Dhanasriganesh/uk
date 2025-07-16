import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
 
const pages = [
  {
    title: 'Project Management',
    desc: 'Professional, seamless project execution and coordination.',
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="30" height="22" rx="4" fill="#2563eb"/>
        <rect x="10" y="14" width="18" height="2.5" rx="1.25" fill="#fff"/>
        <rect x="10" y="19" width="12" height="2.5" rx="1.25" fill="#fff"/>
        <rect x="10" y="24" width="8" height="2.5" rx="1.25" fill="#fff"/>
      </svg>
    ),
    path: '/project-management',
  },
  {
    title: 'Project Planning',
    desc: 'Innovation and foresight in advanced machinery design.',
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="19" cy="19" r="15" fill="#0ea5e9"/>
        <path d="M19 10V19L25 22" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    path: '/project-planning',
  },
  {
    title: 'Turnkey Automation',
    desc: 'Swift, robust automation and packaging solutions.',
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="13" width="24" height="12" rx="4" fill="#38bdf8"/>
        <rect x="13" y="19" width="12" height="2.5" rx="1.25" fill="#fff"/>
        <circle cx="19" cy="19" r="18" stroke="#38bdf8" strokeWidth="2"/>
      </svg>
    ),
    path: '/trunkey-automation',
  },
  {
    title: 'Lifecycle Management',
    desc: 'Proactive maintenance and advanced lifecycle solutions.',
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="19" cy="19" r="15" fill="#22c55e"/>
        <path d="M14 19l4 4 6-8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    path: '/lifecycle-management',
  },
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
 
export default function Consultation() {
  const navigate = useNavigate();
  return (
    <motion.div
      className="min-h-screen bg-[#f5f5f5] py-16 px-4 flex flex-col items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.h1
        className="text-2xl md:text-3xl font-semibold font-sans text-gray-900 mb-8 text-center"
        variants={sectionVariants}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        Consultation & Solutions Hub
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700 max-w-2xl mb-12 text-center"
        variants={sectionVariants}
        custom={0.1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        Explore our core services and solutions. Click a logo to learn more about each area and get started with our expert team.
      </motion.p>
      {/* Logo Grid */}
      <motion.div
        className="relative grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-0 w-full max-w-4xl"
        variants={containerVariants}
        style={{ minHeight: '420px', background: 'transparent', boxShadow: 'none', borderRadius: 0, padding: 0 }}
      >
        {/* Horizontal line */}
        <div className="hidden md:block absolute left-0 right-0 top-1/2 border-t border-gray-200 z-10" style={{ height: 0 }} />
        {/* Vertical line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 border-l border-gray-200 z-10" style={{ width: 0 }} />
        {pages.map((page, idx) => (
          <motion.button
            key={page.title}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              navigate(page.path);
            }}
            variants={sectionVariants}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="flex flex-col items-center justify-center bg-transparent border-0 p-0 m-0 min-h-[180px] h-full w-full cursor-pointer focus:outline-none group relative z-20"
            style={{ minWidth: 0, background: 'transparent', boxShadow: 'none', borderRadius: 0 }}
          >
            <span className="mb-3" style={{ width: 44, height: 44 }}>{page.icon}</span>
            <span className="text-lg md:text-xl font-bold font-sans text-gray-900 mb-1 text-center" style={{ color: idx === 0 ? '#B71C1C' : idx === 1 ? '#0A3A60' : idx === 2 ? '#F59E00' : '#059669' }}>{page.title}</span>
            <span className="text-gray-500 text-sm text-center leading-tight font-medium" style={{ color: idx === 0 ? '#757575' : idx === 1 ? '#0A3A60' : idx === 2 ? '#0A3A60' : '#059669' }}>{page.desc}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}