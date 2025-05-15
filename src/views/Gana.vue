<template>
  <div class="agent-application-page-v2">
    <section class="application-hero-v2">
      <div class="hero-overlay-v2"></div>
      <div class="hero-content-v2 container">
        <h1 class="hero-title-v2">Únete como <span class="highlight-v2">Agente Logístico</span> Asociado</h1>
        <p class="hero-subtitle-v2">Expande tu negocio y genera ingresos extra con nuestra red de envíos.</p>
        <div class="hero-cta-v2">
          <a href="#application-form" class="cta-button-v2 scroll-to-form">
            <i class="fas fa-rocket"></i> Iniciar Aplicación
          </a>
        </div>
      </div>
    </section>

    <section class="benefits-section-v2 section-padding-v2">
       <div class="container">
         <div class="section-header-v2">
           <span class="section-tagline-v2">Ventajas Clave</span>
           <h2 class="section-title-v2">¿Por Qué Ser Nuestro Agente?</h2>
         </div>
         <div class="benefits-grid-v2">
            <div class="benefit-card-v2">
                <div class="benefit-icon-v2"><i class="fas fa-dollar-sign"></i></div>
                <h3 class="benefit-title-v2">Nuevos Ingresos</h3>
                <p class="benefit-description-v2">Obtén comisiones atractivas por cada paquete gestionado.</p>
            </div>
            <div class="benefit-card-v2">
                <div class="benefit-icon-v2"><i class="fas fa-map-marker-alt"></i></div>
                <h3 class="benefit-title-v2">Más Tráfico Local</h3>
                <p class="benefit-description-v2">Atrae clientes a tu local que buscan nuestros servicios.</p>
            </div>
            <div class="benefit-card-v2">
                <div class="benefit-icon-v2"><i class="fas fa-headset"></i></div>
                <h3 class="benefit-title-v2">Soporte Dedicado</h3>
                <p class="benefit-description-v2">Te brindamos capacitación, herramientas y asistencia continua.</p>
            </div>
            <div class="benefit-card-v2">
                <div class="benefit-icon-v2"><i class="fas fa-handshake"></i></div>
                <h3 class="benefit-title-v2">Asociación Fácil</h3>
                <p class="benefit-description-v2">Integración simple, sin inventarios complicados ni grandes inversiones.</p>
            </div>
         </div>
       </div>
     </section>

    <section class="how-it-works-v2 section-padding-v2 bg-light-v2">
       <div class="container">
         <div class="section-header-v2">
           <span class="section-tagline-v2">Paso a Paso</span>
           <h2 class="section-title-v2">El Proceso para Unirte</h2>
         </div>
         <div class="process-timeline-v2">
            <div class="timeline-item-v2">
                <div class="timeline-icon-v2"><i class="fas fa-file-alt"></i></div>
                <div class="timeline-content-v2">
                <span class="timeline-step-v2">Paso 1</span>
                <h3 class="timeline-title-v2">Completa la Solicitud</h3>
                <p class="timeline-description-v2">Llena nuestro formulario en línea con los datos de tu negocio.</p>
                </div>
            </div>
            <div class="timeline-item-v2">
                <div class="timeline-icon-v2"><i class="fas fa-search"></i></div>
                <div class="timeline-content-v2">
                <span class="timeline-step-v2">Paso 2</span>
                <h3 class="timeline-title-v2">Evaluación Rápida</h3>
                <p class="timeline-description-v2">Revisamos tu perfil y te contactamos en pocos días hábiles.</p>
                </div>
            </div>
            <div class="timeline-item-v2">
                <div class="timeline-icon-v2"><i class="fas fa-chalkboard-teacher"></i></div>
                <div class="timeline-content-v2">
                <span class="timeline-step-v2">Paso 3</span>
                <h3 class="timeline-title-v2">Capacitación Inicial</h3>
                <p class="timeline-description-v2">Te entrenamos en nuestros sistemas y buenas prácticas.</p>
                </div>
            </div>
            <div class="timeline-item-v2">
                <div class="timeline-icon-v2"><i class="fas fa-flag-checkered"></i></div>
                <div class="timeline-content-v2">
                <span class="timeline-step-v2">Paso 4</span>
                <h3 class="timeline-title-v2">¡Listo para Empezar!</h3>
                <p class="timeline-description-v2">Recibes tu kit de bienvenida y empiezas a operar.</p>
                </div>
            </div>
         </div>
       </div>
     </section>
         <section class="agencies-slider-section section-padding-v2 bg-light-v2">
      <div class="container">
        <div class="section-header-v2">
          <span class="section-tagline-v2">Nuestra Red en Crecimiento</span>
          <h2 class="section-title-v2">Conoce Nuestras Agencias</h2>
          <p class="section-subtitle-v2">Una muestra de los negocios que ya confían en nosotros.</p>
        </div>

        <div class="swiper agencies-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide agency-slide" v-for="agency in agencies" :key="agency.id">
              <img :src="agency.imageUrl" :alt="agency.name">
              <div class="agency-slide-caption">{{ agency.name }} - {{ agency.location }}</div>
            </div>
          </div>

          <div class="swiper-button-prev agency-swiper-prev"></div>
          <div class="swiper-button-next agency-swiper-next"></div>

          <div class="swiper-pagination agency-swiper-pagination"></div>
        </div>
      </div>
    </section>

    <section id="application-form" class="application-form-section-v2 section-padding-v2">
       <div class="container">
          <div class="section-header-v2">
           <span class="section-tagline-v2">Da el Primer Paso</span>
           <h2 class="section-title-v2">Formulario de Aplicación</h2>
         </div>
         <div class="form-container-v2">
           <form @submit.prevent="submitApplication" class="agent-application-form-v2">
              <p class="form-intro-v2">Completa todos los campos requeridos (*) para evaluar tu solicitud.</p>
             <div class="form-grid-v2">
                <div class="form-group-v2">
                    <label for="business-name">Nombre del Negocio*</label>
                    <input type="text" id="business-name" v-model="form.businessName" required placeholder="Ej: Mi Tienda Local">
                </div>
                <div class="form-group-v2">
                    <label for="business-type">Tipo de Negocio*</label>
                    <select id="business-type" v-model="form.businessType" required>
                    <option value="" disabled>Selecciona uno...</option>
                    <option value="tienda">Tienda de Abarrotes</option>
                    <option value="restaurante">Restaurante</option>
                    <option value="servicios">Servicios (Lavandería, etc.)</option>
                    <option value="otros">Otros</option>
                    </select>
                </div>
                <div class="form-group-v2">
                    <label for="contact-name">Nombre del Contacto*</label>
                    <input type="text" id="contact-name" v-model="form.contactName" required placeholder="Tu nombre completo">
                </div>
                <div class="form-group-v2">
                    <label for="phone">Teléfono*</label>
                    <input type="tel" id="phone" v-model="form.phone" required placeholder="(+Código) Número">
                </div>
                <div class="form-group-v2">
                    <label for="email">Correo Electrónico*</label>
                    <input type="email" id="email" v-model="form.email" required placeholder="tu@correo.com">
                </div>
                <div class="form-group-v2">
                    <label for="years-in-business">Años en Operación*</label>
                    <input type="number" id="years-in-business" v-model.number="form.yearsInBusiness" min="0" required placeholder="0">
                </div>
                <div class="form-group-v2 full-span-v2">
                    <label for="address">Dirección Completa del Negocio*</label>
                    <input type="text" id="address" v-model="form.address" required placeholder="Calle, Número, Colonia/Barrio">
                </div>
                <div class="form-group-v2">
                    <label for="city">Ciudad*</label>
                    <input type="text" id="city" v-model="form.city" required>
                </div>
                <div class="form-group-v2">
                    <label for="state">Estado/Departamento*</label>
                    <input type="text" id="state" v-model="form.state" required>
                </div>
                <div class="form-group-v2">
                    <label for="zip">Código Postal*</label>
                    <input type="text" id="zip" v-model="form.zip" required>
                </div>
                <div class="form-group-v2 full-span-v2">
                    <label for="why-join">¿Por qué quieres unirte a nuestra red?*</label>
                    <textarea id="why-join" v-model="form.whyJoin" rows="4" required placeholder="Describe brevemente tu interés..."></textarea>
                </div>
                <div class="form-group-v2 full-span-v2">
                    <label for="additional-info">Información Adicional (Opcional)</label>
                    <textarea id="additional-info" v-model="form.additionalInfo" rows="3" placeholder="¿Algo más que debamos saber?"></textarea>
                </div>
             </div>

             <div class="form-footer-v2">
                <p class="form-disclaimer-v2">
                 Al enviar, aceptas nuestros <a href="/terminos" target="_blank">Términos</a> y <a href="/privacidad" target="_blank">Política de Privacidad</a>.
               </p>
               <button type="submit" class="submit-button-v2">
                 <i class="fas fa-paper-plane"></i> Enviar Mi Solicitud
               </button>
             </div>
           </form>
         </div>
       </div>
     </section>

     <section class="testimonials-section-v2 section-padding-v2 bg-light-v2">
        <div class="container">
         <div class="section-header-v2">
           <span class="section-tagline-v2">Voces de Éxito</span>
           <h2 class="section-title-v2">La Experiencia de Nuestros Agentes</h2>
         </div>
          <div class="testimonials-grid-v2">
             <div class="testimonial-card-v2">
             <div class="testimonial-content-v2">
               <p class="testimonial-text-v2">"Desde que somos agentes, las ventas cruzadas en nuestra tienda han subido notablemente. ¡Muy recomendado!"</p>
             </div>
             <div class="testimonial-author-v2">
               <img src="/images/testimonial-1.jpg" alt="Carlos M." class="author-image-v2">
               <div class="author-info-v2">
                 <h4 class="author-name-v2">Carlos M.</h4>
                 <p class="author-location-v2">Tienda La Mexicana, Houston TX</p>
               </div>
             </div>
           </div>
           <div class="testimonial-card-v2">
             <div class="testimonial-content-v2">
               <p class="testimonial-text-v2">"El soporte técnico es rápido y eficiente. La plataforma es fácil de usar. Ser agente nos ha traído muchos clientes nuevos."</p>
             </div>
             <div class="testimonial-author-v2">
               <img src="/images/testimonial-2.jpg" alt="Andrés G." class="author-image-v2">
               <div class="author-info-v2">
                 <h4 class="author-name-v2">Andrés G.</h4>
                 <p class="author-location-v2">Mercadito Centroamericano, Los Angeles CA</p>
               </div>
             </div>
           </div>
          </div>
        </div>
      </section>

     <section class="faq-section-v2 section-padding-v2">
       <div class="container">
         <div class="section-header-v2">
           <span class="section-tagline-v2">Resolvemos tus Dudas</span>
           <h2 class="section-title-v2">Preguntas Frecuentes</h2>
         </div>
         <div class="faq-accordion-v2">
             <div class="faq-item-v2" v-for="(faq, index) in faqs" :key="index" @click="toggleFaq(index)">
                <div class="faq-question-v2">
                <h3>{{ faq.question }}</h3>
                <div class="faq-icon-v2">
                    <i class="fas" :class="faq.open ? 'fa-minus' : 'fa-plus'"></i>
                </div>
                </div>
                <div class="faq-answer-v2" :class="{ 'open': faq.open }">
                <p>{{ faq.answer }}</p>
                </div>
            </div>
         </div>
       </div>
     </section>

     <section class="final-cta-section-v2">
       <div class="container">
         <div class="cta-content-v2">
           <h2 class="cta-title-v2">¿Preparado para Crecer con Nosotros?</h2>
           <p class="cta-text-v2">No esperes más. Envía tu solicitud y forma parte de nuestra exitosa red de agentes.</p>
           <a href="#application-form" class="cta-button-v2 scroll-to-form">
             <i class="fas fa-pen-alt"></i> Aplicar Ahora Mismo
           </a>
         </div>
       </div>
     </section>

  </div>
