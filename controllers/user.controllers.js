import userModel from "../models/user.model.js"
const { createHmac } = await import('node:crypto');
import jwt from 'jsonwebtoken'


//creating user with email and password
export const createUser = async (req, res) => {
  const { email, password } = req.body
    const hashedpassword = createHmac('sha256', process.env.PRIVATE_KEY)
                .update(password)
                .digest('hex');
    console.log(email);

  if(!email || !password){
    res.status(406).send('email or password is empty')
  }
  try {
    let user = await userModel.create({
      email: email,
      password: hashedpassword
    })
    res.send(user)
  }
  catch (error) {
    console.log(error)
    res.send('something wrong happened while creating user')
  }
} 


//comparing email and password, then returning jwt to the client
export const authentication = async (req, res) =>{
  const { email, password } = req.body
    const newHashedpassword = createHmac('sha256', process.env.PRIVATE_KEY)
                .update(password)
                .digest('hex');
    console.log(newHashedpassword);
  try {
    const user = await userModel.findAll({
  where: {
    email: email,
  },
});
    console.log(user)
    if(user){
          if(user[0].dataValues.password === newHashedpassword){
    let JWT = jwt.sign(JSON.stringify(user), process.env.PRIVATE_KEY)
      res.status(200).json({
        'token': JWT,
      })
    console.log(JWT)
    } 
    else if (user[0].dataValues.password != newHashedpassword){
      res.send('password incorrect!')
    }
    }

  } catch (error) {
    res.send("failed to login")
    console.log(error)
    res.status(500)
  }
}
let array = [{
  id:1
}, {id:2}, {id:3}]
/* 
//updating a book
export const updateUser = async (req, res) =>{
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
export const deleteUser = async (req, res) =>{
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

 */