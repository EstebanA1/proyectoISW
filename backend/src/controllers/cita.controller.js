"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const CitaService = require("../services/citas.service");
const { citaBodySchema, citaIdSchema, citaModBodySchema } = require("../schema/cita.schema");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las citas
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function getCitas(req, res) {
    try {
        const [citasiones, errorCitasiones] = await CitaService.getCitas();
        if (errorCitasiones) return respondError(req, res, 404, errorCitasiones);

        citasiones.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, ["Las citas son: ", citasiones]);
    } catch (error) {
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea una nueva cita
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createCita(req, res) {
    try {
        const aux = new Date();
        const fechaActual = aux.toLocaleDateString();
        const { body } = req;
        const fechaInput = body.date;

        let fecha1 = fechaActual.split("-");
        let fecha2 = fechaInput.split("/");

        if (fecha1[2] > fecha2[2]) return respondError(req, res, 400, "La fecha de la cita debe ser posterior a la fecha actual");

        if (fecha1[2] === fecha2[2]) {
            if (fecha1[1] > fecha2[1]) return respondError(req, res, 400, "La fecha de la cita debe ser posterior a la fecha actual");

            if (fecha1[1] === fecha2[1]) {
                if ((fecha1[0] + 1) > fecha2[0]) return respondError(req, res, 400, "La fecha de la cita debe ser posterior a la fecha actual");
            }
        }

        const horaCita = body.hour;

        if (!/^([0][8-9]|[1][0-6]):[0-5][0-9]$/.test(horaCita)) {
            return respondError(req, res, 400, "La hora de la cita debe estar entre las 08:00 y las 17:00.");
        }

        const { error: bodyError } = citaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newCita, citaError] = await CitaService.createCita(body);

        if (citaError) return respondError(req, res, 400, citaError);
        if (!newCita) {
            return respondError(req, res, 400, "No se creo la cita");
        }

        respondSuccess(req, res, 201, ["La cita fue creada con exito", newCita]);
    } catch (error) {
        handleError(error, "cita.controller -> createCita");
        respondError(req, res, 500, "No se creo la cita");
    }
}

/**
 * Obtiene una cita por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
*/
async function getCitaById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = citaIdSchema.validate(params.id);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [cita, errorCita] = await CitaService.getCitaById(params.id);

        if (errorCita) return respondError(req, res, 404, errorCita);

        respondSuccess(req, res, 200, ["La cita solicitada es: ", cita]);
    } catch (error) {
        handleError(error, "cita.controller -> getCitaById");
        respondError(req, res, 500, "No se pudo obtener la cita");
    }
}

/**
 * Actualiza una cita por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateCita(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = citaIdSchema.validate(params.id);
        if (paramsError) return respondError(req, res, 400, paramsError.message)
        // Funcion para que la fecha de la cita sea posterior a la fecha actual
        if (body.date) {
            const aux = new Date();
            const fechaActual = aux.toLocaleDateString();
            const fechaInput = body.date;

            let fecha1 = fechaActual.split("-");
            let fecha2 = fechaInput.split("/");

        }

        const { error: bodyError } = citaModBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [cita, citaError] = await CitaService.updateCita(params.id, body);

        if (citaError) return respondError(req, res, 404, citaError);

        respondSuccess(req, res, 200, ["La cita fue actualizada con exito", cita]);
    } catch (error) {
        handleError(error, "cita.controller -> updateCita");
        respondError(req, res, 500, "No se pudo actualizar la cita");
    }
}

/**
 * Elimina una cita por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteCita(req, res) {
    try {
        const { params } = req;

        const { error: paramsError } = citaIdSchema.validate(params.id);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const cita = await CitaService.deleteCita(params.id);

        !cita
            ? respondError(req, res, 404, "No se encontro la cita indicada", "Verifique el id ingresado")
            : respondSuccess(req, res, 200, "La cita fue eliminada con exito");
    } catch (error) {
        handleError(error, "cita.controller -> deleteCita");
        respondError(req, res, 500, "No se pudo eliminar la cita");
    }
}

function handleMissingId(req, res) {
    respondError(req, res, 400, 'El ID de la cita es requerido');
}

function handleId(req, res) {
    respondError(req, res, 400, 'No se debe proporcionar un ID');
}

module.exports = {
    getCitas,
    createCita,
    getCitaById,
    updateCita,
    deleteCita,
    handleMissingId,
    handleId
};
