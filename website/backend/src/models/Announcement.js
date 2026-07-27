const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Admin'
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index to sort by latest announcements easily
announcementSchema.index({ publishedAt: -1 });

module.exports = mongoose.model('Announcement', announcementSchema);
