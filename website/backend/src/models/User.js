const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isWhitelisted: {
    type: Boolean,
    default: false
  },
  profileImage: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
