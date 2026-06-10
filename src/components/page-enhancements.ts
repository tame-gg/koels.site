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

.radar-real-sweep {
  transform-origin: 156px 58px;
  animation: koels-radar-real-sweep 4.2s linear infinite;
}

.radar-real-weather {
  transform-origin: center;
  animation: koels-radar-real-weather 5.6s ease-in-out infinite;
}

.radar-real-ping,
.globe-real-ping {
  transform-origin: center;
  animation: koels-preview-ping 2.4s ease-in-out infinite;
}

.radar-real-ping.two,
.globe-real-ping.two {
  animation-delay: -0.9s;
}

.radar-real-timeline {
  animation: koels-real-timeline 3.8s ease-in-out infinite;
}

.globe-real-earth {
  transform-origin: 156px 58px;
  animation: koels-globe-real-float 4.2s ease-in-out infinite;
}

.globe-real-orbit {
  transform-origin: 156px 58px;
  animation: koels-globe-real-orbit 6.8s linear infinite;
}

@keyframes koels-radar-real-sweep {
  to { transform: rotate(360deg); }
}

@keyframes koels-radar-real-weather {
  0%, 100% { transform: translateX(-3px) translateY(0); opacity: 0.88; }
  50% { transform: translateX(5px) translateY(-2px); opacity: 1; }
}

@keyframes koels-preview-ping {
  0%, 100% { opacity: 0.46; transform: scale(0.82); }
  50% { opacity: 1; transform: scale(1.12); }
}

@keyframes koels-real-timeline {
  0%, 100% { transform: translateX(-18px); }
  50% { transform: translateX(96px); }
}

@keyframes koels-globe-real-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes koels-globe-real-orbit {
  to { transform: rotate(360deg); }
}

.preview-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.08) contrast(1.04);
}

.preview-radar::after,
.preview-globe::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(115deg, transparent 0 42%, rgba(232, 248, 255, 0.08) 50%, transparent 58%),
    linear-gradient(180deg, rgba(2, 8, 16, 0.02), rgba(2, 8, 16, 0.22));
  transform: translateX(-130%);
  animation: koels-preview-scan 4.8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes koels-preview-scan {
  0%, 58% { transform: translateX(-130%); }
  86%, 100% { transform: translateX(130%); }
}

.mini-radar,
.mini-globe {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.mini-radar {
  background:
    radial-gradient(circle at 49% 50%, rgba(64, 200, 255, 0.16), transparent 32%),
    linear-gradient(145deg, rgba(2, 16, 31, 0.92), rgba(2, 8, 16, 0.68));
}

.mini-radar::before,
.mini-globe::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(64, 200, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(64, 200, 255, 0.045) 1px, transparent 1px);
  background-size: 18px 18px;
  mask-image: linear-gradient(to bottom, black, transparent 90%);
  pointer-events: none;
}

.mini-radar-map {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(80px 54px at 52% 54%, rgba(64, 200, 255, 0.1), transparent 68%),
    radial-gradient(120px 62px at 92% 58%, rgba(0, 255, 204, 0.06), transparent 72%),
    linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(2, 8, 16, 0.36));
}

.mini-radar-map::before,
.mini-radar-map::after {
  content: "";
  position: absolute;
  left: -18px;
  right: -18px;
  height: 58px;
  border-top: 1px solid rgba(88, 226, 211, 0.22);
  background:
    linear-gradient(110deg, rgba(13, 95, 101, 0.62), rgba(15, 105, 121, 0.2)),
    radial-gradient(90px 30px at 55% 20%, rgba(64, 200, 255, 0.18), transparent 72%);
  transform: skewY(-8deg);
}

.mini-radar-map::before {
  top: 55px;
  animation: koels-map-drift 8s ease-in-out infinite;
}

.mini-radar-map::after {
  top: 84px;
  opacity: 0.55;
  transform: skewY(-6deg) translateX(-22px);
  animation: koels-map-drift 9.5s ease-in-out infinite reverse;
}

.radar-rings {
  position: absolute;
  left: 50%;
  top: 55%;
  width: 168px;
  height: 168px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background:
    repeating-radial-gradient(circle, transparent 0 22px, rgba(64, 200, 255, 0.18) 23px 24px, transparent 25px 44px),
    linear-gradient(rgba(64, 200, 255, 0.22), rgba(64, 200, 255, 0.22)) 50% 0 / 1px 100% no-repeat,
    linear-gradient(90deg, rgba(64, 200, 255, 0.22), rgba(64, 200, 255, 0.22)) 0 50% / 100% 1px no-repeat;
  mask-image: radial-gradient(circle, black 0 55%, transparent 78%);
}

