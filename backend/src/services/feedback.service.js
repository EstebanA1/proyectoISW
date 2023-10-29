"use strict";

const Feedback = require("../models/feedback.model");
const { handleError } = require("../utils/errorHandler");
const multer = require("multer");
const mongoose = require("mongoose");

/**
 * Obtener Feedbacks de Visitas a Terreno
 * @returns
 */
async function getFeedback() {
    try {
        const feedbacks = await Feedback.find();
        if (!feedbacks) return [null, "No hay Retroalimentaciones de Visitas a Terreno"];
        return [feedbacks, null];
    } catch (error) {
        handleError(error, "feedback.service -> getFeedbacks");
    }
}

/**
 * Crear Feedbacks de Visitas a Terreno
 * @param {*} feedback
 * @returns
 */
async function createFeedback(feedback) {
    try {
        const { IDCita, solicitante, fechaVisita, informe, comentarios, imagenes, estado } = feedback;

        const feedbackFound = await Feedback.findOne({ IDCita: feedback.IDCita });
        if (feedbackFound) return [null, "La Retroalimentación de Visita a Terreno ya existe"];

        const newFeedback = new Feedback({
            IDCita,
            solicitante,
            fechaVisita,
            informe,
            comentarios,
            imagenes,
            estado,
        });
        await newFeedback.save();

        return [newFeedback, null];
    } catch (error) {
        handleError(error, "feedback.service -> createFeedback");
    }
}

/**
 * Obtener Feedbacks de Visitas a Terreno por Id
 * @param {string} id Id del feedback
 * @param {Object} feedback Objeto de feedback
 * @returns {Promise} Promesa con el objeto de feedback actualizado
 */
async function getFeedbackById(id) {
    try {
        const feedback = await Feedback.findById(id).exec();
        if (!feedback) return [null, "La Retroalimentación de Visita a Terreno no existe"];

        return [feedback, null];
    } catch (error) {
        handleError(error, "feedback.service -> getFeedbackById");
    }
}

/**
 * Actualizar Feedbacks de Visitas a Terreno por Id
 * @param {string} id Id del feedback
 * @param {Object} feedback Objeto de feedback
 * @returns {Promise} Promesa con el objeto de feedback actualizado
 */
async function updateFeedback(id, feedback) {
    try {
        const feedbackFound = await Feedback.findById(id);
        if (!feedbackFound) return [null, "La Retroalimentación de Visita a Terreno no existe"];
        
        const { IDCita, solicitante, fechaVisita, informe, comentarios, imagenes, estado } = feedback;

        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            {
                IDCita,
                solicitante,
                fechaVisita,
                informe,
                comentarios,
                imagenes,
                estado,
            },
            { new: true }
        );

        return [updatedFeedback, null];
    } catch (error) {
        handleError(error, "El Feedback no existe, pruebe otro ID");
    }
}

/**
 * Eliminar Feedbacks de Visitas a Terreno por Id
 * @param {string} id
 * @returns {Promise}
 */
async function deleteFeedback(id) {
    try {
        const feedbackFound = await Feedback.findById(id);
        if (!feedbackFound) return [null, "La Retroalimentación de Visita a Terreno no existe"];

        await Feedback.findByIdAndDelete(id);

        return ["Retroalimentación de Visita a Terreno eliminada", null];
    } catch (error) {
        handleError(error, "feedback.service -> deleteFeedback");
    }
}

module.exports = {
    getFeedback,
    createFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
};