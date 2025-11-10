import express from 'express';
const router = express.Router();
import * as diagnosticoController from '../controllers/diagnosticoController.js';
import upload from '../config/multer.js';
import { isAuthenticated } from '../middleware/auth.js';

// Aplicar autenticación a todas las rutas
router.use(isAuthenticated);

// Rutas de diagnósticos
router.get('/', diagnosticoController.getAllDiagnosticos);
router.get('/nuevo', diagnosticoController.showCreateForm);
router.post('/', diagnosticoController.createDiagnostico);
router.get('/:id', diagnosticoController.showDiagnostico);
router.post('/:id/eliminar', diagnosticoController.deleteDiagnostico);

// Rutas para evaluaciones (radiografías, análisis, etc.)
router.post('/:id/evaluaciones', upload.single('archivo'), diagnosticoController.addEvaluacion);

// Actualizar estado
router.post('/:id/estado', diagnosticoController.updateEstado);

export default router;
