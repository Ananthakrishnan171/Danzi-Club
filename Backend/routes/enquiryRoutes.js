const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const { limitRate } = require('../middleware/rateLimiter');

// Submit enquiry (Public endpoint)
router.post('/submit', limitRate(10), async (req, res) => {
  const { name, email, phone, businessType, subject, message, preferredContactTime } = req.body;

  try {
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, phone, subject, and message' });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      businessType: businessType || '',
      subject,
      message,
      preferredContactTime: preferredContactTime || 'Any time'
    });

    console.log(`[Demo Contact Email Log] Sent alert email regarding contact request ID: ${enquiry._id}`);

    return res.status(201).json({
      success: true,
      message: 'Your enquiry was received successfully. We will contact you soon!',
      enquiryId: enquiry._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