</template>

<script>
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Importa módulos que usarás

// 2. IMPORTA LOS ESTILOS DE SWIPER (Usualmente aquí o en main.js)
import 'swiper/swiper-bundle.css'; // O los específicos: 'swiper/css', 'swiper/css/navigation', etc.

export default {
  name: 'AgentApplicationV2', // Nombre actualizado
  data() {
    return {
      form: {
        businessName: '',
        businessType: '',
        contactName: '',
        phone: '',
        email: '',
        yearsInBusiness: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        whyJoin: '',
        additionalInfo: ''
      },
      faqs: [
        { question: '¿Cuáles son los requisitos para ser agente?', answer: 'Necesitas tener un negocio establecido con local físico, identificación válida y estar dispuesto a cumplir con nuestros estándares de servicio.', open: false },
        { question: '¿Cuánto cuesta unirse al programa?', answer: 'El costo de inicio es mínimo y depende del paquete que elijas. Contáctanos para más detalles sobre nuestras opciones.', open: false },
        { question: '¿Qué tipo de capacitación recibiré?', answer: 'Proporcionamos entrenamiento completo sobre nuestros sistemas, procesos de empaque, manejo de envíos y atención al cliente.', open: false },
        { question: '¿Cómo y cuándo recibo mis comisiones?', answer: 'Las comisiones se pagan semanalmente o quincenalmente, dependiendo del volumen, mediante transferencia bancaria o cheque.', open: false },
        { question: '¿Necesito tener experiencia previa en logística?', answer: 'No es necesario. Nuestro programa de capacitación está diseñado para que cualquier dueño de negocio pueda operar exitosamente como agente.', open: false }
      ],
            agencies: [
        { id: 1, name: 'Tienda La Bendición', location: 'Miami, FL', imageUrl: '/images/agencias/agencia-1.jpg' },
        { id: 2, name: 'Supermercado El Sol', location: 'Queens, NY', imageUrl: '/images/agencias/agencia-2.jpg' },
        { id: 3, name: 'Restaurante Mi Tierra', location: 'Chicago, IL', imageUrl: '/images/agencias/agencia-3.jpg' },
        { id: 4, name: 'Servicios Rápidos', location: 'Los Angeles, CA', imageUrl: '/images/agencias/agencia-4.jpg' },
        { id: 5, name: 'Bodega Don José', location: 'Houston, TX', imageUrl: '/images/agencias/agencia-5.jpg' },
        // Añade más agencias según necesites
      ],

      // 4. VARIABLE PARA GUARDAR LA INSTANCIA DE SWIPER (opcional pero buena práctica)
      agenciesSwiperInstance: null
    }
  },
  methods: {
    submitApplication() {
      console.log('Formulario enviado (V2):', this.form);
       // Aquí iría la lógica real de envío (API call, etc.)
       alert('Solicitud enviada con éxito (simulación)');
       // Podrías limpiar el formulario o mostrar un mensaje más elaborado
    },
    toggleFaq(index) {
       // Cierra todas las demás antes de abrir la actual (opcional)
       this.faqs.forEach((faq, i) => {
         if (i !== index) {
           faq.open = false;
         }
       });
      this.faqs[index].open = !this.faqs[index].open;
    },
    
    // 5. MÉTODO PARA INICIALIZAR SWIPER
    initAgenciesSlider() {
      this.agenciesSwiperInstance = new Swiper('.agencies-swiper', {
        // Usa los módulos importados
        modules: [Navigation, Pagination, Autoplay],

        // Opciones del Slider (ejemplos)
        loop: true, // Para que sea infinito
        slidesPerView: 1, // Imágenes visibles en móvil
        spaceBetween: 20, // Espacio entre slides
        autoplay: {
          delay: 4000, // Tiempo entre slides (ms)
          disableOnInteraction: false, // No parar al interactuar
        },
        pagination: {
          el: '.agency-swiper-pagination', // Selector de la paginación
          clickable: true, // Permite hacer clic en los puntos
        },
        navigation: {
          nextEl: '.agency-swiper-next', // Selector botón siguiente
          prevEl: '.agency-swiper-prev', // Selector botón anterior
        },
        // Breakpoints para responsive
        breakpoints: {
          // >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // >= 1024px
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }
      });
    }
  },
  mounted() {
    // Smooth scroll para los enlaces internos (igual que antes)
    document.querySelectorAll('.scroll-to-form').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Asegura que el inicio de la sección sea visible
            });
        }
      });
    });
   // 6. LLAMA AL MÉTODO DE INICIALIZACIÓN CUANDO EL COMPONENTE ESTÉ MONTADO
    this.$nextTick(() => {
        this.initAgenciesSlider();
    });
  },
  // 7. DESTRUYE LA INSTANCIA AL DESMONTAR (BUENA PRÁCTICA)
  beforeUnmount() {
    if (this.agenciesSwiperInstance) {
      this.agenciesSwiperInstance.destroy(true, true);
      this.agenciesSwiperInstance = null;
    }
  }
}
</script>

