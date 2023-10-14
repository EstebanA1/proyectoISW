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
 * Crea un nuevo usuario en la base de datos
 * @param {Object} cita Objeto de usuario
 * @returns {Promise} Promesa con el objeto de cita creado
 */
async function createCita(cita) {
    try {
        const {  name, typeOfRequest, date } = cita;

        const citaFound = await Cita.findOne({ _id: cita._id });
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
 * ESTA FUNCIONALIDAD NO ESTOY SEGURO DE DEJARLA, PERO DE MOMENTO SIRVE
 * PARA PROBAR EL CORRECTO PASO DE LOS DATOS DESDE EL CONTROLLER AL SERVICE

*/
async function getCitaById(id) {

    try {
        const cita = await Cita.findById( id ).exec();
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
async function putCita(_id, cita) {
    console.log("Prueba: ", cita);
    try {
        console.log("Id Servicio 1: ", _id);
        console.log("Id Servicio 1: ", cita._id);
        // console.log("Id Servicio 1: ", params._id); NO Funciona
        const citaFound = await Cita.findById(_id);
        console.log("Id Servicio 2: ", _id);
        if (!citaFound) return [null, "La cita no existe"];

        const { name, typeOfRequest, date } = body;
        const citaUpdated = await Cita.findByIdAndUpdate(
            _id,
            {
                name,
                typeOfRequest,
                date,
            },
            { new: true },
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
    getCitas,
    createCita,
    getCitaById,
    putCita,
    deleteCita,
};
