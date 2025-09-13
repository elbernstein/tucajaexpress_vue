<template>
  <div class="privacy-container">
    <!-- Language Selector -->
    <div class="language-selector">
      <button 
        @click="currentLanguage = 'es'"
        :class="{ active: currentLanguage === 'es' }"
        aria-label="Versión en español"
      >
        Español
      </button>
      <button 
        @click="currentLanguage = 'en'"
        :class="{ active: currentLanguage === 'en' }"
        aria-label="English version"
      >
        English
      </button>
    </div>

    <!-- Content -->
    <div class="legal-content">
      <h1 class="policy-title">
        {{ currentLanguage === 'es' 
          ? 'POLÍTICA DE PRIVACIDAD – TU CAJA EXPRESS' 
          : 'PRIVACY POLICY – TU CAJA EXPRESS' 
        }}
      </h1>
      
      <p class="last-updated">
        {{ currentLanguage === 'es' 
          ? 'Última actualización: 13/09/2025' 
          : 'Last updated: 09/13/2025' 
        }}
      </p>

      <!-- 1. Information We Collect -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '1. INFORMACIÓN QUE RECOPILAMOS' : '1. INFORMATION WE COLLECT' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Recopilamos información personal que usted nos proporciona al registrarse, realizar envíos o comunicarse con nosotros, incluyendo:' 
            : 'We collect personal information that you provide to us when registering, making shipments or communicating with us, including:' 
          }}
        </p>
        <ul class="info-list">
          <li>{{ currentLanguage === 'es' ? 'Nombre completo y datos de contacto (teléfono, dirección de correo electrónico, dirección física).' : 'Full name and contact information (phone, email address, physical address).' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Información de facturación y métodos de pago.' : 'Billing information and payment methods.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Datos relacionados con sus envíos (destinatarios, direcciones de entrega, contenido declarado).' : 'Data related to your shipments (recipients, delivery addresses, declared content).' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Información técnica básica cuando accede a nuestro sitio web (IP, navegador, cookies).' : 'Basic technical information when accessing our website (IP, browser, cookies).' }}</li>
        </ul>
      </section>

      <!-- 2. Use of Information -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '2. USO DE LA INFORMACIÓN' : '2. USE OF INFORMATION' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Utilizamos la información personal exclusivamente para:' 
            : 'We use personal information exclusively for:' 
          }}
        </p>
        <ul class="info-list">
          <li>{{ currentLanguage === 'es' ? 'Procesar y gestionar envíos.' : 'Process and manage shipments.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Emitir facturas y comprobantes de pago.' : 'Issue invoices and payment receipts.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Mantener comunicación directa con clientes sobre el estado de sus paquetes.' : 'Maintain direct communication with customers about the status of their packages.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Cumplir con obligaciones legales y aduanales.' : 'Comply with legal and customs obligations.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Mejorar nuestros servicios y experiencia de usuario.' : 'Improve our services and user experience.' }}</li>
        </ul>
      </section>

      <!-- 3. Data Sharing -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '3. COMPARTICIÓN DE DATOS' : '3. DATA SHARING' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Compartimos datos personales únicamente cuando es necesario para:' 
            : 'We share personal data only when necessary for:' 
          }}
        </p>
        <ul class="info-list">
          <li>{{ currentLanguage === 'es' ? 'Cumplir con regulaciones aduanales, fiscales o legales en EE. UU. y Centroamérica.' : 'Comply with customs, tax or legal regulations in the USA and Central America.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Operaciones con socios logísticos o proveedores de servicios indispensables para el transporte y entrega.' : 'Operations with logistics partners or service providers essential for transportation and delivery.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Casos en que la ley lo requiera (orden judicial, citación, autoridad gubernamental).' : 'Cases where the law requires it (court order, subpoena, government authority).' }}</li>
        </ul>
        <p class="highlight-text">
          {{ currentLanguage === 'es' 
            ? 'En ningún caso vendemos, alquilamos ni comercializamos información personal de nuestros clientes.' 
            : 'We never sell, rent or commercialize personal information from our customers.' 
          }}
        </p>
      </section>

      <!-- 4. Information Retention -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '4. CONSERVACIÓN DE LA INFORMACIÓN' : '4. INFORMATION RETENTION' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Conservamos la información personal el tiempo estrictamente necesario para cumplir con los fines de servicio, legales y contables. Una vez vencido el plazo de retención, los datos se eliminan de manera segura.' 
            : 'We retain personal information for the time strictly necessary to fulfill service, legal and accounting purposes. Once the retention period expires, data is securely deleted.' 
          }}
        </p>
      </section>

      <!-- 5. Information Security -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '5. SEGURIDAD DE LA INFORMACIÓN' : '5. INFORMATION SECURITY' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Nuestra empresa protege la información personal de los clientes mediante:' 
            : 'Our company protects customer personal information through:' 
          }}
        </p>
        <ul class="info-list">
          <li>{{ currentLanguage === 'es' ? 'Almacenamiento seguro en sistemas internos con acceso restringido únicamente al personal autorizado.' : 'Secure storage in internal systems with access restricted only to authorized personnel.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Uso limitado de datos exclusivamente para fines de contacto, facturación, seguimiento de envíos y cumplimiento legal/aduanal.' : 'Limited use of data exclusively for contact, billing, shipment tracking and legal/customs compliance purposes.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Políticas de confidencialidad internas para todo el personal que maneja información de clientes.' : 'Internal confidentiality policies for all personnel handling customer information.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Cumplimiento con normativas de privacidad aplicables en EE. UU. y Centroamérica.' : 'Compliance with applicable privacy regulations in the USA and Central America.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Protección tecnológica con servidores seguros, contraseñas encriptadas y monitoreo constante.' : 'Technological protection with secure servers, encrypted passwords and constant monitoring.' }}</li>
        </ul>
      </section>

      <!-- 6. User Rights -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '6. DERECHOS DE LOS USUARIOS' : '6. USER RIGHTS' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Los clientes tienen derecho a:' 
            : 'Customers have the right to:' 
          }}
        </p>
        <ul class="info-list">
          <li>{{ currentLanguage === 'es' ? 'Acceder, actualizar o corregir su información personal.' : 'Access, update or correct their personal information.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Solicitar la eliminación de sus datos cuando legalmente sea posible.' : 'Request deletion of their data when legally possible.' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Limitar o rechazar ciertos usos de su información.' : 'Limit or reject certain uses of their information.' }}</li>
        </ul>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Para ejercer sus derechos, puede escribirnos a: [coloca tu correo de contacto].' 
            : 'To exercise your rights, you can write to us at: [insert your contact email].' 
          }}
        </p>
      </section>

      <!-- 7. Cookies and Tracking -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '7. COOKIES Y TECNOLOGÍAS DE RASTREO' : '7. COOKIES AND TRACKING TECHNOLOGIES' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Nuestro sitio web utiliza cookies y tecnologías similares únicamente con fines estadísticos y de funcionamiento. Puede configurar su navegador para rechazarlas, aunque algunas funciones del sitio pueden verse limitadas.' 
            : 'Our website uses cookies and similar technologies solely for statistical and functional purposes. You can configure your browser to reject them, although some site functions may be limited.' 
          }}
        </p>
      </section>

      <!-- 8. Policy Changes -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '8. CAMBIOS A ESTA POLÍTICA' : '8. CHANGES TO THIS POLICY' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Podemos actualizar esta Política de Privacidad ocasionalmente. Notificaremos cambios relevantes en nuestro sitio web y actualizaremos la fecha de "Última actualización".' 
            : 'We may update this Privacy Policy occasionally. We will notify relevant changes on our website and update the "Last updated" date.' 
          }}
        </p>
      </section>

      <!-- 9. Contact -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '9. CONTACTO' : '9. CONTACT' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Si tiene preguntas o inquietudes sobre esta Política de Privacidad, puede comunicarse con nosotros a través de:' 
            : 'If you have questions or concerns about this Privacy Policy, you can contact us through:' 
          }}
        </p>
        <div class="contact-info">
          <p><strong>{{ currentLanguage === 'es' ? 'Tu Caja Express INC' : 'Tu Caja Express INC' }}</strong></p>
          <p>{{ currentLanguage === 'es' ? 'Correo electrónico:' : 'Email:' }} [tu correo]</p>
          <p>{{ currentLanguage === 'es' ? 'Teléfono:' : 'Phone:' }} [tu teléfono]</p>
          <p>{{ currentLanguage === 'es' ? 'Dirección:' : 'Address:' }} [tu dirección en EE. UU.]</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      currentLanguage: 'es'
    }
  }
}
</script>

<style scoped>
.privacy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

.language-selector {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.language-selector button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.language-selector button.active {
  background: #0056b3;
  color: white;
  border-color: #0056b3;
}

.language-selector button:hover {
  background: #f0f0f0;
}

.language-selector button.active:hover {
  background: #004494;
}

.policy-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
}

.last-updated {
  text-align: center;
  font-style: italic;
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.policy-section {
  margin-bottom: 2rem;
}

.policy-section h2 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.policy-section p {
  margin-bottom: 1rem;
  text-align: justify;
}

.info-list {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.info-list li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.highlight-text {
  background-color: #f8f9fa;
  padding: 1rem;
  border-left: 4px solid #3498db;
  font-weight: 600;
  margin-top: 1rem;
}

.contact-info {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #e74c3c;
}

.contact-info p {
  margin-bottom: 0.5rem;
  text-align: left;
}

.contact-info p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .privacy-container {
    padding: 1rem;
  }
  
  .policy-title {
    font-size: 1.5rem;
  }
  
  .language-selector {
    justify-content: center;
  }
  
  .info-list {
    padding-left: 1rem;
  }
}
</style>
