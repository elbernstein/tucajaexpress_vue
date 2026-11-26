<template>
  <div class="vacantes-page">
    <!-- Hero Section -->
    <section class="vacantes-hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <span class="hero-badge">
          <i class="fas fa-briefcase"></i> Únete a Nuestro Equipo
        </span>
        <h1 class="hero-title">Trabaja con Nosotros</h1>
        <p class="hero-subtitle">
          Descubre nuestras oportunidades laborales activas y forma parte de la red logística que conecta a Estados Unidos con México y Centroamérica.
        </p>
        <div v-if="!loading && !error && vacantes.length > 0" class="hero-stats">
          <span class="stat-pill">
            <i class="fas fa-bullhorn"></i>
            {{ vacantes.length }} {{ vacantes.length === 1 ? 'vacante activa' : 'vacantes activas' }}
          </span>
          <span v-if="totalPlazas > 0" class="stat-pill">
            <i class="fas fa-users"></i>
            {{ totalPlazas }} {{ totalPlazas === 1 ? 'plaza disponible' : 'plazas disponibles' }}
          </span>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="vacantes-main">
      <div class="container">
        <!-- Barra de filtros y búsqueda -->
        <div v-if="!loading && !error && vacantes.length > 0" class="filters-bar">
          <div class="search-box">
            <i class="fas fa-search search-icon"></i>
            <input
              v-model.trim="searchQuery"
              type="text"
              placeholder="Buscar por puesto, área o ciudad..."
              aria-label="Buscar vacante por nombre de puesto"
            />
            <button
              v-if="searchQuery"
              type="button"
              class="clear-input-btn"
              @click="searchQuery = ''"
              aria-label="Limpiar búsqueda"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div v-if="paisesDisponibles.length > 1" class="filter-select-wrapper">
            <i class="fas fa-globe-americas filter-icon"></i>
            <select v-model="selectedPais" aria-label="Filtrar por país">
              <option value="">Todos los países</option>
              <option v-for="pais in paisesDisponibles" :key="pais.code" :value="pais.code">
                {{ pais.label }}
              </option>
            </select>
          </div>

          <div v-if="empresasDisponibles.length > 1" class="filter-select-wrapper">
            <i class="fas fa-building filter-icon"></i>
            <select v-model="selectedEmpresa" aria-label="Filtrar por empresa">
              <option value="">Todas las empresas</option>
              <option v-for="emp in empresasDisponibles" :key="emp.id" :value="emp.id">
                {{ emp.nombre }}
              </option>
            </select>
          </div>

          <button
            v-if="hasActiveFilters"
            type="button"
            class="btn-reset-filters"
            @click="resetFilters"
          >
            <i class="fas fa-undo-alt"></i> Limpiar
          </button>
        </div>

        <!-- Estado de carga (Skeleton) -->
        <div v-if="loading" class="vacantes-grid" aria-busy="true" aria-label="Cargando vacantes">
          <div v-for="n in 3" :key="n" class="vacante-card skeleton-card">
            <div class="skeleton-cover shimmer"></div>
            <div class="card-body">
              <div class="skeleton-line short shimmer"></div>
              <div class="skeleton-line title shimmer"></div>
              <div class="skeleton-line shimmer"></div>
              <div class="skeleton-line medium shimmer"></div>
              <div class="skeleton-btn shimmer"></div>
            </div>
          </div>
        </div>

        <!-- Estado de error -->
        <div v-else-if="error" class="state-box error-state">
          <div class="state-icon error-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <h2>No pudimos cargar las vacantes</h2>
          <p>{{ error }}</p>
          <button type="button" class="btn-primary-action" @click="fetchVacantes">
            <i class="fas fa-sync-alt"></i> Intentar de nuevo
          </button>
        </div>

        <!-- Estado vacío (sin vacantes activas) -->
        <div v-else-if="vacantes.length === 0" class="state-box empty-state">
          <div class="state-icon">
            <i class="fas fa-briefcase"></i>
          </div>
          <h2>Actualmente no hay vacantes abiertas</h2>
          <p>
            En este momento no contamos con convocatorias activas, pero constantemente publicamos nuevas oportunidades de crecimiento en nuestras sedes. ¡Vuelve pronto!
          </p>
          <div class="empty-actions">
            <RouterLink to="/contactanos" class="btn-primary-action">
              <i class="fas fa-envelope"></i> Contáctanos
            </RouterLink>
            <RouterLink to="/" class="btn-secondary-action">
              <i class="fas fa-home"></i> Volver al Inicio
            </RouterLink>
          </div>
        </div>

        <!-- Sin coincidencias con los filtros -->
        <div v-else-if="filteredVacantes.length === 0" class="state-box empty-state">
          <div class="state-icon">
            <i class="fas fa-search"></i>
          </div>
          <h2>No encontramos vacantes con esos filtros</h2>
          <p>Intenta con otro término de búsqueda o selecciona otro país o empresa.</p>
          <button type="button" class="btn-primary-action" @click="resetFilters">
            <i class="fas fa-undo-alt"></i> Ver todas las vacantes
          </button>
        </div>

        <!-- Listado de Vacantes -->
        <div v-else class="vacantes-grid">
          <article
            v-for="vacante in filteredVacantes"
            :key="vacante._id"
            class="vacante-card"
          >
            <!-- Portada -->
            <div
              class="card-cover"
              :style="getCoverStyle(vacante)"
              @click="openModal(vacante)"
            >
              <img
                v-if="hasValidCoverImage(vacante)"
                :src="vacante.imagen_publicitaria"
                :alt="vacante.titulo"
                class="cover-img"
                loading="lazy"
                @error="markImageError(vacante._id, 'cover')"
              />
              <div v-else class="cover-fallback">
                <img
                  v-if="hasValidLogo(vacante)"
                  :src="vacante.empresa.logo"
                  :alt="vacante.empresa?.nombre_comercial || 'Empresa'"
                  class="fallback-logo"
                  @error="markImageError(vacante._id, 'logo')"
                />
                <div v-else class="fallback-brand-icon">
                  <i class="fas fa-briefcase"></i>
                  <span>{{ vacante.empresa?.nombre_comercial || 'Tu Caja Express' }}</span>
                </div>
              </div>

              <!-- Badges sobre portada -->
              <div class="cover-badges">
                <span v-if="vacante.departamento_objetivo" class="badge-dept">
                  {{ vacante.departamento_objetivo }}
                </span>
                <span v-if="vacante.plazas_disponibles" class="badge-plazas">
                  <i class="fas fa-user-plus"></i>
                  {{ vacante.plazas_disponibles }} {{ vacante.plazas_disponibles === 1 ? 'plaza' : 'plazas' }}
                </span>
              </div>
            </div>

            <!-- Contenido de la tarjeta -->
            <div class="card-body">
              <div class="company-row">
                <img
                  v-if="hasValidLogo(vacante)"
                  :src="vacante.empresa.logo"
                  :alt="vacante.empresa?.nombre_comercial"
                  class="company-mini-logo"
                  @error="markImageError(vacante._id, 'logo')"
                />
                <span
                  v-else
                  class="company-dot"
                  :style="{ backgroundColor: vacante.empresa?.color_marca || '#c62828' }"
                ></span>
                <span class="company-name">
                  {{ vacante.empresa?.nombre_comercial || 'Tu Caja Express' }}
                </span>
              </div>

              <h2 class="vacante-title" @click="openModal(vacante)">
                {{ vacante.titulo }}
              </h2>

              <div class="vacante-meta">
                <span v-if="formatLocation(vacante.empresa)" class="meta-item">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ formatLocation(vacante.empresa) }}
                </span>
                <span v-if="vacante.createdAt" class="meta-item">
                  <i class="far fa-calendar-alt"></i>
                  {{ formatDate(vacante.createdAt) }}
                </span>
              </div>

              <p class="vacante-desc">
                {{ vacante.descripcion || 'Consulta los requisitos y condiciones para postularte a esta vacante.' }}
              </p>

              <div class="card-actions">
                <button
                  type="button"
                  class="btn-ver-vacante"
                  :style="{ '--brand-color': vacante.empresa?.color_marca || '#c62828' }"
                  @click="openModal(vacante)"
                >
                  <i class="fas fa-file-alt"></i> Ver requisitos / Postularme
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Modal de Detalle y Postulación -->
    <Transition name="modal-fade">
      <div
        v-if="selectedVacante"
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="'modal-title-' + selectedVacante._id"
        @click.self="closeModal"
      >
        <div class="modal-dialog-box">
          <button
            type="button"
            class="modal-close-btn"
            @click="closeModal"
            aria-label="Cerrar detalle de vacante"
          >
            <i class="fas fa-times"></i>
          </button>

          <!-- Portada grande del modal -->
          <div class="modal-cover" :style="getCoverStyle(selectedVacante)">
            <img
              v-if="hasValidCoverImage(selectedVacante)"
              :src="selectedVacante.imagen_publicitaria"
              :alt="selectedVacante.titulo"
              class="modal-cover-img"
              @error="markImageError(selectedVacante._id, 'cover')"
            />
            <div v-else class="modal-cover-fallback">
              <img
                v-if="hasValidLogo(selectedVacante)"
                :src="selectedVacante.empresa.logo"
                :alt="selectedVacante.empresa?.nombre_comercial"
                class="modal-fallback-logo"
                @error="markImageError(selectedVacante._id, 'logo')"
              />
              <div v-else class="fallback-brand-icon">
                <i class="fas fa-briefcase"></i>
                <span>{{ selectedVacante.empresa?.nombre_comercial || 'Tu Caja Express' }}</span>
              </div>
            </div>
          </div>

          <!-- Cuerpo del modal -->
          <div class="modal-body-content">
            <div class="modal-header-info">
              <div class="company-row">
                <img
                  v-if="hasValidLogo(selectedVacante)"
                  :src="selectedVacante.empresa.logo"
                  :alt="selectedVacante.empresa?.nombre_comercial"
                  class="company-mini-logo"
                  @error="markImageError(selectedVacante._id, 'logo')"
                />
                <span class="company-name">
                  {{ selectedVacante.empresa?.nombre_comercial || 'Tu Caja Express' }}
                </span>
              </div>

              <h2 :id="'modal-title-' + selectedVacante._id" class="modal-title">
                {{ selectedVacante.titulo }}
              </h2>

              <div class="modal-pills">
                <span v-if="selectedVacante.departamento_objetivo" class="info-pill">
                  <i class="fas fa-sitemap"></i> {{ selectedVacante.departamento_objetivo }}
                </span>
                <span v-if="formatLocation(selectedVacante.empresa)" class="info-pill">
                  <i class="fas fa-map-marker-alt"></i> {{ formatLocation(selectedVacante.empresa) }}
                </span>
                <span v-if="selectedVacante.plazas_disponibles" class="info-pill highlight-pill">
                  <i class="fas fa-users"></i>
                  {{ selectedVacante.plazas_disponibles }} {{ selectedVacante.plazas_disponibles === 1 ? 'plaza disponible' : 'plazas disponibles' }}
                </span>
              </div>
            </div>

            <div v-if="selectedVacante.descripcion" class="modal-section">
              <h3><i class="fas fa-align-left"></i> Descripción del Puesto</h3>
              <p class="modal-description">{{ selectedVacante.descripcion }}</p>
            </div>

            <div
              v-if="Array.isArray(selectedVacante.condiciones_texto) && selectedVacante.condiciones_texto.length > 0"
              class="modal-section"
            >
              <h3><i class="fas fa-clipboard-check"></i> Condiciones y Requisitos</h3>
              <ul class="conditions-list">
                <li v-for="(cond, idx) in selectedVacante.condiciones_texto" :key="idx">
                  <i class="fas fa-check-circle"></i>
                  <span>{{ cond }}</span>
                </li>
              </ul>
            </div>

            <!-- Botones de acción -->
            <div class="modal-actions">
              <a
                v-if="selectedVacante.url_formulario"
                :href="selectedVacante.url_formulario"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-apply-now"
                :style="{ backgroundColor: selectedVacante.empresa?.color_marca || '#c62828' }"
              >
                <i class="fas fa-paper-plane"></i> Postularme Ahora
              </a>

              <a
                v-if="selectedVacante.url_formulario"
                :href="getWhatsAppShareUrl(selectedVacante)"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-whatsapp-share"
              >
                <i class="fab fa-whatsapp"></i> Compartir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const API_URL = 'https://sistematce.com/api/public/reclutamiento/web/vacantes'
