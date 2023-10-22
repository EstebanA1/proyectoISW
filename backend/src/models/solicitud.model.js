"use strict";

// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'solicitudes' 

const solicitudSchema = new mongoose.Schema(
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
        }
    },
    {
        versionKey: false,
    },
);

/** Modelo de datos 'Solicitud' */
const Solicitud = mongoose.model("Solicitud", solicitudSchema);

// Exporta el modelo de datos 'Solicitud'
module.exports = Solicitud;

