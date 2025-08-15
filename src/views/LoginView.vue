<template>
  <div class="auth-page">
    <div class="auth-container animate__animated animate__fadeIn">
      <div class="auth-form-wrapper">
        <h1 class="form-title">Iniciar Sesión</h1>
        <p class="form-subtitle">
          Bienvenido de vuelta. ¿No tienes una cuenta?
          <router-link to="/register">Regístrate</router-link>
        </p>

        <form @submit.prevent="handleLogin">
          <!-- Alerta de Error -->
          <div v-if="errorMessage" class="error-alert">
            {{ errorMessage }}
          </div>

          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <div class="input-wrapper">
              <i class="fas fa-envelope"></i>
              <input
                id="email"
                type="email"
                v-model="email"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-wrapper">
              <i class="fas fa-lock"></i>
              <input
                id="password"
                type="password"
                v-model="password"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
          </div>

          <button type="submit" class="auth-button" :disabled="isLoading">
            {{ isLoading ? 'Ingresando...' : 'Iniciar Sesión' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref(null);

const router = useRouter();

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = null;

  try {
    const loginData = {
      email: email.value,
      password: password.value,
    };
    
    // Llamamos al endpoint de login que creamos en el backend
    const { data } = await axios.post('http://localhost:5000/api/auth/login', loginData);

    // --- ¡LA PARTE MÁS IMPORTANTE! ---
    // Guardamos la información del usuario en el navegador
    // Esto es lo que nos permitirá saber si el usuario ha iniciado sesión o no
    localStorage.setItem('userInfo', JSON.stringify(data));

    Swal.fire({
      icon: 'success',
      title: `¡Bienvenido, ${data.name}!`,
      text: 'Has iniciado sesión correctamente.',
      timer: 2000, // La alerta se cierra sola
      showConfirmButton: false
    });
    
    // Lo redirigimos a la página de promociones para que pueda jugar
    router.push('/promociones');

  } catch (error) {
    if (error.response && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'Ocurrió un error. Por favor, inténtalo de nuevo.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* USAMOS EXACTAMENTE LOS MISMOS ESTILOS DE LA PÁGINA DE REGISTRO PARA MANTENER LA CONSISTENCIA */
.auth-page { display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #121212; padding: 2rem 1rem; }
.auth-container { width: 100%; max-width: 450px; }
.auth-form-wrapper { background-color: #1e1e1e; padding: 2.5rem; border-radius: 12px; border: 1px solid #333; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.form-title { text-align: center; font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
.form-subtitle { text-align: center; color: #a0a0a0; margin-bottom: 2rem; }
.form-subtitle a { color: #ff0000; font-weight: 600; text-decoration: none; }
.form-subtitle a:hover { text-decoration: underline; }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #c0c0c0; }
.input-wrapper { position: relative; }
.input-wrapper i { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #6c757d; }
.input-wrapper input { width: 100%; padding: 14px 14px 14px 45px; background-color: #2a2a2a; border: 1px solid #444; border-radius: 8px; font-size: 1rem; color: #fff; transition: border-color 0.3s ease, box-shadow 0.3s ease; }
.input-wrapper input:focus { outline: none; border-color: #ff0000; box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.2); }
.auth-button { width: 100%; padding: 15px; background-color: #ff0000; color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background-color 0.3s ease; }
.auth-button:disabled { background-color: #555; cursor: not-allowed; }
.error-alert { background-color: rgba(255, 0, 0, 0.1); color: #ff9999; border: 1px solid rgba(255, 0, 0, 0.2); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: center; }
</style>