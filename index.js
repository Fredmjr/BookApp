import express from "express";
import path from "path"
import { fileURLToPath } from "url";
import sequelize from "./config/db.js";
import homeRouter from "./routes/home.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import dotenv from "dotenv";
import authorization from "./middleware/authorization.js";
import { expressjwt } from "express-jwt"

dotenv.config();

const app = express();
const port = process.env.PORT;
//making path to files (views & public), hbs engine set for broswers & serving static files to browser.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "hbs")
app.set("/views", path.join(__dirname, 'views'))
app.use(express.static('./client/dist'));

app.use(express.json())

app.use("/ui", homeRouter);
app.use("/user", userRouter);
app.use("/admin", expressjwt({ secret: process.env.PRIVATE_KEY, algorithms: ["HS256"] }), adminRouter);
app.use('/admin', authorization)



async function main() {
  await sequelize.sync({
  });

  app.listen(port, () => {
    console.log("application running!");
  });
}

main();
