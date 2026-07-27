const { publicConfig } = require('../config/env');

const getPublicConfig = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: publicConfig,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicConfig,
};
