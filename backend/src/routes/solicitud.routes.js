"use strict";

const express = require("express");

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const solicitudController = require("../controllers/solicitud.controller");

const router = express.Router();

router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware.isAdmin, solicitudController.getSolicitudes);
router.post('/', authorizationMiddleware.isSolicitante, solicitudController.createSolicitud);
router.get('/:id', authorizationMiddleware.isSolicitanteAdmin, solicitudController.getSolicitudById);
router.put('/:id',  authorizationMiddleware.isAdmin, solicitudController.updateSolicitud);
router.delete('/:id', authorizationMiddleware.isAdmin, solicitudController.deleteSolicitud);

router.get('/buscar/:rut', authorizationMiddleware.isSolicitante, solicitudController.getSolicitudByRut);

module.exports = router;
