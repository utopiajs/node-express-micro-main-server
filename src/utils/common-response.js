// 请求结果统一处理
const { SUCCESS_CODE, MODULE_CODE, SUCCESS_MESSAGE } = require('../constants/error-code');

const handleResponse = (data = {}, { errorCode = `${MODULE_CODE}${SUCCESS_CODE}`, message = SUCCESS_MESSAGE } = {}) => {
  return {
    data,
    message,
    errorCode
  };
};

module.exports = handleResponse;
