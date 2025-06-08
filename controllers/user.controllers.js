import userModel from "../models/user.model.js"
const { createHmac } = await import('node:crypto');
import jwt from 'jsonwebtoken'


//important
// Resetting user table (delete all users and reset auto-incrementing id)
//it restarts the user table from sratch, meaing all data is destroyed!!!!!!!
//run only once, when you wanto have a new clean user table start
/* async function resetuserModel() {
    try {
        await userModel.destroy({
            truncate: true,
            cascade: false, 
            restartIdentity: true // PostgreSQL specific: resets the sequence
        });
        console.log('All data from user table deleted and sequence reset.');

    } catch (error) {
        console.error('Error resetting user table:', error);
    }
}
resetuserModel(); */



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
    //added this code to check if useModel is empty, if empty first user is made admin, 
    // jusst two line below, if remove will still work the same but no first user admin -by fred.
    const existingUsers = await userModel.findAll();
    const admin = existingUsers.length === 0;

    //this does need above two lines of code to create user
    let user = await userModel.create({
      email: email,
      password: hashedpassword,
      admin,
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

    console.log(user);

    if(user){
      if(user[0].dataValues.password === newHashedpassword){
      let JWT = jwt.sign(JSON.stringify(user), process.env.PRIVATE_KEY)

    //redirecting the user to user or admin page based on the user login admin userModel state   
      if(user[0].dataValues.admin === true){
          res.status(200).json({'token': JWT, redirect: true, redirectUrl: '/admin/dashboard'});
      } else{
          res.status(200).json({'token': JWT, redirect: true, redirectUrl: '/user/dashboard'});
      }

      console.log(JWT)
    } 
    else if (user[0].dataValues.password != newHashedpassword){
      res.json({
        "errormgs": "password incorrect!"
      });
    }
    }

  } catch (error) {
    res.json("failed to login")
    console.log(error)
    res.status(500)
  }
}
let array = [{
  id:1
}, {id:2}, {id:3}]



//clg all the book from database

export const getAllusers = async (req, res) =>{
try {
  const allUsers = await userModel.findAll();
  if(!allUsers){
    res.status(404).send('No user found')
  }
  console.log(allUsers)
  res.send(allUsers)
} catch (error) {
  console.log("something wrong happened while getting users")
}
}





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