import bookModel from "../models/book.model.js"

export const addBookHandler = async (req, res) => {
  const { title, file } = req.body
  console.log(title)
  try {
    await bookModel.create({
      title,
      file
    })
  }
  catch (error) {
    console.log(error)
  }
  res.send("book created")
}  
