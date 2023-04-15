const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { MODULE_CODE, ERROR_VERIFICATION_FAILED_CODE } = require('../constants/error-code');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(
      new ApiError(httpStatus.BAD_REQUEST, errorMessage, {
        errorCode: `${MODULE_CODE}${ERROR_VERIFICATION_FAILED_CODE}`
      })
    );
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
