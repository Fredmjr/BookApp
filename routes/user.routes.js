import express from 'express'
import { homeHandler } from '../controllers/home.controllers.js'
const router = express.Router()
router.get('/', homeHandler)
router.get('/login', homeHandler)

export default router
