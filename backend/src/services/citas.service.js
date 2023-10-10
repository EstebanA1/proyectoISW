"use strict";
// Importa el modelo de datos 'User'
const Cita = require("../models/cita.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las citas de la base de datos
 * @returns {Promise} Promesa con el objeto de los citas
 */
async function getCitas() {
    try {
        const citas = await Cita.find()
            .exec();
        if (!citas) return [null, "No hay citas"];

        return [citas, null];
    } catch (error) {
        handleError(error, "cita.service -> getCitas");
    }
}

/**
 * Crea un nuevo usuario en la base de datos
 * @param {Object} cita Objeto de usuario
 * @returns {Promise} Promesa con el objeto de cita creado
 */
async function createCita(cita) {
    try {
        const { name, typeOfRequest, date } = cita;

        const userFound = await Cita.findOne({ name: cita.name });
        if (citaFound) return [null, "La cita ya existe"];

        const newCita = new Cita({
            name,
            typeOfRequest,
            date,
        });
        await newCita.save();

        return [newCita, null];
    } catch (error) {
        handleError(error, "cita.service -> createCita");
    }
}

/**
 * Obtiene una cita por su id de la base de datos
 * @param {string} Id de la cita
 * @returns {Promise} Promesa con el objeto de cita
 */
async function getCitaById(id) {
    try {
        const cita = await Cita.findById({ _id: id })
            .exec();

        if (!cita) return [null, "La cita no existe"];

        return [cita, null];
    } catch (error) {
        handleError(error, "cita.service -> getCitaById");
    }
}

/**
 * Actualiza una cita por su id en la base de datos
 * @param {string} id Id del cita
 * @param {Object} cita Objeto de cita
 * @returns {Promise} Promesa con el objeto de cita actualizado
 */
async function updateCita(id, cita) {
    try {
        const citaFound = await Cita.findById(id);
        if (!citaFound) return [null, "La cita no existe"];

        const { name, typeOfRequest, date} = cita;

        const citaUpdated = await Cita.findByIdAndUpdate(
            id,
            {
                name,
                typeOfRequest,
                date,
            },
            {new: true},
        );

        return [citaUpdated, null];
    } catch (error) {
        handleError(error, "cita.service -> updateCita");
    }
}

/**
 * Elimina una cita por su id de la base de datos
 * @param {string} Id de la cita
 * @returns {Promise} Promesa con el objeto de la cita eliminada
 */
async function deleteCita(id) {
    try {
        return await Cita.findByIdAndDelete(id);
    } catch (error) {
        handleError(error, "cita.service -> deleteCita");
    }
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
