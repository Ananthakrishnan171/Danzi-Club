const mongoose = require('mongoose');

const complianceSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, unique: true, index: true },
  passed: { type: Boolean, default: true },
  rulesChecked: [{
    rule: { type: String, required: true },
    status: { type: String, enum: ['Passed', 'Warning', 'Failed'], required: true },
    comments: { type: String }
  }],
  certificationsNeeded: [{ type: String }],
  warnings: [{ type: String }],
  isDeleted: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
});

complianceSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Compliance', complianceSchema);
