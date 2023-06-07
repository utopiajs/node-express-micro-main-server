const express = require('express');
const auth = require('../../middlewares/auth');
const commonController = require('../../controllers/common.controller');
const validate = require('../../middlewares/validate');
const commonValidation = require('../../validations/common.validation');

const router = express.Router();

router.get('/static/bing-img', validate(commonValidation.getBingImg), commonController.getBingImageList);

module.exports = router;
