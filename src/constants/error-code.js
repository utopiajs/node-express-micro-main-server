// error_code由 模块+错误提示组成

const MODULE_CODE = '000000'; // 无实际意义
// 业务模块:TODO

// 公共模块
const COMMON_USER_CENTER_MODULE_CODE = '001000'; // 用户中心
const COMMON_AUTH_MODULE_CODE = '002000'; // 用户授权
const COMMON_TOOL_MODULE_CODE = '100000'; // 工具服务

// 错误码
const SUCCESS_CODE = '0000'; // 成功响应
const ERROR_UNAUTHENTICATE_CODE = '0401'; // 未授权
const ERROR_FORBIDDEN_CODE = '0403'; // 禁止访问
const ERROR_EMAIL_REPEATED_CODE = '4000'; // 邮箱资源重复
const ERROR_NAME_REPEATED_CODE = '4001'; // 用户名重复
const ERROR_TOKEN_NOT_FOUND_CODE = '4100'; // token 未找到
const ERROR_RES_NOT_FOUND_CODE = '0404'; // 请求资源没找到
const ERROR_RESET_FAILED_CODE = '4101'; // 重置失败
const ERROR_VERIFICATION_FAILED_CODE = '4102'; // 数据验证失败
const ERROR_SERVICE_EXCEPTION_CODE = '0500'; // 服务异常

// 错误信息
const SUCCESS_MESSAGE = '请求成功';
const SERVER_ERROR_MESSAGE = '服务器内部异常，请稍后重试';
const THIRD_PARTY_SERVICE_EXCEPTION_MESSAGE = '三方服务异常';

module.exports = {
  MODULE_CODE,
  COMMON_USER_CENTER_MODULE_CODE,
  COMMON_AUTH_MODULE_CODE,
  COMMON_TOOL_MODULE_CODE,
  SUCCESS_CODE,
  ERROR_UNAUTHENTICATE_CODE,
  ERROR_FORBIDDEN_CODE,
  ERROR_EMAIL_REPEATED_CODE,
  ERROR_NAME_REPEATED_CODE,
  ERROR_TOKEN_NOT_FOUND_CODE,
  ERROR_RES_NOT_FOUND_CODE,
  ERROR_RESET_FAILED_CODE,
  ERROR_VERIFICATION_FAILED_CODE,
  ERROR_SERVICE_EXCEPTION_CODE,
  SUCCESS_MESSAGE,
  SERVER_ERROR_MESSAGE,
  THIRD_PARTY_SERVICE_EXCEPTION_MESSAGE
};
