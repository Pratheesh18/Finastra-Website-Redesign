import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../utils/animations';
import RegistrationForm from './Registration';

function RegistrationSection() {
  const { ref, controls, variants } = useScrollAnimation();
  
  return (
    <section id="register" className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h2 className="section-title">Register for the Event</h2>
          <div className="section-divider"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
            Don't miss this opportunity to enhance your knowledge, skills, and network in the finance and banking sector. Register now to secure your place at this must-attend event!
          </p>
        </motion.div>
        
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <RegistrationForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default RegistrationSection;