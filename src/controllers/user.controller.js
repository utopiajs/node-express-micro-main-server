const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { getIdByHeaderUser } = require('../utils/common');
const { userService } = require('../services');
const handleResponse = require('../utils/common-response');
const { COMMON_USER_CENTER_MODULE_CODE, ERROR_RES_NOT_FOUND_CODE } = require('../constants/error-code');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(handleResponse(user));
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['search', 'role']);
  const options = pick(req.query, ['sortBy', 'pageSize', 'pageNum']);

  // 处理 search 字段
  const userListQuery = {
    $or: [{ name: { $regex: filter.search ?? '', $options: 'i' } }, { email: { $regex: filter.search ?? '', $options: 'i' } }]
  };

  // 处理 role
  if (filter.role) {
    userListQuery.role = { $eq: filter.role };
  }
  const result = await userService.queryUsers(userListQuery, options);
  res.send(handleResponse(result));
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.query.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found', {
      errorCode: `${COMMON_USER_CENTER_MODULE_CODE}${ERROR_RES_NOT_FOUND_CODE}`
    });
  }
  res.send(handleResponse(user));
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(getIdByHeaderUser(req.headers.user), req.body);
  res.send(handleResponse(user));
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.body.userIds);
  res.send(handleResponse());
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
