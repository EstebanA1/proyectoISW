"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const CitaService = require("../services/cita.service");
const { citaBodySchema, citaIdSchema } = require("../schema/cita.schema");
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
            : respondSuccess(req, res, 200, citasiones);
    } catch (error) {
        handleError(error, "cita.controller -> getCitas");
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
        const { body } = req;
        const { error: bodyError } = citaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newCita, citaError] = await CitaService.createCita(body);

        if (citaError) return respondError(req, res, 400, citaError);
        if (!newCita) {
            return respondError(req, res, 400, "No se creo la cita");
        }

        respondSuccess(req, res, 201, newCita);
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
        const { error: paramsError } = citaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [cita, errorCita] = await CitaService.getCitaById(params.id);

        if (errorCita) return respondError(req, res, 404, errorCita);

        respondSuccess(req, res, 200, cita);
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
        const { error: paramsError } = citaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = citaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [cita, citaError] = await CitaService.updateCita(params.id, body);

        if (citaError) return respondError(req, res, 400, citaError);

        respondSuccess(req, res, 200, cita);
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
        const { error: paramsError } = citaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const cita = await CitaService.deleteCita(params.id);
        !cita
            ? respondError(
                req,
                res,
                404,
                "No se encontro la cita solicitada",
                "Verifique el id ingresado",
            )
            : respondSuccess(req, res, 200, cita);
    } catch (error) {
        handleError(error, "cita.controller -> deleteCita");
        respondError(req, res, 500, "No se pudo eliminar la cita");
    }
}

module.exports = {
    getCitas,
    createCita,
    getCitaById,
    updateCita,
    deleteCita,
};
