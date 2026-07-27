const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  phase: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Encrypted', 'Completed'],
    default: 'Pending'
  },
  order: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// Index to easily sort roadmap items
roadmapSchema.index({ order: 1 });

module.exports = mongoose.model('Roadmap', roadmapSchema);
