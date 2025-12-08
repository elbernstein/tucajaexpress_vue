<template>
  <div class="agent-application-page-v2">
    <!-- Sección Hero (se mantiene igual) -->
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

    <!-- Sección Beneficios (se mantiene igual) -->
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

    <!-- Sección Cómo Funciona (se mantiene igual) -->
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


    <!-- NUEVA SECCIÓN DE FORMULARIO MEJORADA -->
    <section id="application-form" class="application-form-section-v2 section-padding-v2">
      <div class="container">
        <div class="section-header-v2">
          <span class="section-tagline-v2">Da el Primer Paso</span>
          <h2 class="section-title-v2">Únete a Nuestra Red</h2>
          <p class="section-subtitle-v2">Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas</p>
        </div>
        
        <div class="form-wrapper-v2">
          <div class="form-decoration-v2">
            <div class="decoration-circle-v2 circle-1"></div>
            <div class="decoration-circle-v2 circle-2"></div>
            <img src="/images/form-illustration.svg" alt="Ilustración formulario" class="form-illustration-v2">
          </div>
          
          <div class="form-container-v2">
            <form @submit.prevent="submitApplication" class="agent-application-form-v2">
              <div class="form-header-v2">
                <div class="form-progress-v2">
                  <div class="progress-step-v2 active">1</div>
                  <div class="progress-line-v2"></div>
                  <div class="progress-step-v2">2</div>
                  <div class="progress-line-v2"></div>
                  <div class="progress-step-v2">3</div>
                </div>
                <h3 class="form-step-title-v2">Información Básica</h3>
              </div>
              
              <div class="form-grid-v2">
                <div class="form-group-v2">
                  <label for="business-name">
                    <i class="fas fa-store"></i> Nombre del Negocio*
                  </label>
                  <input type="text" id="business-name" v-model="form.businessName" required placeholder="Ej: Mi Tienda Local">
                  <div class="input-icon-v2">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
                
                <div class="form-group-v2">
                  <label for="business-type">
                    <i class="fas fa-tags"></i> Tipo de Negocio*
                  </label>
                  <div class="custom-select-v2">
                    <select id="business-type" v-model="form.businessType" required>
                      <option value="" disabled selected>Selecciona tu tipo de negocio</option>
                      <option value="tienda">Tienda de Abarrotes</option>
                      <option value="restaurante">Restaurante/Café</option>
                      <option value="farmacia">Farmacia</option>
                      <option value="lavanderia">Lavandería</option>
                      <option value="otros">Otro tipo de negocio</option>
                    </select>
                    <div class="select-arrow-v2">
                      <i class="fas fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
                
                <div class="form-group-v2">
                  <label for="contact-name">
                    <i class="fas fa-user"></i> Nombre del Contacto*
                  </label>
                  <input type="text" id="contact-name" v-model="form.contactName" required placeholder="Tu nombre completo">
                  <div class="input-icon-v2">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
                
                <div class="form-group-v2">
                  <label for="phone">
                    <i class="fas fa-phone-alt"></i> Teléfono*
                  </label>
                  <input type="tel" id="phone" v-model="form.phone" required placeholder="Ej: +1 (555) 123-4567">
                  <div class="input-icon-v2">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
                
                <div class="form-group-v2">
                  <label for="email">
                    <i class="fas fa-envelope"></i> Correo Electrónico*
                  </label>
                  <input type="email" id="email" v-model="form.email" required placeholder="tu@negocio.com">
                  <div class="input-icon-v2">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
                
                <div class="form-group-v2">
                  <label for="years-in-business">
                    <i class="fas fa-calendar-alt"></i> Años en Operación*
                  </label>
                  <div class="range-input-v2">
                    <input type="range" id="years-in-business" v-model.number="form.yearsInBusiness" min="0" max="20" step="1" required>
                    <div class="range-value-v2">{{ form.yearsInBusiness }} {{ form.yearsInBusiness === 1 ? 'año' : 'años' }}</div>
                  </div>
                </div>
                
                <div class="form-group-v2 full-span-v2">
                  <label for="address">
                    <i class="fas fa-map-marker-alt"></i> Dirección Completa*
                  </label>
                  <input type="text" id="address" v-model="form.address" required placeholder="Calle, Número, Colonia/Barrio">
                  <div class="input-icon-v2">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
                
                <div class="form-group-v2">
                  <label for="city">
                    <i class="fas fa-city"></i> Ciudad*
                  </label>
                  <input type="text" id="city" v-model="form.city" required>
                  <div class="input-icon-v2">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
                
                <div class="form-group-v2">
                  <label for="state">
                    <i class="fas fa-map"></i> Estado/Departamento*
                  </label>
                  <input type="text" id="state" v-model="form.state" required>
                  <div class="input-icon-v2">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
                
                <div class="form-group-v2">
                  <label for="zip">
                    <i class="fas fa-mail-bulk"></i> Código Postal*
                  </label>
                  <input type="text" id="zip" v-model="form.zip" required>
                  <div class="input-icon-v2">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
                
                <div class="form-group-v2 full-span-v2">
                  <label for="why-join">
                    <i class="fas fa-question-circle"></i> ¿Por qué quieres unirte a nuestra red?*
                  </label>
                  <textarea id="why-join" v-model="form.whyJoin" rows="4" required placeholder="Describe brevemente tu interés en asociarte con nosotros..."></textarea>
                  <div class="char-counter-v2">{{ 250 - form.whyJoin.length }} caracteres restantes</div>
                </div>
                
                <div class="form-group-v2 full-span-v2">
                  <label for="additional-info">
                    <i class="fas fa-info-circle"></i> Información Adicional (Opcional)
                  </label>
                  <textarea id="additional-info" v-model="form.additionalInfo" rows="3" placeholder="Horarios de atención, servicios adicionales que ofreces, etc."></textarea>
                </div>
                
                <div class="form-group-v2 full-span-v2">
                  <div class="upload-area-v2" @click="triggerFileUpload" @dragover.prevent="dragOver" @drop.prevent="handleDrop">
                    <input type="file" id="business-photo" ref="fileInput" @change="handleFileUpload" style="display: none;" accept="image/*">
                    <div class="upload-content-v2">
                      <i class="fas fa-cloud-upload-alt"></i>
                      <h4>Sube una foto de tu negocio</h4>
                      <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
                      <div class="file-preview-v2" v-if="uploadedFile">
                        <img :src="uploadedFilePreview" alt="Vista previa">
                        <button @click.stop="removeFile" class="remove-file-v2">
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="form-group-v2 full-span-v2 terms-group-v2">
                  <input type="checkbox" id="terms" v-model="form.termsAccepted" required>
                  <label for="terms">
                    Acepto los <a href="/terminos" target="_blank">Términos y Condiciones</a> y la <a href="/privacidad" target="_blank">Política de Privacidad</a>*
                  </label>
                </div>
              </div>

              <div class="form-footer-v2">
                <button type="submit" class="submit-button-v2" :disabled="isSubmitting">
                  <span v-if="!isSubmitting">
                    <i class="fas fa-paper-plane"></i> Enviar Solicitud
                  </span>
                  <span v-else>
                    <i class="fas fa-spinner fa-spin"></i> Procesando...
                  </span>
                </button>
                
                <div class="form-security-v2">
                  <i class="fas fa-lock"></i>
                  <span>Tus datos están protegidos con encriptación SSL</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Testimonios (se mantiene igual) -->
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
                <p class="author-location-v2">Tienda La Mexicana, Charlotte NC</p>
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
                <p class="author-location-v2">Mercadito Centroamericano, Atlanta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección FAQ (se mantiene igual) -->
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

    <!-- Sección CTA Final (se mantiene igual) -->
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
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

