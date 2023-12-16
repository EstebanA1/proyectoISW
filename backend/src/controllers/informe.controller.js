/* eslint-disable brace-style */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable eol-last */
"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const InformeService = require("../services/informe.service");
const { handleError } = require("../utils/errorHandler");
const { informeBodySchema, informeIdSchema } = require("../schema/feedback.schema");
const CitaService = require("../services/citas.service");
const FeedbackService = require("../services/feedback.service");

/**
 * Controlador de Informe
 * @module InformeController
 */
async function getInforme(req, res) {
    try {
        const [informe, errorInforme] = await InformeService.getInforme();
        if (errorInforme) return respondError(req, res, 404, errorInforme);

        informe.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, ["Los Informes son: ", informe]);
    } catch (error) {
        handleError(error, "informe.controller -> getInforme");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea un nuevo informe
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createInforme(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = informeBodySchema.validate(body);

        if (bodyError) return respondError(req, res, 400, bodyError.message);

        //Verificar ID de la retroalimentacion
        const [feedback, errorFeedback] = await FeedbackService.getFeedbackById(body.IDFeedback);
        if (errorFeedback) return respondError(req, res, 404, "No Existe Retroalimentacion Asociada Con Ese ID Para Informe, Revise ID de Cita");

        const [newInforme, informeError] = await InformeService.createInforme(body);

        if (informeError) return respondError(req, res, 400, informeError);
        if (!newInforme) {
            return respondError(req, res, 400, "No se creo el Informe");
        }

        respondSuccess(req, res, 201, newInforme);
    }
    catch (error) {
        handleError(error, "informe.controller -> createInforme");
        respondError(req, res, 500, "No se creo el Informe");
    }
}

/**
 * Obtiene un informe por su id
 * 
 */
async function getInformeById(req, res) {
    try {
        const { id } = req.params;
        const { error: idError } = informeIdSchema.validate(id);
        if (idError) return respondError(req, res, 400, idError.message);

        const [informe, errorInforme] = await InformeService.getInformeById(id);
        if (errorInforme) return respondError(req, res, 404, errorInforme);

        respondSuccess(req, res, 200, informe);
    } catch (error) {
        handleError(error, "informe.controller -> getInformeById");
        respondError(req, res, 400, "No se pudo obtener el Informe");
    }
}

/**
 * Actualiza un informe por su id
 * 
 */
async function updateInforme(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        const { error: bodyError } = informeBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
        const { error: idError } = informeIdSchema.validate(id);
        if (idError) return respondError(req, res, 400, idError.message);

        //Verificar ID de la retroalimentacion
        const [feedback, errorFeedback] = await FeedbackService.getFeedbackById(body.IDFeedback);
        if (errorFeedback) return respondError(req, res, 404, "No Existe Retroalimentacion Asociada Con Ese ID Para Informe, Revise ID de Cita");

        const [updatedInforme, errorUpdateInforme] = await InformeService.updateInforme(id, body);
        if (errorUpdateInforme) return respondError(req, res, 404, errorUpdateInforme);

        respondSuccess(req, res, 200, updatedInforme);
    } catch (error) {
        handleError(error, "informe.controller -> updateInforme");
        respondError(req, res, 400, "No se pudo actualizar el Informe");
    }
}

/**
 * Elimina un informe por su id
 * 
 */
async function deleteInforme(req, res) {
    try {
        const { id } = req.params;
        const { error: idError } = informeIdSchema.validate(id);
        if (idError) return respondError(req, res, 400, idError.message);

        const [deletedInforme, errorDeleteInforme] = await InformeService.deleteInforme(id);
        if (errorDeleteInforme) return respondError(req, res, 404, errorDeleteInforme);

        respondSuccess(req, res, 200, deletedInforme);
    } catch (error) {
        handleError(error, "informe.controller -> deleteInforme");
        respondError(req, res, 400, "No se pudo eliminar el Informe");
    }
}

module.exports = {
    getInforme,
    createInforme,
    getInformeById,
    updateInforme,
    deleteInforme,
};