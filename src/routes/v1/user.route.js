const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

// get user list
router.get('/list', auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);
// get user info by user id
router.get('/info', auth('getUsers'), validate(userValidation.getUser), userController.getUser);
// create user
router.post('/create', auth('manageUsers'), validate(userValidation.createUser), userController.createUser);
// update user info
router.patch('/update', auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser);
// delete user
router.delete('/delete', auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
