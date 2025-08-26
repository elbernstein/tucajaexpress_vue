<template>
  <!-- 
    Este componente no renderiza HTML visible por sí mismo.
    Su único propósito es cargar y activar el script del chatbot,
    que se encargará de inyectar el widget en el <body> del documento.
  -->
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Usamos onMounted para asegurarnos de que el DOM esté listo antes de añadir scripts.
  
  // Prevenimos que el script se cargue múltiples veces si el componente se re-monta.
  if (window.chatNubeWidgetInitialized) {
    return;
  }

  // 1. Obtenemos el ID de la empresa desde el archivo .env
  const empresaId = import.meta.env.VITE_CHATNUBE_EMPRESA_ID;

  if (!empresaId) {
    console.error("ChatNube Widget: La variable VITE_CHATNUBE_EMPRESA_ID no está definida en el archivo .env.");
    return;
  }

  // 2. Creamos e inyectamos la hoja de estilos CSS en el <head> del documento.
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://chatnube.com/dist-widget-publico/style.css';
  document.head.appendChild(link);

  // 3. Creamos y añadimos el script principal del widget al final del <body>.
  const script = document.createElement('script');
  script.src = 'https://chatnube.com/dist-widget-publico/main.umd.js';
  script.async = true;

  // 4. Cuando el script haya cargado, inicializamos el widget.
  script.onload = () => {
    if (window.ChatNubeWidget && typeof window.ChatNubeWidget.init === 'function') {
      window.ChatNubeWidget.init({
        empresaId: empresaId,
        position: "bottom-right",
        offsetX: "20px",
        offsetY: "20px",
        width: "24rem",
        height: "40rem"
      });
      // Marcamos que ya fue inicializado.
      window.chatNubeWidgetInitialized = true;
    } else {
      console.error("ChatNube Widget: El script se cargó, pero el objeto ChatNubeWidget.init no se encontró.");
    }
  };
  
  script.onerror = () => {
    console.error("ChatNube Widget: Hubo un error al cargar el script principal.");
  };

  document.body.appendChild(script);
});
</script>