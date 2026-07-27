const express = require('express');
const router = express.Router();

const healthRoutes = require('./health.routes');
const nftRoutes = require('./nft.routes');
const roadmapRoutes = require('./roadmap.routes');
const configRoutes = require('./config.routes');
const statsRoutes = require('./stats.routes');
const uploadRoutes = require('./upload.routes');

router.use('/health', healthRoutes);
router.use('/nfts', nftRoutes);
router.use('/roadmap', roadmapRoutes);
router.use('/config', configRoutes);
router.use('/stats', statsRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
