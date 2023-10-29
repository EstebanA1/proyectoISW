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
        const { nombreSolicitante, rutSolicitante, firma, fechaEmicionDocumento, logoInstitucion, archivoPlanos } = solicitud;

        const solicitudFound = await Solicitud.findOne({ name: solicitud.name });
        if (solicitudFound) return [null, "La solicitud ya existe"];

        const newSolicitud = new Solicitud({
            nombreSolicitante,
            rutSolicitante,
            firma,
            fechaEmicionDocumento,
            logoInstitucion,
            archivoPlanos,
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

        const { nombreSolicitante, rutSolicitante, firma, fechaEmicionDocumento, logoInstitucion, archivoPlanos } = solicitud;

        await Solicitud.findByIdAndUpdate(solicitudId, {
            nombreSolicitante,
            rutSolicitante,
            firma,
            fechaEmicionDocumento,
            logoInstitucion,
            archivoPlanos,
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

module.exports = {
    getSolicitudes,
    createSolicitud,
    updateSolicitud,
    deleteSolicitud,
};


