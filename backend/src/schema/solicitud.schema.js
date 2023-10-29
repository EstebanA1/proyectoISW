"use strict";

const Joi = require("joi");
const TYPE = require("../constants/tipoCitas.constants");
const ESTADO2 = require("../constants/estadosSolicitud.constants");

/**
 * Esquema de validación para el cuerpo de la solicitud de la solicitud.
 * @constant {Object}
 */
const solicitudBodySchema = Joi.object({
    nombreSolicitante: Joi.string().required().messages({
        "string.empty": "El nombre de la solicitud no puede estar vacío.",
        "any.required": "El nombre de la solicitud es obligatorio.",
        "string.base": "El nombre de la solicitud debe ser de tipo string.",
    }),
    rutSolicitante: Joi.string().valid(...TYPE).required().messages({
        "string.empty": "El tipo de la solicitud no puede estar vacío.",
        "any.required": "El tipo de la solicitud es obligatorio.",
        "string.base": "El tipo de la solicitud debe ser de tipo string.",
        "any.only": 'El tipo de solicitud debe ser Ampliacion o Construccion.',
    }),
    firma: Joi.string().required().messages({
        "string.empty": "La direccion de la solicitud no puede estar vacío.",
        "any.required": "La direccion de la solicitud es obligatorio.",
        "string.base": "La direccion de la solicitud debe ser de tipo string.",
    }),
    fechaEmicionDocumento: Joi.string().valid(...ESTADO2).required().messages({
        "string.empty": "El estado de la solicitud no puede estar vacío.",
        "any.required": "El estado de la solicitud es obligatorio.",
        "string.base": "El estado de la solicitud debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser pendiente o aprobado.",
    }),
    logoInstitucion: Joi.string().valid(...ESTADO2).required().messages({
        "string.empty": "El estado de la solicitud no puede estar vacío.",
        "any.required": "El estado de la solicitud es obligatorio.",
        "string.base": "El estado de la solicitud debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser pendiente o aprobado.",
    })
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de la solicitud
 * @constant {Object}
 */
const solicitudIdSchema = Joi.string().length(24).required().messages({
    "string.empty": "El id no puede estar vacío.",
    "any.required": "El id es obligatorio.",
    "string.length": "El id debe tener 24 caracteres.",
});

module.exports = { solicitudBodySchema, solicitudIdSchema };