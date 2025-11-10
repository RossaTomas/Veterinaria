import Usuario from '../models/Usuario.js';

// Renderizar formulario de login
export const mostrarLogin = (req, res) => {
  const error = req.query.error;
  res.render('auth/login', { error, layout: false });
};

// Procesar login
export const procesarLogin = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    
    console.log('🔐 Intento de login:', usuario);
    
    // Validar campos
    if (!usuario || !password) {
      return res.redirect('/login?error=Todos los campos son obligatorios');
    }
    
    // Buscar usuario en la base de datos
    const usuarioEncontrado = await Usuario.findOne({ usuario });
    
    if (!usuarioEncontrado) {
      console.log('❌ Usuario no encontrado:', usuario);
      return res.redirect('/login?error=Usuario o contraseña incorrectos');
    }
    
    // Verificar password
    const passwordValido = await usuarioEncontrado.compararPassword(password);
    
    if (!passwordValido) {
      console.log('❌ Password incorrecto para:', usuario);
      return res.redirect('/login?error=Usuario o contraseña incorrectos');
    }
    
    // Login exitoso
    console.log('✅ Login exitoso:', usuario);
    req.session.user = {
      id: usuarioEncontrado._id,
      usuario: usuarioEncontrado.usuario
    };
    
    res.redirect('/dashboard');
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.redirect('/login?error=Error en el servidor');
  }
};

// Logout
export const logout = (req, res) => {
  const usuario = req.session.user?.usuario || 'Desconocido';
  console.log('👋 Logout:', usuario);
  req.session.destroy();
  res.redirect('/login');
};
