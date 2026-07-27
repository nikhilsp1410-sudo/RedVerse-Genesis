class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findOne(query) {
    return await this.model.findOne(query);
  }

  async find(query = {}, options = {}) {
    let mQuery = this.model.find(query);
    if (options.sort) mQuery = mQuery.sort(options.sort);
    if (options.limit) mQuery = mQuery.limit(options.limit);
    if (options.skip) mQuery = mQuery.skip(options.skip);
    return await mQuery.exec();
  }

  async updateById(id, data, options = { new: true, runValidators: true }) {
    return await this.model.findByIdAndUpdate(id, data, options);
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
