const mongoose = require('mongoose');

const generatedImageSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  originalImageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', index: true },
  imageUrl: { type: String, required: true },
  type: { type: String, enum: ['background_removed', 'background_generated', 'mask', 'harmony'], required: true },
  promptUsed: { type: String, default: '' },
  dominantColors: [{ type: String }],
  isDeleted: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
});

generatedImageSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('GeneratedImage', generatedImageSchema);
