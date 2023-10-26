"use strict";

const Joi = require("joi");
const ESTADOS = require("../constants/estadosSolicitud.constants");
const TYPE = require("../constants/tipoCitas.constants");

/**
 * Esquema de validación para el cuerpo de la solicitud de la cita.
 * @constant {Object}
 */
const citaBodySchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "El nombre del solicitante de la cita no puede estar vacío.",
        "any.required": "El nombre del solicitante de la cita es obligatorio.",
        "string.base": "El nombre del solicitante de la cita debe ser de tipo string.",
    }),
    typeOfRequest: Joi.string().valid(...TYPE).required().messages({
        "string.empty": "El tipo de solicitud de la cita no puede estar vacío.",
        "any.required": "El tipo de solicitud de la cita es obligatorio.",
        "string.base": "El tipo de solicitud de la cita debe ser de tipo string.",
        "any.only": 'El tipo de solicitud debe ser Ampliacion o Construccion.',
    }),
    address: Joi.string().required().messages({
        "string.empty": "La dirreccion de la cita no puede estar vacío.",
        "any.required": "La dirreccion de la cita es obligatorio.",
        "string.base": "La dirreccion de la cita debe ser de tipo string.",
    }),
    date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).required().messages({
        "string.empty": "La fecha de la cita no puede estar vacío.",
        "any.required": "La fecha de la cita es obligatorio.",
        "string.base": "La fecha de la cita debe ser de tipo string.",
        "string.pattern.base": "El formato de la fecha es xx/xx/xxxx"
    }),
    status: Joi.string().valid(...ESTADOS).required().messages({
        "string.empty": "El estado de la cita no puede estar vacío.",
        "any.required": "El estado de la cita es obligatorio.",
        "string.base": "El estado de la cita debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser rechazado o aprobado.",
    })
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de la cita
 * @constant {Object}
 */
const citaIdSchema = Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
        "string.empty": "El ID no puede estar vacío.",
        "any.required": "El ID es obligatorio.",
        "string.base": "El ID de la cita debe ser de tipo string.",
        "string.pattern.base": "El ID proporcionado no es válido.",
    });

module.exports = { citaBodySchema, citaIdSchema };
