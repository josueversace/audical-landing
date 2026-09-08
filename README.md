# Audivox — Landing Page Médica & Funnels de Alta Conversión (Perú)

> **Dominio Principal:** [https://audivox.shop](https://audivox.shop)  
> **Marca Oficial:** Audivox Perú  
> **WhatsApp de Atención / Ventas:** [+51 927 830 022](https://wa.me/51927830022) (`51927830022`)  
> **Correo de Contacto:** [contacto@audivox.shop](mailto:contacto@audivox.shop)  
> **Redes Sociales:** [Facebook @audivoxpe](https://www.facebook.com/audivoxpe) · [Instagram @audivoxpe](https://www.instagram.com/audivoxpe/)  
> **Fabricante Tecnológico:** [Tomore.net](https://www.tomore.net)  
> **Desarrollo y CRO:** [Conecta2 Lat](https://conecta2.lat)  

---

## 🎯 Visión General del Proyecto

Audivox es una plataforma web médica y comercial diseñada con estándares CRO (Conversion Rate Optimization) para la difusión, captación de pacientes y comercialización de audífonos digitales inteligentes en el mercado peruano.

El sitio opera actualmente bajo una estrategia de **prelanzamiento con lista de espera prioritaria (50% de descuento)** y arquitectura lista para **venta directa contra-entrega a nivel nacional**.

---

## 🚦 Arquitectura de Funnels y Enrutamiento

El sitio cuenta con dos funnels de conversión paralelos y herramientas interactivas de diagnóstico auditivo:

| Funnel / Tipo | Producto | Ruta Primaria (Canónica) | Rutas Secundarias / Alias | Comportamiento en Producción |
|---|---|---|---|---|
| **Lista de Espera Prelanzamiento** | Micro-RIC 16X | `https://audivox.shop/` | `/ric/espera`, `/ric-espera`, `/ric/lista-espera` | **Activo al público**. Captura nombre, WhatsApp y ciudad para acceso anticipado al 50% OFF. |
| **Lista de Espera Prelanzamiento** | OTC Invisibles | `https://audivox.shop/espera` | `/lista-espera` | **Activo al público**. Variante orientada a audífonos intrauriculares invisibles OTC. |
| **Venta Directa Contra-Entrega** | Micro-RIC 16X (S/ 1,990) | `https://audivox.shop/ric` | `/version-b` | Redirige temporalmente a `/ric/espera` vía `vercel.json` (302) durante prelanzamiento. |
| **Venta Directa Contra-Entrega** | OTC (S/ 1,990) | `https://audivox.shop/otc` | — | Redirige temporalmente a `/espera` vía `vercel.json` (302) durante prelanzamiento. |
| **Herramienta Clínica Interactiva** | Test Auditivo Digital | `https://audivox.shop/prueba-auditiva` | `/test-auditivo` | Evaluación tonal clínica por oído con audiograma estimado y captura de lead. |
| **Herramienta Acústica Interactiva** | Simulador de Pérdida Auditiva | `https://audivox.shop/simulador-auditivo` | `/simulador` | Simulador Web Audio API con filtros EQ de 16 bandas para concienciación familiar. |

---

## 🏗️ Estructura del Repositorio

```
audivox.shop/
├── index.html                     # Portada: Lista de espera Micro-RIC 16X (Canónica https://audivox.shop/)
│
├── ric/
│   ├── index.html                 # Venta directa Micro-RIC 16X (Checkout Contra Entrega)
│   ├── espera/index.html          # Lista de espera Micro-RIC 16X (Canónica https://audivox.shop/ric/espera)
│   └── lista-espera/index.html    # Alias / Variante B Micro-RIC
│
├── ric-espera/
│   └── index.html                 # URL corta de conveniencia para Micro-RIC
│
├── espera/
│   └── index.html                 # Lista de espera OTC Invisibles (Canónica https://audivox.shop/espera)
│
├── lista-espera/
│   └── index.html                 # Alias / Variante B OTC Invisibles
│
├── otc/
│   └── index.html                 # Venta directa OTC Invisibles (Checkout Contra Entrega)
│
├── prueba-auditiva/
│   └── index.html                 # Test auditivo interactivo (Canónica https://audivox.shop/prueba-auditiva)
│
├── test-auditivo/
│   └── index.html                 # Alias de conveniencia del test auditivo
│
├── simulador-auditivo/
│   └── index.html                 # Simulador acústico interactivo (Canónica https://audivox.shop/simulador-auditivo)
│
├── simulador/
│   └── index.html                 # Alias de conveniencia del simulador
│
├── garantia/
│   └── index.html                 # Política de Garantía de Fábrica de 12 Meses y Devoluciones
│
├── terminos/
│   └── index.html                 # Términos y Condiciones Comerciales (Derecho de desistimiento 3 días)
│
├── privacidad/
│   └── index.html                 # Política de Privacidad — Ley N° 29733 (Perú)
│
├── assets/
│   ├── css/
│   │   └── styles.css             # Estilos utilitarios, keyframes y animaciones personalizadas
│   ├── js/
│   │   └── main.js                # Lógica central (temporizador, webhooks, WhatsApp, acordeones, toasts)
│   ├── images/                    # Catálogo fotográfico optimizado (WebP/PNG ~135 archivos)
│   ├── audio/                     # Pistas de audio para el simulador acústico
│   └── models/                    # Recursos técnicos y manuales PDF
│
├── vercel.json                    # Reglas de redirección, cabeceras de seguridad y caché de activos
├── sitemap.xml                    # Mapa del sitio XML indexable con prioridades y lastmod actualizado
├── robots.txt                     # Directivas de rastreo para bots de búsqueda e IA
└── favicon.ico                    # Ícono de pestaña
```

---

## 🔍 Indexación y SEO Técnico (`audivox.shop`)

### 1. Dominio Canónico y Protocolo
- Dominio canónico universal: **`https://audivox.shop`**.
- Todas las páginas cuentan con etiquetas `<link rel="canonical" href="...">` para evitar canibalización y contenido duplicado.
- Las variantes y alias apuntan canónicamente a su versión principal.

### 2. Directivas de Rastreo (`robots.txt`)
- Ubicación: `https://audivox.shop/robots.txt`
- Permite acceso total a motores de búsqueda convencionales y rastreadores de IA:
  ```txt
  User-agent: *
  Allow: /

  Sitemap: https://audivox.shop/sitemap.xml
  ```

### 3. Mapa del Sitio (`sitemap.xml`)
Contiene las URLs canónicas activas con sus respectivas frecuencias de actualización y prioridades:
1. `https://audivox.shop/` (Prioridad: 1.0, Daily)
2. `https://audivox.shop/ric/espera` (Prioridad: 0.9, Daily)
3. `https://audivox.shop/espera` (Prioridad: 0.9, Daily)
4. `https://audivox.shop/prueba-auditiva` (Prioridad: 0.8, Weekly)
5. `https://audivox.shop/simulador-auditivo` (Prioridad: 0.8, Weekly)
6. `https://audivox.shop/terminos` (Prioridad: 0.5, Monthly)
7. `https://audivox.shop/privacidad` (Prioridad: 0.5, Monthly)
8. `https://audivox.shop/garantia` (Prioridad: 0.5, Monthly)

### 4. Datos Estructurados (Schema.org JSON-LD)
- **Organization & ContactPoint:** Datos institucionales de Audivox Perú con teléfono oficial `+51927830022`.
- **Product:** Ficha técnica de Micro-RIC 16X con precio regular de S/ 1,990 PEN, condición `NewCondition`, moneda PEN y disponibilidad en stock.
- **MedicalWebPage & MedicalCondition:** Enriquecimiento semántico para Google Health sobre hipoacusia y dispositivos médicos auditivos.
- **FAQPage:** Acordeón de preguntas frecuentes marcado para visualización en rich snippets de Google Search.

---

## 📱 WhatsApp Business & Atención al Cliente

- **Número oficial:** `+51 927 830 022` (`51927830022`).
- **Botón flotante global:** Botón interactivo de contacto directo con mensaje preconfigurado según el funnel visitado.
- **Confirmación de registro / checkout:** 
  - Al completar la lista de espera, el modal genera un botón de enlace directo a WhatsApp con los datos del usuario precargados (`Nombre`, `Celular`, `Ciudad`).
  - Al completar un pedido de venta directa, se genera un enlace prefilled con el resumen completo del pedido (`Cliente`, `Dirección`, `Ciudad`, `Producto`, `Total`).

---

## ⚙️ JavaScript Central — `assets/js/main.js`

Desarrollado en Vanilla JavaScript (ES6+ modular, sin frameworks pesados ni dependencias externas de runtime):

| Módulo | Función |
|---|---|
| `initCountdownTimer()` | Temporizador de urgencia de 18 min 45 s, sincronizado en `sessionStorage` para consistencia durante la sesión. |
| `initSmartHeader()` | Barra de navegación superior con detección de dirección de scroll (GPU accelerated via Tailwind/CSS). |
| `initFaqAccordion()` | Acordeón accesible de preguntas y respuestas con cierre mutuamente excluyente. |
| `initAppFeaturesAccordion()` | Acordeón técnico para especificaciones del chip DSP y funciones de la app. |
| `initSoundSimulator()` | Procesamiento de audio en tiempo real con Web Audio API para simular curvas audiométricas. |
| `initFormHandling()` | Validación de entradas peruanas (DNI/Teléfono 9 dígitos), envío asíncrono a n8n y disparo de eventos Meta Pixel. |
| `initRecentBuyerToasts()` | Notificaciones emergentes aleatorias de prueba social con compradores recientes en Perú. |
| `initStickyMobileCTA()` | Botón flotante circular ultra-optimizado para móviles. |

---

## 📊 Integraciones y Analítica

### Meta Pixel (ID: `1785402869252903`)
- **`PageView`:** Disparado de manera automática en todas las cargas de página.
- **`Lead`:** Disparado al registrarse en listas de espera. **Sin valor monetario** para proteger la calificación del algoritmo y evitar sesgos de optimización con valores ficticios.
- **`Purchase`:** Disparado únicamente al completar un pedido real de venta directa con valor `1990` y moneda `PEN`.

### Webhook n8n CRM
- **Endpoint:** `https://n8n.conecta2.lat/webhook/audical-lista-espera`
- Procesa el payload JSON con los datos del lead o comprador y lo distribuye a bases de datos, notificaciones internas y automatizaciones de seguimiento por WhatsApp.

---

## 🛡️ Marco Legal y Cumplimiento Regulatorio (Perú)

- **Ley N° 29733 (Protección de Datos Personales):** Detallada en `/privacidad`, garantizando el ejercicio de derechos ARCO (Acceso, Rectificación, Cancelación y Oposición) ante `contacto@audivox.shop`.
- **Términos Comerciales:** Especificados en `/terminos`, estableciendo el derecho de desistimiento dentro del plazo legal de **3 días naturales** contados a partir de la entrega.
- **Garantía Técnica:** Detallada en `/garantia`, estipulando 12 meses de garantía de fábrica ante defectos de manufactura del circuito acústico.

---

## 🚀 Despliegue en Vercel

El proyecto está configurado para despliegue continuo mediante integración con GitHub:

```bash
git push origin main    # Despliegue automático a producción en audivox.shop
```

### Cabeceras de Rendimiento y Seguridad (`vercel.json`):
- **Caché Inmutable:** `/assets/(.*)` → `public, max-age=31536000, immutable`.
- **Seguridad:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **Limpieza de URLs:** `cleanUrls: true`, `trailingSlash: false`.

---

*Desarrollado y mantenido por [Conecta2 Lat](https://conecta2.lat) para Audivox Perú.*
