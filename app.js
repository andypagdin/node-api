const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const db = (process.env.ENV === 'Test')
  ? mongoose.connect('mongodb://localhost/bookAPI-Test')
  : mongoose.connect('mongodb://localhost/bookAPI-Prod')

const Book = require('./models/bookModel')
const bookRouter = require('./routes/bookRouter')(Book)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', bookRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = app