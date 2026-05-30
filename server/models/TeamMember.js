const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },   // base64 image data URL or initials
  isPinned: { type: Boolean, default: false }, // show as featured card above marquee
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },      // display order
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