const API_TOKEN = import.meta.env.VITE_RECLUTAMIENTO_TOKEN || 'TCE_PUBLIC_WEB_TOKEN_2026'

const vacantes = ref([])
const loading = ref(true)
const error = ref(null)

const searchQuery = ref('')
const selectedPais = ref('')
const selectedEmpresa = ref('')
const selectedVacante = ref(null)

// Control de imágenes rotas para aplicar fallback limpio
const imageErrors = ref({})

const COUNTRY_NAMES = {
  GT: '🇬🇹 Guatemala',
  MX: '🇲🇽 México',
  HN: '🇭🇳 Honduras',
  SV: '🇸🇻 El Salvador',
  NI: '🇳🇮 Nicaragua',
  US: '🇺🇸 Estados Unidos',
  CO: '🇨🇴 Colombia',
  CR: '🇨🇷 Costa Rica',
  PA: '🇵🇦 Panamá'
}

const getCountryLabel = (iso2) => {
  if (!iso2) return ''
  const upper = iso2.toUpperCase()
  return COUNTRY_NAMES[upper] || upper
}

const formatLocation = (empresa) => {
  if (!empresa) return ''
  const parts = []
  if (empresa.ciudad) parts.push(empresa.ciudad)
  if (empresa.pais_iso2) parts.push(getCountryLabel(empresa.pais_iso2))
  return parts.join(', ')
}

