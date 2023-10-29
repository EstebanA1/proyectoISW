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
        const { nombre, tipo, rut, firma, fecha, logo } = solicitud;

        const solicitudFound = await Solicitud.findOne({ nombre: solicitud.nombre });
        if (solicitudFound) return [null, "La solicitud ya existe"];

        const newSolicitud = new Solicitud({
            nombre,
            tipo,
            rut,
            firma,
            fecha,
            logo,
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

        const { nombre, tipo, rut, firma, fecha, logo, estado } = solicitud;

        await Solicitud.findByIdAndUpdate(solicitudId, {
            nombre,
            tipo,
            rut,
            firma,
            fecha,
            logo,
            estado,
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

module.exports = {
    getSolicitudes,
    createSolicitud,
    updateSolicitud,
    deleteSolicitud,
    getSolicitudById,
};


