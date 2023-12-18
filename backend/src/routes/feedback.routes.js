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
const upload = require("../configMulter.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);


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


module.exports = router;