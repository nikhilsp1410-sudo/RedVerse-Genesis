const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'RedVerse API is healthy and operational.',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;
