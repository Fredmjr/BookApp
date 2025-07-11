import express from "express";
import { homeHandler } from "../controllers/home.controllers.js";
import bookModel from "../models/book.model.js";
import { downloadUrl } from "../controllers/book.controllers.js";
import { redisClient } from "../config/cache.js";

const router = express.Router();

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
  let cacheKey = "books";
  try {
    if (await redisClient.get(cacheKey)) {
      console.log(
        "this is cached content " + (await redisClient.get(cacheKey))
      );
      res.render("components/gallery", {
        book: JSON.parse(await redisClient.get(cacheKey)),
      });
      /*       cached = null; */
    } else if ((await redisClient.get(cacheKey)) == null) {
      const books = await bookModel.findAll();
      if (!books) {
        res.status(404).send("No books found");
      }
      let newCache = await redisClient.setEx(
        cacheKey,
        5,
        JSON.stringify(books)
      );
      console.log("this is newcache " + newCache);
      res.render("components/gallery", {
        book: books,
      });
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

export default router;
