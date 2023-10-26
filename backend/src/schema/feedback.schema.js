"use strict";

const Joi = require("joi");
const multer = require('multer');
const ESTADOS = require("../constants/estados.constants");

// Configura Multer para manejar archivos de imagen
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Esquema de validación para el cuerpo de la solicitud del feedback.
 * 
 * @constant {Object}
 */
const feedbackBodySchema = Joi.object({
    solicitante: Joi.string().required().messages({
        "string.empty": "El solicitante de la retroalimentación no puede estar vacío.",
        "any.required": "El solicitante de la retroalimentación es obligatorio.",
        "string.base": "El solicitante de la retroalimentación debe ser de tipo string.",
    }),
    fecha: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).required().messages({
        "string.empty": "La fecha de la retroalimentación no puede estar vacío.",
        "any.required": "La fecha de la retroalimentación es obligatorio.",
        "string.base": "La fecha de la retroalimentación debe ser de tipo string.",
        "string.pattern.base": "El formato de la fecha es xx/xx/xxxx"
    }),
    informe: Joi.string().required().messages({
        "string.empty": "El informe de la retroalimentación no puede estar vacío.",
        "any.required": "El informe de la retroalimentación es obligatorio.",
        "string.base": "El informe de la retroalimentación debe ser de tipo string.",
    }),
    comentarios: Joi.string().required().messages({
        "string.empty": "Los comentarios de la retroalimentación no puede estar vacío.",
        "any.required": "Los comentarios de la retroalimentación es obligatorio.",
        "string.base": "Los comentarios de la retroalimentación debe ser de tipo string.",
    }),
    imagenes: Joi.string().required().messages({
        "string.empty": "Las imagenes de la retroalimentación no puede estar vacío.",
        "any.required": "Las imagenes de la retroalimentación es obligatorio.",
        "string.base": "Las imagenes de la retroalimentación debe ser de tipo string.",
    }),
    
    /*
    imagenes: Joi.object({
        buffer: Joi.binary().required(),
        originalname: Joi.string().required()
        }).required().messages({
        "any.required": "Las imágenes de la retroalimentación son obligatorias.",
        "object.base": "Las imágenes de la retroalimentación deben ser un archivo de imagen."
    }),
    */
    estado: Joi.string().valid(...ESTADOS).required().messages({
        "string.empty": "El estado de la retroalimentación no puede estar vacío.",
        "any.required": "El estado de la retroalimentación es obligatorio.",
        "string.base": "El estado de la retroalimentación debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser rechazado, pendiente o aprobado.",
    })
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de la retroalimentación
 * @constant {Object}
 */
const feedbackIdSchema = Joi.string()
.required()
.pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
.messages({
    "string.empty": "El ID no puede estar vacío.",
    "any.required": "El ID es obligatorio.",
    "string.base": "El ID de la retroalimentacion debe ser de tipo string.",
    "string.pattern.base": "El ID proporcionado no es válido.",
});

module.exports = { feedbackBodySchema, feedbackIdSchema };