const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  status: {
    type: String,
    enum: ['pending', 'payment_pending', 'in_progress', 'document_pending', 'under_review', 'completed', 'cancelled'],
    default: 'pending'
  },
  payment: {
    amount: Number,
    currency: { type: String, default: 'INR' },
    method: { type: String, enum: ['razorpay', 'stripe', 'upi', 'netbanking'] },
    transactionId: String,
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    paidAt: Date
  },
  documents: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  }],
  assignedProfessional: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: String,
  timeline: [{
    status: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
  }],
  businessDetails: {
    businessName: String,
    directors: [{ name: String, din: String, pan: String }],
    address: String,
    state: String,
    pincode: String
  },
  completedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate order ID
orderSchema.pre('save', function (next) {
  if (!this.orderId) {
    this.orderId = 'IF' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
