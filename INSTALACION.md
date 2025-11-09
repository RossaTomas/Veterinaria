# Instrucciones de Instalación y Ejecución

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (viene con Node.js)
- Cuenta en MongoDB Atlas (gratuita)

## Paso 1: Instalar Dependencias

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
npm install
```

## Paso 2: Configurar MongoDB Atlas

1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita o inicia sesión
3. Crea un nuevo cluster (selecciona la opción gratuita M0)
4. Una vez creado el cluster:
   - Haz clic en "Connect"
   - Selecciona "Connect your application"
   - Copia la connection string (URI)
   - Debería verse así: `mongodb+srv://usuario:<password>@cluster.mongodb.net/`

5. Abre el archivo `.env` en el proyecto
6. Reemplaza el valor de `MONGODB_URI` con tu connection string
7. Reemplaza `<password>` con tu contraseña real
8. Agrega el nombre de la base de datos al final: `/veterinaria`

Ejemplo:
```
MONGODB_URI=mongodb+srv://miusuario:mipassword@cluster0.xxxxx.mongodb.net/veterinaria?retryWrites=true&w=majority
```

## Paso 3: Configurar Acceso a la Base de Datos

En MongoDB Atlas:
1. Ve a "Database Access" en el menú izquierdo
2. Agrega un nuevo usuario de base de datos
3. Ve a "Network Access" 
4. Agrega tu dirección IP o usa `0.0.0.0/0` (permitir desde cualquier lugar)

## Paso 4: Iniciar la Aplicación

En modo desarrollo (con auto-reload):
```powershell
npm run dev
```

O en modo producción:
```powershell
npm start
```

## Paso 5: Acceder a la Aplicación

1. Abre tu navegador
2. Ve a: http://localhost:3000
3. Usa las credenciales:
   - **Usuario:** alumno
   - **Contraseña:** alu123

## Estructura del Proyecto

```
Veterinaria/
├── config/              # Configuraciones (DB, multer)
├── models/              # Modelos de MongoDB
├── routes/              # Rutas de la aplicación
├── controllers/         # Lógica de negocio
├── middleware/          # Middleware de autenticación
├── views/               # Vistas Handlebars
│   ├── layouts/         # Layout principal
│   ├── auth/            # Vista de login
│   ├── mascotas/        # Vistas de mascotas
│   └── diagnosticos/    # Vistas de diagnósticos
├── public/              # Archivos estáticos
│   ├── css/             # Estilos CSS
│   ├── js/              # JavaScript del frontend
│   └── uploads/         # Archivos subidos
├── app.js               # Archivo principal
├── package.json         # Dependencias
└── .env                 # Variables de entorno
```

## Funcionalidades Principales

### 1. Login
- Usuario: alumno
- Clave: alu123

### 2. Dashboard
- Estadísticas generales
- Resumen de mascotas y diagnósticos
- Accesos rápidos

### 3. Gestión de Mascotas (CRUD)
- Registrar nueva mascota con:
  - Datos básicos (nombre, especie, raza, edad, peso, sexo)
  - Pedigree completo
  - Información de alimentación
  - Datos del propietario
  - Imágenes
- Ver listado de mascotas
- Ver detalles de cada mascota
- Editar información
- Eliminar mascotas
- Agregar vacunas
- Agregar antecedentes médicos

### 4. Sistema de Diagnóstico Predictivo
- Crear nuevo diagnóstico seleccionando mascota
- Ingresar múltiples síntomas/dolencias con:
  - Descripción del síntoma
  - Intensidad (Leve, Moderado, Grave)
  - Duración
  - Descripción detallada
- Registrar signos vitales
- **Predicción automática** basada en síntomas:
  - Enfermedad probable
  - Porcentaje de probabilidad
  - Nivel de urgencia (Bajo, Medio, Alto, Crítico)
  - Recomendaciones automáticas
  - Tratamiento sugerido
- Agregar evaluaciones médicas:
  - Radiografías
  - Ecografías
  - Análisis de sangre
  - Registro de cirugías
  - Carga de archivos (imágenes/PDF)
- Cambiar estado del diagnóstico (Pendiente, En revisión, Completado)

### 5. Carga de Archivos
- Imágenes de mascotas
- Radiografías
- Ecografías
- Documentos médicos
- Imágenes de intervenciones quirúrgicas

## Solución de Problemas

### Error al conectar con MongoDB
- Verifica que tu connection string sea correcta
- Asegúrate de que tu IP esté en la lista blanca de MongoDB Atlas
- Confirma que el usuario y contraseña sean correctos

### El puerto 3000 está en uso
- Cambia el puerto en el archivo `.env`: `PORT=3001`
- O cierra la aplicación que esté usando el puerto 3000

### Errores al subir archivos
- Verifica que la carpeta `public/uploads` exista
- Comprueba los permisos de escritura en la carpeta

## Contacto y Soporte

Para más información sobre el proyecto, consulta el archivo README.md
