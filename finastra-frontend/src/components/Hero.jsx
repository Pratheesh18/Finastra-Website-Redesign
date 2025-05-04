import React,{useState,useEffect} from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import Button from '../components/Button';
import { eventDetails } from '../data/eventData';
import { useAnimation } from 'framer-motion';
import { floatAnimation, useParallax, useTypewriter, generateParticles } from '../utils/animations';



function HeroSection({ toggleRegistration }) {
  const controls = useAnimation();
  const parallax = useParallax(0.4);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const eventTitle = useTypewriter(eventDetails.title, 80);
  const [particles] = useState(generateParticles(30));
  
  useEffect(() => {
    controls.start('visible');
    
    // Start typewriter effect after a short delay
    const timer = setTimeout(() => {
      setShowTypewriter(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <div className="pt-16 overflow-hidden">
      <div className="relative h-screen min-h-[600px] bg-blue-900">
        {/* Animated Particles Background */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-blue-400 opacity-20"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                y: [0, 20, 0]
              }}
              transition={{
                duration: 3 + particle.size / 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-90"></div>
          <motion.div 
            className="relative h-full w-full"
            style={{ y: parallax.y }}
          >
            <div className="absolute inset-0 bg-[url('/images/banking-bg.jpg')] bg-cover bg-center opacity-30"></div>
          </motion.div>
        </div>

        {/* Animated Light Beam */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 sm:w-2 h-0 bg-blue-300 opacity-20"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: ['0%', '70%', '50%'],
            opacity: [0, 0.8, 0.2]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div 
            className="text-center sm:text-left"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.5 }
              }}
              className="mb-8"
            >
              <motion.div 
                className="w-20 h-20 mx-auto sm:mx-0 mb-4 rounded-full bg-white bg-opacity-10 flex items-center justify-center border border-blue-300 border-opacity-30"
                animate={floatAnimation}
              >
                <img src="/images/logo.png" alt="Logo" className="w-12 h-12" />
              </motion.div>
            </motion.div>

            <motion.p 
              className="text-blue-200 text-lg mb-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
            >
              organized by {eventDetails.organizer}
            </motion.p>

            <motion.h1 
              className="text-4xl sm:text-6xl font-bold text-white mb-4 leading-tight min-h-[80px] sm:min-h-[120px]"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.7 }
                }
              }}
            >
              {showTypewriter ? (
                <>
                  {eventTitle}
                  <motion.span 
                    className="inline-block w-3 h-8 sm:h-12 bg-blue-400 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                </>
              ) : (
                eventDetails.title
              )}
            </motion.h1>

            <motion.div 
              className="flex flex-col sm:flex-row items-center sm:items-start text-white space-y-4 sm:space-y-0 sm:space-x-8 mt-8"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              <motion.div 
                className="flex items-center"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 0.5 }
                  }
                }}
                whileHover={{ scale: 1.05 }}
              >
                <FiCalendar className="h-6 w-6 mr-3 text-blue-300" />
                <span className="text-lg">{eventDetails.date}</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 0.5 }
                  }
                }}
                whileHover={{ scale: 1.05 }}
              >
                <FiClock className="h-6 w-6 mr-3 text-blue-300" />
                <span className="text-lg">{eventDetails.time}</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 0.5 }
                  }
                }}
                whileHover={{ scale: 1.05 }}
              >
                <FiMapPin className="h-6 w-6 mr-3 text-blue-300" />
                <span className="text-lg">{eventDetails.location.name}, {eventDetails.location.city}</span>
              </motion.div>
            </motion.div>

            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.7,
                  delay: 1.2
                }
              }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  onClick={toggleRegistration}
                  className="px-8 py-4 text-lg rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform"
                >
                  <motion.a href='#register'>
                      Register Now
                  </motion.a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 2, duration: 1 }
              }}
            >
              <span className="text-blue-200 text-sm mb-2">Scroll to explore</span>
              <motion.div 
                className="w-6 h-10 border-2 border-blue-200 rounded-full flex justify-center pt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div 
                  className="w-1.5 h-1.5 bg-blue-200 rounded-full"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;