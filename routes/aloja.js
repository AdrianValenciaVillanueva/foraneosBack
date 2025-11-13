const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const alojaController = require('../controllers/alojaController');

router.post('/crear', alojaController.crearAlojamiento);
router.get('/obtener', alojaController.obtenerAlojamientos);
router.get('/ver/:id', alojaController.alojamientoInfo);


/* Codigo para subir imagenes - pendiente de implementar
upload.fields([
  { name: 'imagen1' }, { name: 'imagen2' }, { name: 'imagen3' },
  { name: 'imagen4' }, { name: 'imagen5' }, { name: 'imagen6' }
])*/

module.exports = router;