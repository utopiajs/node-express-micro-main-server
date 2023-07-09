const Joi = require('joi');

const createRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string()
  })
};
module.exports = {
  createRole
};
