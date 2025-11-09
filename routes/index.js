const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const Mascota = require('../models/Mascota');
const Diagnostico = require('../models/Diagnostico');

// Dashboard principal
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const totalMascotas = await Mascota.countDocuments();
    const totalDiagnosticos = await Diagnostico.countDocuments();
    const diagnosticosPendientes = await Diagnostico.countDocuments({ estado: 'Pendiente' });
    const diagnosticosCriticos = await Diagnostico.countDocuments({ 
      'diagnosticoPrediccion.nivel': 'Crítico' 
    });
    
    const ultimasMascotas = await Mascota.find().sort({ fechaRegistro: -1 }).limit(5);
    const ultimosDiagnosticos = await Diagnostico.find()
      .populate('mascota')
      .sort({ fechaDiagnostico: -1 })
      .limit(5);
    
    res.render('dashboard', {
      totalMascotas,
      totalDiagnosticos,
      diagnosticosPendientes,
      diagnosticosCriticos,
      ultimasMascotas,
      ultimosDiagnosticos
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar dashboard');
  }
});

// Ruta raíz redirige al login
router.get('/', (req, res) => {
  if (req.session && req.session.authenticated) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
