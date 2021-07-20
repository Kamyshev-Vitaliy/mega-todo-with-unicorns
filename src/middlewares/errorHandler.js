const jwt = require('jsonwebtoken');
const { InternalServerError } = require('../utills/Errors');
const { TokenInvalid } = require('../utills/Errors');
const { TokenExpired } = require('../utills/Errors');
const { MainError } = require('../utills/Errors');

const errorHandler = (err, req, res, next) => {
  let error;
  console.error(err);
  switch (true) {
    case err instanceof MainError:
      error = err;
      break;
    case err instanceof jwt.TokenExpiredError:
      error = new TokenExpired();
      break;
    case err instanceof jwt.JsonWebTokenError:
      error = new TokenInvalid();
      break;
    default:
      error = new InternalServerError('Internal server error');
      break;
  }
  return res.status(error.statusCode).json(error.dataForSend());
};
module.exports = errorHandler;
