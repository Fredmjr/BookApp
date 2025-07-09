import { createClient } from "redis";

export const redisClient = createClient();

redisClient.connect().catch((error) => {
  console.log(error);
});
