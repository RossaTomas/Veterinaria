const Mascota = require('../models/Mascota');

// Obtener todas las mascotas
exports.getAllMascotas = async (req, res) => {
  try {
    console.log('📋 Obteniendo todas las mascotas...');
    const mascotas = await Mascota.find().sort({ fechaRegistro: -1 });
    console.log(`✅ Se encontraron ${mascotas.length} mascotas`);
    res.render('mascotas/index', { mascotas });
  } catch (error) {
    console.error('❌ Error al obtener mascotas:', error);
    res.status(500).send('Error al obtener mascotas: ' + error.message);
  }
};

// Mostrar formulario de nueva mascota
exports.showCreateForm = (req, res) => {
  res.render('mascotas/create');
};

// Crear nueva mascota
exports.createMascota = async (req, res) => {
  try {
    const mascotaData = {
      nombre: req.body.nombre,
      especie: req.body.especie,
      raza: req.body.raza,
      edad: req.body.edad,
      peso: req.body.peso,
      sexo: req.body.sexo,
      color: req.body.color,
      pedigree: {
        numeroRegistro: req.body.pedigreeNumero,
        padre: req.body.pedigreePadre,
        madre: req.body.pedigreeMadre,
        criador: req.body.pedigreeCriador
      },
      alimentacion: {
        tipoDieta: req.body.tipoDieta,
        marcaAlimento: req.body.marcaAlimento,
        cantidadDiaria: req.body.cantidadDiaria,
        frecuencia: req.body.frecuencia,
        alergias: req.body.alergias ? req.body.alergias.split(',').map(a => a.trim()) : []
      },
      propietario: {
        nombre: req.body.propietarioNombre,
        telefono: req.body.propietarioTelefono,
        email: req.body.propietarioEmail,
        direccion: req.body.propietarioDireccion
      },
      imagenes: req.files ? req.files.map(file => '/uploads/' + file.filename) : []
    };
    
    await Mascota.create(mascotaData);
    res.redirect('/mascotas');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear mascota');
  }
};

// Mostrar detalle de mascota
exports.showMascota = async (req, res) => {
  try {
    console.log('Buscando mascota con ID:', req.params.id);
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) {
      console.log('Mascota no encontrada');
      return res.status(404).send('Mascota no encontrada');
    }
    console.log('Mascota encontrada:', mascota.nombre);
    res.render('mascotas/show', { mascota });
  } catch (error) {
    console.error('Error al obtener mascota:', error);
    res.status(500).send('Error al obtener mascota: ' + error.message);
  }
};

// Mostrar formulario de edición
exports.showEditForm = async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) {
      return res.status(404).send('Mascota no encontrada');
    }
    res.render('mascotas/edit', { mascota });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener mascota');
  }
};

// Actualizar mascota
exports.updateMascota = async (req, res) => {
  try {
    const mascotaData = {
      nombre: req.body.nombre,
      especie: req.body.especie,
      raza: req.body.raza,
      edad: req.body.edad,
      peso: req.body.peso,
      sexo: req.body.sexo,
      color: req.body.color,
      'pedigree.numeroRegistro': req.body.pedigreeNumero,
      'pedigree.padre': req.body.pedigreePadre,
      'pedigree.madre': req.body.pedigreeMadre,
      'pedigree.criador': req.body.pedigreeCriador,
      'alimentacion.tipoDieta': req.body.tipoDieta,
      'alimentacion.marcaAlimento': req.body.marcaAlimento,
      'alimentacion.cantidadDiaria': req.body.cantidadDiaria,
      'alimentacion.frecuencia': req.body.frecuencia,
      'propietario.nombre': req.body.propietarioNombre,
      'propietario.telefono': req.body.propietarioTelefono,
      'propietario.email': req.body.propietarioEmail,
      'propietario.direccion': req.body.propietarioDireccion
    };
    
    await Mascota.findByIdAndUpdate(req.params.id, mascotaData);
    res.redirect('/mascotas/' + req.params.id);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar mascota');
  }
};

// Eliminar mascota
exports.deleteMascota = async (req, res) => {
  try {
    await Mascota.findByIdAndDelete(req.params.id);
    res.redirect('/mascotas');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar mascota');
  }
};

// Agregar vacuna
exports.addVacuna = async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) {
      return res.status(404).send('Mascota no encontrada');
    }
    
    mascota.vacunas.push({
      nombre: req.body.nombre,
      fecha: req.body.fecha,
      proximaDosis: req.body.proximaDosis,
      veterinario: req.body.veterinario,
      lote: req.body.lote
    });
    
    await mascota.save();
    res.redirect('/mascotas/' + req.params.id);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar vacuna');
  }
};

// Agregar antecedente médico
exports.addAntecedente = async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) {
      return res.status(404).send('Mascota no encontrada');
    }
    
    mascota.antecedentes.push({
      fecha: req.body.fecha,
      descripcion: req.body.descripcion,
      tratamiento: req.body.tratamiento,
      veterinario: req.body.veterinario
    });
    
    await mascota.save();
    res.redirect('/mascotas/' + req.params.id);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar antecedente');
  }
};
