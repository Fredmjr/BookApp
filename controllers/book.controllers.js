import bookModel from "../models/book.model.js";
import Busboy from "busboy";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import minioClient from "../config/storage.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import sequelize from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const fileUuid = uuidv4();
const fields = {};

//............................important...............................
// Resetting book table (delete all book and reset auto-incrementing id)
/* async function resetbookModel() {
  try {
    await bookModel.destroy({
      truncate: true,
      cascade: false,
      restartIdentity: true,
    });
    console.log("All data from user table deleted and sequence reset.");
  } catch (error) {
    console.error("Error resetting user table:", error);
  }
}
resetbookModel(); */

//creating a book with tile & file res with mgs book created and an error being clg
export const addBookHandler = async (req, res) => {
  const busboy = Busboy({
    headers: req.headers,
  });
  const bukectName = "uploads";
  let newFilename = "";
  busboy.on("file", (fieldname, file, filename) => {
    const objectName = Date.now() + "-" + filename;
    console.log(fieldname);
    minioClient.putObject(bukectName, objectName, file, (err, etag) => {
      if (err) {
        console.error("Upload failed:", err);
      } else {
        console.log("Uploaded:", etag);
      }
    });
  });

  busboy.on("end", () => {
    res.send("file uploaded successfully");
  });
  busboy.on("field", (fieldname, val) => {
    fields[fieldname] = val;
  });
  busboy.on("finish", (fieldname, filename) => {
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

export const downloadUrl = async (req, res) => {
  minioClient.presignedGetObject(
    "uploads",
    "1750073925887",
    24 * 60 * 60,
    function (error, presignedUrl) {
      if (error) {
        console.error(error);
      }
      console.log(presignedUrl);
      res.send(presignedUrl);
    }
  );
};

//S3 Bucket
//creating a bucket
export const createS3Bucket = async (req, res) => {
  try {
    let { s3Bucketname } = req.body;
    let bucketName = s3Bucketname;
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (bucketExists) {
      res.send("created");
    } else {
      minioClient.makeBucket(bucketName);
      res.send("new bucket created");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

//deleting a bucket
export const deleteS3Bucket = async (req, res) => {
  try {
    let { s3Bucketname } = req.body;
    let bucketName = s3Bucketname;
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (bucketExists) {
      minioClient.removeBucket(bucketName);
      res.send("bucket deletd");
    } else {
      res.send("no bucket with such credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

//file upload to s3 and creation of book title, file and description to db
export const uploadToS3bookcovers = async (req, res) => {
  try {
    const busboy = Busboy({ headers: req.headers });

    const bucketName = "bookcovers";
    let fields = {};
    let objectName = "";
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      if (!filename) {
        return res.status(400).send("No file uploaded.");
      }
      //combined time+uuid+filename(this way we have no file dupplicates, unique filename and original extension)
      const fileExtention = path.extname(filename.filename);
      objectName = `${Date.now()}` + `${fileUuid}` + `${fileExtention}`;

      minioClient.putObject(bucketName, objectName, file, (err, etag) => {
        if (err) {
          console.error("Upload error:", err);
          return res.status(500).send("Error uploading file.");
        }
        console.log("Upload successful. ETag:", etag);
      });
    });

    busboy.on("field", (fieldname, value) => {
      fields[fieldname] = value;
    });

    busboy.on("finish", async () => {
      try {
        const filePath = `${bucketName}/` + `${objectName}`;
        const newBook = await bookModel.create({
          title: fields.title,
          description: fields.description,
          file: filePath, // saved file URL
          bucketname: bucketName,
          namefile: objectName,
        });

        console.log("Book saved:", newBook);
        res.status(200).send(newBook);
      } catch (err) {
        console.error("Database save error:", err);
        res
          .status(500)
          .send("File upload succeeded, but database save failed.");
        console.log(err);
      }
    });

    req.pipe(busboy);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Server error.");
  }
};

//querying given info
export const queryInfo = async (req, res) => {
  const id = req.params.id;
  try {
    let queryData = await bookModel.findByPk(id);
    if (queryData) {
      res.send('<a href="">download file</a>');
    }
  } catch (error) {
    res.send("error whiole querying");
    console.log(error);
  }
};

//download quered filed (its also dynamic)
export const dlQfile = async (req, res) => {
  let id = req.params.id;
  try {
    const queryData = await bookModel.findByPk(id);
    const filePath = queryData.file;
    const [bucketName, objectName] = filePath.split("/");

    if (!bucketName && !objectName) {
      res.send("provided book id has no path or directory");
    } else {
      const presignedUrl = await minioClient.presignedGetObject(
        bucketName,
        objectName,
        60 * 60
      );
      res.redirect(presignedUrl);
      console.log(presignedUrl);
    }
  } catch (error) {
    res.send("server error: unable to complete download");
    console.log(error);
  }
};

//reading file
export const readFile = async (req, res) => {
  let name = req.params.name;
  try {
    const filePath = await bookModel.findAll({
      where: {
        namefile: name,
      },
    });
    console.log(filePath);
    if (!filePath) {
      res.send("unable to find file");
    } else {
      console.log(filePath);
      res.send(filePath);

      /* .......slicing here............. */
    }
    /*   const file = await minioClient.getObject(bucketName, name); */
  } catch (error) {
    res.send("file not found!");
    console.log(error);
  }
};

//Deleting book: data in s3 and db
export const deleteBookdata = async (req, res) => {
  const name = req.params.name;
  try {
    const data = await bookModel.findAll({
      where: {
        namefile: name,
      },
    });
    //checks if buckname is empty after checking if the provided name is in the database, once the func returns empty array/[]
    if (data.length === 0) {
      res.send("unable to found book with such name");
    } else {
      let bucketName = data[0].bucketname;

      minioClient.removeObject(bucketName, name);
      await bookModel.destroy({
        where: {
          namefile: name,
        },
      });

      res.send("book deleted");
      console.log(data, bucketName);
    }
  } catch (error) {
    res.send("falied to delete book data");
    console.log(error);
  }
};

//Updating book: data in s3 and db
/* export const updateBookdata = async (req, res) => {
  let busboy = Busboy({
    headers: req.headers,
  });
  const name = req.params.name;

  try {
    const data = await bookModel.findAll({
      where: {
        namefile: name,
      },
    });

    if (data.length === 0) {
      res.send("unable to found book with such name");
    } else {
      //Update-1of3 ---- deleting current file from s3
      let bucketName = data[0].bucketname;
      minioClient.removeObject(bucketName, name);

      //Update-2of3 ---- combined time+uuid+filename - file fetching
      busboy.on("file", (fieldname, file, namefile) => {
        const fileExtention = path.extname(file.namefile);
        let object_name = `${Date.now()}` + `${fileUuid}` + `${fileExtention}`;
        minioClient.putObject(bucketName, object_name, file, (err, etag) => {
          if (err) {
            console.error("Upload error:", err);
            return res.status(500).send("Error uploading file.");
          }
          console.log("Upload successful. ETag:", etag);
        });
      });

      //Update-3of3 ---- updating the book details in db
      busboy.on("finish", () => {
        const filePath = `${bucketName}/` + `${object_name}`;
        data[0].title = title;
        data[0].description = description;
        data[0].file = filePath;
        //bucketname no updates needed, coz file specificafionare already set
        data[0].namefile = object_name;
        data.save();
        res.status(200).send(data);
        console.log(data);
      });

      req.pipe(busboy);
    }
  } catch (error) {
    res.send("falied to delete book data");
    console.log(error);
  }
} */

export const updateBookdata = async (req, res) => {
  const name = req.params.name;
  try {
    const busboy = Busboy({ headers: req.headers });

    const bucketName = "bookcovers";
    let fields = {};
    let objectName = "";
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      if (!filename) {
        return res.status(400).send("No file uploaded.");
      }
      //combined time+uuid+filename(this way we have no file dupplicates, unique filename and original extension)
      const fileExtention = path.extname(filename.filename);
      objectName = `${Date.now()}` + `${fileUuid}` + `${fileExtention}`;

      minioClient.putObject(bucketName, objectName, file, (err, etag) => {
        if (err) {
          console.error("Upload error:", err);
          return res.status(500).send("Error uploading file.");
        }
        console.log("Upload successful. ETag:", etag);
      });
    });

    busboy.on("field", (fieldname, value) => {
      fields[fieldname] = value;
    });

    busboy.on("finish", async () => {
      try {
        const filePath = `${bucketName}/` + `${objectName}`;

        book.file = filePath;
        //bucketname remains untouched
        book.namefile = objectName;
        book.title = fields.title;
        book.description = fields.description;
        await book.save();
        //delete

        console.log("Book saved:", newBook);
        res.status(200).send(newBook);
      } catch (err) {
        console.error("Database save error:", err);
        res
          .status(500)
          .send("File upload succeeded, but database save failed.");
        console.log(err);
      }
    });

    req.pipe(busboy);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Server error.");
  }
};

export const contentviewpage = (req, res) => {
  /*   console.log("something something"); */
  res.render("components/bookcontent");
};

//reading image filefrom s3
export const queryfileImage = async (req, res) => {
  let id = req.params.id;

  try {
    if (id) {
      const queryData = await bookModel.findByPk(id);
      const filePath = queryData.file;
      const [bucketName, objectName] = filePath.split("/");

      const file = await minioClient.getObject(bucketName, objectName);

      let contentType = "application/octet-stream";

      switch (objectName) {
        case "png":
          contentType = "image/png";
          break;
        case "jpg":
        case "jpeg":
          contentType = "image/jpeg";
          break;
        case "gif":
          contentType = "image/gif";
          break;
        case "pdf":
          contentType = "application/pdf";
          break;
        case "mp4":
          contentType = "video/mp4";
          break;
      }

      res.setHeader("Content-Type", contentType);

      const fileStream = await minioClient.getObject(bucketName, objectName);

      fileStream.pipe(res);

      fileStream.on("error", (err) => {
        console.error("Error streaming file:", err);
        if (!res.headersSent) {
          res.status(500).send("Error retrieving file.");
        }
      });

      /* res.send(objectName); */ //how to send here file here after getting from s3
    }
  } catch (error) {
    res.send("read file failed");
    console.log(error);
  }
};

/* ...................................................... landing page searched books............................................................................................... */
export const searchedBook = async (req, res) => {
  let { searchtitle } = req.body;
  if (searchtitle === "") {
    res.json({
      searchempty: true,
    });
  }

  const book = await bookModel.findAll({
    where: {
      title: searchtitle,
    },
  });

  if (book.length === 0) {
    res.json({
      empty: true,
    });
  } else {
    res.json({
      display: true,
      book: book,
    });
  }
};
