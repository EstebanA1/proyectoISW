"use strict";

const Joi = require("joi");
const ESTADOS = require("../constants/estados.constants");
const TYPE = require("../constants/tipoCitas.constants");
const REALIZADO = require("../constants/realizatedCitas.constants");
const XRegExp = require('xregexp');

const unicodeWord1 = XRegExp('^[\\p{L} ]+$');
const unicodeWord2 = XRegExp('^[\\p{L}0-9 ]+$');

/**
 * Esquema de validación para el cuerpo de la solicitud de la cita.
 * @constant {Object}
 */
const citaBodySchema = Joi.object({
    name: Joi.string().pattern(unicodeWord1).required().messages({
        "string.empty": "El nombre del solicitante de la cita no puede estar vacío.",
        "any.required": "El nombre del solicitante de la cita es obligatorio.",
        "string.base": "El nombre del solicitante de la cita debe ser de tipo string.",
        "string.pattern.base": "El nombre del solicitante de la cita solo puede contener letras del alfabeto, y sus distintos acentos."
    }),
    typeOfRequest: Joi.string().valid(...TYPE).required().messages({
        "string.empty": "El tipo de solicitud de la cita no puede estar vacío.",
        "any.required": "El tipo de solicitud de la cita es obligatorio.",
        "string.base": "El tipo de solicitud de la cita debe ser de tipo string.",
        "any.only": 'El tipo de solicitud debe ser Ampliación o Construcción.',
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
        "string.pattern.base": "El formato de la fecha es xx/xx/xxxx, y debe ser entre la fecha de mañana y 1 año después."
    }),
    hour: Joi.string().regex(/^\d{2}:\d{2}$/).required().messages({
        "string.empty": "La hora de la cita no puede estar vacío.",
        "any.required": "La hora de la cita es obligatorio.",
        "string.base": "La hora de la cita debe ser de tipo string.",
        "string.pattern.base": "El formato de la hora es xx:xx y debe estar entre las 08:00 y las 17:00"
    }),
    status: Joi.string().valid(...ESTADOS).messages({
        "string.empty": "El estado de la cita no puede estar vacío.",
        "any.required": "El estado de la cita es obligatorio.",
        "string.base": "El estado de la cita debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser Rechazado, Pendiente o Aprobado.",
    }),
    visitRealizated: Joi.string().valid(...REALIZADO).messages({
        "string.empty": "La visita de la cita no puede estar vacío.",
        "any.required": "la visita de la cita es obligatorio.",
        "string.base": "La visita de la cita debe ser de tipo string.",
        "any.only": "La visita de la cita debe ser Si o No.",
    }),
    ID_Solicitud: Joi.string().messages({
        "string.empty": "El id de la solicitud no puede estar vacia.",
        "string.base": "El id de la solicitud debe ser de tipo string.",
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
    name: Joi.string().pattern(unicodeWord2).required().messages({
        "string.empty": "El nombre del solicitante de la cita no puede estar vacío.",
        "string.base": "El nombre del solicitante de la cita debe ser de tipo string.",
        "string.pattern.base": "El nombre del solicitante de la cita solo puede contener letras del alfabeto, y sus distintos acentos."
    }),
    typeOfRequest: Joi.string().valid(...TYPE).messages({
        "string.empty": "El tipo de solicitud de la cita no puede estar vacío.",
        "string.base": "El tipo de solicitud de la cita debe ser de tipo string.",
        "any.only": 'El tipo de solicitud debe ser Ampliación o Construcción.',
    }),
    address: Joi.string().messages({
        "string.empty": "La dirreccion de la cita no puede estar vacío.",
        "any.required": "La dirreccion de la cita es obligatorio.",
        "string.base": "La dirreccion de la cita debe ser de tipo string.",
    }),
    date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).messages({
        "string.empty": "La fecha de la cita no puede estar vacío.",
        "string.base": "La fecha de la cita debe ser de tipo string.",
        "string.pattern.base": "El formato de la fecha es xx/xx/xxxx, y debe ser entre la fecha de mañana y 1 año después."
    }),
    hour: Joi.string().regex(/^\d{2}:\d{2}$/).messages({
        "string.empty": "La hora de la cita no puede estar vacío.",
        "string.base": "La hora de la cita debe ser de tipo string.",
        "string.pattern.base": "El formato de la hora es xx:xx y debe estar entre las 08:00 y las 17:00"
    }),
    status: Joi.string().valid(...ESTADOS).messages({
        "string.empty": "El estado de la cita no puede estar vacío.",
        "string.base": "El estado de la cita debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser Rechazado, Pendiente o Aprobado.",
    }),
    visitRealizated: Joi.string().valid(...REALIZADO).messages({
        "string.empty": "La visita de la cita no puede estar vacío.",
        "string.base": "La visita de la cita debe ser de tipo string.",
        "any.only": "La visita de la cita debe ser Si o No.",
    }),
    ID_Solicitud: Joi.string().messages({
        "string.empty": "El id de la solicitud no puede estar vacia.",
        "string.base": "El id de la solicitud debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { citaBodySchema, citaIdSchema, citaModBodySchema };
