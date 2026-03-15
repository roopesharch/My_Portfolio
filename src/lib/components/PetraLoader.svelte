<script>
	import { onMount } from 'svelte';
	let { onComplete } = $props();

	let loadingPercent = $state(0);
	let loadingText = $state("LOADING SDET CORE");
	let canvas;
	let showMatrixBlanket = $state(false);

	onMount(async () => {
		const { gsap } = await import('gsap');
		
		const path = document.querySelector('.path-animation');
		const pathLength = path.getTotalLength();

		gsap.set(path, { 
			strokeDasharray: pathLength, 
			strokeDashoffset: pathLength,
			opacity: 1
		});

		const startMatrixEffect = () => {
			showMatrixBlanket = true;
			const ctx = canvas.getContext('2d');
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
			const wallFontSize = 22;
			const goldPrimary = "#D4AF37";
			const goldHighlight = "#FCF6BA";
			
			let blanketY = 0;
			let dissolveY = 0;
			let phase = 'blanket'; 
			let holdCounter = 0;
			let handoffTriggered = false;

			function animate() {
				ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				
				ctx.font = `900 ${wallFontSize}px "Exo 2"`;
				ctx.textAlign = "center";
				const wallCols = Math.floor(canvas.width / wallFontSize);

				if (phase === 'blanket') {
					for (let i = 0; i < wallCols; i++) {
						const x = i * wallFontSize + wallFontSize / 2;
						for (let j = 0; j < Math.floor(blanketY); j++) {
							const y = j * wallFontSize + wallFontSize;
							ctx.fillStyle = Math.random() > 0.8 ? goldHighlight : goldPrimary;
							ctx.fillText(katakana[Math.floor(Math.random() * katakana.length)], x, y);
						}
					}
					blanketY += 1.5; 
					if (blanketY * wallFontSize > canvas.height + 50) {
						phase = 'hold';
					}
				} 

				else if (phase === 'hold') {
					for (let i = 0; i < wallCols; i++) {
						const x = i * wallFontSize + wallFontSize / 2;
						for (let j = 0; j < Math.floor(canvas.height / wallFontSize) + 1; j++) {
							const y = j * wallFontSize + wallFontSize;
							ctx.fillStyle = Math.random() > 0.8 ? goldHighlight : goldPrimary;
							ctx.fillText(katakana[Math.floor(Math.random() * katakana.length)], x, y);
						}
					}
					holdCounter++;
					if (holdCounter > 15) phase = 'dissolve'; 
				}
				
				if (phase === 'dissolve') {
					// Hand off to Title.svelte immediately as dissolve starts
					if (!handoffTriggered) {
						onComplete();
						handoffTriggered = true;
					}

					for (let i = 0; i < wallCols; i++) {
						const x = i * wallFontSize + wallFontSize / 2;
						for (let j = Math.floor(dissolveY); j < Math.floor(canvas.height / wallFontSize) + 1; j++) {
							const y = j * wallFontSize + wallFontSize;
							ctx.fillStyle = Math.random() > 0.8 ? goldHighlight : goldPrimary;
							ctx.fillText(katakana[Math.floor(Math.random() * katakana.length)], x, y);
						}
					}
					dissolveY += 2.5; 
				}

				if (dissolveY * wallFontSize > canvas.height + 100) {
					gsap.to(".loader-wrapper", {
						opacity: 0,
						duration: 0.3
					});
				} else {
					requestAnimationFrame(animate);
				}
			}
			animate();
		};

		let tl = gsap.timeline({
			onComplete: () => {
				gsap.to(".loader-content", {
					opacity: 0,
					duration: 0.4,
					onComplete: startMatrixEffect
				});
			}
		});

		tl.to({ val: 0 }, {
			val: 100,
			duration: 3,
			ease: "power2.inOut",
			onUpdate: function() {
				loadingPercent = Math.floor(this.targets()[0].val);
				const progress = loadingPercent / 100;
				gsap.set(path, { strokeDashoffset: pathLength * (1 - progress) });
			}
		});
	});
</script>

<div class="loader-wrapper fixed inset-0 z-[100] bg-white overflow-hidden flex items-center justify-center">
	<canvas bind:this={canvas} class="absolute inset-0 w-full h-full {showMatrixBlanket ? 'opacity-100' : 'opacity-0'}"></canvas>

	<div class="loader-content relative z-10 flex flex-col items-center justify-center" style="transform: translateY(-2cm);">
		<div class="loading-logo mb-0">
			<img src="/img/logo.png" alt="Logo" class="w-60 h-70 object-contain" />
		</div>
		<div class="relative flex items-center justify-center w-full -mt-10"> 
			<svg width="600" height="160" viewBox="0 20 200 60" fill="none" class="w-[90vw] max-w-[1000px] drop-shadow-gold">
				<defs>
					<linearGradient id="petraGoldFlow" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#DAA520" /><stop offset="35%" stop-color="#FFD700" />
						<stop offset="50%" stop-color="#FFFFFF" /><stop offset="65%" stop-color="#FFD700" />
						<stop offset="100%" stop-color="#DAA520" />
						<animate attributeName="x1" from="-100%" to="100%" dur="3s" repeatCount="indefinite" />
						<animate attributeName="x2" from="0%" to="200%" dur="3s" repeatCount="indefinite" />
					</linearGradient>
				</defs>
				<path d="M50 25C20 25 20 75 50 75C80 75 120 25 150 25C180 25 180 75 150 75C120 75 80 25 50 25Z" stroke="#F3F4F6" stroke-width="2.5" stroke-linecap="round" />
				<path d="M50 25C20 25 20 75 50 75C80 75 120 25 150 25C180 25 180 75 150 75C120 75 80 25 50 25Z" stroke="url(#petraGoldFlow)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="path-animation" style="opacity: 0;" />
			</svg>
		</div>
		<div class="mt-4 text-center">
			<div class="text-[11px] uppercase tracking-[0.9em] text-zinc-400 mb-2 font-bold">{loadingText}</div>
			<div class="text-5xl font-extralight tracking-tighter text-zinc-900 mb-4 tabular-nums">{loadingPercent}%</div>
			<div class="w-72 h-[1px] mx-auto overflow-hidden bg-zinc-100">
				<div class="h-full bg-gold-gradient transition-all duration-75 ease-out" style="width: {loadingPercent}%"></div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.drop-shadow-gold) { filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.4)); }
	.bg-gold-gradient {
		background: linear-gradient(90deg, #DAA520, #FFD700, #FFFFFF, #FFD700, #DAA520);
		background-size: 200% 100%;
		animation: goldFlow 3s linear infinite;
	}
	@keyframes goldFlow {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}
</style>