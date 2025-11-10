import mongoose from 'mongoose'; // traemos mongoose que instalamos
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGODB_URI; // url desde archivo .env
const nombreBase = "veterinaria"; // nombre de base

async function conectar() { // funcion 
    try { // para que no de error
        console.log("Conectando a MongoDB..."); // aviso que estamos conectando
        await mongoose.connect(url); // conectamos a MongoDB
        console.log("✅ Conexion correcta a MongoDB"); // aviso si esta todo ok
        console.log(`📊 Base de datos: ${nombreBase}`);
        
        return mongoose.connection;

    } catch (error) {
        console.log("Error de conexion:", error.message); 
        throw error; 
    }
}

export default conectar;
