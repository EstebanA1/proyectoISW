"use strict";

// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");
const ESTADO2 = require("../constants/estadosSolicitud.constants");
const FechaActual = new Date();

// Crea el esquema de la coleccion 'solicitudes'

const solicitudSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    rut: {
        type: String,
        required: true,
    },
    firma: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        default: FechaActual.getDate() + "/" + (FechaActual.getMonth() + 1) + "/" + FechaActual.getFullYear(),
    },
    estadoDeRespuesta: {
        type: String,
        default: "Pendiente",
    },
    estado: {
        type: String,
        default: "Pendiente",
    },
     archivoPDF: {
        type: String,
        default: "./uploads/archivoPDF.pdf,"
    }, 
});

/** Modelo de datos 'Solicitud' */
const Solicitud = mongoose.model("Solicitud", solicitudSchema);

// Exporta el modelo de datos 'Solicitud'
module.exports = Solicitud;