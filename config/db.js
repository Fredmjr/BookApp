import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  //on localhost
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  //on live server or with docker
  /*`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@db:${process.env.DB_PORT}/postgres` */
);

async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
