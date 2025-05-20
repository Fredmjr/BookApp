import express from 'express'
import { homeHandler } from '../controllers/home.controllers.js'
import { createUser, authentication } from '../controllers/user.controllers.js'
const router = express.Router()
router.get('/', homeHandler)
router.post('/signup', createUser)
router.post('/login', authentication)

export default router
