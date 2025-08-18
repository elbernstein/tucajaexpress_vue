<template>
  <div class="promotions-page">
    <div class="aurora-background">
      <div class="aurora-shape shape1"></div>
      <div class="aurora-shape shape2"></div>
    </div>
    <main class="promo-content">
      <section class="promo-header">
        <div class="container text-center">
          <span class="tagline">UNA OPORTUNIDAD ÚNICA</span>
          <h1 class="main-title">La Suerte Gira a tu Favor</h1>
          <p class="main-description">
            Tu lealtad tiene recompensa. Inicia sesión o regístrate para ganar premios exclusivos.
          </p>
        </div>
      </section>

      <!--
        El componente de la ruleta ahora no necesita la prop ':user',
        ya que inyectará el estado directamente desde este componente padre.
      -->
      <PromotionalRoulette 
        :is-active="rouletteSettings.isRouletteActive"
        @requestLogin="showLoginModal = true"
        @logout="handleLogout"
        @openAdminPanel="showAdminPanel = true"
      />
    </main>

    <!-- Modales que ahora son controlados completamente por este componente padre -->
    <LoginModal
      :show="showLoginModal"
      @close="showLoginModal = false"
      @openRegister="openRegisterModal"
      @loggedIn="onLoggedIn"
    />
    <RegisterModal
      :show="showRegisterModal"
      @close="showRegisterModal = false"
      @openLogin="openLoginModal"
      @registered="onRegistered"
    />
    <!-- El Panel de Admin sigue igual -->
    <AdminPanel
      :show="showAdminPanel"
      @close="showAdminPanel = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import apiClient from '@/api/axios';
import PromotionalRoulette from '@/components/PromotionalRoulette.vue';
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';
import AdminPanel from '@/components/AdminPanel.vue';
import Swal from 'sweetalert2';

// --- ESTADO CENTRALIZADO ---
// currentUser es la única fuente de la verdad para el estado de sesión
const currentUser = ref(null);
const rouletteSettings = ref({ isRouletteActive: true });
// Con 'provide', hacemos que 'currentUser' esté disponible para todos los componentes hijos
provide('currentUser', currentUser);
// ----------------------------

// Referencias para controlar la visibilidad de los modales
const showLoginModal = ref(false);
const showRegisterModal = ref(false);
const showAdminPanel = ref(false);

// Sincronización de estado al cargar el componente
onMounted(() => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    currentUser.value = JSON.parse(userInfo);
  }
  fetchSettings();
});

const fetchSettings = async () => {
    try {
        const { data } = await apiClient.get('/api/admin/settings');
        rouletteSettings.value = data;
    } catch (error) {
        console.error("No se pudieron cargar los ajustes de la ruleta:", error);
        rouletteSettings.value.isRouletteActive = false;
    }
};

// Funciones para intercambiar entre modales de login/registro
const openLoginModal = () => { showRegisterModal.value = false; showLoginModal.value = true; };
const openRegisterModal = () => { showLoginModal.value = false; showRegisterModal.value = true; };

// Manejador del evento 'loggedIn' emitido por LoginModal
const onLoggedIn = (userData) => {
  localStorage.setItem('userInfo', JSON.stringify(userData)); // El padre gestiona el localStorage
  currentUser.value = userData; // Actualiza el estado reactivo central
  showLoginModal.value = false; // Cierra el modal de login
  Swal.fire({
    icon: 'success', title: `¡Bienvenido, ${userData.name}!`,
    text: '¡Ya puedes jugar!', timer: 2000, showConfirmButton: false
  });
};

// Manejador del evento 'registered' emitido por RegisterModal
const onRegistered = () => {
  Swal.fire({
    icon: 'success', title: '¡Registro Completo!',
    text: 'Ahora, por favor inicia sesión para continuar.',
    confirmButtonColor: '#ff0000'
  }).then(() => {
    openLoginModal(); // Llevamos al usuario al modal de login después del registro
  });
};

// Manejador del evento 'logout' emitido por PromotionalRoulette
const handleLogout = () => {
    localStorage.removeItem('userInfo');
    currentUser.value = null;
    Swal.fire({
      icon: 'info',
      title: 'Sesión Cerrada',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
};
</script>

<style scoped>
/* Los estilos de este componente estaban bien, no necesitan cambios. */
.promotions-page{background-color:#121212;color:#fff;position:relative;overflow-x:hidden}.aurora-background{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1}.aurora-shape{position:absolute;border-radius:50%;filter:blur(120px);opacity:.15}.shape1{width:300px;height:300px;background-color:red;top:-100px;left:-100px}.shape2{width:250px;height:250px;background-color:#4a0e0e;bottom:-80px;right:-80px}.promo-content{position:relative;z-index:2}.container{max-width:1140px;margin:0 auto;padding:0 1.5rem}.text-center{text-align:center}.promo-header{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:4rem 0}.tagline{color:red;font-weight:700;letter-spacing:1.5px;margin-bottom:1rem}.main-title{font-size:clamp(2.2rem,10vw,3rem);font-weight:800;margin-bottom:1rem;text-shadow:0 0 20px rgba(0,0,0,.5)}.main-description{font-size:clamp(1rem,4vw,1.1rem);color:hsla(0,0%,100%,.8);max-width:650px;margin:0 auto 2rem;line-height:1.7}@media (min-width:768px){.promo-header{min-height:80vh}.main-title{font-size:clamp(3rem,8vw,5rem)}}@media (min-width:992px){.aurora-shape{filter:blur(150px);opacity:.2}.shape1{width:500px;height:500px}.shape2{width:400px;height:400px}}
</style>