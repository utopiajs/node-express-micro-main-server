const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { roleValidation } = require('../../validations/index');

const router = express.Router();

// create role
router.post('/create', auth(''), validate(roleValidation.createRole));
