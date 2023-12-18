/* eslint-disable require-jsdoc */
/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
"use strict";

// exporta el módulo de rutas de cita
const express = require("express");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middlewares de autenticacion */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Controller de Feedback*/
const FeedbackController = require("../controllers/feedback.controller");
<<<<<<< HEAD
const upload = require("../configMulter.js");
=======
const upload = require("../config/configMulter.js");
>>>>>>> 1eb032b186e9d443674fbc002e38e9bb8944509f

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

<<<<<<< HEAD

// Define las rutas para las citas
router.get("/", authorizationMiddleware.isAdminEncargado, FeedbackController.getFeedback);
router.post("/", /*upload.single('imagenes'),
 */authorizationMiddleware.isEncargadoVis, FeedbackController.createFeedback);
router.get("/:id", authorizationMiddleware.isAdminEncargado, FeedbackController.getFeedbackById);
router.put("/:id", /*upload.single('imagenes'),
*/authorizationMiddleware.isEncargadoVis, FeedbackController.updateFeedback);
router.delete("/:id", authorizationMiddleware.isEncargadoVis, FeedbackController.deleteFeedback);

// Muestran mensajes cuando se necesita enviar ID pero esta vacio
router.delete('/', authorizationMiddleware.isEncargadoVis, FeedbackController.handleMissingId);
router.put('/', authorizationMiddleware.isEncargadoVis, FeedbackController.handleMissingId);

// Muestra mensaje cuando no haya que usar un ID pero se haya enviado
router.post('/:id', authorizationMiddleware.isEncargadoVis, FeedbackController.handleId);

=======
//Multer
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // eslint-disable-next-line max-len
    cb(null, "../../uploads/"); // Esta es la carpeta donde se guardarán los archivos. Puedes cambiarla según tus necesidades.
  },
  filename: (req, file, cb) => {
    // eslint-disable-next-line max-len
    cb(null, Date.now() + path.extname(file.originalname)); // Genera un nombre basado en la fecha actual + la extensión original del archivo.
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Solo se admiten imagenes"), false);
  }
};

const uploader = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});


// Define las rutas para las citas
router.get("/", authorizationMiddleware.isAdminEncargado, FeedbackController.getFeedback);
router.post("/", /*uploader.any(), // Este middleware manejará la subida de archivos después de todas las validaciones
(req, res, next) => {
  if (req.files && req.files.length > 0) {
    next();
  } else {
  res.status(400).json({ success: false, message: "Error al subir el archivo" }); 
  }
}, */authorizationMiddleware.isEncargadoVis, FeedbackController.createFeedback);
router.get("/:id", authorizationMiddleware.isAdminEncargado, FeedbackController.getFeedbackById);
router.put("/:id", authorizationMiddleware.isEncargadoVis, FeedbackController.updateFeedback);
router.delete("/:id", authorizationMiddleware.isEncargadoVis, FeedbackController.deleteFeedback);
>>>>>>> 1eb032b186e9d443674fbc002e38e9bb8944509f

module.exports = router;