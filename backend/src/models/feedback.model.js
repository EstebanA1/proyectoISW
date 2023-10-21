"use strict";

const { default: mongoose } = require("mongoose");
const Joi = require("joi");

// Esquema Feedback
const feedbackSchema = new mongoose.Schema({
    Fecha: {
        type: String,
        required: true,
    },
    informe: {
        type: String,
        required: true,
        minLenght: 10
    },
    comentarios: {
        type: String,
        required: true,
        minLenght: 10
    },
    Imagenes: {
        type: [String],
        required: true,
    },
    estado: {
        type: String,
        required: true,
    }
});


/** Modelo de datos 'Feedback' */
const Feedback = mongoose.model("Feedback", feedbackSchema);

// Exporta el modelo de datos 'Feedback'
module.exports = Feedback;