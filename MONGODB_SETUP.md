# Configuración MongoDB Atlas - Paso a Paso

## ⚠️ IMPORTANTE: Debes configurar MongoDB Atlas antes de ejecutar la aplicación

Esta guía te llevará paso a paso para crear tu base de datos en la nube GRATUITA.

## Paso 1: Crear Cuenta en MongoDB Atlas

1. Ve a: https://www.mongodb.com/cloud/atlas/register
2. Regístrate con tu email o usa Google/GitHub
3. Completa el formulario de registro
4. Verifica tu email

## Paso 2: Crear un Cluster (Base de Datos)

1. Una vez dentro, haz clic en **"Build a Database"** o **"Create"**
2. Selecciona **"FREE"** (M0 Sandbox - 512 MB)
3. Configuración recomendada:
   - **Provider:** AWS (o el que prefieras)
   - **Region:** Selecciona la más cercana a tu ubicación
   - **Cluster Name:** Deja el nombre por defecto o usa "Veterinaria"
4. Haz clic en **"Create Cluster"**
5. Espera 3-5 minutos mientras se crea

## Paso 3: Configurar Acceso de Usuario

1. Te aparecerá un popup de **"Security Quickstart"**
2. En **"How would you like to authenticate your connection?"**
   - Selecciona **"Username and Password"**
   - Usuario: Ej. `veterinaria_user` (recuérdalo)
   - Password: Crea una contraseña segura (¡guárdala!)
   - O usa **"Autogenerate Secure Password"** y cópiala
3. Haz clic en **"Create User"**

## Paso 4: Configurar Acceso desde tu IP

1. En **"Where would you like to connect from?"**
2. Opción recomendada para desarrollo:
   - Selecciona **"My Local Environment"**
   - Haz clic en **"Add My Current IP Address"**
   - O agrega `0.0.0.0/0` para permitir acceso desde cualquier IP
3. Haz clic en **"Finish and Close"**

## Paso 5: Obtener el Connection String

1. En el Dashboard, haz clic en **"Connect"** en tu cluster
2. Selecciona **"Connect your application"**
3. Asegúrate que esté seleccionado:
   - **Driver:** Node.js
   - **Version:** 4.1 or later (o la más reciente)
4. Copia el **Connection String** que aparece
   - Se verá así: `mongodb+srv://veterinaria_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

## Paso 6: Configurar el Archivo .env

1. Abre el archivo `.env` en tu proyecto
2. Encuentra la línea `MONGODB_URI=`
3. Pega tu connection string
4. **IMPORTANTE:** Reemplaza `<password>` con tu contraseña real
5. Agrega `/veterinaria` después de `.net/` y antes de `?`

**Ejemplo ANTES:**
```
mongodb+srv://veterinaria_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Ejemplo DESPUÉS:**
```
mongodb+srv://veterinaria_user:MiPassword123@cluster0.xxxxx.mongodb.net/veterinaria?retryWrites=true&w=majority
```

## Paso 7: Verificar la Configuración

Tu archivo `.env` debe verse así:

```env
# Configuración de MongoDB Atlas
MONGODB_URI=mongodb+srv://veterinaria_user:MiPassword123@cluster0.xxxxx.mongodb.net/veterinaria?retryWrites=true&w=majority

# Puerto del servidor
PORT=3000

# Secreto para sesiones
SESSION_SECRET=veterinaria_secret_key_2024

# Usuario de acceso
LOGIN_USER=alumno
LOGIN_PASSWORD=alu123
```

## Solución de Problemas Comunes

### Error: "MongoServerError: bad auth"
**Causa:** Usuario o contraseña incorrectos
**Solución:** 
1. Ve a MongoDB Atlas → Database Access
2. Verifica el usuario y resetea la contraseña si es necesario
3. Actualiza el `.env`

### Error: "MongoServerError: not authorized"
**Causa:** Tu IP no está en la lista permitida
**Solución:**
1. Ve a MongoDB Atlas → Network Access
2. Haz clic en "Add IP Address"
3. Agrega tu IP actual o usa `0.0.0.0/0` (cualquier IP)

### Error: "connection timed out"
**Causa:** Firewall o red bloqueando la conexión
**Solución:**
1. Verifica tu conexión a internet
2. Intenta agregar `0.0.0.0/0` en Network Access
3. Desactiva temporalmente el firewall para probar

### Error: "ENOTFOUND cluster0.xxxxx.mongodb.net"
**Causa:** Connection string incorrecto
**Solución:**
1. Verifica que copiaste el connection string completo
2. Asegúrate de no tener espacios extras
3. Obtén uno nuevo desde MongoDB Atlas

## Gestionar tu Base de Datos

### Ver los Datos
1. En MongoDB Atlas, ve a tu cluster
2. Haz clic en **"Browse Collections"**
3. Verás las colecciones: `mascotas`, `diagnosticos`
4. Puedes ver, editar y eliminar documentos manualmente

### Hacer Backup
1. MongoDB Atlas hace backups automáticos (en planes pagos)
2. Para el plan gratuito, puedes exportar datos manualmente
3. O usar herramientas como MongoDB Compass

### Monitorear Uso
1. En el Dashboard puedes ver:
   - Almacenamiento usado (límite: 512 MB)
   - Conexiones activas
   - Operaciones por segundo

## Costos

- **Plan M0 (Gratuito):**
  - 512 MB de almacenamiento
  - Conexiones compartidas
  - Perfecto para desarrollo y pruebas
  - ✅ Suficiente para este proyecto

- **Plan M10 (Pago):**
  - Desde $0.08/hora (~$57/mes)
  - 10 GB de almacenamiento
  - Para producción

## Recursos Adicionales

- **Documentación:** https://docs.atlas.mongodb.com/
- **Universidad MongoDB:** https://university.mongodb.com/ (cursos gratuitos)
- **Soporte:** https://support.mongodb.com/

## Siguiente Paso

Una vez configurado MongoDB Atlas:
1. Verifica que tu `.env` esté correcto
2. Ejecuta `npm install` (si no lo hiciste)
3. Ejecuta `npm start` o `npm run dev`
4. Ve a http://localhost:3000
5. Inicia sesión con usuario: `alumno`, password: `alu123`

## ✅ Verificación Exitosa

Cuando la aplicación se conecte correctamente, verás en la consola:
```
✅ MongoDB conectado correctamente
🚀 Servidor corriendo en http://localhost:3000
📊 Credenciales: usuario='alumno', password='alu123'
```

Si ves eso, ¡todo está funcionando correctamente! 🎉
