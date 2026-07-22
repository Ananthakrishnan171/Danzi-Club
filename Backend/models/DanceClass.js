const mongoose = require('mongoose');

const danceClassSchema = new mongoose.Schema({
  className: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  ageGroup: { type: String },
  trainer: { type: String },
  price: { type: Number },
  schedule: { type: String },
  image: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

danceClassSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('DanceClass', danceClassSchema);
