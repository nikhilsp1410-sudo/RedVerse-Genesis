const express = require('express');
const router = express.Router();
const { getPublicConfig } = require('../../controllers/config.controller');

router.get('/', getPublicConfig);

module.exports = router;