export default {
  name: 'AgentApplicationV2',
  data() {
    return {
      form: {
        businessName: '',
        businessType: '',
        contactName: '',
        phone: '',
        email: '',
        yearsInBusiness: 1,
        address: '',
        city: '',
        state: '',
        zip: '',
        whyJoin: '',
        additionalInfo: '',
        termsAccepted: false
      },
      uploadedFile: null,
      uploadedFilePreview: null,
      isSubmitting: false,
      faqs: [
        { question: '¿Cuáles son los requisitos para ser agente?', answer: 'Necesitas tener un negocio establecido con local físico, identificación válida y estar dispuesto a cumplir con nuestros estándares de servicio.', open: false },
        { question: '¿Cuánto cuesta unirse al programa?', answer: 'El costo de inicio es mínimo y depende del paquete que elijas. Contáctanos para más detalles sobre nuestras opciones.', open: false },
        { question: '¿Qué tipo de capacitación recibiré?', answer: 'Proporcionamos entrenamiento completo sobre nuestros sistemas, procesos de empaque, manejo de envíos y atención al cliente.', open: false },
        { question: '¿Cómo y cuándo recibo mis comisiones?', answer: 'Las comisiones se pagan cuando tengas envios por recolectar, depende del tamano de la caja sera el monto de la comision.', open: false },
        { question: '¿Necesito tener experiencia previa en logística?', answer: 'No es necesario. Nuestro programa de capacitación está diseñado para que cualquier dueño de negocio pueda operar exitosamente como agente.', open: false }
      ],
      agencies: [
        { id: 1, name: 'Tienda La Bendición', location: 'Miami, FL', imageUrl: '/images/agencias/agencia-1.jpg' },
        { id: 2, name: 'Supermercado El Sol', location: 'Queens, NY', imageUrl: '/images/agencias/agencia-2.jpg' },
        { id: 3, name: 'Restaurante Mi Tierra', location: 'Chicago, IL', imageUrl: '/images/agencias/agencia-3.jpg' },
        { id: 4, name: 'Servicios Rápidos', location: 'Los Angeles, CA', imageUrl: '/images/agencias/agencia-4.jpg' },
        { id: 5, name: 'Bodega Don José', location: 'Houston, TX', imageUrl: '/images/agencias/agencia-5.jpg' },
      ],
      agenciesSwiperInstance: null
    }
  },
  methods: {
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadedFile = file;
        this.previewFile(file);
      }
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.match('image.*')) {
        this.uploadedFile = file;
        this.previewFile(file);
      }
    },
    dragOver(event) {
      event.currentTarget.classList.add('dragover');
    },
    previewFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedFilePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeFile() {
      this.uploadedFile = null;
      this.uploadedFilePreview = null;
      this.$refs.fileInput.value = '';
    },
    submitApplication() {
      this.isSubmitting = true;
      
      // Simulación de envío
      setTimeout(() => {
        console.log('Formulario enviado:', this.form);
        if (this.uploadedFile) {
          console.log('Archivo adjunto:', this.uploadedFile.name);
        }
        
        // Mostrar mensaje de éxito
        this.$swal({
          title: '¡Solicitud Enviada!',
          text: 'Hemos recibido tu aplicación. Nos pondremos en contacto contigo en menos de 24 horas.',
          icon: 'success',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#0D9488',
          backdrop: `
            rgba(13,148,136,0.4)
            url("/images/confetti.gif")
            center top
            no-repeat
          `
        });
        
        this.isSubmitting = false;
      }, 2000);
    },
    toggleFaq(index) {
      this.faqs.forEach((faq, i) => {
        if (i !== index) {
          faq.open = false;
        }
      });
      this.faqs[index].open = !this.faqs[index].open;
    },
    initAgenciesSlider() {
      this.agenciesSwiperInstance = new Swiper('.agencies-swiper', {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.agency-swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.agency-swiper-next',
          prevEl: '.agency-swiper-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }
      });
    }
  },
  mounted() {
    document.querySelectorAll('.scroll-to-form').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
      });
    });
    
    this.$nextTick(() => {
        this.initAgenciesSlider();
    });
  },
  beforeUnmount() {
    if (this.agenciesSwiperInstance) {
      this.agenciesSwiperInstance.destroy(true, true);
      this.agenciesSwiperInstance = null;
    }
  }
}
</script>

