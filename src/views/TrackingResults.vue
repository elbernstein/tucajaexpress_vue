<template>
    <div class="tracking-results-view">
      <div class="header-section">
        <h1 class="title">Resultados de Rastreo</h1>
        <div class="tracking-info" v-if="trackingData.guide">
          <div class="info-item">
            <span class="label">Guía:</span>
            <span class="value">{{ trackingData.guide }}</span>
          </div>
          <!-- La sección del teléfono que estaba aquí ha sido eliminada -->
        </div>
        <div v-else class="tracking-info">
          <p>Cargando datos de búsqueda...</p>
        </div>
      </div>
  
      <div class="content-section">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Buscando información de tu paquete...</p>
        </div>
  
        <div v-else-if="error" class="error-state">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>Ocurrió un error</h3>
          <p>{{ error }}</p>
          <button @click="retrySearch" class="retry-button">
            Reintentar Búsqueda
          </button>
          <button @click="goBack" class="back-button" style="margin-left: 10px;">
            <i class="fas fa-arrow-left"></i> Volver
          </button>
        </div>
  
        <div v-else-if="trackingInfo" class="results-container">
          <div class="status-card" :class="statusClass">
            <div class="status-header">
              <h3>Estado Actual</h3>
              <span class="status-badge">{{ trackingInfo.status }}</span>
            </div>
            <div class="status-details">
              <div class="detail-item">
                <i class="fas fa-info-circle"></i> <span>{{ trackingInfo.location }}</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-calendar-alt"></i>
                <span>Última Actualización: {{ formatDateTime(trackingInfo.lastUpdate) }}</span>
              </div>
              </div>
          </div>

          <div class="interactive-journey-section">
            <h3>Progreso del Envío</h3>
            <div class="journey-map">
                <div 
                    v-for="(stage, index) in journeyStages" 
                    :key="stage.key" 
                    class="journey-step"
                    :class="getStageStatusClass(index)"
                >
                    <div class="journey-icon-wrapper">
                        <div class="journey-icon">
                            <i :class="stage.icon"></i>
                        </div>
                        <div class="journey-connector"></div>
                    </div>
                    <div class="journey-label">{{ stage.label }}</div>
                </div>
            </div>
          </div>
  
          <div class="timeline-section">
            <h3>Historial de Eventos</h3>
            <div class="timeline" v-if="trackingInfo.history && trackingInfo.history.length > 0">
              <div v-for="(event, index) in trackingInfo.history" :key="index" class="timeline-item">
                <div class="timeline-marker">
                  <span class="marker-number">{{ event.index }}</span>
                </div>
                <div class="timeline-content">
                  <div class="timeline-date">{{ formatDateTime(event.date) }}</div>
                  <div class="timeline-event">{{ event.description }}</div>
                </div>
              </div>
            </div>
            <div v-else>
              <p>No hay historial de movimientos disponible.</p>
            </div>
          </div>
          <div class="text-center" style="margin-top: 20px;">
             <button @click="goBack" class="back-button">
                <i class="fas fa-arrow-left"></i> Volver
              </button>
          </div>
        </div>
  
        <!-- La sección de "No se encontró la guía" ha sido actualizada -->
        <div v-else class="no-results">
          <i class="fas fa-box-open"></i>
          <h3>No se encontró la guía</h3>
          <p>La guía <strong>{{ trackingData.guide }}</strong> no fue encontrada en nuestro sistema.</p>
          <p>Por favor verifica:</p>
          <ul class="verification-list">
            <li>Que el número de guía sea correcto</li>
            <li>Que la guía no sea muy reciente (puede tardar hasta 24 horas en aparecer)</li>
          </ul>
          <button @click="goBack" class="back-button">
            <i class="fas fa-arrow-left"></i> Volver
          </button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

// Estados
const loading = ref(true);
const error = ref(null);
const trackingInfo = ref(null);

// Datos de rastreo
const trackingData = ref({
  guide: '',
});

// Mapeo de países


