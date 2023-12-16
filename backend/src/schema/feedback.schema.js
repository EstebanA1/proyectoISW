/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable eol-last */
"use strict";

const Joi = require("joi");
const ESTADOS = require("../constants/estados.constants");
const TYPES = require("../constants/tipoCitas.constants");

/**
 * Esquema de validación para el cuerpo de la solicitud del feedback.
 * 
 * @constant {Object}
 */
const feedbackBodySchema = Joi.object({
    IDCita: Joi.string().required().messages({
        "string.empty": "El solicitante de la retroalimentación no puede estar vacío.",
        "any.required": "El solicitante de la retroalimentación es obligatorio.",
        "string.base": "El solicitante de la retroalimentación debe ser de tipo string.",
    }),
    solicitante: Joi.string().required().messages({
        "string.empty": "El solicitante de la retroalimentación no puede estar vacío.",
        "any.required": "El solicitante de la retroalimentación es obligatorio.",
        "string.base": "El solicitante de la retroalimentación debe ser de tipo string.",
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
    estado: Joi.string().valid(...ESTADOS).required().messages({
        "string.empty": "El estado de la retroalimentación no puede estar vacío.",
        "any.required": "El estado de la retroalimentación es obligatorio.",
        "string.base": "El estado de la retroalimentación debe ser de tipo string.",
        "any.only": "El estado proporcionado debe ser Rechazado, Pendiente o Aprobado.",
    }),
    imagenes: Joi.string().required().messages({
        "string.empty": "Las imagenes de la retroalimentación no puede estar vacío.",
        "any.required": "Las imagenes de la retroalimentación es obligatorio.",
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
.pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
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
    IDFeedback: Joi.string().required().messages({
        "string.empty": "El ID de la retroalimentación no puede estar vacío.",
        "any.required": "El ID de la retroalimentación es obligatorio.",
        "string.base": "El ID de la retroalimentación debe ser de tipo string.",
    }),
    Titulo: Joi.string().messages({
        "string.base": "El titulo del informe debe ser de tipo string.",
    }),
    solicitante: Joi.string().required().messages({
        "string.empty": "El solicitante del informe no puede estar vacío.",
        "any.required": "El solicitante del informe es obligatorio.",
        "string.base": "El solicitante del informe debe ser de tipo string.",
    }),
    TipoObra: Joi.string().valid(...TYPES).required().messages({
        "string.empty": "El tipo de obra del informe no puede estar vacío.",
        "any.required": "El tipo de obra del informe es obligatorio.",
        "string.base": "El tipo de obra del informe debe ser de tipo string.",
        "any.only": "El tipo de obra proporcionado debe ser Edificación, Movimiento de tierra, Instalación de servicios o Demolición.",
    }),
    A: Joi.string().messages({
        "string.base": "El 1 del informe debe ser de tipo string.",
    }),
    A_1: Joi.string().required().messages({
        "string.empty": "El 1.1 del informe no puede estar vacío.",
        "any.required": "El 1.1 del informe es obligatorio.",
        "string.base": "El 1.1 del informe debe ser de tipo string.",
    }),
    B: Joi.string().messages({
        "string.base": "El 2 del informe debe ser de tipo string.",
    }),
    B_1: Joi.string().required().messages({
        "string.empty": "El 2.1 del informe no puede estar vacío.",
        "any.required": "El 2.1 del informe es obligatorio.",
        "string.base": "El 2.1 del informe debe ser de tipo string.",
    }),
    C: Joi.string().messages({
        "string.base": "El 3 del informe debe ser de tipo string.",
    }),
    C_1: Joi.string().messages({
        "string.base": "El 3.1 del informe debe ser de tipo string.",
    }),
    C_2: Joi.string().required().messages({
        "string.empty": "El 3.3 del informe no puede estar vacío.",
        "any.required": "El 3.3 del informe es obligatorio.",
        "string.base": "El 3.3 del informe debe ser de tipo string.",
    }),
    D: Joi.string().messages({
        "string.base": "El 4 del informe debe ser de tipo string.",
    }),
    D_1: Joi.string().messages({
        "string.empty": "El 4.1 del informe no puede estar vacío.",
        "string.base": "El 4.1 del informe debe ser de tipo string.",
    }),
    E: Joi.string().messages({
        "string.base": "El 5 del informe debe ser de tipo string.",
    }),
    E_1: Joi.string().messages({
        "string.base": "El 5.1 del informe debe ser de tipo string.",
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
.pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
.messages({
    "string.empty": "El ID no puede estar vacío.",
    "any.required": "El ID es obligatorio.",
    "string.base": "El ID del informe debe ser de tipo string.",
    "string.pattern.base": "El ID proporcionado no es válido.",
});


module.exports = { feedbackBodySchema, feedbackIdSchema, informeBodySchema, informeIdSchema };