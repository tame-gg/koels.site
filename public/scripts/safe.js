let container = document.querySelector('#youare-container');
let audio = document.querySelector('#youare-audio');
let ovlap = document.querySelector('#youare-overlap');
let micon = document.querySelector('#youare-micon');

// Overlap global. Can probably be done better.
// https://github.com/Endermanch/youareanidiot.cc 🤫
let overlap = false;

function audioPlay() {
	if (!overlap) {
		audio.currentTime = 0;
		audio.play();
	}
	else {
		ovlap.currentTime = 0;
		ovlap.play();
	}
	
	container.removeEventListener('click', audioPlay);
	
	audio.addEventListener('timeupdate', audioOverlap);
	ovlap.addEventListener('timeupdate', audioOverlap);
	
	container.classList.remove('clicky');
	micon.src = "/images/speaker.avif";
}

function audioStop() {
	audio.currentTime = 0;
	audio.pause();
	
	ovlap.currentTime = 0;
	ovlap.pause();
	
	container.addEventListener('click', audioPlay);
	
	audio.removeEventListener('timeupdate', audioOverlap);
	ovlap.removeEventListener('timeupdate', audioOverlap);
	
	container.classList.add('clicky');
	micon.src = "/images/speakerm.avif";
}

function audioSwitch() {	
	if (
		audio.duration > 0 && audio.paused &&
		ovlap.duration > 0 && ovlap.paused
	) {
		audioPlay();
	}
	else {
		audioStop();
	}
}

/* 
 * [Aug 2023] Finally, after 3 years have passed, I made the overlapping mechanism.
 * Audio overlapping is necessary for historic accuracy. The original flash version used to randomly overlap the song over itself.
 * I also think it sounds funnier and less respectful when overlapped.
 * Despite the constants .45 and .5, the JS audio jank at times makes it sound nice and random.
 */
function audioOverlap() {
    if (!overlap && audio.currentTime > audio.duration - .45) {
        ovlap.currentTime = 0;
        ovlap.play();
		
		overlap = true;
    }
	
	if (overlap && ovlap.currentTime > ovlap.duration - .5) {
        audio.currentTime = 0;
        audio.play();
		
		overlap = false;
    }
}

container.addEventListener('click', audioPlay);
container.addEventListener('click', () => {
	container.classList.remove('clicky');
});

micon.addEventListener('click', audioSwitch);

