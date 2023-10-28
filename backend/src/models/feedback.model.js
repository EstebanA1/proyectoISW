"use strict";

const { default: mongoose } = require("mongoose");
const ESTADOS = require("../constants/estados.constants");

// Esquema Feedback
const feedbackSchema = new mongoose.Schema({
    IDCita: {
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 50
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
    informe: {
        type: String,
        required: true,
        minLenght: 10
    },
    comentarios: {
        type: String,
        required: true,
    },
    imagenes: {//schema arreglar
        type: String,
        required: true,
        //data: Buffer,
        //contentType: String,
        //originalname: String,
    },
    estado: {
        type: String,
        required: true,
        enum: ESTADOS
    }
});


/** Modelo de datos 'Feedback' */
const Feedback = mongoose.model("Feedback", feedbackSchema);

// Exporta el modelo de datos 'Feedback'
module.exports = Feedback;