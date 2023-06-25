const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { getIdByHeaderUser } = require('../utils/common');
const { roleRights } = require('../config/roles');
const { COMMON_AUTH_MODULE_CODE, ERROR_UNAUTHENTICATE_CODE, ERROR_FORBIDDEN_CODE } = require('../constants/error-code');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(
      new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate', {
        errorCode: `${COMMON_AUTH_MODULE_CODE}${ERROR_UNAUTHENTICATE_CODE}`
      })
    );
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && getIdByHeaderUser(req.headers.user) !== user.id) {
      return reject(
        new ApiError(httpStatus.FORBIDDEN, 'Forbidden', {
          errorCode: `${COMMON_AUTH_MODULE_CODE}${ERROR_FORBIDDEN_CODE}`
        })
      );
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
