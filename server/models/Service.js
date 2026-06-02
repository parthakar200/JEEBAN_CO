const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: {
    type: String,
    enum: ['startup', 'gst', 'mca', 'income-tax', 'trademark', 'payroll', 'compliance', 'legal'],
    required: true
  },
  description: { type: String, required: true },
  shortDescription: String,
  price: {
    base: { type: Number, required: true },
    gst: { type: Number, default: 18 },
    governmentFee: { type: Number, default: 0 },
    total: Number
  },
  features: [String],
  documents: [String],
  timeline: String,
  process: [{
    step: Number,
    title: String,
    description: String
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  isPopular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  priceHidden: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  icon: String,
  banner: String,
  createdAt: { type: Date, default: Date.now }
});

// Calculate total price before save
serviceSchema.pre('save', function (next) {
  const gstAmount = (this.price.base * this.price.gst) / 100;
  this.price.total = this.price.base + gstAmount + (this.price.governmentFee || 0);
  next();
});

module.exports = mongoose.model('Service', serviceSchema);