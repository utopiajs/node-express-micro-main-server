const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const {
  ERROR_EMAIL_REPEATED_CODE,
  COMMON_USER_CENTER_MODULE_CODE,
  ERROR_RES_NOT_FOUND_CODE
} = require('../constants/error-code');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken', {
      errorCode: `${COMMON_USER_CENTER_MODULE_CODE}${ERROR_EMAIL_REPEATED_CODE}`
    });
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found', {
      errorCode: `${COMMON_USER_CENTER_MODULE_CODE}${ERROR_RES_NOT_FOUND_CODE}`
    });
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken', {
      errorCode: `${COMMON_USER_CENTER_MODULE_CODE}${ERROR_EMAIL_REPEATED_CODE}`
    });
  }
  // hack preferenceSetting
  let _preferenceSetting = user.preferenceSetting;
  if (updateBody.preferenceSetting) {
    _preferenceSetting = Object.assign(user.preferenceSetting, updateBody.preferenceSetting);
    user.markModified('preferenceSetting');
  }
  Object.assign(user, updateBody, { preferenceSetting: _preferenceSetting });
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found', {
      errorCode: `${COMMON_USER_CENTER_MODULE_CODE}${ERROR_RES_NOT_FOUND_CODE}`
    });
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById
};
