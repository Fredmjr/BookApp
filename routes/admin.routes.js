import express from 'express'
import { addBookHandler, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/book.controllers.js'
const router = express.Router()
router.post('/addbook', addBookHandler)
router.get('/books', getAllBooks)
router.get('/book/:id', getBookById)
router.patch('/updatebook/:id', updateBook)
router.delete('/deletebook/:id', deleteBook)
export default router
