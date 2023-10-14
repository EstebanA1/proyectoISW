"use strict";

const express = require("express");

const citaController = require("../controllers/cita.controller");

const router = express.Router();

router.get('/', citaController.getCitas);
router.post('/', citaController.createCita);
router.get('/:id', citaController.getCitaById);
router.put('/:id', citaController.updateCita);
router.delete('/:id', citaController.deleteCita);


module.exports = router;