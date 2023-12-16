/* eslint-disable eol-last */
/* eslint-disable quotes */
/* eslint-disable spaced-comment */
"use strict";

// exporta el módulo de rutas de cita
const express = require("express");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middlewares de autenticacion */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Controller de Feedback*/
const InformeController = require("../controllers/informe.controller.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

//informe
router.get('/', authorizationMiddleware.isAdminEncargado, InformeController.getInforme);
router.post('/', authorizationMiddleware.isEncargadoVis, InformeController.createInforme);
router.get('/:id', authorizationMiddleware.isAdminEncargado, InformeController.getInformeById);
router.put('/:id', authorizationMiddleware.isEncargadoVis, InformeController.updateInforme);
router.delete('/:id', authorizationMiddleware.isAdminEncargado, InformeController.deleteInforme);


module.exports = router;