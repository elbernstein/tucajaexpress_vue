<template>
  <div class="terms-conditions-container">
    <!-- Language Selector -->
    <div class="language-selector">
      <button 
        @click="changeLanguage('es')" 
        :class="{ active: currentLanguage === 'es' }"
      >
        Español
      </button>
      <button 
        @click="changeLanguage('en')" 
        :class="{ active: currentLanguage === 'en' }"
      >
        English
      </button>
    </div>

    <!-- Header Section -->
    <div class="header-section">
      <div class="logo-container">
        <img src="/images/logo-light.png" alt="Tu Caja Express Logo" class="logo">
      </div>
      <h1 class="main-title">
        {{ currentLanguage === 'es' ? 'TÉRMINOS Y CONDICIONES' : 'TERMS AND CONDITIONS' }}
      </h1>
      <div class="decoration-line"></div>
    </div>

    <!-- Content Sections -->
    <div class="content-wrapper">
      <!-- Agreement Terms -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' ? 'Acuerdo de Términos' : 'Terms Agreement' }}
          </h2>
        </div>
        <div class="section-content">
          <p>
            {{ currentLanguage === 'es' 
              ? 'Al entregarnos su paquete para su destino, usted acepta todos los términos y condiciones presentes, así como los de cualquier tercera organización involucrada en el proceso de entrega de su envío.' 
              : 'By giving us your package for delivery, you agree to all the present terms and conditions, as well as those of any third-party organization involved in the delivery process of your shipment.' 
            }}
          </p>
          <div class="notice-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>
              {{ currentLanguage === 'es' 
                ? 'Estos términos están sujetos a cambios sin previo aviso.' 
                : 'These terms are subject to change without prior notice.' 
              }}
            </span>
          </div>
        </div>
      </section>

      <!-- Packaging and Declaration -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' 
              ? 'Empaque Adecuado y Formulario de Declaración' 
              : 'Proper Packaging and Declaration Form' 
            }}
          </h2>
        </div>
        <div class="section-content">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v4"></path>
                  <path d="m16.24 7.76 2.83-2.83"></path>
                  <path d="M18 12h4"></path>
                  <path d="m16.24 16.24 2.83 2.83"></path>
                  <path d="M12 18v4"></path>
                  <path d="m4.93 19.07 2.83-2.83"></path>
                  <path d="M2 12h4"></path>
                  <path d="m4.93 4.93 2.83 2.83"></path>
                </svg>
              </div>
              <p>
                {{ currentLanguage === 'es' 
                  ? 'El cliente es responsable de empacar adecuadamente sus pertenencias.' 
                  : 'The customer is responsible for properly packing their belongings.' 
                }}
              </p>
            </div>
            <div class="info-item">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <p>
                {{ currentLanguage === 'es' 
                  ? 'Debe completar el formulario de Tu Caja Express con información correcta.' 
                  : 'You must complete the Tu Caja Express form with correct information.' 
                }}
              </p>
            </div>
          </div>
          <div class="warning-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>
              {{ currentLanguage === 'es' 
                ? 'Si se omite información, nuestra facturación se basará en nuestra mejor estimación.' 
                : 'If information is omitted, our billing will be based on our best estimate.' 
              }}
            </span>
          </div>
        </div>
      </section>

      <!-- Payment Responsibility -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' 
              ? 'Responsabilidad de Pago' 
              : 'Payment Responsibility' 
            }}
          </h2>
        </div>
        <div class="section-content">
          <div class="payment-info">
            <div class="payment-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M8 8h.01"></path>
                <path d="M8 16h.01"></path>
              </svg>
            </div>
            <div class="payment-text">
              <p>
                {{ currentLanguage === 'es' 
                  ? 'El remitente es el principal responsable de todos los gastos de envío.' 
                  : 'The sender is primarily responsible for all shipping costs.' 
                }}
              </p>
              <p class="highlight-text">
                {{ currentLanguage === 'es' 
                  ? 'Tu Caja Express requiere el pago completo al momento de recoger el paquete.' 
                  : 'Tu Caja Express requires full payment when picking up the package.' 
                }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Branch and Returns -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' 
              ? 'Cajas Dirigidas a Sucursales y Devoluciones' 
              : 'Packages Directed to Branches and Returns' 
            }}
          </h2>
        </div>
        <div class="section-content">
          <div class="branch-info">
            <div class="branch-card">
              <div class="branch-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 class="subsection-title">
                {{ currentLanguage === 'es' 
                  ? 'Cajas a Sucursales ("Ocurre")' 
                  : 'Packages to Branches ("Ocurre")' 
                }}
              </h3>
              <p>
                {{ currentLanguage === 'es' 
                  ? 'Cuando una caja se redirige a una sucursal, el destinatario cuenta con 3 días para retirar el paquete.' 
                  : 'When a package is redirected to a branch, the recipient has 3 days to pick it up.' 
                }}
              </p>
              <div class="time-indicator">
                <span>72 {{ currentLanguage === 'es' ? 'horas' : 'hours' }}</span>
              </div>
            </div>
            
            <div class="branch-card">
              <div class="branch-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 class="subsection-title">
                {{ currentLanguage === 'es' 
                  ? 'Devolución o Re-expedición' 
                  : 'Return or Re-shipment' 
                }}
              </h3>
              <p>
                {{ currentLanguage === 'es' 
                  ? 'En caso de devolución o re-expedición, se deberá realizar un pago de:' 
                  : 'In case of return or re-shipment, a payment of:' 
                }}
              </p>
              <div class="price-tag">
                <span>$100.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Weight Limitations -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' 
              ? 'Limitaciones de Peso (Únicamente para México)' 
              : 'Weight Limitations (Mexico Only)' 
            }}
          </h2>
        </div>
        <div class="section-content">
          <div class="weight-info">
            <div class="weight-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div class="weight-text">
              <p>
                {{ currentLanguage === 'es' 
                  ? 'El peso máximo para entrega a domicilio (si hay cobertura) es de:' 
                  : 'The maximum weight for home delivery (if available) is:' 
                }}
              </p>
              <div class="weight-value">
                <span>130 {{ currentLanguage === 'es' ? 'Lbs' : 'lbs' }}</span>
              </div>
              <p class="note">
                {{ currentLanguage === 'es' 
                  ? 'Las cajas que excedan este límite tendrán cargos adicionales y se entregarán en la sucursal más cercana.' 
                  : 'Packages exceeding this limit will have additional charges and will be delivered to the nearest branch.' 
                }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Responsibility Limitations -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' 
              ? 'Restricciones a Nuestras Responsabilidades' 
              : 'Limitations of Our Responsibilities' 
            }}
          </h2>
        </div>
        <div class="section-content">
          <p class="disclaimer">
            {{ currentLanguage === 'es' 
              ? 'La Empresa no es responsable por:' 
              : 'The Company is not responsible for:' 
            }}
          </p>
          
          <div class="responsibility-grid">
            <div class="responsibility-item">
              <div class="responsibility-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                </svg>
              </div>
              <p>
                {{ currentLanguage === 'es' 
                  ? 'Daños por empaque inadecuado y/o insuficiente.' 
                  : 'Damage due to inadequate and/or insufficient packaging.' 
                }}
              </p>
            </div>
            
            <div class="responsibility-item">
              <div class="responsibility-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
              </div>
              <p>
                {{ currentLanguage === 'es' 
                  ? 'Pérdida o daño de artículos prohibidos o no declarados.' 
                  : 'Loss or damage of prohibited or undeclared items.' 
                }}
              </p>
            </div>
            
            <div class="responsibility-item">
              <div class="responsibility-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <p>
                {{ currentLanguage === 'es' 
                  ? 'Pérdida parcial, daño o retraso por eventos fuera de nuestro control.' 
                  : 'Partial loss, damage or delay caused by events beyond our control.' 
                }}
              </p>
            </div>
          </div>
          
          <div class="external-factors">
            <h4>
              {{ currentLanguage === 'es' 
                ? 'Incluyendo pero no limitado a:' 
                : 'Including but not limited to:' 
              }}
            </h4>
            <div class="factors-tags">
              <span class="factor-tag">{{ currentLanguage === 'es' ? 'Condiciones meteorológicas' : 'Weather conditions' }}</span>
              <span class="factor-tag">{{ currentLanguage === 'es' ? 'Huelgas' : 'Strikes' }}</span>
              <span class="factor-tag">{{ currentLanguage === 'es' ? 'Asaltos' : 'Robberies' }}</span>
              <span class="factor-tag">{{ currentLanguage === 'es' ? 'Actos gubernamentales' : 'Government acts' }}</span>
              <span class="factor-tag">{{ currentLanguage === 'es' ? 'Atrasos aduanales' : 'Customs delays' }}</span>
              <span class="factor-tag">{{ currentLanguage === 'es' ? 'Cuarentenas' : 'Quarantines' }}</span>
              <span class="factor-tag">{{ currentLanguage === 'es' ? 'Detenciones de aduana' : 'Customs detentions' }}</span>
              <span class="factor-tag">{{ currentLanguage === 'es' ? 'Fallas mecánicas' : 'Mechanical failures' }}</span>
              <span class="factor-tag">{{ currentLanguage === 'es' ? 'Fallas eléctricas' : 'Electrical failures' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Insurance Section -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' ? 'Seguro' : 'Insurance' }}
          </h2>
        </div>
        <div class="section-content">
          <p class="insurance-intro">
            {{ currentLanguage === 'es' 
              ? 'El cliente puede proteger su envío con la compra de un seguro:' 
              : 'The customer can protect their shipment by purchasing insurance:' 
            }}
          </p>
          
          <div class="insurance-cards">
            <div class="insurance-card">
              <div class="insurance-header">
                <h3>{{ currentLanguage === 'es' ? 'Carga Regular' : 'Regular Load' }}</h3>
                <div class="insurance-percent">5%</div>
              </div>
              <div class="insurance-details">
                <div class="detail-item">
                  <span class="detail-label">{{ currentLanguage === 'es' ? 'Declaración Mínima:' : 'Minimum Declaration:' }}</span>
                  <span class="detail-value">$100.00</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">{{ currentLanguage === 'es' ? 'Declaración Máxima:' : 'Maximum Declaration:' }}</span>
                  <span class="detail-value">$500.00</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">{{ currentLanguage === 'es' ? 'Cobertura:' : 'Coverage:' }}</span>
                  <span class="detail-value">
                    {{ currentLanguage === 'es' 
                      ? 'Pérdida total de ropa y zapatos' 
                      : 'Total loss of clothing and shoes' 
                    }}
                  </span>
                </div>
              </div>
              <div class="insurance-countries">
                <span>{{ currentLanguage === 'es' ? 'México, Centroamérica, Colombia' : 'Mexico, Central America, Colombia' }}</span>
              </div>
            </div>
            
            <div class="insurance-card">
              <div class="insurance-header">
                <h3>{{ currentLanguage === 'es' ? 'Carga Mixta' : 'Mixed Load' }}</h3>
                <div class="insurance-percent">15%</div>
              </div>
              <div class="insurance-details">
                <div class="detail-item">
                  <span class="detail-label">{{ currentLanguage === 'es' ? 'Declaración Mínima:' : 'Minimum Declaration:' }}</span>
                  <span class="detail-value">$100.00</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">{{ currentLanguage === 'es' ? 'Declaración Máxima:' : 'Maximum Declaration:' }}</span>
                  <span class="detail-value">$500.00</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">{{ currentLanguage === 'es' ? 'Cobertura:' : 'Coverage:' }}</span>
                  <span class="detail-value">
                    {{ currentLanguage === 'es' 
                      ? 'Pérdida total de ropa, zapatos, electrónicos, herramientas' 
                      : 'Total loss of clothing, shoes, electronics, tools' 
                    }}
                  </span>
                </div>
              </div>
              <div class="insurance-countries">
                <span>{{ currentLanguage === 'es' ? 'México, Centroamérica, Colombia' : 'Mexico, Central America, Colombia' }}</span>
              </div>
            </div>
            
            <div class="insurance-card">
              <div class="insurance-header">
                <h3>{{ currentLanguage === 'es' ? 'Carga Comercial' : 'Commercial Load' }}</h3>
                <div class="insurance-percent">20%</div>
              </div>
              <div class="insurance-details">
                <div class="detail-item">
                  <span class="detail-label">{{ currentLanguage === 'es' ? 'Declaración Mínima:' : 'Minimum Declaration:' }}</span>
                  <span class="detail-value">$100.00</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">{{ currentLanguage === 'es' ? 'Declaración Máxima:' : 'Maximum Declaration:' }}</span>
                  <span class="detail-value">$500.00</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">{{ currentLanguage === 'es' ? 'Cobertura:' : 'Coverage:' }}</span>
                  <span class="detail-value">
                    {{ currentLanguage === 'es' 
                      ? 'Pérdida total de herramientas, electrónicos, TVs, línea blanca, llantas, rines y carga comercial' 
                      : 'Total loss of tools, electronics, TVs, appliances, tires, rims and commercial cargo' 
                    }}
                  </span>
                </div>
              </div>
              <div class="insurance-countries">
                <span>{{ currentLanguage === 'es' ? 'México, Centroamérica, Colombia' : 'Mexico, Central America, Colombia' }}</span>
              </div>
            </div>
          </div>
          
          <div class="insurance-note">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>
              {{ currentLanguage === 'es' 
                ? 'El seguro cubre pérdida total, no parcial. Sin seguro, la Empresa responderá con CIEN DÓLARES ($100.00) por paquete en caso de pérdida total.' 
                : 'Insurance covers total loss, not partial. Without insurance, the Company will respond with ONE HUNDRED DOLLARS ($100.00) per package in case of total loss.' 
              }}
            </p>
          </div>
        </div>
      </section>

      <!-- Taxes Section -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' ? 'Impuestos' : 'Taxes' }}
          </h2>
        </div>
        <div class="section-content">
          <div class="tax-cards">
            <div class="tax-card">
              <div class="tax-country">{{ currentLanguage === 'es' ? 'México' : 'Mexico' }}</div>
              <div class="tax-rate">20%</div>
              <p class="tax-description">
                {{ currentLanguage === 'es' 
                  ? 'Cualquier herramienta o electrodoméstico nuevo o usado debe pagar el 20% de impuesto aduanal sobre el valor declarado.' 
                  : 'Any new or used tool or appliance must pay 20% customs tax on the declared value.' 
                }}
              </p>
            </div>
            
            <div class="tax-card">
              <div class="tax-country">{{ currentLanguage === 'es' ? 'Colombia' : 'Colombia' }}</div>
              <div class="tax-rate">30%</div>
              <p class="tax-description">
                {{ currentLanguage === 'es' 
                  ? 'Se debe pagar el 30% de impuesto sobre el valor declarado en ropa, zapatos y electrodomésticos.' 
                  : 'You must pay 30% tax on the declared value of clothing, shoes and appliances.' 
                }}
              </p>
            </div>
            
            <div class="tax-card">
              <div class="tax-country">{{ currentLanguage === 'es' ? 'Centroamérica' : 'Central America' }}</div>
              <div class="tax-rate">-</div>
              <p class="tax-description">
                {{ currentLanguage === 'es' 
                  ? 'El envío de electrónicos dentro de las cajas va bajo responsabilidad del remitente.' 
                  : 'Shipping electronics in boxes is under the sender\'s responsibility.' 
                }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Delivery Time Section -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' 
              ? 'Tiempo de Entrega' 
              : 'Delivery Time' 
            }}
          </h2>
        </div>
        <div class="section-content">
          <div class="delivery-timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h4>{{ currentLanguage === 'es' ? 'México, Guatemala, Honduras' : 'Mexico, Guatemala, Honduras' }}</h4>
                <p>{{ currentLanguage === 'es' ? '20 a 30 días hábiles' : '20 to 30 business days' }}</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h4>{{ currentLanguage === 'es' ? 'Nicaragua' : 'Nicaragua' }}</h4>
                <p>{{ currentLanguage === 'es' ? '4 a 8 semanas' : '4 to 8 weeks' }}</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h4>{{ currentLanguage === 'es' ? 'Colombia' : 'Colombia' }}</h4>
                <p>{{ currentLanguage === 'es' ? '7 a 15 días hábiles' : '7 to 15 business days' }}</p>
              </div>
            </div>
          </div>
          
          <div class="delivery-note">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <p>
              {{ currentLanguage === 'es' 
                ? 'El servicio a domicilio (Puerta-Puerta) no se garantiza al 100% (*Aplican Restricciones).' 
                : 'Home delivery service (Door-to-Door) is not 100% guaranteed (*Restrictions apply).' 
              }}
            </p>
          </div>
        </div>
      </section>

      <!-- Prohibited Items Section -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' 
              ? 'Artículos Prohibidos' 
              : 'Prohibited Items' 
            }}
          </h2>
        </div>
        <div class="section-content">
          <p class="prohibited-intro">
            {{ currentLanguage === 'es' 
              ? 'El remitente declara que no está enviando:' 
              : 'The sender declares they are not shipping:' 
            }}
          </p>
          
          <div class="prohibited-grid">
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Dinero en efectivo' : 'Cash' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Armas' : 'Weapons' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Drogas' : 'Drugs' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Explosivos' : 'Explosives' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Líquidos' : 'Liquids' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Químicos' : 'Chemicals' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Inflamables' : 'Flammables' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Joyas' : 'Jewelry' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Pornografía' : 'Pornography' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'No más de 5 perfumes' : 'No more than 5 perfumes' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Medicamentos recetados' : 'Prescription drugs' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Documentos legales' : 'Legal documents' }}</span>
            </div>
            <div class="prohibited-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>{{ currentLanguage === 'es' ? 'Mercadería comercial' : 'Commercial merchandise' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Total Loss Section -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' 
              ? 'En Caso de Pérdida Total del Paquete' 
              : 'In Case of Total Package Loss' 
            }}
          </h2>
        </div>
        <div class="section-content">
          <div class="refund-info">
            <div class="refund-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v4"></path>
                <path d="m16.24 7.76 2.83-2.83"></path>
                <path d="M18 12h4"></path>
                <path d="m16.24 16.24 2.83 2.83"></path>
                <path d="M12 18v4"></path>
                <path d="m4.93 19.07 2.83-2.83"></path>
                <path d="M2 12h4"></path>
                <path d="m4.93 4.93 2.83 2.83"></path>
              </svg>
            </div>
            <div class="refund-text">
              <p>
                {{ currentLanguage === 'es' 
                  ? 'Tu Caja Express le reembolsará únicamente la cantidad del monto asegurado.' 
                  : 'Tu Caja Express will only refund the insured amount.' 
                }}
              </p>
              <div class="warning-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>
                  {{ currentLanguage === 'es' 
                    ? 'El pago del envío no es reembolsable.' 
                    : 'The shipping payment is not refundable.' 
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Claims Section -->
      <section class="terms-section card">
        <div class="section-header">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2 class="section-title">
            {{ currentLanguage === 'es' ? 'Reclamos' : 'Claims' }}
          </h2>
        </div>
        <div class="section-content">
          <div class="claim-info">
            <div class="claim-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div class="claim-text">
              <p>
                {{ currentLanguage === 'es' 
                  ? 'El remitente cuenta con 3 días después de haber recibido el paquete en el destino final para realizar cualquier notificación.' 
                  : 'The sender has 3 days after receiving the package at the final destination to make any notification.' 
                }}
              </p>
              <div class="time-indicator">
                <span>72 {{ currentLanguage === 'es' ? 'horas' : 'hours' }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentLanguage = ref('es');

const changeLanguage = (lang) => {
  currentLanguage.value = lang;
};
</script>

<style scoped>
.language-selector {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem 0;
  gap: 0.5rem;
}

.language-selector button {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: #e9ecef;
  color: #495057;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.language-selector button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.language-selector button.active {
  background: linear-gradient(135deg, #0056b3, #007bff);
  color: white;
  box-shadow: 0 4px 8px rgba(0, 86, 179, 0.2);
}

.language-selector button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.3);
}

/* Efecto para pantallas pequeñas */
@media (max-width: 768px) {
  .language-selector {
    justify-content: center;
    padding: 0.75rem 1rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }
  
  .language-selector button {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}
/* Base Styles */
:root {
  --primary-color: #0056b3;
  --secondary-color: #007bff;
  --accent-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  --gray-color: #6c757d;
  --border-radius: 8px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Container Styles */
.terms-conditions-container {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f7fa;
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.header-section {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 2rem 1.5rem;
  text-align: center;
  position: relative;
  margin-bottom: 2rem;
}

.logo-container {
  margin-bottom: 1rem;
}

.logo {
  height: 50px;
  width: auto;
}

.main-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.decoration-line {
  height: 4px;
  width: 80px;
  background-color: white;
  margin: 0 auto;
  border-radius: 2px;
}

.content-wrapper {
  padding: 0 1.5rem 2rem;
}

/* Card Styles */
.card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
  overflow: hidden;
  transition: var(--transition);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Section Styles */
.terms-section {
  position: relative;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--light-color);
  border-bottom: 1px solid #eee;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
}

.icon-box svg {
  color: white;
  width: 24px;
  height: 24px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--dark-color);
  margin: 0;
}

.section-content {
  padding: 1.5rem;
}

.subsection-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent-color);
  margin: 1rem 0 0.5rem;
}

/* Notice and Warning Boxes */
.notice-box, .warning-box {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  margin: 1rem 0;
  font-size: 0.9rem;
}

.notice-box {
  background-color: #e7f5ff;
  color: var(--primary-color);
  border-left: 4px solid var(--primary-color);
}

.warning-box {
  background-color: #fff3bf;
  color: #856404;
  border-left: 4px solid var(--warning-color);
}

.notice-box svg, .warning-box svg {
  margin-right: 0.5rem;
  flex-shrink: 0;
}

/* Info Grid Layout */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.info-item {
  display: flex;
  align-items: flex-start;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-radius: var(--border-radius);
}

.info-icon {
  margin-right: 0.75rem;
  color: var(--primary-color);
}

/* Payment Info Styles */
.payment-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.payment-icon {
  flex-shrink: 0;
  color: var(--primary-color);
}

.payment-text {
  flex-grow: 1;
}

.highlight-text {
  color: var(--danger-color);
  font-weight: 600;
  margin-top: 0.5rem;
}

/* Branch Info Styles */
.branch-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.branch-card {
  padding: 1.25rem;
  border-radius: var(--border-radius);
  background-color: #f8f9fa;
  border: 1px solid #eee;
  transition: var(--transition);
}

.branch-card:hover {
  border-color: var(--primary-color);
}

.branch-icon {
  margin-bottom: 0.75rem;
  color: var(--primary-color);
}

.time-indicator, .price-tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  margin-top: 0.75rem;
}

