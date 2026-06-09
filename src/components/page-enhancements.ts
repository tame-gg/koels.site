export const pageEnhancementStyles = `
html {
  view-transition-name: root;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 280ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

::view-transition-old(root) {
  animation-name: koels-page-out;
}

::view-transition-new(root) {
  animation-name: koels-page-in;
}

@keyframes koels-page-out {
  to {
    opacity: 0;
    filter: blur(10px);
    transform: translateY(-6px) scale(0.99);
  }
}

@keyframes koels-page-in {
  from {
    opacity: 0;
    filter: blur(12px);
    transform: translateY(10px) scale(0.99);
  }
}

html.koels-route-leaving body {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(-6px) scale(0.992);
  transition:
    opacity 180ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 180ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.koels-live-strip {
  width: min(100%, 760px);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 26px;
  opacity: 0;
  animation: fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both;
}

.koels-live-card {
  position: relative;
  min-height: 72px;
  padding: 14px 15px;
  border: 1px solid rgba(64, 200, 255, 0.16);
  border-radius: 10px;
  background:
    linear-gradient(135deg, rgba(64, 200, 255, 0.07), rgba(0, 255, 204, 0.03)),
    rgba(2, 10, 24, 0.58);
  box-shadow: inset 0 1px 0 rgba(232, 248, 255, 0.04);
  overflow: hidden;
}

.koels-live-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent, rgba(232, 248, 255, 0.06), transparent);
  transform: translateX(-120%);
  animation: koels-card-sheen 4.8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes koels-card-sheen {
  0%, 58% { transform: translateX(-120%); }
  78%, 100% { transform: translateX(120%); }
}

.koels-live-kicker,
.project-preview-kicker {
  font-family: var(--mono, monospace);
  font-size: 0.55rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(200, 240, 255, 0.38);
}

.koels-live-value {
  margin-top: 8px;
  font-size: 1rem;
  font-weight: 800;
  color: #e8f8ff;
  line-height: 1.15;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.koels-live-sub {
  margin-top: 5px;
  font-family: var(--mono, monospace);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  color: rgba(200, 240, 255, 0.4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-preview {
  position: relative;
  min-height: 112px;
  margin: 2px 0 4px;
  border: 1px solid rgba(64, 200, 255, 0.12);
  border-radius: 10px;
  background:
    radial-gradient(circle at 20% 10%, rgba(64, 200, 255, 0.16), transparent 32%),
    linear-gradient(135deg, rgba(2, 18, 38, 0.9), rgba(2, 8, 16, 0.72));
  overflow: hidden;
  transform: translateZ(0);
}

.project-preview::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(64, 200, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(64, 200, 255, 0.045) 1px, transparent 1px);
  background-size: 18px 18px;
  mask-image: linear-gradient(to bottom, black, transparent 92%);
  pointer-events: none;
}

.project-preview-inner {
  position: relative;
  z-index: 1;
  height: 100%;
  min-height: 112px;
  padding: 13px;
}

.preview-radar,
.preview-globe {
  background:
    radial-gradient(circle at 50% 44%, rgba(64, 200, 255, 0.13), transparent 45%),
    linear-gradient(135deg, rgba(2, 18, 38, 0.92), rgba(2, 8, 16, 0.72));
}

.preview-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.radar-sweep {
  transform-origin: 156px 60px;
  animation: koels-radar-sweep 4s linear infinite;
}

@keyframes koels-radar-sweep {
  to { transform: rotate(360deg); }
}

.radar-pulse {
  animation: koels-radar-pulse 2.8s ease-in-out infinite;
}

@keyframes koels-radar-pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.72; }
}

.globe-earth {
  transform-origin: 156px 57px;
  animation: koels-float 3.8s ease-in-out infinite;
}

@keyframes koels-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.globe-orbit {
  transform-origin: 156px 61px;
  animation: koels-orbit 5.6s linear infinite;
}

@keyframes koels-orbit {
  to { transform: rotate(360deg); }
}

.preview-calc .calc-display {
  height: 30px;
  border-radius: 7px;
  padding: 6px 10px;
  background: rgba(232, 248, 255, 0.08);
  color: #00ffcc;
  font-family: var(--mono, monospace);
  font-size: 0.82rem;
  font-weight: 700;
  text-align: right;
  box-shadow: inset 0 1px 0 rgba(232, 248, 255, 0.05);
}

.preview-calc .calc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-top: 10px;
}

.preview-calc .calc-key {
  min-height: 18px;
  display: grid;
  place-items: center;
  border-radius: 5px;
  background: rgba(200, 240, 255, 0.14);
  color: rgba(232, 248, 255, 0.72);
  font-family: var(--mono, monospace);
  font-size: 0.56rem;
  font-weight: 700;
}

.preview-calc .calc-key.hot {
  background: linear-gradient(135deg, #40c8ff, #00ffcc);
  color: #020810;
}

.preview-vanta .stat-row {
  display: grid;
  grid-template-columns: 40px 1fr 34px;
  gap: 8px;
  align-items: center;
  margin-top: 10px;
  font-family: var(--mono, monospace);
  font-size: 0.58rem;
  color: rgba(200, 240, 255, 0.55);
}

.preview-vanta .bar {
  height: 5px;
  border-radius: 99px;
  background: rgba(200, 240, 255, 0.1);
  overflow: hidden;
}

.preview-vanta .bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff4655, #40c8ff);
}

.preview-conduit .flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  align-items: center;
  margin-top: 17px;
}

.preview-conduit .node {
  min-height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(0, 255, 204, 0.16);
  border-radius: 9px;
  background: rgba(0, 255, 204, 0.05);
  font-family: var(--mono, monospace);
  font-size: 0.58rem;
  color: rgba(232, 248, 255, 0.82);
}

.preview-silk .chip-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 13px;
}

.preview-silk .mini-chip {
  padding: 7px 8px;
  border-radius: 999px;
  border: 1px solid rgba(64, 200, 255, 0.14);
  font-family: var(--mono, monospace);
  font-size: 0.54rem;
  color: rgba(200, 240, 255, 0.58);
  background: rgba(64, 200, 255, 0.05);
}

.project-card:hover .project-preview {
  border-color: rgba(64, 200, 255, 0.26);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.18);
}

@media (max-width: 900px) {
  .koels-live-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .koels-live-strip {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root),
  html.koels-route-leaving body,
  .koels-live-card::after,
  .radar-sweep,
  .radar-pulse,
  .globe-earth,
  .globe-orbit {
    animation: none !important;
    transition: none !important;
  }
}
`;

