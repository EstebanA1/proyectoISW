"use strict";

// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");
// const fechaActual = new Date();

// Crea el esquema de la coleccion 'respuestasDoc'

const respuestaDocSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    rut: {
        type: String,
        required: true,
    },    
    descripcion: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        // default: fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear(),
    },
    ID_solicitud: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solicitud"    
    },
});

/** Modelo de datos 'RespuestaDoc' */
const RespuestaDoc = mongoose.model("RespuestaDoc", respuestaDocSchema);

// Exporta el modelo de datos 'RespuestaDoc'
module.exports = RespuestaDoc;
