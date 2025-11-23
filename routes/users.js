const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.list);
router.post('/', userController.create);
router.post('/login', userController.login);
router.put('/', userController.update);

module.exports = router;