// ===============================================================
// === AJUSTE DE ICONO APLICADO EN ESTA SECCIÓN ==================
// ===============================================================
const journeyStages = ref([
  { key: 'generada',      label: 'Guía Generada',     icon: 'fas fa-clipboard-list', keywords: ['generada en sistema', 'guia creada'] },
  { key: 'recolecta',     label: 'Recolectado',       icon: 'fas fa-truck-moving',   keywords: ['recolectada de origen', 'recolectado', 'agregado a cedis'] },
  { key: 'container',     label: 'En Contenedor',     icon: 'fas fa-ship',           keywords: ['agregado a container', 'en contenedor'] },
  { key: 'aduana',        label: 'Aduanas',           icon: 'fas fa-passport',       keywords: ['transito aduana', 'tramites aduanales', 'revision aduanal'] },
  { key: 'bodega_destino',label: 'En Bodega Destino', icon: 'fas fa-boxes-stacked',  keywords: ['en bodega para su distribucion'] },
  { key: 'reparto',       label: 'En Reparto',        icon: 'fas fa-truck-fast',     keywords: ['en proceso de entrega', 'asignada guia a chofer'] },
  { key: 'entregado',     label: 'Entregado',         icon: 'fas fa-house-user',     keywords: ['entregado'] }
]);
// ===============================================================

// Computados

const statusClass = computed(() => {
  if (!trackingInfo.value || !trackingInfo.value.status) return 'desconocido';
  return trackingInfo.value.status.toLowerCase()
           .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
           .replace(/[^a-z0-9]+/g, '-')
           .replace(/^-+|-+$/g, '');
});

// Lógica para determinar el estado del mapa de viaje
const currentJourneyStageIndex = computed(() => {
  if (!trackingInfo.value || !trackingInfo.value.history) return -1;

  const historyDescriptions = trackingInfo.value.history.map(event => event.description.toLowerCase());
  
  for (let i = journeyStages.value.length - 1; i >= 0; i--) {
    const stage = journeyStages.value[i];
    const hasKeyword = historyDescriptions.some(description => 
        stage.keywords.some(keyword => description.includes(keyword))
    );
    if (hasKeyword) {
        return i;
    }
  }
  
  if (historyDescriptions.length > 0) return 0;

  return -1;
});

const getStageStatusClass = (index) => {
    const currentStage = currentJourneyStageIndex.value;
    if (index < currentStage) {
        return 'completed';
    } else if (index === currentStage) {
        return 'current';
    } else {
        return 'pending';
    }
};

// Métodos (sin cambios)
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return 'Fecha inválida';
  }
};

const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch (e) {
    console.error("Error formatting datetime:", dateString, e);
    return 'Fecha/hora inválida';
  }
};

const extractTrackingData = () => {
  const { guide } = route.query;

  if (!guide) {
    error.value = 'No se encontró un número de guía en la URL.';
    loading.value = false;
    return false;
  }

  trackingData.value.guide = guide;
  return true;
};

const fetchTrackingInfo = async (guideToFetch) => {
  if (!guideToFetch) {
    error.value = "No se proporcionó número de guía para la búsqueda.";
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = null;
  trackingInfo.value = null;

  // CAMBIO: La URL ahora no incluye el celular
  const apiUrl = `https://sistematce.com/api/obtener_info_guia_web?nroGuia=${encodeURIComponent(guideToFetch)}`;

  try {
    // CAMBIO: La llamada ahora es un GET en lugar de un POST
    const response = await axios.get(apiUrl); 
    
    
    if (response.data && response.data.success) {
      const apiData = response.data;
      
      if (!apiData.movimientos || Object.keys(apiData.movimientos).length === 0) {
        trackingInfo.value = null;
      } else {
        const history = [];
        
        const movementsArray = Object.values(apiData.movimientos).sort((a, b) => a.indice - b.indice);

        for (let i = movementsArray.length - 1; i >= 0; i--) {
          const mov = movementsArray[i];
          history.push({
            date: mov.fecha,
            description: mov.observacion || `Movimiento: ${mov.type}`,
            index: mov.indice
          });
        }

        const currentStatus = history[0] || null;
        const lastUpdate = currentStatus ? currentStatus.date : apiData.fecha;

        trackingInfo.value = {
          status: currentStatus ? currentStatus.description : 'Información Recibida',
          location: currentStatus ? currentStatus.description : 'No hay detalles de ubicación',
          lastUpdate: lastUpdate,
          estimatedDelivery: null,
          history: history
        };
      }
    } else {
      trackingInfo.value = null;
    }
  } catch (err) {
    console.error('Error al obtener Guia:', err);
    if (err.response) {
      if (err.response.status === 404) {
        trackingInfo.value = null;
      } else {
        error.value = `Error del servidor (${err.response.status}). Intenta más tarde.`;
      }
    } else if (err.request) {
      error.value = 'No se pudo conectar con el servidor de rastreo. Verifica tu conexión.';
    } else {
      error.value = 'Ocurrió un error inesperado al procesar la solicitud.';
    }
  } finally {
    loading.value = false;
  }
};

const retrySearch = () => {
  const guide = trackingData.value.guide;
  if (guide) {
    // CAMBIO: Solo se pasa la guía
    fetchTrackingInfo(guide);
  } else {
    error.value = "No hay un número de guía para reintentar la búsqueda.";
  }
};

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};

