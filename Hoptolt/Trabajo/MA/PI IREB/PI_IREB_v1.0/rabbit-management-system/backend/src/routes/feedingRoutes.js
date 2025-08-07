const express = require('express');
const router = express.Router();
const feedingController = require('../controllers/feedingController');

router.post('/register-feeding', feedingController.registerFeeding);

module.exports = router;