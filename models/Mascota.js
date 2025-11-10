import mongoose from 'mongoose';

const mascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  especie: {
    type: String,
    required: true,
    enum: ['Perro', 'Gato', 'Ave', 'Roedor', 'Reptil', 'Otro']
  },
  raza: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  peso: {
    type: Number,
    required: true
  },
  sexo: {
    type: String,
    enum: ['Macho', 'Hembra'],
    required: true
  },
  color: String,
  
  // Pedigree
  pedigree: {
    numeroRegistro: String,
    padre: String,
    madre: String,
    criador: String
  },
  
  // Alimentación
  alimentacion: {
    tipoDieta: String,
    marcaAlimento: String,
    cantidadDiaria: String,
    frecuencia: String,
    alergias: [String]
  },
  
  // Vacunas
  vacunas: [{
    nombre: String,
    fecha: Date,
    proximaDosis: Date,
    veterinario: String,
    lote: String
  }],
  
  // Antecedentes médicos
  antecedentes: [{
    fecha: Date,
    descripcion: String,
    tratamiento: String,
    veterinario: String
  }],
  
  // Dueño
  propietario: {
    nombre: String,
    telefono: String,
    email: String,
    direccion: String
  },
  
  // Imágenes
  imagenes: [String],
  
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Mascota', mascotaSchema);
