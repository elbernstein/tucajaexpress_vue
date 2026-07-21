<template>
  <section class="client-deliveries-section section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ title }}</h2>
        <p class="section-subtitle">{{ subtitle }}</p>
      </div>

      <div v-if="photos && photos.length > 0" class="client-photos-carousel">
        <button class="carousel-nav-btn prev" @click="prevClientPhoto" aria-label="Foto anterior">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="client-photos-track-container">
          <div class="client-photos-track" :style="{ transform: `translateX(-${currentClientPhotoIndex * 100}%)` }">
            <div
              v-for="(photo, index) in photos"
              :key="photo.id || index" class="client-photo-slide"
            >
              <div class="photo-card">
                <img 
                  :src="photo.src" 
                  :alt="photo.alt || 'Cliente recibiendo paquete'" 
                  class="client-photo-img" 
                  @error="handleImageError"
                >
                <div class="photo-caption" v-if="photo.caption || photo.location">
                  <p v-if="photo.caption">{{ photo.caption }}</p>
                  <span v-if="photo.location" class="location-tag">
                    <i class="fas fa-map-marker-alt"></i> {{ photo.location }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-nav-btn next" @click="nextClientPhoto" aria-label="Siguiente foto">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div v-else class="no-photos-message">
        <p>Próximamente compartiremos imágenes de nuestras entregas exitosas.</p>
      </div>

      <div v-if="photos && photos.length > 1" class="carousel-dots-container">
        <button
          v-for="(photo, index) in photos"
          :key="'dot-'+ (photo.id || index)"
          :class="{active: currentClientPhotoIndex === index}"
          @click="currentClientPhotoIndex = index"
          :aria-label="`Ir a foto ${index + 1}`"
          class="dot"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  photos: {
    type: Array,
    required: true,
    default: () => [] // Array de objetos: { id (opcional), src, alt, caption?, location? }
  },
  title: {
    type: String,
    default: 'Entregas Reales, Sonrisas Reales'
  },
  subtitle: {
    type: String,
    default: 'Vea la satisfacción de nuestros clientes al recibir sus paquetes'
  },
  placeholderImage: {
    type: String,
    default: '/images/placeholder-delivery.png' // Imagen por defecto si una foto falla
  }
});

const currentClientPhotoIndex = ref(0);

const nextClientPhoto = () => {
  if (props.photos.length === 0) return;
  currentClientPhotoIndex.value = (currentClientPhotoIndex.value + 1) % props.photos.length;
};

const prevClientPhoto = () => {
  if (props.photos.length === 0) return;
  currentClientPhotoIndex.value = (currentClientPhotoIndex.value - 1 + props.photos.length) % props.photos.length;
};

const handleImageError = (event) => {
  console.warn("Error al cargar imagen de cliente:", event.target.src);
  event.target.src = props.placeholderImage;
};
</script>

<style scoped>
/* Variables de diseño (Puedes moverlas a un archivo global si son compartidas) */
:root {
  --primary: #0061ff;
  --primary-light: #60efff;
  --dark: #1f2937;
  --light: #f9fafb;
  --gray: #6b7280;
  --gray-light: #e5e7eb;
  --section-bg-light: linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%); /* Fondo para la sección */
}

/* Estilos base de la sección del componente */
.client-deliveries-section {
  background: var(--section-bg-light); /* Fondo por defecto */
  font-family: 'Poppins', sans-serif; /* Asumiendo que Poppins está cargada globalmente */
}

.section-padding { padding: 4rem 1rem; } /* Padding base, ajusta según tu layout global */
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.section-header { text-align: center; margin-bottom: 3rem; }
.section-title { 
  font-size: clamp(1.8rem, 4vw, 2.2rem); 
  font-weight: 700; 
  margin-bottom: 0.8rem; 
  position: relative; 
  display: inline-block; 
  color: var(--dark);
}
.section-title::after { 
  content: ''; position: absolute; bottom: -8px; left: 50%; 
  transform: translateX(-50%); width: 70px; height: 3px; 
  background: linear-gradient(90deg, var(--primary), var(--primary-light)); 
  border-radius: 2px; 
}
.section-subtitle { 
  font-size: clamp(0.95rem, 2.5vw, 1.1rem); 
  color: var(--gray); 
  max-width: 650px; 
  margin: 0 auto; 
}

/* Carrusel de Fotos de Clientes */
.client-photos-carousel {
  position: relative;
  max-width: 800px; /* Ancho reducido para mejor enfoque en una imagen */
  margin: 2rem auto 0 auto;
  overflow: hidden;
  border-radius: 16px; /* Bordes más redondeados */
  /* Sombra más pronunciada para destacar */
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0,0,0,0.07);
}

