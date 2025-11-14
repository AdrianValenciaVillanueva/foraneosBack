const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const alojaController = require('../controllers/alojaController');

router.post('/crear', upload.fields([
{ name: 'imagen1' }, { name: 'imagen2' }, { name: 'imagen3' },
{ name: 'imagen4' }, { name: 'imagen5' }, { name: 'imagen6' }
]), alojaController.crearAlojamiento);
router.get('/obtener', alojaController.obtenerAlojamientos);
router.get('/ver/:id', alojaController.alojamientoInfo);


module.exports = router;