<style scoped>
/* --- Variables y Estilos Generales --- */
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
  font-family: 'Inter', sans-serif;
  color: var(--text-color-v2);
  line-height: 1.6;
  background-color: var(--white-color-v2);
}

.section-padding-v2 { padding: var(--section-padding-v2); }
.bg-light-v2 { background-color: var(--light-color-v2); }
.container { width: 100%; max-width: 1140px; margin: 0 auto; padding: 0 1rem; }
.section-header-v2 { text-align: center; margin-bottom: 4rem; }
.section-tagline-v2 { display: inline-block; color: var(--primary-color-v2); font-weight: 600; margin-bottom: 1rem; text-transform: uppercase; font-size: 0.875rem; letter-spacing: 1.5px; }
.section-title-v2 { font-size: 2.5rem; font-weight: 700; color: var(--dark-color-v2); margin-bottom: 1rem; line-height: 1.2; }

/* --- Hero Section --- */
.application-hero-v2 {
  position: relative;
  width: 100%;
  height: 500px;
  background-image: url('/images/gana.png');
  background-size: cover;
  background-position: center center;
  color: var(--white-color-v2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.hero-overlay-v2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.8));
  z-index: 1;
}

.hero-content-v2 {
  position: relative;
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

/* --- Benefits Section --- */
.benefits-grid-v2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem; }
.benefit-card-v2 { background: var(--white-color-v2); padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color-v2); text-align: center; transition: all 0.3s ease; border-top: 4px solid var(--primary-color-v2); }
.benefit-card-v2:hover { transform: translateY(-8px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08); border-top-color: var(--secondary-color-v2); }
.benefit-icon-v2 { font-size: 2.5rem; color: var(--primary-color-v2); margin-bottom: 1.5rem; transition: color 0.3s ease; }
.benefit-card-v2:hover .benefit-icon-v2 { color: var(--secondary-color-v2); }
.benefit-title-v2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--dark-color-v2); }
.benefit-description-v2 { color: var(--text-muted-v2); font-size: 0.95rem; }

