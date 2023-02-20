const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']

    if (!token) return res.status(401).send({ message: 'Access token must be provided' })

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) { 
        console.error(err); 

        let message = 'Invalid Access Token'
        if (err.message === 'jwt expired') message = 'Access Token has been expired'
        return res.status(401).send({ message }) 
      }

      req.user = user
      next()
    })
  } catch (error) {
    return next(error)
  }
} 
