<template>
  <div class="interactive-timeline-container">
    <div class="timeline-track">
      <div class="timeline-background"></div>
      <div class="timeline-progress" :style="{ width: progressPercentage + '%' }"></div>
      
      <div class="truck-icon" :style="{ left: progressPercentage + '%' }">
        🚚
      </div>

      <div
        v-for="(stage, index) in definedStages"
        :key="stage.id"
        class="stage-point"
        :style="{ left: (index / (definedStages.length - 1)) * 100 + '%' }"
        :class="{ 'completed': isStageCompleted(stage.keywords) }"
      >
        <div class="stage-label">{{ stage.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Definimos las props que el componente padre le pasará
const props = defineProps({
  history: {
    type: Array,
    required: true
  }
});

// **Etapas Clave del Proceso**
// Aquí definimos las etapas visuales y las palabras clave para identificarlas.
// ¡Este es el paso más importante para mapear tus datos a la visualización!
const definedStages = ref([
  { id: 'inicio', label: 'Inicio', keywords: ['agregado de transito', 'agregado a trailer', 'agregado a cedis'] },
  { id: 'aduana', label: 'Aduana', keywords: ['aduana de destino', 'tramites aduanales', 'revision aduanal'] },
  { id: 'bodega', label: 'En Bodega', keywords: ['en bodega'] },
  { id: 'reparto', label: 'En Reparto', keywords: ['en proceso de entrega', 'en ruta', 'asignada guia'] },
  { id: 'entregado', label: 'Entregado', keywords: ['entregado'] }
]);

// Encuentra el índice de la última etapa alcanzada
const currentStageIndex = computed(() => {
  if (!props.history || props.history.length === 0) {
    return -1; // No ha iniciado
  }
  // El historial viene del más reciente al más antiguo, por lo que el primer elemento es el estado actual.
  const latestEventDescription = props.history[0].description.toLowerCase();
  
  // Buscamos de la última etapa a la primera para encontrar la coincidencia más avanzada
  for (let i = definedStages.value.length - 1; i >= 0; i--) {
    const stage = definedStages.value[i];
    if (stage.keywords.some(keyword => latestEventDescription.includes(keyword))) {
      return i;
    }
  }
  return 0; // Si no coincide, asumimos que está en la primera etapa
});

// Calcula el porcentaje de progreso para la animación
const progressPercentage = computed(() => {
  if (currentStageIndex.value < 0) return 0;
  // Si solo hay una etapa, no hay progreso (división por cero)
  if (definedStages.value.length <= 1) return 100;
  
  // Calculamos el progreso basado en el índice de la etapa actual
  const percentage = (currentStageIndex.value / (definedStages.value.length - 1)) * 100;
  return Math.min(percentage, 100); // Aseguramos que no pase del 100%
});

// Función para determinar si una etapa ya fue completada
const isStageCompleted = (stageKeywords) => {
  // Una etapa se considera completada si algún evento del historial coincide con sus palabras clave
  return props.history.some(event => 
    stageKeywords.some(keyword => event.description.toLowerCase().includes(keyword))
  );
};
</script>

<style scoped>
.interactive-timeline-container {
  padding: 50px 20px 40px;
  margin-bottom: 20px;
}

.timeline-track {
  position: relative;
  height: 8px;
  width: 100%;
}

.timeline-background {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.timeline-progress {
  position: absolute;
  height: 100%;
  background-color: var(--elsalvador-blue, #0047AB);
  border-radius: 4px;
  /* La animación suave */
  transition: width 1.5s ease-in-out;
}

.truck-icon {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 28px;
  /* La animación suave */
  transition: left 1.5s ease-in-out;
  z-index: 3;
}

.stage-point {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-color: white;
  border: 3px solid #e0e0e0;
  border-radius: 50%;
  z-index: 2;
  transition: border-color 0.5s, background-color 0.5s;
}

/* Estilo para las etapas ya completadas */
.stage-point.completed {
  border-color: var(--elsalvador-blue, #0047AB);
  background-color: var(--elsalvador-blue, #0047AB);
}

.stage-label {
  position: absolute;
  top: 30px; /* Posición debajo del punto */
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  text-align: center;
  font-size: 0.8rem;
  color: #555;
  font-weight: 500;
}
</style>