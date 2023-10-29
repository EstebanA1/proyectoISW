"use strict";

const express = require("express");

/** Middlewares de autorizacion */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middlewares de autenticacion */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Controller de solicitud*/
const solicitudController = require("../controllers/solicitud.controller");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticacion para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para las solicitudes
router.get('/', solicitudController.getSolicitudes);
router.post('/',authorizationMiddleware.isSolicitante, solicitudController.createSolicitud);
router.get('/:id', solicitudController.getSolicitudById);
router.put('/:id',  solicitudController.updateSolicitud);
router.delete('/:id', solicitudController.deleteSolicitud);


// Hacer quien ve las solicitudes.

module.exports = router;
