import express from 'express';
const router = express.Router();
import * as mascotaController from '../controllers/mascotaController.js';
import upload from '../config/multer.js';
import { isAuthenticated } from '../middleware/auth.js';

// Aplicar autenticación a todas las rutas
router.use(isAuthenticated);

// Rutas de mascotas
router.get('/', mascotaController.getAllMascotas);
router.get('/nueva', mascotaController.showCreateForm);
router.post('/', upload.array('imagenes', 5), mascotaController.createMascota);
router.get('/:id', mascotaController.showMascota);
router.get('/:id/editar', mascotaController.showEditForm);
router.post('/:id/actualizar', mascotaController.updateMascota);
router.post('/:id/eliminar', mascotaController.deleteMascota);

// Rutas para vacunas y antecedentes
router.post('/:id/vacunas', mascotaController.addVacuna);
router.post('/:id/antecedentes', mascotaController.addAntecedente);

export default router;
