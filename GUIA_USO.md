# Guía de Uso del Sistema

## 1. Primer Acceso

### Iniciar Sesión
1. Abre http://localhost:3000 en tu navegador
2. Ingresa las credenciales:
   - **Usuario:** alumno
   - **Contraseña:** alu123
3. Serás redirigido al Dashboard

## 2. Registrar una Mascota

### Desde el Dashboard
1. Haz clic en "➕ Nueva Mascota"
2. Completa el formulario con:

#### Información Básica (Obligatorio)
- Nombre: Ej. "Max"
- Especie: Selecciona (Perro, Gato, Ave, etc.)
- Raza: Ej. "Labrador"
- Edad: Ej. 3 (años)
- Peso: Ej. 25.5 (kg)
- Sexo: Macho o Hembra
- Color: Ej. "Dorado"

#### Pedigree (Opcional)
- Número de Registro
- Padre y Madre
- Criador

#### Alimentación (Opcional)
- Tipo de Dieta: Ej. "Balanceada"
- Marca de Alimento: Ej. "Royal Canin"
- Cantidad Diaria: Ej. "300g"
- Frecuencia: Ej. "2 veces al día"
- Alergias: Ej. "Pollo, Trigo" (separadas por comas)

#### Propietario (Obligatorio)
- Nombre completo
- Teléfono de contacto
- Email (opcional)
- Dirección (opcional)

#### Imágenes (Opcional)
- Sube hasta 5 imágenes de la mascota

3. Haz clic en "Registrar Mascota"

## 3. Ver y Gestionar Mascotas

### Listado de Mascotas
- Ve a "Mascotas" en el menú
- Verás todas las mascotas en tarjetas con información resumida
- Opciones disponibles:
  - **Ver Detalles:** Información completa
  - **Diagnosticar:** Crear nuevo diagnóstico

### Detalles de una Mascota
- Información completa organizada en secciones
- Agregar vacunas:
  1. Haz clic en "➕ Agregar Vacuna"
  2. Completa: nombre, fecha, próxima dosis, veterinario, lote
  3. Guarda
- Agregar antecedentes médicos:
  1. Haz clic en "➕ Agregar Antecedente"
  2. Completa: fecha, descripción, tratamiento, veterinario
  3. Guarda

### Editar Mascota
- En la página de detalles, haz clic en "✏️ Editar"
- Modifica los campos necesarios
- Guarda los cambios

### Eliminar Mascota
- En la página de detalles, haz clic en "🗑️ Eliminar"
- Confirma la eliminación
- **Advertencia:** Esta acción no se puede deshacer

## 4. Realizar Diagnóstico (Función Principal)

### Crear Nuevo Diagnóstico
1. Ve a "Diagnósticos" → "➕ Nuevo Diagnóstico"
   - O desde una mascota: botón "🩺 Nuevo Diagnóstico"

2. **Seleccionar Mascota**
   - Elige la mascota a diagnosticar del desplegable

3. **Ingresar Dolencias/Síntomas**
   - Agrega al menos un síntoma
   - Para cada síntoma:
     - **Síntoma:** Ej. "Fiebre alta", "Vómitos", "Tos"
     - **Intensidad:** Leve, Moderado o Grave
     - **Duración:** Ej. "2 días", "1 semana"
     - **Descripción:** Detalles adicionales
   - Haz clic en "➕ Agregar Síntoma" para más síntomas

4. **Signos Vitales** (Opcional pero recomendado)
   - Temperatura: Ej. 39.5°C
   - Frecuencia Cardíaca: Ej. 90 lpm
   - Frecuencia Respiratoria: Ej. 25 rpm
   - Presión Arterial: Ej. "120/80"

5. **Observaciones** (Opcional)
   - Cualquier información adicional relevante

6. Haz clic en "🩺 Generar Diagnóstico Predictivo"

### El Sistema Predecirá Automáticamente:

La API analiza los síntomas ingresados y genera:

- **Enfermedad Probable:** Basada en los síntomas
- **Probabilidad:** Porcentaje de certeza (0-95%)
- **Nivel de Urgencia:**
  - 🟢 **Bajo:** Observación durante 48 horas
  - 🟡 **Medio:** Consulta en próximos días
  - 🟠 **Alto:** Consulta dentro de 24 horas
  - 🔴 **Crítico:** Urgencia inmediata
- **Recomendaciones Automáticas:** Según el nivel
- **Tratamiento Sugerido:** Tratamiento recomendado

### Ejemplos de Predicciones:

**Ejemplo 1:**
- Síntomas: "Fiebre alta" (Grave)
- Resultado: "Infección viral o bacteriana" - 85% - Nivel Alto
- Recomendaciones: Consultar veterinario en 24h, antibióticos

**Ejemplo 2:**
- Síntomas: "Convulsiones" (Grave)
- Resultado: "Epilepsia o intoxicación" - 90% - Nivel Crítico
- Recomendaciones: Acudir INMEDIATAMENTE a urgencias

