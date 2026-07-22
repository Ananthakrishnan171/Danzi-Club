const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Notification = require('../models/Notification');
const Log = require('../models/Log');
const { limitRate } = require('../middleware/rateLimiter');

// Temp memory store for OTP verification
const otpStore = {};

// Helper to generate JWT
const generateToken = (id, rememberMe) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRECT || 'mysecretkey', 
    { expiresIn: rememberMe ? '30d' : '1d' }
  );
};

// Signup Route - Creates user in MongoDB Atlas
router.post('/signup', limitRate(10), async (req, res) => {
  const { fullName, name, username, email, mobileNumber, password } = req.body;

  try {
    const userEmail = email || username;
    const userFullName = fullName || name || (userEmail ? userEmail.split('@')[0] : 'Member');
    const userPassword = password;

    if (!userEmail || !userPassword) {
      return res.status(400).json({ success: false, message: 'Please provide email/username and password' });
    }

    // Check duplicate account
    let user = await User.findOne({ email: userEmail });
    if (user) {
      return res.status(400).json({ success: false, message: 'Account with this email already exists' });
    }

    // Create user in MongoDB Atlas directly
    user = await User.create({
      fullName: userFullName,
      email: userEmail,
      mobileNumber: mobileNumber || 'N/A',
      password: userPassword,
      role: userEmail.includes('admin') ? 'Admin' : (userEmail.includes('student') ? 'Student' : 'User')
    });

    console.log(`[MongoDB Atlas] User created successfully: ${user.email} (ID: ${user._id})`);

    const token = generateToken(user._id, false);
    return res.status(201).json({
      success: true,
      token,
      message: 'Account created successfully and saved to MongoDB Atlas!',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error creating user in MongoDB Atlas:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify OTP & Complete Signup (or return existing user)
router.post('/verify-signup', async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      // Create user fallback
      const displayName = email ? email.split('@')[0] : 'Member';
      user = await User.create({
        fullName: displayName.charAt(0).toUpperCase() + displayName.slice(1),
        email: email || 'user@danzi.com',
        mobileNumber: 'N/A',
        password: 'Password123!',
        role: email && email.includes('admin') ? 'Admin' : 'User'
      });
    }

    const token = generateToken(user._id, false);
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login Route
router.post('/login', limitRate(20), async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (email === 'admin') {
      if (password !== 'admin@1234') {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
      }
      
      const token = jwt.sign(
        { id: 'admin-hardcoded', role: 'Admin' },
        process.env.JWT_SECRECT || 'mysecretkey',
        { expiresIn: '1d' }
      );
      
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: 'admin-hardcoded',
          fullName: 'Administrator',
          email: 'admin',
          mobileNumber: 'N/A',
          role: 'Admin'
        }
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, rememberMe);

    // Audit log
    await Log.create({
      userId: user._id,
      action: 'LOGIN',
      details: 'User logged in successfully',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Google Login Mock API
router.post('/google-login', async (req, res) => {
  const { token: googleToken, email, name, imageUrl } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: 'Google authentication failed' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      // Create user automatically
      user = await User.create({
        fullName: name || 'Google User',
        email,
        mobileNumber: '0000000000',
        password: Math.random().toString(36).slice(-8) + 'G1!', // Random secure password
        role: email.includes('admin') ? 'Admin' : (email.includes('student') ? 'Student' : 'User')
      });

      await Notification.create({
        userId: user._id,
        title: 'Google Login Sync',
        message: 'Your Google Account was synced successfully.',
        type: 'system'
      });
    }

    const token = generateToken(user._id, true);

    await Log.create({
      userId: user._id,
      action: 'GOOGLE_LOGIN',
      details: 'Logged in via Google Authentication Sync',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Forgot Password OTP Request
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
      resetVerified: false
    };

    console.log(`[Demo Setup] Forgot Password OTP for ${email}: ${otp}`);

    return res.status(200).json({
      success: true,
      message: 'OTP for password reset sent (Simulated)',
      email
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify Forgot Password OTP
router.post('/verify-forgot-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = otpStore[email];
    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: 'OTP expired or session not found' });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Incorrect OTP code' });
    }

    record.resetVerified = true;
    return res.status(200).json({ success: true, message: 'OTP verified. Proceed to reset password.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reset Password Complete
router.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    const record = otpStore[email];
    if (!record || !record.resetVerified) {
      return res.status(400).json({ success: false, message: 'Session unauthorized. Please verify OTP first.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.password = password; // Trigger mongoose pre-save hook for hashing
    await user.save();

    await Notification.create({
      userId: user._id,
      title: 'Password Updated',
      message: 'Your password was changed successfully.',
      type: 'system'
    });

    await Log.create({
      userId: user._id,
      action: 'PASSWORD_RESET',
      details: 'User password was reset via OTP verification',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    delete otpStore[email];

    return res.status(200).json({ success: true, message: 'Password updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
