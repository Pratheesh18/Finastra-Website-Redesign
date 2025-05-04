import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../utils/animations';
import { eventDetails } from '../data/eventData';

function AboutSection() {
  const { ref, controls, variants } = useScrollAnimation();
  
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h2 className="section-title">About The Event</h2>
          <div className="section-divider"></div>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          {eventDetails.about.map((paragraph, index) => (
            <motion.p 
              key={index}
              className="text-lg text-gray-700 mb-6 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;