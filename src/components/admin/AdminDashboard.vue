<template><div class="tab-content"><div class="tab-header"><h2>Dashboard</h2></div><div class="stats-grid"><div class="stat-card"><div class="card-icon icon-users"><i class="fas fa-users"></i></div><div class="card-content"><p class="card-value">{{ stats.totalUsers }}</p><p class="card-label">Usuarios Registrados</p></div></div><div class="stat-card"><div class="card-icon icon-spins"><i class="fas fa-sync-alt"></i></div><div class="card-content"><p class="card-value">{{ stats.totalSpins }}</p><p class="card-label">Giros Realizados</p></div></div><div class="stat-card"><div class="card-icon icon-conversion"><i class="fas fa-chart-pie"></i></div><div class="card-content"><p class="card-value">N/A</p><p class="card-label">Tasa de Conversión</p></div></div></div><div class="top-prizes-section"><h3>Top 5 - Premios Más Ganados</h3><ul v-if="stats.mostWonPrizes.length > 0" class="top-prizes-list"><li v-for="(prize, index) in stats.mostWonPrizes" :key="index"><span class="prize-rank">{{ index + 1 }}</span><span class="prize-name">{{ prize._id }}</span><span class="prize-count">{{ prize.count }} veces</span></li></ul><p v-else class="no-data">Aún no hay suficientes datos para mostrar.</p></div></div></template>
<script setup>
import { ref, onMounted } from 'vue';
// Paso 1: Cambiamos el import
import apiClient from '@/api/axios';
import Swal from 'sweetalert2';

const stats = ref({
  totalUsers: 0,
  totalSpins: 0,
  mostWonPrizes: [],
});

const fetchStats = async () => {
  try {
    // Paso 2: Usamos apiClient y la URL relativa.
    // El interceptor añade el token automáticamente, así que no necesitamos 'config'.
    const { data } = await apiClient.get('/admin/stats');
    stats.value = data;
  } catch (error) {
    console.error("Error al cargar las estadísticas:", error);
    Swal.fire({
        icon: 'error',
        title: 'Error de Conexión',
        text: 'No se pudieron cargar las estadísticas del dashboard. Verifica tu conexión a la API.'
    });
  }
};

onMounted(fetchStats);
</script>
<style scoped>
.tab-content{display:flex;flex-direction:column;gap:2rem}.tab-header h2{color: white; :0}.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem}.stat-card{background-color:#2a2a2a;border-radius:8px;padding:1.5rem;display:flex;align-items:center;gap:1.5rem;border:1px solid #444}.card-icon{font-size:2rem;padding:1.25rem;border-radius:50%;display:flex;align-items:center;justify-content:center}.icon-users{background-color:rgba(52,152,219,.2);color:#3498db}.icon-spins{background-color:rgba(26,188,156,.2);color:#1abc9c}.icon-conversion{background-color:rgba(241,196,15,.2);color:#f1c40f}.card-value{font-size:2.25rem;font-weight:700;margin:0;line-height:1}.card-label{margin:0;color:#a0a0a0;font-size:.9rem}.top-prizes-section h3{margin-bottom:1rem}.top-prizes-list{list-style:none;padding:0;margin:0;background-color:#2a2a2a;border-radius:8px;border:1px solid #444}.top-prizes-list li{display:flex;align-items:center;padding:1rem 1.5rem;border-bottom:1px solid #444}.top-prizes-list li:last-child{border-bottom:none}.prize-rank{font-weight:700;font-size:1rem;color:#a0a0a0;margin-right:1.5rem;width:20px}.prize-name{flex-grow:1;font-weight:500}.prize-count{font-weight:600;font-size:1.1rem}.no-data{text-align:center;color:#a0a0a0;padding:2rem;background-color:#2a2a2a;border-radius:8px}
</style>