const formatDate = (isoString) => {
  if (!isoString) return ''
  try {
    return new Date(isoString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return ''
  }
}

const markImageError = (id, type) => {
  imageErrors.value[`${id}_${type}`] = true
}

const hasValidCoverImage = (vacante) => {
  return Boolean(vacante?.imagen_publicitaria) && !imageErrors.value[`${vacante._id}_cover`]
}

const hasValidLogo = (vacante) => {
  return Boolean(vacante?.empresa?.logo) && !imageErrors.value[`${vacante._id}_logo`]
}

const getCoverStyle = (vacante) => {
  const color = vacante?.empresa?.color_marca || '#c62828'
  return {
    background: `linear-gradient(135deg, ${color}, #1e293b)`
  }
}

const totalPlazas = computed(() => {
  return vacantes.value.reduce((acc, v) => acc + (Number(v.plazas_disponibles) || 0), 0)
})

const paisesDisponibles = computed(() => {
  const map = new Map()
  vacantes.value.forEach((v) => {
    const code = v.empresa?.pais_iso2?.toUpperCase()
    if (code && !map.has(code)) {
      map.set(code, { code, label: getCountryLabel(code) })
    }
  })
  return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label))
})

const empresasDisponibles = computed(() => {
  const map = new Map()
  vacantes.value.forEach((v) => {
    const emp = v.empresa
    if (emp?._id && emp?.nombre_comercial && !map.has(emp._id)) {
      map.set(emp._id, { id: emp._id, nombre: emp.nombre_comercial })
    }
  })
  return Array.from(map.values()).sort((a, b) => a.nombre.localeCompare(b.nombre))
})

