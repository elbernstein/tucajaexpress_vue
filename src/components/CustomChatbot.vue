<template>
  <div class="chatbot-container">
    <!-- 1. Globo de texto proactivo (Aparece a los 3 segundos) -->
    <Transition name="bounce">
      <div 
        v-if="showProactiveBubble && !isOpen" 
        class="proactive-bubble"
        @click="toggleChat"
      >
        <button class="close-bubble-btn" @click.stop="dismissProactiveBubble" title="Cerrar">
          <i class="fas fa-times"></i>
        </button>
        <div class="bubble-avatar">
          <span>📦</span>
        </div>
        <div class="bubble-content">
          <p class="bubble-title">¡Hola! 👋</p>
          <p class="bubble-sub">¿Deseas consultar tu paquete o hablar con un asesor en vivo?</p>
        </div>
      </div>
    </Transition>

    <!-- 2. Botón Flotante Principal -->
    <button 
      class="chatbot-trigger" 
      :class="{ 'is-open': isOpen, 'is-human': isHumanMode }" 
      @click="toggleChat"
      aria-label="Abrir Chatbot"
    >
      <div class="trigger-badge" v-if="unreadCount > 0 && !isOpen">
        {{ unreadCount }}
      </div>
      <div class="trigger-icon">
        <i v-if="!isOpen && !isHumanMode" class="fas fa-comments"></i>
        <i v-else-if="!isOpen && isHumanMode" class="fas fa-headset"></i>
        <i v-else class="fas fa-chevron-down"></i>
      </div>
    </button>

    <!-- 3. Ventana Modal del Chat -->
    <Transition name="chat-slide">
      <div v-if="isOpen" class="chatbot-window">
        <!-- Header -->
        <div class="chat-header" :class="{ 'human-header': isHumanMode }">
          <div class="header-info">
            <div class="avatar-container">
              <div class="avatar">{{ isHumanMode ? '🎧' : '📦' }}</div>
              <span class="status-dot"></span>
            </div>
            <div class="header-text">
              <h3>{{ isHumanMode ? 'Asesor en Vivo (Tu Caja 2)' : 'Asistente Tu Caja Express' }}</h3>
              <p><span class="pulse-green">●</span> {{ isHumanMode ? 'Conectado con Agente' : 'En línea • Respuesta instantánea' }}</p>
            </div>
          </div>
          <div class="header-actions">
            <button v-if="isHumanMode" @click="exitHumanMode" title="Volver al bot" class="action-icon-btn">
              <i class="fas fa-robot"></i>
            </button>
            <button @click="resetChat" title="Reiniciar conversación" class="action-icon-btn">
              <i class="fas fa-redo-alt"></i>
            </button>
            <button @click="toggleChat" title="Cerrar" class="action-icon-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Body / Lista de Mensajes -->
        <div class="chat-body" ref="chatBodyRef">
          <div class="chat-date-separator">Hoy</div>

          <div v-for="(msg, index) in messages" :key="index" class="message-wrapper" :class="msg.sender">
            <div v-if="msg.sender !== 'user'" class="bot-avatar" :class="{ 'agent-avatar': msg.sender === 'agent' }">
              {{ msg.sender === 'agent' ? '🎧' : '📦' }}
            </div>
            
            <div class="message-content">
              <!-- Etiqueta de Nombre del Agente si viene del panel de tucaja2 -->
              <span v-if="msg.senderName && msg.sender === 'agent'" class="agent-name-tag">
                <i class="fas fa-user-shield me-1"></i> {{ msg.senderName }} (Asesor)
              </span>

              <div class="message-bubble" :class="msg.sender">
                <p class="message-text" v-html="formatMessage(msg.text)"></p>

                <!-- Tarjeta Interactiva de Resultados de Rastreo -->
                <div v-if="msg.trackingResult" class="tracking-card">
                  <div class="tracking-card-header">
                    <div class="guide-number-tag">
                      <i class="fas fa-barcode me-1"></i> GUÍA: {{ msg.trackingResult.guideNumber }}
                    </div>
                    <span class="tracking-status-badge" :class="msg.trackingResult.statusClass">
                      {{ msg.trackingResult.status }}
                    </span>
                  </div>

                  <!-- Etapas del Viaje (Iconos) -->
                  <div class="stages-stepper">
                    <div 
                      v-for="(stage, sIdx) in journeyStages" 
                      :key="sIdx" 
                      class="stepper-step"
                      :class="getStageClass(sIdx, msg.trackingResult.currentStageIndex)"
                    >
                      <div class="step-icon-circle">
                        <i :class="stage.icon"></i>
                      </div>
                      <span class="step-label">{{ stage.label }}</span>
                    </div>
                  </div>

                  <!-- Timeline de Movimientos -->
                  <div class="tracking-timeline">
                    <h5 class="timeline-title"><i class="fas fa-history me-1"></i> Historial de Movimientos</h5>
                    <div 
                      v-for="(event, eIdx) in msg.trackingResult.history" 
                      :key="eIdx" 
                      class="timeline-item"
                    >
                      <div class="item-dot"></div>
                      <div class="item-details">
                        <span class="item-date">{{ formatDateTime(event.date) }}</span>
                        <p class="item-desc">{{ event.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <span class="message-time">{{ msg.time }}</span>
              </div>

              <!-- Botones de Acción dentro del mensaje -->
              <div v-if="msg.actions && msg.actions.length" class="message-actions">
                <button 
                  v-for="(action, aIdx) in msg.actions" 
                  :key="aIdx" 
                  class="action-btn"
                  @click="handleActionClick(action)"
                >
                  <i :class="action.icon" v-if="action.icon"></i> {{ action.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- Indicador de "Escribiendo..." -->
          <div v-if="isTyping" class="message-wrapper bot">
            <div class="bot-avatar">📦</div>
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <!-- Chips de Opciones Rápidas (Solo en modo Bot) -->
        <div class="quick-chips-wrapper" v-if="!isTyping && !isHumanMode && !collectingInfo">
          <div class="quick-chips-scroll">
            <button 
              v-for="(chip, cIdx) in quickChips" 
              :key="cIdx" 
              class="chip-btn"
              @click="sendQuickOption(chip)"
            >
              <i :class="chip.icon"></i> {{ chip.label }}
            </button>
          </div>
        </div>

        <!-- Barra del Modo Asesor Humano -->
        <div v-if="isHumanMode" class="human-banner">
          <span>💬 Conversando en vivo con Asesor de Tu Caja Express</span>
          <button @click="exitHumanMode" class="btn-exit-human">Salir</button>
        </div>

        <!-- Footer / Input -->
        <div class="chat-footer">
          <form @submit.prevent="handleSendMessage" class="input-form">
            <input 
              v-model="inputMessage" 
              type="text" 
              :placeholder="getInputPlaceholder()"
              :disabled="isTyping"
              ref="inputRef"
            />
            <button 
              type="submit" 
              class="send-btn" 
              :disabled="!inputMessage.trim() || isTyping"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
          <div class="chat-footer-brand">
            <span>Powered by <strong>Tu Caja Express & Tu Caja 2</strong> 🚚</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import axios from 'axios';

// Backend Base URL (Se usa la API centralizada o la URL relativa)
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://sistematce.com';

// --- Estados del Chat ---
const isOpen = ref(false);
const showProactiveBubble = ref(false);
const unreadCount = ref(0);
const inputMessage = ref('');
const isTyping = ref(false);
const expectingGuide = ref(false);
const chatBodyRef = ref(null);
const inputRef = ref(null);

// --- Estados del Modo Agente Humano (tucaja2) ---
const isHumanMode = ref(false);
const collectingInfo = ref(false); // 'name' o 'phone'
const userInfo = ref({ name: '', phone: '' });
let pollingInterval = null;
let lastKnownMessageIds = new Set();

// --- Etapas del Viaje para Rastreo ---
const journeyStages = [
  { key: 'generada',      label: 'Generada',     icon: 'fas fa-clipboard-list', keywords: ['generada en sistema', 'guia creada'] },
  { key: 'recolecta',     label: 'Recolectado',   icon: 'fas fa-truck-moving',   keywords: ['recolectada de origen', 'recolectado', 'agregado a cedis'] },
  { key: 'container',     label: 'Contenedor',   icon: 'fas fa-ship',           keywords: ['agregado a container', 'en contenedor'] },
  { key: 'aduana',        label: 'Aduanas',       icon: 'fas fa-passport',       keywords: ['transito aduana', 'tramites aduanales', 'revision aduanal'] },
  { key: 'bodega_destino',label: 'Bodega',        icon: 'fas fa-boxes-stacked',  keywords: ['en bodega para su distribucion', 'agregado deposito destino'] },
  { key: 'reparto',       label: 'Reparto',       icon: 'fas fa-truck-fast',     keywords: ['en proceso de entrega', 'asignada guia a chofer'] },
  { key: 'entregado',     label: 'Entregado',     icon: 'fas fa-house-user',     keywords: ['entregado'] }
];

// --- Opciones Rápidas (Quick Chips) ---
const quickChips = [
  { label: '📦 Rastrear Guía', icon: 'fas fa-search-location', query: 'pedir_guia' },
  { label: '🎧 Hablar con Asesor', icon: 'fas fa-headset', query: 'conectar_asesor' },
  { label: '💰 Cotizar Envío', icon: 'fas fa-calculator', query: 'cotizar' },
  { label: '🚚 Rutas en USA', icon: 'fas fa-truck', query: 'rutas' },
  { label: '⏱️ Tiempos de Entrega', icon: 'fas fa-clock', query: 'tiempos' },
  { label: '🚫 Prohibidos', icon: 'fas fa-ban', query: 'prohibidos' }
];

// --- Historial de Mensajes ---
const messages = ref([
  {
    sender: 'bot',
    text: '¡Hola! 📦 Bienvenido a **Tu Caja Express**.\n¿Deseas consultar tu paquete o comunicarte directo con un **Asesor en Vivo**?',
    time: getCurrentTime(),
    actions: [
      { label: '🎧 Hablar con Asesor', icon: 'fas fa-headset', type: 'quick', value: 'conectar_asesor' },
      { label: '🔎 Rastrear mi Guía', icon: 'fas fa-search-location', type: 'quick', value: 'pedir_guia' }
    ]
  }
]);

// --- Base de Conocimiento ---
const companyKnowledge = {
  ubicacion: 'Nuestra oficina principal en Estados Unidos está ubicada en:\n📍 **701 Atando Ave Suite T, Charlotte, NC 28206**.',
  tiempos: '⏱️ **Tiempos aproximados de entrega:**\n- 🇲🇽 **México:** 20 a 30 días hábiles.\n- 🇬🇹 **Guatemala y 🇭🇳 Honduras:** 20 a 30 días hábiles.\n- 🇳🇮 **Nicaragua:** 4 a 8 semanas.\n- 🇨🇴 **Colombia:** 7 a 15 días hábiles.',
  rutas: '🚚 **Rutas de Recogida en USA:**\nTenemos cobertura semanal en: Florida, Carolinas, Virginia, Georgia, Alabama, Tennessee, Kentucky, Ohio e Indiana.',
  prohibidos: '🚫 **Artículos Prohibidos por Aduana:**\nNo se permite enviar dinero, joyas, armas, drogas, líquidos, químicos, inflamables o mercancía no declarada.',
  seguro: '🛡️ **Seguro de Carga:**\n- **Regular:** 5% | **Mixta:** 15% | **Comercial:** 20%.'
};

onMounted(() => {
  setTimeout(() => {
    if (!isOpen.value) {
      showProactiveBubble.value = true;
      unreadCount.value = 1;
    }
  }, 3000);
});

onUnmounted(() => {
  stopPollingForAgentMessages();
});

function toggleChat() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    showProactiveBubble.value = false;
    unreadCount.value = 0;
    nextTick(() => {
      scrollToBottom();
      inputRef.value?.focus();
    });
  }
}

function dismissProactiveBubble() {
  showProactiveBubble.value = false;
  unreadCount.value = 0;
}

function resetChat() {
  stopPollingForAgentMessages();
  isHumanMode.value = false;
  collectingInfo.value = false;
  expectingGuide.value = false;
  userInfo.value = { name: '', phone: '' };

  messages.value = [
    {
      sender: 'bot',
      text: 'Conversación reiniciada 🔄.\n¿En qué te podemos colaborar hoy?',
      time: getCurrentTime(),
      actions: [
        { label: '🎧 Hablar con Asesor', icon: 'fas fa-headset', type: 'quick', value: 'conectar_asesor' },
        { label: '🔎 Rastrear Guía', icon: 'fas fa-search-location', type: 'quick', value: 'pedir_guia' }
      ]
    }
  ];
  scrollToBottom();
}

function getInputPlaceholder() {
  if (collectingInfo.value === 'name') return 'Escribe tu nombre completo...';
  if (collectingInfo.value === 'phone') return 'Escribe tu teléfono (ej: +17045551234)...';
  if (isHumanMode.value) return 'Escribe tu mensaje para el asesor...';
  if (expectingGuide.value) return 'Escribe tu N° de guía en MAYÚSCULAS...';
  return 'Escribe tu mensaje o N° de guía...';
}

function sendQuickOption(chip) {
  processUserMessage(chip.label, chip.query);
}

function handleSendMessage() {
  const text = inputMessage.value.trim();
  if (!text) return;
  inputMessage.value = '';
  processUserMessage(text);
}

// --- Procesador Principal de Mensajes ---
async function processUserMessage(userText, queryTag = null) {
  // Si estamos recolectando la información previa para conectar con un Asesor
  if (collectingInfo.value === 'name') {
    userInfo.value.name = userText;
    collectingInfo.value = 'phone';

    messages.value.push({ sender: 'user', text: userText, time: getCurrentTime() });
    scrollToBottom();

    setTimeout(() => {
      messages.value.push({
        sender: 'bot',
        text: `¡Gracias, **${userText}**! 😊\n\nPor favor escribe tu **número de teléfono o WhatsApp** (con código de país ej: ` + '`+17045551234`' + `) para que nuestros agentes en **Tu Caja 2** identifiquen tu chat.`,
        time: getCurrentTime()
      });
      scrollToBottom();
    }, 500);
    return;
  }

  if (collectingInfo.value === 'phone') {
    const cleanPhone = userText.replace(/[^\d+]/g, '');
    if (cleanPhone.length < 7) {
      messages.value.push({
        sender: 'bot',
        text: '⚠️ Por favor escribe un número de teléfono válido con al menos 7 dígitos (ej: `+17049802879`).',
        time: getCurrentTime()
      });
      scrollToBottom();
      return;
    }

    userInfo.value.phone = cleanPhone;
    collectingInfo.value = false;
    isHumanMode.value = true;

    messages.value.push({ sender: 'user', text: userText, time: getCurrentTime() });
    scrollToBottom();

    // Enviar solicitud de inicio al backend de tucaja2
    await startHumanChatSession();
    return;
  }

  // Si ya estamos en Modo Asesor Humano en Vivo
  if (isHumanMode.value) {
    messages.value.push({ sender: 'user', text: userText, time: getCurrentTime() });
    scrollToBottom();

    await sendLiveMessageToAgent(userText);
    return;
  }

  // Modo Bot Estándar
  const formattedText = userText.trim().toUpperCase();
  messages.value.push({ sender: 'user', text: formattedText, time: getCurrentTime() });
  scrollToBottom();

  isTyping.value = true;
  const rawQuery = (queryTag || userText).toLowerCase();

  // Iniciar flujo para conectar con Asesor Humano
  if (queryTag === 'conectar_asesor' || rawQuery.includes('asesor') || rawQuery.includes('humano') || rawQuery.includes('hablar con persona')) {
    collectingInfo.value = 'name';
    setTimeout(() => {
      isTyping.value = false;
      messages.value.push({
        sender: 'bot',
        text: '🎧 **Conexión con Asesor en Vivo (Tu Caja 2):**\nTe conectaremos directamente con nuestros agentes.\n\nPara comenzar, por favor dinos tu **Nombre completo**:',
        time: getCurrentTime()
      });
      scrollToBottom();
    }, 600);
    return;
  }

  if (queryTag === 'pedir_guia') {
    expectingGuide.value = true;
    setTimeout(() => {
      isTyping.value = false;
      messages.value.push({
        sender: 'bot',
        text: '🔎 **Rastreo Instantáneo de Guías:**\nPor favor, escríbeme tu **número de guía** (ejemplo: `TCE-12345`) y la consultaré en vivo.',
        time: getCurrentTime()
      });
      scrollToBottom();
    }, 600);
    return;
  }

  // Si es un número de guía
  const isLikelyGuideNumber = expectingGuide.value || 
                              (/^[A-Z0-9-]{4,20}$/.test(formattedText) && !['HOLA', 'COTIZAR', 'RUTAS', 'GRACIAS'].includes(formattedText));

  if (isLikelyGuideNumber && !queryTag) {
    expectingGuide.value = false;
    await performTrackingSearch(formattedText);
    return;
  }

  // Respuesta de base de conocimiento
  setTimeout(() => {
    isTyping.value = false;
    const responseObj = generateKnowledgeResponse(rawQuery);
    messages.value.push({
      sender: 'bot',
      text: responseObj.text,
      time: getCurrentTime(),
      actions: responseObj.actions || []
    });
    scrollToBottom();
  }, 800);
}

// --- Integración con Backend de tucaja2 (Modo En Vivo) ---
async function startHumanChatSession() {
  isTyping.value = true;
  try {
    const welcomeMsg = `Hola, mi nombre es ${userInfo.value.name}. Solicitó atención en vivo desde el sitio web.`;
    
    await axios.post(`${BACKEND_BASE_URL}/api/webchat/mensaje`, {
      telefono: userInfo.value.phone,
      nombreCliente: userInfo.value.name,
      mensaje: welcomeMsg
    });

    isTyping.value = false;
    messages.value.push({
      sender: 'bot',
      text: `✅ **¡Conectado exitosamente!**\nTu chat ya está activo en el panel de agentes de **Tu Caja 2**.\nNuestros asesores recibirán tus mensajes al instante.`,
      time: getCurrentTime()
    });

    // Iniciar polling para recibir las respuestas que escriban los agentes desde tucaja2
    startPollingForAgentMessages();
  } catch (err) {
    isTyping.value = false;
    console.error('Error al conectar con tucaja2:', err);
    messages.value.push({
      sender: 'bot',
      text: `⚠️ No pudimos conectar con el servidor en este momento. Puedes llamarnos o contactarnos por nuestro WhatsApp oficial.`,
      time: getCurrentTime(),
      actions: [
        { label: '💬 Abrir WhatsApp Directo', icon: 'fab fa-whatsapp', type: 'whatsapp', value: 'https://wa.me/17049802879' }
      ]
    });
  }
  scrollToBottom();
}

async function sendLiveMessageToAgent(text) {
  try {
    await axios.post(`${BACKEND_BASE_URL}/api/webchat/mensaje`, {
      telefono: userInfo.value.phone,
      nombreCliente: userInfo.value.name,
      mensaje: text
    });
  } catch (err) {
    console.error('Error enviando mensaje al agente:', err);
  }
}

function startPollingForAgentMessages() {
  stopPollingForAgentMessages();
  
  // Realizar primer chequeo inmediato y luego cada 3 segundos
  checkAgentMessages();
  pollingInterval = setInterval(checkAgentMessages, 3000);
}

function stopPollingForAgentMessages() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

async function checkAgentMessages() {
  if (!userInfo.value.phone || !isHumanMode.value) return;

  try {
    const res = await axios.get(`${BACKEND_BASE_URL}/api/webchat/mensajes/${encodeURIComponent(userInfo.value.phone)}`);
    if (res.data && res.data.success && Array.isArray(res.data.mensajes)) {
      const serverMsgs = res.data.mensajes;

      serverMsgs.forEach(m => {
        const msgId = m._id || m.messageSid;
        if (!lastKnownMessageIds.has(msgId)) {
          lastKnownMessageIds.add(msgId);

          // Si el mensaje fue enviado por el sistema/agente (no es 'received' de Twilio)
          if (m.status !== 'received' || m.internalUser) {
            messages.value.push({
              sender: 'agent',
              senderName: m.senderName || 'Asesor',
              text: m.body || '',
              time: formatDateTime(m.createdAt)
            });

            if (!isOpen.value) {
              unreadCount.value++;
            }
            scrollToBottom();
          }
        }
      });
    }
  } catch (e) {
    console.warn('Error polling mensajes agente:', e.message);
  }
}

function exitHumanMode() {
  stopPollingForAgentMessages();
  isHumanMode.value = false;
  messages.value.push({
    sender: 'bot',
    text: 'Has salido de la atención en vivo. Ahora estás nuevamente en el **Asistente Automático** 📦.',
    time: getCurrentTime(),
    actions: [
      { label: '🔎 Rastrear Guía', icon: 'fas fa-search-location', type: 'quick', value: 'pedir_guia' },
      { label: '💰 Cotizar Tarifa', icon: 'fas fa-calculator', type: 'scroll', value: 'cotizar' }
    ]
  });
  scrollToBottom();
}

// --- Consulta a la API de Rastreo en Vivo ---
async function performTrackingSearch(guideNumber) {
  const cleanGuide = guideNumber.toUpperCase().trim();
  const apiUrl = `https://sistematce.com/api/obtener_info_guia_web?nroGuia=${encodeURIComponent(cleanGuide)}`;

  try {
    const response = await axios.get(apiUrl);
    isTyping.value = false;

    if (response.data && response.data.success && response.data.movimientos) {
      const movementsArray = Object.values(response.data.movimientos).sort((a, b) => a.indice - b.indice);

      if (movementsArray.length === 0) {
        showTrackingNotFound(cleanGuide);
        return;
      }

      const history = [];
      for (let i = movementsArray.length - 1; i >= 0; i--) {
        const mov = movementsArray[i];
        history.push({
          date: mov.fecha,
          description: mov.observacion || `Movimiento: ${mov.type}`,
          index: mov.indice
        });
      }

      const currentStatus = history[0] ? history[0].description : 'Información Recibida';

      let stageIndex = -1;
      const historyDescs = history.map(h => h.description.toLowerCase());
      for (let i = journeyStages.length - 1; i >= 0; i--) {
        const stage = journeyStages[i];
        const match = historyDescs.some(desc => stage.keywords.some(kw => desc.includes(kw)));
        if (match) {
          stageIndex = i;
          break;
        }
      }
      if (stageIndex === -1 && history.length > 0) stageIndex = 0;

      messages.value.push({
        sender: 'bot',
        text: `✅ **Información de Rastreo Encontrada:**`,
        time: getCurrentTime(),
        trackingResult: {
          guideNumber: cleanGuide,
          status: currentStatus,
          statusClass: getStatusClass(currentStatus),
          currentStageIndex: stageIndex,
          history: history
        },
        actions: [
          { label: '🎧 Hablar con Asesor', icon: 'fas fa-headset', type: 'quick', value: 'conectar_asesor' },
          { label: '🔎 Rastrear otra guía', icon: 'fas fa-search', type: 'quick', value: 'pedir_guia' }
        ]
      });

    } else {
      showTrackingNotFound(cleanGuide);
    }
  } catch (err) {
    isTyping.value = false;
    console.error('Error rastreo chatbot:', err);
    showTrackingNotFound(cleanGuide);
  }

  scrollToBottom();
}

function showTrackingNotFound(guide) {
  messages.value.push({
    sender: 'bot',
    text: `⚠️ **Guía no encontrada:**\nLa guía **${guide}** no reporta movimientos o no existe.\n\n¿Quieres hablar con un asesor en vivo?`,
    time: getCurrentTime(),
    actions: [
      { label: '🎧 Hablar con Asesor', icon: 'fas fa-headset', type: 'quick', value: 'conectar_asesor' },
      { label: '🔄 Reintentar Guía', icon: 'fas fa-redo', type: 'quick', value: 'pedir_guia' }
    ]
  });
}

function generateKnowledgeResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('cotiz') || q.includes('precio') || q.includes('costo') || q.includes('tarifa')) {
    return {
      text: '💰 **Calculadora de Cotizaciones:**\nPuedes obtener una estimación inmediata directamente en nuestra web.',
      actions: [
        { label: '📐 Ir al Cotizador Web', icon: 'fas fa-calculator', type: 'scroll', value: 'cotizar' }
      ]
    };
  }

  if (q.includes('ruta') || q.includes('recog') || q.includes('estado')) {
    return {
      text: companyKnowledge.rutas,
      actions: [
        { label: '🗺️ Ver Mapa de Rutas', icon: 'fas fa-map-marked-alt', type: 'route', value: '/rutas' }
      ]
    };
  }

  if (q.includes('tiempo') || q.includes('dias') || q.includes('tarda')) {
    return {
      text: companyKnowledge.tiempos,
      actions: [
        { label: '📋 Ver Términos completos', icon: 'fas fa-file-contract', type: 'route', value: '/politicas' }
      ]
    };
  }

  if (q.includes('prohibid') || q.includes('puedo enviar')) {
    return {
      text: companyKnowledge.prohibidos,
      actions: [
        { label: '🛡️ Ver Info de Seguro', icon: 'fas fa-shield-alt', type: 'quick', value: 'seguro' }
      ]
    };
  }

  if (q.includes('direccion') || q.includes('ubicac') || q.includes('oficina')) {
    return {
      text: companyKnowledge.ubicacion,
      actions: [
        { label: '📍 Ver Ubicación', icon: 'fas fa-map-marker-alt', type: 'route', value: '/contacto' }
      ]
    };
  }

  return {
    text: `Con gusto te asesoro. En **Tu Caja Express** realizamos envíos puerta a puerta 🚚.\n\nEscribe tu **número de guía** para rastrearla o presiona **Hablar con Asesor** para atenderte en vivo.`,
    actions: [
      { label: '🎧 Hablar con Asesor', icon: 'fas fa-headset', type: 'quick', value: 'conectar_asesor' },
      { label: '📦 Rastrear Guía', icon: 'fas fa-search-location', type: 'quick', value: 'pedir_guia' }
    ]
  };
}

