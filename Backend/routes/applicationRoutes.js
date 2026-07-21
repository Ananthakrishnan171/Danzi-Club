const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Application = require('../models/Application');
const Log = require('../models/Log');

// Submit small business incubator application
router.post('/submit', protect, async (req, res) => {
  const {
    businessName,
    ownerName,
    category,
    address,
    gst,
    phone,
    email,
    productDetails,
    productImageUrl,
    businessExperience
  } = req.body;

  try {
    // Validate required fields
    if (!businessName || !ownerName || !category || !address || !phone || !email || !productDetails || !businessExperience) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    const application = await Application.create({
      userId: req.user._id,
      businessName,
      ownerName,
      category,
      address,
      gst: gst || '',
      phone,
      email,
      productDetails,
      productImageUrl: productImageUrl || '',
      businessExperience
    });

    await Log.create({
      userId: req.user._id,
      action: 'APPLICATION_SUBMIT',
      details: `Submitted incubator application for '${businessName}' (ID: ${application._id})`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    return res.status(201).json({
      success: true,
      message: 'Incubation Program application submitted successfully!',
      application
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// View own applications
router.get('/my-applications', protect, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
