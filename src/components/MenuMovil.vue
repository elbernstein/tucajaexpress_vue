<template>
  <div class="menu-mobile-container">
    <!-- El botón se oculta al abrir el menú -->
    <button @click="toggleMenu" class="menu-toggle-button" :class="{ 'is-active': isMenuOpen }">
      <span v-if="!isMenuOpen" class="icon-hamburger">☰</span>
      <span v-else class="icon-close">×</span>
    </button>

    <!-- Fondo oscuro -->
    <div v-if="isMenuOpen" class="menu-overlay" @click="toggleMenu"></div>

    <!-- Menú moderno con la lista de enlaces definitiva -->
    <nav class="mobile-nav" :class="{ 'is-open': isMenuOpen }">
      <ul class="nav-list">
        <!-- ============================================ -->
        <!-- ===== LISTA DE ENLACES DEFINITIVA AQUÍ ===== -->
        <!-- ============================================ -->
        <li class="nav-item">
          <RouterLink to="/" @click="closeMenu">
            <svg class="nav-icon" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"></path></svg>
            <span>Inicio</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/conocenos" @click="closeMenu">
            <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
            <span>Conócenos</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/calificanos" @click="closeMenu">
            <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"></path></svg>
            <span>Calificanos</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/paises" @click="closeMenu">
            <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 19.93c-3.95-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c3.95.49 7 3.85 7 7.93s-3.05 7.44-7 7.93V4.07z"></path></svg>
            <span>Paises</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/puerta-puerta" @click="closeMenu">
            <svg class="nav-icon" viewBox="0 0 24 24"><path d="M21.99 8c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V8zm-2-3H4c-1.1 0-2 .9-2 2v.5l10 6.25L20 7.5V7c0-1.1-.9-2-2-2z"></path></svg>
            <span>Puerta a Puerta</span>
          </RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink to="/rutas" @click="closeMenu">
              <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13C19 5.13 15.87 2 12 2zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>
              <span>Zonas de Recolección</span>
            </RouterLink>
        </li>
         <li class="nav-item">
          <RouterLink to="/contactanos" @click="closeMenu">
            <svg class="nav-icon" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>
            <span>Contáctanos</span>
          </RouterLink>
        </li>
        <li class="nav-item-highlight">
          <RouterLink to="/rastreo" @click="closeMenu">
            <svg class="nav-icon" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-8.5l1.96 2.5H17V9.5h3.5zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></svg>
            <span>Rastrea tu Paquete</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
// El script está perfecto y no requiere cambios
export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    }
  },
  watch: {
    '$route'() {
      if (this.isMenuOpen) {
        this.closeMenu();
      }
    }
  }
};
</script>

<style scoped>
/* Contenedor principal y variables de color */
.menu-mobile-container {
  --primary-red: #ff0000;
  --dark-background: #121212;
  --light-text: #ffffff;
  --dark-text: #1a1a1a;
  --hover-red: #cc0000;
  --menu-background: linear-gradient(145deg, #1f1f1f 0%, #101010 100%);
}

/* Oculta en escritorio */
@media (min-width: 769px) {
  .menu-mobile-container {
    display: none;
  }
}

/* --- ESTILOS PARA EL BOTÓN SIMPLE QUE SE OCULTA --- */
.menu-toggle-button {
  font-family: sans-serif;
  cursor: pointer;
  background: var(--primary-red);
  color: white;
  border: none;
  border-radius: 50%;
  width: 57px;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  left: 7px;
  z-index: 1001;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, background-color 0.3s ease, opacity 0.4s ease;
}

.menu-toggle-button:hover {
  background: var(--hover-red);
}

.menu-toggle-button.is-active {
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}

.icon-hamburger {
  font-size: 30px;
  line-height: 1; 
}

.icon-close {
  font-size: 36px;
  line-height: 1;
}

/* --- ESTILOS PARA EL MENÚ MODERNO --- */
.menu-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 999;
  transition: opacity 0.3s ease;
}

.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 80vh;
  padding: 30px 0;
  background: var(--menu-background);
  border-top: 2px solid var(--primary-red);
  border-radius: 25px 25px 0 0;
  z-index: 1000;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  overflow-y: auto;
}

.mobile-nav.is-open {
  transform: translateY(0);
}

.nav-list { list-style: none; padding: 0; margin: 0; }
.nav-item { transform: translateX(-100%); opacity: 0; animation: slide-in 0.5s forwards; }
/* Animación escalonada para todos los ítems */
.mobile-nav.is-open .nav-item:nth-child(1) { animation-delay: 0.1s; }
.mobile-nav.is-open .nav-item:nth-child(2) { animation-delay: 0.15s; }
.mobile-nav.is-open .nav-item:nth-child(3) { animation-delay: 0.2s; }
.mobile-nav.is-open .nav-item:nth-child(4) { animation-delay: 0.25s; }
.mobile-nav.is-open .nav-item:nth-child(5) { animation-delay: 0.3s; }
.mobile-nav.is-open .nav-item:nth-child(6) { animation-delay: 0.35s; }
.mobile-nav.is-open .nav-item:nth-child(7) { animation-delay: 0.4s; }
.mobile-nav.is-open .nav-item-highlight { animation-delay: 0.45s; }


@keyframes slide-in { to { transform: translateX(0); opacity: 1; } }
.nav-item a { display: flex; align-items: center; padding: 16px 30px; text-decoration: none; color: var(--light-text); font-size: 1.1rem; font-weight: 500; transition: background-color 0.2s ease, color 0.2s ease; }
.nav-item a:hover { background-color: rgba(255, 255, 255, 0.05); }
.nav-item a:active { background-color: rgba(255, 255, 255, 0.1); }
.nav-icon { width: 24px; height: 24px; margin-right: 20px; fill: currentColor; transition: transform 0.3s; }
.nav-item a:hover .nav-icon { transform: scale(1.1); fill: var(--primary-red); }

/* Estilos para el botón de Rastreo destacado */
.nav-item-highlight { margin: 20px 20px 0; transform: translateX(-100%); opacity: 0; animation: slide-in 0.5s forwards; }
.nav-item-highlight a { background-color: var(--primary-red); color: var(--light-text); border-radius: 12px; padding: 18px 25px; font-weight: 700; justify-content: center; box-shadow: 0 4px 12px rgba(255, 0, 0, 0.3); transition: background-color 0.3s, transform 0.2s; }
.nav-item-highlight a:hover { background-color: var(--hover-red); transform: translateY(-2px); }
.nav-item-highlight a .nav-icon { margin-right: 15px; fill: var(--light-text); }
</style>