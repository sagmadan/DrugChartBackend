require('dotenv').config()

const express = require('express')
const medicineRoutes = require('./routes/medicines')

// express app
const app = express()

// middleware
app.use(express.json())

app.use('/api/medicines', medicineRoutes)

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})