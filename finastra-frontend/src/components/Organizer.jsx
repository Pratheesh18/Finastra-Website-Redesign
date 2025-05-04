import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../utils/animations';
import { eventDetails } from '../data/eventData';

function OrganizerSection() {
  const { ref, controls, variants } = useScrollAnimation();
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h2 className="section-title">About The Organizer</h2>
          <div className="section-divider"></div>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <p className="text-lg text-gray-700 mb-6">
              {eventDetails.organizerInfo}
            </p>
            <motion.a 
              href={eventDetails.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-700 hover:text-blue-900 font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Learn more at {eventDetails.website.replace('https://', '')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default OrganizerSection;