<style scoped>
/* --- Estilos Nueva Sección: Slider de Agencias --- */
.agencies-slider-section .section-subtitle-v2 {
  max-width: 600px;
  margin: 0 auto 3rem auto; /* Centrar y añadir espacio debajo */
  color: var(--text-muted-v2);
  font-size: 1.05rem;
}

.agencies-swiper {
  width: 100%;
  padding-bottom: 40px; /* Espacio para paginación */
}

.agency-slide {
  background-color: var(--white-color-v2);
  border-radius: 10px;
  overflow: hidden; /* Asegura que la imagen no se salga */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 280px; /* Altura fija para las tarjetas del slide */
  display: flex; /* Para controlar imagen y caption */
  flex-direction: column;
}

.agency-slide:hover {
   transform: translateY(-5px);
   box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.agency-slide img {
  display: block;
  width: 100%;
  height: 75%; /* Ocupa la mayor parte de la tarjeta */
  object-fit: cover; /* Asegura que la imagen cubra sin deformarse */
}

.agency-slide-caption {
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color-v2);
  text-align: center;
  background-color: var(--white-color-v2);
  border-top: 1px solid var(--light-color-v2);
  flex-grow: 1; /* Ocupa el espacio restante */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Estilos para Navegación y Paginación (ajusta colores a tu tema) */
:deep(.agencies-swiper .swiper-button-prev), /* :deep para estilos de Swiper */
:deep(.agencies-swiper .swiper-button-next) {
  color: var(--primary-color-v2); /* Color Teal */
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: background-color 0.3s, color 0.3s;
}
:deep(.agencies-swiper .swiper-button-prev::after),
:deep(.agencies-swiper .swiper-button-next::after) {
  font-size: 1.2rem; /* Tamaño de las flechas */
  font-weight: bold;
}

:deep(.agencies-swiper .swiper-button-prev:hover),
:deep(.agencies-swiper .swiper-button-next:hover) {
    background-color: var(--primary-color-v2);
    color: var(--white-color-v2);
}


:deep(.agencies-swiper .swiper-pagination-bullet) {
  background-color: var(--primary-color-v2);
  opacity: 0.5;
  transition: opacity 0.3s, background-color 0.3s;
}

:deep(.agencies-swiper .swiper-pagination-bullet-active) {
  background-color: var(--secondary-color-v2); /* Verde para el activo */
  opacity: 1;
}

/* Ocultar flechas en móvil si se prefiere */
@media (max-width: 768px) {
  :deep(.agencies-swiper .swiper-button-prev),
  :deep(.agencies-swiper .swiper-button-next) {
    display: none;
  }
  .agency-slide {
      height: 250px; /* Un poco más bajo en móvil */
  }
}
/* --- Estilos Generales V2 --- */
:root {
  --primary-color-v2: #0D9488; /* Teal */
  --secondary-color-v2: #10B981; /* Green */
  --dark-color-v2: #1F2937; /* Dark Gray */
  --light-color-v2: #F3F4F6; /* Light Gray */
  --text-color-v2: #374151; /* Medium Gray */
  --text-muted-v2: #6B7280; /* Gray */
  --white-color-v2: #FFFFFF;
  --border-color-v2: #D1D5DB;
  --section-padding-v2: 6rem 0;
}

.agent-application-page-v2 {
  font-family: 'Inter', sans-serif; /* Asegúrate de importar esta fuente si no la tienes global */
  color: var(--text-color-v2);
  line-height: 1.6;
  background-color: var(--white-color-v2); /* Fondo base */
}

.section-padding-v2 { padding: var(--section-padding-v2); }
.bg-light-v2 { background-color: var(--light-color-v2); }
.container { width: 100%; max-width: 1140px; margin: 0 auto; padding: 0 1rem; }
.section-header-v2 { text-align: center; margin-bottom: 4rem; }
.section-tagline-v2 { display: inline-block; color: var(--primary-color-v2); font-weight: 600; margin-bottom: 1rem; text-transform: uppercase; font-size: 0.875rem; letter-spacing: 1.5px; }
.section-title-v2 { font-size: 2.5rem; font-weight: 700; color: var(--dark-color-v2); margin-bottom: 1rem; line-height: 1.2; }

/* --- Hero Section V2 (Altura Fija Corregida) --- */
.application-hero-v2 {
  position: relative;
  width: 100%;
  height: 500px; /* <<< ALTURA FIJA DEFINIDA <<< */
  background-image: url('/images/gana.png'); /* Cambia por tu imagen real */
  background-size: cover;
  background-position: center center;
  color: var(--white-color-v2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden; /* Evita desbordes si algo falla */
}

.hero-overlay-v2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Cubre la altura fija del padre */
  background: linear-gradient(rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.8));
  z-index: 1;
}