.time-indicator {
  background-color: #e3f2fd;
  color: var(--primary-color);
}

.price-tag {
  background-color: #e8f5e9;
  color: var(--accent-color);
}

/* Weight Info Styles */
.weight-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.weight-icon {
  flex-shrink: 0;
  color: var(--primary-color);
}

.weight-text {
  flex-grow: 1;
}

.weight-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0.5rem 0;
}

.note {
  font-size: 0.9rem;
  color: var(--gray-color);
}

/* Responsibility Grid */
.responsibility-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.responsibility-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: var(--border-radius);
  border-left: 4px solid var(--danger-color);
}

.responsibility-icon {
  margin-right: 0.75rem;
  color: var(--danger-color);
}

.disclaimer {
  font-weight: 600;
  margin-bottom: 1rem;
}

/* External Factors Tags */
.external-factors {
  margin-top: 1.5rem;
}

.external-factors h4 {
  margin-bottom: 0.75rem;
  color: var(--gray-color);
  font-size: 0.9rem;
}

.factors-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.factor-tag {
  background-color: #e9ecef;
  color: var(--dark-color);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

/* Insurance Cards */
.insurance-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.insurance-card {
  border: 1px solid #eee;
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
}

.insurance-card:hover {
  border-color: var(--primary-color);
}

.insurance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: var(--light-color);
  border-bottom: 1px solid #eee;
}

