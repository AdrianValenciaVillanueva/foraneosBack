const express = require('express');
const router = express.Router();
const alojaController = require('../controllers/alojaController');

router.post('/crear', alojaController.crearAlojamiento);

module.exports = router;