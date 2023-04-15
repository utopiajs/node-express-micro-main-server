const express = require('express');
const commonController = require('../../controllers/common.controller');

const router = express.Router();

router.get('/static/bing-img', commonController.getBingImageList);

module.exports = router;