// Iniciar
onMounted(() => {
  const dataExtracted = extractTrackingData();
  if (dataExtracted && !error.value) {
    // CAMBIO: Solo se pasa la guía
    fetchTrackingInfo(trackingData.value.guide);
  }
});
</script>

<style scoped>
    /* =============================================================== */
    /* NUEVO: Estilos para el Mapa de Viaje Interactivo                */
    /* =============================================================== */
    .interactive-journey-section {
        background: #ffffff;
        border-radius: 10px;
        padding: 25px;
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
        border: 1px solid #e5e5e5;
        margin-bottom: 30px;
    }

    .interactive-journey-section h3 {
        margin-top: 0;
        margin-bottom: 35px;
        font-size: 1.4rem;
        color: var(--dark-color, #2c3e50);
        text-align: center;
    }

    .journey-map {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .journey-step {
        flex: 1;
        text-align: center;
        position: relative;
    }

    .journey-icon-wrapper {
        position: relative;
        display: inline-block;
        margin-bottom: 12px;
    }

    .journey-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        transition: background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease;
        border: 2px solid #e0e0e0;
        background-color: #f8f9fa;
        color: #adb5bd;
        z-index: 2;
        position: relative;
    }

    .journey-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: #6c757d;
        transition: color 0.4s ease;
    }

    /* Conector entre íconos */
    .journey-step:not(:last-child) .journey-icon-wrapper .journey-connector {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        height: 3px;
        width: 200%; /* Ajustar según sea necesario */
        background-color: #e0e0e0;
        transform: translateY(-50%) translateX(calc( -50% + 25px )); /* Moverlo para empezar desde el centro del ícono */
        z-index: 1;
        transition: background-color 0.4s ease;
    }

    /* Estilos por estado */

    /* PENDIENTE (Estado por defecto) */
    .journey-step.pending .journey-label {
        color: #adb5bd;
    }

    /* COMPLETADO */
    .journey-step.completed .journey-icon {
        background-color: #000000;
        border-color: #ff0000;
        color: white;
    }
    .journey-step.completed .journey-label {
        color: #2c3e50;
    }
    .journey-step.completed .journey-connector {
        background-color: #2ecc71;
    }

    /* ACTUAL */
    .journey-step.current .journey-icon {
        background-color: var(--elsalvador-blue, #ff0000);
        border-color: var(--elsalvador-blue, #000000);
        color: white;
        animation: pulse 1.5s infinite;
    }
    .journey-step.current .journey-label {
        color: var(--elsalvador-blue, #ff0000);
        font-weight: 700;
    }

    /* El conector que sale del estado actual debe estar coloreado */
    .journey-step.current .journey-connector {
        background: linear-gradient(to right, #2ecc71, #e0e0e0);
    }
    /* El conector de un paso completado que lleva a uno actual, debe ser verde */
    .journey-step.completed + .journey-step.current .journey-icon-wrapper .journey-connector {
       /* Este selector es complejo, es más fácil manejarlo como arriba */
    }


    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(0, 71, 171, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(0, 71, 171, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(0, 71, 171, 0);
        }
    }

    /* Ajustes Responsivos para el Mapa */
    @media (max-width: 768px) {
        .interactive-journey-section h3 {
            font-size: 1.2rem;
            margin-bottom: 20px;
        }
        .journey-map {
            flex-direction: column;
            align-items: flex-start;
            padding-left: 25px;
        }
        .journey-step {
            flex: none;
            width: 100%;
            text-align: left;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        .journey-icon-wrapper {
            margin-bottom: 0;
            margin-right: 20px;
        }
        .journey-label {
             font-size: 0.9rem;
        }
        /* Conector vertical */
        .journey-step:not(:last-child) .journey-icon-wrapper .journey-connector {
            width: 3px;
            height: 150%; /* Ajustar */
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(calc(-50% + 25px));
        }
        .journey-step.current .journey-connector {
             background: linear-gradient(to bottom, #2ecc71, #e0e0e0);
        }
    }
    @media (max-width: 480px) {
      .journey-icon {
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
      }
    }

  /* Todos los estilos que ya tenías van aquí. No se necesita ningún cambio. */
  .timeline-marker {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .marker-number {
    color: var(--elsalvador-blue, #0047AB);
    font-size: 0.7rem;
    font-weight: bold;
  }
  .timeline-item:first-child .timeline-marker .marker-number {
    color: white;
  }
  .tracking-results-view {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
    color: #333;
    background-color: #f4f7f6;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  }
  .header-section {
    background: linear-gradient(to right, #ffffff, #e9f0f3);
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    border-bottom: 3px solid var(--elsalvador-blue, #ff0000);
  }
  .title {
    color: var(--dark-color, #2c3e50);
    margin-bottom: 25px;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }
  .tracking-info {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    align-items: center;
  }
  .info-item {
    background: white;
    padding: 10px 18px;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #e0e0e0;
    font-size: 0.95rem;
  }
  .label {
    font-weight: 600;
    color: #555;
  }
  .value {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #333;
  }
  .flag-icon {
    width: 22px;
    height: 15px;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    object-fit: cover;
  }
  .content-section {
      padding: 10px;
  }
  .loading-state {
    text-align: center;
    padding: 50px 20px;
    color: #666;
  }
  .spinner {
    width: 45px;
    height: 45px;
    border: 4px solid #e0e0e0;
    border-top: 4px solid var(--elsalvador-blue, #0047AB);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .error-state {
    text-align: center;
    padding: 35px 25px;
    background: #fff2f2;
    border-radius: 10px;
    border: 1px solid #ffcccc;
    border-left: 5px solid #e74c3c;
    color: #5c2c2c;
  }
  .error-state i {
    color: #e74c3c;
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
  .error-state h3 {
    color: #c0392b;
    margin-bottom: 10px;
    font-size: 1.3rem;
  }
  .error-state p {
      margin-bottom: 20px;
      line-height: 1.6;
  }
  .retry-button, .back-button {
    margin-top: 15px;
    padding: 12px 25px;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
  .retry-button {
      background-color: var(--elsalvador-blue, #ff0000);
  }
  .retry-button:hover {
    background-color: #003a8c;
    transform: translateY(-2px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
  }
  .back-button {
      background-color: #6c757d;
  }
    .back-button:hover {
    background-color: #5a6268;
    transform: translateY(-2px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
  }
  .results-container {}
  .status-card {
    background: #ffffff;
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
    border: 1px solid #e5e5e5;
    border-left-width: 6px;
    border-left-color: #6c757d;
  }
  .status-card.en-transito,
  .status-card.asignada-guia-a-chofer {
    border-left-color: #f39c12;
  }
  .status-card.entregado {
    border-left-color: #2ecc71;
  }
  .status-card.recibido,
  .status-card.paquete-recibido-en-centro-de-distribucion {
      border-left-color: #3498db;
    }
  .status-card.problema, .status-card.error {
    border-left-color: #e74c3c;
  }
    .status-card.en-proceso-de-clasificacion {
        border-left-color: #9b59b6;
    }
    .status-card.en-ruta-hacia-destino-final {
        border-left-color: #1abc9c;
    }
  .status-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
  }
    .status-header h3 {
        margin: 0;
        font-size: 1.4rem;
        color: var(--dark-color, #2c3e50);
    }
  .status-badge {
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: #6c757d;
    color: white;
    white-space: nowrap;
  }
  .status-card.en-transito .status-badge,
  .status-card.asignada-guia-a-chofer .status-badge
    { background: #f39c12; }
  .status-card.entregado .status-badge { background: #2ecc71; }
    .status-card.recibido .status-badge,
    .status-card.paquete-recibido-en-centro-de-distribucion .status-badge
      { background: #3498db; }
  .status-card.problema .status-badge, .status-card.error .status-badge { background: #e74c3c; }
    .status-card.en-proceso-de-clasificacion .status-badge { background: #9b59b6; }
    .status-card.en-ruta-hacia-destino-final .status-badge { background: #1abc9c; }
  .status-details {
    display: grid;
    gap: 15px;
    font-size: 1rem;
  }
  .detail-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #555;
  }
  .detail-item i {
    color: var(--elsalvador-blue, #ff0000);
    width: 20px;
    text-align: center;
    font-size: 1.1rem;
  }
  .timeline-section {
    background: #ffffff;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
    border: 1px solid #e5e5e5;
  }
  .timeline-section h3 {
      margin-top: 0;
      margin-bottom: 25px;
      font-size: 1.4rem;
      color: var(--dark-color, #2c3e50);
      text-align: left;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
  }
  .timeline {
    position: relative;
    padding-left: 35px;
    margin-top: 10px;
  }
  .timeline::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 10px;
    bottom: 10px;
    width: 3px;
    background: #e0e0e0;
    border-radius: 2px;
  }
  .timeline-item {
    position: relative;
    margin-bottom: 30px;
  }
  .timeline-item:last-child {
      margin-bottom: 0;
  }
  .timeline-marker {
    position: absolute;
    left: -35px;
    top: 5px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    border: 3px solid var(--elsalvador-blue, #ab0000);
    z-index: 1;
      box-shadow: 0 0 0 4px white;
  }
    .timeline-item:first-child .timeline-marker {
        background-color: var(--elsalvador-blue, #0047AB);
        border-color: white;
        box-shadow: 0 0 5px rgba(0, 71, 171, 0.5);
    }
  .timeline-content {
    background: #f8f9fa;
    padding: 18px 20px;
    border-radius: 8px;
    border: 1px solid #eee;
    position: relative;
  }
  .timeline-date {
    font-size: 0.8rem;
    color: #777;
    margin-bottom: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  .timeline-event {
    font-weight: 500;
    margin-bottom: 5px;
    color: #333;
    line-height: 1.5;
  }
  .no-results {
    text-align: center;
    padding: 50px 20px;
    color: #777;
  }
  .no-results i {
    font-size: 3.5rem;
    color: #bdc3c7;
    margin-bottom: 25px;
  }
  .no-results h3 {
    color: #555;
    margin-bottom: 15px;
    font-size: 1.4rem;
  }
  .no-results p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  .verification-list {
    text-align: left;
    max-width: 400px;
    margin: 15px auto;
    padding-left: 20px;
  }
  .verification-list li {
    margin-bottom: 8px;
    line-height: 1.4;
  }
    .no-results strong {
        color: #333;
    }
  @media (max-width: 768px) {
    .tracking-results-view {
        margin: 15px;
        padding: 15px;
    }
    .tracking-info {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
    .info-item {
      justify-content: space-between;
    }
    .title {
      font-size: 1.6rem;
    }
      .status-header h3, .timeline-section h3 {
          font-size: 1.2rem;
        }
        .status-badge {
            font-size: 0.8rem;
            padding: 5px 12px;
        }
  }
  @media (max-width: 480px) {
      .tracking-results-view {
        margin: 10px;
        padding: 10px;
      }
      .header-section, .status-card, .timeline-section {
          padding: 15px;
      }
      .title { font-size: 1.4rem; }
      .info-item { font-size: 0.9rem; }
      .flag-icon { width: 20px; height: 13px; }
    .status-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .status-badge {
        align-self: flex-start;
    }
    .detail-item { font-size: 0.9rem; gap: 8px; }
      .detail-item i { font-size: 1rem; }
      .timeline { padding-left: 25px; }
      .timeline-marker { left: -25px; width: 20px; height: 20px; border-width: 2px; box-shadow: 0 0 0 3px white; }
      .timeline-item:first-child .timeline-marker { box-shadow: 0 0 4px rgba(0, 71, 171, 0.4); }
    .timeline-content { padding: 12px 15px; }
      .timeline-date { font-size: 0.75rem; }
      .timeline-event { font-size: 0.9rem; }
      .no-results i { font-size: 3rem; }
      .no-results h3 { font-size: 1.2rem; }
      .no-results p { font-size: 0.9rem; }
      .retry-button, .back-button { width: 100%; justify-content: center; padding: 12px; }
      .error-state { padding: 20px 15px; }
      .error-state i { font-size: 2rem; }
      .error-state h3 { font-size: 1.1rem; }
  }
  .text-center {
      text-align: center;
  }
</style>