.hero-content-v2 {
  position: relative; /* Para estar sobre el overlay */
  z-index: 2;
  max-width: 800px;
  padding: 2rem;
}

.hero-title-v2 {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: #ffffff;
}

.highlight-v2 {
  color: var(--secondary-color-v2);
}

.hero-subtitle-v2 {
  font-size: clamp(1rem, 3vw, 1.25rem);
  margin-bottom: 2rem;
  max-width: 600px;
  opacity: 0.9;
}

.cta-button-v2 {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 2rem;
  background-color: var(--secondary-color-v2);
  color: var(--white-color-v2);
  border: none;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
}

.cta-button-v2:hover {
  background-color: #059669;
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
}

.cta-button-v2 i { font-size: 1.1em; }

/* --- Benefits Section V2 --- */
.benefits-grid-v2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem; }
.benefit-card-v2 { background: var(--white-color-v2); padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color-v2); text-align: center; transition: all 0.3s ease; border-top: 4px solid var(--primary-color-v2); }
.benefit-card-v2:hover { transform: translateY(-8px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08); border-top-color: var(--secondary-color-v2); }
.benefit-icon-v2 { font-size: 2.5rem; color: var(--primary-color-v2); margin-bottom: 1.5rem; transition: color 0.3s ease; }
.benefit-card-v2:hover .benefit-icon-v2 { color: var(--secondary-color-v2); }
.benefit-title-v2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--dark-color-v2); }
.benefit-description-v2 { color: var(--text-muted-v2); font-size: 0.95rem; }

