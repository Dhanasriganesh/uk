import React from 'react';
import { motion } from 'framer-motion';
import projectManagementImg from '../../../assets/i2.jpg';
 
const summary = `For us, Professional, Seamless Project Management is Our Signature Move
Once your order is received, Our project manager will spearhead the task of processing your project and fulfilling contractual obligations. Collaborating with a team of designers and engineers, we ensure project completion aligns with both yours and our exacting quality standards, within agreed-upon timelines. We prioritize speed, transparency, and flexibility throughout this process. Through a rigorous quality gate process, Our project manager monitors your project and associated milestones.`;
 
const tasks = [
  {
    title: 'Keeping You Informed',
    desc: 'Regularly sharing updates and progress to keep you in the loop.'
  },
  {
    title: 'Clarifying Requirements',
    desc: 'Clarifying commercial and technical aspects for new project requirements.'
  },
  {
    title: 'Internal Coordination',
    desc: 'Coordinating different departments internally for seamless execution.'
  },
  {
    title: 'Risk Management',
    desc: 'Assessing and managing risks to ensure project stability.'
  },
  {
    title: 'Decision Making',
    desc: 'Making decisions if there are any deviations from the plan.'
  },
  {
    title: 'Quality Assurance',
    desc: 'Ensuring quality through checks and rigorous standards.'
  },
  {
    title: 'Logistics & Scheduling',
    desc: 'Organizing logistics such as scheduling, validation, and dispatching test materials.'
  },
  {
    title: 'Test & Acceptance',
    desc: 'Supporting and managing tests and system acceptances.'
  },
  {
    title: 'System Commissioning',
    desc: 'Overseeing the commissioning of your system for a smooth start.'
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
 
const highlights = [
  {
    title: 'Seamless Coordination',
    text: 'Our dedicated project manager ensures seamless coordination and execution from inception to system commissioning, guaranteeing your project\'s success.'
  },
  {
    title: 'Transparency & Flexibility',
    text: 'We prioritize speed, transparency, and flexibility, adapting to your needs and keeping you informed at every stage.'
  },
  {
    title: 'Quality at Every Step',
    text: 'Through a rigorous quality gate process, we monitor your project and associated milestones, ensuring the highest standards are met.'
  },
];
 
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
 
export default function ProjectManagement() {
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
            src={projectManagementImg}
            alt="Project Management"
            className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover max-h-[340px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{ cursor: 'pointer' }}
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
              PROJECT MANAGEMENT: SEAMLESS EXECUTION & COORDINATION
            </motion.div>
            <motion.h1
              variants={sectionVariants}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-2xl md:text-2xl font-semibold font-sans text-gray-900 mb-4 leading-tight"
            >
              PROFESSIONALISM IN EVERY STEP
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
        {/* Premium Row-wise Tasks Section */}
        <motion.div variants={containerVariants} className="flex flex-col gap-6 mb-16">
          {tasks.map((task, idx) => (
            <motion.div
              key={task.title}
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
                <div className="text-lg font-semibold text-gray-900 mb-1">{task.title}</div>
                <div className="text-gray-600 text-base">{task.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Highlights Section */}
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {highlights.map((section, i) => (
            <motion.div
              key={section.title}
              className="flex flex-row items-start gap-3"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              <span className="mt-2 w-3 h-3 rounded-full bg-blue-700 flex-shrink-0"></span>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h2>
                <p className="text-gray-700 text-base">{section.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}