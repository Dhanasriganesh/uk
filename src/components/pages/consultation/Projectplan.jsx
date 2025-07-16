import React from 'react';
import { motion } from 'framer-motion';
import projectPlanningImg from '../../../assets/i2.jpg';
 
const steps = [
  {
    number: '01',
    title: 'Customer Kick Off Meeting',
    desc: 'Engage with the client to understand requirements and expectations thoroughly.'
  },
  {
    number: '02',
    title: 'Design and Review',
    desc: 'Meticulously craft and refine the machine design to meet client specifications and industry standards.'
  },
  {
    number: '03',
    title: 'Procurement and Assembly',
    desc: 'Source high-quality materials, machine components, and assemble the machine with precision and expertise.'
  },
  {
    number: '04',
    title: 'Testing and Optimization',
    desc: 'Conduct comprehensive trials to ensure the machine\'s performance and functionality meet or exceed expectations.'
  },
  {
    number: '05',
    title: 'Client Approval and Delivery',
    desc: 'Obtain final client sign-off and deliver the finished machine, ready to enhance their operations.'
  },
];
 
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, type: 'spring' },
  }),
};
 
const blueprintSections = [
  {
    title: 'Crafting Your Blueprint',
    text: 'We believe that innovation is the key to achieving first-rate products for our customers. Our team is always searching for ways to develop better solutions for our customers.'
  },
  {
    title: 'Tailored Solutions for Your Goals',
    text: 'Our professionals specialize in crafting customized project plans tailored to your unique goals and requirements. From inception to execution, we prioritize every aspect of your project, ensuring alignment with your vision and objectives.'
  },
  {
    title: 'Driving Efficiency and Maximizing ROI',
    text: 'Our goal-oriented approach focuses on delivering results that exceed expectations, driving efficiency and maximizing return on investment. By carefully analyzing potential challenges and opportunities, we proactively adapt our plans to keep your project on track.'
  },
  {
    title: 'Precision and Clarity Every Step of the Way',
    text: 'Using cutting-edge tools and industry-leading practices, we outline project scopes, schedules, and milestones. Our emphasis on clarity and precision ensures that every team member is aligned and equipped to execute their tasks with excellence.'
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
 
export default function ProjectPlanning() {
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
            src={projectPlanningImg}
            alt="Project Planning"
            className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover max-h-[300px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(255,0,0,0.10)' }}
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
              PROJECT PLAN: ADVANCED MACHINERY DESIGN AND PRODUCTION
            </motion.div>
            <motion.h1
              variants={sectionVariants}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-2xl md:text-2xl font-semibold font-sans text-gray-900 mb-4 leading-tight"
            >
              INNOVATION STARTS WITH FORESIGHT
            </motion.h1>
            <motion.p
              variants={sectionVariants}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-lg text-gray-700 max-w-3xl mb-8"
            >
              At ATS, we prioritize efficiency and excellence in every step of the process. We outline the key tasks that drive the success of this project:
            </motion.p>
          </div>
        </motion.div>
        {/* Steps Section */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.slice(0, 3).map((step, idx) => (
            <motion.div
              key={step.number}
              variants={sectionVariants}
              custom={idx}
              className="flex flex-col gap-2 border-r last:border-none border-gray-200 pr-6 last:pr-0"
            >
              <div className="text-2xl font-bold text-red-700 mb-1">{step.number}</div>
              <div className="text-lg font-bold text-gray-900 mb-1">{step.title}</div>
              <div className="text-gray-700 text-base">{step.desc}</div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {steps.slice(3).map((step, idx) => (
            <motion.div
              key={step.number}
              variants={sectionVariants}
              custom={idx}
              className="flex flex-col gap-2 border-r last:border-none border-gray-200 pr-6 last:pr-0"
            >
              <div className="text-2xl font-bold text-red-700 mb-1">{step.number}</div>
              <div className="text-lg font-bold text-gray-900 mb-1">{step.title}</div>
              <div className="text-gray-700 text-base">{step.desc}</div>
            </motion.div>
          ))}
        </motion.div>
        {/* Additional Content */}
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {blueprintSections.map((section, i) => (
            <motion.div
              key={section.title}
              className="flex flex-row items-start gap-3"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              <span className="mt-2 w-3 h-3 rounded-full bg-red-700 flex-shrink-0"></span>
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
 