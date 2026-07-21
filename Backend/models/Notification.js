const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['system', 'pipeline', 'session', 'application'], default: 'system' },
  isRead: { type: Boolean, default: false, index: true },
  isDeleted: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
});

notificationSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Notification', notificationSchema);
