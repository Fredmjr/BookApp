import express from 'express'
import { addBookHandler } from '../controllers/book.controllers.js'
const router = express.Router()
router.post('/addbook', addBookHandler)

export default router
