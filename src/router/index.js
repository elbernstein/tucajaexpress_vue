// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '@/views/Home.vue'
import Contactanos from '@/views/Contactanos.vue'
import { path } from 'd3'
import Paises from '../views/Paises.vue'
import Mexico from '../components/coverage/Mexico.vue'
import Guatemala from '../components/coverage/Guatemala.vue'
import Conocenos from '../views/Conocenos.vue'
import Puerta from '../views/Puerta.vue'
import ElSalvador from '@/components/coverage/El-Salvador.vue'
import Honduras from '@/components/coverage/Honduras.vue'
import Nicaragua from '@/components/coverage/Nicaragua.vue'
import Rutas from '@/views/Rutas.vue'
import QuoteView from '@/views/QuoteView.vue'
import QuoteForm from '@/components/QuoteForm.vue'
import Gana from '@/views/Gana.vue'
import Calificanos from '@/views/Calificanos.vue'
import Politicas from '@/views/Politicas.vue'
import Privacidad from '@/views/Privacidad.vue'
import PromotionsView from '@/views/PromotionsView.vue'
import FormularioRecibo from '@/views/FormularioRecibo.vue'

const routes = [
  { path: '/', name: 'inicio', component: InicioView },
  { path: '/contactanos', name: 'Contactanos', component: Contactanos },
  { path: '/conocenos', name: 'Conocenos', component: Conocenos },
  { path: '/puerta-puerta', name: 'Puerta a Puerta', component: Puerta },
  { path: '/rutas', name: 'Rutas en EEUU', component: Rutas },
  { path: '/gana', name: 'Gana Dinero Con Nosotros', component: Gana },
  { path: '/calificanos', name: 'Calificanos', component: Calificanos },
  { path: '/politicas', name: 'Politicas', component: Politicas },
  { path: '/privacidad', name: 'Privacidad', component: Privacidad },

  {
    path: '/cotizar-form',
    name: 'QuoteForm',
    component: QuoteForm
  },
    {
    path: '/promociones', 
    name: 'Promociones',
    component: PromotionsView
  },
  {
    path: '/formulario-recibo',
    name: 'FormularioRecibo',
    component: FormularioRecibo
  },
  {
    path: '/cotizar',
    name: 'QuoteView',
    component: QuoteView
  },
  
  {
    path: '/tracking-results',
    name: 'tracking-results',
    component: () => import('../views/TrackingResults.vue'),
    props: (route) => ({
      query: route.query
    })
  },
    {
    path: '/paises',
    name: 'Paises',
    component: Paises,
    children: [
      {
        path: 'el-salvador',
        name: 'El Salvador',
        component: ElSalvador
      },
      {
        path: 'mexico',
        name: 'Mexico',
        component: Mexico
      },
      {
        path: 'guatemala',
        name: 'Guatemala',
        component: Guatemala
      },
      {
        path: 'honduras',
        name: 'Honduras',
        component: Honduras
      },
      {
        path: 'nicaragua',
        name: 'Nicaragua',
        component: Nicaragua
      },
      
      // Agregar más rutas para otros países
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Función para rastrear y enviar la visita al servidor de TuCaja2
async function rastrearVisitaWeb(toPath) {
    try {
        // 1. Detectar dispositivo (Móvil, Tablet o PC)
        const ua = navigator.userAgent;
        let dispositivo = 'Escritorio';
        if (/mobile/i.test(ua)) dispositivo = 'Movil';
        if (/tablet|ipad/i.test(ua)) dispositivo = 'Tablet';

        // 2. Obtener la página que visitó y de dónde viene
        const moduloVisitado = toPath || window.location.pathname; 
        const referrer = document.referrer || 'Directo';

        // 3. Obtener IP y Ubicación automáticamente (gratis y seguro)
        const responseGeo = await fetch('https://ipapi.co/json/');
        const geoData = await responseGeo.json();

        // 4. Preparar todos los datos para enviarlos
        const datosVisita = {
            ip: geoData.ip || 'Desconocida',
            ciudad: geoData.city || 'Desconocida',
            pais: geoData.country_name || 'Desconocido',
            modulo: moduloVisitado,
            referrer: referrer,
            dispositivo: dispositivo,
            userAgent: ua
        };

        // 5. Enviar la señal silenciosa a tu servidor
        // Apuntamos directo a producción como solicitaste
        const URL_BACKEND = 'https://sistematce.com/api/visitas_web'; 
        
        console.log(`📡 [Visitas Web] Preparando envío del reporte para la ruta: ${moduloVisitado}`);
        
        await fetch(URL_BACKEND, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosVisita)
        });
        
        console.log(`✅ [Visitas Web] Reporte enviado con éxito para: ${moduloVisitado}`);

    } catch (error) {
        console.error("Error silencioso al registrar la visita:", error);
    }
}

// Disparar el rastreo automáticamente cada vez que el cliente cambia de página
router.afterEach((to) => {
    // Usamos setTimeout corto para no bloquear la navegación visual
    setTimeout(() => {
        // to.fullPath captura también si buscaron una guía (ej: /tracking-results?guide=12345)
        rastrearVisitaWeb(to.fullPath);
    }, 100);
});

export default router
