<template>
  <div class="rate-us-section">
    <!-- Fondo animado -->
    <div class="animated-background">
      <div class="star" v-for="(star, index) in stars" :key="index" :style="star.style"></div>
    </div>

    <!-- Contenido principal -->
    <div class="rate-us-container">
      <div class="rate-us-card">
        <!-- Encabezado -->
        <div class="rate-us-header">
          <div class="rate-us-image">
            <img src="/images/logo-light.png" alt="Calificación" class="animated-image">
          </div>
          <h1 class="rate-us-title">¡Califícanos!</h1>
          <p class="rate-us-subtitle">Tu opinión nos ayuda a mejorar</p>
        </div>

        <!-- Contenido -->
        <div class="rate-us-content">
            <div class="rating-stars">
            <i class="fas fa-star" v-for="i in 5" :key="i"></i>
          </div>
          <div class="rate-us-text">
            <p>¿Cómo calificarías tu experiencia con nuestro servicio?</p>
            <p>Haz clic en el botón para dejarnos tu valoración en Google</p>
          </div>
        </div>

        <!-- Botón de acción -->
        <a 
          href="https://search.google.com/local/writereview?placeid=TU_PLACE_ID_DE_GOOGLE" 
          target="_blank"
          class="rate-us-button"
          @mouseenter="startButtonAnimation"
          @mouseleave="stopButtonAnimation"
        >
          <span class="button-text">Dejar mi calificación</span>
          <span class="button-icon">
            <i class="fab fa-google"></i>
          </span>
          <span class="pulse-effect" :class="{active: isButtonPulsing}"></span>
        </a>

        <!-- Mensaje de agradecimiento (aparece después de calificar) -->
        <transition name="fade">
          <div class="thank-you-message" v-if="showThankYou">
            <i class="fas fa-heart"></i>
            <p>¡Gracias por tu calificación!</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'RateUsView',
  setup() {
    const stars = ref([])
    const isButtonPulsing = ref(false)
    const showThankYou = ref(false)

    // Crear estrellas animadas para el fondo
    const createStars = () => {
      const newStars = []
      for (let i = 0; i < 20; i++) {
        newStars.push({
          style: {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.3
          }
        })
      }
      stars.value = newStars
    }

    // Animación del botón
    const startButtonAnimation = () => {
      isButtonPulsing.value = true
    }

    const stopButtonAnimation = () => {
      isButtonPulsing.value = false
    }

    // Simular que el usuario ha calificado (para demostración)
    const simulateRating = () => {
      showThankYou.value = true
      setTimeout(() => {
        showThankYou.value = false
      }, 3000)
    }

    onMounted(() => {
      createStars()
    })

    return {
      stars,
      isButtonPulsing,
      showThankYou,
      startButtonAnimation,
      stopButtonAnimation,
      simulateRating
    }
  }
}
</script>

<style scoped>
/* Variables de diseño */
:root {
  --primary: #4285F4;
  --primary-light: #8AB4F8;
  --secondary: #34A853;
  --accent: #EA4335;
  --yellow: #FBBC05;
  --dark: #202124;
  --light: #f8f9fa;
  --gray: #5f6368;
  --gray-light: #e8eaed;
}

/* Estilos base */
.rate-us-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e8f0fe 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

/* Fondo animado con estrellas */
.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.star {
  position: absolute;
  background-color: var(--yellow);
  border-radius: 50%;
  animation: twinkle 3s infinite ease-in-out;
  filter: drop-shadow(0 0 5px rgba(251, 188, 5, 0.7));
}

@keyframes twinkle {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

/* Contenedor principal */
.rate-us-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* Tarjeta de calificación */
.rate-us-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 2.5rem;
  text-align: center;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.rate-us-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

/* Encabezado */
.rate-us-header {
  margin-bottom: 2rem;
}

.rating-stars {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.rating-stars i {
  color: var(--yellow);
  font-size: 2rem;
  animation: bounce 1s infinite alternate;
}

.rating-stars i:nth-child(1) { animation-delay: 0.1s; }
.rating-stars i:nth-child(2) { animation-delay: 0.2s; }
.rating-stars i:nth-child(3) { animation-delay: 0.3s; }
.rating-stars i:nth-child(4) { animation-delay: 0.4s; }
.rating-stars i:nth-child(5) { animation-delay: 0.5s; }

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-10px); }
}

.rate-us-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.rate-us-subtitle {
  font-size: 1.2rem;
  color: var(--gray);
  margin-bottom: 0;
}

/* Contenido */
.rate-us-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.rate-us-image {
  width: 200px;
  height: 200px;
  margin: 0 auto 1.5rem auto; /* ✅ Centrado horizontal + espaciado inferior */
  display: flex;
  align-items: center;
  justify-content: center;
}


.animated-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.rate-us-text {
  max-width: 500px;
  margin: 0 auto;
}

.rate-us-text p {
  font-size: 1.1rem;
  color: var(--gray);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.rate-us-text p:first-child {
  font-weight: 500;
  color: var(--dark);
  font-size: 1.2rem;
}

/* Botón de calificación */
.rate-us-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), #000000);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 5px 15px rgba(66, 133, 244, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
  z-index: 1;
}

.rate-us-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(66, 133, 244, 0.6);
}

.rate-us-button:active {
  transform: translateY(1px);
}

.button-text {
  margin-right: 0.8rem;
}

.button-icon {
  font-size: 1.3rem;
}

.pulse-effect {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  top: 0;
  left: 0;
  transform: scale(0);
  opacity: 0;
  z-index: -1;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.pulse-effect.active {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.7; }
  70% { transform: scale(1.3); opacity: 0; }
  100% { transform: scale(1.3); opacity: 0; }
}

/* Mensaje de agradecimiento */
.thank-you-message {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.thank-you-message i {
  color: var(--accent);
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: heartBeat 1s ease;
}

.thank-you-message p {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--dark);
}

@keyframes heartBeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .rate-us-card {
    padding: 1.5rem;
  }
  
  .rate-us-title {
    font-size: 2rem;
  }
  
  .rate-us-subtitle {
    font-size: 1rem;
  }
  
  .rate-us-image {
    width: 150px;
    height: 150px;
  }
  
  .rate-us-text p {
    font-size: 1rem;
  }
  
  .rate-us-text p:first-child {
    font-size: 1.1rem;
  }
  
  .rate-us-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .rate-us-section {
    padding: 1rem;
  }
  
  .rate-us-card {
    padding: 1.5rem 1rem;
  }
  
  .rate-us-title {
    font-size: 1.8rem;
  }
  
  .rating-stars i {
    font-size: 1.5rem;
  }
  
  .rate-us-image {
    width: 120px;
    height: 120px;
  }
  
  .thank-you-message p {
    font-size: 1.2rem;
  }
  
  .thank-you-message i {
    font-size: 2.5rem;
  }
}
</style>