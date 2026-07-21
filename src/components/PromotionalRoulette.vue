<template>
  <section id="roulette-section" class="roulette-section">
    <div class="container">
      <div class="roulette-layout-wrapper">
        
        <!-- Contenedor de la Ruleta -->
        <div ref="rouletteContainerRef" class="roulette-container animate__animated animate__zoomIn">
          
          <!-- Se muestra un placeholder mientras se cargan los premios -->
          <div v-if="!prizesReady" class="loading-placeholder">
            <p>Cargando ruleta...</p>
          </div>
          
          <!-- La ruleta real solo se renderiza cuando los premios están listos -->
          <LuckyWheel
            v-if="prizesReady"
            ref="myLucky"
            :width="wheelSize"
            :height="wheelSize"
            :prizes="prizes"
            :blocks="blocks"
            :buttons="buttons"
            :default-config="defaultConfig"
            :default-style="defaultStyle"
            @end="endCallback"
          />
        </div>

        <!-- Botón rectangular que aparece debajo si el usuario está logueado -->
        <div v-if="user" class="spin-button-container animate__animated animate__fadeInUp">
          <button @click="startCallback" class="spin-button-rect" :disabled="isLoadingPrize || !isActive || (user && user.hasSpun)">
            <i class="fas fa-play me-2"></i>
            {{ buttonText }}
          </button>
        </div>

        <!-- Panel de acciones a la derecha -->
        <div class="panel-container animate__animated animate__fadeInRight">

          <!-- Encabezado del Panel -->
          <div class="panel-header">
            <img src="/images/logo-light.png" alt="Tu Caja Express Logo" class="panel-logo">
          </div>

          <!-- Contenido Principal (Fondo oscuro) -->
          <div class="panel-content">
            <!-- VISTA PARA USUARIOS DESCONECTADOS -->
            <div v-if="!user" class="content-body">
              <h3 class="form-title">¡Juega y Gana!</h3>
              <p class="form-subtitle">Debes iniciar sesión para poder girar la ruleta y acceder a premios exclusivos.</p>
              <button @click="$emit('requestLogin')" class="cta-button-form main-action">
                <i class="fas fa-sign-in-alt me-2"></i> Iniciar Sesión o Registrarse
              </button>
            </div>

            <!-- VISTA PARA USUARIOS CONECTADOS -->
            <div v-else class="content-body">
              <h3 class="welcome-title">Hola, {{ user.name ? user.name.split(' ')[0] : 'Usuario' }}</h3>
              
              <!-- Muestra el mensaje para jugar si aún no lo ha hecho -->
              <div v-if="!user.hasSpun">
                <p class="welcome-subtitle">¡Tienes 1 giro disponible!</p>
                <div class="prize-display-placeholder">
                  <i class="fas fa-gift"></i>
                  <span>Gira para descubrir tu premio</span>
                </div>
              </div>
              
              <!-- Muestra el premio ganado si ya jugó -->
              <div v-else>
                 <p class="welcome-subtitle">¡Gracias por participar!</p>
                 <div class="last-prize-details">
                   <p class="last-prize-title">Tu premio fue:</p>
                   <h4 class="prize-name">{{ user.prizeWon.name }}</h4>
                   <p v-if="user.prizeWon.coupon !== 'N/A'" class="prize-coupon-label">Usa este cupón al cotizar:</p>
                   <p v-if="user.prizeWon.coupon !== 'N/A'" class="prize-coupon">{{ user.prizeWon.coupon }}</p>
                 </div>
              </div>
            </div>
          </div>
          
          <!-- Pie del Panel (Fondo claro, para usuarios conectados) -->
          <div v-if="user" class="panel-footer">
              <!-- El botón de admin se elimina porque la gestión es por JSON -->
              <button @click="handleLogout" class="logout-button">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { LuckyWheel } from '@lucky-canvas/vue';
import Swal from 'sweetalert2';
import axios from 'axios';

