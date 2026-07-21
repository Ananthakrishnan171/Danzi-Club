const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  keyword: { type: String, required: true, trim: true },
  relevanceScore: { type: Number, default: 1.0 },
  isDeleted: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
});

keywordSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Keyword', keywordSchema);
