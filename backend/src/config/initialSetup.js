"use strict";
// Importa el modelo de datos 'Role'
const Role = require("../models/role.model.js");
const User = require("../models/user.model.js");

/**
 * Crea los roles por defecto en la base de datos.
 * @async
 * @function createRoles
 * @returns {Promise<void>}
 */
async function createRoles() {
  try {
    // Busca todos los roles en la base de datos
    const count = await Role.estimatedDocumentCount();
    // Si no hay roles en la base de datos los crea
    if (count > 0) return;

    await Promise.all([
      new Role({ name: "Administrador" }).save(),
      new Role({ name: "Encargado" }).save(),
      new Role({ name: "Solicitante" }).save(),
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

/**
 * Crea los usuarios por defecto en la base de datos.
 * @async
 * @function createUsers
 * @returns {Promise<void>}
 */
async function createUsers() {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;

    const administrador = await Role.findOne({ name: "Administrador" });
    const solicitante = await Role.findOne({ name: "Solicitante" });
    const encargado = await Role.findOne({ name: "Encargado" });

    await Promise.all([
      new User({
        username: "Solicitante",
        email: "solicitante@email.com",
        password: await User.encryptPassword("solicitante123"),
        roles: solicitante._id,
      }).save(),
      new User({
        username: "Administrador",
        email: "admin@email.com",
        password: await User.encryptPassword("admin123"),
        roles: administrador._id,
      }).save(),
      new User({
        username: "Encargado",
        email: "encargado@email.com",
        password: await User.encryptPassword("encargado123"),
        roles: encargado._id
      }).save()
    ]);
    console.log("* => Users creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createRoles,
  createUsers,
};
