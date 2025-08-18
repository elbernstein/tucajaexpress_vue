import axios from 'axios';

// 1. Creamos una instancia de axios.
const apiClient = axios.create({
  // MUY IMPORTANTE: La baseURL se deja vacía.
  // Esto fuerza a que todas las peticiones usen URLs relativas al dominio actual,
  // lo cual es perfecto tanto para el proxy de desarrollo como para el despliegue en producción.
  // baseURL: '' // O simplemente se omite la propiedad
});


// 2. Creamos un "interceptor" de peticiones.
// Esta función se ejecutará AUTOMÁTICAMENTE ANTES de que CADA petición sea enviada.
apiClient.interceptors.request.use(
  (config) => {
    // Busca la información del usuario en el localStorage del navegador.
    const userInfo = localStorage.getItem('userInfo');
    
    // Si encuentra la información del usuario...
    if (userInfo) {
      // ... extrae el token y lo añade a la cabecera (header) 'Authorization'.
      // Todas tus rutas protegidas en el backend buscarán esta cabecera.
      config.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
    }
    
    // Devuelve la configuración modificada para que la petición continúe.
    return config;
  },
  (error) => {
    // Si hay un error al preparar la petición, lo rechazamos.
    return Promise.reject(error);
  }
);

// 3. Exportamos la instancia configurada para usarla en nuestros componentes.
export default apiClient;