<template>
  <button
    v-if="isVisible"
    @click="scrollToTop"
    class="scroll-to-top-box"
    aria-label="Volver al inicio"
  >
    <img 
      src="/images/boxicon2.svg" 
      alt="Subir al inicio" 
      class="box-icon"
    />
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.scroll-to-top-box {
  position: fixed;
  bottom: 100px;
  width: 50px;
  height: 50px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 0;
  /* Animación de flotación */
  animation: float 2s ease-in-out infinite;
  /* Posición por defecto (escritorio - izquierda) */
  left: 32px;
  right: auto;
}

.box-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
}

/* Animación de flotación */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
}

/* Efecto hover más expresivo */
.scroll-to-top-box:hover .box-icon {
  animation: pulse 0.5s ease;
  filter: drop-shadow(0 0 8px rgba(74, 0, 224, 0.6));
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Versión móvil - derecha */
@media (max-width: 768px) {
  .scroll-to-top-box {
    left: auto;
    right: 20px;
    bottom: 90px;
    /* Animación diferente para móvil */
    animation: floatMobile 2s ease-in-out infinite;
  }
  
  @keyframes floatMobile {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(-3deg);
    }
  }
}

/* Efecto especial al hacer clic */
.scroll-to-top-box:active .box-icon {
  animation: clickEffect 0.4s ease;
}

@keyframes clickEffect {
  0% { transform: scale(1); }
  50% { transform: scale(0.8); }
  100% { transform: scale(1); }
}
</style>