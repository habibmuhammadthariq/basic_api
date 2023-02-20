const { body } = require("express-validator")

exports.loginValidation = [
  body('username').notEmpty().withMessage('Field username can not be empty'),
  body('password').notEmpty().withMessage('Field password can not be empty'),
]
