const BaseRepository = require('./BaseRepository');
const Roadmap = require('../models/Roadmap');

class RoadmapRepository extends BaseRepository {
  constructor() {
    super(Roadmap);
  }

  async getOrderedRoadmap() {
    return await this.find({}, { sort: { order: 1 } });
  }
}

module.exports = new RoadmapRepository();