export const pageEnhancementScript = `
(function () {
  const LANYARD_USER_ID = '1135328814394785903';
  const MC_SERVER = 'koels.online';
  const DISCORD_WIDGET = '1494858459785465896';

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  function enhanceTransitions() {
    window.addEventListener('pageshow', function () {
      document.documentElement.classList.remove('koels-route-leaving');
    });

    document.addEventListener('click', function (event) {
      const anchor = event.target.closest && event.target.closest('a[href]');
      if (!anchor) return;
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;

      event.preventDefault();
      document.documentElement.classList.add('koels-route-leaving');
      window.setTimeout(function () {
        window.location.href = url.href;
      }, 150);
    });
  }

  function setLiveCard(id, value, sub) {
    const valueEl = document.querySelector('[data-live-value="' + id + '"]');
    const subEl = document.querySelector('[data-live-sub="' + id + '"]');
    if (valueEl) valueEl.textContent = value;
    if (subEl) subEl.textContent = sub || '';
  }

  function enhanceHome() {
    const hero = document.querySelector('.hero');
    const projectsGrid = document.querySelector('.projects-grid');
    if (!hero || !projectsGrid || document.querySelector('.koels-live-strip')) return;

    const strip = document.createElement('div');
    strip.className = 'koels-live-strip';
    strip.setAttribute('aria-label', 'Live site status');
    strip.innerHTML =
      '<div class="koels-live-card"><div class="koels-live-kicker">Local time</div><div class="koels-live-value" data-live-value="time">--:--</div><div class="koels-live-sub" data-live-sub="time">America/Chicago</div></div>' +
      '<div class="koels-live-card"><div class="koels-live-kicker">Minecraft</div><div class="koels-live-value" data-live-value="mc">Checking...</div><div class="koels-live-sub" data-live-sub="mc">koels.online</div></div>' +
      '<div class="koels-live-card"><div class="koels-live-kicker">Discord</div><div class="koels-live-value" data-live-value="discord">Checking...</div><div class="koels-live-sub" data-live-sub="discord">server widget</div></div>' +
      '<div class="koels-live-card"><div class="koels-live-kicker">Now</div><div class="koels-live-value" data-live-value="now">Syncing...</div><div class="koels-live-sub" data-live-sub="now">live presence</div></div>';

    const actions = hero.querySelector('.hero-actions');
    if (actions) actions.insertAdjacentElement('afterend', strip);
    else hero.appendChild(strip);

    function updateTime() {
      const now = new Date();
      setLiveCard('time', now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    }

    async function updateMc() {
      try {
        const response = await fetch('https://api.mcsrvstat.us/3/' + MC_SERVER, { cache: 'no-store' });
        const data = await response.json();
        if (!data || !data.online) {
          setLiveCard('mc', 'Offline', '0 players online');
          return;
        }
        const online = data.players && Number.isFinite(data.players.online) ? data.players.online : 0;
        const max = data.players && Number.isFinite(data.players.max) ? data.players.max : 0;
        setLiveCard('mc', String(online) + ' online', max ? online + ' / ' + max + ' capacity' : 'server is up');
      } catch (error) {
        setLiveCard('mc', 'Unavailable', 'status check failed');
      }
    }

    async function updateDiscord() {
      try {
        const response = await fetch('https://discord.com/api/guilds/' + DISCORD_WIDGET + '/widget.json', { cache: 'no-store' });
        const data = await response.json();
        if (!data || !data.name) {
          setLiveCard('discord', 'Unavailable', 'widget is private');
          return;
        }
        setLiveCard('discord', String(data.presence_count || 0) + ' online', data.name);
      } catch (error) {
        setLiveCard('discord', 'Unavailable', 'Discord check failed');
      }
    }

    async function updatePresence() {
      try {
        const response = await fetch('https://api.lanyard.rest/v1/users/' + LANYARD_USER_ID, { cache: 'no-store' });
        const payload = await response.json();
        const data = payload && payload.data;
        if (!data) {
          setLiveCard('now', 'Offline', 'presence unavailable');
          return;
        }
        if (data.listening_to_spotify && data.spotify) {
          setLiveCard('now', data.spotify.song || 'Spotify', data.spotify.artist || 'listening now');
          return;
        }
        const game = Array.isArray(data.activities) && data.activities.find(function (activity) { return activity && activity.type === 0 && activity.name; });
        if (game) {
          setLiveCard('now', game.name, data.discord_status || 'active');
          return;
        }
        setLiveCard('now', data.discord_status || 'offline', 'Discord presence');
      } catch (error) {
        setLiveCard('now', 'Unavailable', 'presence check failed');
      }
    }

    updateTime();
    updateMc();
    updateDiscord();
    updatePresence();
    window.setInterval(updateTime, 30000);
    window.setInterval(updateMc, 180000);
    window.setInterval(updateDiscord, 60000);
    window.setInterval(updatePresence, 15000);
  }

  function previewMarkup(projectName) {
    const name = projectName.toLowerCase();
    if (name.includes('radar')) {
      return '<div class="project-preview preview-radar"><svg class="preview-svg" viewBox="0 0 312 112" aria-hidden="true"><defs><radialGradient id="radarBackdrop" cx="50%" cy="42%" r="72%"><stop stop-color="#0b3657"/><stop offset=".58" stop-color="#041828"/><stop offset="1" stop-color="#020810"/></radialGradient><linearGradient id="radarBeam" x1="0" x2="1"><stop stop-color="#00ffcc" stop-opacity=".5"/><stop offset=".58" stop-color="#40c8ff" stop-opacity=".22"/><stop offset="1" stop-color="#40c8ff" stop-opacity="0"/></linearGradient><filter id="radarGlow"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="312" height="112" rx="10" fill="url(#radarBackdrop)"/><path d="M-8 86 C22 70 45 76 70 60 C91 47 100 29 126 31 C149 33 158 51 181 50 C209 49 221 27 247 35 C268 41 282 62 320 50 L320 112 L-8 112Z" fill="#0d5f65" opacity=".34"/><path d="M0 93 C35 76 62 82 91 63 C119 45 128 30 153 36 C181 42 188 63 219 57 C246 52 266 31 312 42" fill="none" stroke="#79ffe6" stroke-opacity=".18" stroke-width="2"/><g fill="none" stroke-linecap="round"><path d="M26 82 H64 M226 24 H274 M235 92 H290" stroke="#40c8ff" stroke-opacity=".2"/><path d="M39 71 H80 M205 34 H245" stroke="#00ffcc" stroke-opacity=".14"/></g><g fill="none" stroke="#40c8ff" stroke-opacity=".2"><circle cx="156" cy="60" r="18"/><circle cx="156" cy="60" r="40"/><circle cx="156" cy="60" r="62"/><circle cx="156" cy="60" r="84"/><path d="M72 60 H240 M156 16 V104"/></g><path class="radar-sweep" d="M156 60 L246 27 A94 94 0 0 1 233 94 Z" fill="url(#radarBeam)"/><g filter="url(#radarGlow)"><circle cx="156" cy="60" r="4" fill="#e8f8ff"/><circle class="radar-pulse" cx="156" cy="60" r="8" fill="none" stroke="#00ffcc" stroke-width="2"/><path d="M83 40 C101 30 122 36 130 52 C111 58 94 55 83 40Z" fill="#41dfff" opacity=".78"/><path d="M99 33 C116 31 132 42 136 58 C121 57 108 49 99 33Z" fill="#00ffcc" opacity=".62"/><path d="M217 72 C232 61 257 65 268 82 C247 91 228 87 217 72Z" fill="#5bd9ff" opacity=".72"/><path d="M236 67 C254 67 270 78 277 95 C260 96 245 88 236 67Z" fill="#ffd166" opacity=".72"/></g></svg><div class="project-preview-inner"><div class="project-preview-kicker">Live radar</div></div></div>';
    }
    if (name.includes('globe')) {
      return '<div class="project-preview preview-globe"><svg class="preview-svg" viewBox="0 0 312 112" aria-hidden="true"><defs><radialGradient id="earthOcean" cx="34%" cy="26%" r="74%"><stop stop-color="#91f3ff"/><stop offset=".28" stop-color="#2aa8df"/><stop offset=".72" stop-color="#075283"/><stop offset="1" stop-color="#02172d"/></radialGradient><linearGradient id="earthTerminator" x1="0" x2="1"><stop stop-color="#020810" stop-opacity="0"/><stop offset=".7" stop-color="#020810" stop-opacity=".16"/><stop offset="1" stop-color="#020810" stop-opacity=".62"/></linearGradient><filter id="earthGlow"><feGaussianBlur stdDeviation="2.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="312" height="112" rx="10" fill="rgba(2,16,32,.65)"/><path d="M16 82 C51 62 82 74 115 57 C148 40 168 31 207 42 C239 51 263 71 296 54" fill="none" stroke="#40c8ff" stroke-opacity=".12" stroke-width="2"/><g class="globe-orbit" fill="none" stroke-linecap="round"><ellipse cx="156" cy="61" rx="102" ry="29" stroke="#40c8ff" stroke-opacity=".24" stroke-width="2"/><ellipse cx="156" cy="61" rx="72" ry="20" stroke="#00ffcc" stroke-opacity=".13"/><path d="M58 61 A98 28 0 0 0 254 61" stroke="#e8f8ff" stroke-opacity=".12"/></g><g class="globe-earth" filter="url(#earthGlow)"><circle cx="156" cy="55" r="42" fill="url(#earthOcean)"/><path d="M121 50 C125 36 139 28 154 31 C151 39 139 42 139 51 C139 59 128 61 121 50Z" fill="#60e6ad" opacity=".88"/><path d="M151 34 C165 27 184 33 194 47 C185 48 178 45 171 51 C164 57 153 50 151 34Z" fill="#39d899" opacity=".86"/><path d="M176 58 C190 58 201 68 198 80 C185 82 176 75 176 58Z" fill="#7cf0bf" opacity=".78"/><path d="M137 71 C149 66 164 70 171 82 C156 90 141 84 137 71Z" fill="#22bd85" opacity=".76"/><path d="M113 59 C121 56 129 59 130 68 C120 71 113 67 113 59Z" fill="#8affce" opacity=".82"/><path d="M114 43 C129 19 169 10 195 29" fill="none" stroke="#e8f8ff" stroke-opacity=".3" stroke-width="3" stroke-linecap="round"/><circle cx="156" cy="55" r="42" fill="url(#earthTerminator)"/><path d="M156 13 C145 29 145 74 156 97 M156 13 C171 29 171 74 156 97 M114 55 H198 M122 35 C144 42 174 42 190 35 M122 75 C144 68 174 68 190 75" fill="none" stroke="#e8f8ff" stroke-opacity=".16" stroke-width="1.2"/></g><g filter="url(#earthGlow)"><circle cx="94" cy="68" r="3.5" fill="#00ffcc"/><circle cx="223" cy="72" r="3.5" fill="#40c8ff"/><circle cx="203" cy="35" r="3" fill="#ffd166"/></g></svg><div class="project-preview-inner"><div class="project-preview-kicker">Earth feed</div></div></div>';
    }
    if (name.includes('calculator')) {
      return '<div class="project-preview preview-calc"><div class="project-preview-inner"><div class="project-preview-kicker">Premium math</div><div class="calc-display">128 / 4 = ?</div><div class="calc-grid"><span class="calc-key">7</span><span class="calc-key">8</span><span class="calc-key">9</span><span class="calc-key hot">÷</span><span class="calc-key">4</span><span class="calc-key">5</span><span class="calc-key">6</span><span class="calc-key hot">×</span><span class="calc-key">1</span><span class="calc-key">2</span><span class="calc-key">3</span><span class="calc-key hot">=</span></div></div></div>';
    }
    if (name.includes('vanta')) {
      return '<div class="project-preview preview-vanta"><div class="project-preview-inner"><div class="project-preview-kicker">Tracker concept</div><div class="stat-row"><span>ACS</span><span class="bar"><i style="width:72%"></i></span><span>248</span></div><div class="stat-row"><span>HS%</span><span class="bar"><i style="width:48%"></i></span><span>28%</span></div><div class="stat-row"><span>RR</span><span class="bar"><i style="width:84%"></i></span><span>+18</span></div></div></div>';
    }
    if (name.includes('conduit')) {
      return '<div class="project-preview preview-conduit"><div class="project-preview-inner"><div class="project-preview-kicker">Network path</div><div class="flow"><div class="node">Client</div><div class="node">Proxy</div><div class="node">Server</div></div></div></div>';
    }
    if (name.includes('silkmc')) {
      return '<div class="project-preview preview-silk"><div class="project-preview-inner"><div class="project-preview-kicker">Compatibility</div><div class="chip-grid"><span class="mini-chip">Paper</span><span class="mini-chip">Folia</span><span class="mini-chip">Bukkit</span><span class="mini-chip">Spigot</span></div></div></div>';
    }
    return '';
  }

  function enhanceProjectCards() {
    document.querySelectorAll('.project-card').forEach(function (card) {
      if (card.querySelector('.project-preview')) return;
      const name = (card.querySelector('.project-name')?.textContent || '').trim();
      const html = previewMarkup(name);
      if (!html) return;
      const top = card.querySelector('.project-top');
      if (top) top.insertAdjacentHTML('afterend', html);
    });
  }

  onReady(function () {
    enhanceTransitions();
    enhanceHome();
    enhanceProjectCards();
  });
})();
`;
