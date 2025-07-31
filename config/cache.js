import { createClient } from "redis";
import dotenv from "dotenv";

export const redisClient = createClient({
  //for localhost
  url: process.env.REDIS_URL,
  //for docker
  /*  url: "redis://redis:6379", */
});

redisClient.connect().catch((error) => {
  console.log(error);
});