const hasActiveFilters = computed(() => {
  return Boolean(searchQuery.value || selectedPais.value || selectedEmpresa.value)
})

const filteredVacantes = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return vacantes.value.filter((v) => {
    if (selectedPais.value && v.empresa?.pais_iso2?.toUpperCase() !== selectedPais.value) {
      return false
    }
    if (selectedEmpresa.value && v.empresa?._id !== selectedEmpresa.value) {
      return false
    }
    if (query) {
      const haystack = [
        v.titulo,
        v.descripcion,
        v.departamento_objetivo,
        v.empresa?.nombre_comercial,
        v.empresa?.ciudad,
        getCountryLabel(v.empresa?.pais_iso2)
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(query)) return false
    }
    return true
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedPais.value = ''
  selectedEmpresa.value = ''
}

const getWhatsAppShareUrl = (vacante) => {
  const text = `Mira esta vacante disponible en Tu Caja Express: ${vacante.titulo} — ${vacante.url_formulario}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

const openModal = (vacante) => {
  selectedVacante.value = vacante
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedVacante.value = null
  document.body.style.overflow = ''
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && selectedVacante.value) {
    closeModal()
  }
}

const fetchVacantes = async () => {
  loading.value = true
  error.value = null
  try {
    const url = new URL(API_URL)
    if (route.query.empresa) {
      url.searchParams.set('empresa', String(route.query.empresa))
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error del servidor (${response.status}). Por favor intenta más tarde.`)
    }

    const data = await response.json()
    if (data && data.success && Array.isArray(data.vacantes)) {
      vacantes.value = data.vacantes
    } else {
      vacantes.value = []
    }
  } catch (err) {
    console.error('Error al cargar vacantes:', err)
    error.value = 'No se pudo conectar con el servicio de vacantes. Verifica tu conexión e intenta nuevamente.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  fetchVacantes()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.vacantes-page {
  min-height: 75vh;
  background-color: #f8fafc;
  font-family: 'Poppins', sans-serif;
  color: #1e293b;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero */
.vacantes-hero {
  position: relative;
  background: linear-gradient(135deg, #111827 0%, #991b1b 55%, #dc2626 100%);
  color: #ffffff;
  padding: 72px 0 64px;
  text-align: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.08), transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.25), transparent 55%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 18px;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.1rem);
  font-weight: 700;
  margin: 0 0 14px;
  color: #ffffff;
}

