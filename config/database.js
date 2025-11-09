const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Verificar si el connection string es válido
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri || mongoUri.includes('cluster.mongodb.net')) {
      console.log('⚠️  Connection string de MongoDB no configurado correctamente');
      console.log('');
      console.log('🔧 OPCIONES PARA SOLUCIONAR:');
      console.log('');
      console.log('Opción 1: Usar MongoDB Atlas (RECOMENDADO - Base de datos en la nube)');
      console.log('  1. Ve a: https://www.mongodb.com/cloud/atlas/register');
      console.log('  2. Crea una cuenta gratuita y un cluster');
      console.log('  3. Obtén tu connection string real (algo como:)');
      console.log('     mongodb+srv://usuario:password@cluster0.abc123.mongodb.net/veterinaria?...');
      console.log('  4. Reemplázalo en el archivo .env');
      console.log('  5. Lee MONGODB_SETUP.md para ayuda detallada');
      console.log('');
      console.log('Opción 2: Usar MongoDB Local');
      console.log('  1. Instala MongoDB Community desde mongodb.com');
      console.log('  2. En el archivo .env cambia a:');
      console.log('     MONGODB_URI=mongodb://localhost:27017/veterinaria');
      console.log('  3. Ejecuta "mongod" en otra terminal');
      console.log('');
      console.log('⏩ Por ahora, el servidor NO usará base de datos');
      console.log('   (Los datos NO se guardarán - solo para pruebas visuales)');
      console.log('');
      return; // No conectar a MongoDB
    }
    
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error.message);
    console.error('💡 Verifica tu archivo .env y asegúrate de tener un connection string válido');
    console.error('📖 Lee el archivo MONGODB_SETUP.md para configurar tu base de datos');
    console.log('');
    console.log('⏩ El servidor continuará SIN base de datos (modo prueba visual)');
    console.log('   Los datos NO se guardarán hasta que configures MongoDB');
    console.log('');
  }
};

module.exports = connectDB;
