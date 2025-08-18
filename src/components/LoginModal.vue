<template>
  <BaseModal :show="show" @close="$emit('close')">
    <div class="auth-form-wrapper">
      <h1 class="form-title">Iniciar Sesión</h1>
      <p class="form-subtitle">Bienvenido de vuelta. Ingresa para jugar.</p>
      
      <div v-if="errorMessage" class="error-alert">{{ errorMessage }}</div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="login-email">Correo Electrónico</label>
          <input id="login-email" type="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="login-password">Contraseña</label>
          <input id="login-password" type="password" v-model="password" required />
        </div>
        <button type="submit" class="auth-button" :disabled="isLoading">
          {{ isLoading ? 'Ingresando...' : 'Iniciar Sesión' }}
        </button>
      </form>

      <p class="switch-form">¿No tienes cuenta? <a href="#" @click.prevent="$emit('openRegister')">Regístrate</a></p>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/api/axios'; // <-- NUEVO IMPORT
import BaseModal from './BaseModal.vue';

defineProps({ show: Boolean });
const emit = defineEmits(['close', 'openRegister', 'loggedIn']);

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref(null);

const handleLogin = async () => {
  isLoading.value = true; errorMessage.value = null;
  try {
    const { data } = await apiClient.post('/auth/login', { email: email.value, password: password.value });
    localStorage.setItem('userInfo', JSON.stringify(data));
    emit('loggedIn', data);
    emit('close');
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Error al iniciar sesión.';
  } finally {
    isLoading.value = false;
  }
};
</script>
<style scoped>
/* ESTOS ESTILOS SON REUTILIZABLES */
.auth-form-wrapper{color:#fff}.form-title{text-align:center;font-size:2rem;font-weight:700;color:#fff;margin-bottom:.5rem}.form-subtitle{text-align:center;color:#a0a0a0;margin-bottom:2rem}.form-group{margin-bottom:1.5rem}.form-group label{display:block;margin-bottom:.5rem;font-weight:500;color:#c0c0c0}.form-group input{width:100%;padding:14px;background-color:#2a2a2a;border:1px solid #444;border-radius:8px;font-size:1rem;color:#fff}.form-group input:focus{outline:none;border-color:#ff0000}.auth-button{width:100%;padding:15px;background-color:#ff0000;color:#fff;border:none;border-radius:8px;font-size:1.1rem;font-weight:600;cursor:pointer}.auth-button:disabled{background-color:#555}.error-alert{background-color:rgba(255,0,0,.1);color:#ff9999;border:1px solid rgba(255,0,0,.2);padding:1rem;border-radius:8px;margin-bottom:1.5rem;text-align:center}.switch-form{text-align:center;margin-top:1.5rem;color:#a0a0a0}.switch-form a{color:#ff0000;font-weight:600;cursor:pointer}
</style>