<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="show" class="modal-backdrop" @click="close">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="close">&times;</button>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['close']);
const close = () => {
  emit('close');
};
</script>

<style scoped>
/* ESTILOS COMPLETOS Y CORREGIDOS */

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
  padding: 1rem;
}

.modal-content {
  background-color: #1e1e1e;
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid #333;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  width: 100%;
  max-width: 450px; /* Ancho máximo por defecto para móviles */
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

/* Personalización de la barra de scroll (opcional pero recomendado) */
.modal-content::-webkit-scrollbar { width: 8px; }
.modal-content::-webkit-scrollbar-track { background: #2a2a2a; border-radius: 10px; }
.modal-content::-webkit-scrollbar-thumb { background: #555; border-radius: 10px; }
.modal-content::-webkit-scrollbar-thumb:hover { background: #777; }

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  line-height: 1;
  color: #a0a0a0;
  cursor: pointer;
  transition: color 0.3s ease;
  z-index: 10;
}
.modal-close:hover {
  color: #fff;
}

/* Animaciones */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active .modal-content, .modal-fade-leave-active .modal-content { transition: transform 0.3s ease; }
.modal-fade-enter-from .modal-content, .modal-fade-leave-to .modal-content { transform: scale(0.95); }


/* ===== AJUSTE RESPONSIVE PARA DESKTOP ===== */
/* Se activa solo en pantallas de 992px de ancho o más */
@media (min-width: 992px) {
  .modal-content {
    /* Sobrescribe el ancho máximo para hacerlo más grande en desktop */
    max-width: 800px;
  }
}

/* Opcional: Para pantallas extra grandes, puedes añadir otro breakpoint */
@media (min-width: 1200px) {
  .modal-content {
    max-width: 960px;
  }
}
</style>