const express = require('express')
const { login } = require('../controllers/authController')
const { validate } = require('../validators')
const { loginValidation } = require('../validators/authValidator')

const authRouter = express.Router()

authRouter.post('/login', validate(loginValidation), login)

module.exports = authRouter 