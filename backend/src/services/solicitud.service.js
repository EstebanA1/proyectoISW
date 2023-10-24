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
        const { name, typeOfRequest, address, date, status } = solicitud;

        const solicitudFound = await Solicitud.findOne({ name: solicitud.name });
        if (solicitudFound) return [null, "La solicitud ya existe"];

        const newSolicitud = new Solicitud({
            name,
            typeOfRequest,
            address,
            date,
            status,
        });
        await newSolicitud.save();

        return [newSolicitud, null];
    } catch (error) {
        handleError(error, "solicitud.service -> createSolicitud");
    }
}

module.exports = {
    getSolicitudes,
    createSolicitud,
};


