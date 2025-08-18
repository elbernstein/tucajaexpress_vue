import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // --- CONFIGURACIÓN DEL SERVIDOR DE DESARROLLO ---
  server: {
    // Configuración del proxy para redirigir las peticiones de la API
    proxy: {
      // Cualquier petición que haga tu aplicación Vue a una URL que empiece por '/api'
      // (Ejemplo: apiClient.get('/api/admin/prizes')) será interceptada por esta regla.
      '/api': {
        
        // La petición interceptada será redirigida a tu servidor de backend Node.js
        // que está corriendo en http://localhost:5000
        target: 'http://localhost:5000',
        
        // Es necesario para que el servidor de destino no rechace la petición
        // por problemas de origen (CORS).
        changeOrigin: true,

        // No necesitamos reescribir la ruta, porque enviaremos la URL completa '/api/...'
        // y nuestro backend en Express está esperando exactamente esa ruta.
      }
    }
  }
})