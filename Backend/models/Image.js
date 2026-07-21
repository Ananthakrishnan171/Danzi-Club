const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  imageUrl: { type: String, required: true },
  fileName: { type: String },
  fileSize: { type: Number },
  mimeType: { type: String },
  isDeleted: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
});

imageSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Image', imageSchema);
