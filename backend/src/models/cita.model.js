"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'citas'
const citaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        typeOfRequest: {
            type: String,
            required: true,
        },
        date: {
            type: date,
            required: true
        }
    },
    {
        versionKey: false,
    },
);

/** Modelo de datos 'Cita' */
const Cita = mongoose.model("Cita", diarySchema);

// Exporta el modelo de datos 'Cita'
module.exports = Cita;
