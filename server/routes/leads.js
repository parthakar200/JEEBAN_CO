const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/leads  — public (from register page)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email and phone are required' });
    }
    const lead = await Lead.create({ name, email, phone, service: service || '', message: message || '' });
    res.status(201).json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// GET /api/leads  — admin only
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 50, status } = req.query;
    const filter = status ? { status } : {};
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    const total = await Lead.countDocuments(filter);
    res.json({ success: true, leads, total });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/leads/:id  — admin update status/notes
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status, notes }, { new: true });
    res.json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/leads/:id  — admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
