<template>
  <BaseModal :show="show" @close="$emit('close')">
    <div class="admin-panel">
      <h1 class="admin-title">Panel de Administración</h1>
      
      <div class="admin-layout">
        <div class="admin-nav">
          <button @click="activeTab = 'dashboard'" :class="{ active: activeTab === 'dashboard' }"><i class="fas fa-chart-line"></i> Dashboard</button>
          <button @click="activeTab = 'prizes'" :class="{ active: activeTab === 'prizes' }"><i class="fas fa-gift"></i> Gestionar Premios</button>
          <button @click="activeTab = 'settings'" :class="{ active: activeTab === 'settings' }"><i class="fas fa-cog"></i> Ajustes Generales</button>
          <button @click="activeTab = 'users'" :class="{ active: activeTab === 'users' }"><i class="fas fa-users"></i> Gestionar Usuarios</button>
          <button @click="activeTab = 'winners'" :class="{ active: activeTab === 'winners' }"><i class="fas fa-trophy"></i> Historial de Ganadores</button>
        </div>

        <div class="admin-content">
          <div v-if="activeTab === 'dashboard'"><AdminDashboard /></div>
          <div v-if="activeTab === 'prizes'"><AdminPrizes /></div>
          <div v-if="activeTab === 'settings'"><AdminSettings /></div>
          <div v-if="activeTab === 'users'"><div class="placeholder-content"><h2>Gestionar Usuarios</h2><p>Próximamente.</p></div></div>
          <div v-if="activeTab === 'winners'">
                  <AdminWinners />
                </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
<script setup>
import { ref } from 'vue';
import BaseModal from './BaseModal.vue';
import AdminDashboard from './admin/AdminDashboard.vue';
import AdminPrizes from './admin/AdminPrizes.vue';
import AdminSettings from './admin/AdminSettings.vue';
import AdminWinners from './admin/AdminWinners.vue';
defineProps({ show: Boolean });
defineEmits(['close']);
const activeTab = ref('dashboard');
</script>
<style scoped>
.admin-panel { color: #fff; }
.admin-title { color: white; :center; margin-bottom: 1.5rem; font-size: 1.5rem; }
.admin-layout { display: flex; flex-direction: column; gap: 1.5rem; min-height: 70vh; }
.admin-nav { display: flex; flex-direction: row; gap: 0.5rem; overflow-x: auto; padding-bottom: 1rem; border-bottom: 1px solid #444; }
.admin-nav::-webkit-scrollbar { height: 4px; }
.admin-nav::-webkit-scrollbar-thumb { background: #555; border-radius: 4px; }
.admin-nav button { background: none; border: none; color: #a0a0a0; padding: 0.5rem 0.75rem; border-radius: 6px; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 0.5rem; font-weight: 500; font-size: 0.9rem; white-space: nowrap; transition: all 0.2s ease; }
.admin-nav button:hover { background-color: #2a2a2a; color: #fff; }
.admin-nav button.active { background-color: #ff0000; color: #fff; font-weight: 600; }
.admin-nav button i { font-size: 1rem; }
.admin-content { flex-grow: 1; }
.placeholder-content { text-align: center; color: #a0a0a0; padding-top: 4rem; }
@media (min-width: 768px) { .admin-layout { flex-direction: row; gap: 1.5rem; } .admin-nav { flex-direction: column; overflow-x: visible; border-right: 1px solid #444; border-bottom: none; padding-right: 1.5rem; padding-bottom: 0; } .admin-nav button { font-size: 1rem; } }
</style>