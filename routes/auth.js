const express = require('express');
const router = express.Router();
const { validateLogin } = require('../middleware/auth');

// Ruta de login GET
router.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('auth/login', { error, layout: false });
});

// Ruta de login POST
router.post('/login', validateLogin, (req, res) => {
  res.redirect('/dashboard');
});

// Ruta de logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
