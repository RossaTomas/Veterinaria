import express from 'express';
const router = express.Router();
import { mostrarLogin, procesarLogin, logout } from '../controllers/loginController.js';

// Rutas de login
router.get('/login', mostrarLogin);
router.post('/login', procesarLogin);

// Ruta de logout
router.get('/logout', logout);

export default router;
