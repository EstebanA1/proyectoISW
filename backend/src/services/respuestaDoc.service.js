"use strict";

const Joi = require("joi");

const RespuestaDoc = require("../models/respuestaDoc.model");
const { handleError } = require("../utils/errorHandler");

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
        const { nombre, rut, descripcion, fecha } = respuestaDoc;

        const respuestaDocFound = await RespuestaDoc.findOne({ nombre: respuestaDoc.nombre });
        if (respuestaDocFound) return [null, "La respuesta ya existe"];

        const newRespuestaDoc = new RespuestaDoc({
            nombre,
            rut,
            descripcion,
            fecha,
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

        const { error: descripcionError } = Joi.string().min(3).validate(descripcion);
        if (descripcionError) return [null, "La descripción debe tener más de dos palabras"];

        await RespuestaDoc.findByIdAndUpdate(respuestaDocId, {
            nombre,
            rut,
            fecha,
            descripcion,
        });

        return [true, null];
    } catch (error) {
        handleError(error, "respuestaDoc.service -> updateRespuestaDoc");
    }
}

async function deleteRespuestaDoc(respuestaDocId) {
    try {
        const respuestaDocFound = await RespuestaDoc.findById(respuestaDocId);
        if (!respuestaDocFound) return [null, "La respuesta no existe"];

        await RespuestaDoc.findByIdAndDelete(respuestaDocId);

        return [true, null];
    } catch (error) {
        handleError(error, "respuestaDoc.service -> deleteRespuestaDoc");
    }
}

async function getRespuestaDocById(id) {
    try {
        const respuestaDoc = await RespuestaDoc.findById(id).exec();
        if (!respuestaDoc) return [null, "La respuesta no existe, intente con otro ID"];
        
        return [respuestaDoc, null];
    } catch (error) {
        return [error, "La respuesta no existe, intente con otro ID"];
    }
}

async function getRespuestaDocByRut(rut) {
    try {
        const respuestaDoc = await RespuestaDoc.findOne({ rut }).exec();
        if (!respuestaDoc) return [null, "No se encontró ninguna respuesta para este RUT"];
        return [respuestaDoc, null];
    } catch (error) {
        handleError(error, "respuestaDoc.service -> getRespuestaDocByRut");
        return [null, "Error al buscar por RUT"];
    }
}

module.exports = {
    getRespuestasDoc,
    createRespuestaDoc,
    updateRespuestaDoc,
    deleteRespuestaDoc,
    getRespuestaDocById,
    getRespuestaDocByRut,
};