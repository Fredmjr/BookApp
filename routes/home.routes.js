import express from "express";
import { homeHandler } from "../controllers/home.controllers.js";
import bookModel from "../models/book.model.js";
import { downloadUrl, searchedBook } from "../controllers/book.controllers.js";
import { redisClient } from "../config/cache.js";
//send html file path,fileurlpath,dirname then   res.sendFile(path.join(__dirname, "..", "views/components", "login.hbs"));
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/loginpage", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views/components", "login.hbs"));
});

router.get("/home", (req, res) => {
  res.render("index.hbs");
});
router.get("/login", (req, res) => {
  res.render("components/login");
});

router.get("/test", downloadUrl);

//clg all the book from database
/* router.get("/gallery", async (req, res) => {
  let cacheKey = "books";
  try {
    const books = await bookModel.findAll();
    if (!books) {
      res.status(404).send("No books found");
    } else {
      res.render("components/gallery", {
        book: books,
      });
      console.log("books in db");
    }
  } catch (error) {
    console.log("something wrong happened while getting books");
    console.log(error);
  }
}); */

//original clg all books:
router.get("/gallery", async (req, res) => {
  const cacheKey = "books";
  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      /*       res.render("components/gallery", {
        book: JSON.parse(cached),
      }); */
      let parseCached = JSON.parse(cached);
      res.send(parseCached);
    } else {
      const books = await bookModel.findAll();
      if (!books) {
        return res.status(404).send(" No books found");
      }
      await redisClient.setEx(cacheKey, 5, JSON.stringify(books));
      res.send(books);
    }
  } catch (error) {
    console.log("something wrong happened while getting books");
    console.log(error);
  }
});

//clg all the book from database
router.get("/adminbooks", async (req, res) => {
  try {
    const books = await bookModel.findAll();
    if (!books) {
      res.status(404).send("No books found");
    }
    console.log(books);
    res.render("components/adminbooks", {
      book: books,
    });
  } catch (error) {
    console.log("something wrong happened while getting books");
    console.log(error);
  }
});

router.get("/editpage", (req, res) => {
  res.render("editpage");
});
router.get("/userpage", (req, res) => {
  res.render("userpage");
});
router.post("/search", searchedBook);

export default router;
