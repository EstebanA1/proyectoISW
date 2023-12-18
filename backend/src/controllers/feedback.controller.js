/* eslint-disable prefer-const */
/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
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
        const citaId = body.IDCita;

        /*
        //Verificar ID de la cita
        const [cita, errorCitas] = await CitaService.getCitaById(citaId);
        if (errorCitas) return respondError(req, res, 404, "No Existe Cita Asociada Con Ese ID Para Retroalimentacion, Revise ID de Cita");
        
        //Visita realizada
        const updateCitaAndHandleError = async (citaId) => {
            const [cita, updateError] = await CitaService.updateCita(citaId, cita);
            if (updateError) {
              respondError(req, res, 400, "No se pudo actualizar la cita");
            }
            return cita;
        };
        cita.visitRealizated = "Si";
        const updateCita = await updateCitaAndHandleError(citaId, cita);
        */
        //Errores
        const { error: bodyError } = feedbackBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

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
        
        respondSuccess(req, res, 201, ["La Retroalimentacion fue creada con exito", newFeedback]);
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
        const { params } = req;
        const { error: paramsError } = feedbackIdSchema.validate(params.id);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [feedback, errorFeedback] = await FeedbackService.getFeedbackById(params.id);
        if (errorFeedback) return respondError(req, res, 404, errorFeedback);

        respondSuccess(req, res, 200, ["La Retroalimentacion Solicitada es: ", feedback]);
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
        const { params, body } = req;
        const { error: paramsError } = feedbackIdSchema.validate(params.id);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
        
        /*if (body.fechaVisita) {
            const aux = new Date();
            const fechaActual = aux.toLocaleDateString();
            const fechaInput = body.fechaVisita;
            let fecha1 = fechaActual.split("-");
            let fecha2 = fechaInput.split("/");
        }

        //Verificar ID de la cita
        const [cita, errorCitas] = await CitaService.getCitaById(body.IDCita);
        if (errorCitas) return respondError(req, res, 404, "No Existe Cita Asociada Con Ese ID Para Retroalimentacion, Revise ID de Cita");
        */
        /*//Imagenes
        for (const file of req.files) {
            switch (file.fieldname) {
              case "imagenes":
                body.imagenes = body.imagenes || [];
                body.imagenes.push("../../uploads/" + file.filename);
                break;
            }
        }*/

        const { error: bodyError } = feedbackBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [feedback, feedbackError] = await FeedbackService.updateFeedback(params.id, body);
        if (feedbackError) return respondError(req, res, 404, feedbackError);

        respondSuccess(req, res, 200, ["Retroalimentacion Actualizada con exito", feedback]);
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

function handleMissingId(req, res) {
    respondError(req, res, 400, 'El ID de la Retroalimentacion es requerido');
}
   
function handleId(req, res) {
    respondError(req, res, 400, 'No se debe proporcionar un ID');
}

module.exports = {
    getFeedback,
    createFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
    handleMissingId,
    handleId,
};
