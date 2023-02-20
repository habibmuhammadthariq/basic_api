const express = require('express')
const { verifyToken } = require('../middlewares/authMiddleware')
const authRouter = require('./authRouter')
const jobRouter = require('./jobRouter')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/jobs', verifyToken, jobRouter)

module.exports = router
