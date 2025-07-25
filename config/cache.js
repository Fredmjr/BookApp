import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://redis:6379",
});

redisClient.connect().catch((error) => {
  console.log(error);
});
