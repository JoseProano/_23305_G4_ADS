const express = require('express');
const router = express.Router();
const rabbitController = require('../controllers/rabbitController');

// Ruta para registrar un nuevo conejo
router.post('/rabbits', rabbitController.registerRabbit);

// Ruta para obtener un conejo por código
router.get('/rabbits/:code', rabbitController.getRabbit);

// Ruta para editar un conejo por código
router.put('/rabbits/:code', rabbitController.editRabbit);

// Ruta para eliminar un conejo por código
router.delete('/rabbits/:code', rabbitController.deleteRabbit);

// Ruta para obtener todos los conejos
router.get('/rabbits', rabbitController.getAllRabbits);

module.exports = router;