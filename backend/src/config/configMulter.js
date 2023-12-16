 //src/config/multer.config.js

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // eslint-disable-next-line max-len
    cb(null, "uploads/"); // Esta es la carpeta donde se guardarán los archivos. Puedes cambiarla según tus necesidades.
  },
  filename: (req, file, cb) => {
    // eslint-disable-next-line max-len
    cb(null, Date.now() + path.extname(file.originalname)); // Genera un nombre basado en la fecha actual + la extensión original del archivo.
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Solo se admiten archivos PDF"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;