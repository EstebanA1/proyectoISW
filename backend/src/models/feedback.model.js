/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable spaced-comment */
"use strict";

const mongoose = require("mongoose");
const ESTADOS = require("../constants/estados.constants");
const FechaActual = new Date();

// Esquema Feedback
const feedbackSchema = new mongoose.Schema({
    IDCita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cita",
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
    informe: {
        type: String,
        default: "El la visita a Terreno hecha hoy a la obra, se llevó a cabo una visita al sitio de construcción. Durante la inspección, se observó que el progreso de la construcción ha alcanzado un estado de avance según lo planificado. Se verificó la calidad de los materiales utilizados y se discutieron los posibles desafíos encontrados en el proceso. Además, se identificaron áreas críticas que requieren atención especial en las próximas etapas del proyecto. Se recomienda realizar una visita de seguimiento para evaluar el progreso y abordar cualquier problema potencial. Se adjuntan fotografías que documentan el estado actual de la construcción. Lo mas notorio ",
        minLenght: 2,
    },
    detalles: {
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
        default: "contru.jpg",
    },
},
{
    versionKey: false,
},
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Exporta el modelo de datos 'Feedback'
module.exports = Feedback;