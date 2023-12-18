<<<<<<< HEAD
/* eslint-disable max-len */
=======
>>>>>>> 1eb032b186e9d443674fbc002e38e9bb8944509f
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
<<<<<<< HEAD
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cita",
=======
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 50,
>>>>>>> 1eb032b186e9d443674fbc002e38e9bb8944509f
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
<<<<<<< HEAD
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
=======
>>>>>>> 1eb032b186e9d443674fbc002e38e9bb8944509f
    },
    estado: {
        type: String,
        required: true,
        enum: ESTADOS,
    },
    imagenes: {
        type: String,
<<<<<<< HEAD
        default: "contru.jpg",
    },
},
{
    versionKey: false,
},
);
=======
        default: "./uploads/imagenes.jpg",
    },
});
>>>>>>> 1eb032b186e9d443674fbc002e38e9bb8944509f

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Exporta el modelo de datos 'Feedback'
module.exports = Feedback;