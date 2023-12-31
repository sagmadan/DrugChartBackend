require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const medicineRoutes = require('./routes/medicines')
const scheduleRoutes = require('./routes/schedules')
const userRoutes = require('./routes/user')
const chartRoutes = require('./routes/chart')

// express app
const app = express()

// middleware
app.use(express.json())

// routes
app.use('/api/user', userRoutes)
app.use('/api/medicines', medicineRoutes)
app.use('/api/schedules', scheduleRoutes)
app.use('/api/charts', chartRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })