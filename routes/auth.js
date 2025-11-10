const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Rutas de login
router.get('/login', loginController.mostrarLogin);
router.post('/login', loginController.procesarLogin);

// Ruta de logout
router.get('/logout', loginController.logout);

module.exports = router;
