const httpStatus = require('http-status');
const xml2js = require('xml2js');
const request = require('../utils/request');
const ApiError = require('../utils/ApiError');
const { THIRD_PARTY_SERVICE_EXCEPTION_MESSAGE, ERROR_SERVICE_EXCEPTION_CODE, MODULE_CODE } = require('../constants/error-code');

const getStaticBingImage = async (params) => {
  try {
    const res = await request({
      url: 'https://bing.com/HPImageArchive.aspx',
      params
    });

    const result = await new Promise((resolve, reject) => {
      xml2js.parseString(res, { trim: true, explicitArray: false }, (err, _result) => {
        if (err) {
          reject(err);
        }
        resolve(params.n === 1 ? [_result?.images?.image] : _result?.images?.image);
      });
    });
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, error.message || THIRD_PARTY_SERVICE_EXCEPTION_MESSAGE, {
      errorCode: `${MODULE_CODE}${ERROR_SERVICE_EXCEPTION_CODE}`
    });
  }
};

module.exports = {
  getStaticBingImage
};
