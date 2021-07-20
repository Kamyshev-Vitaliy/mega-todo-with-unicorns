const statusCodes = require('./statusCodes');

class MainError extends Error {
  constructor(message, errorType, statusCode) {
    super();
    this.message = message;
    this.errorType = errorType;
    this.statusCode = statusCode;
  }

  dataForSend() {
    return {
      status: 'error',
      error: {
        type: this.errorType,
        message: this.message
      }
    };
  }
}

class ValidationError extends MainError {
  constructor(errors) {
    super('Validation Error', 'ValidationError', statusCodes.BAD_REQUEST);
    this.errors = errors;
  }

  dataForSend() {
    return {
      status: 'error',
      error: {
        type: this.errorType,
        message: this.message,
        errors: this.errors
      }
    };
  }
}

class BadRequest extends MainError {
  constructor(message) {
    super(message, 'BadRequest', statusCodes.BAD_REQUEST);
  }
}
class NotFound extends MainError {
  constructor(message) {
    super(message, 'NotFound', statusCodes.NOT_FOUND);
  }
}
class InternalServerError extends MainError {
  constructor(message) {
    super(message, 'InternalServerError', statusCodes.INTERNAL_SERVER_ERROR);
  }
}
class UnauthorizedError extends MainError {
  constructor(message) {
    super(message, 'UnauthorizedError', statusCodes.UNAUTHORIZED);
  }
}
class TokenExpired extends MainError {
  constructor() {
    super('Token is expired', 'TokenExpired', statusCodes.UNAUTHORIZED);
  }
}
class TokenInvalid extends MainError {
  constructor() {
    super('Token is invalid', 'TokenInvalid', statusCodes.UNAUTHORIZED);
  }
}
module.exports = {
  MainError,
  BadRequest,
  NotFound,
  InternalServerError,
  UnauthorizedError,
  TokenExpired,
  TokenInvalid,
  ValidationError
};
