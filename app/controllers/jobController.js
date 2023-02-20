const axios = require('axios')
const base_url = 'http://dev3.dansmultipro.co.id/api/recruitment'

const getQuery = (query='', term='') => {
  if (query) return `&${term}`
  return term
}

exports.jobLists = async (req, res) => {
  try {
    const { description='', location='', full_time='', page='' } = req.query
    let query = ''
    if (full_time) query += getQuery(query, `full_time=${full_time}`) 
    if (description) query += getQuery(query, `description=${description}`) 
    if (location) query += getQuery(query, `location=${location}`)
    if (page) query += getQuery(query, `page=${page}`)

    const jobs = await axios.get(`${base_url}/positions.json?${query}`)
    if (Object.keys(jobs.data).length === 0 && jobs.data.constructor === Object) return res.send({ message: 'Jobs not found'})

    res.send(jobs.data)
  } catch (error) {
    res.status(500).send('Failed to retrieved job lists data')
  }
}

exports.jobDetail = async (req, res) => {
  try {
    const { id } = req.params

    const job = await axios.get(`${base_url}/positions/${id}`)
    if (Object.keys(job.data).length === 0 && job.data.constructor === Object) return res.send({ message: 'Job not found'})
    
    res.send(job.data)
  } catch (error) {
    res.status(500).send('Failed to retrieved job detail')
  }
}