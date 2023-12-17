"use strict";
// Importa el modelo de datos 'Cita'
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
 * Crea una nueva cita en la base de datos
 * @param {Object} cita Objeto de usuario
 * @returns {Promise} Promesa con el objeto de cita creado
 */
async function createCita(cita) {
    try {
        const { name, typeOfRequest, address, date, hour, status, visitRealizated, ID_Solicitud } = cita;

        // Buscar todas las citas existentes que contengan el mismo nombre y tipo
        const citasFound = await Cita.find({ name: new RegExp('^' + name + ' [AC][0-9]+$'), typeOfRequest });

        // Contar las citas encontradas y agregar 1 para la nueva cita
        const count = citasFound.length + 1;

        // Generar el nombre de la nueva cita
        const newName = name + ' ' + (typeOfRequest === 'Ampliación' ? 'A' : 'C') + count;

        const newCita = new Cita({
            name: newName,
            typeOfRequest,
            address,
            date,
            hour,
            status,
            visitRealizated,
            ID_Solicitud
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
        const cita = await Cita.findById(id).exec();
        if (!cita) return [null, "La cita no existe, intente otro ID"];

        return [cita, null];
    } catch (error) {
        return [null, "La cita no existe, intente otro ID"];
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
        if (!citaFound) return [null, "La cita no existe, pruebe otro ID"];

        const { name, typeOfRequest, address, date, hour, status, visitRealizated, ID_Solicitud } = cita;

        const citaUpdated = await Cita.findByIdAndUpdate(
            id,
            {
                name,
                typeOfRequest,
                address,
                date,
                hour,
                status,
                visitRealizated,
                ID_Solicitud
            },
            { new: true },
        );

        return [citaUpdated, null];
    } catch (error) {
        return [null, "La cita no existe, pruebe otro ID"];
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
    getCitas,
    createCita,
    getCitaById,
    updateCita,
    deleteCita,
};
