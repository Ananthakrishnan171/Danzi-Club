const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const { limitRate } = require('../middleware/rateLimiter');

// Submit enquiry / contact message (Public endpoint)
router.post('/submit', limitRate(10), async (req, res) => {
  const { name, email, phone, mobile, businessType, subject, message, preferredContactTime } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide your name, email, and message' });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone: phone || mobile || 'N/A',
      businessType: businessType || '',
      subject: subject || 'General Contact Inquiry',
      message,
      preferredContactTime: preferredContactTime || 'Any time'
    });

    console.log(`[MongoDB Atlas] New contact enquiry saved: ${enquiry._id}`);

    return res.status(201).json({
      success: true,
      message: 'Your enquiry was received successfully and saved to MongoDB Atlas!',
      enquiryId: enquiry._id
    });
  } catch (error) {
    console.error('Error saving enquiry to MongoDB Atlas:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// View all enquiries (Admin endpoint)
router.get('/all', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
