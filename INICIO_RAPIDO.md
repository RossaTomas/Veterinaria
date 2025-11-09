# 🚀 INICIO RÁPIDO

## Pasos Mínimos para Ejecutar el Proyecto

### 1️⃣ Instalar Dependencias
```powershell
npm install
```

### 2️⃣ Configurar MongoDB Atlas
Lee el archivo `MONGODB_SETUP.md` y configura tu base de datos en la nube.

**Resumen rápido:**
1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea cuenta y cluster gratuito
3. Crea usuario y contraseña
4. Obtén connection string
5. Pégalo en el archivo `.env` en la variable `MONGODB_URI`
6. Reemplaza `<password>` con tu contraseña real
7. Agrega `/veterinaria` después de `.net/`

### 3️⃣ Iniciar el Servidor

**Modo desarrollo (recomendado):**
```powershell
npm run dev
```

**Modo producción:**
```powershell
npm start
```

### 4️⃣ Acceder a la Aplicación

Abre tu navegador en: **http://localhost:3000**

**Credenciales:**
- Usuario: `alumno`
- Contraseña: `alu123`

---

## ✅ Verificación de Instalación

Si todo está correcto, verás en la consola:
```
✅ MongoDB conectado correctamente
🚀 Servidor corriendo en http://localhost:3000
📊 Credenciales: usuario='alumno', password='alu123'
```

---

## 📚 Archivos de Ayuda

- **MONGODB_SETUP.md** - Configuración detallada de MongoDB Atlas
- **INSTALACION.md** - Guía completa de instalación
- **GUIA_USO.md** - Manual de usuario completo
- **RESUMEN_PROYECTO.md** - Resumen del proyecto y tecnologías

---

## 🆘 Problemas Comunes

### El comando `npm` no es reconocido
**Solución:** Instala Node.js desde https://nodejs.org/

### Error de conexión a MongoDB
**Solución:** Verifica tu archivo `.env` y sigue `MONGODB_SETUP.md`

### Puerto 3000 en uso
**Solución:** Cambia el puerto en `.env`: `PORT=3001`

---

## 📝 Flujo de Uso Básico

1. **Login** → Inicia sesión con alumno/alu123
2. **Registrar Mascota** → Dashboard → "Nueva Mascota"
3. **Crear Diagnóstico** → Mascotas → Seleccionar mascota → "Nuevo Diagnóstico"
4. **Agregar Síntomas** → Completa formulario con dolencias
5. **Ver Predicción** → El sistema genera diagnóstico automático
6. **Agregar Evaluaciones** → Sube radiografías, análisis, etc.

---

## 🎯 ¿Todo listo?

Si seguiste estos pasos, tu aplicación debería estar funcionando.

**¡Bienvenido al Sistema de Diagnóstico Veterinario Online! 🐾**
