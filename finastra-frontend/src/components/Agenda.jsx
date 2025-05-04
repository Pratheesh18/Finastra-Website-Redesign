import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../utils/animations';
import { FiCalendar, FiClock, FiUser, FiCoffee, FiMessageSquare, FiLayers, FiUsers } from 'react-icons/fi';
import { agenda } from '../data/eventData';

function AgendaSection() {
  const { ref, controls, variants } = useScrollAnimation();
  const [activeAgendaItem, setActiveAgendaItem] = useState(null);
  
  const getAgendaIcon = (title) => {
    if (title.includes('Registration') || title.includes('Welcome')) return FiCoffee;
    if (title.includes('Opening') || title.includes('Closing')) return FiCalendar;
    if (title.includes('Keynote')) return FiUser;
    if (title.includes('Panel')) return FiUsers;
    if (title.includes('Lunch') || title.includes('Networking')) return FiUsers;
    if (title.includes('Showcase')) return FiLayers;
    return FiMessageSquare;
  };
  
  const getAgendaDescription = (title) => {
    if (title.includes('Registration')) 
      return "Arrive early to check in, receive your badge, and enjoy refreshments before the event begins.";
    if (title.includes('Opening')) 
      return "Welcome address and overview of the day's events.";
    if (title.includes('Keynote')) 
      return "An inspiring presentation on the future trends that will shape the banking industry in the coming years.";
    if (title.includes('Panel')) 
      return "Industry experts discuss the impact of emerging technologies on financial services.";
    if (title.includes('Lunch')) 
      return "A networking lunch with your peers and speakers.";
    if (title.includes('Showcase')) 
      return "Live demonstrations of innovative banking solutions and technologies.";
    if (title.includes('Closing')) 
      return "Wrap-up of key insights and opportunities to connect further.";
    return "Join us for this informative session.";
  };
  
  return (
    <section id="agenda" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 hidden lg:block"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-64 h-64 bg-purple-100 rounded-full opacity-10 hidden lg:block"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        
        <motion.div 
          className="text-center mb-12 relative z-10"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h2 className="section-title">Event Agenda</h2>
          <div className="section-divider"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Join us for a day packed with insights, discussions, and networking opportunities.
            Below is our agenda for the event.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative mt-20">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-8 top-8 bottom-0 w-0.5 bg-blue-200 hidden md:block"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Timeline items */}
          {agenda.map((item, index) => {
            const isActive = activeAgendaItem === index;
            const Icon = getAgendaIcon(item.title);
            
            return (
              <motion.div 
                key={index}
                className={`mb-12 relative ${index === agenda.length - 1 ? 'mb-0' : ''}`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                onMouseEnter={() => setActiveAgendaItem(index)}
                onMouseLeave={() => setActiveAgendaItem(null)}
              >
                <div className="flex flex-col md:flex-row items-start">
                  {/* Timeline icon */}
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    <motion.div 
                      className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} shadow-md border border-blue-100 cursor-pointer`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                      animate={isActive ? { boxShadow: "0 0 0 8px rgba(37, 99, 235, 0.2)" } : {}}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                  </div>
                  
                  {/* Timeline content */}
                  <div className="flex-grow md:ml-8">
                    <motion.div 
                      className={`bg-white rounded-xl shadow-lg overflow-hidden ${isActive ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
                      whileHover={{ y: -5, boxShadow: "0 12px 20px -5px rgba(59, 130, 246, 0.15)" }}
                      transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <FiClock className="text-blue-500 mr-2" />
                          <span className="text-blue-700 font-medium">{item.time}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        {item.speaker && (
                          <div className="flex items-center text-gray-700">
                            <FiUser className="text-gray-500 mr-2" />
                            <p>{item.speaker}</p>
                          </div>
                        )}
                        
                        {/* Pre-render all descriptions but only show the active one */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div 
                              key={`description-${index}`}
                              className="mt-4 text-sm text-gray-600 bg-gray-50 rounded-md p-3"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ 
                                opacity: { duration: 0.15 },
                                height: { duration: 0.2 },
                                ease: "easeInOut" 
                              }}
                            >
                              {getAgendaDescription(item.title)}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Animated timeline completion indicator */}
        <motion.div 
          className="max-w-4xl mx-auto mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-700 flex items-center">
            <FiCalendar className="mr-2" />
            <span>Full day event: 9:30 AM - 2:00 PM</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AgendaSection;