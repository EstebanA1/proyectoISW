"use strict";

const express = require("express");

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const respuestaDocController = require("../controllers/respuestaDoc.controller");

const router = express.Router();

router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware.isAdmin, respuestaDocController.getRespuestasDoc);
router.post('/', authorizationMiddleware.isAdmin, respuestaDocController.createRespuestaDoc);
router.put('/:id', authorizationMiddleware.isAdmin, respuestaDocController.updateRespuestaDoc);
router.delete('/:id', authorizationMiddleware.isAdmin, respuestaDocController.deleteRespuestaDoc);
router.get('/:id', authorizationMiddleware.isAdmin, respuestaDocController.getRespuestaDocById);
router.get('/buscar/:rut', authorizationMiddleware.isSolicitante, respuestaDocController.getRespuestaDocByRut);

module.exports = router;