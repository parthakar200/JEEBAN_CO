const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, lowercase: true, trim: true },
  phone:   { type: String, default: '' },
  service: { type: String, default: '' },
  message: { type: String, required: true },
  status:  { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
  notes:   { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
