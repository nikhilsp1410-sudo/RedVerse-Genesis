const express = require('express');
const router = express.Router();
const { getRoadmap, createRoadmapItem, updateRoadmapItem, deleteRoadmapItem } = require('../../controllers/roadmap.controller');
const validateRequest = require('../../middleware/validateRequest');
const { roadmapSchema } = require('../../utils/validators');

router.route('/')
  .get(getRoadmap)
  .post(validateRequest(roadmapSchema), createRoadmapItem);

router.route('/:id')
  .put(validateRequest(roadmapSchema), updateRoadmapItem)
  .delete(deleteRoadmapItem);

module.exports = router;
