<template>
  <div class="receipt-form-page">
    <div class="container">
      <div class="header">
        <div class="logo-container">
          <img src="/images/logo-light.png" alt="Tu Caja Express" class="company-logo">
        </div>
        <h1><i class="fas fa-receipt"></i> RECIBO DE DEPÓSITO</h1>
        <div class="subtitle">Caja Vacía - Tu Caja Express</div>
      </div>
      
      <div class="form-container">
        <div id="deposito-form">
          <div class="form-group">
            <label for="fecha"><i class="fas fa-calendar-alt"></i> Fecha:</label>
            <input type="date" id="fecha" name="fecha" required>
          </div>

          <div class="form-group">
            <label for="cliente_nombre"><i class="fas fa-user"></i> Cliente (Nombre):</label>
            <input type="text" id="cliente_nombre" name="cliente_nombre" required placeholder="Nombre completo del cliente">
          </div>

          <div class="form-group">
            <label for="telefono"><i class="fas fa-phone"></i> Teléfono:</label>
            <input type="tel" id="telefono" name="telefono" placeholder="Número de teléfono">
          </div>

          <div class="form-group">
            <label><i class="fas fa-box"></i> Caja (Tamaño):</label>
            <div class="radio-options">
              <div><input type="radio" id="caja1" name="caja_tamano" value="16x16x16"><label for="caja1">16x16x16</label></div>
              <div><input type="radio" id="caja2" name="caja_tamano" value="18x18x18"><label for="caja2">18x18x18</label></div>
              <div><input type="radio" id="caja3" name="caja_tamano" value="20x20x20"><label for="caja3">20x20x20</label></div>
              <div><input type="radio" id="caja4" name="caja_tamano" value="20x20x28"><label for="caja4">20x20x28</label></div>
              <div><input type="radio" id="caja5" name="caja_tamano" value="26x24x24"><label for="caja5">26x24x24</label></div>
              <div><input type="radio" id="caja6" name="caja_tamano" value="30x26x24"><label for="caja6">30x26x24</label></div>
              <div><input type="radio" id="caja7" name="caja_tamano" value="34x26x28"><label for="caja7">34x26x28</label></div>
            </div>
          </div>

          <div class="form-group">
            <label for="monto_deposito"><i class="fas fa-dollar-sign"></i> Monto del Depósito:</label>
            <input type="number" id="monto_deposito" name="monto_deposito" step="0.01" min="0" placeholder="0.00">
          </div>

          <div class="form-group">
            <label for="saldo_pendiente"><i class="fas fa-clock"></i> Saldo Pendiente (si aplica):</label>
            <input type="number" id="saldo_pendiente" name="saldo_pendiente" step="0.01" min="0" placeholder="0.00">
          </div>

          <div class="form-group">
            <label><i class="fas fa-credit-card"></i> Método de Pago:</label>
            <div class="radio-options">
              <div><input type="radio" id="pago_efectivo" name="metodo_pago" value="Efectivo"><label for="pago_efectivo">Efectivo</label></div>
              <div><input type="radio" id="pago_zelle" name="metodo_pago" value="Zelle"><label for="pago_zelle">Zelle</label></div>
              <div><input type="radio" id="pago_bancario" name="metodo_pago" value="Deposito Bancario"><label for="pago_bancario">Depósito Bancario</label></div>
              <div style="display: flex; align-items: center; width: 100%;">
                <input type="radio" id="pago_otro" name="metodo_pago" value="Otro">
                <label for="pago_otro">Otro:</label>
                <input type="text" id="otro_texto" name="metodo_pago_otro" disabled placeholder="Especifique método">
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="observaciones"><i class="fas fa-comment-alt"></i> Observaciones:</label>
            <textarea id="observaciones" name="observaciones" rows="4" placeholder="Observaciones adicionales..."></textarea>
          </div>

          <button type="button" id="enviarBtn">
            <i class="fas fa-paper-plane"></i> Generar Recibo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'FormularioRecibo',
  setup() {
    onMounted(() => {
      // Script para el campo "Otro"
      const metodoPagoRadios = document.querySelectorAll('input[name="metodo_pago"]');
      const otroTextoInput = document.getElementById('otro_texto');
      const otroRadio = document.getElementById('pago_otro');

      metodoPagoRadios.forEach(radio => {
        radio.addEventListener('change', () => {
          otroTextoInput.disabled = !otroRadio.checked;
          if (otroRadio.checked) {
            otroTextoInput.focus();
          } else {
            otroTextoInput.value = '';
          }
        });
      });

      // Script para el envío con fetch
      const botonEnviar = document.getElementById('enviarBtn');

      botonEnviar.addEventListener('click', () => {
        // Agregar estado de carga
        botonEnviar.classList.add('loading');
        botonEnviar.innerHTML = '<i class="fas fa-spinner"></i> Enviando...';

        // Recolectar los datos del formulario
        const tamanoCajaSeleccionado = document.querySelector('input[name="caja_tamano"]:checked');
        const metodoPagoSeleccionado = document.querySelector('input[name="metodo_pago"]:checked');

        let metodoPagoFinal = metodoPagoSeleccionado ? metodoPagoSeleccionado.value : '';
        if (metodoPagoFinal === 'Otro') {
          metodoPagoFinal = otroTextoInput.value;
        }
        
        const datos = {
          fecha: document.getElementById('fecha').value,
          cliente_nombre: document.getElementById('cliente_nombre').value,
          telefono: document.getElementById('telefono').value,
          caja_tamano: tamanoCajaSeleccionado ? tamanoCajaSeleccionado.value : '',
          monto_deposito: document.getElementById('monto_deposito').value,
          saldo_pendiente: document.getElementById('saldo_pendiente').value,
          metodo_pago: metodoPagoFinal,
          observaciones: document.getElementById('observaciones').value,
        };

        // Enviar los datos usando fetch
        const urlApi = 'https://sistematce.com/api/recolactar';

        fetch(urlApi, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datos)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Restaurar botón
          botonEnviar.classList.remove('loading');
          botonEnviar.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
          
          setTimeout(() => {
            alert(data.message || 'Datos enviados con éxito');
            window.location.reload();
          }, 1000);
        })
        .catch(error => {
          // Restaurar botón en caso de error
          botonEnviar.classList.remove('loading');
          botonEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Generar Recibo';
          
          console.error('Error en la petición fetch:', error);
          alert(`Hubo un problema al enviar los datos: ${error.message}`);
        });
      });

      // Establecer fecha actual por defecto
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('fecha').value = today;
    })
  }
}
</script>

