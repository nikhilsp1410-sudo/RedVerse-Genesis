const Joi = require('joi');

const roadmapSchema = Joi.object({
  phase: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('Active', 'Pending', 'Encrypted', 'Completed').default('Pending'),
  order: Joi.number().integer().min(1).required(),
});

module.exports = { roadmapSchema };
