const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  experience: { type: String },
  designation: { type: String },
  specialization: { type: String },
  biography: { type: String },
  socialLinks: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String }
  },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

instructorSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Instructor', instructorSchema);
