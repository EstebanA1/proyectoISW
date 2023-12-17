"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'citas'
const citaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        typeOfRequest: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        hour: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "Pendiente",
        },
        visitRealizated:{
            type: String,
            default: "No",
        },
        ID_Solicitud:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Solicitud",
        }
    },
    {
        versionKey: false,
    },
);

/** Modelo de datos 'Cita' */
const Cita = mongoose.model("Cita", citaSchema);

// Exporta el modelo de datos 'Cita'
module.exports = Cita;