.insurance-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--dark-color);
}

.insurance-percent {
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.insurance-details {
  padding: 1.25rem;
}

.detail-item {
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
}

.detail-label {
  font-weight: 600;
  color: var(--gray-color);
  font-size: 0.9rem;
}

.detail-value {
  text-align: right;
  flex-grow: 1;
  padding-left: 1rem;
  font-size: 0.9rem;
}

.insurance-countries {
  padding: 0.75rem 1.25rem;
  background-color: #f8f9fa;
  border-top: 1px solid #eee;
  font-size: 0.8rem;
  color: var(--gray-color);
  text-align: center;
}

.insurance-note {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #f8f9fa;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
}

.insurance-note svg {
  margin-right: 0.5rem;
  color: var(--gray-color);
  flex-shrink: 0;
}

/* Tax Cards */
.tax-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.tax-card {
  padding: 1.25rem;
  border-radius: var(--border-radius);
  background-color: #f8f9fa;
  border: 1px solid #eee;
  text-align: center;
  transition: var(--transition);
}

.tax-card:hover {
  border-color: var(--primary-color);
}

.tax-country {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--dark-color);
  margin-bottom: 0.5rem;
}

.tax-rate {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0.5rem 0;
}

.tax-description {
  font-size: 0.9rem;
  color: var(--gray-color);
}

