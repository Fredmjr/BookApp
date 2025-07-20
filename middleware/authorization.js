import jwt from "jsonwebtoken";
export const authorization = (req, res, next) => {
  const JWT = req.headers["authorization"];
  const token = JWT && JWT.split(" ")[1];
  console.log("token from user" + token);
  if (token == null) {
    res.status(401).send("authorization is empty");
  }
  let TOKEN = jwt.verify(token, process.env.PRIVATE_KEY);
  console.log("token from middleware" + JSON.stringify(TOKEN));

  req.Auth = TOKEN;
  next();
};
