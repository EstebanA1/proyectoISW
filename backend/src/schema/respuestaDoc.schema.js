"use strict";

const Joi = require("joi");
const ESTADOS = require("../constants/estados.constants");

/**
 *  
 * @constant {Object}
 */

const respuestaDocBodySchema = Joi.object({
    nombre: Joi.string().required().regex(/^[A-Za-z]+$/).messages({
        "string.empty": "El nombre del solicitante no puede estar vacío.",
        "any.required": "El nombre del solicitante es obligatorio.",
        "string.base": "El nombre del solcitante debe ser de tipo string.",
        "string.pattern.base": "El nombre del solicitante debe contener solo letras.",
    }),
    rut: Joi.string().required().regexregex(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/).messages({
        "string.empty": "El rut del solicitante no puede estar vacío.",
        "any.required": "El rut del solicitante es obligatorio.",
        "string.base": "El rut del solcitante debe ser de tipo string.",
        "string.pattern.base": "El rut del solicitante debe ser válido.",  
    }),
    estado: Joi.string().valid(...ESTADOS).messages({
        "string.empty": "El estado de la respuesta no puede estar vacío.",
        "any.required": "El estado de la respuesta es obligatorio.",
        "string.base": "El estado de la respuesta debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser Rechazado, Pendiente o Aprobado.",
    }),
    descripcion: Joi.string().required().min(3).messages({
        "string.empty": "La descripcion de la respuesta no puede estar vacío.",
        "any.required": "La descripcion de la respuesta es obligatorio.",
        "string.base": "La descripcion de la respuesta debe ser de tipo string.",
        "string.min": "La descripcion de la respuesta debe tener al menos 3 caracteres.",
    }),
    fecha: Joi.string().required().messages({
        "string.empty": "La fecha de la respuesta no puede estar vacío.",
        "any.required": "La fecha de la respuesta es obligatorio.",
        "string.base": "La fecha de la respuesta debe ser de tipo string.",
    }),
    ID_solicitud: Joi.string().messages({
        "string.empty": "El id de la solicitud no puede estar vacío.",
        "string.length": "El id de la solicitud debe tener 24 caracteres.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de la respuesta
 * @constant {Object}
 */

const respuestaDocIdSchema = Joi.string().required().messages({
    "string.empty": "El id no puede estar vacío.",
    "any.required": "El id es obligatorio.",
    "string.length": "El id debe tener 24 caracteres.",
});

module.exports = {
    respuestaDocBodySchema,
    respuestaDocIdSchema,
};

