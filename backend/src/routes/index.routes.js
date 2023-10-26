"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Enrutador de citas */
const citasRoutes = require("./cita.routes.js");

/** Enrutador de feedback */
const feedbackRoutes = require("./feedback.routes.js");

/** Enrutador de solicitudes */
const solicitudesRoutes = require("./solicitud.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/users
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para las citas /api/citas
router.use("/citas", citasRoutes)
// Define las rutas para las solicitudes /api/solicitudes
router.use("/solicitud", solicitudesRoutes)
// Define las rutas para las feedbacks /api/feedbacks
router.use("/feedback", feedbackRoutes);

// Exporta el enrutador
module.exports = router;
