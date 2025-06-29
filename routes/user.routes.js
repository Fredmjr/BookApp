import express from "express";
import { homeHandler } from "../controllers/home.controllers.js";
import {
  createUser,
  authentication,
  getAllusers,
  uploads,
  downloadFile,
} from "../controllers/user.controllers.js";

const router = express.Router();
router.get("/", homeHandler);
router.post("/signup", createUser);
router.post("/login", authentication);
router.get("/adminbooks", (req, res) => {
  res.render("adminbooks");
});
//to render a file in subfiles like componenets just add /compoenets/filename.
router.get("/dashboard", (req, res) => {
  res.render("components/userdashboard");
});
router.post("/uploads", uploads);
router.get("/allusers", getAllusers);
router.get("/downloadfile", downloadFile);
export default router;
