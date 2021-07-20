const { body } = require('express-validator');

exports.authValidation = [
  body('login')
    .isLength({ min: 3 })
    .isString()
    .withMessage('Username should be at least 3 characters long')
    .isLength({ max: 30 })
    .withMessage('Username should be less than 30 characters')
    .notEmpty({ ignore_whitespace: false })
    .withMessage('Please input your username!'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .isLength({ max: 30 })
    .withMessage('Password length must not exceed 30 characters')
    .notEmpty({ ignore_whitespace: false })
    .withMessage('Please input your password!')

    .matches(/(?=.*[0-9])/)
    .withMessage('The password must contain at least one number')

    .matches(/(?=.*[!@#$%^&*])/)
    .withMessage('Password must contain at least one special character')

    .matches(/(?=.*[a-z])/)
    .withMessage('Password must contain at least one lowercase Latin letter')

    .matches(/(?=.*[A-Z])/)
    .withMessage('Password must contain at least one uppercase Latin letter')
];

exports.addTaskValidation = [
  body('text')
    .notEmpty({ ignore_whitespace: false }).withMessage('The task must have a name'),
  body('isChecked')
    .isBoolean().withMessage('Checked should be true or false')
];

exports.accessTaskValidation = [
  body('id')
    .notEmpty({ ignore_whitespace: false }).withMessage('Task id is required')
];
