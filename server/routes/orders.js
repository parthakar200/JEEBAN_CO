const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Service = require('../models/Service');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/orders - Create order
router.post('/', protect, async (req, res) => {
  try {
    const { serviceId, businessDetails, paymentMethod } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

    const order = await Order.create({
      user: req.user._id,
      service: serviceId,
      businessDetails,
      payment: { amount: service.price.total, method: paymentMethod },
      timeline: [{ status: 'pending', message: 'Order created' }]
    });

    await order.populate('service', 'name category price');
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders - User's orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('service', 'name category slug price icon')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/orders/:id - Single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('service')
      .populate('user', 'name email phone');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/orders/:id/payment - Update payment status
router.put('/:id/payment', protect, async (req, res) => {
  try {
    const { transactionId, status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        'payment.transactionId': transactionId,
        'payment.status': status,
        'payment.paidAt': status === 'completed' ? new Date() : undefined,
        status: status === 'completed' ? 'in_progress' : 'payment_pending',
        $push: { timeline: { status: 'payment_completed', message: 'Payment received successfully' } }
      },
      { new: true }
    ).populate('service', 'name');
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/orders/:id/status - Admin update status
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status, message } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        $push: { timeline: { status, message } },
        ...(status === 'completed' ? { completedAt: new Date() } : {})
      },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/orders/admin/all - Admin view all orders
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .populate('service', 'name category')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    const total = await Order.countDocuments(filter);
    res.json({ success: true, orders, total });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
