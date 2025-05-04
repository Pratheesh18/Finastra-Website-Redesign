import React from 'react';
import { motion } from 'framer-motion';

function Button({ children, primary = true, onClick, className = '', ...props }) {
  return (
    <motion.button
      onClick={onClick}
      className={`${primary ? 'btn-primary' : 'btn-secondary'} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;