/* --- How It Works V2 (Timeline) --- */
.process-timeline-v2 { position: relative; max-width: 700px; margin: 0 auto; padding: 2rem 0; }
.process-timeline-v2::before { content: ''; position: absolute; top: 0; bottom: 0; left: 30px; width: 3px; background-color: var(--border-color-v2); z-index: 1; }
.timeline-item-v2 { position: relative; margin-bottom: 3rem; padding-left: 70px; z-index: 2; }
.timeline-item-v2:last-child { margin-bottom: 0; }
.timeline-icon-v2 { position: absolute; left: 0; top: 0; width: 60px; height: 60px; border-radius: 50%; background-color: var(--primary-color-v2); color: var(--white-color-v2); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; border: 4px solid var(--light-color-v2); z-index: 3; transition: background-color 0.3s ease; }
.timeline-item-v2:hover .timeline-icon-v2 { background-color: var(--secondary-color-v2); }
.timeline-content-v2 { background: var(--white-color-v2); padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06); border: 1px solid var(--border-color-v2); }
.timeline-step-v2 { display: inline-block; background-color: var(--primary-color-v2); color: var(--white-color-v2); font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 4px; font-weight: 600; margin-bottom: 0.75rem; text-transform: uppercase; }
.timeline-title-v2 { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--dark-color-v2); }
.timeline-description-v2 { color: var(--text-muted-v2); font-size: 0.95rem; }

