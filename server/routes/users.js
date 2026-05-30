const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/users/profile
router.get('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json({ success: true, user });
});

// GET /api/users - Admin list all users
router.get('/', protect, adminOnly, async (req, res) => {
  const { page = 1, limit = 20, search } = req.query;
  const filter = search ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] } : {};
  const users = await User.find(filter).select('-password').limit(parseInt(limit)).skip((parseInt(page) - 1) * parseInt(limit));
  const total = await User.countDocuments(filter);
  res.json({ success: true, users, total });
});

// DELETE /api/users/:id - Admin delete user
router.delete('/:id', protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'User deleted' });
});

module.exports = router;