// --- Estado General ---
const props = defineProps({ isActive: { type: Boolean, default: true } });
const emit = defineEmits(['requestLogin']);
const user = ref(null);
const prizes = ref([]);
const isLoadingPrize = ref(false);
const prizesReady = ref(false);

// --- Carga de Premios ---
const fetchPrizes = async () => {
  try {
    const response = await fetch('/config.json');
    const configData = await response.json();
    
    // Simplemente mapeamos directamente, sin transformaciones de texto.
    prizes.value = configData.prizes.map(item => ({
      ...item,
      background: '#fff',
      fonts: [{ text: item.name, top: '25%' }]
    }));

  } catch (error) {
    console.error("Error al procesar config.json:", error);
    prizes.value = [{ name: 'Error', fonts: [{ text: 'Error' }] }];
  } finally {
    prizesReady.value = true;
  }
};

// --- El resto del script es la misma lógica funcional que ya teníamos ---
// (No es necesario volver a pegarla, ya que esta parte ya funcionaba bien).

// --- Lógica del Juego ---
const buttonText = computed(() => { if(!props.isActive) return 'RULETA DESACTIVADA'; if(user.value && user.value.hasSpun) return 'YA HAS JUGADO'; if(isLoadingPrize.value) return 'GIRANDO...'; return 'GIRAR LA RULETA'; });
const startCallback = () => { if(!user.value || (user.value && user.value.hasSpun)) return; isLoadingPrize.value = true; const prizeIndex = Math.floor(Math.random() * prizes.value.length); myLucky.value.play(); setTimeout(() => myLucky.value.stop(prizeIndex), 3000); };
const saveWinner = async (prizeData) => { const formspreeURL = 'https://formspree.io/f/mbladroe'; const winnerData = { nombreUsuario: user.value.name, emailUsuario: user.value.email, premioGanado: prizeData.name, cuponObtenido: prizeData.coupon, fecha: new Date().toLocaleString('es-ES') }; try { await axios.post(formspreeURL, winnerData); } catch (e) { console.error(e); }};
const endCallback = (prize) => {
    isLoadingPrize.value = false;
    Swal.fire({ title: prize.isPrize ? '¡Felicidades!' : '¡Qué lástima!', html: `Te ha tocado: <strong>${prize.name}</strong>`, icon: prize.isPrize ? 'success' : 'info' });
    if (user.value) {
        user.value.hasSpun = true; user.value.prizeWon = { name: prize.name, coupon: prize.coupon };
        const storedUsers = JSON.parse(localStorage.getItem('rouletteUsers')) || [];
        const userIndex = storedUsers.findIndex(u => u.email === user.value.email);
        if (userIndex !== -1) { storedUsers[userIndex] = user.value; localStorage.setItem('rouletteUsers', JSON.stringify(storedUsers)); }
        localStorage.setItem('currentUser', JSON.stringify(user.value));
        if (prize.isPrize) { saveWinner(prize); }
    }
};
const handleLogout = () => { localStorage.removeItem('currentUser'); window.location.reload(); };

// --- Configuración y Ciclo de Vida ---
onMounted(() => { const currentUserInfo = localStorage.getItem('currentUser'); if(currentUserInfo) { user.value = JSON.parse(currentUserInfo); } fetchPrizes(); updateWheelSize(); window.addEventListener('resize', updateWheelSize); });
onUnmounted(() => { window.removeEventListener('resize', updateWheelSize); });
const myLucky = ref(null); const rouletteContainerRef = ref(null); const wheelSize = ref('300px');
const updateWheelSize = () => { if (rouletteContainerRef.value) wheelSize.value = `${rouletteContainerRef.value.offsetWidth}px`; };
const blocks = ref([ { padding: '10px', background: '#1a1a1a', imgs: [{ src: '/images/ruleta-bg.png', width: '100%', rotate: true }] } ]);
const buttons = ref([ { radius: '35%', background: '#1a1a1a' }, { radius: '32%', background: '#fff' }, { radius: '28%', imgs: [{ src: '/images/logo-light.png', width: '130%', top: '-50%' }] } ]);
const defaultConfig = ref({ pointer: true });
const defaultStyle = ref({ fontColor: '#1a1a1a', fontSize: '14px', fontWeight: 700, pointerStyle: { fillStyle: '#ff0000' } });
</script>


