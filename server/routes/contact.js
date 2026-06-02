const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/contact  — public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, service } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });

    const msg = await ContactMessage.create({ name, email, phone: phone || '', service: service || '', message });
    res.json({ success: true, message: 'Thank you! We will get back to you within 24 hours.', id: msg._id });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/contact  — admin only
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 }).limit(100);
    const total = await ContactMessage.countDocuments(filter);
    res.json({ success: true, messages, total });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/contact/:id  — admin update status/notes
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { status, notes }, { new: true });
    res.json({ success: true, message: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/contact/:id  — admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
