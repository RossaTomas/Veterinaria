/**
 * Script para cargar la base de conocimiento de síntomas en MongoDB
 * Ejecutar con: node seeds/seed-conocimiento.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const BaseConocimiento = require('../models/BaseConocimiento');

// Datos de la base de conocimiento
const conocimientos = [
  { sintoma: 'fiebre alta', enfermedad: 'Infección viral o bacteriana', probabilidad: 75, nivel: 'Alto' },
  { sintoma: 'vómitos', enfermedad: 'Gastroenteritis', probabilidad: 70, nivel: 'Medio' },
  { sintoma: 'diarrea', enfermedad: 'Trastorno digestivo', probabilidad: 65, nivel: 'Medio' },
  { sintoma: 'tos', enfermedad: 'Infección respiratoria', probabilidad: 60, nivel: 'Medio' },
  { sintoma: 'cojera', enfermedad: 'Lesión musculoesquelética', probabilidad: 80, nivel: 'Alto' },
  { sintoma: 'pérdida de apetito', enfermedad: 'Estrés o enfermedad subyacente', probabilidad: 50, nivel: 'Bajo' },
  { sintoma: 'letargo', enfermedad: 'Anemia o infección', probabilidad: 60, nivel: 'Medio' },
  { sintoma: 'picazón', enfermedad: 'Alergia o parásitos', probabilidad: 70, nivel: 'Medio' },
  { sintoma: 'dificultad respiratoria', enfermedad: 'Problema cardíaco o pulmonar', probabilidad: 85, nivel: 'Crítico' },
  { sintoma: 'convulsiones', enfermedad: 'Epilepsia o intoxicación', probabilidad: 90, nivel: 'Crítico' },
  { sintoma: 'sangrado', enfermedad: 'Trauma o trastorno de coagulación', probabilidad: 85, nivel: 'Crítico' },
  { sintoma: 'hinchazón abdominal', enfermedad: 'Torsión gástrica', probabilidad: 80, nivel: 'Alto' }
];

async function cargarConocimiento() {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
    
    console.log('\n🗑️  Limpiando colección existente...');
    await BaseConocimiento.deleteMany({});
    console.log('✅ Colección limpiada');
    
    console.log('\n📝 Cargando base de conocimiento...');
    
    for (const conocimiento of conocimientos) {
      await BaseConocimiento.create(conocimiento);
      console.log(`✅ Cargado: ${conocimiento.sintoma} -> ${conocimiento.enfermedad} (${conocimiento.nivel})`);
    }
    
    console.log('\n🎉 Base de conocimiento cargada exitosamente');
    console.log(`📊 Total de síntomas: ${conocimientos.length}`);
    
    // Mostrar resumen
    const total = await BaseConocimiento.countDocuments();
    console.log(`\n📋 Registros en base de datos: ${total}`);
    
  } catch (error) {
    console.error('❌ Error al cargar base de conocimiento:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Desconectado de MongoDB');
    process.exit(0);
  }
}

// Ejecutar el script
cargarConocimiento();
