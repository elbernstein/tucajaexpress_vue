<template><div class="tab-content"><div class="tab-header"><h2 class="tab-title">Gestionar Premios</h2><button class="add-new-btn" @click="togglePrizeForm"><i :class="showPrizeForm ? 'fas fa-times' : 'fas fa-plus'"></i>{{ showPrizeForm ? 'Cancelar' : 'Añadir Premio' }}</button></div><Transition name="fade"><div v-if="showPrizeForm" class="prize-form-container"><h3 class="form-title">{{ editingPrize ? 'Editar Premio' : 'Nuevo Premio' }}</h3><form @submit.prevent="submitPrize"><input class="form-input" type="text" v-model="form.name" p="Nombre (Ej: 10% DTO)" required><input class="form-input" type="text" v-model="form.coupon" p="Código del Cupón" required><input class="form-input" type="number" v-model="form.probability" p="Probabilidad (Ej: 10)" required min="1"><div class="checkbox-group"><input type="checkbox" id="isPrize" v-model="form.isPrize"><label for="isPrize">¿Es un premio real?</label></div><div class="form-actions"><button type="submit" class="save-btn">{{ editingPrize ? 'Guardar Cambios' : 'Crear Premio' }}</button></div></form></div></Transition><div v-if="prizes.length > 0" class="prizes-table-wrapper"><table class="prizes-table"><thead><tr><th>Nombre</th><th>Cupón</th><th>Probabilidad</th><th>Acciones</th></tr></thead><tbody><tr v-for="prize in prizes" :key="prize._id"><td data-label="Nombre">{{ prize.name }}</td><td data-label="Cupón">{{ prize.coupon }}</td><td data-label="Probabilidad">{{ prize.probability }}</td><td data-label="Acciones" class="action-buttons"><button @click="editPrize(prize)" class="edit-btn" title="Editar"><i class="fas fa-pen"></i></button><button @click="confirmDeletePrize(prize._id)" class="delete-btn" title="Eliminar"><i class="fas fa-trash"></i></button></td></tr></tbody></table></div><div v-else class="no-data"><p>No hay premios configurados. ¡Añade uno para empezar!</p></div></div></template>
<script setup>
import { ref, onMounted } from 'vue';
// Paso 1: Cambiamos el import
import apiClient from '@/api/axios';
import Swal from 'sweetalert2';

// Referencias reactivas
const prizes = ref([]);
const showPrizeForm = ref(false);
const editingPrize = ref(null);
const form = ref({ name: '', coupon: '', probability: 10, isPrize: true });

// Ya no necesitamos getAuthToken()

// Carga los premios al montar el componente
const fetchPrizes = async () => {
  try {
    // Usamos la URL relativa
    const { data } = await apiClient.get('/admin/prizes');
    prizes.value = data;
  } catch (error) {
      console.error("Error al cargar premios:", error);
      Swal.fire('Error', 'No se pudieron cargar los premios.', 'error');
  }
};

// Limpia el formulario y lo oculta
const clearForm = () => {
  editingPrize.value = null;
  form.value = { name: '', coupon: '', probability: 10, isPrize: true };
  showPrizeForm.value = false;
};

// Muestra/oculta el formulario
const togglePrizeForm = () => {
  showPrizeForm.value ? clearForm() : showPrizeForm.value = true;
};

// Envía el formulario (para crear o actualizar)
const submitPrize = async () => {
  try {
    if (editingPrize.value) {
      // Petición PUT para actualizar
      await apiClient.put(`/admin/prizes/${editingPrize.value._id}`, form.value);
    } else {
      // Petición POST para crear
      await apiClient.post('/admin/prizes', form.value);
    }
    await fetchPrizes(); // Recarga la lista de premios
    clearForm();
    Swal.fire('¡Éxito!', `Premio ${editingPrize.value ? 'actualizado' : 'creado'} correctamente.`, 'success');
  } catch (error) {
    Swal.fire('Error', error.response?.data?.message || 'No se pudo guardar el premio.', 'error');
  }
};

// Prepara el formulario para editar un premio
const editPrize = (prize) => {
  editingPrize.value = prize;
  form.value = { ...prize };
  showPrizeForm.value = true;
  // Opcional: desplazar la vista al formulario si es muy largo
  // window.scrollTo(0,0);
};

// Confirma y elimina un premio
const confirmDeletePrize = (id) => {
  Swal.fire({
    title: '¿Estás seguro?', text: "¡No podrás revertir esto!",
    icon: 'warning', showCancelButton: true,
    confirmButtonColor: '#ff0000', cancelButtonColor: '#555',
    confirmButtonText: 'Sí, ¡eliminar!', cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Petición DELETE
        await apiClient.delete(`/admin/prizes/${id}`);
        await fetchPrizes();
        Swal.fire('¡Eliminado!', 'El premio ha sido eliminado.', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el premio.', 'error');
      }
    }
  });
};

onMounted(fetchPrizes);
</script>
<style scoped>
.tab-content{display:flex;flex-direction:column;gap:1.5rem}.tab-header{display:flex;flex-direction:column;align-items:flex-start;gap:1rem}@media (min-width:576px){.tab-header{flex-direction:row;justify-content:space-between;align-items:center}}.tab-header .tab-title{margin:0;font-size:1.3rem}.add-new-btn{background-color:#ff0000;color:#fff;border:none;padding:.5rem 1rem;border-radius:6px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:.5rem}.prize-form-container{background-color:#2a2a2a;padding:1.5rem;border-radius:8px}.form-title{font-size:1.1rem;margin-top:0}form{display:grid;grid-template-columns:1fr;gap:1rem}@media (min-width:768px){form{grid-template-columns:repeat(3,1fr) auto;align-items:flex-end}}.form-input{width:100%;background:#1e1e1e;border:1px solid #555;border-radius:6px;padding:.75rem;color:#fff}.checkbox-group{display:flex;align-items:center;gap:.5rem}.form-actions{grid-column:1/-1;display:flex;justify-content:flex-end}@media (min-width:768px){.form-actions{grid-column:auto}}.save-btn{background-color:#ff0000;border:none;padding:.6rem 1.2rem;border-radius:6px;color:#fff;font-weight:600}.fade-enter-active,.fade-leave-active{transition:all .3s ease}.fade-enter-from,.fade-leave-to{opacity:0;transform:translateY(-10px)}.prizes-table-wrapper{overflow-x:auto}.prizes-table{width:100%;border-collapse:collapse}.prizes-table th,.prizes-table td{padding:.75rem 1rem;text-align:left;border-bottom:1px solid #444}.prizes-table th{color:#a0a0a0;font-size:.8rem}.action-buttons{display:flex;gap:.5rem}.edit-btn,.delete-btn{background:#333;border:none;width:35px;height:35px;border-radius:4px;cursor:pointer;color:#a0a0a0;display:grid;place-items:center}.edit-btn:hover{background-color:#444;color:#fff}.delete-btn:hover{background-color:#ff0000;color:#fff}.no-data{text-align:center;color:#a0a0a0;padding:2rem}@media (max-width:767px){.prizes-table thead{display:none}.prizes-table tr{display:block;margin-bottom:1rem;border:1px solid #444;border-radius:8px;padding:.5rem}.prizes-table td{display:block;text-align:right;border-bottom:1px dotted #444;padding:.75rem}.prizes-table td:before{content:attr(data-label);float:left;font-weight:700;color:#a0a0a0;margin-right:1rem}.prizes-table td:last-child{border-bottom:0}.action-buttons{justify-content:flex-end}}
</style>