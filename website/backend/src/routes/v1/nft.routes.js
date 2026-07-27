const express = require('express');
const router = express.Router();
const { getGenesisCollection, getNftById } = require('../../controllers/nft.controller');

router.get('/', getGenesisCollection);
router.get('/:id', getNftById);

module.exports = router;
