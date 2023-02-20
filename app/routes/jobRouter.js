const express = require('express')
const { jobLists, jobDetail } = require('../controllers/jobController')

const jobRouter = express.Router()

jobRouter.get('/', jobLists)
jobRouter.get('/:id', jobDetail)

module.exports = jobRouter