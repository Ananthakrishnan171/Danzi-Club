const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const Event = require('../models/Event');
const DanceClass = require('../models/DanceClass');
const Instructor = require('../models/Instructor');
const Gallery = require('../models/Gallery');
const PageContent = require('../models/PageContent');

// Reusable CRUD Factory
const createCRUD = (Model) => {
  const router = express.Router();

  // Public GET all
  router.get('/', async (req, res) => {
    try {
      const items = await Model.find();
      res.status(200).json({ success: true, data: items });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // Admin GET by ID
  router.get('/:id', protect, authorize('Admin'), async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });
      res.status(200).json({ success: true, data: item });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // Admin POST
  router.post('/', protect, authorize('Admin'), async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });

  // Admin PUT
  router.put('/:id', protect, authorize('Admin'), async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });
      res.status(200).json({ success: true, data: item });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });

  // Admin DELETE (Soft Delete)
  router.delete('/:id', protect, authorize('Admin'), async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  return router;
};

// Seed 10 Instructors if collection is empty
const seedInstructors = async () => {
  try {
    const count = await Instructor.countDocuments({ isDeleted: { $ne: true } });
    if (count === 0) {
      const initialInstructors = [
        {
          name: 'Sarah Jenkins',
          photo: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
          experience: '8+ Years',
          designation: 'Senior Lead Choreographer',
          specialization: 'Western & Contemporary',
          biography: 'Specializes in modern western routines, emotional storytelling, and fluid floor work. Trained in London & NYC.',
          socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', twitter: 'https://twitter.com' }
        },
        {
          name: 'Anand Sharma',
          photo: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=800',
          experience: '14+ Years',
          designation: 'Master Bharatanatyam Guru',
          specialization: 'Bharatanatyam Classical',
          biography: 'Master of ancient South Indian classical traditions, nritta, and intricate abhinaya expressions. Performed globally.',
          socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', twitter: 'https://twitter.com' }
        },
        {
          name: 'Elena Rostova',
          photo: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=800',
          experience: '12+ Years',
          designation: 'Principal Ballet Instructor',
          specialization: 'Classical Ballet & Opera',
          biography: 'Former soloist in European ballet academies. Specializes in posture alignment, pointe work, and stage presence.',
          socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', twitter: 'https://twitter.com' }
        },
        {
          name: 'Marcus "DJ" Cole',
          photo: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&q=80&w=800',
          experience: '9+ Years',
          designation: 'Urban Style Director',
          specialization: 'Hip Hop & Street Styles',
          biography: 'Renowned street dancer specializing in popping, locking, old-school hip hop grooves, and competitive team routines.',
          socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', twitter: 'https://twitter.com' }
        },
        {
          name: 'Leo "Spin" Vance',
          photo: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&q=80&w=800',
          experience: '10+ Years',
          designation: 'B-Boy Head Coach',
          specialization: 'Break Dance & Acrobatics',
          biography: 'Red Bull BC One finalist. Teaches high-velocity power moves, top-rocking, freezes, and safe breakdance mechanics.',
          socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', twitter: 'https://twitter.com' }
        },
        {
          name: 'Maria Gonzalez',
          photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
          experience: '7+ Years',
          designation: 'Master Zumba Trainer',
          specialization: 'Zumba & Latin Cardio',
          biography: 'Certified master Zumba instructor bringing high-energy Latin cardio, Salsa, and Merengue beats to every workout class.',
          socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', twitter: 'https://twitter.com' }
        },
        {
          name: 'Priya Natarajan',
          photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800',
          experience: '11+ Years',
          designation: 'Senior Kathak Exponent',
          specialization: 'Kathak & Indo-Western Fusion',
          biography: 'Renowned for lightning-fast spins (chakkars), complex rhythm cycles (tala), and blending Kathak with modern beats.',
          socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', twitter: 'https://twitter.com' }
        },
        {
          name: 'David "Apex" Miller',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
          experience: '8+ Years',
          designation: 'High-Intensity Street Instructor',
          specialization: 'Krump & Urban Dance',
          biography: 'Expressive, high-energy Krump and urban street dancer with music video, concert tour, and battle tournament credits.',
          socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', twitter: 'https://twitter.com' }
        },
        {
          name: 'Sophia Lin',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
          experience: '6+ Years',
          designation: 'Pop Choreography Specialist',
          specialization: 'K-Pop & Jazz Funk',
          biography: 'Expert in sharp formation transitions, facial expressions, and mastering trending K-Pop idol routines and Jazz Funk style.',
          socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', twitter: 'https://twitter.com' }
        },
        {
          name: 'Carlos Ramos',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
          experience: '10+ Years',
          designation: 'Partnering & Social Dance Lead',
          specialization: 'Salsa & Sensual Bachata',
          biography: 'Passion Latin dancer teaching Cuban Salsa, Sensual Bachata, partner leading/following techniques, and musicality.',
          socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', twitter: 'https://twitter.com' }
        }
      ];
      await Instructor.insertMany(initialInstructors);
    }
  } catch (err) {
    console.error('Error auto-seeding instructors:', err);
  }
};
seedInstructors();

// Map CRUD routers
router.use('/events', createCRUD(Event));
router.use('/classes', createCRUD(DanceClass));
router.use('/instructors', createCRUD(Instructor));
router.use('/gallery', createCRUD(Gallery));

// Page Content (Special Handling)
router.get('/content/:page', async (req, res) => {
  try {
    const pageContent = await PageContent.findOne({ page: req.params.page });
    res.status(200).json({ success: true, data: pageContent ? pageContent.content : null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/content/:page', protect, authorize('Admin'), async (req, res) => {
  try {
    const pageContent = await PageContent.findOneAndUpdate(
      { page: req.params.page },
      { content: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: pageContent.content });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
