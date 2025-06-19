<template>
  <div class="legal-policies-container">
    <h1 class="policy-title">TÉRMINOS Y CONDICIONES GENERALES DE SERVICIO</h1>


    <section class="policy-section">
      <h2>1. ACEPTACIÓN DE LOS TÉRMINOS</h2>
      <p>Al utilizar los servicios de envío proporcionados por TU CAJA EXPRESS ("la Empresa"), el cliente ("el Usuario") acepta irrevocablemente los presentes Términos y Condiciones Generales de Servicio, así como todas las políticas y procedimientos incorporados por referencia. La Empresa se reserva el derecho de modificar unilateralmente estos términos en cualquier momento, siendo responsabilidad del Usuario revisar periódicamente las actualizaciones.</p>
    </section>

    <section class="policy-section">
      <h2>2. OBLIGACIONES DEL USUARIO</h2>
      <h3>2.1 Empaque y Documentación</h3>
      <p>El Usuario garantiza que:</p>
      <ul>
        <li>Todos los paquetes estarán debidamente empacados según los estándares internacionales de transporte.</li>
        <li>Proporcionará información completa y veraz en el formulario de declaración de contenido.</li>
        <li>Declarará el valor real de los artículos enviados para fines aduanales y de seguro.</li>
      </ul>

      <h3>2.2 Restricciones de Contenido</h3>
      <p>Queda estrictamente prohibido el envío de:</p>
      <ul>
        <li>Sustancias controladas o ilegales según las leyes de origen, tránsito o destino</li>
        <li>Armas de fuego, municiones o explosivos</li>
        <li>Material pornográfico o obsceno</li>
        <li>Especies en peligro o productos derivados</li>
        <li>Dinero en efectivo o instrumentos negociables</li>
        <li>Artículos perecederos sin acondicionamiento especial</li>
      </ul>
    </section>

    <section class="policy-section">
      <h2>3. TARIFAS Y PAGOS</h2>
      <p>3.1 Las tarifas de servicio se calcularán según el peso volumétrico o real (el que sea mayor), dimensiones y destino del paquete.</p>
      <p>3.2 El pago deberá realizarse íntegramente al momento de la recepción del paquete por parte de la Empresa, mediante los métodos autorizados.</p>
      <p>3.3 Cualquier impuesto, arancel o gravamen aduanero será responsabilidad exclusiva del Usuario o destinatario.</p>
    </section>

    <section class="policy-section">
      <h2>4. SEGURO Y RESPONSABILIDAD</h2>
      <h3>4.1 Cobertura Básica</h3>
      <p>Sin perjuicio de lo establecido en estos términos, la responsabilidad máxima de la Empresa por pérdida o daño será de USD $100 por paquete, salvo que se contrate cobertura adicional.</p>

      <h3>4.2 Seguro Opcional</h3>
      <p>El Usuario podrá adquirir cobertura de seguro según las siguientes categorías:</p>
      <table class="insurance-table">
        <thead>
          <tr>
            <th>Tipo de Carga</th>
            <th>Prima</th>
            <th>Cobertura Máxima</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Regular (ropa, calzado)</td>
            <td>5% valor declarado</td>
            <td>USD $500</td>
          </tr>
          <tr>
            <td>Mixta (electrónicos, herramientas)</td>
            <td>15% valor declarado</td>
            <td>USD $500</td>
          </tr>
          <tr>
            <td>Comercial (electrodomésticos, llantas)</td>
            <td>20% valor declarado</td>
            <td>USD $500</td>
          </tr>
        </tbody>
      </table>
      <p>La cobertura aplica únicamente para pérdida total, no cubriendo daños parciales, deterioro por empaque inadecuado o vicios ocultos.</p>
    </section>

    <section class="policy-section">
      <h2>5. PROCEDIMIENTO DE RECLAMOS</h2>
      <p>5.1 Cualquier reclamo por daño o pérdida deberá presentarse por escrito dentro de las 72 horas posteriores a la recepción del paquete, acompañando:</p>
      <ul>
        <li>Fotografías del paquete y contenido</li>
        <li>Copia del formulario de declaración</li>
        <li>Comprobante de pago del servicio</li>
      </ul>
      <p>5.2 La Empresa dispondrá de un plazo de 30 días hábiles para investigar y responder al reclamo.</p>
    </section>

    <section class="policy-section">
      <h2>6. JURISDICCIÓN Y LEY APLICABLE</h2>
      <p>Estos términos se regirán e interpretarán conforme a las leyes de [País de registro de la empresa]. Para cualquier controversia derivada de los servicios, las partes se someten expresamente a la jurisdicción exclusiva de los tribunales competentes de [Ciudad], con renuncia expresa a cualquier otro fuero o jurisdicción que pudiera corresponderles.</p>
    </section>

    <section class="policy-section">
      <h2>7. DISPOSICIONES GENERALES</h2>
      <p>7.1 La Empresa no será responsable por retrasos causados por fuerza mayor, eventos climáticos, procesos aduaneros o cualquier circunstancia ajena a su control razonable.</p>
      <p>7.2 El Usuario autoriza expresamente a la Empresa a inspeccionar los paquetes cuando exista sospecha fundada de contenido prohibido o declaración falsa.</p>
      <p>7.3 La nulidad de alguna cláusula no afectará la validez de las restantes disposiciones.</p>
    </section>

    <div class="acceptance-section">
      <p>AL UTILIZAR NUESTROS SERVICIOS, EL USUARIO DECLARA HABER LEÍDO, COMPRENDIDO Y ACEPTADO TODOS LOS TÉRMINOS Y CONDICIONES AQUÍ ESTABLECIDOS.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LegalPolicies',
  data() {
    return {
      currentDate: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.legal-policies-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

.policy-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
}

.effective-date {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.policy-section {
  margin-bottom: 2.5rem;
}

.policy-section h2 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.policy-section h3 {
  font-size: 1.2rem;
  color: #34495e;
  margin: 1.5rem 0 0.8rem;
}

.policy-section p, .policy-section ul {
  margin-bottom: 1rem;
  text-align: justify;
}

.policy-section ul {
  padding-left: 1.5rem;
}

.policy-section li {
  margin-bottom: 0.5rem;
}

.insurance-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.9rem;
}

.insurance-table th, .insurance-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.insurance-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.insurance-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.acceptance-section {
  margin-top: 3rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-left: 4px solid #3498db;
  font-weight: 600;
  text-align: center;
}

@media (max-width: 768px) {
  .legal-policies-container {
    padding: 1rem;
  }
  
  .policy-title {
    font-size: 1.5rem;
  }
  
  .insurance-table {
    font-size: 0.8rem;
  }
}
</style>