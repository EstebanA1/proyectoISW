/* eslint-disable eol-last */
/* eslint-disable max-len */
"use strict";

const mongoose = require("mongoose");
const ESTADOS = require("../constants/estados.constants");
const TYPES = require("../constants/tipoCitas.constants");

// Esquema Informe
const informeSchema = new mongoose.Schema({
    IDFeedback: {
<<<<<<< HEAD
        type: mongoose.Schema.Types.ObjectId,
        required: true,
=======
        type: String,
        required: true,
    },
    Titulo: {
        type: String,
        default: "Informe de Visita a Terreno",
>>>>>>> 1eb032b186e9d443674fbc002e38e9bb8944509f
    },
    solicitante: {
        type: String,
        required: true,
        minLenght: 3,
    },
    TipoObra: {
<<<<<<< HEAD
        type: String,
        required: true,
        enum: TYPES,
=======
        type: String,
        required: true,
        enum: TYPES,
    },
    A: {
        type: String,
        default: "1. Tipo de Obra",
>>>>>>> 1eb032b186e9d443674fbc002e38e9bb8944509f
    },
    ubicacion: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
<<<<<<< HEAD
        default: "Ya realiza la visista a terreno, y viendo la obra en terreno, se puede decir que la obra se encuentra con instalaciones",
    },
    D: {
        type: String,
=======
        default: "2. Ubicación",
    },
    B_1: {
        type: String,
        required: true,
    },
    C: {
        type: String,
        default: "3. Descripción",
    },
    C_1: {
        type: String,
        default: "Ya realiza la visista a terreno, y viendo la obra en terreno, se puede decir que la obra se encuentra con instalaciones",
    },
    C_2: {
        type: String,
        required: true,
    },
    D: {
        type: String,
        default: "4. Observaciones",
    },
    D_1: {
        type: String,
>>>>>>> 1eb032b186e9d443674fbc002e38e9bb8944509f
        required: true,
    },
    observaciones: {
        type: String,
<<<<<<< HEAD
        required: true,
=======
        default: "5. Recomendaciones",
    },
    E_1: {
        type: String,
        default: "Dado las observaciones realizadas, se deja constacia que la obra se deja en estado",
>>>>>>> 1eb032b186e9d443674fbc002e38e9bb8944509f
    },
    estado: {
        type: String,
        required: true,
        enum: ESTADOS,
    },
<<<<<<< HEAD
},
{
    versionKey: false,
},
);
=======
});
>>>>>>> 1eb032b186e9d443674fbc002e38e9bb8944509f

const Informe = mongoose.model("Informe", informeSchema);

module.exports = Informe;