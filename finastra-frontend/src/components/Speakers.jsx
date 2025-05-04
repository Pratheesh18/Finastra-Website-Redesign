import React ,{useState,useEffect}from 'react';
import { motion } from 'framer-motion';
import { FiUserPlus, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { useTiltEffect } from '../utils/animations';

function SpeakerCard({ speaker, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const tiltEffect = useTiltEffect();
  
  return (
    <motion.div 
      className="relative bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={tiltEffect.handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        tiltEffect.handleMouseLeave();
      }}
      style={{
        transform: isHovered ? tiltEffect.transform : "none",
        transition: "transform 0.2s ease-out"
      }}
    >
      {/* Glass effect top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
      
      <div className="p-6 flex flex-col items-center">
        {/* Avatar container with glow effect */}
        <div className="relative mb-6">
          <motion.div 
            className="absolute inset-0 rounded-full bg-blue-500 opacity-10"
            animate={{ 
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          />
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center shadow-md relative z-10">
            <FiUserPlus className="h-8 w-8 text-blue-700" />
          </div>
          
          {/* Decorative circles */}
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-200"
            animate={{ 
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? [0.5, 1, 0.5] : 0.5
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          />
          <motion.div 
            className="absolute bottom-0 -left-2 w-2 h-2 rounded-full bg-purple-200"
            animate={{ 
              scale: isHovered ? [1, 1.3, 1] : 1,
              opacity: isHovered ? [0.5, 1, 0.5] : 0.5
            }}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
          />
        </div>
        
        <motion.h3 
          className="text-xl font-semibold text-gray-900 text-center mb-2"
          animate={{ color: isHovered ? "#2563EB" : "#111827" }}
          transition={{ duration: 0.3 }}
        >
          {speaker.name}
        </motion.h3>
        
        <p className="text-gray-600 text-center text-sm mb-4">{speaker.title}</p>
        
        {/* Social media icons - appear on hover */}
        <motion.div 
          className="flex space-x-4 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.a 
            href="#" 
            className="text-blue-600 hover:text-blue-800"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiLinkedin size={18} />
          </motion.a>
          <motion.a 
            href="#" 
            className="text-blue-500 hover:text-blue-700"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiTwitter size={18} />
          </motion.a>
        </motion.div>
        
        {/* Border accent that animates on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </motion.div>
  );
}

export default SpeakerCard;