<style scoped>
/* Los estilos ya están correctos, por lo que los pego directamente. */
.roulette-section{padding:4rem 0;background-color:#f1f1f1}.container{max-width:1140px;margin:0 auto;padding:0 1rem}.roulette-layout-wrapper{display:flex;flex-direction:column;align-items:center;gap:1.5rem}.roulette-container{width:100%;max-width:450px}.spin-button-container{width:100%;max-width:450px;text-align:center}.spin-button-rect{width:100%;padding:1rem 1.5rem;font-size:1.2rem;font-weight:700;color:#fff;background-color:#ff0000;border:none;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .3s ease;box-shadow:0 4px 15px rgba(255,0,0,.3)}.spin-button-rect:hover:not(:disabled){background-color:#d60a08;transform:translateY(-3px);box-shadow:0 6px 20px rgba(255,0,0,.4)}.spin-button-rect:disabled{background-color:#555;box-shadow:none;cursor:not-allowed;color:#aaa}.panel-container{width:100%;max-width:450px;background-color:#fff;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.1);color:#333;padding:0;overflow:hidden;display:flex;flex-direction:column}.panel-header{background:#fff;padding:1rem;text-align:center;border-bottom:1px solid #eee}.panel-logo{height:35px}.panel-content{background-color:#1a1a1a;color:#fff;padding:2.5rem 1.5rem;text-align:center;flex-grow:1}.content-body{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%}.form-title,.welcome-title{color:#fff;font-size:1.6rem;font-weight:700;margin-bottom:.5rem}.form-subtitle,.welcome-subtitle{color:#a0a0a0;margin-bottom:2rem}.cta-button-form.main-action{width:100%;padding:14px;background-color:#ff0000;color:#fff;border:none;border-radius:8px;font-size:1rem;font-weight:600;display:flex;align-items:center;justify-content:center;margin-top:auto}.prize-display-area{min-height:120px;display:flex;align-items:center;justify-content:center;width:100%}.prize-display-placeholder{width:100%;background-color:#2a2a2a;border:2px dashed #444;border-radius:8px;padding:1.5rem 1rem;color:#888;font-weight:500;display:flex;flex-direction:column;align-items:center;justify-content:center}.prize-display-placeholder i{font-size:2rem;margin-bottom:.5rem}.last-prize-details{color:#fff}.last-prize-title{font-size:1rem;color:#a0a0a0;margin:0}.prize-name{font-size:1.8rem;font-weight:700;color:#ff0000;margin:.25rem 0}.prize-coupon-label{font-size:.9rem;color:#a0a0a0;margin-top:1rem;margin-bottom:.25rem}.prize-coupon{background-color:#000;border:2px dashed #ff0000;padding:.5rem 1rem;font-weight:700;font-size:1.2rem;letter-spacing:1px;border-radius:6px;display:inline-block}.panel-footer{background-color:#fff;border-top:1px solid #eee;padding:1rem 1.5rem}.admin-button,.logout-button{width:100%;padding:12px;border-radius:8px;font-weight:600;border:2px solid;margin:0;display:flex;align-items:center;justify-content:center;gap:.5rem}.admin-button{background-color:#1a1a1a;color:#fff;border-color:#1a1a1a;margin-bottom:.5rem}.logout-button{background:transparent;color:#555;border-color:#ddd}.me-2{margin-right:.5rem}@media (min-width:992px){.roulette-layout-wrapper{flex-direction:row;align-items:stretch;gap:4rem}.spin-button-container{order:-1}.roulette-container,.spin-button-container{display:flex;flex-direction:column;justify-content:center;gap:1.5rem}.panel-container{max-width:400px}}
</style>