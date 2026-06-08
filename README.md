# OtakuWave — Radio Anime Online

> Experiencia audiovisual interactiva de radio anime 24/7. No es una página web — es una aplicación visual inmersiva.

[![Vercel](https://img.shields.io/badge/deployment-Vercel-black?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/license-MIT-purple)](LICENSE)
[![Three.js](https://img.shields.io/badge/Three.js-r128-blue)](https://threejs.org)
[![HTML5](https://img.shields.io/badge/HTML5-CSS3-orange)](https://developer.mozilla.org/en-US/docs/Web/HTML)

---

## Vista previa

Una interfaz de radio anime inmersiva con:
- Fondo de partículas 3D en tiempo real (Three.js / WebGL)
- Reproductor MP3 con visualizador de audio Canvas
- YouTube player protagonista con transición fluida
- Chat estilo Discord con mensajes automáticos de Kaito e Hikari
- Cursor personalizado con efecto parallax
- Animaciones tipo Apple (cubic-bezier, stagger, reveal on scroll)
- Diseño Dark UI con glassmorphism y acentos neon

---

## Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| HTML5 / CSS3 | — | Estructura y estilos |
| JavaScript ES6+ | — | Lógica de reproductor y chat |
| Three.js | r128 | Campo de partículas WebGL 3D |
| Canvas API | — | Visualizador de audio |
| Google Fonts | — | Orbitron, Syne, JetBrains Mono |
| Vercel | — | Hosting y CDN |

---

## Estructura del proyecto

```
OtakuWaveRadio/
├── index.html                  # App completa (HTML + CSS + JS embebido)
├── vercel.json                 # Configuración de despliegue y headers
├── .gitignore
├── LICENSE
├── README.md
└── assets/
    ├── audio/
    │   ├── 0001_astronaut12_rocking.mp3
    │   └── 0002_audio_club_edyn.mp3
    ├── css/
    │   └── style.css           # Referencia legacy (v1)
    ├── js/
    │   └── main.js             # Referencia legacy (v1)
    └── images/
        ├── avatar_hikari.png
        ├── avatar_kaito.png
        ├── banner_main.jpg
        ├── logo-favicon.png
        └── logo_horizontal.png
```

> **Nota:** El diseño v2 tiene CSS y JavaScript completamente embebidos en `index.html` para máxima portabilidad y rendimiento. Los archivos `assets/css/style.css` y `assets/js/main.js` son referencias del diseño original (v1).

---

## Ejecución local

No requiere build ni dependencias instaladas. Solo un servidor HTTP estático:

```bash
# Opción 1 — Python (recomendado, disponible en cualquier sistema)
python3 -m http.server 8080
# Abrir: http://localhost:8080

# Opción 2 — Node.js
npx serve .
# Abrir: http://localhost:3000

# Opción 3 — VS Code
# Instalar extensión "Live Server" y hacer clic en "Go Live"
```

> **Importante:** Abrir `index.html` directamente con `file://` puede bloquear la carga de audio por políticas CORS del navegador. Usar siempre un servidor HTTP local.

---

## Despliegue en Vercel

### Via CLI

```bash
npm i -g vercel
vercel
```

### Via GitHub (recomendado)

```bash
# 1. Inicializar repositorio
git init
git add .
git commit -m "feat: OtakuWave Radio v2 — Three.js + Cinematic UI"

# 2. Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/otakuwave.git
git push -u origin main

# 3. En vercel.com → Import Git Repository → seleccionar el repo
#    Vercel detecta automáticamente el proyecto estático
#    URL resultante: https://otakuwave.vercel.app
```

---

## Personalización

### Agregar canciones al reproductor

Editar el array `TRACKS` dentro de `index.html` (línea ~780):

```javascript
const TRACKS = [
  {
    section: 'Nombre Sección',
    track: 'Nombre Canción',
    anime: 'Nombre Anime / Artista',
    art: 'hikari',   // 'hikari' o 'kaito'
    file: 'assets/audio/nueva_cancion.mp3'
  },
  // ... más canciones
];
```

### Cambiar el video de YouTube

Buscar el `<iframe>` dentro del bloque `#youtubeLiveContainer` en `index.html`:

```html
<iframe src="https://www.youtube.com/embed/TU_VIDEO_ID?rel=0&modestbranding=1" ...>
```

Reemplazar `TU_VIDEO_ID` con el ID del video de YouTube deseado.

### Cambiar colores del tema

Editar las variables CSS al inicio de la etiqueta `<style>` en `index.html`:

```css
:root {
  --pink:   #FF4D8D;   /* Acento Hikari / primario */
  --blue:   #00CFFF;   /* Acento Kaito / secundario */
  --purple: #9B59FF;   /* Acento terciario */
  --dark:   #060810;   /* Fondo principal */
}
```

### Modificar mensajes del chat

Editar los objetos `MSGS` (mensajes iniciales) y `AUTOS` (mensajes automáticos) en `index.html`:

```javascript
const MSGS = {
  general: [
    { name: 'Hikari', color: 'pink', av: 'hikari', text: 'Tu mensaje aquí.' },
    { name: 'Kaito', color: 'purple', av: 'kaito', text: 'Otro mensaje.' },
  ],
  // lofi, battle, openings, comunidad...
};
```

### Ajustar densidad de partículas WebGL

En la función `initThree()` dentro de `index.html`:

```javascript
const count = 2000; // Reducir para mejor rendimiento en hardware débil
```

---

## Características principales

- **Fondo WebGL (Three.js):** Campo de 2000 partículas 3D con movimiento fluido, reacción al cursor y fallback automático si WebGL no está disponible
- **Reproductor MP3:** Play/pause, siguiente/anterior, shuffle, repeat, barra de progreso, visualizador Canvas con barras animadas
- **YouTube Player:** Embed protagonista con badge "Video Destacado", botón al canal y alternancia fluida con el reproductor MP3
- **Chat Discord:** 5 canales temáticos, mensajes automáticos de Kaito e Hikari con tiempos variables, input de usuario con respuesta automática
- **Cursor personalizado:** Punto + anillo con suavizado independiente y hover states en elementos interactivos
- **Reveal on scroll:** IntersectionObserver con stagger delay para entradas progresivas de cada sección
- **Navbar dinámica:** Glassmorphism que intensifica al hacer scroll
- **Ticker animado:** Banda de texto continuo con secciones de la radio
- **Responsive:** Adaptado para móvil con sidebar de chat colapsada y grid de 1 columna

---

## Redes y contacto

| Canal | Enlace |
|-------|--------|
| YouTube | [youtube.com/@OtakuWave-v4l](https://www.youtube.com/@OtakuWave-v4l) |
| Facebook | [facebook.com/OtakuWave](https://www.facebook.com/profile.php?id=61589493800766) |
| Email | otakuwave7@gmail.com |

---

## Créditos

| Rol | Nombre |
|-----|--------|
| Autor y Desarrollador | Edwin Garcia |
| Diseño UI/UX v2 | OtakuWave Team |
| Tipografías | Google Fonts — Orbitron, Syne, JetBrains Mono |
| Partículas 3D | Three.js r128 |

---

## Licencia

MIT License — Copyright (c) 2025 Edwin Garcia. Ver [LICENSE](LICENSE) para detalles.

---

*OtakuWave · Donde el anime suena sin parar.*
