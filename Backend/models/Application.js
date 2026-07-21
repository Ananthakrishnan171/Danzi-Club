const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  businessName: { type: String, required: true, trim: true },
  ownerName: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  gst: { type: String, default: '' },
  phone: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  productDetails: { type: String, required: true },
  productImageUrl: { type: String, default: '' },
  businessExperience: { type: String, required: true },
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
