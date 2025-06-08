import bookModel from "../models/book.model.js";
import Busboy from "busboy";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fields = {};

//creating a book with tile & file res with mgs book created and an error being clg
export const addBookHandler = async (req, res) => {
  const busboy = Busboy({
    headers: req.headers,
  });
  let newFilename = "";

  busboy.on("file", (fieldname, file, filename) => {
    console.log(filename);
    const saveTo = path.join("./uploads/" + filename.filename);
    newFilename = saveTo;
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on("end", () => {
    res.send("file uploaded successfully");
  });
  busboy.on("field", (fieldname, val) => {
    fields[fieldname] = val;
  });
  busboy.on("finish", (fieldname, filename) => {
    const saveTo = path.join("./uploads/" + filename);
    if (!fields.title || !fields.url) {
      res.send("Title or File is empty");
    }

    bookModel.create({
      title: fields.title,
      file: newFilename,
    });
    res.send("book created");
  });

  return req.pipe(busboy);
};

//clg all the book from database
export const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.findAll();
    if (!books) {
      res.status(404).send("No books found");
    }
    console.log(books);
    res.send(books);
  } catch (error) {
    console.log("something wrong happened while getting books");
  }
};

//getting individual book
export const getBookById = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(406).send("id is empty");
  }
  try {
    const book = await bookModel.findByPk(id);
    if (!book) {
      res.send(404).send("No book found");
    }
    res.send(book);
    console.log(book);
  } catch (error) {
    res.send("something wrong happened while getting the book");
    console.log(error);
    res.status(500);
  }
};

//updating a book
export const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, file } = req.body;
    if (!id || !title || !file) {
      res.status(406).send("id, tile or file is empty");
    }
    const book = await bookModel.findByPk(id);
    if (!book) {
      res.status(404).send("book not found");
    }
    book.title = title;
    book.file = file;
    await book.save();
    res.send("Book updated!");
  } catch (error) {
    res.send("something wrong happened while updating the book");
    res.status(500);
    console.log(error);
  }
};

//deleting a book
export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.send(406).send("Not allowed to have empty id");
    }
    const book = await bookModel.findByPk(id);
    if (!book) {
      res.send(404).send("No book found");
    }
    await book.destroy();
    res.send("Book deleted!");
  } catch (error) {
    res.send("something wrong happened while deleting the book");
    console.log(error);
    res.status(500);
  }
};
