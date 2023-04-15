const mongoose = require('mongoose');
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const handleResponse = require('../utils/common-response');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, { isOperational: false, stack: err.stack, errorCode: error.errorCode });
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res) => {
  let { statusCode, message } = err;
  const { errorCode } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  if (config.env === 'development') {
    logger.error(err);
  }

  res
    .status(statusCode)
    .send(
      handleResponse(config.env === 'development' ? { stack: err.stack } : {}, { errorCode: errorCode || statusCode, message })
    );
};

module.exports = {
  errorConverter,
  errorHandler
};
