# Sistema de Diagnóstico Veterinario Online

Sistema de gestión veterinaria con diagnóstico automático basado en síntomas, desarrollado con Express.js, MongoDB y Handlebars.

## Características

- ✅ Login de usuario (Usuario: `alumno`, Clave: `alu123`)
- ✅ CRUD de mascotas con historial completo
- ✅ Registro de antecedentes médicos
- ✅ Control de vacunas y alimentación
- ✅ Pedigree de mascotas
- ✅ Sistema de diagnóstico predictivo basado en dolencias
- ✅ Carga de imágenes (radiografías, cirugías, etc.)
- ✅ Base de datos MongoDB en la nube

## Estructura del Proyecto

```
Veterinaria/
├── config/          # Configuraciones de la aplicación
├── models/          # Modelos de MongoDB (Schemas)
├── routes/          # Rutas de la API
├── controllers/     # Lógica de negocio
├── middleware/      # Middleware de autenticación
├── views/           # Vistas Handlebars
├── public/          # Archivos estáticos (CSS, JS, imágenes)
├── app.js           # Archivo principal
└── package.json     # Dependencias
```

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```

3. **⚠️ IMPORTANTE:** Configura tu base de datos MongoDB Atlas:
   - Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Crea un cluster gratuito (M0)
   - Obtén tu connection string
   - **Copia el archivo `.env.example` a `.env`**
   - Reemplaza en el archivo `.env` la variable `MONGODB_URI` con tu connection string real
   - **Asegúrate de reemplazar `<password>` con tu contraseña**
   - **Agrega `/veterinaria` después de `.net/` en el connection string**

   **Ejemplo de connection string correcto:**
   ```
   mongodb+srv://usuario:password123@cluster0.xxxxx.mongodb.net/veterinaria?retryWrites=true&w=majority
   ```

   📖 **Para ayuda detallada, lee:**
   - `MONGODB_SETUP.md` - Guía paso a paso con capturas
   - `SOLUCION_ERROR_MONGODB.md` - Si tienes errores de conexión

4. Inicia el servidor:
   ```bash
   npm start
   ```
   O en modo desarrollo:
   ```bash
   npm run dev
   ```

5. Accede a `http://localhost:3000`

## Credenciales de Acceso

- **Usuario:** alumno
- **Contraseña:** alu123

## Tecnologías

- **Backend:** Node.js, Express.js
- **Base de Datos:** MongoDB Atlas (NoSQL en la nube)
- **Template Engine:** Handlebars
- **Carga de Archivos:** Multer
- **Sesiones:** Express-Session
