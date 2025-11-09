require('dotenv').config();

// Middleware de autenticación
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    return next();
  }
  res.redirect('/login');
};

// Middleware de validación de login
const validateLogin = (req, res, next) => {
  const { usuario, password } = req.body;
  
  const validUser = process.env.LOGIN_USER || 'alumno';
  const validPassword = process.env.LOGIN_PASSWORD || 'alu123';
  
  if (usuario === validUser && password === validPassword) {
    req.session.authenticated = true;
    req.session.usuario = usuario;
    return next();
  }
  
  res.redirect('/login?error=credenciales_invalidas');
};

module.exports = {
  isAuthenticated,
  validateLogin
};
