const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a Foraneos Renta API' });
});

module.exports = router;
