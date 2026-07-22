const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Product = require('../models/Product');
const ProductDetails = require('../models/ProductDetails');
const Application = require('../models/Application');
const Enquiry = require('../models/Enquiry');
const Session = require('../models/Session');
const Log = require('../models/Log');

// Check admin role helper
const adminOnly = [protect, authorize('Admin')];

// Dashboard analytics & metrics
router.get('/dashboard-metrics', adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalEnquiries = await Enquiry.countDocuments();

    // Category breakdown logic
    const categoryCounts = await ProductDetails.aggregate([
      { $group: { _id: '$categorySuggested', count: { $sum: 1 } } }
    ]);
    const chartCategories = categoryCounts.map(item => ({
      name: item._id || 'General',
      value: item.count
    }));

    // Mock timeline for registrations
    const registrationTimeline = [
      { month: 'Feb', registrations: 12 },
      { month: 'Mar', registrations: 19 },
      { month: 'Apr', registrations: 32 },
      { month: 'May', registrations: 54 },
      { month: 'Jun', registrations: 78 },
      { month: 'Jul', registrations: totalUsers }
    ];

    // Mock pipelines success rate
    const pipelinePerformance = [
      { name: 'Uploads', count: totalProducts },
      { name: 'Segmentation', count: Math.round(totalProducts * 0.99) },
      { name: 'Color Harmonizer', count: Math.round(totalProducts * 0.98) },
      { name: 'Background Gen', count: Math.round(totalProducts * 0.97) },
      { name: 'Completed listings', count: totalProducts }
    ];

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalApplications,
        totalEnquiries
      },
      charts: {
        categories: chartCategories.length > 0 ? chartCategories : [{ name: 'None', value: 0 }],
        timeline: registrationTimeline,
        performance: pipelinePerformance
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all users
router.get('/users', adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user role
router.put('/users/:id/role', adminOnly, async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.role = role;
    await user.save();

    await Log.create({
      userId: req.user._id,
      action: 'ADMIN_USER_ROLE_CHANGE',
      details: `Updated role of ${user.email} to ${role}`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    return res.status(200).json({ success: true, message: 'User role updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new user (Admin manual add)
router.post('/users', adminOnly, async (req, res) => {
  const { fullName, email, mobileNumber, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });
    
    const user = await User.create({
      fullName,
      email,
      mobileNumber: mobileNumber || 'N/A',
      password,
      role: role || 'Student'
    });
    
    return res.status(201).json({ success: true, user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user details
router.put('/users/:id', adminOnly, async (req, res) => {
  const { fullName, email, mobileNumber, role, password } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (mobileNumber) user.mobileNumber = mobileNumber;
    if (role) user.role = role;
    if (password) user.password = password; // Will be hashed by pre-save hook

    await user.save();
    return res.status(200).json({ success: true, message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete user (Soft Delete)
router.delete('/users/:id', adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    await user.softDelete();
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all business incubator applications
router.get('/applications', adminOnly, async (req, res) => {
  try {
    const applications = await Application.find().populate('userId', 'fullName email').sort({ createdAt: -1 });
    return res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update application status
router.put('/applications/:id/status', adminOnly, async (req, res) => {
  const { status } = req.body;
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });

    application.status = status;
    await application.save();

    await Log.create({
      userId: req.user._id,
      action: 'ADMIN_APPLICATION_STATUS_CHANGE',
      details: `Updated application for ${application.businessName} to ${status}`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    return res.status(200).json({ success: true, message: `Application status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get enquiries
router.get('/enquiries', adminOnly, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update enquiry status
router.put('/enquiries/:id/status', adminOnly, async (req, res) => {
  const { status } = req.body;
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });

    enquiry.status = status;
    await enquiry.save();

    return res.status(200).json({ success: true, message: `Enquiry status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get system logs
router.get('/logs', adminOnly, async (req, res) => {
  try {
    const logs = await Log.find().populate('userId', 'fullName email').sort({ createdAt: -1 }).limit(100);
    return res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Export CSV / Data endpoint
router.get('/export/:type', adminOnly, async (req, res) => {
  const { type } = req.params;

  try {
    let data = [];
    let headers = '';
    let csvRows = [];

    if (type === 'users') {
      data = await User.find().select('fullName email mobileNumber role createdAt');
      headers = 'Full Name,Email,Mobile,Role,Created At\n';
      csvRows = data.map(item => `"${item.fullName}","${item.email}","${item.mobileNumber}","${item.role}","${item.createdAt.toISOString()}"`);
    } else if (type === 'applications') {
      data = await Application.find().select('businessName ownerName category phone email status createdAt');
      headers = 'Business Name,Owner,Category,Phone,Email,Status,Created At\n';
      csvRows = data.map(item => `"${item.businessName}","${item.ownerName}","${item.category}","${item.phone}","${item.email}","${item.status}","${item.createdAt.toISOString()}"`);
    } else if (type === 'enquiries') {
      data = await Enquiry.find().select('name email phone subject message status createdAt');
      headers = 'Name,Email,Phone,Subject,Message,Status,Created At\n';
      csvRows = data.map(item => `"${item.name}","${item.email}","${item.phone}","${item.subject}","${item.message.replace(/"/g, '""')}","${item.status}","${item.createdAt.toISOString()}"`);
    } else {
      return res.status(400).json({ success: false, message: 'Invalid export type. Must be users, applications, or enquiries.' });
    }

    const csvContent = headers + csvRows.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=export_${type}_${Date.now()}.csv`);
    return res.status(200).send(csvContent);

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
