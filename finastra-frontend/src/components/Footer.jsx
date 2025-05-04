import React from 'react';
import { motion } from 'framer-motion';

function Footer({ toggleRegistration }) {
  return (
    <footer className="bg-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6">Join us for an unforgettable experience!</h2>
          <p className="text-blue-200 mb-8">Don't miss this opportunity to enhance your knowledge, skills, and network in the finance and banking sector.</p>
          <motion.button 
            onClick={toggleRegistration}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Today
          </motion.button>
        </motion.div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Finastra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;