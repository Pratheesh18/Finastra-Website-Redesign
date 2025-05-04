const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');


router.post('/register', async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    
    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both name and email'
      });
    }
    const existingRegistration = await Registration.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered for the event'
      });
    }

    const registration = new Registration({
      fullName,
      email,
      message: message || ''
    });

    await registration.save();

    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        id: registration._id,
        fullName: registration.fullName,
        email: registration.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

router.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find()
      .select('-__v')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Could not fetch registrations',
      error: error.message
    });
  }
});

module.exports = router;