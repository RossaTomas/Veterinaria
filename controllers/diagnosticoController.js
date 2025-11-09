const Diagnostico = require('../models/Diagnostico');
const Mascota = require('../models/Mascota');

// Sistema de predicción de diagnósticos basado en síntomas
const predecirDiagnostico = (dolencias) => {
  // Base de conocimiento simplificada para predicción
  const baseConocimiento = {
    'fiebre alta': { enfermedad: 'Infección viral o bacteriana', probabilidad: 75, nivel: 'Alto' },
    'vómitos': { enfermedad: 'Gastroenteritis', probabilidad: 70, nivel: 'Medio' },
    'diarrea': { enfermedad: 'Trastorno digestivo', probabilidad: 65, nivel: 'Medio' },
    'tos': { enfermedad: 'Infección respiratoria', probabilidad: 60, nivel: 'Medio' },
    'cojera': { enfermedad: 'Lesión musculoesquelética', probabilidad: 80, nivel: 'Alto' },
    'pérdida de apetito': { enfermedad: 'Estrés o enfermedad subyacente', probabilidad: 50, nivel: 'Bajo' },
    'letargo': { enfermedad: 'Anemia o infección', probabilidad: 60, nivel: 'Medio' },
    'picazón': { enfermedad: 'Alergia o parásitos', probabilidad: 70, nivel: 'Medio' },
    'dificultad respiratoria': { enfermedad: 'Problema cardíaco o pulmonar', probabilidad: 85, nivel: 'Crítico' },
    'convulsiones': { enfermedad: 'Epilepsia o intoxicación', probabilidad: 90, nivel: 'Crítico' },
    'sangrado': { enfermedad: 'Trauma o trastorno de coagulación', probabilidad: 85, nivel: 'Crítico' },
    'hinchazón abdominal': { enfermedad: 'Torsión gástrica', probabilidad: 80, nivel: 'Alto' }
  };
  
  let diagnosticoPrincipal = null;
  let maxProbabilidad = 0;
  
  // Analizar cada dolencia
  dolencias.forEach(dolencia => {
    const sintomaLower = dolencia.sintoma.toLowerCase();
    
    // Buscar coincidencias en la base de conocimiento
    for (const [key, value] of Object.entries(baseConocimiento)) {
      if (sintomaLower.includes(key)) {
        let probabilidad = value.probabilidad;
        
        // Ajustar probabilidad según intensidad
        if (dolencia.intensidad === 'Grave') {
          probabilidad += 10;
        } else if (dolencia.intensidad === 'Leve') {
          probabilidad -= 10;
        }
        
        if (probabilidad > maxProbabilidad) {
          maxProbabilidad = probabilidad;
          diagnosticoPrincipal = {
            enfermedad: value.enfermedad,
            probabilidad: Math.min(probabilidad, 95),
            nivel: value.nivel
          };
        }
      }
    }
  });
  
  // Si no se encuentra coincidencia, dar diagnóstico genérico
  if (!diagnosticoPrincipal) {
    diagnosticoPrincipal = {
      enfermedad: 'Requiere evaluación veterinaria detallada',
      probabilidad: 30,
      nivel: 'Bajo'
    };
  }
  
  // Generar recomendaciones según el nivel
  let recomendaciones = [];
  switch (diagnosticoPrincipal.nivel) {
    case 'Crítico':
      recomendaciones = [
        'Acudir INMEDIATAMENTE a urgencias veterinarias',
        'No administrar medicamentos sin supervisión',
        'Mantener a la mascota en reposo',
        'Monitorear signos vitales constantemente'
      ];
      break;
    case 'Alto':
      recomendaciones = [
        'Consultar con veterinario dentro de las próximas 24 horas',
        'Observar evolución de síntomas',
        'Mantener hidratación adecuada',
        'Evitar ejercicio intenso'
      ];
      break;
    case 'Medio':
      recomendaciones = [
        'Agendar cita veterinaria en los próximos días',
        'Monitorear síntomas',
        'Mantener alimentación regular',
        'Observar comportamiento'
      ];
      break;
    default:
      recomendaciones = [
        'Observar evolución durante 48 horas',
        'Mantener rutina normal',
        'Contactar veterinario si empeora'
      ];
  }
  
  diagnosticoPrincipal.recomendaciones = recomendaciones;
  diagnosticoPrincipal.tratamientoSugerido = generarTratamiento(diagnosticoPrincipal.enfermedad);
  
  return diagnosticoPrincipal;
};

