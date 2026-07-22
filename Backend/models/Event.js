const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  bannerImage: { type: String }, // URL or Base64 string
  category: { type: String },
  registrationLink: { type: String },
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

eventSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Event', eventSchema);
