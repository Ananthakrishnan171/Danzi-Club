const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Log = require('../models/Log');

// Submit student dance application
router.post('/submit', async (req, res) => {
  const {
    fullName,
    name,
    firstName,
    lastName,
    email,
    phone,
    mobile,
    age,
    gender,
    course,
    style,
    batch,
    address,
    experience
  } = req.body;

  try {
    const applicantName = fullName || name || `${firstName || ''} ${lastName || ''}`.trim() || 'Anonymous Student';
    const applicantPhone = phone || mobile || 'N/A';
    const applicantEmail = email || 'no-email@danzi.com';
    const applicantCourse = course || style || 'Western & Contemporary';

    const application = await Application.create({
      fullName: applicantName,
      email: applicantEmail,
      phone: applicantPhone,
      age: age || '',
      gender: gender || '',
      course: applicantCourse,
      batch: batch || 'Morning',
      address: address || '',
      experience: experience || ''
    });

    console.log('New application saved to MongoDB Atlas:', application._id);

    try {
      await Log.create({
        action: 'APPLICATION_SUBMIT',
        details: `Submitted student application for '${applicantName}' (${applicantCourse})`,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      });
    } catch (logErr) {
      console.warn('Logging skipped:', logErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Admission application submitted and saved successfully!',
      application
    });

  } catch (error) {
    console.error('Error saving application to MongoDB Atlas:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// View all applications (Admin endpoint)
router.get('/all', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
