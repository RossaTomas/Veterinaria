# 🚨 SOLUCIÓN AL ERROR DE MONGODB

## El Problema
El servidor no puede conectarse a MongoDB porque el archivo `.env` tiene un connection string de ejemplo que no es válido.

## ✅ Solución Rápida

Tienes 2 opciones:

### Opción 1: Usar MongoDB Atlas (RECOMENDADO - Base de datos en la nube)

1. **Ve a MongoDB Atlas:**
   - Abre: https://www.mongodb.com/cloud/atlas/register
   - Crea una cuenta gratuita (o inicia sesión si ya tienes una)

2. **Crea un Cluster:**
   - Haz clic en "Create" o "Build a Database"
   - Selecciona el plan **FREE (M0)**
   - Elige la región más cercana a ti
   - Haz clic en "Create Cluster"
   - Espera 3-5 minutos

3. **Configura el Acceso:**
   - **Usuario:** Crea un usuario de base de datos (ejemplo: `veterinaria_user`)
   - **Password:** Crea una contraseña segura (guárdala, la necesitarás)
   - **IP Address:** Agrega tu IP o usa `0.0.0.0/0` para permitir todas las IPs

4. **Obtén el Connection String:**
   - Haz clic en "Connect" en tu cluster
   - Selecciona "Connect your application"
   - Copia el connection string (ejemplo):
     ```
     mongodb+srv://veterinaria_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

5. **Configura el archivo .env:**
   - Abre el archivo `.env` en tu proyecto
   - Pega tu connection string en la línea `MONGODB_URI=`
   - **Reemplaza `<password>` con tu contraseña real**
   - **Agrega `/veterinaria` después de `.net/` y antes de `?`**
   
   Ejemplo correcto:
   ```
   MONGODB_URI=mongodb+srv://veterinaria_user:MiPassword123@cluster0.abc123.mongodb.net/veterinaria?retryWrites=true&w=majority
   ```

6. **Reinicia el servidor:**
   - El servidor se reiniciará automáticamente con nodemon
   - O presiona `rs` en la terminal y Enter

### Opción 2: Usar MongoDB Local (Alternativa)

Si prefieres usar MongoDB instalado localmente:

1. **Instala MongoDB Community:**
   - Descarga desde: https://www.mongodb.com/try/download/community
   - Instala siguiendo el asistente

2. **Inicia MongoDB:**
   ```powershell
   mongod
   ```

3. **Configura el .env:**
   ```
   MONGODB_URI=mongodb://localhost:27017/veterinaria
   ```

4. **Reinicia el servidor**

## 🔍 Verificar que Funciona

Cuando la conexión sea exitosa, verás en la consola:
```
✅ MongoDB conectado correctamente
🚀 Servidor corriendo en http://localhost:3000
📊 Credenciales: usuario='alumno', password='alu123'
```

## ❓ Problemas Comunes

### Error: "bad auth"
- Tu usuario o contraseña son incorrectos
- Solución: Verifica las credenciales en MongoDB Atlas

### Error: "not authorized"
- Tu IP no está permitida
- Solución: Agrega tu IP en Network Access de MongoDB Atlas

### Error: "ENOTFOUND"
- El connection string es incorrecto
- Solución: Verifica que copiaste el string completo y reemplazaste <password>

## 📚 Más Ayuda

Lee el archivo **MONGODB_SETUP.md** para instrucciones detalladas con capturas de pantalla paso a paso.

## 🚀 Una vez configurado...

1. El servidor se reiniciará automáticamente
2. Ve a http://localhost:3000
3. Inicia sesión con:
   - Usuario: `alumno`
   - Contraseña: `alu123`
4. ¡Comienza a usar el sistema! 🐾
