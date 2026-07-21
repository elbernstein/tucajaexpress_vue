<template>
  <div class="quote-simulator-page">
    <!-- Hero Section -->
    <div class="simulator-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Simula tu envío internacional</h1>
          <p class="hero-subtitle">Compara opciones y encuentra la mejor solución para tus necesidades</p>
          <div class="breadcrumbs">
            <router-link to="/" class="breadcrumb-link">Inicio</router-link>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">Cotización</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="simulator-container">
      <div class="container">
        <div class="simulator-grid">
          <!-- Form Column -->
          <div class="form-column">
            <div class="form-card">
              <div class="form-header">
                <h2 class="form-title">Detalles del envío</h2>
                <p class="form-subtitle">Completa la información para obtener tu cotización</p>
              </div>

              <div class="form-body">
                <div class="form-section">
                  <h3 class="section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                    Origen y destino
                  </h3>
                  <div class="form-row">
                    <div class="form-group">
                      <label for="origin">País de origen</label>
                      <input 
                        type="text" 
                        id="origin" 
                        class="form-input" 
                        value="Estados Unidos" 
                        disabled>
                    </div>
                    <div class="form-group">
                      <label for="destination">País destino</label>
                      <select 
                        v-model="quoteData.destination" 
                        id="destination" 
                        @change="fetchTabuladores" 
                        class="form-select"
                        required>
                        <option disabled value="">Selecciona un país</option>
                        <option 
                          v-for="country in availableCountries" 
                          :key="country.codpais" 
                          :value="country.codpais">
                          {{ country.pais_destino }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h3 class="section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
                      <path d="M16 10H8v4h8v-4z"></path>
                      <path d="M12 6h0"></path>
                    </svg>
                    Tipo de paquete
                  </h3>
                  
                  <div class="form-group">
                    <label>Tipo de envío</label>
                    <div class="radio-group">
                      <label class="radio-option">
                        <input 
                          type="radio" 
                          v-model="quoteData.boxType" 
                          value="standard"
                          @change="resetStandardBoxSelection">
                        Caja estándar
                      </label>
                      <label class="radio-option">
                        <input 
                          type="radio" 
                          v-model="quoteData.boxType" 
                          value="custom"
                          @change="resetCustomDimensions">
                        Caja personalizada
                      </label>
                    </div>
                  </div>
                  
                  <!-- Cajas estándar -->
                  <div v-if="quoteData.boxType === 'standard' && availableBoxes.length > 0" class="standard-box-options">
                    <div class="box-list">
                      <div 
                        v-for="box in availableBoxes" 
                        :key="box.id" 
                        class="box-option"
                        :class="{ 'selected': quoteData.selectedStandardBox === box.id_local }"
                        @click="selectStandardBox(box)">
                        <div class="box-image-container">
                          <img 
                            :src="getBoxImage(box.medida)" 
                            :alt="'Caja ' + box.medida" 
                            class="box-image"
                            onerror="this.src='/images/default-box.png'">
                        </div>
                        <div class="box-info">
                          <div class="box-dimensions">{{ box.medida }}</div>
                          <div class="box-features">
                            <span class="box-feature">Peso: {{ box.peso }} lbs</span>
                            <span class="box-feature">Pies cúbicos: {{ parseFloat(box.pie_cubic).toFixed(4) }}</span>
                          </div>
                          <div class="box-price">{{ formatPrice(box.precio_p_c) }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div v-else-if="quoteData.boxType === 'standard'" class="empty-state">
                    <div class="empty-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                    </div>
                    <p class="empty-text">Selecciona un país destino para ver las cajas disponibles</p>
                  </div>
                  
                  <!-- Caja personalizada -->
                  <div v-if="quoteData.boxType === 'custom'" class="custom-box-form">
                    <div class="form-row">
                      <div class="form-group">
                        <label>Alto (pulgadas)</label>
                        <input 
                          v-model.number="quoteData.customDimensions.height" 
                          type="number" 
                          placeholder="Ej: 10"
                          min="1"
                          class="form-input"
                          @input="calculateCustomBoxPrice">
                      </div>
                      <div class="form-group">
                        <label>Largo (pulgadas)</label>
                        <input 
                          v-model.number="quoteData.customDimensions.length" 
                          type="number" 
                          placeholder="Ej: 12"
                          min="1"
                          class="form-input"
                          @input="calculateCustomBoxPrice">
                      </div>
                      <div class="form-group">
                        <label>Ancho (pulgadas)</label>
                        <input 
                          v-model.number="quoteData.customDimensions.width" 
                          type="number" 
                          placeholder="Ej: 8"
                          min="1"
                          class="form-input"
                          @input="calculateCustomBoxPrice">
                      </div>
                    </div>
                    
                    <div v-if="!validateCustomBox()" class="warning-message">
                      Por favor ingresa todas las dimensiones válidas
                    </div>
                    
                    <div v-if="customBoxPrice" class="custom-box-result">
                      <div class="box-option selected">
                        <div class="box-image-container">
                          <img 
                            src="/images/26x24x24.png" 
                            alt="Caja personalizada" 
                            class="box-image">
                        </div>
                        <div class="box-info">
                          <div class="box-dimensions">{{ getCustomBoxDimensions() }}</div>
                          <div class="box-features">
                            <span class="box-feature">Pies cúbicos: {{ calculatedCubicFeet.toFixed(4) }}</span>
                          </div>
                          <div class="box-price">{{ formatPrice(customBoxPrice) }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h3 class="section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    Valor declarado
                  </h3>
                  <div class="form-group">
                    <label for="declaredValue">Valor declarado (USD)</label>
                    <input 
                      v-model.number="quoteData.declaredValue" 
                      type="number" 
                      id="declaredValue" 
                      class="form-input" 
                      placeholder="Ej: 100"
                      min="0"
                      max="500"
                      @input="validateDeclaredValue">
                    <p class="input-hint">Máximo $500. El seguro será calculado como 5% de este valor (mínimo $10, máximo $25)</p>
                    <p v-if="declaredValueError" class="error-message">{{ declaredValueError }}</p>
                  </div>
                  
                  <div class="form-group" v-if="quoteData.declaredValue && quoteData.declaredValue > 0 && !declaredValueError">
                    <label class="checkbox-option">
                      <input 
                        type="checkbox" 
                        v-model="quoteData.includeInsurance">
                      <span class="checkmark"></span>
                      Añadir seguro por {{ calculateInsuranceCost() }} (Cubre ${{ Math.min(quoteData.declaredValue, 500).toFixed(2) }})
                    </label>
                  </div>
                </div>

                <div class="form-section">
                  <h3 class="section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Dirección de recogida
                  </h3>
                  <div class="form-group">
                    <label for="address">Dirección completa</label>
                    <textarea 
                      v-model="quoteData.address" 
                      id="address" 
                      class="form-textarea" 
                      rows="3" 
                      placeholder="Ej: Calle Principal #123, Ciudad, Estado"
                      required></textarea>
                  </div>

                  <!-- CAMPO ZIP AÑADIDO -->
                  <div class="form-group">
                    <label for="zip">Código Postal (ZIP)</label>
                    <input 
                      v-model="quoteData.zip" 
                      type="text" 
                      id="zip" 
                      class="form-input" 
                      placeholder="Ej: 90210"
                      maxlength="5"
                      required>
                  </div>
                  
                  <div class="location-actions">
                    <button type="button" @click="getLocation" class="location-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      Usar mi ubicación actual
                    </button>
                    <div v-if="location" class="location-link">
                      <a :href="googleMapsLink" target="_blank" class="map-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Ver en mapa
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Results Column -->
          <div class="results-column">
            <div class="customer-card">
              <div class="customer-header">
                <div class="customer-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div class="customer-info">
                  <h3 class="customer-name">{{ customerData.name }}</h3>
                  <p class="customer-contact">{{ customerData.email }} • {{ customerData.phone }}</p>
                </div>
              </div>
            </div>

            <div class="results-card">
              <h2 class="results-title">Tu cotización</h2>
              <p class="results-subtitle">Selecciona la opción que mejor se adapte a tus necesidades</p>

              <div v-if="!quoteData.destination" class="empty-state">
                <div class="empty-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 class="empty-title">Selecciona un país destino</h3>
                <p class="empty-text">Elige el país de destino para ver las opciones disponibles</p>
              </div>

              <div v-else-if="quoteData.boxType === 'standard' && availableBoxes.length > 0" class="box-options">
                <div 
                  v-for="(box, index) in availableBoxes" 
                  :key="index" 
                  class="box-option" 
                  :class="{ 'selected': quoteData.selectedStandardBox === box.id_local }"
                  @click="selectStandardBox(box)">
                  <div class="box-image-container">
                    <img 
                      :src="getBoxImage(box.medida)" 
                      :alt="'Caja ' + box.medida" 
                      class="box-image"
                      onerror="this.src='/images/default-box.png'">
                  </div>
                  <div class="box-info">
                    <div class="box-dimensions">{{ box.medida }}</div>
                    <div class="box-features">
                      <div class="box-feature">Peso: {{ box.peso }} lbs</div>
                      <div class="box-feature">Pies cúbicos: {{ parseFloat(box.pie_cubic).toFixed(4) }}</div>
                    </div>
                    <div class="box-price">{{ formatPrice(box.precio_p_c) }}</div>
                  </div>
                </div>
              </div>

              <div v-else-if="quoteData.boxType === 'custom' && !validateCustomBox()" class="empty-state">
                <div class="empty-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <h3 class="empty-title">Ingresa las dimensiones</h3>
                <p class="empty-text">Por favor completa todas las medidas de tu paquete personalizado</p>
              </div>

              <div v-else-if="quoteData.boxType === 'custom'" class="box-options">
                <div class="box-option selected">
                  <div class="box-image-container">
                    <img 
                      src="/images/26x24x24.png" 
                      alt="Caja personalizada" 
                      class="box-image">
                  </div>
                  <div class="box-info">
                    <div class="box-dimensions">{{ getCustomBoxDimensions() }}</div>
                    <div class="box-features">
                      <div class="box-feature">Pies cúbicos: {{ calculatedCubicFeet.toFixed(4) }}</div>
                    </div>
                    <div class="box-price">{{ formatPrice(customBoxPrice) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="summary-card">
              <h3 class="summary-title">Resumen de cotización</h3>
              <div class="summary-details">
                <div class="detail-row">
                  <span class="detail-label">Cliente:</span>
                  <span class="detail-value">{{ customerData.name }}</span>
                </div>
                <div v-if="quoteData.destination" class="detail-row">
                  <span class="detail-label">Ruta:</span>
                  <span class="detail-value">Estados Unidos → {{ getCountryName(quoteData.destination) }}</span>
                </div>
                <div v-if="(quoteData.boxType === 'standard' && quoteData.selectedStandardBox && getSelectedBox()) || (quoteData.boxType === 'custom' && validateCustomBox())" class="detail-row">
                  <span class="detail-label">Tamaño de caja:</span>
                  <span class="detail-value">
                    {{ quoteData.boxType === 'standard' ? 
                       (getSelectedBox() ? getSelectedBox().medida : '') : 
                       getCustomBoxDimensions() }}
                  </span>
                </div>
                <div v-if="(quoteData.boxType === 'standard' && quoteData.selectedStandardBox && getSelectedBox()) || (quoteData.boxType === 'custom' && validateCustomBox())" class="detail-row">
                  <span class="detail-label">Pies cúbicos:</span>
                  <span class="detail-value">
                    {{ quoteData.boxType === 'standard' ? 
                       (getSelectedBox() ? parseFloat(getSelectedBox().pie_cubic).toFixed(4) : '') : 
                       calculatedCubicFeet.toFixed(4) }}
                  </span>
                </div>
                <div v-if="quoteData.declaredValue" class="detail-row">
                  <span class="detail-label">Valor declarado:</span>
                  <span class="detail-value">${{ quoteData.declaredValue.toFixed(2) }}</span>
                </div>
                <div v-if="(quoteData.boxType === 'standard' && quoteData.selectedStandardBox && getSelectedBox()) || (quoteData.boxType === 'custom' && validateCustomBox())" class="detail-row">
                  <span class="detail-label">Precio envío:</span>
                  <span class="detail-value">
                    {{ quoteData.boxType === 'standard' ? 
                       (getSelectedBox() ? formatPrice(getSelectedBox().precio_p_c) : '') : 
                       formatPrice(customBoxPrice) }}
                  </span>
                </div>
                <div v-if="quoteData.includeInsurance && quoteData.declaredValue && quoteData.declaredValue > 0" class="detail-row">
                  <span class="detail-label">Seguro:</span>
                  <span class="detail-value">{{ calculateInsuranceCost() }} (Cubre ${{ Math.min(quoteData.declaredValue, 500).toFixed(2) }})</span>
                </div>
                <div v-if="(quoteData.boxType === 'standard' && quoteData.selectedStandardBox) || (quoteData.boxType === 'custom' && validateCustomBox())" class="detail-row total-row">
                  <span class="detail-label">Total estimado:</span>
                  <span class="detail-value total-price">{{ calculateTotalPrice() }}</span>
                </div>
              </div>
              
              <!-- BOTÓN ACTUALIZADO -->
              <button 
                @click="requestPickup" 
                class="request-button" 
                :disabled="!isFormValid || loading">
                
                <span v-if="!loading">Solicitar recogida</span>
                <span v-else>Procesando...</span>

                <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="10" cy="20.5" r="1"></circle>
                  <circle cx="18" cy="20.5" r="1"></circle>
                  <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Datos del cliente desde la URL
const customerData = ref({})
try {
  if (route.query.customer) {
    customerData.value = JSON.parse(decodeURIComponent(route.query.customer))
  }
} catch (e) {
  console.error("Error parsing customer data:", e)
}

// Estado del formulario
const quoteData = ref({
  origin: 'Estados Unidos',
  destination: '',
  boxType: 'standard',
  selectedStandardBox: null,
  customDimensions: {
    height: null,
    length: null,
    width: null
  },
  declaredValue: null,
  includeInsurance: false,
  address: '',
  zip: '',
  location: null,
  lat: null,
  lng: null
})

// Estados de la aplicación
const loading = ref(false)
const declaredValueError = ref(null)
const availableBoxes = ref([])
const tabuladores = ref([])
const customBoxPrice = ref(null)
const calculatedCubicFeet = ref(0)
const location = ref(null)
const lat = ref(null)
const lng = ref(null)
const error = ref(null)

const availableCountries = computed(() => {
  const uniqueCountries = []
  const seen = new Set()
  tabuladores.value.forEach(item => {
    if (!seen.has(item.codpais) && item.pais_destino !== 'Estados Unidos') {
      seen.add(item.codpais);
      uniqueCountries.push({ codpais: item.codpais, pais_destino: item.pais_destino })
    }
  })
  return uniqueCountries
})

const getCountryName = (codpais) => {
  const country = availableCountries.value.find(c => c.codpais === codpais);
  return country ? country.pais_destino : '';
}

const formatPrice = (price) => {
  if (!price) return '$0.00';
  return `$${parseFloat(price).toFixed(2)}`;
}

const fetchTabuladores = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('https://sistematce.com/api/obtener_tabulado')
    if (!response.ok) {
      throw new Error('Error al obtener los tabuladores')
    }
    const data = await response.json()
    tabuladores.value = data.tabuladores
    if (quoteData.value.destination) {
      availableBoxes.value = tabuladores.value.filter(item => item.codpais === quoteData.value.destination)
      availableBoxes.value.sort((a, b) => parseFloat(a.pie_cubic) - parseFloat(b.pie_cubic))
    }
  } catch (err) {
    console.error('Error fetching tabuladores:', err)
    error.value = 'No se pudieron cargar las opciones de envío. Por favor intenta más tarde.'
  } finally {
    loading.value = false
  }
}

const getBoxImage = (dimensions) => {
  const normalized = dimensions.toLowerCase().replace(/\s+/g, '').replace(/x/g, 'x').replace(/"/g, '').replace(/'/g, '');
  return `/images/${normalized}.png`;
};

const validateDeclaredValue = () => {
  if (quoteData.value.declaredValue === null || quoteData.value.declaredValue === '') { declaredValueError.value = null; return; }
  const value = parseFloat(quoteData.value.declaredValue);
  if (isNaN(value)) { declaredValueError.value = 'Por favor ingresa un valor numérico válido'; return; }
  if (value < 0) { declaredValueError.value = 'El valor no puede ser negativo'; return; }
  if (value > 500) { quoteData.value.declaredValue = 500; declaredValueError.value = 'El valor máximo permitido es $500'; return; }
  declaredValueError.value = null;
};

const resetStandardBoxSelection = () => { quoteData.value.selectedStandardBox = null; };
const resetCustomDimensions = () => { quoteData.value.customDimensions = { height: null, length: null, width: null }; customBoxPrice.value = null; calculatedCubicFeet.value = 0; };
const selectStandardBox = (box) => { quoteData.value.selectedStandardBox = box.id_local; };
const validateCustomBox = () => { const { height, length, width } = quoteData.value.customDimensions; return height > 0 && length > 0 && width > 0; };
const getSelectedBox = () => availableBoxes.value.find(box => box.id_local === quoteData.value.selectedStandardBox);
const getCustomBoxDimensions = () => { const { height, length, width } = quoteData.value.customDimensions; return `${height}x${length}x${width} pulgadas`; };
const calculateCustomBoxPrice = () => {
  if (!validateCustomBox() || !quoteData.value.destination) { customBoxPrice.value = null; return; }
  const { height, length, width } = quoteData.value.customDimensions;
  const numAlto = parseFloat(height), numLargo = parseFloat(length), numAncho = parseFloat(width);
  if (isNaN(numAlto) || isNaN(numLargo) || isNaN(numAncho) || numAlto <= 0 || numLargo <= 0 || numAncho <= 0) { customBoxPrice.value = null; return; }
  const constante_cubico = 1728;
  const pre_valor_cubico = (numAlto * numLargo * numAncho) / constante_cubico;
  let valor_cubico_ajustado = (Math.floor(pre_valor_cubico * 100) / 100) - 0.01;
  const valor_cubico = Math.max(0.001, valor_cubico_ajustado);
  calculatedCubicFeet.value = parseFloat(valor_cubico.toFixed(4));
  const itemsDelPais = tabuladores.value.filter(item => item.codpais === quoteData.value.destination).map(item => ({ ...item, pie_cubic_num: parseFloat(item.pie_cubic), precio_p_c_num: parseFloat(item.precio_p_c) })).filter(item => !isNaN(item.pie_cubic_num) && item.pie_cubic_num > 0 && !isNaN(item.precio_p_c_num) && item.precio_p_c_num >= 0).sort((a, b) => a.pie_cubic_num - b.pie_cubic_num);
  if (itemsDelPais.length === 0) { customBoxPrice.value = null; return; }
  const tolerancia = 0.0001;
  for (const item of itemsDelPais) { if (Math.abs(item.pie_cubic_num - valor_cubico) < tolerancia) { customBoxPrice.value = Math.ceil(item.precio_p_c_num); return; } }
  const cajaMasPequena = itemsDelPais[0], cajaMasGrande = itemsDelPais[itemsDelPais.length - 1];
  if (valor_cubico < cajaMasPequena.pie_cubic_num) { if (cajaMasPequena.pie_cubic_num > 0) { customBoxPrice.value = Math.ceil((cajaMasPequena.precio_p_c_num / cajaMasPequena.pie_cubic_num) * valor_cubico); } else { customBoxPrice.value = Math.ceil(cajaMasPequena.precio_p_c_num); } return; }
  if (valor_cubico > cajaMasGrande.pie_cubic_num) { if (cajaMasGrande.pie_cubic_num > 0) { customBoxPrice.value = Math.ceil((cajaMasGrande.precio_p_c_num / cajaMasGrande.pie_cubic_num) * valor_cubico); } else { customBoxPrice.value = Math.ceil(cajaMasGrande.precio_p_c_num); } return; }
  let caja_inferior = null, caja_superior = null;
  for (let i = 0; i < itemsDelPais.length - 1; i++) { if (itemsDelPais[i].pie_cubic_num < valor_cubico && itemsDelPais[i + 1].pie_cubic_num > valor_cubico) { caja_inferior = itemsDelPais[i]; caja_superior = itemsDelPais[i + 1]; break; } }
  if (caja_inferior && caja_superior) {
    const x1 = caja_inferior.pie_cubic_num, y1 = caja_inferior.precio_p_c_num, x2 = caja_superior.pie_cubic_num, y2 = caja_superior.precio_p_c_num;
    if (x2 - x1 === 0) { customBoxPrice.value = Math.ceil(y1); } else { const precioCalculado = y1 + (valor_cubico - x1) * (y2 - y1) / (x2 - x1); customBoxPrice.value = Math.ceil(precioCalculado); }
  } else { customBoxPrice.value = null; }
};
const calculateInsuranceCost = () => {
  if (!quoteData.value.declaredValue || quoteData.value.declaredValue <= 0) return '$0.00';
  let insuranceCost = quoteData.value.declaredValue * 0.05;
  insuranceCost = Math.max(insuranceCost, 10);
  insuranceCost = Math.min(insuranceCost, 25);
  return `$${insuranceCost.toFixed(2)}`;
};
const calculateTotalPrice = () => {
  let basePrice = 0;
  if (quoteData.value.boxType === 'standard' && quoteData.value.selectedStandardBox) {
    const box = getSelectedBox(); if (box) basePrice = parseFloat(box.precio_p_c);
  } else if (quoteData.value.boxType === 'custom' && validateCustomBox() && customBoxPrice.value) { basePrice = customBoxPrice.value; } else { return '$0.00'; }
  let insuranceCost = 0;
  if (quoteData.value.includeInsurance && quoteData.value.declaredValue > 0) { insuranceCost = quoteData.value.declaredValue * 0.05; insuranceCost = Math.max(insuranceCost, 10); insuranceCost = Math.min(insuranceCost, 25); }
  const total = basePrice + insuranceCost;
  return `$${total.toFixed(2)}`;
};
const getLocation = () => { if (navigator.geolocation) { navigator.geolocation.getCurrentPosition( (position) => { lat.value = position.coords.latitude; lng.value = position.coords.longitude; location.value = `Ubicación: ${lat.value.toFixed(4)}, ${lng.value.toFixed(4)}`; }, (error) => { console.error("Error getting location:", error); alert("No se pudo obtener la ubicación."); } ); } else { alert("La geolocalización no es soportada."); } };
const googleMapsLink = computed(() => { if (lat.value && lng.value) { return `https://www.google.com/maps?q=${lat.value},${lng.value}`; } return '#'; });
const isFormValid = computed(() => {
  if (!quoteData.value.destination || !quoteData.value.address || !quoteData.value.zip) return false;
  if (quoteData.value.boxType === 'standard') { return !!quoteData.value.selectedStandardBox; } 
  else { return validateCustomBox(); }
});
onMounted(() => { fetchTabuladores(); });


// ======================= FUNCIÓN requestPickup AJUSTADA A LAS NUEVAS REGLAS =======================
const requestPickup = async () => {
  if (!isFormValid.value) {
    alert("Por favor completa todos los campos requeridos.");
    return;
  }
  if (loading.value) return;

  loading.value = true;
  
  const AGENCIA_ID = '67479d8a1f62426613df176a';
  let tipoCajaPayload;
  
  // APLICANDO LA REGLA INDICADA POR TU COMPAÑERO
  if (quoteData.value.boxType === 'standard') {
    const selectedBox = getSelectedBox();
    // Para cajas estándar, enviamos el ID.
    // Usamos el `_id` que debería venir de la API como prioridad.
    tipoCajaPayload = selectedBox?._id || selectedBox?.id_local; 
  } else {
    // Para cajas personalizadas, enviamos un string VACÍO.
    tipoCajaPayload = ''; 
  }

  // Limpiamos el número de teléfono para que no tenga símbolos, solo dígitos.
  const celularLimpio = customerData.value.phone.replace(/[^\d]/g, '');
  
  const payload = {
    agencia: AGENCIA_ID,
    nom_cliente: customerData.value.name,
    correoelectronico: customerData.value.email,
    celular: celularLimpio,
    zip: quoteData.value.zip,
    tipo_caja: tipoCajaPayload,
  };

  console.log("Payload final que se enviará a la API:", payload);

  try {
    const response = await fetch('https://sistematce.com/api/preguia2/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error("Respuesta de error del servidor:", errorText);
        throw new Error(`Error del servidor: ${response.status}. Respuesta: ${errorText}`);
    }

    const result = await response.json();

    if (result.success) {
      alert('¡Solicitud enviada con éxito! Hemos generado tu preguía y te contactaremos a la brevedad.');
    } else {
      throw new Error(result.message || 'La API indicó que la solicitud no fue exitosa.');
    }
    
  } catch (error) {
    console.error("Error detallado al solicitar la recogida:", error);
    alert(`Hubo un problema al enviar tu solicitud. Revisa la consola para más detalles.`);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Estilos específicos para los cambios */
.box-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.box-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.box-image-container {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
  flex-shrink: 0;
}

.box-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.box-info {
  flex: 1;
  min-width: 0;
}

/* Para la versión móvil */
@media (max-width: 576px) {
  .box-option {
    flex-direction: column;
    text-align: center;
  }
  
  .box-image-container {
    width: 100%;
    height: 120px;
  }
}

.box-option.selected {
  border-color: #3a7bd5;
  background-color: rgba(58, 123, 213, 0.05);
}

.box-option:hover {
  border-color: #3a7bd5;
}

.box-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-dimensions {
  font-weight: 600;
  color: #2c3e50;
}

.box-weight {
  font-size: 0.875rem;
  color: #7f8c8d;
}

.box-price {
  font-weight: 700;
  color: #3a7bd5;
}

.custom-box-result {
  margin-top: 1rem;
}

.box-feature {
  font-size: 0.875rem;
  color: #2c3e50;
  margin-top: 0.25rem;
}
.quote-simulator-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.simulator-hero {
  background: linear-gradient(135deg, #7a0800 0%, #960500 100%);
  color: white;
  padding: 5rem 0 3rem;
  position: relative;
  overflow: hidden;
}

.simulator-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/img/wave-pattern.png') repeat;
  opacity: 0.1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.breadcrumbs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
}

.breadcrumb-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
}

.breadcrumb-link:hover {
  color: white;
  text-decoration: underline;
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.6);
}

.breadcrumb-current {
  color: white;
  font-weight: 500;
}

.simulator-container {
  padding: 3rem 0;
}

.simulator-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2rem;
}

.form-column {
  position: relative;
}

.form-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: sticky;
  top: 2rem;
}

.form-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f1f3f5;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  font-size: 0.9375rem;
  color: #7f8c8d;
  margin-bottom: 0;
}

.form-body {
  padding: 1.5rem;
}

.form-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

.input-hint {
  font-size: 0.75rem;
  color: #7f8c8d;
  margin-top: 0.25rem;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: #3a7bd5;
  box-shadow: 0 0 0 3px rgba(58, 123, 213, 0.1);
  outline: none;
  background-color: white;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.radio-option input {
  margin: 0;
}

.standard-box-options {
  margin-top: 1rem;
}

.box-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}

.box-option {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.box-option:hover {
  border-color: #3a7bd5;
}

.box-option.selected {
  border-color: #3a7bd5;
  background-color: rgba(58, 123, 213, 0.05);
  box-shadow: 0 0 0 2px rgba(58, 123, 213, 0.2);
}

.box-image-container {
  text-align: center;
  margin-bottom: 0.5rem;
}

.box-dimensions {
  font-weight: 600;
  color: #2c3e50;
}

.box-weight {
  font-size: 0.75rem;
  color: #7f8c8d;
}

.box-price {
  font-weight: 700;
  color: #3a7bd5;
  text-align: center;
}

.custom-box-form {
  margin-top: 1rem;
}

.custom-box-price {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.price-label {
  font-size: 0.875rem;
  color: #7f8c8d;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3a7bd5;
  margin: 0.25rem 0;
}

.price-details {
  font-size: 0.75rem;
  color: #7f8c8d;
}

.checkbox-option {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-size: 0.9375rem;
  user-select: none;
  margin-top: 0.5rem;
}

.checkbox-option input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.checkbox-option:hover input ~ .checkmark {
  background-color: #e9ecef;
}

.checkbox-option input:checked ~ .checkmark {
  background-color: #3a7bd5;
  border-color: #3a7bd5;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-option input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-option .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.location-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.location-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f1f3f5;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
}

.location-button:hover {
  background: #e9ecef;
}

.map-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #3a7bd5;
  text-decoration: none;
  transition: all 0.3s ease;
}

.map-link:hover {
  text-decoration: underline;
}

.error-message {
  color: #e74c3c;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.warning-message {
  color: #e67e22;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  font-style: italic;
}

.results-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.customer-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.customer-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.customer-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.customer-info {
  flex: 1;
}

.customer-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.customer-contact {
  font-size: 0.875rem;
  color: #7f8c8d;
  margin-bottom: 0;
}

.results-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  flex: 1;
}

.results-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.results-subtitle {
  font-size: 0.9375rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 2rem 0;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background: #f1f3f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3a7bd5;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.empty-text {
  font-size: 0.9375rem;
  color: #7f8c8d;
  margin-bottom: 0;
}

.box-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.box-option {
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.box-option:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.box-option.selected {
  border-color: #3a7bd5;
  box-shadow: 0 0 0 3px rgba(58, 123, 213, 0.2);
}

.box-image-container {
  width: 120px;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
}

.custom-box-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-dimensions {
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #7f8c8d;
}

.box-weight {
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.75rem;
  color: #7f8c8d;
}

.box-details {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.box-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.box-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #7f8c8d;
}

.feature svg {
  color: #3a7bd5;
}

.summary-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.summary-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f3f5;
}

.summary-details {
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
}

.detail-label {
  color: #7f8c8d;
}

.detail-value {
  font-weight: 500;
  color: #2c3e50;
}

.total-row {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f3f5;
}

.total-row .detail-label {
  font-weight: 600;
}

.total-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #3a7bd5;
}

.request-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.request-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(58, 123, 213, 0.3);
}

.request-button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3a7bd5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #e74c3c;
  padding: 1rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}

@media (max-width: 992px) {
  .simulator-grid {
    grid-template-columns: 1fr;
  }
  
  .form-card {
    position: static;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .box-option {
    flex-direction: column;
  }
  
  .box-image-container {
    width: 100%;
    padding: 1.5rem;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>