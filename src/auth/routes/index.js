const express = require('express');
const authController = require('../controller/index');

const authRouter = express.Router();

const validationHandler = require('../../middlewares/validationHandler');
const { authValidation } = require('../../utills/validationConfig');

authRouter.post('/login', ...validationHandler(authValidation, 'login'), authController.postLogin);
authRouter.post('/registration', ...validationHandler(authValidation, 'registration'), authController.postRegistration);

module.exports = authRouter;
