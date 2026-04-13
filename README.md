# OtakuWave - Radio Anime Online

Radio anime online 24/7 donde la comunidad decide lo que suena. Proyecto desarrollado con HTML5, CSS3 y JavaScript vanilla.

**Autor:** Edwin Garc�a  
**GitHub:** [github.com/edwingarcia18](https://github.com/edwingarcia18)  
**Email:** edalgafu@gmail.com

## Estado del Proyecto

[![Vercel Deployment](https://img.shields.io/badge/deployment-vercel-black)](https://vercel.com)
[![License](https://img.shields.io/badge/license-MIT-purple)](LICENSE)

## Tabla de Contenidos

- [Caracteristicas](#caracteristicas)
- [Tecnologias](#tecnologias)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalacion](#instalacion)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Personalizacion](#personalizacion)
- [Comandos del Chatbot](#comandos-del-chatbot)
- [Creditos](#creditos)

## Caracteristicas

- Reproductor de audio con playlist de 10 canciones
- Controles: play/pause, shuffle, repeat, barra de progreso
- Waveform animado en tiempo real
- HikariBot: chatbot con respuestas automaticas
- Sistema de votacion "La Frecuencia Decide"
- Secciones: Anime Hits, Otaku News, Batalla Anime, Gaming Zone, Momento Kawaii
- Programacion diaria por franjas horarias
- Sistema de niveles para la comunidad
- Formulario de contacto y newsletter
- Dise�o responsive
- Desplegable en Vercel

## Tecnologias

| Tecnologia | Version | Uso |
|------------|---------|-----|
| HTML5 | - | Estructura semantica |
| CSS3 | - | Estilos y animaciones |
| JavaScript | ES6 | Logica del reproductor y chatbot |
| Google Fonts | - | Orbitron, Nunito |
| Vercel | - | Hosting |


## Estructura del Proyecto

otakuwave/
├── index.html
├── README.md
├── assets/
│ ├── css/
│ │ └── style.css
│ ├── js/
│ │ └── main.js
│ ├── audio/
│ │ ├── 0001_astronaut12_rocking.mp3
│ │ ├── 0002_audio_club_edyn.mp3
│ │ ├── 003_fassounds_kawaii_dance_upbeat_japan.mp3
│ │ ├── 004_final_ye_mera_flow.mp3
│ │ ├── 005_From_Now_On.mp3
│ │ ├── 006_hitslab_anime_anime_cyberpunk.mp3
│ │ ├── LiSA - 007_Kimetsu_no_Yaiba.mp3
│ │ ├── 008_Kristine_Xiong_Siab_Mob_Heev.mp3
│ │ ├── 009_phantasticbeats.mp3
│ │ └── 010_phantasticbeats_anime.mp3
│ ├── images/
│ │ ├── avatar_hikari.png
│ │ ├── avatar_akira.png
│ │ ├── banner_hikari.jpg
│ │ ├── banner_akira.jpg
│ │ ├── banner_main.jpg
│ │ └── logo_horizontal.png
│ └── video/
│ ├── intro_hikari.mp4
│ └── intro_akira.mp4
└── chat-server/
├── server.js
├── package.json
└── node_modules/

## Instalacion

### Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Opcional: Node.js 18+ para el chat en tiempo real

### Ejecucion Local

```bash
# Clonar el repositorio
git clone https://github.com/edwingarcia18/otakuwave.git
cd otakuwave

# Servidor Python
python3 -m http.server 8080

# Servidor Node.js
npx serve .

# Abrir en navegador
http://localhost:8080




Servidor de Chat (Opcional)
cd chat-server
npm install
node server.js

El servidor de chat correra en http://localhost:3000



Despliegue en Vercel
Opcion 1: Via CLI
# Instalar Vercel CLI
npm i -g vercel

# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

Opcion 2: Via GitHub
Subir el codigo a GitHub

git init
git add .
git commit -m "OtakuWave - Radio Anime Online"
git remote add origin https://github.com/edwingarcia18/otakuwave.git
git push -u origin main

Ir a vercel.com

Importar repositorio

Vercel detectara automaticamente el proyecto estatico

Obtendras una URL como: https://otakuwave.vercel.app


Personalizacion
Agregar Canciones
Editar assets/js/main.js:
const TRACKS = [
  // ... canciones existentes
  { 
    section: 'Nombre Seccion',
    track: 'Nombre Cancion',
    anime: 'Nombre Anime',
    art: 'hikari', // o 'akira'
    file: 'assets/audio/nuevo_archivo.mp3'
  },
];


Modificar Respuestas del Chatbot
Editar window.botResponses en assets/js/main.js:
window.botResponses = {
  horarios: "Nuevo texto de respuesta",
  votar: "Nuevas instrucciones",
  cancion: "Nueva informacion",
  secciones: "Nueva lista",
  ayuda: "Nueva ayuda",
  default: "Mensaje por defecto"
};

Cambiar Colores
Editar variables CSS en assets/css/style.css:
:root {
  --purple: #7B2CBF;
  --pink: #FF4D8D;
  --blue: #00CFFF;
  --black: #0D0D0D;
  --card: #16161f;
  --text: #e8e4f0;
}

Variables CSS
Variable	Valor	Uso
--purple	#7B2CBF	Acento principal
--purple-light	#9D4EDD	Acento secundario
--pink	#FF4D8D	Acento Hikari
--blue	#00CFFF	Acento Akira
--black	#0D0D0D	Fondo principal
--dark	#111118	Fondo secundario
--card	#16161f	Tarjetas
--card2	#1c1c28	Tarjetas secundarias
--text	#e8e4f0	Texto principal
--muted	#7a768a	Texto secundario


Comandos del Chatbot
Comando	Respuesta
horarios	Muestra la programacion diaria
votar	Explica el sistema de votacion
cancion	Muestra la cancion actual
secciones	Lista todas las secciones
ayuda	Muestra los comandos disponibles
Estructura de la Playlist
#	Seccion	Cancion	Anime
1	Audio Club	Club Edyn	Night Sessions
2	Momento Kawaii	Kawaii Dance Upbeat	Japan Anime
3	Batalla Anime	Final Ye Mera Flow	Urban Beats
4	Morning Wave	From Now On	Epic Journey
5	Senal Perdida	Cyberpunk Anime	Future Beats
6	Anime Hits	Gurenge (LiSA)	Kimetsu no Yaiba
7	Zona Fan	Siab Mob Heev	Kristine Xiong
8	Phantastic Beats	Anime Beginnings	Intro Mix
9	Phantastic Beats	Anime Wave	Second Wave
10	Gaming Zone	Rocking the Anime	Astronaut Beats
Creditos
Rol	Nombre
Autor y Desarrollador	Edwin Garcia
Diseno y Estrategia	OtakuWave Team
Tipografias	Google Fonts (Orbitron, Nunito)
Licencia
MIT License

Copyright (c) 2025 Edwin Garcia

Contacto
Canal	Enlace
Email	edalgafu@gmail.com
GitHub	github.com/edwingarcia18
OtakuWave - Donde el anime suena sin parar.

