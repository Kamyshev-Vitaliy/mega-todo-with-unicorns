const { validationResult } = require('express-validator');
const { ValidationError } = require('../utills/Errors');

const validationHandler = (validationArray, key) => {
  const transformError = (req, res, next) => {
    const errorsResult = validationResult(req);
    if (!errorsResult.isEmpty()) {
      return next(new ValidationError(errorsResult.errors.map((error) => ({
        key,
        msg: error.msg,
        path: error.param
      }))));
    }
    return next();
  };
  return [...validationArray, transformError];
};
module.exports = validationHandler;