/* Delivery Timeline */
.delivery-timeline {
  position: relative;
  padding-left: 30px;
  margin: 1.5rem 0;
}

.timeline-item {
  position: relative;
  padding-bottom: 1.5rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -30px;
  top: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--primary-color);
  border: 3px solid white;
  box-shadow: 0 0 0 2px var(--primary-color);
}

.timeline-content h4 {
  font-size: 1.1rem;
  color: var(--dark-color);
  margin-bottom: 0.25rem;
}

.timeline-content p {
  color: var(--gray-color);
  font-size: 0.9rem;
}

.delivery-note {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #fff3bf;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  color: #856404;
}

.delivery-note svg {
  margin-right: 0.5rem;
  color: #856404;
  flex-shrink: 0;
}

/* Prohibited Items Grid */
.prohibited-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.prohibited-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: #f8f9fa;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
}

.prohibited-item svg {
  margin-right: 0.5rem;
  color: var(--danger-color);
  flex-shrink: 0;
}

.prohibited-intro {
  margin-bottom: 1rem;
}

/* Refund Info Styles */
.refund-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.refund-icon {
  flex-shrink: 0;
  color: var(--primary-color);
}

.refund-text {
  flex-grow: 1;
}

/* Claim Info Styles */
.claim-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.claim-icon {
  flex-shrink: 0;
  color: var(--primary-color);
}

.claim-text {
  flex-grow: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-title {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 1.3rem;
  }
  
  .payment-info, .weight-info, .refund-info, .claim-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .info-grid, .responsibility-grid {
    grid-template-columns: 1fr;
  }
  
  .insurance-cards, .tax-cards {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .icon-box {
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .header-section {
    padding: 1.5rem 1rem;
  }
  
  .content-wrapper {
    padding: 0 1rem 1.5rem;
  }
  
  .section-header {
    padding: 1rem;
  }
  
  .section-content {
    padding: 1rem;
  }
  
  .prohibited-grid {
    grid-template-columns: 1fr;
  }
}
</style>