import mongoose from 'mongoose';

const diagnosticoSchema = new mongoose.Schema({
  mascota: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mascota',
    required: true
  },
  
  // Dolencias reportadas
  dolencias: [{
    sintoma: String,
    intensidad: {
      type: String,
      enum: ['Leve', 'Moderado', 'Grave']
    },
    duracion: String,
    descripcion: String
  }],
  
  // Signos vitales
  signosVitales: {
    temperatura: Number,
    frecuenciaCardiaca: Number,
    frecuenciaRespiratoria: Number,
    presionArterial: String
  },
  
  // Diagnóstico predictivo
  diagnosticoPrediccion: {
    enfermedad: String,
    probabilidad: Number,
    nivel: {
      type: String,
      enum: ['Bajo', 'Medio', 'Alto', 'Crítico']
    },
    recomendaciones: [String],
    tratamientoSugerido: String
  },
  
  // Evaluaciones (radiografías, análisis, etc.)
  evaluaciones: [{
    tipo: {
      type: String,
      enum: ['Radiografía', 'Ecografía', 'Análisis de sangre', 'Cirugía', 'Otro']
    },
    descripcion: String,
    archivo: String,
    fecha: Date,
    resultado: String
  }],
  
  // Observaciones del veterinario
  observaciones: String,
  
  estado: {
    type: String,
    enum: ['Pendiente', 'En revisión', 'Completado'],
    default: 'Pendiente'
  },
  
  fechaDiagnostico: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Diagnostico', diagnosticoSchema);
