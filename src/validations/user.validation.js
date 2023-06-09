const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin')
  })
};

const getUsers = {
  query: Joi.object().keys({
    search: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    pageSize: Joi.number().integer(),
    pageNum: Joi.number().integer()
  })
};

const getUser = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId)
  })
};

const updateUser = {
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      preferenceSetting: Joi.object({
        theme: Joi.string().valid('light', 'dark'),
        colorPrimary: Joi.string(),
        borderRadius: Joi.number()
      })
    })
    .min(1)
};

const deleteUser = {
  body: Joi.object().keys({
    userIds: Joi.array().items(Joi.string().custom(objectId))
  })
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
