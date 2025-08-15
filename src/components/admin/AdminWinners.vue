<template>
  <div class="tab-content">
    <div class="tab-header">
      <h2>Historial de Ganadores</h2>
      <!-- Opcional: Podríamos añadir un botón para exportar a CSV en el futuro -->
    </div>

    <div v-if="isLoading" class="loader">Cargando historial...</div>
    
    <div v-else-if="winners.length === 0" class="no-data">
      <p>Aún no se ha registrado ningún ganador.</p>
    </div>

    <div v-else class="winners-table-wrapper">
      <table class="winners-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Premio Ganado</th>
            <th>Cupón</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="winner in winners" :key="winner._id">
            <td data-label="Fecha">{{ formatDate(winner.createdAt) }}</td>
            <td data-label="Usuario">{{ winner.user.name }}</td>
            <td data-label="Email">{{ winner.user.email }}</td>
            <td data-label="Premio Ganado">{{ winner.prizeName }}</td>
            <td data-label="Cupón"><span class="coupon-code">{{ winner.couponCode }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const isLoading = ref(true);
const winners = ref([]);

const getAuthToken = () => JSON.parse(localStorage.getItem('userInfo'))?.token || null;

// Formatea la fecha para que sea más legible
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const fetchWinners = async () => {
  const token = getAuthToken();
  if (!token) return;

  isLoading.value = true;
  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.get('http://localhost:5000/api/admin/winners', config);
    winners.value = data;
  } catch (error) {
    console.error("Error al cargar el historial de ganadores:", error);
    Swal.fire('Error', 'No se pudo cargar el historial de ganadores.', 'error');
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchWinners);
</script>

<style scoped>
/* Estilos generales de la pestaña */
.tab-header { margin-bottom: 2rem; }
.tab-header h2 { margin: 0; font-size: 1.3rem; }
.no-data { text-align: center; color: #a0a0a0; padding: 2rem; }

/* Tabla de Ganadores */
.winners-table-wrapper { overflow-x: auto; }
.winners-table { width: 100%; border-collapse: collapse; }
.winners-table th, .winners-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #444;
  white-space: nowrap; /* Evita que el texto se parta */
}
.winners-table th {
  color: #a0a0a0;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.coupon-code {
  background-color: #333;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
}

/* --- ESTILOS RESPONSIVE PARA LA TABLA --- */
@media (max-width: 991px) {
    .winners-table thead {
        display: none; /* Oculta los encabezados en móvil */
    }
    .winners-table tr {
        display: block;
        margin-bottom: 1rem;
        border: 1px solid #444;
        border-radius: 8px;
        padding: .5rem;
    }
    .winners-table td {
        display: block;
        text-align: right; /* Alinea el valor a la derecha */
        border-bottom: 1px dotted #444;
        padding-left: 50%; /* Espacio para el label */
        position: relative;
    }
    .winners-table td:last-child {
        border-bottom: 0;
    }
    .winners-table td:before {
        content: attr(data-label); /* Usa el data-label como pseudo-elemento */
        position: absolute;
        left: 1rem;
        width: calc(50% - 2rem);
        text-align: left;
        font-weight: 700;
        color: #a0a0a0;
        white-space: nowrap;
    }
}
</style>