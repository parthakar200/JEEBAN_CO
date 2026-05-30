const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/team  — public
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, members });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/team/all  — admin (all, including inactive)
router.get('/all', protect, adminOnly, async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, members });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/team  — admin create
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, role, email, phone, bio, avatar, order } = req.body;
    if (!name || !role) return res.status(400).json({ success: false, message: 'Name and role required' });
    const member = await TeamMember.create({ name, role, email, phone, bio, avatar, order: order || 0 });
    res.status(201).json({ success: true, member });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/team/:id  — admin update
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, member });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/team/:id  — admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
