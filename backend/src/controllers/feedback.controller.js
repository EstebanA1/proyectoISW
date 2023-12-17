/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const FeedbackService = require("../services/feedback.service");
const { handleError } = require("../utils/errorHandler");
const { feedbackBodySchema, feedbackIdSchema } = require("../schema/feedback.schema");
const Joi = require("joi");

const CitaService = require("../services/citas.service");

/**
 * Controlador de Feedback
 * @module FeedbackController
 */
async function getFeedback(req, res) {
    try {
        const [feedback, errorFeedback] = await FeedbackService.getFeedback();
        if (errorFeedback) return respondError(req, res, 404, errorFeedback);

        feedback.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, ["Las Retroalimentaciones son: ", feedback]);
    } catch (error) {
        handleError(error, "feedback.controller -> getFeedback");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea un nuevo feedback
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createFeedback(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = feedbackBodySchema.validate(body);

        if (bodyError) return respondError(req, res, 400, bodyError.message);

        //Verificar ID de la cita
        const [cita, errorCitas] = await CitaService.getCitaById(body.IDCita);
        if (errorCitas) return respondError(req, res, 404, "No Existe Cita Asociada Con Ese ID Para Retroalimentacion, Revise ID de Cita");

        //Imagenes
        /*for (const file of req.files) {
            switch (file.fieldname) {
              case "imagenes":
                body.imagenes = "../../uploads/" + file.filename;
                break;
            }
        }//*/

        const [newFeedback, feedbackError] = await FeedbackService.createFeedback(body);

        if (feedbackError) return respondError(req, res, 400, feedbackError);
        if (!newFeedback) {
            return respondError(req, res, 400, "No se creo la Retroalimentación");
        }

        cita.visitRealizated = "Si";
        const { updateCita, updateError } = await CitaService.updateCita(body.IDCita, cita);
        if (updateError) return respondError(req, res, 400, "No se pudo actualizar la cita");

        respondSuccess(req, res, 201, newFeedback);
    } catch (error) {
        handleError(error, "feedback.controller -> createFeedback");
        respondError(req, res, 500, "No se creo la Retroalimentación");
    }
}

/**
 * Obtiene un feedback por su id
 * 
 */
async function getFeedbackById(req, res) {
    try {
        const { id } = req.params;
        const { error: idError } = feedbackIdSchema.validate(id);
        if (idError) return respondError(req, res, 400, idError.message);

        const [feedback, errorFeedback] = await FeedbackService.getFeedbackById(id);
        if (errorFeedback) return respondError(req, res, 404, errorFeedback);

        respondSuccess(req, res, 200, feedback);
    } catch (error) {
        handleError(error, "feedback.controller -> getFeedbackById");
        respondError(req, res, 400, "No se pudo obtener la Retroalimentación");
    }
}

/**
 * Actualiza un feedback por su id
 * 
 */
async function updateFeedback(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        const { error: bodyError } = feedbackBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
        const { error: idError } = feedbackIdSchema.validate(id);
        if (idError) return respondError(req, res, 400, idError.message);

        //Verificar ID de la cita
        const [cita, errorCitas] = await CitaService.getCitaById(body.IDCita);
        if (errorCitas) return respondError(req, res, 404, "No Existe Cita Asociada Con Ese ID Para Retroalimentacion, Revise ID de Cita");

        /*//Imagenes
        for (const file of req.files) {
            switch (file.fieldname) {
              case "imagenes":
                body.imagenes = body.imagenes || [];
                body.imagenes.push("../../uploads/" + file.filename);
                break;
            }
        }*/

        const [updatedFeedback, errorUpdateFeedback] = await FeedbackService.updateFeedback(id, body);
        if (errorUpdateFeedback) return respondError(req, res, 404, errorUpdateFeedback);

        respondSuccess(req, res, 200, updatedFeedback);
    } catch (error) {
        handleError(error, "feedback.controller -> updateFeedback");
        respondError(req, res, 400, "No se pudo actualizar la Retroalimentación");
    }
}

/**
 * Elimina un feedback por su id
 * 
 */
async function deleteFeedback(req, res) {
    try {
        const { id } = req.params;
        const { error: idError } = feedbackIdSchema.validate(id);
        if (idError) return respondError(req, res, 400, idError.message);

        const [deletedFeedback, errorDeleteFeedback] = await FeedbackService.deleteFeedback(id);
        if (errorDeleteFeedback) return respondError(req, res, 404, errorDeleteFeedback);

        respondSuccess(req, res, 200, deletedFeedback);
    } catch (error) {
        handleError(error, "feedback.controller -> deleteFeedback");
        respondError(req, res, 400, "No se pudo eliminar la Retroalimentación");
    }
}

module.exports = {
    getFeedback,
    createFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
};