/* --- Application Form V2 --- */
.application-form-section-v2 { background-color: var(--white-color-v2); }
.form-container-v2 { max-width: 900px; margin: 0 auto; background: var(--white-color-v2); border-radius: 12px; padding: 2.5rem; border: 1px solid var(--border-color-v2); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05); }
.form-intro-v2 { text-align: center; color: var(--text-muted-v2); margin-bottom: 2rem; font-size: 0.95rem; }
.agent-application-form-v2 { display: flex; flex-direction: column; }
.form-grid-v2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem; }
.form-group-v2 { display: flex; flex-direction: column; }
.form-group-v2.full-span-v2 { grid-column: 1 / -1; }
.form-group-v2 label { margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem; color: var(--text-color-v2); }
.form-group-v2 input, .form-group-v2 select, .form-group-v2 textarea { width: 100%; padding: 0.8rem 1rem; border: 1px solid var(--border-color-v2); border-radius: 8px; font-size: 1rem; background-color: var(--light-color-v2); color: var(--text-color-v2); transition: border-color 0.3s, box-shadow 0.3s; }
.form-group-v2 input::placeholder, .form-group-v2 textarea::placeholder { color: var(--text-muted-v2); opacity: 0.8; }
.form-group-v2 input:focus, .form-group-v2 select:focus, .form-group-v2 textarea:focus { outline: none; border-color: var(--primary-color-v2); background-color: var(--white-color-v2); box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.2); }
.form-group-v2 textarea { min-height: 120px; resize: vertical; }
.form-footer-v2 { margin-top: 2rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.submit-button-v2 { display: inline-flex; align-items: center; gap: 0.75rem; padding: 0.9rem 2.5rem; background-color: var(--primary-color-v2); color: var(--white-color-v2); border: none; border-radius: 50px; font-weight: 600; font-size: 1.05rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(13, 148, 136, 0.2); }
.submit-button-v2:hover { background-color: #0F766E; transform: translateY(-3px) scale(1.03); box-shadow: 0 6px 20px rgba(13, 148, 136, 0.3); }
.form-disclaimer-v2 { color: var(--text-muted-v2); font-size: 0.85rem; text-align: center; max-width: 500px; }
.form-disclaimer-v2 a { color: var(--primary-color-v2); text-decoration: none; font-weight: 500; }
.form-disclaimer-v2 a:hover { text-decoration: underline; }

/* --- Testimonials Section V2 --- */
.testimonials-grid-v2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.testimonial-card-v2 { background: var(--white-color-v2); border-radius: 12px; padding: 2rem; border: 1px solid var(--border-color-v2); display: flex; flex-direction: column; justify-content: space-between; min-height: 220px; position: relative; overflow: hidden; }
.testimonial-card-v2::before { content: '\f10d'; font-family: 'Font Awesome 5 Free'; font-weight: 900; position: absolute; top: 1rem; left: 1rem; font-size: 4rem; color: var(--primary-color-v2); opacity: 0.08; z-index: 1; }
.testimonial-content-v2 { position: relative; z-index: 2; margin-bottom: 1.5rem; }
.testimonial-text-v2 { font-size: 1.05rem; line-height: 1.7; color: var(--text-color-v2); }
.testimonial-author-v2 { display: flex; align-items: center; margin-top: auto; position: relative; z-index: 2; padding-top: 1rem; border-top: 1px solid var(--light-color-v2); }
.author-image-v2 { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-right: 1rem; border: 2px solid var(--primary-color-v2); } /* Estilo si pones imagen */
.author-name-v2 { font-size: 1rem; font-weight: 600; margin-bottom: 0.2rem; color: var(--dark-color-v2); }
.author-location-v2 { color: var(--text-muted-v2); font-size: 0.85rem; }

/* --- FAQ Section V2 --- */
.faq-accordion-v2 { max-width: 800px; margin: 0 auto; }
.faq-item-v2 { margin-bottom: 1rem; border: 1px solid var(--border-color-v2); border-radius: 8px; overflow: hidden; background-color: var(--white-color-v2); }
.faq-question-v2 { padding: 1.25rem 1.5rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background-color 0.2s ease; }
.faq-question-v2:hover { background-color: var(--light-color-v2); }
.faq-question-v2 h3 { font-size: 1.05rem; font-weight: 500; color: var(--dark-color-v2); margin: 0; }
.faq-icon-v2 { color: var(--primary-color-v2); font-size: 1rem; transition: transform 0.3s ease; }
.faq-answer-v2 { max-height: 0; overflow: hidden; transition: max-height 0.4s ease-out, padding 0.4s ease-out; padding: 0 1.5rem; }
.faq-answer-v2.open { max-height: 300px; padding: 0.5rem 1.5rem 1.5rem; }
.faq-answer-v2 p { margin: 0; color: var(--text-muted-v2); font-size: 0.95rem; line-height: 1.7; border-top: 1px solid var(--light-color-v2); padding-top: 1rem; }
/* Dinámicamente cambia el ícono usando :before si es necesario, o con la clase como está */
.faq-item-v2 .faq-icon-v2 i.fa-plus::before { content: "\f067"; }
.faq-item-v2 .faq-icon-v2 i.fa-minus::before { content: "\f068"; }


/* --- Final CTA V2 --- */
.final-cta-section-v2 { background-color: var(--dark-color-v2); color: var(--white-color-v2); padding: var(--section-padding-v2); text-align: center; }
.cta-content-v2 { max-width: 700px; margin: 0 auto; }
.cta-title-v2 { font-size: 2.2rem; font-weight: 700; margin-bottom: 1rem; }
.cta-text-v2 { font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.8; }

/* --- Responsive Styles V2 --- */
@media (max-width: 992px) {
  .section-title-v2 { font-size: 2rem; }
  .process-timeline-v2::before { left: 30px; }
  .timeline-item-v2 { padding-left: 70px; }
  .testimonials-grid-v2 { grid-template-columns: 1fr; }
  .application-hero-v2 { height: 450px; } /* Altura reducida para tablet */
}

@media (max-width: 768px) {
  :root { --section-padding-v2: 4rem 0; }
  .section-title-v2 { font-size: 1.8rem; }
  .form-grid-v2 { grid-template-columns: 1fr; }
  .form-group-v2.full-span-v2 { grid-column: auto; }
  .process-timeline-v2::before { left: 25px; }
  .timeline-icon-v2 { width: 50px; height: 50px; font-size: 1.2rem; left:0; }
  .timeline-item-v2 { padding-left: 65px; }
  .application-hero-v2 { height: 400px; } /* Altura reducida para móvil */
}

@media (max-width: 576px) {
  :root { --section-padding-v2: 3rem 0; }
  .hero-content-v2 { padding: 1rem; }
  .cta-button-v2, .submit-button-v2 { width: 100%; justify-content: center; padding: 0.8rem 1rem; }
  .form-container-v2 { padding: 1.5rem; }
  .faq-question-v2 h3 { font-size: 0.95rem; }
  .process-timeline-v2::before { left: 20px; }
  .timeline-icon-v2 { width: 40px; height: 40px; font-size: 1rem; left: 0; }
  .timeline-item-v2 { padding-left: 55px; }
  .application-hero-v2 { height: 350px; } /* Altura reducida para móvil pequeño */
}

</style>