function handleActionClick(action) {
  if (action.type === 'quick') {
    sendQuickOption({ label: action.label, query: action.value });
  } else if (action.type === 'scroll') {
    const cotizarEl = document.getElementById('cotizar');
    if (cotizarEl) {
      cotizarEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#cotizar';
    }
  } else if (action.type === 'route') {
    window.location.href = action.value;
  } else if (action.type === 'whatsapp') {
    window.open(action.value, '_blank');
  }
}

function getStageClass(index, currentStage) {
  if (index < currentStage) return 'completed';
  if (index === currentStage) return 'current';
  return 'pending';
}

function getStatusClass(statusText) {
  if (!statusText) return 'desconocido';
  return statusText.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDateTime(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch (e) {
    return dateString;
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (chatBodyRef.value) {
      chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight;
    }
  });
}

function formatMessage(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br/>');
}
</script>

<style scoped>
/* ============================================================ */
/* == STYLES: CHATBOT CONTAINER & FLOATING BUTTON               == */
/* ============================================================ */
.chatbot-container {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 9999;
  font-family: 'Poppins', 'Segoe UI', sans-serif;
}

.proactive-bubble {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 280px;
  background: #ffffff;
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  border: 2px solid #e74c3c;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transform-origin: bottom right;
}

.close-bubble-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #e74c3c;
  color: white;
  border: none;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.bubble-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e74c3c, #3498db);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.bubble-content .bubble-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: #1f2937;
  margin: 0;
}

