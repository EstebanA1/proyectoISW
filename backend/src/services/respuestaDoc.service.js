"use strict";

const RespuestaDoc = require("../models/respuestaDoc.model");
const handleError = require("../utils/errorHandler");

async function getRespuestasDoc() {
    try {
        const respuestasDoc = await RespuestaDoc.find();
        if (!respuestasDoc) return [null, "No hay respuestas"];
        return [respuestasDoc, null];
    } catch (error) {
        handleError(error, "respuestaDoc.service -> getRespuestasDoc");
    }
}

async function createRespuestaDoc(respuestaDoc) {
    try {
        const { nombre, descripcion } = respuestaDoc;

        const respuestaDocFound = await RespuestaDoc.findOne({ nombre: respuestaDoc.nombre });
        if (respuestaDocFound) return [null, "La respuesta ya existe"];

        const newRespuestaDoc = new RespuestaDoc({
            nombre,
            descripcion,
        });
        await newRespuestaDoc.save();

        return [newRespuestaDoc, null];
    } catch (error) {
        handleError(error, "respuestaDoc.service -> createRespuestaDoc");
    }
}

async function updateRespuestaDoc(respuestaDocId, respuestaDoc) {
    try {
        const respuestaDocFound = await RespuestaDoc.findById(respuestaDocId);
        if (!respuestaDocFound) return [null, "La respuesta no existe"];

        const { nombre, descripcion } = respuestaDoc;

        await RespuestaDoc.findByIdAndUpdate(respuestaDocId, {
            nombre,
            descripcion,
        });

        return [true, null];
    } catch (error) {
        handleError(error, "respuestaDoc.service -> updateRespuestaDoc");
    }
}

async function deleteRespuestaDoc(respuestaDocId) {
    try {
        const solicitudFound = await Solicitud.findById(respuestaDocId);
        if (!solicitudFound) return [null, "La solicitud no existe"];

        await Solicitud.findByIdAndDelete(respuestaDocId);

        return [true, null];
    } catch (error) {
        handleError(error, "respuestaDoc.service -> deleteRespuestaDoc");
    }
}

async function getRespuestaDocById(respuestaDocId) {
    try {
        const respuestaDocFound = await RespuestaDoc.findById(respuestaDocId);
        if (!respuestaDocFound) return [null, "La respuesta no existe"];
        return [respuestaDocFound, null];
    } catch (error) {
        handleError(error, "respuestaDoc.service -> getRespuestaDocById");
    }
}


module.exports = {
    getRespuestasDoc,
    createRespuestaDoc,
    updateRespuestaDoc,
    deleteRespuestaDoc,
    getRespuestaDocById,
};