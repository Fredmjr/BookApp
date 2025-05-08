import express from "express";
import path from "path"
import { fileURLToPath } from "url";
import sequelize from "./config/db.js";
import homeRouter from "./routes/home.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
//making path to files (views & public), hbs engine set for broswers & serving static files to browser.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "hbs")
app.set("/views", path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, "/views")))
app.use(express.static('views'));
app.use(express.static('public'));

app.use(express.json())

app.use("/ui", homeRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.get('/bookapp', (req, res)=>{
  res.render('bookapp')
})
app.get('/adminpage', (req, res)=>{
  res.render('adminpage')
})
app.get('/test', (req, res)=>{
  res.render('pages/test')
})

app.get('/createpage', (req, res)=>{
  res.render('createpage')
})
app.get('/editpage', (req, res)=>{
  res.render('editpage')
})
app.get('/userpage', (req, res)=>{
  res.render('userpage')
})


async function main() {
  await sequelize.sync({
  });

  app.listen(port, () => {
    console.log("application running!");
  });
}

main();
