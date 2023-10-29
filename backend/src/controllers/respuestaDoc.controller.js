"use strict";   

const { respondSuccess, respondError } = require("../utils/resHandler");
const {handleError} = require('../utils/errorHandler');
const RespuestaDocService = require('../services/respuestaDoc.service');
const { respuestaDocBodySchema, respuestaDocIdSchema } = require('../schema/respuestaDoc.schema');
const Joi = require('joi');

/**
 *  Controlador de respuestaDoc
 * @module respuestaDocController

    */

async function getRespuestasDoc(req, res) {
    try {
        const [respuestasDoc, errorRespuestasDoc] = await RespuestaDocService.getRespuestasDoc();
        if (errorRespuestasDoc) return respondError(req, res, 404, errorRespuestasDoc);

        respuestasDoc.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, respuestasDoc);
    } catch (error) {
        handleError(error, 'respuestaDoc.controller -> getRespuestasDoc');
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea una nueva respuestaDoc
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function createRespuestaDoc(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = respuestaDocBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newRespuestaDoc, respuestaDocError] = await RespuestaDocService.createRespuestaDoc(body);

        if (respuestaDocError) return respondError(req, res, 400, respuestaDocError);
        if (!newRespuestaDoc) {
            return respondError(req, res, 400, 'No se creo la respuesta');
        }

        respondSuccess(req, res, 201, newRespuestaDoc);
    } catch (error) {
        handleError(error, 'respuestaDoc.controller -> createRespuestaDoc');
        respondError(req, res, 500, 'No se creo la respuesta');
    }
}

/**
 * Obtiene una respuestaDoc por su id   
 * 
 * 
 */ 

async function getRespuestaDocById(req, res) {
    try {
        const { id } = req.params;
        const { error: idError } = respuestaDocIdSchema.validate(id);
        if (idError) return respondError(req, res, 400, idError.message);

        const [respuestaDoc, errorRespuestaDoc] = await RespuestaDocService.getRespuestaDocById(id);
        if (errorRespuestaDoc) return respondError(req, res, 404, errorRespuestaDoc);

        respondSuccess(req, res, 200, respuestaDoc);
    } catch (error) {
        handleError(error, 'respuestaDoc.controller -> getRespuestaDocById');
        respondError(req, res, 400, error.message);
    }
}

/**
 *  

    */

async function updateRespuestaDoc(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        const { error: idError } = respuestaDocIdSchema.validate(id);
        if (idError) return respondError(req, res, 400, idError.message);

        const [updatedRespuestaDoc, errorUpdatedRespuestaDoc] = await RespuestaDocService.updateRespuestaDoc(id, body);
        if (errorUpdatedRespuestaDoc) return respondError(req, res, 404, errorUpdatedRespuestaDoc);

        respondSuccess(req, res, 200, updatedRespuestaDoc);
    } catch (error) {
        handleError(error, 'respuestaDoc.controller -> updateRespuestaDoc');
        respondError(req, res, 400, error.message);
    }
}

/**
 * Elimina una respuestaDoc por su id
 *  
 *  
 *  
 */

async function deleteRespuestaDoc(req, res) {
    try {
        const { params } = req;

        const { error: paramsError } = respuestaDocIdSchema.validate(params.id);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const respuestaDoc = await RespuestaDocService.deleteRespuestaDoc(params.id);

        !respuestaDoc
            ? respondError(req, res, 404, "No se encontro el documento indicado", "Verifique el id ingresado")
            : respondSuccess(req, res, 200, "El documento fue eliminado con exito");
    } catch (error) {
        handleError(error, "respuestaDoc.controller -> deleteRespuestaDoc");
        respondError(req, res, 500, "No se pudo eliminar el documento");
    }
}

module.exports = {
    getRespuestaDocById,
    getRespuestasDoc,
    createRespuestaDoc,
    updateRespuestaDoc,
    deleteRespuestaDoc,
};