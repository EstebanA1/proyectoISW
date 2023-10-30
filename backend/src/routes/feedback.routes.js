"use strict";

// exporta el módulo de rutas de cita
const express = require("express");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middlewares de autenticacion */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Controller de Feedback*/
const FeedbackController = require("../controllers/feedback.controller");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Define las rutas para las citas
router.get('/',  authorizationMiddleware.isAdminEncargado, FeedbackController.getFeedback);
router.post('/', authorizationMiddleware.isEncargadoVis, FeedbackController.createFeedback);
router.get('/:id', authorizationMiddleware.isAdminEncargado, FeedbackController.getFeedbackById);
router.put('/:id', authorizationMiddleware.isEncargadoVis, FeedbackController.updateFeedback);
router.delete('/:id', authorizationMiddleware.isEncargadoVis, FeedbackController.deleteFeedback);


module.exports = router;