"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'usuarios'
const diarySchema = new mongoose.Schema(
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

/** Modelo de datos 'diary' */
const User = mongoose.model("Diary", diarySchema);

// Exporta el modelo de datos 'Diary'
module.exports = Diary;
