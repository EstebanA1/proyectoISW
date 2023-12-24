"use strict";
const express = require("express");
const usuarioController = require("../controllers/user.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const router = express.Router();


// Aplica el middleware de autenticación solo a las rutas que lo requieren
router.put("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.updateUser);
router.delete("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.deleteUser);

// Ruta para crear usuarios sin autenticación
router.post("/", usuarioController.createUser);
router.get("/", authenticationMiddleware, usuarioController.getUsers);
router.get("/:id", authenticationMiddleware, usuarioController.getUserById);

module.exports = router;
