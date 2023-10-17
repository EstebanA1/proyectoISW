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
        date: {
            type: String,
            required: true,
        },
        status1: {
            type: String,
            required: true,
        },
        status2: {
            type: String,
            required: true,
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
