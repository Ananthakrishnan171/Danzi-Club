const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, default: null },
  action: { type: String, required: true },
  details: { type: String, default: '' },
  ipAddress: { type: String },
  userAgent: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Log', logSchema);