.bubble-content .bubble-sub {
  font-size: 0.8rem;
  color: #4b5563;
  margin: 2px 0 0 0;
  line-height: 1.3;
}

.chatbot-trigger {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff0000, #2563eb);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chatbot-trigger.is-human {
  background: linear-gradient(135deg, #059669, #10b981);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.chatbot-trigger:hover {
  transform: scale(1.08) translateY(-3px);
}

.trigger-icon {
  font-size: 26px;
  transition: transform 0.3s ease;
}

.chatbot-trigger.is-open .trigger-icon {
  transform: rotate(180deg);
}

.trigger-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #10b981;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

/* Window */
.chatbot-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 390px;
  height: 600px;
  max-width: calc(100vw - 24px);
  max-height: calc(100vh - 100px);
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.chat-header {
  background: linear-gradient(135deg, #d90429, #1d4ed8);
  color: white;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}

.chat-header.human-header {
  background: linear-gradient(135deg, #059669, #10b981);
}

.header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border: 2px solid rgba(255, 255, 255, 0.4);
}

.status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.header-text h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  color: white;
}

.header-text p {
  font-size: 0.73rem;
  margin: 2px 0 0 0;
  opacity: 0.9;
}

.pulse-green {
  color: #34d399;
  font-size: 10px;
}

.header-actions {
  display: flex;
  gap: 6px;
}

.action-icon-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  transition: background 0.2s ease;
}

