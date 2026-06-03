const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/services - All services (with filters)
router.get('/', async (req, res) => {
  try {
    const { category, search, popular, limit = 20, page = 1 } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (popular === 'true') filter.isPopular = true;
    if (search) filter.$text = { $search: search };

    const services = await Service.find(filter)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-faqs -process');

    const total = await Service.countDocuments(filter);
    res.json({ success: true, services, total, page: parseInt(page) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/services - Admin create service
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/services/slug/:slug - Admin update by slug (used for priceHidden toggle)
// NOTE: Must be registered BEFORE GET /:slug to avoid Express treating "slug" as a :slug param
router.patch('/slug/:slug', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/services/:slug - Single service
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, service });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/services/:id - Admin update service
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/services/category/:cat - Services by category
router.get('/category/:cat', async (req, res) => {
  try {
    const services = await Service.find({ category: req.params.cat, isActive: true });
    res.json({ success: true, services });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;