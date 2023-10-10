"use strict";

const express = require("express");

const citaController = require("../controllers/cita.controller");

const router = express.Router();

router.get('/', citaController.getCitas);

module.exports = roter;