.hero-subtitle {
  max-width: 680px;
  margin: 0 auto 24px;
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.9);
}

.hero-stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 500;
}

/* Main Section */
.vacantes-main {
  padding: 48px 0 80px;
}

/* Filters Bar */
.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  background: #ffffff;
  padding: 18px;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
  border: 1px solid #e2e8f0;
  margin-bottom: 32px;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1 1 260px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: #64748b;
  font-size: 0.95rem;
}

.search-box input {
  width: 100%;
  padding: 11px 38px 11px 40px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: inherit;
  color: #1e293b;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-box input:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
}

.clear-input-btn {
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px 6px;
}

.filter-select-wrapper {
  position: relative;
  flex: 0 1 220px;
  min-width: 180px;
}

.filter-icon {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
  font-size: 0.9rem;
}

.filter-select-wrapper select {
  width: 100%;
  padding: 11px 14px 11px 36px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.93rem;
  font-family: inherit;
  color: #1e293b;
  background-color: #ffffff;
  cursor: pointer;
}

.filter-select-wrapper select:focus {
  outline: none;
  border-color: #dc2626;
}

.btn-reset-filters {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 16px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f1f5f9;
  color: #334155;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-reset-filters:hover {
  background: #e2e8f0;
}

/* Grid */
.vacantes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
}

/* Vacancy Card */
.vacante-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.vacante-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.12);
}

.card-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.vacante-card:hover .cover-img {
  transform: scale(1.04);
}

.cover-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.fallback-logo {
  max-width: 68%;
  max-height: 110px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 18px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.fallback-brand-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  text-align: center;
}

.fallback-brand-icon i {
  font-size: 2.6rem;
  opacity: 0.9;
}

.fallback-brand-icon span {
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.4px;
}

.cover-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  pointer-events: none;
}

.badge-dept {
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(4px);
  color: #ffffff;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: 999px;
}

.badge-plazas {
  background: #ffffff;
  color: #b91c1c;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 5px 11px;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
}

.card-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.company-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.company-mini-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: 4px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 2px;
}

.company-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.company-name {
  font-size: 0.84rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.vacante-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 10px;
  line-height: 1.35;
  cursor: pointer;
}

.vacante-title:hover {
  color: #dc2626;
}

.vacante-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: #475569;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.meta-item i {
  color: #dc2626;
}

