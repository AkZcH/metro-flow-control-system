const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/user.model');
const adminAuth = require('../middleware/adminAuth');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.status(200).json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Protected admin dashboard stats route
router.get('/stats', adminAuth, adminController.getAdminDashboardStats);

// Protected admin dashboard route
router.get('/dashboard', adminAuth, (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

// Add money to user wallet route
router.post('/add-money', adminAuth, async (req, res) => {
  const { email, amount } = req.body;

  if (!email || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid request format. Amount must be a positive number.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.walletBalance = (user.walletBalance || 0) + amount;
    await user.save();

    res.json({
      message: `Successfully added ₹${amount} to ${email}'s wallet.`,
      newBalance: user.walletBalance,
    });
  } catch (err) {
    console.error('Error adding money to wallet:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 