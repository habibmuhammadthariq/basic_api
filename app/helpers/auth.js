const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.getHash = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

exports.checkHash = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

exports.generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: 86400 }) // one day 
}