.action-icon-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Chat Body */
.chat-body {
  flex: 1;
  padding: 14px;
  overflow-y: auto;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-date-separator {
  text-align: center;
  font-size: 0.68rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 2px 0;
}

.message-wrapper {
  display: flex;
  gap: 8px;
  max-width: 90%;
}

.message-wrapper.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-wrapper.bot,
.message-wrapper.agent {
  align-self: flex-start;
}

.bot-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #d90429;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  flex-shrink: 0;
  margin-top: 2px;
}

.bot-avatar.agent-avatar {
  background: #059669;
}

.agent-name-tag {
  font-size: 0.7rem;
  font-weight: 700;
  color: #059669;
  margin-bottom: 2px;
  display: block;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.message-bubble {
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 0.88rem;
  line-height: 1.5;
  position: relative;
  word-break: break-word;
}

.message-bubble.bot {
  background: #ffffff;
  color: #1e293b;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.message-bubble.agent {
  background: #ecfdf5;
  color: #065f46;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.1);
  border: 1px solid #a7f3d0;
}

.message-bubble.user {
  background: linear-gradient(135deg, #d90429, #2563eb);
  color: #ffffff;
  border-bottom-right-radius: 4px;
  box-shadow: 0 4px 12px rgba(217, 4, 41, 0.2);
}

.message-text {
  margin: 0;
}

.message-text code {
  background: rgba(0, 0, 0, 0.06);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.message-time {
  font-size: 0.65rem;
  opacity: 0.7;
  display: block;
  text-align: right;
  margin-top: 4px;
}

/* Tracking Card */
.tracking-card {
  margin-top: 8px;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #cbd5e1;
}

.tracking-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.guide-number-tag {
  font-weight: 700;
  color: #0f172a;
  font-size: 0.82rem;
}

.tracking-status-badge {
  background: #2563eb;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
}

.stages-stepper {
  display: flex;
  justify-content: space-between;
  margin: 12px 0 16px 0;
  position: relative;
}

.stages-stepper::before {
  content: '';
  position: absolute;
  top: 14px;
  left: 10px;
  right: 10px;
  height: 2px;
  background: #cbd5e1;
  z-index: 1;
}

.stepper-step {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.step-icon-circle {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #cbd5e1;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  transition: all 0.3s ease;
}

.stepper-step.completed .step-icon-circle {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.stepper-step.current .step-icon-circle {
  background: #d90429;
  border-color: #d90429;
  color: white;
  box-shadow: 0 0 0 3px rgba(217, 4, 41, 0.2);
}

.step-label {
  font-size: 0.6rem;
  color: #64748b;
  font-weight: 500;
  text-align: center;
  line-height: 1.1;
}

.stepper-step.completed .step-label,
.stepper-step.current .step-label {
  color: #0f172a;
  font-weight: 700;
}

.tracking-timeline {
  background: #ffffff;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #e2e8f0;
}

.timeline-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #334155;
  margin: 0 0 8px 0;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 4px;
}

.timeline-item {
  display: flex;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px dashed #f1f5f9;
}

.timeline-item:last-child {
  border-bottom: none;
}

.item-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d90429;
  margin-top: 4px;
  flex-shrink: 0;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.item-date {
  font-size: 0.65rem;
  color: #64748b;
  font-weight: 600;
}

.item-desc {
  font-size: 0.75rem;
  color: #1e293b;
  margin: 2px 0 0 0;
  line-height: 1.3;
}

.message-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.action-btn {
  background: #ffffff;
  color: #d90429;
  border: 1.5px solid #d90429;
  padding: 5px 10px;
  border-radius: 18px;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.action-btn:hover {
  background: #d90429;
  color: white;
  transform: translateY(-1px);
}

.typing-indicator {
  background: #ffffff;
  padding: 10px 14px;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  display: flex;
  gap: 4px;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: #94a3b8;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) { animation-delay: 0s; }
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

/* Chips */
.quick-chips-wrapper {
  padding: 8px 12px;
  background: #ffffff;
  border-top: 1px solid #f1f5f9;
}

.quick-chips-scroll {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 3px;
  scrollbar-width: thin;
}

.chip-btn {
  white-space: nowrap;
  background: #f1f5f9;
  color: #334155;
  border: 1px solid #e2e8f0;
  padding: 5px 10px;
  border-radius: 18px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

.chip-btn:hover {
  background: #d90429;
  color: white;
  border-color: #d90429;
}

/* Banner Modo Humano */
.human-banner {
  background: #ecfdf5;
  color: #065f46;
  border-top: 1px solid #a7f3d0;
  padding: 6px 14px;
  font-size: 0.72rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-exit-human {
  background: #059669;
  color: white;
  border: none;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.68rem;
  cursor: pointer;
}

/* Footer & Input */
.chat-footer {
  padding: 10px 14px;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
}

.input-form {
  display: flex;
  gap: 8px;
}

.input-form input {
  flex: 1;
  padding: 9px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 25px;
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.input-form input:focus {
  border-color: #d90429;
  box-shadow: 0 0 0 3px rgba(217, 4, 41, 0.1);
}

.send-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #d90429;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: background 0.2s ease, transform 0.1s ease;
}

.send-btn:hover:not(:disabled) {
  background: #b91c1c;
  transform: scale(1.05);
}

.send-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

.chat-footer-brand {
  text-align: center;
  font-size: 0.65rem;
  color: #94a3b8;
  margin-top: 5px;
}

@keyframes typing {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.bounce-enter-active { animation: bounce-in 0.5s; }
.bounce-leave-active { animation: bounce-in 0.3s reverse; }
@keyframes bounce-in {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}

.chat-slide-enter-active,
.chat-slide-leave-active { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.chat-slide-enter-from,
.chat-slide-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }
</style>
