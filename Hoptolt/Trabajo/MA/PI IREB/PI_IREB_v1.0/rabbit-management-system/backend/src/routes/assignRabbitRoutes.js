const express = require('express');
const router = express.Router();
const assignRabbitController = require('../controllers/assignRabbitController');

// Listar jaulas quemadas
router.get('/cages', assignRabbitController.getCages);

// Asignar conejo a jaula
router.post('/assign-rabbit', assignRabbitController.assignRabbit);

// Listar asignaciones jaula-conejo
router.get('/assignments', assignRabbitController.getAssignments);

module.exports = router;
