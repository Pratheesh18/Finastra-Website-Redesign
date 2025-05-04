import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        duration: 0.5 
      }
    }
  };
  
  const menuVariants = {
    closed: { 
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    },
    open: { 
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav 
      className={`fixed w-full z-10 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-blue-900 bg-opacity-80 py-4'}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <motion.div 
              className="text-xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cogent Solutions
            </motion.div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <motion.a 
              href="#about" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled ? 'text-gray-700 hover:text-blue-700' : 'text-white hover:text-blue-200'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.a>
            <motion.a 
              href="#speakers" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled ? 'text-gray-700 hover:text-blue-700' : 'text-white hover:text-blue-200'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Speakers
            </motion.a>
            <motion.a 
              href="#agenda" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled ? 'text-gray-700 hover:text-blue-700' : 'text-white hover:text-blue-200'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Agenda
            </motion.a>
            <motion.a 
              href="#location" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled ? 'text-gray-700 hover:text-blue-700' : 'text-white hover:text-blue-200'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Location
            </motion.a>
            <motion.a 
              href="#register" 
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="text-white p-2"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <motion.div 
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          <a 
            href="#about" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50"
            onClick={toggleMenu}
          >
            About
          </a>
          <a 
            href="#speakers" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50"
            onClick={toggleMenu}
          >
            Speakers
          </a>
          <a 
            href="#agenda" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50"
            onClick={toggleMenu}
          >
            Agenda
          </a>
          <a 
            href="#location" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50"
            onClick={toggleMenu}
          >
            Location
          </a>
          <a 
            href="#register" 
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-700 hover:bg-blue-800 mt-2 py-2 text-center"
            onClick={toggleMenu}
          >
            Register Now
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Header;