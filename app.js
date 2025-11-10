import 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import conectar from './config/conexion.js';

// Obtener __dirname en ES6 Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar rutas
import indexRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import mascotasRoutes from './routes/mascotas.js';
import diagnosticosRoutes from './routes/diagnosticos.js';

// Inicializar Express
const app = express();

// Conectar a MongoDB
conectar();

// Configurar Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  helpers: {
    eq: function(a, b) {
      return a === b;
    },
    formatDate: function(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('es-ES');
    },
    json: function(context) {
      return JSON.stringify(context);
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'veterinaria_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

// Middleware para pasar datos de sesión a las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Rutas
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/mascotas', mascotasRoutes);
app.use('/diagnosticos', diagnosticosRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Credenciales: usuario='alumno', password='alu123'`);
});
