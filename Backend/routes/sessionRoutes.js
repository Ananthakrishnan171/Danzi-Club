const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const Session = require('../models/Session');

// Pre-populate dummy training sessions if collection is empty
const seedSessions = async () => {
  const count = await Session.countDocuments();
  if (count === 0) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    await Session.create([
      {
        title: 'Masterclass: Photography for AI Image Synthesis',
        description: 'Learn how to capture raw photos that optimize U-Net, Stable Diffusion and background-removal pipelines for e-commerce listings.',
        instructor: 'Dr. Sarah Jenkins',
        scheduledTime: tomorrow,
        duration: 90,
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        resources: [
          { title: 'Ideal Studio Lighting Setup Guide', url: 'https://example.com/lighting.pdf', type: 'pdf' },
          { title: 'AI-Compatible Contrast Cheat Sheet', url: 'https://example.com/contrast.pdf', type: 'pdf' }
        ]
      },
      {
        title: 'Launch Strategy: Pricing & Compliance in EU Markets',
        description: 'Understand European trade guidelines, price markup optimization models, and standard hazard labeling regulations.',
        instructor: 'Marcus Vance, MBA',
        scheduledTime: nextWeek,
        duration: 60,
        meetingLink: 'https://meet.google.com/xyz-uvwx-yza',
        resources: [
          { title: 'EU Trade Compliance Checklist', url: 'https://example.com/eu-rules.pdf', type: 'pdf' }
        ]
      },
      {
        title: 'Complete Workshop: Customizing AI Listing Copywriting',
        description: 'Interactive workshop on modifying NLP templates, SEO keywords, and tailoring listings for Amazon/Shopify.',
        instructor: 'Deepak Kumar, Head of Product Growth',
        scheduledTime: yesterday, // Completed
        duration: 120,
        meetingLink: 'https://meet.google.com/pqr-stuv-wxy',
        resources: [
          { title: 'NLP Prompt Engineering Slides', url: 'https://example.com/prompts.pdf', type: 'slides' },
          { title: 'Recorded Session Video Link', url: 'https://example.com/recording-video', type: 'video' }
        ]
      }
    ]);
  }
};

// Seed sessions on import/initial load
seedSessions().catch(console.error);

// Get list of all sessions
router.get('/', protect, async (req, res) => {
  try {
    const sessions = await Session.find().sort({ scheduledTime: 1 });
    return res.status(200).json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create session (Admin only)
router.post('/', protect, authorize('Admin'), async (req, res) => {
  const { title, description, instructor, scheduledTime, duration, meetingLink, resources } = req.body;

  try {
    const session = await Session.create({
      title,
      description,
      instructor,
      scheduledTime,
      duration,
      meetingLink,
      resources
    });
    return res.status(201).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Student certificates route (simulated based on completed sessions)
router.get('/certificates', protect, async (req, res) => {
  try {
    // Return a mock certificate representing completed courses
    const certificates = [
      {
        id: 'CERT-2026-0941',
        title: 'Professional Product Photography & AI Pipeline Synthesis Certificate',
        recipient: req.user.fullName,
        issueDate: '2026-07-15',
        instructor: 'Dr. Sarah Jenkins',
        credentialUrl: 'https://example.com/credentials/cert-941'
      },
      {
        id: 'CERT-2026-0812',
        title: 'E-commerce Compliance and Smart Product Placement Certification',
        recipient: req.user.fullName,
        issueDate: '2026-07-02',
        instructor: 'Marcus Vance, MBA',
        credentialUrl: 'https://example.com/credentials/cert-812'
      }
    ];

    return res.status(200).json({ success: true, certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
