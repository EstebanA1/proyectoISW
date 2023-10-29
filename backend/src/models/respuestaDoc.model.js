"use strict";

// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'respuestasDoc'

const respuestaDocSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },  
});

/** Modelo de datos 'RespuestaDoc' */
const RespuestaDoc = mongoose.model("RespuestaDoc", respuestaDocSchema);

// Exporta el modelo de datos 'RespuestaDoc'
module.exports = RespuestaDoc;

