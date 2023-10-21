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

// Define las rutas para las citas
router.get('/feedback',  authorizationMiddleware.isEncargadoVis, FeedbackController.getFeedback);
router.post('/feedback', authorizationMiddleware.isEncargadoVis, FeedbackController.createFeedback);
router.get('/feedback/:id', authorizationMiddleware.isEncargadoVis, FeedbackController.getFeedbackById);
router.put('/feedback/:id', authorizationMiddleware.isEncargadoVis, FeedbackController.updateFeedback);
router.delete('/feedback/:id', authorizationMiddleware.isEncargadoVis, FeedbackController.deleteFeedback);


module.exports = router;