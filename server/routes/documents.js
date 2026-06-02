const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const { protect } = require('../middleware/auth');

// GET /api/documents
router.get('/', protect, async (req, res) => {
  const docs = await Document.find({ user: req.user._id }).sort({ uploadedAt: -1 });
  res.json({ success: true, documents: docs });
});

// POST /api/documents - Upload document record
router.post('/', protect, async (req, res) => {
  try {
    const { name, type, url, size, mimeType, orderId } = req.body;
    const doc = await Document.create({ user: req.user._id, order: orderId, name, type, url, size, mimeType });
    res.status(201).json({ success: true, document: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/documents/:id
router.delete('/:id', protect, async (req, res) => {
  const doc = await Document.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
  res.json({ success: true, message: 'Document deleted' });
});

module.exports = router;
