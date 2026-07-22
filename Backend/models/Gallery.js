const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  mediaType: { type: String, enum: ['Image', 'Video'], default: 'Image' },
  url: { type: String, required: true }, // URL or Base64
  albumName: { type: String, default: 'General' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

gallerySchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Gallery', gallerySchema);
