const roadmapRepo = require('../repositories/RoadmapRepository');

const getRoadmap = async (req, res, next) => {
  try {
    const roadmap = await roadmapRepo.getOrderedRoadmap();
    res.status(200).json({ success: true, count: roadmap.length, data: roadmap });
  } catch (error) {
    next(error);
  }
};

const createRoadmapItem = async (req, res, next) => {
  try {
    const newItem = await roadmapRepo.create(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
};

const updateRoadmapItem = async (req, res, next) => {
  try {
    const updatedItem = await roadmapRepo.updateById(req.params.id, req.body);
    if (!updatedItem) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    next(error);
  }
};

const deleteRoadmapItem = async (req, res, next) => {
  try {
    const deletedItem = await roadmapRepo.deleteById(req.params.id);
    if (!deletedItem) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRoadmap, createRoadmapItem, updateRoadmapItem, deleteRoadmapItem };
