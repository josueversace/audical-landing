/**
 * Audical Micro-RIC 16X - Interactive Controller
 * Landing Page de Alta Conversión (Perú)
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  initCountdownTimer();
  initSmartHeader();
  initFaqAccordion();
  initAppFeaturesAccordion();
  initSoundSimulator();
  initFormHandling();
  initRecentBuyerToasts();
  initStickyMobileCTA();
  initSmoothScroll();
});

/* ==========================================================================
   1. Countdown Urgency Timer (18m 42s loop)
   ========================================================================== */
function initCountdownTimer() {
  const timerDisplays = document.querySelectorAll('.countdown-display');
  if (!timerDisplays.length) return;

  // Set default initial timer of 18 minutes and 45 seconds
  let totalSeconds = 18 * 60 + 45;

  // Try retrieving saved timestamp from session storage
  const savedEndTime = sessionStorage.getItem('audical_offer_end');
  const now = Math.floor(Date.now() / 1000);

  if (savedEndTime && savedEndTime > now) {
    totalSeconds = savedEndTime - now;
  } else {
    sessionStorage.setItem('audical_offer_end', now + totalSeconds);
  }

  function updateTimer() {
    if (totalSeconds <= 0) {
      totalSeconds = 15 * 60; // reset to 15 min
      sessionStorage.setItem('audical_offer_end', Math.floor(Date.now() / 1000) + totalSeconds);
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    timerDisplays.forEach(display => {
      display.textContent = formatted;
    });

    totalSeconds--;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   2. FAQ Accordion Logic
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordions
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current accordion
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2.1. Mobile App Features Interactive Accordion (Section 7)
   ========================================================================== */
function initAppFeaturesAccordion() {
  const featureDetails = document.querySelectorAll('#app-features-accordion-group details');
  if (!featureDetails.length) return;

  function syncWithScreenSize() {
    const isDesktop = window.innerWidth >= 1024;
    featureDetails.forEach((detail, index) => {
      if (isDesktop) {
        detail.setAttribute('open', '');
      } else {
        // On mobile, start with first one open, others collapsed for ultra-compact view
        if (index === 0) {
          detail.setAttribute('open', '');
        } else {
          detail.removeAttribute('open');
        }
      }
    });
  }

  // Handle mobile exclusive expansion (close others on tap)
  featureDetails.forEach(detail => {
    detail.addEventListener('click', (e) => {
      if (window.innerWidth >= 1024) {
        // Prevent collapse on desktop
        e.preventDefault();
        return;
      }
      
      // If clicking summary to open, close other accordion items on mobile
      if (!detail.open) {
        featureDetails.forEach(other => {
          if (other !== detail) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });

  syncWithScreenSize();
  window.addEventListener('resize', syncWithScreenSize);
}

/* ==========================================================================
   3. Interactive Hearing Loss Simulator (Philips-Style Real Audio Player)
   ========================================================================== */
function initSoundSimulator() {
  const scenarioBtns = document.querySelectorAll('.sim-scenario-btn');
  const playBtn = document.getElementById('sim-play-btn');
  const playIcon = document.getElementById('sim-icon-play');
  const pauseIcon = document.getElementById('sim-icon-pause');
  const pulseRing = document.getElementById('sim-pulse-ring');
  const rangeInput = document.getElementById('sim-range-input');
  const levelLabel = document.getElementById('sim-level-label');
  const levelDesc = document.getElementById('sim-level-desc');
  const stepSpans = document.querySelectorAll('[data-step]');

  let currentScenario = 'speech'; // default scenario: 'speech', 'bird', 'concert'
  let currentLevelIdx = 0;        // 0: normal, 1: mild, 2: moderate, 3: severe, 4: profound
  let isPlaying = false;
  let audioPlayer = new Audio();
  audioPlayer.loop = true;
  audioPlayer.preload = 'auto';

  const levels = ['normal', 'mild', 'moderate', 'severe', 'profound'];
  
  const levelInfo = [
    {
      title: 'Normal (100% Claridad)',
      desc: '"Escuchas todas las frecuencias con nitidez cristalina, captando cada consonante y detalle acústico del ambiente."',
      color: 'text-teal-700'
    },
    {
      title: 'Leve (Pérdida Inicial)',
      desc: '"Las frecuencias muy agudas se apagan sutilmente. Ciertos susurros y sonidos suaves empiezan a perder definición."',
      color: 'text-sky-700'
    },
    {
      title: 'Moderado (Pérdida Habitual)',
      desc: '"La voz suena apagada y lejana. Dificultad notable para entender conversaciones familiares en medio del ruido ambiental."',
      color: 'text-amber-700'
    },
    {
      title: 'Severo (Pérdida Avanzada)',
      desc: '"Sonido muy amortiguado como «bajo el agua». Solo se perciben ruidos graves; la conversación se vuelve ininteligible."',
      color: 'text-orange-700'
    },
    {
      title: 'Profundo (Aislamiento Total)',
      desc: '"Pérdida auditiva extrema. Prácticamente todo el espectro sonoro desaparece sin el uso de audífonos digitales."',
      color: 'text-red-700'
    }
  ];

  function getAudioSrc(scenario, levelIdx) {
    const levelName = levels[levelIdx] || 'normal';
    return `/assets/audio/${scenario}-${levelName}.mp3`;
  }

  function updateAudioSource(preserveTime = true) {
    const prevTime = preserveTime && audioPlayer ? audioPlayer.currentTime : 0;
    const newSrc = getAudioSrc(currentScenario, currentLevelIdx);
    
    audioPlayer.src = newSrc;
    audioPlayer.load();

    if (preserveTime && prevTime > 0) {
      audioPlayer.onloadedmetadata = () => {
        try {
          if (audioPlayer.duration && prevTime < audioPlayer.duration) {
            audioPlayer.currentTime = prevTime;
          }
        } catch (e) {}
      };
    }

    if (isPlaying) {
      const playPromise = audioPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log('Audio playback prevented/paused:', e);
        });
      }
    }
  }

  function updateLevelUI(idx) {
    currentLevelIdx = Math.max(0, Math.min(4, parseInt(idx, 10)));
    if (rangeInput) rangeInput.value = currentLevelIdx;

    const info = levelInfo[currentLevelIdx];
    if (levelLabel) {
      levelLabel.textContent = info.title;
      levelLabel.className = `font-bold text-sm ${info.color}`;
    }
    if (levelDesc) {
      levelDesc.textContent = info.desc;
    }

    // Highlight active step text
    stepSpans.forEach(span => {
      const spanStep = parseInt(span.getAttribute('data-step'), 10);
      if (spanStep === currentLevelIdx) {
        span.classList.add('font-bold', 'text-teal-700');
        span.classList.remove('text-slate-500');
      } else {
        span.classList.remove('font-bold', 'text-teal-700');
        span.classList.add('text-slate-500');
      }
    });

    updateAudioSource(true);
  }

  function updateScenarioUI(scenarioKey) {
    currentScenario = scenarioKey;
    scenarioBtns.forEach(btn => {
      if (btn.dataset.scenario === scenarioKey) {
        btn.classList.remove('bg-slate-100', 'text-slate-700', 'border-slate-200');
        btn.classList.add('bg-teal-600', 'text-white', 'border-teal-600', 'font-bold', 'shadow-md');
      } else {
        btn.classList.add('bg-slate-100', 'text-slate-700', 'border-slate-200');
        btn.classList.remove('bg-teal-600', 'text-white', 'border-teal-600', 'font-bold', 'shadow-md');
      }
    });

    updateAudioSource(true);
  }

  function togglePlay() {
    if (!isPlaying) {
      isPlaying = true;
      if (playIcon) playIcon.classList.add('hidden');
      if (pauseIcon) pauseIcon.classList.remove('hidden');
      if (pulseRing) {
        pulseRing.classList.remove('hidden');
        pulseRing.classList.add('sim-play-pulse');
      }
      if (!audioPlayer.src || audioPlayer.src === '') {
        audioPlayer.src = getAudioSrc(currentScenario, currentLevelIdx);
      }
      audioPlayer.play().catch(err => {
        console.warn('Audio play request failed:', err);
      });
    } else {
      isPlaying = false;
      if (playIcon) playIcon.classList.remove('hidden');
      if (pauseIcon) pauseIcon.classList.add('hidden');
      if (pulseRing) {
        pulseRing.classList.add('hidden');
        pulseRing.classList.remove('sim-play-pulse');
      }
      audioPlayer.pause();
    }
  }

  // Setup event listeners
  if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
  }

  if (rangeInput) {
    rangeInput.addEventListener('input', (e) => {
      updateLevelUI(e.target.value);
    });
  }

  scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateScenarioUI(btn.dataset.scenario);
    });
  });

  stepSpans.forEach(span => {
    span.addEventListener('click', () => {
      const stepIdx = span.getAttribute('data-step');
      if (stepIdx !== null) {
        updateLevelUI(stepIdx);
      }
    });
  });

  // Expose global helper for inline clicks if needed
  window.setSimulatorLevel = function(idx) {
    updateLevelUI(idx);
  };

  // Initial setup
  audioPlayer.src = getAudioSrc(currentScenario, currentLevelIdx);
}

