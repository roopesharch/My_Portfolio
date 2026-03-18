<script>
	import { onMount, onDestroy } from 'svelte';

	let canvasElement;
	let animationId;
	let w, h;
	let ctx;

	const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
	const letters = (katakana + "0123456789").split("");
	
	const swarmSettings = {
		count: 190,
		baseSize: 12,
		speedLimit: 2.0,
	};

	let characters = [];
	let charCache = {};

	function cacheCharacters() {
		letters.forEach(char => {
			const size = 40;
			const offCanvas = document.createElement('canvas');
			offCanvas.width = size * 2;
			offCanvas.height = size * 2;
			const oCtx = offCanvas.getContext('2d');


			oCtx.shadowColor = '#C84BFF';   // neon purple glow
			oCtx.shadowBlur = 25;           // stronger glow

			const grad = oCtx.createLinearGradient(0, 0, size, size);
			grad.addColorStop(0, '#F5D0FF'); // bright inner glow
			grad.addColorStop(0.5, '#D946EF'); // neon mid
			grad.addColorStop(1, '#7E22CE'); // deep purple edge

			oCtx.fillStyle = grad;
			oCtx.font = `900 ${size}px "Exo 2"`;
			oCtx.textAlign = 'center';
			oCtx.textBaseline = 'middle';
			oCtx.fillText(char, size, size);

			charCache[char] = offCanvas;
		});
	}

	class FloatingKatana {
		constructor() {
			this.init();
		}

		init() {
			this.char = letters[Math.floor(Math.random() * letters.length)];
			this.size = Math.random() * 10 + swarmSettings.baseSize;
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.speedX = (Math.random() - 0.5) * swarmSettings.speedLimit;
			this.speedY = (Math.random() - 0.5) * swarmSettings.speedLimit;
			this.rot = Math.random() * 360;
			this.rotSpeed = (Math.random() - 0.5) * 1.5;
			this.opacity = 0.35 + Math.random() * 0.65;
		}

		update() {
			this.x += this.speedX;
			this.y += this.speedY;
			this.rot += this.rotSpeed;

			if (this.x < -50) this.x = w + 50;
			if (this.x > w + 50) this.x = -50;
			if (this.y < -50) this.y = h + 50;
			if (this.y > h + 50) this.y = -50;
		}

		draw() {
			const cachedImg = charCache[this.char];
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate((this.rot * Math.PI) / 180);
			ctx.globalAlpha = this.opacity;
			
			ctx.drawImage(
				cachedImg, 
				-this.size, -this.size, 
				this.size * 2, this.size * 2
			);
			ctx.restore();
		}
	}

	function animate() {
		// ✅ Use your exact dark theme color
		ctx.globalAlpha = 1;
		ctx.globalCompositeOperation = 'source-over';
		ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = '#0a0a0a'; // <-- updated here
		ctx.fillRect(0, 0, w, h);

		characters.forEach(char => {
			char.update();
			char.draw();
		});

		animationId = requestAnimationFrame(animate);
	}

	function handleResize() {
		w = window.innerWidth;
		h = window.innerHeight;
		if (canvasElement) {
			canvasElement.width = w;
			canvasElement.height = h;
		}
	}

	onMount(() => {
		ctx = canvasElement.getContext('2d', { alpha: false });
		cacheCharacters();
		handleResize();
		
		characters = Array.from({ length: swarmSettings.count }, () => new FloatingKatana());
		
		window.addEventListener('resize', handleResize);
		animate();
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationId);
		}
	});
</script>

<canvas 
	bind:this={canvasElement} 
	class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1000"
></canvas>

<style>
	canvas {
		background-color: #0a0a0a; /* <-- updated here too */
	}
</style>