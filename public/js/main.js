// Funciones de utilidad para el frontend

// Confirmación de eliminación
function confirmarEliminacion(mensaje) {
  return confirm(mensaje || '¿Está seguro de que desea eliminar este elemento?');
}

// Toggle de formularios
function toggleForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }
}

// Previsualización de imágenes antes de subir
function previsualizarImagenes(input) {
  if (input.files) {
    const preview = document.getElementById('preview');
    if (!preview) {
      const previewDiv = document.createElement('div');
      previewDiv.id = 'preview';
      previewDiv.style.display = 'grid';
      previewDiv.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
      previewDiv.style.gap = '1rem';
      previewDiv.style.marginTop = '1rem';
      input.parentElement.appendChild(previewDiv);
    }
    
    const previewContainer = document.getElementById('preview');
    previewContainer.innerHTML = '';
    
    Array.from(input.files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.width = '100%';
          img.style.height = '150px';
          img.style.objectFit = 'cover';
          img.style.borderRadius = '0.5rem';
          previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// Agregar event listener para previsualizaciones de imágenes
document.addEventListener('DOMContentLoaded', function() {
  const imageInputs = document.querySelectorAll('input[type="file"][accept*="image"]');
  imageInputs.forEach(input => {
    input.addEventListener('change', function() {
      previsualizarImagenes(this);
    });
  });
  
  // Auto-submit para cambios de estado
  const estadoSelects = document.querySelectorAll('select[name="estado"]');
  estadoSelects.forEach(select => {
    select.addEventListener('change', function() {
      if (confirm('¿Desea cambiar el estado?')) {
        this.form.submit();
      }
    });
  });
});

// Validación de formularios
function validarFormulario(formId) {
  const form = document.getElementById(formId);
  if (!form) return true;
  
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      field.style.borderColor = '#d1d5db';
    }
  });
  
  if (!isValid) {
    alert('Por favor, complete todos los campos obligatorios.');
  }
  
  return isValid;
}

// Formatear fechas
function formatearFecha(fecha) {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${tipo}`;
  notification.textContent = mensaje;
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.padding = '1rem 1.5rem';
  notification.style.borderRadius = '0.5rem';
  notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  notification.style.zIndex = '1000';
  notification.style.animation = 'slideIn 0.3s ease-out';
  
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#06b6d4'
  };
  
  notification.style.backgroundColor = colors[tipo] || colors.info;
  notification.style.color = 'white';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
