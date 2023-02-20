const express = require('express')
const cors = require('cors')
require('dotenv').config()
const indexRouter = require('./routes/index')

const app = express()

const corsOptions = { origin: '*' }

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
 
const db = require('./models/index')
db.sequelize.authenticate()
  .then(() => { console.log('Database Synced') })
  .catch((err) => { console.log(`Failed to sync db : ${err.message}`)})
 
app.get('/', (req, res) => { res.json({ message: 'Welcome to Basic API' })})
app.get((req, res) => { res.json({ message: 'The url was wrong '}) } )

app.use('/api/', indexRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })