import express from 'express'
import { homeHandler } from '../controllers/home.controllers.js'
const router = express.Router()
router.get('/login', homeHandler)

router.get('/bookapp', (req, res)=>{
    res.render('bookapp')
  })
  router.get('/adminpage', (req, res)=>{
    res.render('adminpage')
  })
  router.get('/test', (req, res)=>{
    res.render('pages/test')
  })
  
  router.get('/createpage', (req, res)=>{
    res.render('createpage')
  })
  router.get('/editpage', (req, res)=>{
    res.render('editpage')
  })
  router.get('/userpage', (req, res)=>{
    res.render('userpage')
  })

export default router
