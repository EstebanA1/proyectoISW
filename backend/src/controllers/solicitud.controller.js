"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const {handleError} = require('../utils/errorHandler');
const {solicitudBodySchema, solicitudIdSchema, solicitudModBodySchema} = require('../schema/solicitud.schema');
const SolicitudService = require('../services/solicitud.service');
const Joi = require('joi');

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

        for (const file of req.files) {
            switch (file.fieldname) {
              case "archivoPDF":
                body.archivoPDF = "uploads/" + file.filename;
                break;
            }
        }

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
        const { params, body } = req;
        const { error: paramsError } = solicitudIdSchema.validate(params.id);
        if (paramsError) return respondError(req, res, 400, paramsError.message)

        const { error: bodyError } = solicitudModBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [solicitud, solicitudError] = await SolicitudService.updateSolicitud(params.id, body);

        if (solicitudError) return respondError(req, res, 404, solicitudError);

        respondSuccess(req, res, 200, ["La solicitud fue actualizada con exito", solicitud]);
    } catch (error) {
        handleError(error, "solicitud.controller -> updateSolicitud");
        respondError(req, res, 500, "No se pudo actualizar la solicitud");
    }
}

async function deleteSolicitud(req, res) {
    try {
        const { id } = req.params;
        const { error: idError } = solicitudIdSchema.validate(id);
        if (idError) return respondError(req, res, 400, idError.message);

        const [deletedSolicitud, errorDeleteSolicitud] = await SolicitudService.deleteSolicitud(id);
        if (errorDeleteSolicitud) return respondError(req, res, 404, errorDeleteSolicitud);

        respondSuccess(req, res, 200, deletedSolicitud);
    } catch (error) {
        handleError(error, "solicitud.controller -> deleteSolicitud");
        respondError(req, res, 400, "No se pudo eliminar la solicitud");
    }
}

async function getSolicitudById(req, res) {
    try {
        const { id } = req.params;
        const { error: idError } = solicitudIdSchema.validate(id);
        if (idError) return respondError(req, res, 400, idError.message);

        const [solicitud, errorSolicitud] = await SolicitudService.getSolicitudById(id);
        if (errorSolicitud) return respondError(req, res, 404, errorSolicitud);

        respondSuccess(req, res, 200, solicitud);
    } catch (error) {
        handleError(error, 'solicitud.controller -> getSolicitudById');
        respondError(req, res, 400, error.message);
    }
}

async function getSolicitudByRut(req, res) {
    try {
        const { params } = req;
        const { error: rutError } = Joi.string().regex(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/).validate(params.rut);

        if (rutError) return respondError(req, res, 400, "RUT inválido");

        const [solicitud, solicitudError] = await SolicitudService.getSolicitudByRut(params.rut);

        if (solicitudError) return respondError(req, res, 400, solicitudError);
        if (!solicitud) {
            return respondError(req, res, 404, 'No se encontró ninguna solicitud para este RUT');
        }

        respondSuccess(req, res, 200, solicitud);
    } catch (error) {
        handleError(error, 'solicitud.controller -> getSolicitudByRut');
        respondError(req, res, 500, 'Error al buscar por RUT');
    }
}

module.exports = {
    getSolicitudes,
    createSolicitud,
    updateSolicitud,
    deleteSolicitud,
    getSolicitudById,
    getSolicitudByRut,
};

