"use strict";

const Joi = require("joi");

/**
 *  
 * @constant {Object}
 */

const respuestaDocBodySchema = Joi.object({
    nombre: Joi.string().required().messages({
        "string.empty": "El nombre de la respuesta no puede estar vacío.",
        "any.required": "El nombre de la respuesta es obligatorio.",
        "string.base": "El nombre de la respuesta debe ser de tipo string.",
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

