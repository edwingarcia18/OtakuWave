/* ═══════════════════════════════════════════════════
   OTAKUWAVE — Main JavaScript (VERSIÓN CORREGIDA)
   ═══════════════════════════════════════════════════ */

/* ──────────────────────────────────────
   PLAYLIST (TUS 10 MP3s)
────────────────────────────────────── */
const TRACKS = [
  { section: 'Gaming Zone', track: 'Rocking the Anime', anime: 'Astronaut Beats', art: 'akira', file: 'assets/audio/0001_astronaut12_rocking.mp3' },
  { section: 'Audio Club', track: 'Club Edyn', anime: 'Night Sessions', art: 'hikari', file: 'assets/audio/0002_audio_club_edyn.mp3' },
];

/* ──────────────────────────────────────
   STATE
────────────────────────────────────── */
let currentTrack = 0;
let isPlaying = false;
let shuffleOn = false;
let repeatOn = false;
let audioElement = null;
let waveInterval = null;

/* ──────────────────────────────────────
   DOM ELEMENTS
────────────────────────────────────── */
const DOM = {
  section: () => document.getElementById('playerSection'),
  track: () => document.getElementById('playerTrack'),
  anime: () => document.getElementById('playerAnime'),
  artImg: () => document.getElementById('playerArtImg'),
  art: () => document.getElementById('playerArt'),
  playIcon: () => document.getElementById('playIcon'),
  fill: () => document.getElementById('progressFill'),
  elapsed: () => document.getElementById('timeElapsed'),
  duration: () => document.getElementById('timeDuration'),
  shuffle: () => document.getElementById('btnShuffle'),
  repeat: () => document.getElementById('btnRepeat'),
  waveform: () => document.getElementById('waveform'),
  volSlider: () => document.getElementById('volSlider'),
  ticker: () => document.getElementById('tickerTrack'),
  voteTimer: () => document.getElementById('voteTimer'),
};

/* ──────────────────────────────────────
   UTILS
────────────────────────────────────── */
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ──────────────────────────────────────
   LOAD TRACK
────────────────────────────────────── */
function loadTrack(index) {
  const track = TRACKS[index];
  if (!track) return;

  if (audioElement) {
    audioElement.pause();
    audioElement.removeEventListener('timeupdate', updateProgress);
    audioElement.removeEventListener('ended', onTrackEnd);
  }

  audioElement = new Audio(track.file);
  audioElement.addEventListener('timeupdate', updateProgress);
  audioElement.addEventListener('ended', onTrackEnd);
  audioElement.addEventListener('loadedmetadata', () => {
    DOM.duration().textContent = formatTime(audioElement.duration);
  });

  if (DOM.volSlider()) {
    audioElement.volume = DOM.volSlider().value / 100;
  }

  DOM.section().textContent = track.section;
  DOM.track().textContent = track.track;
  DOM.anime().textContent = track.anime;

  const img = DOM.artImg();
  if (img) {
    img.src = `assets/images/avatar_${track.art}.png`;
  }

  DOM.fill().style.width = '0%';
  DOM.elapsed().textContent = '0:00';

  if (isPlaying) {
    audioElement.play();
    startWaveAnimation();
  }
}

function onTrackEnd() {
  if (repeatOn) {
    audioElement.currentTime = 0;
    audioElement.play();
  } else {
    nextTrack();
  }
}

function updateProgress() {
  if (!audioElement) return;
  const current = audioElement.currentTime;
  const duration = audioElement.duration;
  if (!isNaN(duration) && duration > 0) {
    const percent = (current / duration) * 100;
    DOM.fill().style.width = percent + '%';
    DOM.elapsed().textContent = formatTime(current);
    
    const bars = document.querySelectorAll('.wave-bar');
    const active = Math.floor(percent / 100 * bars.length);
    bars.forEach((bar, i) => {
      bar.classList.toggle('active', i <= active);
    });
  }
}

