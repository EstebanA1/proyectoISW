/* eslint-disable eol-last */
/* eslint-disable max-len */
"use strict";

const { default: mongoose } = require("mongoose");
const ESTADOS = require("../constants/estados.constants");
const TYPES = require("../constants/tipoCitas.constants");

// Esquema Informe
const informeSchema = new mongoose.Schema({
    IDFeedback: {
        type: String,
        required: true,
    },
    Titulo: {
        type: String,
        default: "Informe de Visita a Terreno",
    },
    solicitante: {
        type: String,
        required: true,
        minLenght: 3,
    },
    TipoObra: {
        type: String,
        required: true,
        enum: TYPES,
    },
    A: {
        type: String,
        default: "1. Tipo de Obra",
    },
    A_1: {
        type: String,
        required: true,
    },
    B: {
        type: String,
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
        required: true,
    },
    E: {
        type: String,
        default: "5. Recomendaciones",
    },
    E_1: {
        type: String,
        default: "Dado las observaciones realizadas, se deja constacia que la obra se deja en estado",
    },
    estado: {
        type: String,
        required: true,
        enum: ESTADOS,
    },
});

const Informe = mongoose.model("Informe", informeSchema);

module.exports = Informe;