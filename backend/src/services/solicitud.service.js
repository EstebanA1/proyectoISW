"use strict";

const Solicitud = require("../models/solicitud.model");
const handleError = require("../utils/errorHandler");


async function getSolicitudes() {
    try {
        const solicitudes = await Solicitud.find();
        if (!solicitudes) return [null, "No hay solicitudes"];
        return [solicitudes, null];
    } catch (error) {
        handleError(error, "solicitud.service -> getSolicitudes");
    }
}

async function createSolicitud(solicitud) {
    try {
        const { nombre, tipo, rut, fecha, archivoPDF } = solicitud;
        console.log(solicitud);
        const solicitudFound = await Solicitud.findOne({ nombre: solicitud.nombre });
        if (solicitudFound) return [null, "La solicitud ya existe"];

        const newSolicitud = new Solicitud({
            nombre,
            tipo,
            rut,
            fecha,
            archivoPDF,
        });
        await newSolicitud.save();

        return [newSolicitud, null];
    } catch (error) {
        handleError(error, "solicitud.service -> createSolicitud");
    }
}

async function updateSolicitud(solicitudId, solicitud) {
    try {
        const solicitudFound = await Solicitud.findById(solicitudId);
        if (!solicitudFound) return [null, "La solicitud no existe"];

        const { nombre, tipo, rut, fecha, estadoDeRespuesta, estado, archivoPDF } = solicitud;

        await Solicitud.findByIdAndUpdate(solicitudId, {
            nombre,
            tipo,
            rut,
            fecha,
            estadoDeRespuesta,
            estado,
            archivoPDF,
        });

        return [true, null];
    } catch (error) {
        handleError(error, "solicitud.service -> updateSolicitud");
    }
}

async function deleteSolicitud(solicitudId) {
    try {
        const solicitudFound = await Solicitud.findById(solicitudId);
        if (!solicitudFound) return [null, "La solicitud no existe"];

        await Solicitud.findByIdAndDelete(solicitudId);

        return [true, null];
    } catch (error) {
        handleError(error, "solicitud.service -> deleteSolicitud");
    }
}

async function getSolicitudById(solicitudId) {
    try {
        const solicitud = await Solicitud.findById(solicitudId).exec();
        if (!solicitud) return [null, "La solicitud no existe"];

        return [solicitud, null];
    } catch (error) {
        handleError(error, "solicitud.service -> getSolicitudById");
    }
}

async function getSolicitudByRut(rut) {
    try {
        const solicitud = await Solicitud.findOne({ rut }).exec();
        if (!solicitud) return [null, "No se encontró ninguna solicitud para este RUT"];
        return [solicitud, null];
    } catch (error) {
        handleError(error, "solicitud.service -> getSolicitudByRut");
        return [null, "Error al buscar por RUT"];
    }
}


module.exports = {
    getSolicitudes,
    createSolicitud,
    updateSolicitud,
    deleteSolicitud,
    getSolicitudById,
    getSolicitudByRut,
};


