/* eslint-disable eol-last */
/* eslint-disable max-len */
"use strict";

const mongoose = require("mongoose");
const ESTADOS = require("../constants/estados.constants");
const TYPES = require("../constants/tipoCitas.constants");

// Esquema Informe
const informeSchema = new mongoose.Schema({
    IDFeedback: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
    ubicacion: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        default: "Ya realiza la visista a terreno, y viendo la obra en terreno, se puede decir que la obra se encuentra con instalaciones",
    },
    D: {
        type: String,
        required: true,
    },
    observaciones: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
        enum: ESTADOS,
    },
},
{
    versionKey: false,
},
);

const Informe = mongoose.model("Informe", informeSchema);

module.exports = Informe;