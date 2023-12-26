"use strict";
const Cita = require("../models/cita.model.js");
const { handleError } = require("../utils/errorHandler");

async function getCitas() {
    try {
        const citas = await Cita.find()
            .exec();
        if (!citas) return [null, "No hay citas"];

        return [citas, null];
    } catch (error) {
        handleError(error, "cita.service -> getCitas");
    }
}

async function createCita(cita) {
    try {
        const { name, typeOfRequest, address, date, hour, status, visitRealizated, ID_Solicitud } = cita;

        const citasFound = await Cita.find({ name: new RegExp('^' + name + ' [AC][0-9]+$'), typeOfRequest });

        const count = citasFound.length + 1;

        const newName = name + ' ' + (typeOfRequest === 'Ampliación' ? 'A' : 'C') + count;

        const newCita = new Cita({
            name: newName,
            typeOfRequest,
            address,
            date,
            hour,
            status,
            visitRealizated,
            ID_Solicitud
        });
        await newCita.save();

        return [newCita, null];
    } catch (error) {
        handleError(error, "cita.service -> createCita");
    }
}


async function getCitaById(id) {

    try {
        const cita = await Cita.findById(id).exec();
        if (!cita) return [null, "La cita no existe, intente otro ID"];

        return [cita, null];
    } catch (error) {
        return [null, "La cita no existe, intente otro ID"];
    }
}

async function updateCita(id, cita) {
    try {

        const citaFound = await Cita.findById(id);
        if (!citaFound) return [null, "La cita no existe, pruebe otro ID"];

        const { name, typeOfRequest, address, date, hour, status, visitRealizated, ID_Solicitud } = cita;

        const citaUpdated = await Cita.findByIdAndUpdate(
            id,
            {
                name,
                typeOfRequest,
                address,
                date,
                hour,
                status,
                visitRealizated,
                ID_Solicitud
            },
            { new: true },
        );

        return [citaUpdated, null];
    } catch (error) {
        return [null, "La cita no existe, pruebe otro ID"];
    }
}

async function deleteCita(id) {
    try {
        return await Cita.findByIdAndDelete(id);
    } catch (error) {
        handleError(error, "cita.service -> deleteCita");
    }
}

module.exports = {
    getCitas,
    createCita,
    getCitaById,
    updateCita,
    deleteCita,
};