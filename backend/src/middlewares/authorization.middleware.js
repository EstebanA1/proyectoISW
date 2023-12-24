"use strict";
// Autorizacion - Comprobar el rol del usuario
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

async function isAdmin(req, res, next) {
 try {
 const user = await User.findOne({ email: req.email });
 const roles = await Role.find({ _id: { $in: user.roles } });

 for (const role of roles) {
 if (role.name === "Administrador") {
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

async function isAny(req, res, next) {
 try {
 const user = await User.findOne({ email: req.email });
 const roles = await Role.find({ _id: { $in: user.roles } });

 for (const role of roles) {
 if (role.name === "Administrador" || role.name === "Encargado" || role.name === "Solicitante") {
 next();
 return;
 }
 }

 return respondError(
 req,
 res,
 401,
 "Se requiere un rol cualquiera para realizar esta acción"
 );
 } catch (error) {
 handleError(error, "authorization.middleware -> isAny");
 }
}

async function isAdminEncargado(req, res, next) {
 try {
 const user = await User.findOne({ email: req.email });
 const roles = await Role.find({ _id: { $in: user.roles } });

 for (const role of roles) {
 if (role.name === "Administrador" || role.name === "Encargado") {
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

async function isSolicitante(req, res, next) {
 try {
 const user = await User.findOne({ email: req.email });
 const roles = await Role.find({ _id: { $in: user.roles } });

 for (const role of roles) {
 if (role.name === "Solicitante") {
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

async function isEncargadoVis(req, res, next) {
 try {
 const user = await User.findOne({ email: req.email });
 const roles = await Role.find({ _id: { $in: user.roles } });

 for (const role of roles) {
 if (role.name === "Encargado") {
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

async function isSolicitanteAdmin(req, res, next) {
 try {
 const user = await User.findOne({ email: req.email });
 const roles = await Role.find({ _id: { $in: user.roles } });

 for (const role of roles) {
 if (role.name === "Solicitante" || role.name === "Administrador") {
 next();
 return;
 }
 }

 return respondError(
 req,
 res,
 401,
 "Se requiere un rol de solicitante o administrador para realizar esta acción"
 );
 } catch (error) {
 handleError(error, "authorization.middleware -> isSolicitante");
 }
}


module.exports = {
 isAny,
 isAdmin,
 isSolicitante,
 isEncargadoVis,
 isAdminEncargado,
 isSolicitanteAdmin,
};
