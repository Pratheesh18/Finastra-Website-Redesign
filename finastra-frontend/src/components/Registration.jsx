import React, { useState } from 'react';
import { motion} from 'framer-motion';
import { FiUser, FiMail, FiMessageSquare, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { itemFadeIn } from '../utils/animations';
import axios from 'axios';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState(null);
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    return errors;
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);

      const form = document.getElementById('registration-form');
      form.classList.add('animate-shake');
      setTimeout(() => {
        form.classList.remove('animate-shake');
      }, 500);
      
      return;
    }
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null
    });
    
    try {
      
      const response = await  axios.post(`${API_URL}/api/register`,formData,{
        headers : {
          'Content-Type' : 'application/json' 
        }
      })
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit registration');
      }
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      
      
      setFormData({
        fullName: '',
        email: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Registration error:', error);

      const errorMessage = error.response?.data?.message || error.message ||     'Something went wrong. Please try again later.';

      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: errorMessage
      });
    }
  };

  const formContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4 }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const iconCircleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 }
    }
  };

  if (formStatus.isSubmitted) {
    return (
      <motion.div 
        className="p-8 bg-gradient-to-b from-green-50 to-white rounded-lg border border-green-200 text-center shadow-lg"
        variants={successVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6"
          variants={iconCircleVariants}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <FiCheck className="h-10 w-10 text-green-600" />
          </motion.div>
        </motion.div>
        
        <motion.h3 
          className="text-2xl font-bold text-green-700 mb-3"
          variants={itemFadeIn}
        >
          Registration Successful!
        </motion.h3>
        
        <motion.p 
          className="text-green-600 mb-6"
          variants={itemFadeIn}
        >
          Thank you for registering for the event. We look forward to seeing you there!
        </motion.p>
        
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-md hover:shadow-lg font-medium transition-all duration-300"
          onClick={() => setFormStatus({ isSubmitting: false, isSubmitted: false, error: null })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemFadeIn}
        >
          Register Another
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      id="registration-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      variants={formContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="p-10">
        <motion.div 
          className="mb-6 text-center relative"
          variants={itemFadeIn}
        >
          {/* <h3 className="text-2xl font-bold text-gray-900 mb-2">Register for the Event</h3> */}
          {/* <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div> */}
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute w-3 h-3 rounded-full bg-blue-200 -left-1 top-2"
            animate={{ 
              y: [0, -5, 0],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="absolute w-2 h-2 rounded-full bg-purple-300 right-0 bottom-0"
            animate={{ 
              y: [0, 5, 0],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>
        
        {formStatus.error && (
          <motion.div 
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-600"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <FiAlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{formStatus.error}</span>
          </motion.div>
        )}
        
        <div className="space-y-5">
          {/* Full Name Field */}
          <motion.div variants={itemFadeIn}>
            <div className="mb-1 font-medium text-gray-700">
              <label htmlFor="fullName">Full Name</label>
            </div>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => setFocusedField('fullName')}
                onBlur={() => setFocusedField(null)}
                className={`pl-10 pr-3 py-3 w-full border ${formErrors.fullName ? 'border-red-500' : focusedField === 'fullName' ? 'border-blue-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                placeholder="Enter your full name"
              />
              {formErrors.fullName && (
                <motion.p 
                  className="mt-1 text-sm text-red-600 flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiAlertCircle className="h-3 w-3 mr-1" />
                  {formErrors.fullName}
                </motion.p>
              )}
            </div>
          </motion.div>
          
          {/* Email Field */}
          <motion.div variants={itemFadeIn}>
            <div className="mb-1 font-medium text-gray-700">
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`pl-10 pr-3 py-3 w-full border ${formErrors.email ? 'border-red-500' : focusedField === 'email' ? 'border-blue-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                placeholder="Enter your email address"
              />
              {formErrors.email && (
                <motion.p 
                  className="mt-1 text-sm text-red-600 flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiAlertCircle className="h-3 w-3 mr-1" />
                  {formErrors.email}
                </motion.p>
              )}
            </div>
          </motion.div>
          
          {/* Message Field */}
          <motion.div variants={itemFadeIn}>
            <div className="mb-1 font-medium text-gray-700">
              <label htmlFor="message">Message (Optional)</label>
            </div>
            <div className="relative">
              <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
              <textarea
                name="message"
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className={`pl-10 pr-3 py-3 w-full border ${focusedField === 'message' ? 'border-blue-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                placeholder="Any questions or comments about the event?"
              ></textarea>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8"
          variants={itemFadeIn}
        >
          <button
            type="submit"
            disabled={formStatus.isSubmitting}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium ${formStatus.isSubmitting ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'} shadow-md hover:shadow-lg transform transition-all duration-300`}
          >
            <motion.div 
              className="flex items-center justify-center"
              animate={formStatus.isSubmitting ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 1, repeat: formStatus.isSubmitting ? Infinity : 0 }}
            >
              {formStatus.isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <FiSend className="mr-2" />
                  Register Now
                </>
              )}
            </motion.div>
          </button>
        </motion.div>
      </div>
      
      {/* Animated accent bar at bottom of form */}
      <motion.div
        className="h-1.5 bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: formStatus.isSubmitting ? 1 : 0 }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: formStatus.isSubmitting ? 1.5 : 0 }}
      />
    </motion.form>
  );
}

export default RegistrationForm;