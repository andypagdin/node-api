const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000
const bookRouter = express.Router()
const db = mongoose.connect('mongodb://localhost/bookAPI')

const Book = require('./models/bookModel')

bookRouter.route('/books')
  .get((req, res) => {
    const query = {}
    if (req.query.genre) {
      query.genre = req.query.genre
    }
    Book.find(query, (err, books) => {
      return err ? res.send(err) : res.json(books)
    })
  })

bookRouter.route('/books/:bookId')
.get((req, res) => {
  Book.findById(req.params.bookId, (err, book) => {
    return err ? res.send(err) : res.json(book)
  })
})

app.use('/api', bookRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})