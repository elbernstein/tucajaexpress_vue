import axios from 'axios';

// Creamos una instancia de axios con configuración por defecto
const apiClient = axios.create({
    // La URL base para todas las peticiones
    baseURL: '/api' 
});

// OPCIONAL PERO MUY RECOMENDADO: Interceptor
// Esto es un "guardián" que se ejecuta ANTES de cada petición.
// Su trabajo es coger el token del localStorage y añadirlo a los headers.
apiClient.interceptors.request.use((config) => {
    // Busca la información del usuario en el localStorage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        // Si existe, añade el header de autorización a la petición
        config.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export default apiClient;