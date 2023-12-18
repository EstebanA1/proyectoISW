"use strict";

const Joi = require("joi");
const TYPE = require("../constants/tipoCitas.constants");
const ESTADOS = require("../constants/estadosSolicitud.constants");
const XRegExp = require('xregexp');

const unicodeWord1 = XRegExp('^[\\p{L} ]+$');
const unicodeWord2 = XRegExp('^[\\p{L}0-9 ]+$');

/**
 * Esquema de validación para el cuerpo de la solicitud de la solicitud.
 * @constant {Object}
 */
const solicitudBodySchema = Joi.object({
    nombre: Joi.string().pattern(unicodeWord1).required().messages({
        "string.empty": "El nombre del solicitante no puede estar vacío.",
        "any.required": "El nombre del solicitante es obligatorio.",
        "string.base": "El nombre del solicitante debe ser de tipo string.",
        "string.pattern.base": "El nombre del solicitante puede contener letras del alfabeto, y sus distintos acentos."
    }),
    tipo: Joi.string().valid(...TYPE).required().messages({
        "string.empty": "El tipo de la solicitud no puede estar vacío.",
        "any.required": "El tipo de la solicitud es obligatorio.",
        "string.base": "El tipo de la solicitud debe ser de tipo string.",
        "any.only": "El tipo proporcionado debe ser Construccion o Ampliacion.",
    }),
    rut: Joi.string().required().regex(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/).messages({
        "string.empty": "El rut de la solicitud no puede estar vacío.",
        "any.required": "El rut de la solicitud es obligatorio.",
        "string.base": "El rut de la solicitud debe ser de tipo string.",
    }),
    fecha: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).required().messages({
        "string.empty": "La fetcha de la respuesta no puede estar vacío.",
        "any.required": "La fetcha de la respuesta es obligatorio.",
        "string.base": "La fetcha de la respuesta debe ser de tipo string.",
    }),
    estadoDeRespuesta: Joi.string().messages({
        "string.base": "El estado de la visita debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser Pendiente, Aprobado o Rechazado.",
    }),
    estado: Joi.string().messages({
        "string.base": "El estado de la solicitud debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser Pendiente, Aprobado o Rechazado.",
    }),
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

const solicitudModBodySchema = Joi.object({
    nombre: Joi.string().pattern(unicodeWord2).required().messages({
        "string.empty": "El nombre del solicitante no puede estar vacío.",
        "string.base": "El nombre del solicitante debe ser de tipo string.",
        "string.pattern.base": "El nombre del solicitante solo puede contener letras del alfabeto, y sus distintos acentos."
    }),
    tipo: Joi.string().valid(...TYPE).required().messages({
        "string.empty": "El tipo de la solicitud no puede estar vacío.",
        "any.required": "El tipo de la solicitud es obligatorio.",
        "string.base": "El tipo de la solicitud debe ser de tipo string.",
        "any.only": "El tipo proporcionado debe ser Construccion o Ampliacion.",
    }),
    rut: Joi.string().required().regex(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/).messages({
        "string.empty": "El rut de la solicitud no puede estar vacío.",
        "any.required": "El rut de la solicitud es obligatorio.",
        "string.base": "El rut de la solicitud debe ser de tipo string.",
    }),
    fecha: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).required().messages({
        "string.empty": "La fetcha de la respuesta no puede estar vacío.",
        "any.required": "La fetcha de la respuesta es obligatorio.",
        "string.base": "La fetcha de la respuesta debe ser de tipo string.",
    }),
    estadoDeRespuesta: Joi.string().valid(...ESTADOS).messages({
        "string.base": "El estado de la visita debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser Pendiente, Aprobado o Rechazado.",
    }),
    estado: Joi.string().valid(...ESTADOS).messages({
        "string.base": "El estado de la solicitud debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser Pendiente, Aprobado o Rechazado.",
    }),
     archivoPDF: Joi.string().required().messages({
         "string.empty": "El PDF de la solicitud no puede estar vacío.",
         "any.required": "El PDF de la solicitud es obligatorio.",
         "string.base": "El PDF de la solicitud debe ser de tipo string.",
     }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});


module.exports = { solicitudBodySchema, solicitudIdSchema, solicitudModBodySchema};
