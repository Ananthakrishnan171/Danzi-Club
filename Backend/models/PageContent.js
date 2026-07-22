const mongoose = require('mongoose');

// Unified model for storing JSON config for various pages
const pageContentSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true }, // e.g., 'home', 'about', 'contact'
  content: { type: mongoose.Schema.Types.Mixed, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('PageContent', pageContentSchema);
