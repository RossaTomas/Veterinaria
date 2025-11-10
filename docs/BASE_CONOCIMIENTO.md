# Base de Conocimiento para Diagnósticos

## 📋 Descripción

La base de conocimiento de síntomas ahora está almacenada en **MongoDB** en lugar de estar hardcodeada en el código.

## 🗄️ Modelo: BaseConocimiento

```javascript
{
  sintoma: String,           // Ej: "fiebre alta", "vómitos"
  enfermedad: String,        // Ej: "Gastroenteritis"
  probabilidad: Number,      // 0-100
  nivel: String,             // "Bajo", "Medio", "Alto", "Crítico"
  activo: Boolean,           // true/false
  timestamps: true           // createdAt, updatedAt
}
```

## 🚀 Cargar Datos Iniciales

Para cargar los 12 síntomas base en la base de datos:

```bash
node seeds/seed-conocimiento.js
```

Este script:
- ✅ Se conecta a MongoDB
- ✅ Limpia la colección existente
- ✅ Carga 12 síntomas predefinidos
- ✅ Muestra resumen de lo cargado

## 📊 Síntomas Incluidos

| Síntoma | Enfermedad | Probabilidad | Nivel |
|---------|-----------|--------------|-------|
| Fiebre alta | Infección viral o bacteriana | 75% | Alto |
| Vómitos | Gastroenteritis | 70% | Medio |
| Diarrea | Trastorno digestivo | 65% | Medio |
| Tos | Infección respiratoria | 60% | Medio |
| Cojera | Lesión musculoesquelética | 80% | Alto |
| Pérdida de apetito | Estrés o enfermedad subyacente | 50% | Bajo |
| Letargo | Anemia o infección | 60% | Medio |
| Picazón | Alergia o parásitos | 70% | Medio |
| Dificultad respiratoria | Problema cardíaco o pulmonar | 85% | Crítico |
| Convulsiones | Epilepsia o intoxicación | 90% | Crítico |
| Sangrado | Trauma o trastorno de coagulación | 85% | Crítico |
| Hinchazón abdominal | Torsión gástrica | 80% | Alto |

## 🔄 Cómo Funciona Ahora

### Antes (Hardcodeado):
```javascript
const baseConocimiento = {
  'fiebre alta': { enfermedad: '...', probabilidad: 75 },
  // ... más síntomas
};
```

### Ahora (Base de Datos):
```javascript
// El controlador consulta MongoDB
const baseConocimiento = await BaseConocimiento.find({ activo: true });
```

## ✨ Ventajas

1. ✅ **Datos dinámicos**: Puedes agregar/editar síntomas sin modificar código
2. ✅ **Escalable**: Fácil agregar más síntomas desde la BD
3. ✅ **Auditoría**: Timestamps automáticos (createdAt, updatedAt)
4. ✅ **Control**: Campo `activo` para desactivar síntomas sin eliminarlos

## 🛠️ Gestión de Síntomas

### Agregar nuevo síntoma:

```javascript
const BaseConocimiento = require('./models/BaseConocimiento');

await BaseConocimiento.create({
  sintoma: 'estornudos',
  enfermedad: 'Resfriado o alergia',
  probabilidad: 65,
  nivel: 'Medio',
  activo: true
});
```

### Desactivar síntoma:

```javascript
await BaseConocimiento.updateOne(
  { sintoma: 'fiebre alta' },
  { activo: false }
);
```

### Ver todos los síntomas:

```javascript
const sintomas = await BaseConocimiento.find();
console.log(sintomas);
```

## 📝 Archivos Relacionados

- `models/BaseConocimiento.js` - Modelo de Mongoose
- `seeds/seed-conocimiento.js` - Script para cargar datos iniciales
- `controllers/diagnosticoController.js` - Usa la BD para predicciones

## ⚠️ Importante

**Primera vez**: Debes ejecutar el script de seed para cargar los datos:

```bash
node seeds/seed-conocimiento.js
```

Sin esto, el sistema de predicción no tendrá síntomas para comparar.

## 🎯 Flujo de Predicción

1. Usuario ingresa síntomas del animal
2. Sistema consulta `BaseConocimiento` en MongoDB
3. Compara síntomas ingresados con los de la BD
4. Calcula probabilidad ajustada por intensidad
5. Retorna diagnóstico con mayor probabilidad
6. Genera recomendaciones según nivel de urgencia
