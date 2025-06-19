<template>
  <div class="terms-container">
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
          ? 'TÉRMINOS Y CONDICIONES DE TU CAJA EXPRESS' 
          : 'TU CAJA EXPRESS TERMS AND CONDITIONS' 
        }}
      </h1>

      <!-- 1. Agreement -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '1. ACUERDO DE TÉRMINOS' : '1. TERMS AGREEMENT' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Al entregarnos su paquete para entregar a su destino usted acepta todos los términos y condiciones en este formulario y también acepta los términos y condiciones de una tercera organización involucrada en el proceso de entrega de su envío. Estos términos están sujetos a cambios sin aviso previo.' 
            : 'By giving us your package to deliver to your destination you accept all the terms and conditions in this form and also accept the terms and conditions of a third organization involved in the delivery process of your shipment. These terms are subject to change without notice.' 
          }}
        </p>
      </section>

      <!-- 2. Packaging -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '2. EMPAQUE Y FORMULARIO' : '2. PACKAGING AND FORM' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'El cliente es responsable de empacar adecuadamente sus pertenencias y de completar el formulario de Tu Caja Express. El cliente deberá proporcionar la información necesaria para completar este formulario de envío a un representante de servicio al cliente. Usted es responsable de proporcionar la información correcta.' 
            : 'The customer is responsible for properly packing their belongings and completing the Tu Caja Express form. The customer must provide the necessary information to complete this submission form to a customer service representative. You are responsible for providing the correct information.' 
          }}
        </p>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Si se omite el número total de bultos y/o el peso por paquete, nuestra facturación se basará en nuestra mejor estimación sobre el número de paquetes y/o peso determinado por nosotros. El remitente acepta que los artículos declarados son el único contenido de la caja.' 
            : 'If the total number of packages and/or the weight per package is omitted, our billing will be based on our best estimate of the number of packages and/or weight determined by us. The sender accepts that the declared items are the only contents of the box.' 
          }}
        </p>
      </section>

      <!-- 3. Payment -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '3. RESPONSABILIDAD DE PAGO' : '3. PAYMENT RESPONSIBILITY' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'El remitente es el principal responsable de todos los gastos de envío. Tu Caja Express requiere el pago completo al momento de recoger el paquete.' 
            : 'The sender is the main responsible for all shipping costs. Tu Caja Express requires full payment when picking up the package.' 
          }}
        </p>
      </section>

      <!-- 4. Branch Delivery -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '4. ENTREGA EN SUCURSAL' : '4. BRANCH DELIVERY' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Cuando una caja se redirige a una sucursal (Ocurre) el destinatario cuenta con 3 días para retirar el paquete, de lo contrario Tu Caja Express no se hará responsable por pérdidas o reclamos. En caso de devolución o re-expedición tendrá que hacer un pago de $100.00 para que el paquete sea enviado nuevamente a la sucursal o punto de destino.' 
            : 'When a box is redirected to a branch (Ocurre) the recipient has 3 days to withdraw the package, otherwise Tu Caja Express will not be responsible for losses or claims. In case of return or re-shipment you will have to make a payment of $100.00 for the package to be sent again to the branch or destination point.' 
          }}
        </p>
      </section>

      <!-- 5. Weight Limits -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '5. LÍMITES DE PESO' : '5. WEIGHT LIMITATIONS' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? '(Únicamente para México) Peso máximo 130 Lbs se entregarán a domicilio (si hay cobertura). Cajas con más del límite de libras (130) tendrán cargos adicionales y se entregarán en la sucursal más cercana.' 
            : '(Only for Mexico) Maximum weight 130 Lbs will be delivered to your home (if there is coverage). Boxes with more than the pound limit (130) will have additional charges and will be delivered at the nearest branch.' 
          }}
        </p>
      </section>

      <!-- 6. Liability -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '6. LIMITACIONES DE RESPONSABILIDAD' : '6. LIABILITY LIMITATIONS' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'La Empresa no es responsable por daños ocurridos en el paquete por empaque inadecuado y/o insuficiente. Por la pérdida o daño de artículos prohibidos o no declarados. Por la pérdida parcial, daño o retraso causado por hechos o situaciones que no podamos controlar, incluyendo pero no limitado a: condiciones meteorológicas, huelgas, asaltos, actos gubernamentales, atrasos aduanales, cuarentenas, detenciones de aduana, fallos mecánicos, fallas eléctricas y/u otra situación fuera de nuestro alcance.' 
            : 'The Company is not responsible for damages occurring in the package due to inadequate and/or insufficient packaging. For the loss or damage of prohibited or undeclared items. For partial loss, damage or delay caused by events or situations beyond our control, including but not limited to: weather conditions, strikes, assaults, government acts, customs delays, quarantines, customs detentions, mechanical failures, electrical failures and/or other situations beyond our control.' 
          }}
        </p>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Tu Caja Express se reserva el derecho de privacidad de toda información sobre demoras o decomisos aduanales.' 
            : 'Tu Caja Express reserves the right to privacy of all information about delays or customs seizures.' 
          }}
        </p>
      </section>

      <!-- 7. Insurance -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '7. SEGURO' : '7. INSURANCE' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'El cliente puede proteger su envío con la compra de un seguro. Para México, Centroamérica y Colombia es el 5% en Carga Regular, en Carga Mixta es el 15%, en Carga Comercial es el 20%. Mínimo de declaración $100.00 y máximo $500.00.' 
            : 'The customer can protect their shipment by purchasing insurance. For Mexico, Central America and Colombia it is 5% for Regular Load, 15% for Mixed Load, and 20% for Commercial Load. Minimum declaration $100.00 and maximum $500.00.' 
          }}
        </p>
        <p>
          {{ currentLanguage === 'es' 
            ? 'El seguro cubre pérdida total, no parcial. Al comprar el seguro regular del 5% cubre "ropa y zapatos", Mixto del 15% cubre "ropa, zapatos, electrónicos, herramientas" y Comercial del 20% cubre "herramientas, electrónicos, TVs, línea blanca, llantas, rines y Carga Comercial".' 
            : 'The insurance covers total loss, not partial. When purchasing the regular 5% insurance it covers "clothing and shoes", Mixed 15% covers "clothing, shoes, electronics, tools" and Commercial 20% covers "tools, electronics, TVs, appliances, tires, rims and Commercial Load".' 
          }}
        </p>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Si el envío no cuenta con el seguro, La Empresa responderá simbólicamente con CIEN DÓLARES ($100.00) por paquete de pérdida total.' 
            : 'If the shipment does not have insurance, the Company will respond symbolically with ONE HUNDRED DOLLARS ($100.00) per package of total loss.' 
          }}
        </p>
      </section>

      <!-- 8. Taxes -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '8. IMPUESTOS' : '8. TAXES' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'Cualquier herramienta o electrodoméstico nuevo o usado que envíe el remitente a México debe pagar el 20% de impuesto aduanal sobre el valor declarado. Para Colombia debe pagar el 30% de impuesto sobre el valor declarado en ropa, zapatos y electrodomésticos. Electrónicos para Centroamérica dentro de las cajas van bajo responsabilidad del remitente.' 
            : 'Any new or used tool or appliance sent by the sender to Mexico must pay 20% customs tax on the declared value. For Colombia you must pay 30% tax on the declared value of clothing, shoes and appliances. Electronics for Central America inside the boxes are under the responsibility of the sender.' 
          }}
        </p>
      </section>

      <!-- 9. Delivery Time -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '9. TIEMPO DE ENTREGA' : '9. DELIVERY TIME' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'El tiempo de entrega de Tu Caja Express para México, Guatemala y Honduras es de veinte a treinta días hábiles, Nicaragua de 4-8 semanas y Colombia de 7 a 15 días hábiles. El servicio a Domicilio (Puerta-Puerta) no se garantiza al 100% (*Aplican Restricciones).' 
            : 'The delivery time of Tu Caja Express for Mexico, Guatemala and Honduras is twenty to thirty working days, Nicaragua 4-8 weeks and Colombia 7 to 15 working days. The Home Delivery service (Door-to-Door) is not 100% guaranteed (*Restrictions apply).' 
          }}
        </p>
      </section>

      <!-- 10. Prohibited Items -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '10. ARTÍCULOS PROHIBIDOS' : '10. PROHIBITED ITEMS' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'El remitente declara que no está enviando:' 
            : 'The sender declares that they are not sending:' 
          }}
        </p>
        <ul class="prohibited-items">
          <li>{{ currentLanguage === 'es' ? 'Dinero en efectivo' : 'Cash' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Armas' : 'Weapons' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Drogas' : 'Drugs' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Explosivos' : 'Explosives' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Líquidos' : 'Liquids' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Químicos' : 'Chemicals' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Inflamables' : 'Flammables' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Joyas' : 'Jewelry' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Pornografía' : 'Pornography' }}</li>
          <li>{{ currentLanguage === 'es' ? 'No más de 5 perfumes' : 'No more than 5 perfumes' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Medicamento recetado' : 'Prescription drugs' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Documentos legales' : 'Legal documents' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Mercadería con propósito comercial' : 'Commercial goods' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Mercancía comercial no declarada' : 'Undeclared commercial merchandise' }}</li>
          <li>{{ currentLanguage === 'es' ? 'Cualquier otro artículo prohibido por el país de destino' : 'Any other item prohibited by the destination country' }}</li>
        </ul>
      </section>

      <!-- 11. Total Loss -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '11. PÉRDIDA TOTAL' : '11. TOTAL LOSS' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'En caso de pérdida total del paquete: Tu Caja Express le reembolsará únicamente la cantidad del monto asegurado. El pago del envío no es reembolsable.' 
            : 'In case of total loss of the package: Tu Caja Express will only refund the insured amount. The shipping payment is not refundable.' 
          }}
        </p>
      </section>

      <!-- 12. Claims -->
      <section class="policy-section">
        <h2>{{ currentLanguage === 'es' ? '12. RECLAMOS' : '12. CLAIMS' }}</h2>
        <p>
          {{ currentLanguage === 'es' 
            ? 'El remitente cuenta con 3 días, después de haber recibido el paquete en el destino final para hacer cualquier notificación.' 
            : 'The sender has 3 days, after receiving the package at the final destination to make any notification.' 
          }}
        </p>
      </section>

      <!-- Acceptance -->
      <div class="acceptance-box">
        <p>
          {{ currentLanguage === 'es' 
            ? 'AL UTILIZAR NUESTROS SERVICIOS, USTED ACEPTA TODOS LOS TÉRMINOS Y CONDICIONES AQUÍ ESTABLECIDOS.' 
            : 'BY USING OUR SERVICES, YOU AGREE TO ALL THE TERMS AND CONDITIONS SET FORTH HEREIN.' 
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsAndConditions',
  data() {
    return {
      currentLanguage: 'es'
    }
  }
}
</script>

<style scoped>
.terms-container {
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
  margin-bottom: 1.5rem;
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
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

.prohibited-items {
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
  padding-left: 1.5rem;
}

.prohibited-items li {
  margin-bottom: 0.5rem;
  break-inside: avoid;
}

.acceptance-box {
  margin-top: 3rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-left: 4px solid #3498db;
  text-align: center;
  font-weight: bold;
}

@media (max-width: 768px) {
  .terms-container {
    padding: 1rem;
  }
  
  .policy-title {
    font-size: 1.5rem;
  }
  
  .language-selector {
    justify-content: center;
  }
  
  .prohibited-items {
    columns: 1;
    -webkit-columns: 1;
    -moz-columns: 1;
  }
}
</style>