/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable spaced-comment */
"use strict";

const { default: mongoose } = require("mongoose");
const ESTADOS = require("../constants/estados.constants");
const FechaActual = new Date();

// Esquema Feedback
const feedbackSchema = new mongoose.Schema({
    IDCita: {
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 50,
    },
    solicitante: {
        type: String,
        required: true,
        minLenght: 3,
    },
    fechaVisita: {
        type: String,
        required: true,
    },
    comentarios: {
        type: String,
        required: true,
        minLenght: 2,
    },
    estado: {
        type: String,
        required: true,
        enum: ESTADOS,
    },
    imagenes: {
        type: String,
        default: "./uploads/imagenes.jpg",
    },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Exporta el modelo de datos 'Feedback'
module.exports = Feedback;