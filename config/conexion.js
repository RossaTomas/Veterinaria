const mongoose = require('mongoose'); // traemos mongoose que instalamos
require('dotenv').config();

const url = process.env.MONGODB_URI; // url desde archivo .env
const nombreBase = "veterinaria"; // nombre de base

async function conectar() { // funcion 
    try { // para que no de error
        console.log("Conectando a MongoDB..."); // aviso que estamos conectando
        await mongoose.connect(url); // conectamos a MongoDB
        console.log("✅ Conexion correcta a MongoDB"); // aviso si esta todo ok
        console.log(`📊 Base de datos: ${nombreBase}`);
        
        return mongoose.connection; // sacamos variable - retornamos la conexion

    } catch (error) {
        console.log("❌ Error de conexion:", error.message); // si hay error de conexion tira numero y asi buscamos que error es
        console.log("");
        console.log("💡 Verifica:");
        console.log("  1. Que tu archivo .env tenga MONGODB_URI configurado");
        console.log("  2. Que el connection string sea válido");
        console.log("  3. Que tengas acceso a internet (si usas MongoDB Atlas)");
        console.log("");
        throw error; 
    }
}

module.exports = conectar;
