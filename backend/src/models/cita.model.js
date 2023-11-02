"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'citas'
const citaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLenght: 2
        },
        typeOfRequest: {
            type: String,
            required: true,
            minLenght: 5
        },
        address: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        visitRealizated:{
            type: String,
            default: "No",
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
