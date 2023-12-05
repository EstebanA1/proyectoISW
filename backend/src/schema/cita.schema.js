"use strict";

const Joi = require("joi");
const ESTADOS = require("../constants/estados.constants");
const TYPE = require("../constants/tipoCitas.constants");
const REALIZADO = require("../constants/realizatedCitas.constants");

/**
 * Esquema de validación para el cuerpo de la solicitud de la cita.
 * @constant {Object}
 */
const citaBodySchema = Joi.object({
    name: Joi.string().regex(/^[A-Za-z]+$/).required().messages({
        "string.empty": "El nombre del solicitante de la cita no puede estar vacío.",
        "any.required": "El nombre del solicitante de la cita es obligatorio.",
        "string.base": "El nombre del solicitante de la cita debe ser de tipo string.",
        "string.pattern.base": "El nombre del solicitante de la cita solo puede contener letras del alfabeto."
    }),
    typeOfRequest: Joi.string().valid(...TYPE).required().messages({
        "string.empty": "El tipo de solicitud de la cita no puede estar vacío.",
        "any.required": "El tipo de solicitud de la cita es obligatorio.",
        "string.base": "El tipo de solicitud de la cita debe ser de tipo string.",
        "any.only": 'El tipo de solicitud debe ser Ampliacion o Construccion.',
    }),
    address: Joi.string().regex(/^[A-Za-z\s]+\s#\d+$/).required().messages({
        "string.empty": "La dirección de la cita no puede estar vacía.",
        "any.required": "La dirección de la cita es obligatoria.",
        "string.base": "La dirección de la cita debe ser de tipo string.",
        "string.pattern.base": "La dirección de la cita debe tener un formato de tipo calle (Nombre + #Número)."
    }),
    date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).required().messages({
        "string.empty": "La fecha de la cita no puede estar vacío.",
        "any.required": "La fecha de la cita es obligatorio.",
        "string.base": "La fecha de la cita debe ser de tipo string.",
        "string.pattern.base": "El formato de la fecha es xx/xx/xxxx"
    }),
    hour: Joi.string().regex(/^\d{2}:\d{2}$/).required().messages({
        "string.empty": "La hora de la cita no puede estar vacío.",
        "any.required": "La hora de la cita es obligatorio.",
        "string.base": "La hora de la cita debe ser de tipo string.",
        "string.pattern.base": "El formato de la hora es xx:xx"
    }),
    status: Joi.string().valid(...ESTADOS).messages({
        "string.empty": "El estado de la cita no puede estar vacío.",
        "any.required": "El estado de la cita es obligatorio.",
        "string.base": "El estado de la cita debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser rechazado, pendiente o aprobado.",
    }),
    visitRealizated: Joi.string().valid(...REALIZADO).messages({
        "string.empty": "La visita de la cita no puede estar vacío.",
        "any.required": "la visita de la cita es obligatorio.",
        "string.base": "La visita de la cita debe ser de tipo string.",
        "any.only": "La visita de la cita debe ser Si o No.",
    }),

}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de la cita
 * @constant {Object}
 */
const citaIdSchema = Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]+)$/)
    .messages({
        "string.empty": "El ID no puede estar vacío.",
        "any.required": "El ID es obligatorio.",
        "string.base": "El ID de la cita debe ser de tipo string.",
        "string.pattern.base": "El ID proporcionado no es válido.",
    });

    const citaModBodySchema = Joi.object({
        name: Joi.string().messages({
            "string.empty": "El nombre del solicitante de la cita no puede estar vacío.",
            "string.base": "El nombre del solicitante de la cita debe ser de tipo string.",
        }),
        typeOfRequest: Joi.string().valid(...TYPE).messages({
            "string.empty": "El tipo de solicitud de la cita no puede estar vacío.",
            "string.base": "El tipo de solicitud de la cita debe ser de tipo string.",
            "any.only": 'El tipo de solicitud debe ser Ampliacion o Construccion.',
        }),
        address: Joi.string().messages({
            "string.empty": "La dirreccion de la cita no puede estar vacío.",
            "any.required": "La dirreccion de la cita es obligatorio.",
            "string.base": "La dirreccion de la cita debe ser de tipo string.",
        }),
        date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).messages({
            "string.empty": "La fecha de la cita no puede estar vacío.",
            "string.base": "La fecha de la cita debe ser de tipo string.",
            "string.pattern.base": "El formato de la fecha es xx/xx/xxxx"
        }),
        hour: Joi.string().regex(/^\d{2}:\d{2}$/).messages({
            "string.empty": "La hora de la cita no puede estar vacío.",
            "string.base": "La hora de la cita debe ser de tipo string.",
            "string.pattern.base": "El formato de la hora es xx:xx"
        }),
        status: Joi.string().valid(...ESTADOS).messages({
            "string.empty": "El estado de la cita no puede estar vacío.",
            "string.base": "El estado de la cita debe ser de tipo string.",
            "any.only": "El estado proporcionado debe ser rechazado, pendiente o aprobado.",
        }),
        visitRealizated: Joi.string().valid(...REALIZADO).messages({
            "string.empty": "La visita de la cita no puede estar vacío.",
            "string.base": "La visita de la cita debe ser de tipo string.",
            "any.only": "La visita de la cita debe ser Si o No.",
        }),
    }).messages({
        "object.unknown": "No se permiten propiedades adicionales.",
    });

module.exports = { citaBodySchema, citaIdSchema, citaModBodySchema };
