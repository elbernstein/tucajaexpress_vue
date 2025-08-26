<template>
  <div>
    <HeaderNav />
    <router-view />

    <!-- Componentes globales -->
    <ScrollToTop />
    <MenuMovil :isOpen="isOpen" :toggleMenu="toggleMenu" :closeMenu="closeMenu" />
    <PreguiaComp />
    <ChatbotWidget /> <!-- <= AÑADE ESTA LÍNEA AQUÍ -->

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderNav from './components/HeaderNav.vue'
import MenuMovil from '@/components/MenuMovil.vue'
import Footer from './components/Footer.vue'
import PreguiaComp from './components/PreguiaComp.vue'
import WhatsappButtom from './components/WhatsappButtom.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import ChatbotWidget from './components/ChatbotWidget.vue' // <= AÑADE ESTA LÍNEA AQUÍ

const isOpen = ref(false)
const toggleMenu = () => isOpen.value = !isOpen.value
const closeMenu = () => isOpen.value = false
</script>