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

module.exports = {
  getBingImageList
};
