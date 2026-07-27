const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
    default: () => new Date().setHours(0, 0, 0, 0), // Default to today's midnight
  },
  pageViews: {
    type: Number,
    default: 0,
  },
  walletConnections: {
    type: Number,
    default: 0,
  },
  mintAttempts: {
    type: Number,
    default: 0,
  },
  mintSuccesses: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Analytics', analyticsSchema);
