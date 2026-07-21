const mongoose = require('mongoose');

const productDetailsSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, unique: true, index: true },
  seoTitle: { type: String, required: true, trim: true },
  seoDescription: { type: String, required: true, trim: true },
  categorySuggested: { type: String, required: true, index: true },
  bulletPoints: [{ type: String }],
  isDeleted: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
});

productDetailsSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('ProductDetails', productDetailsSchema);
