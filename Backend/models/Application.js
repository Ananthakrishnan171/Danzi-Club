const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  age: { type: String, default: '' },
  gender: { type: String, default: '' },
  course: { type: String, required: true, trim: true },
  batch: { type: String, default: 'Morning' },
  address: { type: String, default: '' },
  experience: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Under Review', 'Approved', 'Rejected'], default: 'Pending', index: true },
  isDeleted: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
});

applicationSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Application', applicationSchema);
