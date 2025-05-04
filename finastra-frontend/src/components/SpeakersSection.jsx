import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../utils/animations';
import SpeakerCard from './Speakers';
import { speakers } from '../data/eventData';

function SpeakersSection() {
  const { ref, controls, variants } = useScrollAnimation();
  
  return (
    <section id="speakers" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h2 className="section-title">Featured Speakers</h2>
          <div className="section-divider"></div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <SpeakerCard key={index} speaker={speaker} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpeakersSection;