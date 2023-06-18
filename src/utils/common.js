const httpStatus = require('http-status');
const ApiError = require('./ApiError');
const { COMMON_USER_CENTER_MODULE_CODE, ERROR_RES_NOT_FOUND_CODE } = require('../constants/error-code');

const getIdByHeaderUser = (userString = '') => {
  const id = userString.split(':')?.[1];
  if (id) {
    return id;
  }
  throw new ApiError(httpStatus.NOT_FOUND, 'User not found', {
    errorCode: `${COMMON_USER_CENTER_MODULE_CODE}${ERROR_RES_NOT_FOUND_CODE}`
  });
};

module.exports = {
  getIdByHeaderUser
};
