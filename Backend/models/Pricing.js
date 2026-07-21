const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, unique: true, index: true },
  suggestedPrice: { type: Number, required: true },
  minPriceRange: { type: Number, required: true },
  maxPriceRange: { type: Number, required: true },
  competitorAverages: [{
    competitor: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  isDeleted: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
});

pricingSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Pricing', pricingSchema);
