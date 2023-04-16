const Joi = require('joi');

const getBingImg = {
  query: Joi.object().keys({
    dayIndex: Joi.number().min(0).max(7).integer(),
    days: Joi.number().min(1).max(8).integer()
  })
};

module.exports = {
  getBingImg
};
