"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de la cita.
 * @constant {Object}
 */
const citaBodySchema = Joi.object({
    // id: Joi.string().required().messages({
    //     "number.empty": "El id de la cita no puede estar vacío.",
    //     "any.required": "El id de la cita es obligatorio.",
    //     "number.base": "El id de la cita debe ser de tipo number.",
    // }),
    name: Joi.string().required().messages({
        "string.empty": "El nombre del solicitante de la cita no puede estar vacío.",
        "any.required": "El nombre del solicitante de la cita es obligatorio.",
        "string.base": "El nombre del solicitante de la cita debe ser de tipo string.",
    }),
    typeOfRequest: Joi.string().required().messages({
        "string.empty": "El tipo de solicitud de la cita no puede estar vacío.",
        "any.required": "El tipo de solicitud de la cita es obligatorio.",
        "string.base": "El tipo de solicitud de la cita debe ser de tipo string.",
    }),
    date: Joi.string().required().messages({
        "string.empty": "La fecha de la cita no puede estar vacío.",
        "any.required": "La fecha de la cita es obligatorio.",
        "string.base": "La fecha de la cita debe ser de tipo string.",
    }), // PROBABLE A CAMBIAR
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
