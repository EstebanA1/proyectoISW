"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const CitaService = require("../services/citas.service");
const { citaBodySchema, citaIdSchema } = require("../schema/cita.schema");
const { handleError } = require("../utils/errorHandler");
/*FALTA ASIGNAR VALIDACIONES, QUIENES PUEDEN USAR LAS FUNCIONALIDADES SON EL ADMIN Y EL DE LAS VISITAS, ESTE ULTIMO SOLO PUEDE VER LAS VISITAS EXISTENTES*/

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

Se deja en caso de implementar un buscador HASTA AQUI VAMOS BIEN
*/
async function getCitaById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = citaIdSchema.validate(params.id);
        console.log("Controller 1:", params.id);
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
async function putCita(req, res) {
    try {
        const { _id } = req.params;
        const { body } = req; //Se elimino params

        const { error: bodyError } = citaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        console.log("Algo 1: ", body);
        // console.log("Algo 2: ", params);

        const [cita, citaError] = await CitaService.putCita(_id, body);

        if (citaError) return respondError(req, res, 400, citaError);

        respondSuccess(req, res, 200, cita);
    } catch (error) {
        handleError(error, "cita.controller -> putCita");
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
        // const { error: paramsError } = citaIdSchema.validate(params);
        // if (paramsError) return respondError(req, res, 400, paramsError.message);

        const cita = await CitaService.deleteCita(params._id);
        !cita
            ? respondError(req, res, 404, "No se encontro la cita solicitada", "Verifique el id ingresado")
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
    putCita,
    deleteCita,
};
