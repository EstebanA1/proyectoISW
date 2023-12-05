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

/** Middleware multer */
const upload = require("../config/configMulter.js");

// Define el middleware de autenticacion para todas las rutas
router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware.isAdmin, solicitudController.getSolicitudes);
router.post('/',  upload.any(), // Este middleware manejará la subida de archivos después de todas las validaciones
(req, res, next) => {
  if (req.files && req.files.length > 0) {
    next();
  } else {
   res.status(400).json({ success: false, message: "Error al subir el archivo" }); 
  }
}, authorizationMiddleware.isSolicitante, solicitudController.createSolicitud);
router.get('/:id', authorizationMiddleware.isAdmin, solicitudController.getSolicitudById);
router.put('/:id',  authorizationMiddleware.isAdmin, solicitudController.updateSolicitud);
router.delete('/:id', authorizationMiddleware.isAdmin, solicitudController.deleteSolicitud);
router.get('/buscar/:rut', authorizationMiddleware.isSolicitante, solicitudController.getSolicitudByRut);


// Hacer quien ve las solicitudes.

module.exports = router;