/* ==========================================================================
   4. Lead & Order Form Handling with WhatsApp Checkout Flow
   ========================================================================== */
function initFormHandling() {
  const orderForm = document.getElementById('audical-order-form');
  const modal = document.getElementById('order-success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const confirmWhatsappBtn = document.getElementById('modal-whatsapp-confirm-btn');
  const phoneInput = document.getElementById('order-phone');

  // Format Peruvian phone number (9 digits only)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 9) value = value.slice(0, 9);
      e.target.value = value;
    });
  }

  // Package Radio selectors update pricing, styles & sticky mobile bar
  const packageRadios = document.querySelectorAll('input[name="package_selection"]');
  const priceDisplay = document.getElementById('summary-price-display');
  const discountDisplay = document.getElementById('summary-discount-display');
  const packageLabel = document.getElementById('summary-package-label');
  const stickyPrice = document.getElementById('sticky-mobile-price');
  const stickyOrigPrice = document.getElementById('sticky-mobile-original-price');
  const stickyLabel = document.getElementById('sticky-mobile-label');
  const cardSingle = document.getElementById('pkg-card-single');
  const cardDuo = document.getElementById('pkg-card-duo');

  function updatePackageSelection(selectedVal) {
    if (selectedVal === 'duo') {
      if (priceDisplay) priceDisplay.textContent = 'S/ 3,490.00';
      if (discountDisplay) discountDisplay.textContent = 'Ahorras S/ 4,490.00 (-56%)';
      if (packageLabel) packageLabel.textContent = 'Dúo Familiar (2 Kits · Envío Gratis)';
      if (stickyPrice) stickyPrice.textContent = 'S/ 3,490.00';
      if (stickyOrigPrice) stickyOrigPrice.textContent = 'S/ 7,980.00';
      if (stickyLabel) stickyLabel.textContent = '2 Kits';

      if (cardDuo) {
        cardDuo.classList.add('border-emerald-600', 'bg-emerald-50/60');
        cardDuo.classList.remove('border-slate-200', 'bg-white');
      }
      if (cardSingle) {
        cardSingle.classList.remove('border-emerald-600', 'bg-emerald-50/60');
        cardSingle.classList.add('border-slate-200', 'bg-white');
      }
    } else {
      if (priceDisplay) priceDisplay.textContent = 'S/ 1,990.00';
      if (discountDisplay) discountDisplay.textContent = 'Ahorras S/ 2,000.00 (-50%)';
      if (packageLabel) packageLabel.textContent = 'Kit Binaural (1 Kit · Envío Gratis)';
      if (stickyPrice) stickyPrice.textContent = 'S/ 1,990.00';
      if (stickyOrigPrice) stickyOrigPrice.textContent = 'S/ 3,990.00';
      if (stickyLabel) stickyLabel.textContent = 'Kit Binaural';

      if (cardSingle) {
        cardSingle.classList.add('border-emerald-600', 'bg-emerald-50/60');
        cardSingle.classList.remove('border-slate-200', 'bg-white');
      }
      if (cardDuo) {
        cardDuo.classList.remove('border-emerald-600', 'bg-emerald-50/60');
        cardDuo.classList.add('border-slate-200', 'bg-white');
      }
    }
  }

  packageRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      updatePackageSelection(e.target.value);
    });
  });

  if (!orderForm) return;

  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('order-name').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const city = document.getElementById('order-city').value.trim();
    const address = document.getElementById('order-address').value.trim();
    const reference = document.getElementById('order-reference') ? document.getElementById('order-reference').value.trim() : '';
    const selectedPkg = document.querySelector('input[name="package_selection"]:checked')?.value || 'single';
    const submitBtn = orderForm.querySelector('button[type="submit"]');

    // Validation
    if (!name || !phone || !city || !address) {
      alert('Por favor complete todos los campos obligatorios para coordinar su envío contra entrega.');
      return;
    }

    if (phone.length !== 9) {
      alert('Por favor ingrese un número de celular peruano válido de 9 dígitos (ej. 987654321).');
      return;
    }

    const packagePrice = selectedPkg === 'duo' ? 'S/ 3,490.00' : 'S/ 1,990.00';
    const packageText = selectedPkg === 'duo' 
      ? `Dúo Familiar Micro-RIC 16X (2 Estuches LED + 4 Audífonos) - S/ 3,490`
      : `Kit Binaural Micro-RIC 16X (1 Estuche LED + 2 Audífonos) - S/ 1,990`;

    // Fill Modal Information
    const modalName = document.getElementById('modal-client-name');
    const modalPhone = document.getElementById('modal-client-phone');
    const modalLoc = document.getElementById('modal-client-location');
    const modalAddr = document.getElementById('modal-client-address');
    const modalPkg = document.getElementById('modal-client-package');

    if (modalName) modalName.textContent = name;
    if (modalPhone) modalPhone.textContent = `+51 ${phone}`;
    if (modalLoc) modalLoc.textContent = city;
    if (modalAddr) modalAddr.textContent = address + (reference ? ` (Ref: ${reference})` : '');
    if (modalPkg) modalPkg.textContent = packageText;

    // Generate WhatsApp URL with prefilled order
    const whatsappNumber = "51987654321"; // Peru business WhatsApp number
    const whatsappMessage = encodeURIComponent(
      `👋 ¡Hola Audical! Acabo de registrar mi pedido en la web con Pago Contra Entrega:\n\n` +
      `👤 *Cliente:* ${name}\n` +
      `📱 *Celular:* ${phone}\n` +
      `📍 *Ciudad / Provincia:* ${city}\n` +
      `🏠 *Dirección:* ${address}\n` +
      (reference ? `📌 *Referencia / Agencia:* ${reference}\n` : '') +
      `📦 *Opción:* ${packageText}\n` +
      `💰 *Total a pagar al recibir:* ${packagePrice} (Envío 100% Gratis)\n\n` +
      `🤝 Solicito la confirmación de mi despacho prioritario.`
    );

    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;
    
    if (confirmWhatsappBtn) {
      confirmWhatsappBtn.href = whatsappLink;
    }

    // UI Loading state
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="w-5 h-5 mr-2 animate-spin text-white inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Enviando pedido...</span>
      `;
    }

    // Determinar versión de landing según ruta
    let landingVersion = 'Principal / Orgánico (Web Directa)';
    const currentPath = window.location.pathname.toLowerCase();
    const currentHref = window.location.href.toLowerCase();

    if (currentPath.includes('/otc') || currentHref.includes('otc')) {
      landingVersion = 'Emocional / Familiar (Ads OTC)';
    } else if (currentPath.includes('/ric') || currentHref.includes('ric')) {
      landingVersion = 'Técnico / Clínico (Ads RIC)';
    } else {
      landingVersion = 'Principal / Orgánico (Web Directa)';
    }

    // 1. Enviar datos a n8n en segundo plano
    const leadPayload = {
      name,
      phone,
      city,
      address,
      reference,
      package: selectedPkg,
      packageText,
      price: packagePrice,
      landingVersion,
      landingUrl: window.location.href,
      landingPath: window.location.pathname,
      referrer: document.referrer || 'Directo',
      timestamp: new Date().toISOString(),
      source: 'audical.shop',
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    const N8N_WEBHOOK_URL = 'https://n8n.conecta2.lat/webhook/audical-nuevo-lead';

    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadPayload)
      });
    } catch (error) {
      console.warn('Error al registrar lead en n8n:', error);
    } finally {
      // Restaurar estado del botón
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }

      // Mostrar modal de éxito
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }

      // Resetear Formulario
      orderForm.reset();

      // 2. Redirección directa hacia WhatsApp
      setTimeout(() => {
        window.location.href = whatsappLink;
      }, 600);
    }
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }
}

/* ==========================================================================
   6. Live "Recent Purchase" Toast Notifications for Social Proof
   ========================================================================== */
function initRecentBuyerToasts() {
  const toastContainer = document.getElementById('recent-buyer-toast');
  if (!toastContainer) return;

  const buyers = [
    { name: "Carlos M.", city: "Jaén, Cajamarca", time: "hace 4 min", pkg: "1 Kit Micro-RIC" },
    { name: "Rosa Elena V.", city: "San Borja, Lima", time: "hace 8 min", pkg: "1 Kit Micro-RIC" },
    { name: "Jorge L. P.", city: "Arequipa", time: "hace 14 min", pkg: "Pack Familiar (2 Kits)" },
    { name: "Gladys R.", city: "Trujillo", time: "hace 19 min", pkg: "1 Kit Micro-RIC" },
    { name: "Víctor H.", city: "Chiclayo", time: "hace 27 min", pkg: "1 Kit Micro-RIC" },
    { name: "María Isabel C.", city: "Cusco", time: "hace 32 min", pkg: "1 Kit Micro-RIC" },
    { name: "Alfonso D.", city: "Huancayo", time: "hace 41 min", pkg: "Pack Familiar (2 Kits)" },
    { name: "Teresa S.", city: "Piura", time: "hace 52 min", pkg: "1 Kit Micro-RIC" }
  ];

  let currentIndex = 0;

  function showNextToast() {
    const buyer = buyers[currentIndex];
    toastContainer.innerHTML = `
      <div class="flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-slate-200/90 text-xs">
        <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div class="flex-1 min-w-0 leading-tight">
          <p class="font-bold text-slate-900 text-[11px] truncate">${buyer.name} <span class="text-slate-500 font-normal">en ${buyer.city}</span></p>
          <p class="text-[10px] text-slate-600 font-medium truncate">Pidió <span class="text-emerald-700 font-semibold">${buyer.pkg}</span> · <span class="text-slate-400 font-normal">${buyer.time}</span></p>
        </div>
        <button class="text-slate-400 hover:text-slate-600 p-0.5 text-xs leading-none" onclick="this.closest('#recent-buyer-toast').classList.remove('show')">✕</button>
      </div>
    `;

    toastContainer.classList.add('show');

    setTimeout(() => {
      toastContainer.classList.remove('show');
    }, 5000);

    currentIndex = (currentIndex + 1) % buyers.length;
  }

  // First toast after 6s, then every 22s
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 22000);
  }, 6000);
}

/* ==========================================================================
   7. Sticky Bottom Mobile CTA Bar
   ========================================================================== */
function initStickyMobileCTA() {
  const stickyBar = document.getElementById('sticky-mobile-cta-bar');
  const heroCTA = document.getElementById('hero-cta-btn');

  if (!stickyBar || !heroCTA) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If hero CTA is visible, hide sticky bar; otherwise show it
      if (entry.isIntersecting) {
        stickyBar.classList.add('translate-y-full');
        stickyBar.classList.remove('translate-y-0');
      } else {
        stickyBar.classList.remove('translate-y-full');
        stickyBar.classList.add('translate-y-0');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(heroCTA);
}

/* ==========================================================================
   8. Smooth Scrolling Anchor Links
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   9. Smart Sticky Header & Top Promo Bar (Show when scrolling up / swiping down)
   ========================================================================== */
function initSmartHeader() {
  const topWrapper = document.getElementById('top-header-wrapper');
  const promoBar = document.getElementById('top-promo-bar');
  if (!topWrapper || !promoBar) return;

  let lastScrollY = window.scrollY;
  let isPromoHidden = false;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const promoHeight = promoBar.offsetHeight || 44;

    // En la parte superior de la página (<= 15px), siempre visible al 100%
    if (currentScrollY <= 15) {
      topWrapper.style.transform = 'translateY(0)';
      isPromoHidden = false;
      lastScrollY = currentScrollY;
      return;
    }

    // Deslizar el dedo hacia abajo (scrolling UP -> currentScrollY < lastScrollY):
    // Mostrar la barra azul con la promo y cuenta regresiva
    if (currentScrollY < lastScrollY - 6) {
      if (isPromoHidden) {
        topWrapper.style.transform = 'translateY(0)';
        isPromoHidden = false;
      }
    }
    // Deslizar hacia arriba (scrolling DOWN -> currentScrollY > lastScrollY):
    // Ocultar suavemente la barra superior desplazándola hacia arriba sin saltos
    else if (currentScrollY > lastScrollY + 6 && currentScrollY > promoHeight) {
      if (!isPromoHidden) {
        topWrapper.style.transform = `translateY(-${promoHeight}px)`;
        isPromoHidden = true;
      }
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}