.vacante-desc {
  font-size: 0.93rem;
  line-height: 1.6;
  color: #475569;
  margin: 0 0 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-actions {
  margin-top: auto;
}

.btn-ver-vacante {
  width: 100%;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  background-color: var(--brand-color, #c62828);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: filter 0.2s ease, transform 0.2s ease;
}

.btn-ver-vacante:hover {
  filter: brightness(0.9);
  transform: translateY(-1px);
}

/* Skeleton Loader */
.skeleton-card {
  pointer-events: none;
}

.skeleton-cover {
  height: 200px;
  background: #e2e8f0;
}

.skeleton-line {
  height: 14px;
  border-radius: 6px;
  background: #e2e8f0;
  margin-bottom: 12px;
}

.skeleton-line.short {
  width: 40%;
}

.skeleton-line.title {
  height: 22px;
  width: 80%;
}

.skeleton-line.medium {
  width: 65%;
}

.skeleton-btn {
  height: 44px;
  border-radius: 10px;
  background: #e2e8f0;
  margin-top: 16px;
}

.shimmer {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Empty & Error States */
.state-box {
  max-width: 560px;
  margin: 24px auto;
  text-align: center;
  background: #ffffff;
  padding: 48px 32px;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.06);
}

.state-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #fef2f2;
  color: #dc2626;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 18px;
}

.state-icon.error-icon {
  background: #fffbeb;
  color: #d97706;
}

.state-box h2 {
  font-size: 1.45rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 10px;
}

.state-box p {
  color: #475569;
  line-height: 1.65;
  margin: 0 0 24px;
}

.empty-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.btn-primary-action,
.btn-secondary-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, filter 0.2s;
}

.btn-primary-action {
  background: #dc2626;
  color: #ffffff;
}

.btn-primary-action:hover {
  filter: brightness(0.92);
  transform: translateY(-1px);
  color: #ffffff;
}

.btn-secondary-action {
  background: #f1f5f9;
  color: #1e293b;
}

.btn-secondary-action:hover {
  background: #e2e8f0;
  color: #0f172a;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.modal-dialog-box {
  position: relative;
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.modal-close-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 5;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(15, 23, 42, 0.75);
  color: #ffffff;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
}

.modal-close-btn:hover {
  background: #dc2626;
  transform: scale(1.06);
}

.modal-cover {
  width: 100%;
  min-height: 220px;
  max-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #0f172a;
}

.modal-cover-img {
  width: 100%;
  max-height: 380px;
  object-fit: contain;
  background: #0f172a;
}

.modal-cover-fallback {
  padding: 36px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-fallback-logo {
  max-width: 240px;
  max-height: 130px;
  object-fit: contain;
  background: #ffffff;
  padding: 14px 22px;
  border-radius: 14px;
}

.modal-body-content {
  padding: 28px;
}

.modal-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
  margin: 4px 0 14px;
}

.modal-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 22px;
}

.info-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  color: #334155;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
}

.info-pill.highlight-pill {
  background: #fef2f2;
  color: #b91c1c;
  font-weight: 600;
}

.modal-section {
  margin-bottom: 22px;
}

.modal-section h3 {
  font-size: 1.02rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-section h3 i {
  color: #dc2626;
}

.modal-description {
  color: #475569;
  line-height: 1.7;
  margin: 0;
  white-space: pre-line;
}

.conditions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.conditions-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 0.93rem;
  color: #334155;
  line-height: 1.5;
}

.conditions-list li i {
  color: #16a34a;
  margin-top: 3px;
  flex-shrink: 0;
}

.modal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.btn-apply-now,
.btn-whatsapp-share {
  flex: 1 1 220px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 13px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.96rem;
  text-decoration: none;
  color: #ffffff;
  transition: filter 0.2s, transform 0.2s;
}

.btn-apply-now:hover,
.btn-whatsapp-share:hover {
  filter: brightness(0.92);
  transform: translateY(-1px);
  color: #ffffff;
}

.btn-whatsapp-share {
  background-color: #25d366;
}

/* Modal transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .vacantes-hero {
    padding: 52px 0 44px;
  }

  .vacantes-grid {
    grid-template-columns: 1fr;
  }

  .modal-body-content {
    padding: 20px;
  }

  .modal-title {
    font-size: 1.35rem;
  }
}
</style>