/* ──────────────────────────────────────
   CONTROLES
────────────────────────────────────── */
function togglePlay() {
  isPlaying = !isPlaying;
  const playIcon = DOM.playIcon();
  const art = DOM.art();

  if (isPlaying) {
    playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16" fill="white"/><rect x="14" y="4" width="4" height="16" fill="white"/>';
    art.classList.add('spinning');
    if (!audioElement) {
      loadTrack(currentTrack);
    } else {
      audioElement.play();
    }
    startWaveAnimation();
  } else {
    playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    art.classList.remove('spinning');
    if (audioElement) audioElement.pause();
    clearInterval(waveInterval);
  }
}

function nextTrack() {
  if (shuffleOn) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * TRACKS.length);
    } while (newIndex === currentTrack && TRACKS.length > 1);
    currentTrack = newIndex;
  } else {
    currentTrack = (currentTrack + 1) % TRACKS.length;
  }
  loadTrack(currentTrack);
}

function prevTrack() {
  if (audioElement && audioElement.currentTime > 3) {
    audioElement.currentTime = 0;
    return;
  }
  currentTrack = (currentTrack - 1 + TRACKS.length) % TRACKS.length;
  loadTrack(currentTrack);
}

function seekTo(event) {
  if (!audioElement) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const percent = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
  DOM.fill().style.width = percent + '%';
  if (audioElement.duration) {
    audioElement.currentTime = (percent / 100) * audioElement.duration;
  }
}

function toggleShuffle() {
  shuffleOn = !shuffleOn;
  DOM.shuffle().classList.toggle('active-ctrl', shuffleOn);
}

function toggleRepeat() {
  repeatOn = !repeatOn;
  DOM.repeat().classList.toggle('active-ctrl', repeatOn);
}

/* ──────────────────────────────────────
   WAVEFORM
────────────────────────────────────── */
function initWaveform() {
  const container = DOM.waveform();
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 52; i++) {
    const bar = document.createElement('div');
    bar.className = 'wave-bar';
    bar.style.height = Math.random() * 28 + 5 + 'px';
    container.appendChild(bar);
  }
}

function startWaveAnimation() {
  clearInterval(waveInterval);
  waveInterval = setInterval(() => {
    if (isPlaying) {
      document.querySelectorAll('.wave-bar').forEach(bar => {
        bar.style.height = Math.random() * 28 + 5 + 'px';
      });
    }
  }, 100);
}

/* ──────────────────────────────────────
   TICKER
────────────────────────────────────── */
const TICKER_ITEMS = [
  'Anime Hits', 'Otaku News', 'Batalla Anime', 'Señal Perdida',
  'El Tribunal Otaku', 'Gaming Zone', 'Momento Kawaii', 'La Frecuencia Decide',
  'Morning Wave', 'Lo-Fi Anime Mode', 'Zona Fan', 'Prime Time'
];

function initTicker() {
  const ticker = DOM.ticker();
  if (!ticker) return;
  ticker.innerHTML = '';
  [...TICKER_ITEMS, ...TICKER_ITEMS].forEach(text => {
    const span = document.createElement('span');
    span.className = 'ticker-item';
    span.textContent = text;
    ticker.appendChild(span);
  });
}

/* ──────────────────────────────────────
   VOTE
────────────────────────────────────── */
let voted = false;

function vote(option) {
  if (voted) return;
  voted = true;
  const totals = option === 0 ? [62, 38] : [38, 62];
  ['bar0', 'bar1'].forEach((id, i) => {
    const bar = document.getElementById(id);
    const pct = document.getElementById('pct' + i);
    if (bar) bar.style.width = totals[i] + '%';
    if (pct) pct.textContent = totals[i] + '%';
  });
  const selected = document.getElementById('opt' + option);
  if (selected) selected.classList.add('voted');
  if (DOM.voteTimer()) {
    DOM.voteTimer().textContent = '¡Voto registrado! Cierra en 14h 30m — 2,848 votos';
  }
}

