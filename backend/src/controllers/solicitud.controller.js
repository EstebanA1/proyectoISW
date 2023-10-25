"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const {handleError} = require('../utils/errorHandler');
// const {solicitudBodySchema, solicitudIdSchema} = require('../schema/solicitud.schema');
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
        // const {error: bodyError} = solicitudBodySchema.validate(body);
        // if (bodyError) return respondError(req, res, 400, bodyError.message);

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

async function updateSolicitud(req, res) {
    try {
        const {body, params} = req;
        // const {error: bodyError} = solicitudBodySchema.validate(body);
        // if (bodyError) return respondError(req, res, 400, bodyError.message);

        // const {error: paramsError} = solicitudIdSchema.validate(params);
        // if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [solicitudUpdated, solicitudError] = await SolicitudService.updateSolicitud(params.id, body);

        if (solicitudError) return respondError(req, res, 400, solicitudError);
        if (!solicitudUpdated) {
            return respondError(req, res, 400, 'No se actualizo la solicitud');
        }

        respondSuccess(req, res, 200, solicitudUpdated);
    } catch (error) {
        handleError(error, 'solicitud.controller -> updateSolicitud');
        respondError(req, res, 500, 'No se actualizo la solicitud');
    }
}

async function deleteSolicitud(req, res) {
    try {
        const {params} = req;
        // const {error: paramsError} = solicitudIdSchema.validate(params);
        // if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [solicitudDeleted, solicitudError] = await SolicitudService.deleteSolicitud(params.id);

        if (solicitudError) return respondError(req, res, 400, solicitudError);
        if (!solicitudDeleted) {
            return respondError(req, res, 400, 'No se elimino la solicitud');
        }

        respondSuccess(req, res, 200, solicitudDeleted);
    } catch (error) {
        handleError(error, 'solicitud.controller -> deleteSolicitud');
        respondError(req, res, 500, 'No se elimino la solicitud');
    }
}

module.exports = {
    getSolicitudes,
    createSolicitud,
};



