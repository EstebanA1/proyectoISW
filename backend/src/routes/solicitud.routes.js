"use strict";

const express = require("express");

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const solicitudController = require("../controllers/solicitud.controller");

const router = express.Router();

router.use(authenticationMiddleware);

router.get('/', solicitudController.getSolicitudes);
router.post('/', solicitudController.createSolicitud);
router.get('/:id', solicitudController.getSolicitudById);
router.put('/:id',  solicitudController.updateSolicitud);
router.delete('/:id', solicitudController.deleteSolicitud);

module.exports = router;
