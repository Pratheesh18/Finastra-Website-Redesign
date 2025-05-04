import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = (scrollPosition / totalHeight) * 100;
      
      setScrollProgress(scrollPercentage);
      
      if (scrollPosition > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 z-50"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
          title="Scroll back to top"
        >
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90" 
            viewBox="0 0 100 100"
          >
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="5" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="white" 
              strokeWidth="5" 
              strokeDasharray="283" 
              strokeDashoffset={283 - (283 * scrollProgress) / 100} 
              strokeLinecap="round" 
            />
          </svg>
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500 opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <FiArrowUp className="h-6 w-6 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTopButton;