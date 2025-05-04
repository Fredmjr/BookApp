import express from "express";
import sequelize from "./config/db.js";
import homeRouter from "./routes/home.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use("/ui", homeRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

async function main() {
  await sequelize.sync({
    force: true,
  });

  app.listen(port, () => {
    console.log("application running!");
  });
}

main();
