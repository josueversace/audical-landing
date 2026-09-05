# Audivox — Landing Page de Alta Conversión (Perú)

> **Sitio:** [https://audivox.shop](https://audivox.shop)
> **Marca:** Audivox
> **Contacto:** contacto@audivox.shop
> **Redes:** [Facebook @audivoxpe](https://www.facebook.com/audivoxpe) · [Instagram @audivoxpe](https://www.instagram.com/audivoxpe/)
> **Fabricante / proveedor:** [Tomore.net](https://www.tomore.net)
> **Desarrollado por:** [Conecta2 Lat](https://conecta2.lat)

---

## 🎯 Propósito del Proyecto

Landing page de grado médico y alta conversión (CRO) para el mercado peruano. Tiene **dos funnels paralelos**:

| Funnel | Producto | Precio | Ruta |
|---|---|---|---|
| Venta directa contra-entrega | Micro-RIC 16X | S/ 1,990 | `/ric` |
| Lista de espera prelanzamiento | Micro-RIC 16X | — | `/` · `/ric/espera` · `/ric-espera` · `/ric/lista-espera` |
| Lista de espera prelanzamiento | OTC | — | `/espera` · `/lista-espera` |

> **Regla de negocio:** El precio ya incluye el descuento. La disponibilidad es hasta agotar stock.

---

## 🏗️ Estructura de Directorios

```
audivox.shop/
├── index.html                    # Raíz → lista de espera Micro-RIC en producción
│
├── ric/
│   ├── espera/index.html         # Lista de espera Micro-RIC 16X (variante A)
│   └── lista-espera/index.html   # Lista de espera Micro-RIC 16X (variante B)
│
├── ric-espera/index.html         # Lista de espera Micro-RIC 16X (URL corta)
│
├── espera/index.html             # Lista de espera OTC (variante A)
├── lista-espera/index.html       # Lista de espera OTC (variante B)
│
├── garantia/index.html           # Política de garantía y devoluciones
├── terminos/index.html           # Términos y condiciones de uso
├── privacidad/index.html         # Política de privacidad — Ley N° 29733
│
├── prueba-auditiva/index.html    # Herramienta: test auditivo interactivo
├── test-auditivo/index.html      # Alias del test auditivo
├── simulador/index.html          # Herramienta: simulador acústico
├── simulador-auditivo/index.html # Alias del simulador
│
├── otc/                          # Alias → redirige a /espera (vercel.json)
│
├── assets/
│   ├── css/styles.css            # Hoja de estilos global
│   ├── js/main.js                # Lógica central (ver sección JS)
│   ├── images/                   # ~135 imágenes WebP/PNG optimizadas
│   ├── audio/                    # Samples de audio para el simulador acústico
│   └── models/                   # Modelos 3D
│
├── vercel.json                   # Rutas, redirects, cabeceras y caché
├── sitemap.xml                   # Mapa del sitio para SEO
├── robots.txt                    # Directivas de rastreo
└── favicon.ico                   # Favicon
```

---

## 🔄 Lógica de Rutas (`vercel.json`)

| Source | Destino | Tipo |
|---|---|---|
| `/version-b` | `/ric/espera` | Redirect 302 |
| `/ric` | `/ric/espera` | Redirect 302 |
| `/otc` | `/espera` | Redirect 302 |

**Headers de seguridad** aplicados globalmente:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

**Caché inmutable** para `/assets/*` — 1 año (`max-age=31536000, immutable`).

---

## ⚙️ JavaScript Central — `assets/js/main.js`

Único archivo JS de negocio. Sin dependencias externas de runtime (Vanilla ES6+).

| Módulo (función) | Responsabilidad |
|---|---|
| `initCountdownTimer()` | Temporizador de urgencia 18 min 45 s, persiste en `sessionStorage` |
| `initSmartHeader()` | Header sticky con revelación GPU-acelerada al hacer scroll hacia abajo |
| `initFaqAccordion()` | Acordeón de exclusión mutua para FAQ |
| `initAppFeaturesAccordion()` | Acordeón de exclusión mutua para características técnicas |
| `initSoundSimulator()` | Simulador acústico Web Audio API con 16 bandas de EQ |
| `initFormHandling()` | Validación y envío vía webhook n8n; tracking de conversiones |
| `initRecentBuyerToasts()` | Notificaciones de prueba social en tiempo real |
| `initStickyMobileCTA()` | Botón flotante WhatsApp — solo icono circular, sin etiqueta de texto |
| `initSmoothScroll()` | Scroll suave para anclas internas |

### Flujo — Lista de Espera
1. Usuario ingresa nombre + teléfono y envía el formulario.
2. `POST` al webhook de n8n → registra lead en CRM.
3. Se dispara `fbq('track', 'Lead', { content_name, content_category })` — **sin valor monetario**.
4. Se muestra modal de confirmación con los datos del usuario.

### Flujo — Venta Directa (páginas `/ric`)
1. Usuario completa formulario de pedido.
2. `POST` al webhook de n8n → registra pedido.
3. Se dispara `fbq('track', 'Purchase', { value: 1990, currency: 'PEN' })`.
4. Modal de confirmación + redirección a WhatsApp con mensaje prefilled.

---

## 📊 Meta Pixel — ID `1785402869252903`

Inyectado en el `<head>` de todos los archivos HTML públicos.

| Evento | Cuándo se dispara | Valor monetario |
|---|---|---|
| `PageView` | Al cargar cualquier página (automático) | No |
| `Lead` | Al registrarse en lista de espera | **No** — solo `content_name` y `content_category` |
| `Purchase` | Al completar pedido de venta (`/ric`) | **Sí** — `1990 PEN` |

> ⚠️ **Regla crítica:** El valor `S/ 1,990` **nunca** debe aparecer en el evento `Lead` de páginas públicas. Únicamente en `Purchase`, que solo es accesible desde páginas de venta internas.

---

## 📦 Logística y Entrega

- **Courier:** Olva Courier y Shalom.
- **Modalidad de pago:** Contra-entrega.
- **Envío:** Gratuito.
- **Cobertura:** Ciudades dentro del radio estándar. Ciudades fuera de cobertura requieren anticipo no reembolsable para coordinar entrega en oficina.

---

## 🛡️ Páginas Legales

Cumplen con la **Ley N° 29733** (Protección de Datos Personales, Perú).

| Página | Ruta | Puntos clave |
|---|---|---|
| Términos y Condiciones | `/terminos` | Derecho de desistimiento: **3 días naturales** desde la entrega |
| Política de Privacidad | `/privacidad` | Responsable: Audivox · contacto@audivox.shop |
| Garantía y Devoluciones | `/garantia` | Basada en política Tomore pero con términos más restrictivos para Audivox |

---

## 🔍 SEO y Metadatos

- **`robots.txt`:** Permite rastreo de Google, Bing, Perplexity, ChatGPT-User, Claude-Web.
- **`sitemap.xml`:** Todas las URLs públicas con `lastmod` y `changefreq`.
- **Open Graph / Twitter Cards:** Imágenes 1200×630 px.
- **Schema.org JSON-LD** (páginas de venta):
  - `Product` — S/ 1,990 PEN, calificación 4.9/5, stock disponible
  - `MedicalWebPage` & `MedicalCondition` (hipoacusia)
  - `Organization` (Audivox Perú)
  - `FAQPage` para fragmentos enriquecidos en Google

---

## 🌐 Despliegue

Deploy automático en **Vercel** al hacer push a `main`.

```bash
git push origin main   # dispara deploy automático
vercel --prod          # deploy manual si se necesita
```

**Dominio:** `audivox.shop`
**Repo:** `github.com/josueversace/audical-landing`

---

## 🔗 Integraciones Externas

| Servicio | Propósito |
|---|---|
| **n8n** (webhook) | Recibe leads y pedidos; notifica por WhatsApp / email |
| **Meta Pixel** | Tracking Lead, Purchase, PageView |
| **WhatsApp Business** | Atención al cliente y confirmación de pedidos |
| **Vercel** | Hosting + CDN + SSL |
| **Google Fonts** | Tipografía *Plus Jakarta Sans* |
| **Lucide Icons** | Iconografía SVG inline ligera |

---

## 📝 Historial de Cambios Relevantes

| Commit | Descripción |
|---|---|
| (pendiente) | Limpia `value`/`currency` del evento `Lead` en páginas de lista de espera |
| `19e6f93` | Restaura botón WhatsApp a diseño solo-icono circular |
| `fb66024` | Integración Meta Pixel — PageView, Lead, Purchase |
| `b3a012e` | Páginas legales sin ornamentos; desistimiento 3 días naturales |
| `47e4b00` | Páginas dedicadas Términos, Privacidad, Garantía |
| `b51ce5b` | Micro-RIC en raíz; bloqueo `/ric` y `/otc` en producción |
| `240dedb` | Migración de marca a Audivox; funnels de lista de espera |

---

*Desarrollado y mantenido por [Conecta2 Lat](https://conecta2.lat)*
