const formidable = require('formidable');
const catchAsync = require('../utils/catchAsync');
const handleResponse = require('../utils/common-response');
const { commonService } = require('../services');
const ApiError = require('../utils/ApiError');
const { COMMON_TOOL_MODULE_CODE, ERROR_SERVICE_EXCEPTION_CODE } = require('../constants/error-code');

const getBingImageList = catchAsync(async (req, res) => {
  const params = {
    idx: req.query.dayIndex || 0,
    n: req.query.days || 1
  };
  const data = await commonService.getStaticBingImage(params);
  res.send(handleResponse(data));
});

const uploadAvatar = async (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    if (!files.file) {
      next(
        new ApiError(500, 'file 参数校验错误', {
          errorCode: `${COMMON_TOOL_MODULE_CODE}${ERROR_SERVICE_EXCEPTION_CODE}`
        })
      );
      return;
    }
    const param = {
      file: files.file
    };
    const data = await commonService.uploadAvatarToOSS(param);
    res.json(handleResponse(data));
  });
};
module.exports = {
  getBingImageList,
  uploadAvatar
};
