const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { ValidationError } = require('../../utills/Errors');
const { BadRequest } = require('../../utills/Errors');

exports.postRegistration = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    if (await User.exists({ login })) {
      return next(new ValidationError([{
        key: 'registration',
        msg: 'User by this login already exits',
        path: 'password'
      }]));
    }
    const user = new User({ login, password });
    await user.save();
    return res.status(201).json({ message: 'Created' });
  }
  catch (error) {
    return next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return next(new ValidationError([{
        key: 'login',
        msg: 'User by login is not found',
        path: 'login'
      }]));
    }
    if (!(bcrypt.compare(password, user.password))) {
      return next(new ValidationError([{
        key: 'login',
        msg: 'Wrong password',
        path: 'password'
      }]));
    }
    const userJWT = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: process.env.ACTIVE_TIME });
    return res.status(200).json({ message: 'Successful login', jwt: userJWT });
  }
  catch (error) {
    return next(error);
  }
};
