import express from "express";
import { expressjwt } from "express-jwt";
import {
  addBookHandler,
  createS3Bucket,
  uploadToS3bookcovers,
  deleteBook,
  deleteS3Bucket,
  getAllBooks,
  getBookById,
  updateBook,
  queryInfo,
  dlQfile,
  readFile,
  deleteBookdata /*  
  updateBookdata, */,
  contentviewpage,
  queryfileImage,
  formValidation,
  fileformatValidation,
  BookApproval,
} from "../controllers/book.controllers.js";
import { testingJWT } from "../controllers/user.controllers.js";

const router = express.Router();
router.post(
  "/addbook",
  expressjwt({ secret: process.env.PRIVATE_KEY, algorithms: ["HS256"] }),
  addBookHandler
);
router.post("/form", formValidation);
router.post("/formfile", fileformatValidation);
router.get("/books", getAllBooks);
router.get("/book/:id", getBookById);
router.patch("/updatebook/:id", updateBook);
router.delete("/deletebook/:id", deleteBook);
router.post("/uploadToS3bookcovers", uploadToS3bookcovers);
router.get("/queryfile/:id", queryfileImage);
router.get("/queryinfo/:id", queryInfo);
router.get("/downloadquery/:id", dlQfile);
router.get("/readfile/:name", readFile);
router.delete("/deletebookdata/:name", deleteBookdata);
router.get("/jwtest", testingJWT);
/* router.patch("/updatebookdata/:name", updateBookdata); */
router.post("/createbucket", createS3Bucket);
router.delete("/deletebucket", deleteS3Bucket);
router.get("/approval", BookApproval);

router.get("/contentviewpage", contentviewpage);
router.get("/dashboard", (req, res) => {
  res.render("components/admindashboard");
});
router.get("/bookcontent", (req, res) => {
  res.render("components/bookcontent");
});
export default router;
