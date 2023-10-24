"use strict";

const {respondSuccess, respondError} = require('../helpers/response.helper');
const {handleError} = require('../utils/errorHandler');
const {solicitudBodySchema, solicitudIdSchema} = require('../schema/solicitud.schema');
const SolicitudService = require('../services/solicitud.service');

/**
 * Controlador de Solicitudes
 *  @module SolicitudController
 */

async function getSolicitudes(req, res) {
    try {
        const [solicitudes, errorSolicitudes] = await SolicitudService.getSolicitudes();
        if (errorSolicitudes) return respondError(req, res, 404, errorSolicitudes);

        solicitudes.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, solicitudes);
    } catch (error) {
        handleError(error, 'solicitud.controller -> getSolicitudes');
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea una nueva solicitud
 * 
 */ 

async function createSolicitud(req, res) {
    try {
        const {body} = req;
        const {error: bodyError} = solicitudBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newSolicitud, solicitudError] = await SolicitudService.createSolicitud(body);

        if (solicitudError) return respondError(req, res, 400, solicitudError);
        if (!newSolicitud) {
            return respondError(req, res, 400, 'No se creo la solicitud');
        }

        respondSuccess(req, res, 201, newSolicitud);
    } catch (error) {
        handleError(error, 'solicitud.controller -> createSolicitud');
        respondError(req, res, 500, 'No se creo la solicitud');
    }
}

module.exports = {
    getSolicitudes,
    createSolicitud,
};