<style scoped>
.receipt-form-page {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #000000 0%, #f30d0a 100%);
  min-height: 100vh;
  padding: 20px;
  color: #333;
}

.container {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  animation: slideUp 0.6s ease-out;
}

.header {
  background: linear-gradient(135deg, #000000 0%, #f30d0a 100%);
  color: white;
  padding: 30px;
  text-align: center;
  position: relative;
  border-radius: 20px 20px 0 0;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.05"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.05"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  border-radius: 20px 20px 0 0;
}

.logo-container {
  position: relative;
  z-index: 1;
  margin: 15px auto;
  background: white;
  border-radius: 15px;
  padding: 15px;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.company-logo {
  height: 50px;
  width: auto;
  display: block;
}

.header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
  color: white;
}

.header .subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  position: relative;
  z-index: 1;
}

.form-container {
  padding: 40px;
}

.form-group {
  margin-bottom: 25px;
  animation: fadeIn 0.6s ease-out;
  animation-fill-mode: both;
}

.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
.form-group:nth-child(3) { animation-delay: 0.3s; }
.form-group:nth-child(4) { animation-delay: 0.4s; }
.form-group:nth-child(5) { animation-delay: 0.5s; }
.form-group:nth-child(6) { animation-delay: 0.6s; }
.form-group:nth-child(7) { animation-delay: 0.7s; }
.form-group:nth-child(8) { animation-delay: 0.8s; }

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
  font-size: 0.95rem;
}

.form-group label i {
  margin-right: 8px;
  color: #f30d0a;
}

input[type="text"],
input[type="date"],
input[type="tel"],
input[type="number"],
textarea {
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  font-family: 'Poppins', sans-serif;
}

input[type="text"]:focus,
input[type="date"]:focus,
input[type="tel"]:focus,
input[type="number"]:focus,
textarea:focus {
  outline: none;
  border-color: #f30d0a;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(243, 13, 10, 0.1);
  transform: translateY(-2px);
}

.radio-group, .checkbox-group {
  margin-top: 10px;
}

.radio-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.radio-options > div {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e1e5e9;
  transition: all 0.3s ease;
  cursor: pointer;
}

.radio-options > div:hover {
  background: #fef2f2;
  border-color: #f30d0a;
  transform: translateY(-2px);
}

.radio-options input[type="radio"] {
  margin-right: 12px;
  transform: scale(1.2);
  accent-color: #f30d0a;
}

.radio-options label {
  margin: 0;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
}

.radio-options > div:has(input:checked) {
  background: #fef2f2;
  border-color: #f30d0a;
  box-shadow: 0 4px 12px rgba(243, 13, 10, 0.2);
}

#otro_texto {
  margin-left: 15px;
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  background: #fff;
  font-family: 'Poppins', sans-serif;
}

#otro_texto:disabled {
  background: #f5f5f5;
  color: #999;
}

button {
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #000000 0%, #f30d0a 100%);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

button:hover::before {
  left: 100%;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(243, 13, 10, 0.3);
}

button:active {
  transform: translateY(-1px);
}

/* Estilos para el estado de carga */
.loading {
  position: relative;
  pointer-events: none;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Responsive Design */
@media (max-width: 768px) {
  .receipt-form-page {
    padding: 10px;
  }

  .container {
    border-radius: 15px;
  }

  .header {
    padding: 25px 20px;
  }

  .header h1 {
    font-size: 1.8rem;
  }

  .header .subtitle {
    font-size: 1rem;
  }

  .form-container {
    padding: 25px 20px;
  }

  .radio-options {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .radio-options > div {
    padding: 12px;
  }

  input[type="text"],
  input[type="date"],
  input[type="tel"],
  input[type="number"],
  textarea {
    padding: 12px 15px;
    font-size: 0.95rem;
  }

  button {
    padding: 15px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.5rem;
  }

  .form-container {
    padding: 20px 15px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .radio-options > div {
    padding: 10px;
  }
}

/* Animaciones */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