.client-photos-track-container {
  overflow: hidden;
  border-radius: 12px; /* Para que el track interno no sobrepase los bordes redondeados del carrusel */
}

.client-photos-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1); /* Transición más suave y moderna */
}

.client-photo-slide {
  min-width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  /* padding: 0 5px; Si quieres un pequeño gap entre slides cuando se vean varias */
}

.photo-card {
  background-color: white;
  border-radius: 12px; /* Hereda del track container o define aquí */
  overflow: hidden;
  text-align: center;
  height: 100%; 
  display: flex;
  flex-direction: column;
  border: 1px solid var(--gray-light); /* Borde sutil */
}

.client-photo-img {
  width: 100%;
  height: 450px; /* Altura aumentada para más impacto */
  object-fit: cover;
  display: block;
  /* border-bottom: 4px solid var(--primary); Quitado para un look más limpio */
  transition: transform 0.4s ease; /* Sutil zoom al hover de la tarjeta */
}
.photo-card:hover .client-photo-img {
    transform: scale(1.03);
}


.photo-caption {
  padding: 1.25rem 1.5rem; /* Padding ajustado */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fdfdfd; /* Fondo ligeramente diferente para el caption */
}
.photo-caption p {
  font-size: 1rem; /* Tamaño ajustado */
  color: var(--dark);
  margin-bottom: 0.8rem;
  font-style: normal; /* Texto normal, no itálica por defecto */
  font-weight: 500; /* Ligeramente más bold */
  line-height: 1.5;
}
.location-tag {
  font-size: 0.8rem;
  color: var(--primary);
  font-weight: 600; /* Más bold */
  display: inline-flex;
  align-items: center;
  gap: 0.4rem; /* Espacio icono-texto */
  background-color: rgba(0, 97, 255, 0.08);
  padding: 0.35rem 0.9rem; /* Padding ajustado */
  border-radius: 20px; /* Más redondeado */
  align-self: center; /* Centrar el tag */
}
.location-tag i {
    opacity: 0.8;
}

.carousel-nav-btn {
  position: absolute;
  top: calc(50% - 22.5px); /* Centrado verticalmente respecto a la altura del botón */
  transform: translateY(-50%); /* Ajuste fino para centrar si la imagen es muy alta */
  width: 40px; /* Más pequeño y sutil */
  height: 40px;
  border-radius: 50%;
  background-color: rgba(31, 41, 55, 0.6); /* Fondo oscuro semi-transparente */
  border: none; /* Sin borde */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; /* Icono blanco */
  font-size: 1rem; /* Icono más pequeño */
  z-index: 2;
  transition: all 0.3s ease;
}
.carousel-nav-btn:hover {
  background-color: rgba(31, 41, 55, 0.8);
  transform: translateY(-50%) scale(1.1);
}
.carousel-nav-btn.prev { left: 15px; } /* Más cerca del borde */
.carousel-nav-btn.next { right: 15px; }

.carousel-dots-container {
  display: flex;
  justify-content: center;
  margin-top: 1.8rem; /* Más espacio */
  gap: 0.9rem; /* Más espaciado entre dots */
}
.carousel-dots-container .dot {
  width: 11px; height: 11px; border-radius: 50%; border: none;
  background-color: #ccc; /* Dots más oscuros */
  cursor: pointer; transition: all 0.3s ease; padding: 0;
}
.carousel-dots-container .dot.active {
  background-color: var(--primary);
  transform: scale(1.3);
  box-shadow: 0 0 5px rgba(0,97,255,0.5); /* Sutil glow al dot activo */
}
.no-photos-message {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--gray);
    font-style: italic;
    background-color: #fdfdfd;
    border-radius: 10px;
    margin-top: 2rem;
}

/* Responsividad */
@media (max-width: 992px) {
  .client-photos-carousel {
    max-width: 700px; /* Ajustar ancho en tabletas */
  }
}

@media (max-width: 768px) {
  .client-deliveries-section { padding: 3rem 1rem; }
  .section-header { margin-bottom: 2rem; }
  .client-photos-carousel { max-width: 100%; margin-top: 1rem; }
  .client-photo-img { height: 350px; } /* Imágenes un poco más pequeñas en móvil */
  .photo-caption p { font-size: 0.95rem; }
  .location-tag { font-size: 0.75rem; }
  .carousel-nav-btn { width: 35px; height: 35px; font-size: 0.9rem; }
  .carousel-nav-btn.prev { left: 10px; }
  .carousel-nav-btn.next { right: 10px; }
  .carousel-dots-container { margin-top: 1.2rem; }
}

@media (max-width: 480px) {
  .client-photo-img { height: 300px; }
  .photo-caption p { font-size: 0.9rem; }
}

</style>