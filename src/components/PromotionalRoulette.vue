<template>
  <section id="roulette-section" class="roulette-section">
    <div class="container">
      <div class="roulette-layout-wrapper">
        
        <!-- Contenedor de la Ruleta -->
        <div ref="rouletteContainerRef" class="roulette-container animate__animated animate__zoomIn">
          <LuckyWheel
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

        <!-- Botón rectangular -->
        <div v-if="user" class="spin-button-container animate__animated animate__fadeInUp">
          <button @click="startCallback" class="spin-button-rect" :disabled="isLoadingPrize || !isActive">
            <i class="fas fa-play me-2"></i>
            <!-- ESTE ES EL CAMBIO -->
            {{ spinButtonText }}
          </button>
        </div>

        <!-- Panel de acciones -->
        <div class="panel-container animate__animated animate__fadeInRight">
          <div class="panel-header">
            <img src="/images/logo-light.png" alt="Tu Caja Express Logo" class="panel-logo">
          </div>
          <div class="panel-content">
            <div v-if="!user" class="content-body">
              <h3 class="form-title">¡Juega y Gana!</h3>
              <p class="form-subtitle">Debes iniciar sesión para poder girar la ruleta y acceder a premios exclusivos.</p>
              <button @click="$emit('requestLogin')" class="cta-button-form main-action">
                <i class="fas fa-sign-in-alt me-2"></i> Iniciar Sesión o Registrarse
              </button>
            </div>
            <div v-else class="content-body">
              <h3 class="welcome-title">Hola, {{ user.name.split(' ')[0] }}</h3>
              <p class="welcome-subtitle">¡Mucha suerte!</p>
              <div class="prize-display-area">
                  <div v-if="!lastPrize" class="prize-display-placeholder">
                      <i class="fas fa-gift"></i>
                      <span>Gira para descubrir tu premio</span>
                  </div>
                  <div v-else class="last-prize-details animate__animated animate__pulse">
                      <p class="last-prize-title">¡Has ganado!</p>
                      <h4 class="prize-name">{{ lastPrize.name }}</h4>
                      <p class="prize-coupon-label">Usa este cupón al cotizar:</p>
                      <p class="prize-coupon">{{ lastPrize.coupon }}</p>
                  </div>
              </div>
            </div>
          </div>
          <div v-if="user" class="panel-footer">
              <div v-if="user.role === 'admin'" class="admin-actions">
                <button class="admin-button" @click="$emit('openAdminPanel')"><i class="fas fa-cog"></i> Configurar Ruleta</button>
              </div>
              <button @click="$emit('logout')" class="logout-button">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'; // Añadimos 'computed'
import { LuckyWheel } from '@lucky-canvas/vue';
import Swal from 'sweetalert2';
import axios from 'axios';

// --- PROPS Y EMITS ---
const props = defineProps({
  user: { type: Object, default: null },
  isActive: { type: Boolean, default: true }
});
const emit = defineEmits(['requestLogin', 'logout', 'openAdminPanel']);


// --- REFERENCIAS REACTIVAS ---
const myLucky = ref(null);
const rouletteContainerRef = ref(null);
const wheelSize = ref('300px');
const prizes = ref([]);
const isLoadingPrize = ref(false);
const lastPrize = ref(null);


// --- PROPIEDAD COMPUTADA PARA EL TEXTO DEL BOTÓN ---
const spinButtonText = computed(() => {
  if (!props.isActive) return 'RULETA DESACTIVADA';
  if (isLoadingPrize.value) return 'GIRANDO...';
  return 'GIRAR LA RULETA';
});


// --- LÓGICA DE GIRO ---
const startCallback = async () => {
  if (!props.isActive) {
    Swal.fire({ title: '¡No disponible!', text: 'La ruleta está desactivada.', icon: 'info' });
    return;
  }
  if (!props.user || !props.user.token) {
    emit('requestLogin'); // Pedimos al padre que abra el modal
    return;
  }
  lastPrize.value = null;
  isLoadingPrize.value = true;
  try {
    myLucky.value.play();
    const token = props.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data: prizeResult } = await axios.post('http://localhost:5000/api/game/spin', {}, config);
    const prizeIndex = prizes.value.findIndex(p => p.id === prizeResult.id);
    if (prizeIndex === -1) throw new Error('Premio inválido del servidor.');
    setTimeout(() => { myLucky.value.stop(prizeIndex); }, 2500);
  } catch (error) {
    myLucky.value.stop(0);
    isLoadingPrize.value = false;
    Swal.fire({ title: '¡Oops!', text: error.response?.data?.message || 'Ocurrió un error.', icon: 'error' });
  }
};

const endCallback = (prize) => {
    isLoadingPrize.value = false;
    lastPrize.value = prize;
    Swal.fire({
        title: prize.isPrize ? '¡Felicidades!' : '¡Qué lástima!',
        html: `Te ha tocado: <strong>${prize.name}</strong>`,
        icon: prize.isPrize ? 'success' : 'info',
        confirmButtonColor: '#ff0000',
    });
};