// ==========================================================================
// SAFE PAYLOAD: Real bouncing popup windows
// Only the MAIN window spawns and moves popups.
// Popups are passive display windows.
// Press ESC in ANY window to kill everything instantly and mute all audio.
// ==========================================================================
(function() {
	const urlParams = new URLSearchParams(window.location.search);
	const urlSession = urlParams.get('session');
	const isPopup = (window.opener !== null || !!urlSession);
	const isMain = !isPopup;

	// Shared session ID so popups can listen for the kill signal
	const sessionId = isMain
		? 'i_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7)
		: (urlSession || 'orphan');

	// -------------------------------------------------------------------------
	// POPUP MODE: play audio immediately, listen for kill, ESC
	// -------------------------------------------------------------------------
	if (isPopup) {
		const killKey = 'ik_' + sessionId;
		let pollId = null;

		function killPopup() {
			if (pollId) { clearInterval(pollId); pollId = null; }
			try {
				const a = document.getElementById('youare-audio');
				const o = document.getElementById('youare-overlap');
				if (a) { a.pause(); a.currentTime = 0; }
				if (o) { o.pause(); o.currentTime = 0; }
			} catch (e) {}
			try { window.close(); } catch (e) {}
		}

		function startPopupAudio() {
			const popupAudio = document.getElementById('youare-audio');
			const popupOvlap = document.getElementById('youare-overlap');
			if (!popupAudio) return false;

			let popupOverlap = false;

			function popupAudioOverlap() {
				if (!popupOverlap && popupAudio.currentTime > popupAudio.duration - .45) {
					popupOvlap.currentTime = 0;
					popupOvlap.play().catch(() => {});
					popupOverlap = true;
				}
				if (popupOverlap && popupOvlap.currentTime > popupOvlap.duration - .5) {
					popupAudio.currentTime = 0;
					popupAudio.play().catch(() => {});
					popupOverlap = false;
				}
			}

			popupAudio.currentTime = 0;
			popupAudio.play().catch(() => {});
			popupAudio.addEventListener('timeupdate', popupAudioOverlap);
			popupOvlap.addEventListener('timeupdate', popupAudioOverlap);
			return true;
		}

		// Immediate attempt + fallback retry
		if (!startPopupAudio()) {
			let tries = 0;
			const retry = setInterval(() => {
				if (startPopupAudio() || ++tries > 20) clearInterval(retry);
			}, 50);
		}

		// Poll for global kill signal
		pollId = setInterval(() => {
			try {
				if (localStorage.getItem(killKey)) {
					killPopup();
				}
			} catch (e) { clearInterval(pollId); }
		}, 500);

		// ESC in ANY window broadcasts the kill signal and closes all
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				try { localStorage.setItem(killKey, Date.now().toString()); } catch (e) {}
				killPopup();
			}
		});

		return; // Popups skip the heavy payload controller below
	}

	// -------------------------------------------------------------------------
	// MAIN WINDOW MODE: single controller for all popups
	// -------------------------------------------------------------------------
	let payloadActive = false;
	let windows = [];         // { win, vx, vy, changeDirTimer }
	let spawnTimer = null;
	let moveRequestId = null;
	let lastMoveTime = 0;
	let pollKillId = null;
	const WIN_W = 500;
	const WIN_H = 400;
	const SPAWN_INTERVAL = 2000; // ms

	function getKillKey() {
		return 'ik_' + sessionId;
	}

	function signalKill() {
		try { localStorage.setItem(getKillKey(), Date.now().toString()); } catch (e) {}
	}

	function clearKillSignal() {
		try { localStorage.removeItem(getKillKey()); } catch (e) {}
	}

	function doMainCleanup() {
		if (!payloadActive) return;
		payloadActive = false;

		if (spawnTimer) { clearInterval(spawnTimer); spawnTimer = null; }
		if (moveRequestId) { cancelAnimationFrame(moveRequestId); moveRequestId = null; }
		if (pollKillId) { clearInterval(pollKillId); pollKillId = null; }

		// Mute main window audio
		audioStop();

		windows.forEach(state => {
			try { if (!state.win.closed) state.win.close(); } catch (e) {}
		});
		windows = [];

		hideKillSwitch();
	}

	// Trigger audio inside a popup from the main window (same-origin access)
	function triggerPopupAudio(win) {
		if (!win || win.closed) return;
		try {
			const popupAudio = win.document.getElementById('youare-audio');
			if (popupAudio) {
				popupAudio.currentTime = 0;
				popupAudio.play().catch(() => {});
			}
		} catch (e) {
			// If DOM not ready yet, retry shortly
			setTimeout(() => triggerPopupAudio(win), 100);
		}
	}

	// Build a generous virtual-desktop bounds estimate.
	function getDesktopBounds() {
		const sw = screen.width  || 1920;
		const sh = screen.height || 1080;

		let minX = -sw * 3;
		let minY = -sh * 3;
		let maxX = sw * 4;
		let maxY = sh * 4;

		if (typeof screen.left === 'number')       minX = Math.min(minX, screen.left - sw * 2);
		if (typeof screen.top === 'number')        minY = Math.min(minY, screen.top  - sh * 2);
		if (typeof screen.availLeft === 'number')  minX = Math.min(minX, screen.availLeft - sw * 2);
		if (typeof screen.availTop === 'number')   minY = Math.min(minY, screen.availTop  - sh * 2);

		if (typeof screen.width === 'number')       maxX = Math.max(maxX, (screen.left || 0) + screen.width  + sw * 2);
		if (typeof screen.height === 'number')    maxY = Math.max(maxY, (screen.top  || 0) + screen.height + sh * 2);
		if (typeof screen.availWidth === 'number')  maxX = Math.max(maxX, (screen.availLeft || 0) + screen.availWidth  + sw * 2);
		if (typeof screen.availHeight === 'number') maxY = Math.max(maxY, (screen.availTop  || 0) + screen.availHeight + sh * 2);

		return { minX, minY, maxX, maxY };
	}

	function randomAngle() {
		return Math.random() * Math.PI * 2;
	}

	function randomSpeed() {
		return 8 + Math.random() * 22; // 8-30 px/frame
	}

	function pickNewTrajectory(state) {
		state.angle = randomAngle();
		state.speed = randomSpeed();
	}

	function applyVelocity(state) {
		state.vx = Math.cos(state.angle) * state.speed;
		state.vy = Math.sin(state.angle) * state.speed;
	}

	function createPopup() {
		try {
			const b = getDesktopBounds();
			const x = b.minX + Math.floor(Math.random() * Math.max(1, b.maxX - b.minX - WIN_W));
			const y = b.minY + Math.floor(Math.random() * Math.max(1, b.maxY - b.minY - WIN_H));
			const url = '/moron?session=' + encodeURIComponent(sessionId);

			const win = window.open(
				url,
				'_blank',
				`width=${WIN_W},height=${WIN_H},left=${x},top=${y},toolbar=no,menubar=no,location=no,status=no,resizable=yes,scrollbars=no`
			);

			if (win) {
				const state = {
					win: win,
					angle: randomAngle(),
					speed: randomSpeed(),
					vx: 0,
					vy: 0,
					chaosTimer: 0
				};
				applyVelocity(state);
				windows.push(state);

				// Trigger audio in the popup using main window's user activation
				triggerPopupAudio(win);
				// Also retry after load in case DOM wasn't ready
				win.addEventListener('load', () => triggerPopupAudio(win));
			}
		} catch (e) {}
	}

	function moveWindows() {
		if (!payloadActive) return;

		const now = performance.now();
		if (now - lastMoveTime < 16) {
			moveRequestId = requestAnimationFrame(moveWindows);
			return;
		}
		lastMoveTime = now;

		const b = getDesktopBounds();

		windows.forEach(state => {
			try {
				if (state.win.closed) return;

				let sx = state.win.screenX !== undefined ? state.win.screenX : (state.win.screenLeft || 0);
				let sy = state.win.screenY !== undefined ? state.win.screenY : (state.win.screenTop || 0);
				let ww = state.win.outerWidth || WIN_W;
				let wh = state.win.outerHeight || WIN_H;

				// Chaos timer
				state.chaosTimer++;

				// Constant jitter every frame: wiggle angle slightly for erratic paths
				state.angle += (Math.random() - 0.5) * 0.35;

				// Every ~1 second pick a totally new trajectory (chaotic zig-zag)
				if (state.chaosTimer > 60) {
					state.chaosTimer = 0;
					pickNewTrajectory(state);
				}

				// Recompute velocity from current angle + speed
				applyVelocity(state);

				sx += state.vx;
				sy += state.vy;

				// On boundary hit: bounce at a completely random angle (not axis mirror)
				// This prevents the 4-corner ping-pong pattern.
				let bounced = false;
				if (sx <= b.minX) { sx = b.minX; bounced = true; }
				if (sy <= b.minY) { sy = b.minY; bounced = true; }
				if (sx + ww >= b.maxX)  { sx = b.maxX - ww;  bounced = true; }
				if (sy + wh >= b.maxY) { sy = b.maxY - wh; bounced = true; }

				if (bounced) {
					pickNewTrajectory(state);
					// Nudge away from wall so it doesn't get stuck
					sx += Math.cos(state.angle) * 10;
					sy += Math.sin(state.angle) * 10;
				}

				state.win.moveTo(Math.floor(sx), Math.floor(sy));
			} catch (e) {}
		});

		// Prune closed windows so array doesn't bloat
		windows = windows.filter(w => {
			try { return !w.win.closed; } catch (e) { return false; }
		});

		moveRequestId = requestAnimationFrame(moveWindows);
	}

	function startPayload() {
		if (payloadActive) return;
		payloadActive = true;
		clearKillSignal();
		showKillSwitch();

		// Spawn one immediately, then every 2 seconds forever
		createPopup();
		spawnTimer = setInterval(() => {
			if (payloadActive) createPopup();
		}, SPAWN_INTERVAL);

		moveWindows();

		// Listen for kill signal from popups (so ESC in any popup stops everything)
		pollKillId = setInterval(() => {
			try {
				if (localStorage.getItem(getKillKey())) {
					doMainCleanup();
				}
			} catch (e) {
				if (pollKillId) clearInterval(pollKillId);
			}
		}, 500);
	}

	function stopPayload() {
		signalKill();
		doMainCleanup();
	}

	// UI: Kill switch hint
	let killSwitchEl = null;
	function showKillSwitch() {
		if (killSwitchEl) return;
		killSwitchEl = document.createElement('div');
		killSwitchEl.style.position = 'fixed';
		killSwitchEl.style.bottom = '14px';
		killSwitchEl.style.left = '50%';
		killSwitchEl.style.transform = 'translateX(-50%)';
		killSwitchEl.style.background = 'rgba(0, 0, 0, 0.9)';
		killSwitchEl.style.color = '#fff';
		killSwitchEl.style.padding = '10px 20px';
		killSwitchEl.style.borderRadius = '8px';
		killSwitchEl.style.fontFamily = "'Times New Roman', serif";
		killSwitchEl.style.fontSize = '15px';
		killSwitchEl.style.zIndex = '99999';
		killSwitchEl.style.pointerEvents = 'none';
		killSwitchEl.style.userSelect = 'none';
		killSwitchEl.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
		killSwitchEl.textContent = 'Press ESC to stop';
		document.body.appendChild(killSwitchEl);
	}

	function hideKillSwitch() {
		if (killSwitchEl) {
			killSwitchEl.remove();
			killSwitchEl = null;
		}
	}

	// ESC kills everything from the main window
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			stopPayload();
		}
	});

	// Start payload on first click of the main idiot container
	container.addEventListener('click', startPayload, { once: true });
})();
