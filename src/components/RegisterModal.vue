<template>
  <BaseModal :show="show" @close="$emit('close')">
    <div class="auth-form-wrapper">
      <h1 class="form-title">Crear una Cuenta</h1>
      <p class="form-subtitle">Regístrate para acceder a promociones.</p>

      <div v-if="errorMessage" class="error-alert">{{ errorMessage }}</div>

      <form @submit.prevent="handleRegister">
        <div class="form-group"><label>Nombre Completo</label><input type="text" v-model="name" required /></div>
        <div class="form-group"><label>Correo Electrónico</label><input type="email" v-model="email" required /></div>
        <div class="form-group"><label>Contraseña</label><input type="password" v-model="password" required /></div>
        <div class="form-group"><label>Confirmar Contraseña</label><input type="password" v-model="confirmPassword" required /></div>
        <button type="submit" class="auth-button" :disabled="isLoading">
          {{ isLoading ? 'Creando cuenta...' : 'Crear Cuenta' }}
        </button>
      </form>

      <p class="switch-form">¿Ya tienes cuenta? <a href="#" @click.prevent="$emit('openLogin')">Inicia Sesión</a></p>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue';
import BaseModal from './BaseModal.vue';

defineProps({ show: Boolean });
const emit = defineEmits(['close', 'openLogin', 'registered']);

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref(null);

const handleRegister = () => {
    if (password.value !== confirmPassword.value) { errorMessage.value = 'Las contraseñas no coinciden.'; return; }
    errorMessage.value = null;
    
    const storedUsers = JSON.parse(localStorage.getItem('rouletteUsers')) || [];
    const userExists = storedUsers.some(u => u.email === email.value);

    if(userExists) {
        errorMessage.value = 'Este correo electrónico ya está registrado.';
        return;
    }

    const newUser = {
        name: name.value,
        email: email.value,
        password: password.value, // NOTA: En un caso real, esto NO es seguro. Para este fin, es aceptable.
        hasSpun: false,
    };

    storedUsers.push(newUser);
    localStorage.setItem('rouletteUsers', JSON.stringify(storedUsers));
    
    emit('registered');
    emit('close');
};
</script>

<style scoped>
/* Los mismos estilos del LoginModal. Son idénticos. */
.auth-form-wrapper{color:#fff}.form-title{text-align:center;font-size:2rem;font-weight:700;color:#fff;margin-bottom:.5rem}.form-subtitle{text-align:center;color:#a0a0a0;margin-bottom:2rem}.form-group{margin-bottom:1.5rem}.form-group label{display:block;margin-bottom:.5rem;font-weight:500;color:#c0c0c0}.form-group input{width:100%;padding:14px;background-color:#2a2a2a;border:1px solid #444;border-radius:8px;font-size:1rem;color:#fff}.form-group input:focus{outline:none;border-color:#ff0000}.auth-button{width:100%;padding:15px;background-color:#ff0000;color:#fff;border:none;border-radius:8px;font-size:1.1rem;font-weight:600;cursor:pointer}.auth-button:disabled{background-color:#555}.error-alert{background-color:rgba(255,0,0,.1);color:#ff9999;border:1px solid rgba(255,0,0,.2);padding:1rem;border-radius:8px;margin-bottom:1.5rem;text-align:center}.switch-form{text-align:center;margin-top:1.5rem;color:#a0a0a0}.switch-form a{color:#ff0000;font-weight:600;cursor:pointer}
</style>