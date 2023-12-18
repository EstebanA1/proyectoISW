/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
"use strict";

const Informe = require("../models/informe.model");
const { handleError } = require("../utils/errorHandler");

//Informes
/**
 * Obtener Informes de Visitas a Terreno
 * @returns
 */
async function getInforme() {
    try {
        const informe = await Informe.find().exec();
        if (!informe) return [null, "No hay Informes de Visitas a Terreno"];
        return [informe, null];
    } catch (error) {
        handleError(error, "informe.service -> getInforme");
    }
}

/**
 * Crear Informes de Visitas a Terreno
 * @param {*} informe
 * @returns
 */
async function createInforme(informe) {
    try {
        const { IDFeedback, solicitante, TipoObra, ubicacion, D, observaciones, estado } = informe;

        const informeFound = await Informe.findOne({ IDFeedback: informe.IDFeedback });
        if (informeFound) return [null, "El Informe de Visita a Terreno ya existe"];

        const newInforme = new Informe({
            IDFeedback,
            solicitante,
            TipoObra,
            ubicacion,
            D,
            observaciones,
            estado,
        });
        await newInforme.save();

        return [newInforme, null];
    }
    catch (error) {
        handleError(error, "informe.service -> createInforme");
    }
}

/**
 * Obtener Informes de Visitas a Terreno por Id
 * @param {string} id Id del informe
 * @param {Object} informe Objeto de informe
 * @returns {Promise} Promesa con el objeto de informe actualizado
 */
async function getInformeById(id) {
    try {
        const informe = await Informe.findById(id).exec();
        if (!informe) return [null, "El Informe de Visita a Terreno no existe"];

        return [informe, null];
    } catch (error) {
        handleError(error, "informe.service -> getInformeById");
    }
}

/**
 * Actualizar Informes de Visitas a Terreno por Id
 * @param {string} id Id del informe
 * @param {Object} informe Objeto de informe
 * @returns {Promise} Promesa con el objeto de informe actualizado
 */
async function updateInforme(id, informe) {
    try {
        const informeFound = await Informe.findById(id);
        if (!informeFound) return [null, "El Informe de Visita a Terreno no existe"];

        const { IDFeedback, solicitante, TipoObra, ubicacion, D, observaciones, estado } = informe;

        const updatedInforme = await Informe.findByIdAndUpdate(
            id,
            {
                IDFeedback,
                solicitante,
                TipoObra,
                ubicacion,
                D,
                observaciones,
                estado,
            },
            { new: true }
        );

        return [updatedInforme, null];
    } catch (error) {
        handleError(error, "El Informe de Visita a Terreno no existe, pruebe otro ID");
    }
}

/**
 * Eliminar Informes de Visitas a Terreno por Id
 * @param {string} id
 * @returns {Promise}
 */
async function deleteInforme(id) {
    try {
        const informeFound = await Informe.findById(id);
        if (!informeFound) return [null, "El Informe de Visita a Terreno no existe"];

        await Informe.findByIdAndDelete(id);

        return ["Informe de Visita a Terreno eliminado", null];
    } catch (error) {
        handleError(error, "informe.service -> deleteInforme");
    }
}


module.exports ={
    getInforme,
    createInforme,
    getInformeById,
    updateInforme,
    deleteInforme,
};