/* --- How It Works (Timeline) --- */
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

/* --- Slider de Agencias --- */
.agencies-slider-section .section-subtitle-v2 {
  max-width: 600px;
  margin: 0 auto 3rem auto;
  color: var(--text-muted-v2);
  font-size: 1.05rem;
}

.agencies-swiper {
  width: 100%;
  padding-bottom: 40px;
}

.agency-slide {
  background-color: var(--white-color-v2);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 280px;
  display: flex;
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

/* --- Estilos para el Formulario Mejorado --- */
.application-form-section-v2 {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

.application-form-section-v2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/images/form-bg-pattern.png') repeat;
  opacity: 0.03;
  z-index: 0;
}

.section-subtitle-v2 {
  color: var(--text-muted-v2);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 2rem auto;
}

.form-wrapper-v2 {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

@media (min-width: 992px) {
  .form-wrapper-v2 {
    flex-direction: row;
    align-items: center;
    gap: 3rem;
  }
}

.form-decoration-v2 {
  display: none;
  position: relative;
  min-height: 400px;
}

@media (min-width: 992px) {
  .form-decoration-v2 {
    display: block;
  }
}

.decoration-circle-v2 {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -50px;
  left: -50px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -30px;
  right: -30px;
}

.form-illustration-v2 {
  position: absolute;
  width: 80%; /* Ajustado para hacer el icono más pequeño */
  max-width: 400px; /* Ajustado para hacer el icono más pequeño */
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.form-container-v2 {
  flex: 1;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.agent-application-form-v2 {
  padding: 2.5rem;
}

@media (max-width: 768px) {
  .agent-application-form-v2 {
    padding: 1.5rem;
  }
}

.form-header-v2 {
  margin-bottom: 2rem;
  text-align: center;
}

.form-progress-v2 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.progress-step-v2 {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.progress-step-v2.active {
  background-color: var(--primary-color-v2);
  color: white;
}

.progress-line-v2 {
  width: 40px;
  height: 2px;
  background-color: #e2e8f0;
  margin: 0 5px;
}

.form-step-title-v2 {
  font-size: 1.3rem;
  color: var(--dark-color-v2);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-grid-v2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group-v2 {
  position: relative;
  display: flex;
  flex-direction: column;
}

.form-group-v2.full-span-v2 {
  grid-column: 1 / -1;
}

.form-group-v2 label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--text-color-v2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group-v2 label i {
  color: var(--primary-color-v2);
  font-size: 0.9em;
}

.form-group-v2 input,
.form-group-v2 select,
.form-group-v2 textarea {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: #f8fafc;
  color: var(--text-color-v2);
  transition: all 0.3s ease;
}

.form-group-v2 input:focus,
.form-group-v2 select:focus,
.form-group-v2 textarea:focus {
  outline: none;
  border-color: var(--primary-color-v2);
  background-color: white;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.form-group-v2 input::placeholder,
.form-group-v2 textarea::placeholder {
  color: #94a3b8;
  opacity: 0.8;
}

.input-icon-v2 {
  position: absolute;
  right: 1rem;
  top: 2.4rem;
  color: var(--primary-color-v2);
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.form-group-v2 input:valid + .input-icon-v2,
.form-group-v2 input:focus + .input-icon-v2 {
  opacity: 1;
  transform: scale(1);
}

.custom-select-v2 {
  position: relative;
}

.custom-select-v2 select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
}

.select-arrow-v2 {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #94a3b8;
}

.range-input-v2 {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.8rem 0;
}

.range-input-v2 input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  padding: 0;
  margin: 0;
}

.range-input-v2 input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary-color-v2);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.range-value-v2 {
  font-size: 0.9rem;
  color: var(--primary-color-v2);
  font-weight: 600;
  text-align: center;
}

.form-group-v2 textarea {
  min-height: 120px;
  resize: vertical;
  padding-left: 1rem;
}

.char-counter-v2 {
  font-size: 0.75rem;
  color: #94a3b8;
  text-align: right;
  margin-top: 0.25rem;
}

.upload-area-v2 {
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f8fafc;
}

.upload-area-v2:hover,
.upload-area-v2.dragover {
  border-color: var(--primary-color-v2);
  background-color: rgba(13, 148, 136, 0.05);
}

.upload-content-v2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.upload-content-v2 i {
  font-size: 2rem; /* Reducido de 2.5rem */
  color: var(--primary-color-v2);
  margin-bottom: 0.5rem;
}

.upload-content-v2 h4 {
  font-size: 1.1rem;
  color: var(--dark-color-v2);
  margin: 0;
}

.upload-content-v2 p {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
}

.file-preview-v2 {
  position: relative;
  margin-top: 1rem;
  max-width: 200px;
}

.file-preview-v2 img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.remove-file-v2 {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ef4444;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.7rem;
}

.terms-group-v2 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
}

.terms-group-v2 input[type="checkbox"] {
  width: auto;
  padding: 0;
  margin: 0;
  min-width: 18px;
  min-height: 18px;
  accent-color: var(--primary-color-v2);
}

.terms-group-v2 label {
  margin: 0;
  font-size: 0.85rem;
}

.terms-group-v2 a {
  color: var(--primary-color-v2);
  text-decoration: none;
  font-weight: 500;
}

.terms-group-v2 a:hover {
  text-decoration: underline;
}

.form-footer-v2 {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.submit-button-v2 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #059669;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(13, 148, 136, 0.3);
  width: 100%;
}

.submit-button-v2:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(13, 148, 136, 0.4);
  background: linear-gradient(135deg, #0f766e 0%, #059669 100%);
}

.submit-button-v2:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-security-v2 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #64748b;
}

.form-security-v2 i {
  color: var(--primary-color-v2);
}

/* --- Animaciones --- */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.submit-button-v2:hover {
  animation: pulse 1.5s infinite;
}

/* --- Testimonials Section --- */
.testimonials-grid-v2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.testimonial-card-v2 { background: var(--white-color-v2); border-radius: 12px; padding: 2rem; border: 1px solid var(--border-color-v2); display: flex; flex-direction: column; justify-content: space-between; min-height: 220px; position: relative; overflow: hidden; }
.testimonial-card-v2::before { content: '\f10d'; font-family: 'Font Awesome 5 Free'; font-weight: 900; position: absolute; top: 1rem; left: 1rem; font-size: 4rem; color: var(--primary-color-v2); opacity: 0.08; z-index: 1; }
.testimonial-content-v2 { position: relative; z-index: 2; margin-bottom: 1.5rem; }
.testimonial-text-v2 { font-size: 1.05rem; line-height: 1.7; color: var(--text-color-v2); }
.testimonial-author-v2 { display: flex; align-items: center; margin-top: auto; position: relative; z-index: 2; padding-top: 1rem; border-top: 1px solid var(--light-color-v2); }
.author-image-v2 { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-right: 1rem; border: 2px solid var(--primary-color-v2); }
.author-name-v2 { font-size: 1rem; font-weight: 600; margin-bottom: 0.2rem; color: var(--dark-color-v2); }
.author-location-v2 { color: var(--text-muted-v2); font-size: 0.85rem; }

/* --- FAQ Section --- */
.faq-accordion-v2 { max-width: 800px; margin: 0 auto; }
.faq-item-v2 { margin-bottom: 1rem; border: 1px solid var(--border-color-v2); border-radius: 8px; overflow: hidden; background-color: var(--white-color-v2); }
.faq-question-v2 { padding: 1.25rem 1.5rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background-color 0.2s ease; }
.faq-question-v2:hover { background-color: var(--light-color-v2); }
.faq-question-v2 h3 { font-size: 1.05rem; font-weight: 500; color: var(--dark-color-v2); margin: 0; }
.faq-icon-v2 { color: var(--primary-color-v2); font-size: 1rem; transition: transform 0.3s ease; }
.faq-answer-v2 { max-height: 0; overflow: hidden; transition: max-height 0.4s ease-out, padding 0.4s ease-out; padding: 0 1.5rem; }
.faq-answer-v2.open { max-height: 300px; padding: 0.5rem 1.5rem 1.5rem; }
.faq-answer-v2 p { margin: 0; color: var(--text-muted-v2); font-size: 0.95rem; line-height: 1.7; border-top: 1px solid var(--light-color-v2); padding-top: 1rem; }

/* --- Final CTA Section --- */
.final-cta-section-v2 { background-color: var(--dark-color-v2); color: var(--white-color-v2); padding: var(--section-padding-v2); text-align: center; }
.cta-content-v2 { max-width: 700px; margin: 0 auto; }
.cta-title-v2 { font-size: 2.2rem; font-weight: 700; margin-bottom: 1rem; }
.cta-text-v2 { font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.8; }

/* --- Responsive --- */
@media (max-width: 992px) {
  .section-title-v2 { font-size: 2rem; }
  .process-timeline-v2::before { left: 30px; }
  .timeline-item-v2 { padding-left: 70px; }
  .testimonials-grid-v2 { grid-template-columns: 1fr; }
  .application-hero-v2 { height: 450px; }
}

@media (max-width: 768px) {
  :root { --section-padding-v2: 4rem 0; }
  .section-title-v2 { font-size: 1.8rem; }
  .form-grid-v2 { grid-template-columns: 1fr; }
  .form-group-v2.full-span-v2 { grid-column: auto; }
  .process-timeline-v2::before { left: 25px; }
  .timeline-icon-v2 { width: 50px; height: 50px; font-size: 1.2rem; left:0; }
  .timeline-item-v2 { padding-left: 65px; }
  .application-hero-v2 { height: 400px; }
  .upload-content-v2 h4 { font-size: 1rem; }
  .upload-content-v2 p { font-size: 0.8rem; }
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
  .application-hero-v2 { height: 350px; }
}
</style>