// --- CONFIGURACIÓN Y CICLO DE VIDA ---
const updateWheelSize = () => { if (rouletteContainerRef.value) wheelSize.value = `${rouletteContainerRef.value.offsetWidth}px`; };
const blocks = ref([ { padding: '10px', background: '#1a1a1a' } ]);
const buttons = ref([ { radius: '45%', background: '#000000' }, { radius: '42%', background: '#ffffff' }, { radius: '38%', background: '#1a1a1a' }, { radius: '32%', background: '#fff', imgs: [{ src: '/images/logo-light.png', width: '65%', top: '-50%' }] } ]);
const defaultConfig = ref({ pointer: true });
const defaultStyle = ref({ pointerStyle: { fillStyle: '#ff0000' } });

const fetchPrizes = async () => {
  try {
    const { data: apiData } = await axios.get('http://localhost:5000/api/admin/prizes');
    if (!apiData || apiData.length === 0) { prizes.value = [{ name: 'Sin Premios', coupon: 'N/A' }]; return; }
    const backgroundColors = ['#f5f5f5', '#e0e0e0'];
    prizes.value = apiData.map((item, index) => ({ id: item._id, name: item.name, coupon: item.coupon, isPrize: item.isPrize, background: index % 2 === 0 ? '#f5f5f5' : '#e0e0e0', fonts: [{ text: item.name.replace(' ', '\n'), top: '25%', fontColor: '#1a1a1a', fontSize: '14px', fontWeight: '600' }]}));
  } catch (error) {
    prizes.value = [{ name: 'Error al\nCargar', coupon: 'N/A' }];
  }
};

onMounted(() => {
  updateWheelSize();
  window.addEventListener('resize', updateWheelSize);
  fetchPrizes();
});
onUnmounted(() => {
  window.removeEventListener('resize', updateWheelSize);
});
</script>

<style scoped>
/* LOS ESTILOS COMPLETOS (Y CORRECTOS) VAN AQUÍ */
.roulette-section{padding:4rem 0;background-color:#f1f1f1}.container{max-width:1140px;margin:0 auto;padding:0 1rem}.roulette-layout-wrapper{display:flex;flex-direction:column;align-items:center;gap:1.5rem}.roulette-container{width:100%;max-width:450px}.spin-button-container{width:100%;max-width:450px;text-align:center}.spin-button-rect{width:100%;padding:1rem 1.5rem;font-size:1.2rem;font-weight:700;color:#fff;background-color:#ff0000;border:none;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .3s ease;box-shadow:0 4px 15px rgba(255,0,0,.3)}.spin-button-rect:hover:not(:disabled){background-color:#d60a08;transform:translateY(-3px);box-shadow:0 6px 20px rgba(255,0,0,.4)}.spin-button-rect:disabled{background-color:#555;box-shadow:none;cursor:not-allowed}.panel-container{width:100%;max-width:450px;background-color:#fff;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.1);color:#333;padding:0;overflow:hidden;display:flex;flex-direction:column}.panel-header{background:#fff;padding:1rem;text-align:center;border-bottom:1px solid #eee}.panel-logo{height:35px}.panel-content{background-color:#1a1a1a;color:#fff;padding:2.5rem 1.5rem;text-align:center;flex-grow:1}.content-body{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%}.form-title,.welcome-title{color:#fff;font-size:1.6rem;font-weight:700;margin-bottom:.5rem}.form-subtitle,.welcome-subtitle{color:#a0a0a0;margin-bottom:2rem}.cta-button-form.main-action{width:100%;padding:14px;background-color:#ff0000;color:#fff;border:none;border-radius:8px;font-size:1rem;font-weight:600;display:flex;align-items:center;justify-content:center;margin-top:auto}.prize-display-area{min-height:120px;display:flex;align-items:center;justify-content:center;width:100%}.prize-display-placeholder{width:100%;background-color:#2a2a2a;border:2px dashed #444;border-radius:8px;padding:1.5rem 1rem;color:#888;font-weight:500;display:flex;flex-direction:column;align-items:center;justify-content:center}.prize-display-placeholder i{font-size:2rem;margin-bottom:.5rem}.last-prize-details{color:#fff}.last-prize-title{font-size:1rem;color:#a0a0a0;margin:0}.prize-name{font-size:1.8rem;font-weight:700;color:#ff0000;margin:.25rem 0}.prize-coupon-label{font-size:.9rem;color:#a0a0a0;margin-top:1rem;margin-bottom:.25rem}.prize-coupon{background-color:#000;border:2px dashed #ff0000;padding:.5rem 1rem;font-weight:700;font-size:1.2rem;letter-spacing:1px;border-radius:6px;display:inline-block}.panel-footer{background-color:#fff;border-top:1px solid #eee;padding:1rem 1.5rem}.admin-button,.logout-button{width:100%;padding:12px;border-radius:8px;font-weight:600;border:2px solid;margin:0;display:flex;align-items:center;justify-content:center;gap:.5rem}.admin-button{background-color:#1a1a1a;color:#fff;border-color:#1a1a1a;margin-bottom:.5rem}.logout-button{background:transparent;color:#555;border-color:#ddd}.me-2{margin-right:.5rem}@media (min-width:992px){.roulette-layout-wrapper{flex-direction:row;align-items:stretch;gap:4rem}.spin-button-container{order:-1}.roulette-container,.spin-button-container{display:flex;flex-direction:column;justify-content:center;gap:1.5rem}.panel-container{max-width:400px}}
</style>