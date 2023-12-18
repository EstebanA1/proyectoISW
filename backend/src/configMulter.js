/* eslint-disable quotes */
const multer = require("multer");
const path = require("path");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});
 
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Solo Se Permiten Imagenes'));
      }
    },
});

app.use('/uploads', express.static('uploads'));

module.exports = upload;
