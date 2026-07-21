const mongoose = require('mongoose');

const packagingSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, unique: true, index: true },
  materialSuggested: { type: String, required: true },
  dimensionsSuggested: { type: String, required: true },
  ecoFriendly: { type: Boolean, default: true },
  description: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
});

packagingSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Packaging', packagingSchema);