.radar-sweep-panel {
  position: absolute;
  left: 50%;
  top: 55%;
  width: 184px;
  height: 184px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: conic-gradient(from 292deg, rgba(0, 255, 204, 0.5), rgba(64, 200, 255, 0.16) 18deg, transparent 46deg);
  mask-image: radial-gradient(circle, transparent 0 7px, black 8px 62%, transparent 74%);
  animation: koels-radar-sweep-panel 3.2s linear infinite;
}

.radar-cell {
  position: absolute;
  border-radius: 999px;
  filter: blur(1px);
  mix-blend-mode: screen;
  opacity: 0.86;
  animation: koels-radar-cell 4.6s ease-in-out infinite;
}

.radar-cell.c1 {
  left: 70px;
  top: 40px;
  width: 60px;
  height: 18px;
  background: linear-gradient(90deg, #30fff0, #28c8ff);
  transform: rotate(16deg);
}

.radar-cell.c2 {
  right: 44px;
  top: 68px;
  width: 66px;
  height: 18px;
  background: linear-gradient(90deg, #40c8ff, #ffd75e);
  transform: rotate(23deg);
  animation-delay: -1.7s;
}

.radar-cell.c3 {
  left: 162px;
  top: 48px;
  width: 72px;
  height: 13px;
  background: linear-gradient(90deg, rgba(0, 255, 204, 0), rgba(0, 255, 204, 0.72), rgba(64, 200, 255, 0));
  animation-delay: -0.8s;
}

.radar-core {
  position: absolute;
  left: 50%;
  top: 55%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(232, 248, 255, 0.84);
  background: #00ffcc;
  box-shadow: 0 0 18px rgba(0, 255, 204, 0.72);
  animation: koels-radar-pulse 1.8s ease-in-out infinite;
}

.radar-timeline {
  position: absolute;
  left: 15px;
  right: 15px;
  bottom: 11px;
  height: 3px;
  border-radius: 999px;
  background: rgba(200, 240, 255, 0.1);
  overflow: hidden;
}

.radar-timeline::after {
  content: "";
  display: block;
  width: 46%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #40c8ff, #00ffcc);
  animation: koels-timeline 3.6s ease-in-out infinite;
}

.mini-globe {
  background:
    radial-gradient(circle at 50% 48%, rgba(64, 200, 255, 0.16), transparent 38%),
    radial-gradient(circle at 82% 18%, rgba(0, 255, 204, 0.08), transparent 34%),
    linear-gradient(145deg, rgba(2, 16, 31, 0.94), rgba(2, 8, 16, 0.72));
}

.globe-scene-line {
  position: absolute;
  left: 18px;
  right: 18px;
  top: 64px;
  height: 40px;
  border-top: 1px solid rgba(64, 200, 255, 0.16);
  border-radius: 50%;
  transform: rotate(-9deg);
}

.globe-body {
  position: absolute;
  left: 50%;
  top: 53%;
  width: 82px;
  height: 82px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  background:
    radial-gradient(circle at 32% 24%, rgba(232, 248, 255, 0.64), transparent 10%),
    radial-gradient(circle at 34% 28%, #59e4ff, #0d79ad 42%, #052c55 78%, #020810 100%);
  box-shadow:
    inset -18px -10px 28px rgba(2, 8, 16, 0.72),
    inset 12px 8px 24px rgba(145, 243, 255, 0.2),
    0 0 28px rgba(64, 200, 255, 0.44);
  animation: koels-globe-float 3.8s ease-in-out infinite;
}

.globe-body::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(18px 11px at 16% 31%, #7df0b8 0 68%, transparent 72%),
    radial-gradient(24px 14px at 43% 24%, #58df9d 0 65%, transparent 69%),
    radial-gradient(18px 28px at 61% 50%, #7cf0bf 0 52%, transparent 56%),
    radial-gradient(23px 14px at 39% 72%, #28c783 0 64%, transparent 68%),
    radial-gradient(18px 12px at 83% 38%, #51d998 0 62%, transparent 66%);
  background-size: 160px 82px;
  animation: koels-globe-land 7.5s linear infinite;
}

.globe-body::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    linear-gradient(90deg, transparent, rgba(232, 248, 255, 0.15), transparent) 50% 0 / 1px 100% no-repeat,
    repeating-linear-gradient(0deg, transparent 0 17px, rgba(232, 248, 255, 0.11) 18px 19px, transparent 20px 34px),
    radial-gradient(circle at 72% 50%, rgba(2, 8, 16, 0.2), rgba(2, 8, 16, 0.74) 76%);
}

.globe-atmosphere {
  position: absolute;
  left: 50%;
  top: 53%;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(145, 243, 255, 0.28);
  box-shadow: 0 0 30px rgba(64, 200, 255, 0.3);
  animation: koels-globe-float 3.8s ease-in-out infinite;
}

.globe-orbit-ring {
  position: absolute;
  left: 50%;
  top: 56%;
  width: 190px;
  height: 52px;
  border: 2px solid rgba(64, 200, 255, 0.24);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(-8deg);
  animation: koels-orbit-drift 5s linear infinite;
}

.globe-orbit-ring::after {
  content: "";
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  right: 26px;
  top: 6px;
  background: #ffd75e;
  box-shadow: 0 0 14px rgba(255, 215, 94, 0.8);
}

.globe-event {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00ffcc;
  box-shadow: 0 0 14px currentColor;
  animation: koels-event-pulse 2.2s ease-in-out infinite;
}

.globe-event.e1 { left: 86px; top: 67px; color: #00ffcc; }
.globe-event.e2 { right: 74px; top: 68px; color: #40c8ff; animation-delay: -0.8s; }
.globe-event.e3 { right: 108px; top: 39px; color: #ffd75e; animation-delay: -1.4s; }

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
  0%, 100% { opacity: 0.45; transform: translate(-50%, -50%) scale(0.82); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

@keyframes koels-radar-sweep-panel {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes koels-radar-cell {
  0%, 100% { opacity: 0.62; filter: blur(1px); }
  50% { opacity: 1; filter: blur(0); }
}

@keyframes koels-map-drift {
  0%, 100% { translate: 0 0; }
  50% { translate: -14px 3px; }
}

@keyframes koels-timeline {
  0%, 100% { transform: translateX(-12%); }
  50% { transform: translateX(132%); }
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

@keyframes koels-globe-float {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -5px; }
}

@keyframes koels-globe-land {
  to { background-position: -160px 0; }
}

@keyframes koels-orbit-drift {
  to { transform: translate(-50%, -50%) rotate(352deg); }
}

@keyframes koels-event-pulse {
  0%, 100% { opacity: 0.46; transform: scale(0.78); }
  50% { opacity: 1; transform: scale(1.18); }
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
  .globe-orbit,
  .radar-sweep-panel,
  .radar-cell,
  .radar-core,
  .radar-timeline::after,
  .mini-radar-map::before,
  .mini-radar-map::after,
  .globe-body,
  .globe-body::before,
  .globe-atmosphere,
  .globe-orbit-ring,
  .globe-event,
  .radar-real-sweep,
  .radar-real-weather,
  .radar-real-ping,
  .radar-real-timeline,
  .globe-real-earth,
  .globe-real-orbit,
  .globe-real-ping,
  .preview-radar::after,
  .preview-globe::after {
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
      return '<div class="project-preview preview-radar"><svg class="preview-svg" viewBox="0 0 312 112" aria-hidden="true"><defs><linearGradient id="rdrSweep" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#00ffcc" stop-opacity=".55"/><stop offset=".5" stop-color="#40c8ff" stop-opacity=".14"/><stop offset="1" stop-color="#40c8ff" stop-opacity="0"/></linearGradient><radialGradient id="rdrCore" cx="50%" cy="50%" r="50%"><stop stop-color="#ff5f56"/><stop offset=".55" stop-color="#ffb347"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient><clipPath id="rdrClip"><circle cx="156" cy="58" r="50"/></clipPath></defs><circle cx="156" cy="58" r="50" fill="#04101f"/><g clip-path="url(#rdrClip)"><path d="M104 94 C120 80 122 66 140 62 C152 59 156 50 150 40 C170 44 178 58 198 56 C212 55 216 66 208 78" fill="none" stroke="#40c8ff" stroke-opacity=".16" stroke-width="1.2"/><g class="radar-real-weather"><path d="M120 72 C128 57 150 51 168 57 C184 62 190 75 178 85 C162 95 132 92 120 72Z" fill="#1fae6b" opacity=".5"/><path d="M132 69 C140 59 158 56 170 63 C178 68 178 79 166 83 C150 88 138 81 132 69Z" fill="#37d27d" opacity=".68"/><ellipse cx="154" cy="69" rx="15" ry="10.5" fill="#ffd75e" opacity=".82"/><ellipse cx="156" cy="69" rx="8.5" ry="6" fill="url(#rdrCore)"/></g><path class="radar-real-sweep" d="M156 58 L156 8 A50 50 0 0 1 200 36 Z" fill="url(#rdrSweep)"/></g><g fill="none" stroke="#40c8ff"><circle cx="156" cy="58" r="34" stroke-opacity=".15"/><circle cx="156" cy="58" r="18" stroke-opacity=".15"/><path d="M106 58 H206 M156 8 V108" stroke-opacity=".1"/></g><circle cx="156" cy="58" r="50" fill="none" stroke="#40c8ff" stroke-opacity=".4" stroke-width="1.4"/><circle cx="156" cy="58" r="2.6" fill="#00ffcc"/><circle class="radar-real-ping" cx="156" cy="69" r="4" fill="#ff5f56"/><g font-family="monospace" font-size="6"><rect x="20" y="39" width="6" height="6" rx="1.5" fill="#37d27d"/><rect x="20" y="51" width="6" height="6" rx="1.5" fill="#ffd75e"/><rect x="20" y="63" width="6" height="6" rx="1.5" fill="#ff5f56"/><text x="30" y="44.5" fill="#9fd8ef" fill-opacity=".55">LOW</text><text x="30" y="56.5" fill="#9fd8ef" fill-opacity=".55">MOD</text><text x="30" y="68.5" fill="#9fd8ef" fill-opacity=".55">SEV</text></g><g font-family="monospace" font-size="6" fill="#9fd8ef" fill-opacity=".42"><text x="260" y="46">RANGE</text><text x="260" y="55">120KM</text><text x="260" y="69">SWEEP</text><text x="260" y="78">ACTIVE</text></g></svg><div class="project-preview-inner"><div class="project-preview-kicker">Live radar</div></div></div>';
    }
    if (name.includes('globe')) {
      return '<div class="project-preview preview-globe"><svg class="preview-svg" viewBox="0 0 312 112" aria-hidden="true"><defs><radialGradient id="glbOcean" cx="36%" cy="30%" r="78%"><stop stop-color="#7fe9ff"/><stop offset=".4" stop-color="#1f8ec9"/><stop offset=".8" stop-color="#063f6d"/><stop offset="1" stop-color="#02101f"/></radialGradient><radialGradient id="glbShade" cx="50%" cy="50%" r="50%"><stop offset=".55" stop-color="#02101f" stop-opacity="0"/><stop offset="1" stop-color="#02060d" stop-opacity=".7"/></radialGradient><clipPath id="glbClip"><circle cx="156" cy="58" r="44"/></clipPath></defs><g class="globe-real-orbit"><ellipse cx="156" cy="58" rx="86" ry="22" fill="none" stroke="#40c8ff" stroke-opacity=".28" stroke-width="1.4"/><circle cx="242" cy="58" r="2.4" fill="#00ffcc"/></g><g class="globe-real-earth"><circle cx="156" cy="58" r="44" fill="url(#glbOcean)"/><g clip-path="url(#glbClip)"><path d="M138 32 C146 30 150 38 146 46 C142 52 148 58 144 66 C140 76 134 84 128 80 C132 70 130 60 134 52 C130 46 132 38 138 32Z" fill="#3fc97f" opacity=".9"/><path d="M160 38 C176 34 188 42 186 54 C184 66 176 72 170 80 C166 72 168 62 162 56 C158 50 156 42 160 38Z" fill="#35c87d" opacity=".88"/><ellipse cx="182" cy="74" rx="8" ry="5" fill="#58dd91" opacity=".82"/><g fill="none" stroke="#e8f8ff" stroke-opacity=".13" stroke-width="1"><ellipse cx="156" cy="58" rx="44" ry="15"/><ellipse cx="156" cy="58" rx="44" ry="30"/><ellipse cx="156" cy="58" rx="15" ry="44"/><ellipse cx="156" cy="58" rx="30" ry="44"/><path d="M112 58 H200 M156 14 V102"/></g><circle cx="156" cy="58" r="44" fill="url(#glbShade)"/></g><circle cx="156" cy="58" r="44" fill="none" stroke="#91f3ff" stroke-opacity=".38" stroke-width="1.4"/><circle cx="156" cy="58" r="47" fill="none" stroke="#40c8ff" stroke-opacity=".16" stroke-width="3"/></g><g><circle class="globe-real-ping" cx="138" cy="48" r="3.4" fill="#ff5f56"/><circle class="globe-real-ping two" cx="176" cy="70" r="3.4" fill="#ffd75e"/><circle class="globe-real-ping" cx="162" cy="40" r="3" fill="#00ffcc"/></g><g font-family="monospace" font-size="6"><circle cx="24" cy="43" r="3" fill="#ff5f56"/><circle cx="24" cy="55" r="3" fill="#ffd75e"/><circle cx="24" cy="67" r="3" fill="#00ffcc"/><text x="31" y="45.5" fill="#9fd8ef" fill-opacity=".55">QUAKE</text><text x="31" y="57.5" fill="#9fd8ef" fill-opacity=".55">STORM</text><text x="31" y="69.5" fill="#9fd8ef" fill-opacity=".55">FIRE</text></g><g font-family="monospace" font-size="6" fill="#9fd8ef" fill-opacity=".42"><text x="262" y="52">EVENTS</text><text x="262" y="61">LIVE</text></g></svg><div class="project-preview-inner"><div class="project-preview-kicker">Earth feed</div></div></div>';
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
