const formidable = require('formidable');
const catchAsync = require('../utils/catchAsync');
const handleResponse = require('../utils/common-response');
const { commonService } = require('../services');

const getBingImageList = catchAsync(async (req, res) => {
  const params = {
    idx: req.query.dayIndex || 0,
    n: req.query.days || 1
  };
  const data = await commonService.getStaticBingImage(params);
  res.send(handleResponse(data));
});

const uploadAvatar = catchAsync(async (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const param = {
      file: files.file
    };
    const data = await commonService.uploadAvatarToOSS(param);
    console.log(data);
    res.json({ fields, files, data });
  });
});
module.exports = {
  getBingImageList,
  uploadAvatar
};
