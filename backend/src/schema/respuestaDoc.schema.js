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
        "string.pattern.base": "El rut del solicitante debe ser válido.",  
    }),
    descripcion: Joi.string().required().min(3).messages({
        "string.empty": "La descripcion de la respuesta no puede estar vacío.",
        "any.required": "La descripcion de la respuesta es obligatorio.",
        "string.base": "La descripcion de la respuesta debe ser de tipo string.",
        "string.min": "La descripcion de la respuesta debe tener al menos 3 caracteres.",
    }),
    ID_solicitud: Joi.string().length(24).required().messages({
        "string.empty": "El id de la solicitud no puede estar vacío.",
        "any.required": "El id de la solicitud es obligatorio.",
        "string.length": "El id de la solicitud debe tener 24 caracteres.",
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

