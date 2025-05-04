import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../utils/animations';
import { FiMapPin } from 'react-icons/fi';
import { eventDetails } from '../data/eventData';

function LocationSection() {
  const { ref, controls, variants } = useScrollAnimation();
  
  return (
    <section id="location" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h2 className="section-title">Event Location</h2>
          <div className="section-divider"></div>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <div className="h-48 w-full md:w-64 bg-gray-300 relative">
                  <div className="absolute inset-0 bg-[url('/images/venue.jpg')] bg-cover bg-center"></div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900">{eventDetails.location.name}</h3>
                <p className="mt-2 text-gray-700">
                  {eventDetails.location.address}<br />
                  {eventDetails.location.city}, {eventDetails.location.country}
                </p>
                <div className="mt-6">
                  <motion.a 
                    href={eventDetails.location.mapsUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 font-medium flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMapPin className="h-5 w-5 mr-2" />
                    View on Google Maps
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;