import { createClient } from "redis";

export const redisClient = createClient({
  url: "rediss://redis:6379",
});

redisClient.connect().catch((error) => {
  console.log(error);
});
