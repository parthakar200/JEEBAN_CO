const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  service: { type: String, default: '' },   // selected service
  message: { type: String, default: '' },   // optional message
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'closed'],
    default: 'new'
  },
  notes: { type: String, default: '' },     // admin internal notes
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
