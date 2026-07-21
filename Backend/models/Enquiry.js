const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, index: true, lowercase: true },
  phone: { type: String, required: true },
  businessType: { type: String, default: '' },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  preferredContactTime: { type: String, default: '' },
  status: { type: String, enum: ['New', 'Read', 'Responded'], default: 'New', index: true },
  isDeleted: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
});

enquirySchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Enquiry', enquirySchema);
