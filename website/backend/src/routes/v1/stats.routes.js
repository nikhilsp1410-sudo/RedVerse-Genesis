const express = require('express');
const router = express.Router();
const { getStats, trackEvent } = require('../../controllers/stats.controller');

router.get('/', getStats);
router.post('/track', trackEvent);

module.exports = router;
