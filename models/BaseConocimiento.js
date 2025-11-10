import mongoose from 'mongoose';

const baseConocimientoSchema = new mongoose.Schema({
  sintoma: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  enfermedad: {
    type: String,
    required: true
  },
  probabilidad: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  nivel: {
    type: String,
    required: true,
    enum: ['Bajo', 'Medio', 'Alto', 'Crítico']
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('BaseConocimiento', baseConocimientoSchema);
