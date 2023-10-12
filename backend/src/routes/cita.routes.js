"use strict";

const express = require("express");

const citaController = require("../controllers/cita.controller");

const router = express.Router();

router.get('/', citaController.getCitas);
router.post('/', citaController.createCita);
// router.update('/', citaController.updateCita);
router.delete('/', citaController.deleteCita);


module.exports = router;