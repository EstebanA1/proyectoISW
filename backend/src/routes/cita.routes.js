"use strict";

const express = require("express");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middlewares de autenticacion */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Controller de cita*/
const citaController = require("../controllers/cita.controller");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para las citas
router.get('/',  authorizationMiddleware.isAdmin, citaController.getCitas);
router.post('/', authorizationMiddleware.isAdmin, citaController.createCita);
router.get('/:id', authorizationMiddleware.isAdmin, citaController.getCitaById);
router.put('/:id', authorizationMiddleware.isAdmin, citaController.updateCita);
router.delete('/:id', authorizationMiddleware.isAdmin, citaController.deleteCita);

// Muestran mensajes cuando se necesita enviar ID pero esta vacio
router.delete('/', authorizationMiddleware.isAdmin, citaController.handleMissingId);
router.put('/', authorizationMiddleware.isAdmin, citaController.handleMissingId);

// Muestra mensaje cuando no haya que usar un ID pero se haya enviado
router.post('/:id', authorizationMiddleware.isAdmin, citaController.handleId);

module.exports = router;