const generarTratamiento = (enfermedad) => {
  const tratamientos = {
    'Infección viral o bacteriana': 'Antibióticos y antiinflamatorios bajo prescripción veterinaria',
    'Gastroenteritis': 'Dieta blanda, hidratación y probióticos',
    'Trastorno digestivo': 'Ayuno de 12 horas, luego dieta blanda',
    'Infección respiratoria': 'Antibióticos, mucolíticos y reposo',
    'Lesión musculoesquelética': 'Antiinflamatorios, reposo y fisioterapia',
    'Anemia o infección': 'Análisis de sangre completo y tratamiento según causa',
    'Alergia o parásitos': 'Antihistamínicos, desparasitación',
    'Problema cardíaco o pulmonar': 'Evaluación cardiológica urgente',
    'Epilepsia o intoxicación': 'Anticonvulsivantes y estabilización',
    'Trauma o trastorno de coagulación': 'Tratamiento de emergencia',
    'Torsión gástrica': 'Cirugía de emergencia'
  };
  
  return tratamientos[enfermedad] || 'Tratamiento personalizado según evaluación veterinaria';
};

// Obtener todos los diagnósticos
exports.getAllDiagnosticos = async (req, res) => {
  try {
    const diagnosticos = await Diagnostico.find()
      .populate('mascota')
      .sort({ fechaDiagnostico: -1 });
    res.render('diagnosticos/index', { diagnosticos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener diagnósticos');
  }
};

// Mostrar formulario de nuevo diagnóstico
exports.showCreateForm = async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    const mascotaId = req.query.mascota;
    res.render('diagnosticos/create', { mascotas, mascotaId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar formulario');
  }
};

// Crear nuevo diagnóstico
exports.createDiagnostico = async (req, res) => {
  try {
    // Procesar dolencias del formulario
    const dolencias = [];
    if (req.body.sintomas) {
      const sintomas = Array.isArray(req.body.sintomas) ? req.body.sintomas : [req.body.sintomas];
      const intensidades = Array.isArray(req.body.intensidades) ? req.body.intensidades : [req.body.intensidades];
      const duraciones = Array.isArray(req.body.duraciones) ? req.body.duraciones : [req.body.duraciones];
      const descripciones = Array.isArray(req.body.descripciones) ? req.body.descripciones : [req.body.descripciones];
      
      for (let i = 0; i < sintomas.length; i++) {
        if (sintomas[i]) {
          dolencias.push({
            sintoma: sintomas[i],
            intensidad: intensidades[i],
            duracion: duraciones[i],
            descripcion: descripciones[i]
          });
        }
      }
    }
    
    // Realizar predicción de diagnóstico
    const prediccion = predecirDiagnostico(dolencias);
    
    const diagnosticoData = {
      mascota: req.body.mascota,
      dolencias: dolencias,
      signosVitales: {
        temperatura: req.body.temperatura,
        frecuenciaCardiaca: req.body.frecuenciaCardiaca,
        frecuenciaRespiratoria: req.body.frecuenciaRespiratoria,
        presionArterial: req.body.presionArterial
      },
      diagnosticoPrediccion: prediccion,
      observaciones: req.body.observaciones
    };
    
    const diagnostico = await Diagnostico.create(diagnosticoData);
    res.redirect('/diagnosticos/' + diagnostico._id);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear diagnóstico');
  }
};

// Mostrar detalle de diagnóstico
exports.showDiagnostico = async (req, res) => {
  try {
    const diagnostico = await Diagnostico.findById(req.params.id).populate('mascota');
    if (!diagnostico) {
      return res.status(404).send('Diagnóstico no encontrado');
    }
    res.render('diagnosticos/show', { diagnostico });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener diagnóstico');
  }
};

// Agregar evaluación (radiografía, análisis, etc.)
exports.addEvaluacion = async (req, res) => {
  try {
    const diagnostico = await Diagnostico.findById(req.params.id);
    if (!diagnostico) {
      return res.status(404).send('Diagnóstico no encontrado');
    }
    
    const evaluacion = {
      tipo: req.body.tipo,
      descripcion: req.body.descripcion,
      fecha: req.body.fecha || new Date(),
      resultado: req.body.resultado,
      archivo: req.file ? '/uploads/' + req.file.filename : null
    };
    
    diagnostico.evaluaciones.push(evaluacion);
    await diagnostico.save();
    
    res.redirect('/diagnosticos/' + req.params.id);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar evaluación');
  }
};

// Actualizar estado del diagnóstico
exports.updateEstado = async (req, res) => {
  try {
    await Diagnostico.findByIdAndUpdate(req.params.id, {
      estado: req.body.estado
    });
    res.redirect('/diagnosticos/' + req.params.id);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar estado');
  }
};

// Eliminar diagnóstico
exports.deleteDiagnostico = async (req, res) => {
  try {
    await Diagnostico.findByIdAndDelete(req.params.id);
    res.redirect('/diagnosticos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar diagnóstico');
  }
};
