"use strict";

const Joi = require("joi");

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
    rut: Joi.string().required().regex(/^(\d{1,2}\.\d{3}\.\d{3}-[0-9kK]|[\d]{8}-[0-9kK]|[\d]{9}[0-9kK]?)$/).messages({
        "string.empty": "El rut del solicitante no puede estar vacío.",
        "any.required": "El rut del solicitante es obligatorio.",
        "string.base": "El rut del solcitante debe ser de tipo string.",
    }),
    firma: Joi.string().required().messages({
        "string.empty": "La firma no puede estar vacío.",
        "any.required": "La firma es obligatorio.",
        "string.base": "La firma debe ser de tipo string.",
    }),
    logo: Joi.string().required().messages({
        "string.empty": "El logo no puede estar vacío.",
        "any.required": "El logo es obligatorio.",
        "string.base": "El logo debe ser de tipo string.",
    }),
    descripcion: Joi.string().required().messages({
        "string.empty": "La descripcion de la respuesta no puede estar vacío.",
        "any.required": "La descripcion de la respuesta es obligatorio.",
        "string.base": "La descripcion de la respuesta debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de la respuesta
 * @constant {Object}
 */

const respuestaDocIdSchema = Joi.string().length(24).required().messages({
    "string.empty": "El id no puede estar vacío.",
    "any.required": "El id es obligatorio.",
    "string.length": "El id debe tener 24 caracteres.",
});

module.exports = {
    respuestaDocBodySchema,
    respuestaDocIdSchema,
};

