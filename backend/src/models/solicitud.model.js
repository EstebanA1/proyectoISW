"use strict";

// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");
const ESTADO2 = require("../constants/estadosSolicitud.constants");

// Crea el esquema de la coleccion 'solicitudes'

const solicitudSchema = new mongoose.Schema(
    {
        nombreSolicitante: {
            type: String,
            required: true,
            minLenght: 2
        },
        rutSolicitante: {
            type: String,
            required: true,
        },
        firma: {
            type: String,
            required: true,
        },
        fechaEmicionDocumento: {
            type: Date,
            required: true,
        },
        logoInstitucion: {
            type: String,
            required: true,
        },
        archivoPlanos: {
            type: Boolean,
            required: false, //Se deja en falso por duda a que se adjunte un archivo o no
        },
    },
    {
        versionKey: false,
    },
);

/** Modelo de datos 'Solicitud' */
const Solicitud = mongoose.model("Solicitud", solicitudSchema);

// Exporta el modelo de datos 'Solicitud'
module.exports = Solicitud;

