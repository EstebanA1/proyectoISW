"use strict";
// Autorizacion - Comprobar el rol del usuario
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Comprueba si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function isAdmin(req, res, next) {
  try {
    console.log("Pase por la autorización");
    const user = await User.findOne({ email: req.email });
    console.log("El email es ", req.email);
    console.log("Los roles son ", user.roles);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (const role of roles) {
      if (role.name === "administrador") {
        next();
        return;
      }
    }

    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador para realizar esta acción"
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

/**
 * Comprueba si el usuario es solicitante
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function isSolicitante(req, res, next) {
  try {
    console.log("Pase por la autorización");
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (const role of roles) {
      if (role.name === "solicitante") {
        next();
        return;
      }
    }

    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de solicitante para realizar esta acción"
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isSolicitante");
  }
}

/**
 * Comprueba si el usuario es encargado
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function isEncargadoVis(req, res, next) {
  try {
    console.log("Pase por la autorización");
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (const role of roles) {
      if (role.name === "encargado") {
        next();
        return;
      }
    }

    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de encargado de visitas para realizar esta acción"
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isEncargadoVis");
  }
}

module.exports = {
  isAdmin,
  isSolicitante,
  isEncargadoVis
};
