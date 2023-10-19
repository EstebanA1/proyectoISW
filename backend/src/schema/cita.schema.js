"use strict";

const Joi = require("joi");
const ESTADOS = require("../constants/estados.constants");
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
        "any.only": "El tipo de solicitud proporcionado no es válido.",
    }),
    date: Joi.string().required().messages({
        "string.empty": "La fecha de la cita no puede estar vacío.",
        "any.required": "La fecha de la cita es obligatorio.",
        "string.base": "La fecha de la cita debe ser de tipo string.",
    }),
    status1: Joi.string().valid(...ESTADOS).required().messages({
        "string.empty": "El estado 1 de la cita no puede estar vacío.",
        "any.required": "El estado 1 de la cita es obligatorio.",
        "string.base": "El estado 1 de la cita debe ser de tipo string.",
        "any.only": "El estado 1 proporcionado no es válido.",
    }),
    status2: Joi.string().valid(...ESTADOS).required().messages({
        "string.empty": "El estado 2 de la cita no puede estar vacío.",
        "any.required": "El estado 2 de la cita es obligatorio.",
        "string.base": "El estado 2 de la cita debe ser de tipo string.",
        "any.only": "El estado 2 proporcionado no es válido.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de la cita
 * @constant {Object}
 */
const citaIdSchema = Joi.string().required().messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.length": "El id debe tener 24 caracteres.",
        });

module.exports = { citaBodySchema, citaIdSchema };
