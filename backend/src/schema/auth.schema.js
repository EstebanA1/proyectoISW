"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de inicio de sesión.
 * @constant {Object}
 */
const authLoginBodySchema = Joi.object({
  email: Joi.string().email().messages({
    "string.empty": "El email no puede estar vacío.",
    "string.base": "El email debe ser de tipo string.",
    "string.email": "El email debe tener un formato válido.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
    "string.base": "La contraseña debe ser de tipo string.",
  }),
  rut: Joi.string().messages({ 
    "string.empty": "El rut no puede estar vacío.",
    "string.base": "El rut debe ser de tipo string.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { authLoginBodySchema };
