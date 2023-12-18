/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable eol-last */
"use strict";

const Joi = require("joi");
const ESTADOS = require("../constants/estados.constants");
const TYPES = require("../constants/tipoCitas.constants");
const XRegExp = require('xregexp');
const unicodeWord1 = XRegExp('^[\\p{L} ]+$');

/**
 * Esquema de validación para el cuerpo de la solicitud del feedback.
 * 
 * @constant {Object}
 */
const feedbackBodySchema = Joi.object({
    IDCita: Joi.string().messages({
        "string.empty": "El id de la Cita no puede estar vacia.",
        "string.base": "El id de la Cita debe ser de tipo string.",
    }),
    solicitante: Joi.string().pattern(unicodeWord1).required().messages({
        "string.empty": "El solicitante de la retroalimentación no puede estar vacío.",
        "any.required": "El solicitante de la retroalimentación es obligatorio.",
        "string.base": "El solicitante de la retroalimentación debe ser de tipo string.",
        "string.pattern.base": "El nombre del solicitante solo puede contener letras del alfabeto, y sus distintos acentos.",
    }),
    fechaVisita: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).required().messages({
        "string.empty": "La fecha de la retroalimentación no puede estar vacío.",
        "any.required": "La fecha de la retroalimentación es obligatorio.",
        "string.base": "La fecha de la retroalimentación debe ser de tipo string.",
        "string.pattern.base": "El formato de la fecha es xx/xx/xxxx",
    }),
    comentarios: Joi.string().required().messages({
        "string.empty": "Los comentarios de la retroalimentación no puede estar vacío.",
        "any.required": "Los comentarios de la retroalimentación es obligatorio.",
        "string.base": "Los comentarios de la retroalimentación debe ser de tipo string.",
    }),
    informe: Joi.string().messages({
        "string.base": "El informe de la retroalimentación debe ser de tipo string.",
    }),
    detalles: Joi.string().required().messages({
        "string.empty": "Los detalles de la retroalimentación no puede estar vacío.",
        "any.required": "Los detalles de la retroalimentación es obligatorio.",
        "string.base": "Los detalles de la retroalimentación debe ser de tipo string.",
    }),
    estado: Joi.string().valid(...ESTADOS).required().messages({
        "string.empty": "El estado de la retroalimentación no puede estar vacío.",
        "any.required": "El estado de la retroalimentación es obligatorio.",
        "string.base": "El estado de la retroalimentación debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser Rechazado, Pendiente o Aprobado.",
    }),
    imagenes: Joi.string().messages({
        "string.empty": "Las imagenes de la retroalimentación no puede estar vacío.",
        "string.base": "Las imagenes de la retroalimentación debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de la retroalimentación
 * @constant {Object}
 */
const feedbackIdSchema = Joi.string()
.required()
.pattern(/^(?:[0-9a-fA-F]+)$/)
.messages({
    "string.empty": "El ID no puede estar vacío.",
    "any.required": "El ID es obligatorio.",
    "string.base": "El ID de la retroalimentacion debe ser de tipo string.",
    "string.pattern.base": "El ID proporcionado no es válido.",
});

//INFORME
/**
 * Esquema de validación para el cuerpo de la solicitud del INFORME feedback.
 * 
 * @constant {Object}
 */
const informeBodySchema = Joi.object({
    IDFeedback: Joi.string().messages({
        "string.empty": "El id del Feedback no puede estar vacia.",
        "string.base": "El id del Feedback debe ser de tipo string.",
    }),
    solicitante: Joi.string().pattern(unicodeWord1).required().messages({
        "string.empty": "El solicitante del informe no puede estar vacío.",
        "any.required": "El solicitante del informe es obligatorio.",
        "string.base": "El solicitante del informe debe ser de tipo string.",
        "string.pattern.base": "El nombre del solicitante solo puede contener letras del alfabeto, y sus distintos acentos.",
    }),
    TipoObra: Joi.string().valid(...TYPES).required().messages({
        "string.empty": "El tipo de obra del informe no puede estar vacío.",
        "any.required": "El tipo de obra del informe es obligatorio.",
        "string.base": "El tipo de obra del informe debe ser de tipo string.",
        "any.only": "El tipo de obra proporcionado debe ser Ampliación o Construcción.",
    }),
    ubicacion: Joi.string().required().messages({
        "string.empty": "La Ubicacion del informe no puede estar vacío.",
        "any.required": "La Ubicacion del informe es obligatorio.",
        "string.base": "La Ubicacion del informe debe ser de tipo string.",
    }),
    descripcion: Joi.string().messages({
        "string.base": "La Descripcion del informe debe ser de tipo string.",
    }),
    D: Joi.string().required().messages({
        "string.empty": "Descripcion del informe no puede estar vacío.",
        "any.required": "Descripcion del informe es obligatorio.",
        "string.base": "Descripcion del informe debe ser de tipo string.",
    }),
    observaciones: Joi.string().required().messages({
        "string.empty": "Las Observaciones del informe no puede estar vacío.",
        "any.required": "Las Observaciones del informe es obligatorio.",
        "string.base": "Las Observaciones del informe debe ser de tipo string.",
    }),
    estado: Joi.string().valid(...ESTADOS).required().messages({
        "string.empty": "El estado del informe no puede estar vacío.",
        "any.required": "El estado del informe es obligatorio.",
        "string.base": "El estado del informe debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser Rechazado, Pendiente o Aprobado.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id del informe
 * @constant {Object}
 */
const informeIdSchema = Joi.string()
.required()
.pattern(/^(?:[0-9a-fA-F]+)$/)
.messages({
    "string.empty": "El ID no puede estar vacío.",
    "any.required": "El ID es obligatorio.",
    "string.base": "El ID de la retroalimentacion debe ser de tipo string.",
    "string.pattern.base": "El ID proporcionado no es válido.",
});


module.exports = { feedbackBodySchema, feedbackIdSchema, informeBodySchema, informeIdSchema };