/* ──────────────────────────────────────
   VIDEOS
────────────────────────────────────── */
function initVideos() {
  document.querySelectorAll('.intro-play-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
      const video = overlay.previousElementSibling;
      if (video?.tagName === 'VIDEO' && video.paused) {
        video.play();
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      }
    });
  });
}

/* ──────────────────────────────────────
   VOLUME
────────────────────────────────────── */
function initVolume() {
  const slider = DOM.volSlider();
  if (slider) {
    slider.addEventListener('input', e => {
      if (audioElement) audioElement.volume = e.target.value / 100;
    });
  }
}

/* ──────────────────────────────────────
   CHATBOT HIKARIBOT
────────────────────────────────────── */
function initChatBot() {
  if (document.getElementById('chatbot')) return;
  
  const chatbotHTML = `
    <div id="chatbot" class="chatbot-container minimized">
      <div class="chatbot-header" onclick="toggleChatbot()">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar-mini">
            <img src="assets/images/avatar_hikari.png" alt="Hikari" class="chatbot-avatar-img">
          </div>
          <div>
            <span class="chatbot-name">HikariBot</span>
            <span class="chatbot-status">🎙️ En línea</span>
          </div>
        </div>
        <div class="chatbot-controls">
          <span class="chatbot-toggle">▲</span>
        </div>
      </div>
      
      <div class="chatbot-messages" id="chatbotMessages">
        <div class="bot-message-wrapper">
          <div class="bot-avatar">
            <img src="assets/images/avatar_hikari.png" alt="Hikari">
          </div>
          <div class="bot-message">
            🎌 ¡Kon'nichiwa! Soy HikariBot, tu asistente de la frecuencia.
          </div>
        </div>
        <div class="bot-message-wrapper">
          <div class="bot-avatar">
            <img src="assets/images/avatar_hikari.png" alt="Hikari">
          </div>
          <div class="bot-message">
            💡 Puedes preguntarme sobre horarios, votaciones o secciones.
          </div>
        </div>
      </div>
      
      <div class="chatbot-input-area">
        <input type="text" id="chatbotInput" placeholder="Escribe tu mensaje..." maxlength="150">
        <button onclick="sendBotMessage()" class="chatbot-send">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M5 3l19 9-19 9v-7l14-2-14-2z" fill="white"/>
          </svg>
        </button>
      </div>
      
      <div class="chatbot-quick">
        <button onclick="quickQuestion('horarios')" class="quick-btn">
          <span class="quick-icon">📡</span> Horarios
        </button>
        <button onclick="quickQuestion('votar')" class="quick-btn">
          <span class="quick-icon">🗳️</span> Votar
        </button>
        <button onclick="quickQuestion('cancion')" class="quick-btn">
          <span class="quick-icon">🎵</span> Canción
        </button>
        <button onclick="quickQuestion('secciones')" class="quick-btn">
          <span class="quick-icon">📻</span> Secciones
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  window.botResponses = {
    horarios: "📅 **Horarios OtakuWave**\n\n🌅 Morning Wave 06:00-12:00\n☀️ Tarde Otaku 12:00-18:00\n🌙 Prime Time 18:00-22:00\n📡 Señal Perdida 22:00-00:00\n🎧 Lo-Fi Anime 00:00-06:00",
    votar: "🗳️ **¿Cómo votar?**\n\nVe a la sección de votación y elige tu opción favorita. ¡Tu voto cuenta!",
    cancion: () => `🎵 **Reproduciendo ahora**\n\n📀 ${DOM.track()?.textContent || 'Gurenge — LiSA'}\n🎬 ${DOM.anime()?.textContent || 'Kimetsu no Yaiba'}`,
    secciones: "📻 **Secciones:** Anime Hits, Otaku News, Batalla Anime, Señal Perdida, Tribunal Otaku, Gaming Zone, Momento Kawaii, Zona Fan",
    ayuda: "🤖 **Comandos:** horarios, votar, canción, secciones, ayuda",
    default: "🎌 No entendí. Prueba: horarios, votar, canción o secciones"
  };

  window.sendBotMessage = function() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    if (!message) return;

    addUserMessage(message);
    input.value = '';

    setTimeout(() => {
      const msgLower = message.toLowerCase();
      let response;
      if (msgLower.includes('horario')) response = botResponses.horarios;
      else if (msgLower.includes('votar')) response = botResponses.votar;
      else if (msgLower.includes('canción') || msgLower === 'cancion') response = botResponses.cancion();
      else if (msgLower.includes('sección')) response = botResponses.secciones;
      else if (msgLower.includes('ayuda')) response = botResponses.ayuda;
      else response = botResponses.default;
      addBotMessage(response);
    }, 300);
  };

  window.addUserMessage = function(text) {
    const container = document.getElementById('chatbotMessages');
    const wrapper = document.createElement('div');
    wrapper.className = 'user-message-wrapper';
    wrapper.innerHTML = `<div class="user-message">${escapeHtml(text)}</div><div class="user-avatar">👤</div>`;
    container.appendChild(wrapper);
    container.scrollTop = container.scrollHeight;
  };

  window.addBotMessage = function(text) {
    const container = document.getElementById('chatbotMessages');
    const wrapper = document.createElement('div');
    wrapper.className = 'bot-message-wrapper';
    wrapper.innerHTML = `
      <div class="bot-avatar"><img src="assets/images/avatar_hikari.png" alt="Hikari"></div>
      <div class="bot-message">${escapeHtml(text).replace(/\n/g, '<br>')}</div>
    `;
    container.appendChild(wrapper);
    container.scrollTop = container.scrollHeight;
  };

  window.toggleChatbot = function() {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.querySelector('.chatbot-toggle');
    chatbot.classList.toggle('minimized');
    if (toggle) toggle.textContent = chatbot.classList.contains('minimized') ? '▲' : '▼';
  };

  window.quickQuestion = function(topic) {
    const input = document.getElementById('chatbotInput');
    const questions = { horarios: 'horarios', votar: 'votar', cancion: 'canción', secciones: 'secciones' };
    input.value = questions[topic] || topic;
    sendBotMessage();
  };

  document.getElementById('chatbotInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBotMessage();
  });
}

/* ──────────────────────────────────────
   CONTACTO Y NEWSLETTER
────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    const status = document.getElementById('formStatus');
    
    status.textContent = '📡 Abriendo correo...';
    status.style.color = '#00CFFF';
    
    const subject = encodeURIComponent(`OtakuWave - Contacto de ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`);
    window.location.href = `mailto:hola@otakuwave.xyz?subject=${subject}&body=${body}`;
    
    status.textContent = '✅ ¡Gracias! Se abrirá tu cliente de correo.';
    status.style.color = '#FF4D8D';
    
    setTimeout(() => {
      status.textContent = '';
      document.getElementById('contactName').value = '';
      document.getElementById('contactEmail').value = '';
      document.getElementById('contactMessage').value = '';
    }, 3000);
  });
}

function showContactAlert() {
  alert("📞 Soporte rápido:\n\n📧 Email: hola@otakuwave.xyz\n💬 Discord: /otakuwave\n🐦 Twitter: @otakuwave");
}

/* ──────────────────────────────────────
   ZONA FAN - Muro de mensajes
────────────────────────────────────── */
let fanMessages = [];

function loadFanMessages() {
  const saved = localStorage.getItem('otakuwave_fanMessages');
  if (saved) {
    fanMessages = JSON.parse(saved);
  } else {
    fanMessages = [
      { name: "Hikari", message: "¡Bienvenidos a la Zona Fan! 💕", date: new Date().toISOString() },
      { name: "Akira", message: "Dejen sus mensajes, los leemos al aire ⚡", date: new Date().toISOString() }
    ];
    localStorage.setItem('otakuwave_fanMessages', JSON.stringify(fanMessages));
  }
  renderFanMessages();
}

function renderFanMessages() {
  const container = document.getElementById('fanMessages');
  if (!container) return;
  
  container.innerHTML = '';
  fanMessages.slice(0, 50).forEach(msg => {
    const div = document.createElement('div');
    div.className = 'fan-message';
    const date = new Date(msg.date).toLocaleDateString();
    div.innerHTML = `
      <span class="fan-name">${escapeHtml(msg.name || 'Anónimo')}</span>
      <span class="fan-date">${date}</span>
      <div class="fan-text">${escapeHtml(msg.message)}</div>
    `;
    container.appendChild(div);
  });
}

function postFanMessage() {
  const nameInput = document.getElementById('fanName');
  const messageInput = document.getElementById('fanMessage');
  
  if (!nameInput || !messageInput) return;
  
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  
  if (!message) {
    alert('Escribe un mensaje');
    return;
  }
  
  fanMessages.unshift({
    name: name || 'Anónimo',
    message: message,
    date: new Date().toISOString()
  });
  
  if (fanMessages.length > 100) fanMessages.pop();
  localStorage.setItem('otakuwave_fanMessages', JSON.stringify(fanMessages));
  
  renderFanMessages();
  nameInput.value = '';
  messageInput.value = '';
  
  const btn = document.querySelector('#zona-fan .btn-primary');
  if (btn) {
    const originalText = btn.textContent;
    btn.textContent = '✅ ¡Mensaje enviado!';
    setTimeout(() => { btn.textContent = originalText; }, 2000);
  }
}


/* ──────────────────────────────────────
   ALTERNAR MP3 / VIDEO DESTACADO
────────────────────────────────────── */
let isYouTubeMode = false;

function togglePlaybackMode() {
  const mp3PlayerWrap = document.getElementById('mp3PlayerWrap');
  const youtubeContainer = document.getElementById('youtubeLiveContainer');
  const toggleBtn = document.getElementById('toggleModeBtn');
  
  if (!mp3PlayerWrap || !youtubeContainer || !toggleBtn) return;
  
  isYouTubeMode = !isYouTubeMode;
  
  if (isYouTubeMode) {
    // Cambiar a Video Destacado
    if (audioElement && isPlaying) {
      audioElement.pause();
      isPlaying = false;
      const playIcon = document.getElementById('playIcon');
      const art = document.getElementById('playerArt');
      if (playIcon) playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      if (art) art.classList.remove('spinning');
      if (waveInterval) clearInterval(waveInterval);
    }
    mp3PlayerWrap.style.display = 'none';
    youtubeContainer.style.display = 'block';
    toggleBtn.innerHTML = '🎵 MP3';
    toggleBtn.title = 'Cambiar a reproductor MP3';
  } else {
    // Cambiar a MP3
    mp3PlayerWrap.style.display = 'block';
    youtubeContainer.style.display = 'none';
    toggleBtn.innerHTML = '🎬 VIDEO';
    toggleBtn.title = 'Cambiar a Video Destacado';
  }
}

/* ──────────────────────────────────────
   INIT
────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initWaveform();
  initTicker();
  initVideos();
  initVolume();
  initChatBot();
  initContactForm();
  loadTrack(0);
  loadFanMessages();
});

// Exponer funciones globales
window.togglePlay = togglePlay;
window.nextTrack = nextTrack;
window.prevTrack = prevTrack;
window.seekTo = seekTo;
window.toggleShuffle = toggleShuffle;
window.toggleRepeat = toggleRepeat;
window.vote = vote;
window.showContactAlert = showContactAlert;
window.postFanMessage = postFanMessage;
window.togglePlaybackMode = togglePlaybackMode;