**Ejemplo 3:**
- Síntomas: "Pérdida de apetito" (Leve)
- Resultado: "Estrés o enfermedad subyacente" - 50% - Nivel Bajo
- Recomendaciones: Observar 48 horas, mantener rutina

## 5. Gestionar Diagnósticos

### Ver Diagnósticos
- Ve a "Diagnósticos" en el menú
- Tabla con todos los diagnósticos
- Información mostrada:
  - Mascota
  - Diagnóstico predictivo
  - Probabilidad
  - Nivel (con colores)
  - Estado
  - Fecha

### Detalles del Diagnóstico
- Haz clic en "Ver" en cualquier diagnóstico
- Información completa:
  - Diagnóstico predictivo destacado
  - Síntomas reportados
  - Signos vitales
  - Recomendaciones
  - Tratamiento sugerido

### Cambiar Estado
- En la página de detalles
- Selecciona el nuevo estado:
  - Pendiente
  - En revisión
  - Completado
- Se guarda automáticamente

### Agregar Evaluaciones Médicas
1. En el diagnóstico, haz clic en "➕ Agregar Evaluación"
2. Completa:
   - **Tipo:** Radiografía, Ecografía, Análisis de sangre, Cirugía, Otro
   - **Fecha:** Fecha de la evaluación
   - **Descripción:** Qué se realizó
   - **Resultado:** Resultado obtenido
   - **Archivo:** Sube imagen (radiografía) o PDF
3. Guarda

### Ejemplos de Evaluaciones:
- Radiografía de tórax mostrando neumonía
- Ecografía abdominal
- Análisis de sangre completo
- Fotos de intervención quirúrgica
- Biopsia

## 6. Base de Conocimiento del Sistema de Predicción

El sistema reconoce y predice basándose en estos síntomas:

| Síntoma | Diagnóstico | Probabilidad Base | Nivel |
|---------|------------|-------------------|-------|
| Fiebre alta | Infección viral/bacteriana | 75% | Alto |
| Vómitos | Gastroenteritis | 70% | Medio |
| Diarrea | Trastorno digestivo | 65% | Medio |
| Tos | Infección respiratoria | 60% | Medio |
| Cojera | Lesión musculoesquelética | 80% | Alto |
| Pérdida apetito | Estrés/enfermedad | 50% | Bajo |
| Letargo | Anemia/infección | 60% | Medio |
| Picazón | Alergia/parásitos | 70% | Medio |
| Dificultad respiratoria | Problema cardíaco/pulmonar | 85% | Crítico |
| Convulsiones | Epilepsia/intoxicación | 90% | Crítico |
| Sangrado | Trauma/coagulación | 85% | Crítico |
| Hinchazón abdominal | Torsión gástrica | 80% | Alto |

**Notas:**
- La probabilidad se ajusta según la intensidad (Grave +10%, Leve -10%)
- El sistema puede combinar múltiples síntomas
- Los síntomas no reconocidos generan recomendación de evaluación detallada

## 7. Dashboard - Resumen

El Dashboard muestra:
- **Total de Mascotas Registradas**
- **Total de Diagnósticos Realizados**
- **Diagnósticos Pendientes** (⏳)
- **Casos Críticos** (⚠️)
- Últimas 5 mascotas registradas
- Últimos 5 diagnósticos realizados

## 8. Cerrar Sesión

- Haz clic en "Cerrar Sesión" en el menú
- Serás redirigido al login

## Consejos de Uso

### Para Diagnósticos Precisos:
1. Sé específico con los síntomas (usa palabras clave como "fiebre", "vómitos", "tos")
2. Indica correctamente la intensidad
3. Registra todos los signos vitales disponibles
4. Agrega observaciones detalladas

### Para Mejor Organización:
1. Registra vacunas inmediatamente después de aplicarlas
2. Mantén actualizados los antecedentes médicos
3. Sube imágenes relevantes (radiografías, análisis)
4. Cambia el estado de diagnósticos según avancen

### Seguridad:
- La sesión expira después de 24 horas de inactividad
- Siempre cierra sesión al terminar
- No compartas las credenciales

## Flujo de Trabajo Recomendado

1. **Primera visita de mascota:**
   - Registrar mascota completa
   - Ingresar historial de vacunas
   - Agregar antecedentes médicos conocidos

2. **Consulta veterinaria:**
   - Crear nuevo diagnóstico
   - Ingresar síntomas observados
   - Registrar signos vitales
   - Revisar predicción automática
   - Agregar observaciones del veterinario

3. **Estudios adicionales:**
   - Agregar evaluaciones médicas
   - Subir radiografías/análisis
   - Actualizar estado del diagnóstico

4. **Seguimiento:**
   - Cambiar estado a "Completado"
   - Agregar resultado final a antecedentes
   - Programar próxima visita

## Soporte

Para problemas técnicos, consulta el archivo `INSTALACION.md`
