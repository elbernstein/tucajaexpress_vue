<template><div class="tab-content"><div class="tab-header"><h2>Ajustes Generales</h2></div><div v-if="isLoading" class="loader">Cargando ajustes...</div><div v-else class="settings-form-container"><form @submit.prevent="saveSettings"><div class="setting-item"><div class="setting-info"><h3>Activar Ruleta</h3><p>Permite a los usuarios ver y jugar. Si se desactiva, no podrán acceder a la promoción.</p></div><div class="setting-control"><label class="switch"><input type="checkbox" v-model="settings.isRouletteActive"><span class="slider round"></span></label></div></div><div class="setting-item"><div class="setting-info"><h3>Giros por Defecto al Registrarse</h3><p>Número de giros que un usuario nuevo recibirá automáticamente.</p></div><div class="setting-control"><input type="number" class="spins-input" v-model.number="settings.defaultSpins" min="0"></div></div><div class="form-actions"><button type="submit" class="save-btn" :disabled="isSaving">{{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}</button></div></form></div></div></template>
<script setup>
import { ref, onMounted } from 'vue';
// Paso 1: Cambiamos el import
import apiClient from '@/api/axios';
import Swal from 'sweetalert2';

// Referencias reactivas
const isLoading = ref(true);
const isSaving = ref(false);
const settings = ref({
  isRouletteActive: true,
  defaultSpins: 1,
});

// Ya no necesitamos la función getAuthToken

// Carga los ajustes actuales desde la API
const fetchSettings = async () => {
  isLoading.value = true;
  try {
    // Usamos apiClient y la URL relativa
    const { data } = await apiClient.get('/api/admin/settings');
    settings.value = data;
  } catch (error) {
    console.error("Error al cargar los ajustes:", error);
    Swal.fire('Error', 'No se pudieron cargar los ajustes.', 'error');
  } finally {
    isLoading.value = false;
  }
};

// Guarda los nuevos ajustes en la API
const saveSettings = async () => {
  isSaving.value = true;
  try {
    // Usamos apiClient y la URL relativa. El token se añade automáticamente.
    await apiClient.put('/api/admin/settings', settings.value);
    
    Swal.fire({
      icon: 'success',
      title: '¡Ajustes Guardados!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
  } catch (error) {
    console.error("Error al guardar los ajustes:", error);
    Swal.fire('Error', 'No se pudieron guardar los cambios.', 'error');
  } finally {
    isSaving.value = false;
  }
};

onMounted(fetchSettings);
</script>
<style scoped>
.tab-header h2{margin:0}.settings-form-container{background-color:#2a2a2a;border-radius:8px;border:1px solid #444}.setting-item{display:grid;grid-template-columns:1fr auto;gap:1.5rem;padding:1.5rem;border-bottom:1px solid #444;align-items:center}.setting-item:last-child{border-bottom:none}@media (max-width:576px){.setting-item{grid-template-columns:1fr}.setting-control{justify-self:start}}.setting-info h3{margin:0 0 .5rem;color:#fff}.setting-info p{margin:0;color:#a0a0a0;font-size:.9rem}.setting-control{justify-self:end}.spins-input{width:80px;background:#1e1e1e;border:1px solid #555;border-radius:6px;padding:.75rem;color:#fff;font-size:1rem;text-align:center}.form-actions{padding:1.5rem;display:flex;justify-content:flex-end}.save-btn{background-color:#ff0000;border:none;padding:.75rem 1.5rem;border-radius:6px;color:#fff;font-weight:600;cursor:pointer}.save-btn:disabled{background-color:#555}.switch{position:relative;display:inline-block;width:60px;height:34px}.switch input{opacity:0;width:0;height:0}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#555;transition:.4s}.slider:before{position:absolute;content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:#fff;transition:.4s}input:checked+.slider{background-color:#ff0000}input:focus+.slider{box-shadow:0 0 1px #ff0000}input:checked+.slider:before{transform:translateX(26px)}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}
</style>