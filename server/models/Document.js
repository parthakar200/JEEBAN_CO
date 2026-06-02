const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['aadhaar', 'pan', 'passport', 'voter_id', 'driving_license', 'certificate', 'utility_bill', 'bank_statement', 'other'],
    required: true
  },
  url: { type: String, required: true },
  size: Number,
  mimeType: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  rejectionReason: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
