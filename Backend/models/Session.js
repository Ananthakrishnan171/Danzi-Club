const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  scheduledTime: { type: Date, required: true, index: true },
  duration: { type: Number, required: true }, // minutes
  meetingLink: { type: String, default: '' },
  resources: [{
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['video', 'pdf', 'slides', 'link'], default: 'link' }
  }],
  isDeleted: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
});

sessionSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

module.exports = mongoose.model('Session', sessionSchema);
