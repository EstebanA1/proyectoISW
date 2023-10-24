"use strict";

const express = require("express");

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const solicitudController = require("../controllers/feedback.controller");

const router = express.Router();

router.use(authenticationMiddleware);

router.get('/solicitud', authorizationMiddleware.isAdmin, solicitudController.getSolicitudes);
router.post('/solicitud', authorizationMiddleware.isAdmin, solicitudController.createSolicitud);
router.get('/solicitud/:id', authorizationMiddleware.isAdmin, solicitudController.getSolicitudById);
router.put('/solicitud/:id', authorizationMiddleware.isAdmin, solicitudController.updateSolicitud);
router.delete('/solicitud/:id', authorizationMiddleware.isAdmin, solicitudController.deleteSolicitud);

module.exports = router;
