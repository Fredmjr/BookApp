import bookModel from "../models/book.model.js"
//creating a book with tile & file res with mgs book created and an error being clg
export const addBookHandler = async (req, res) => {
  const { title, file } = req.body
  if(!title || !file){
    res.status(406).send('Title or File is empty')
  }
  try {
    await bookModel.create({
      title,
      file
    })
    res.send("book created")
  }
  catch (error) {
    console.log(error)
    res.send('something wrong happened while creating the book')
  }
} 

//clg all the book from database
export const getAllBooks = async (req, res) =>{
try {
  const books = await bookModel.findAll();
  if(!books){
    res.status(404).send('No books found')
  }
  console.log(books)
  res.send(books)
} catch (error) {
  console.log("something wrong happened while getting books")
}
}

//getting individual book
export const getBookById = async (req, res) =>{
  let id = req.params.id
  if(!id){
    res.status(406).send('id is empty')
  }
  try {
    const book = await bookModel.findByPk(id)
    if(!book){
      res.send(404).send("No book found")
    }
    res.send(book)
    console.log(book)
  } catch (error) {
    res.send("something wrong happened while getting the book")
    console.log(error)
    res.status(500)
  }
}

//updating a book
export const updateBook = async (req, res) =>{
  try {
    const id = req.params.id
    const {title, file} = req.body
    if(!id || !title || !file){
      res.status(406).send('id, tile or file is empty')
    }
    const book = await bookModel.findByPk(id)
    if(!book){
      res.status(404).send("book not found")
    }
    book.title = title
    book.file = file
    await book.save()
    res.send('Book updated!')
  } catch (error) {
    res.send("something wrong happened while updating the book")
    res.status(500)
    console.log(error)
  }
}

//deleting a book
export const deleteBook = async (req, res) =>{
  try {
    const id = req.params.id
    if(!id){
      res.send(406).send('Not allowed to have empty id')
    }
    const book = await bookModel.findByPk(id)
    if(!book){
      res.send(404).send('No book found')
    }
    await book.destroy()
    res.send('Book deleted!')
  } catch (error) {
    res.send("something wrong happened while deleting the book")
    console.log(error)
    res.status(500)
  }
}

