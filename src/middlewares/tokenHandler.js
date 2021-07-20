const jwt = require('jsonwebtoken');
const User = require('../auth/model/user');
const { UnauthorizedError } = require('../utills/Errors');

const tokenHandler = async (req, res, next) => {
  try {
    const token = req.header('Auth');
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return next(new UnauthorizedError('User by this token is not found'));
    }
    req.user = user;
    return next();
  }
  catch (error) {
    return next(error);
  }
};

module.exports = tokenHandler;
