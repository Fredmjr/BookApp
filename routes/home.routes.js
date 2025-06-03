import express from 'express'
import { homeHandler } from '../controllers/home.controllers.js'
import bookModel from "../models/book.model.js"
const router = express.Router()

router.get('/home', (req, res)=>{
    res.render('index.hbs')
  })
  router.get('/login', (req, res)=>{
    res.render('components/login')
  })

  router.get('/test', (req, res)=>{
    res.render('pages/test')
  })
  
  //clg all the book from database
 router.get('/gallery', async (req, res) =>{
  try {
    const books = await bookModel.findAll();
    if(!books){
      res.status(404).send('No books found')
    }
    console.log(books)
    res.render('components/gallery', {
      'book': books
    })
  } catch (error) {
    console.log("something wrong happened while getting books")
    console.log(error)
  }
  })

    //clg all the book from database
 router.get('/adminbooks', async (req, res) =>{
  try {
    const books = await bookModel.findAll();
    if(!books){
      res.status(404).send('No books found')
    }
    console.log(books)
    res.render('components/adminbooks', {
      'book': books
    })
  } catch (error) {
    console.log("something wrong happened while getting books")
    console.log(error)
  }
  })


  router.get('/editpage', (req, res)=>{
    res.render('editpage')
  })
  router.get('/userpage', (req, res)=>{
    res.render('userpage')
  })

export default router
