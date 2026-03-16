<script>
	import { onMount, tick } from 'svelte';

	let { secondText = "DRIVE INTO PORTFOLIO", firstText = "W E L C O M E" } = $props();
	let titleElement = $state(null);
	let showArrow = $state(false);
	const glitchChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/%=<>!&|^~?.";

	let isFirstVisit = true; // default

	function renderText(text, isFirstRun) {
		if (!titleElement) return;
		titleElement.innerHTML = '';
		const chars = [...text];

		chars.forEach((char, i) => {
			const span = document.createElement('span');
			span.innerText = char === ' ' ? '\u00A0' : char;
			span.className = "inline-block opacity-0 transition-all duration-300 mx-[0.02em] glitch-phase";
			titleElement.appendChild(span);

			if (char !== ' ') {
				let count = 0;
				const flicker = setInterval(() => {
					span.innerText = glitchChars[Math.floor(Math.random() * glitchChars.length)];
					span.style.opacity = "1";

					if (count >= 10 + i) {
						clearInterval(flicker);
						span.innerText = char;
						span.classList.remove('glitch-phase');
						span.classList.add('active-shimmer');

						if (i === chars.length - 1 && isFirstRun) {
							setTimeout(eraseAndSwap, 1200);
						} else if (i === chars.length - 1 && !isFirstRun) {
							setTimeout(() => { showArrow = true; }, 600);
						}
					}
					count++;
				}, 30);
			} else {
				span.style.opacity = "1";
			}
		});
	}

	function eraseAndSwap() {
		if (!titleElement) return;
		const spans = titleElement.querySelectorAll('span');

		spans.forEach((span, i) => {
			setTimeout(() => {
				span.style.transition = "all 0.4s ease";
				span.style.opacity = "0";
				span.style.transform = "scale(0.8) translateY(-10px)";
				span.style.filter = "blur(12px)";
			}, i * 20);
		});

		setTimeout(() => {
			renderText(secondText, false);
		}, (spans.length * 20) + 400);
	}

	onMount(async () => {
		await tick();
		if (typeof window !== 'undefined') {
			// Check session storage to see if user has visited before
			isFirstVisit = !sessionStorage.getItem('homeVisited');

			if (isFirstVisit) {
				sessionStorage.setItem('homeVisited', 'true');
				renderText(firstText, true); // show WELCOME animation
			} else {
				renderText(secondText, false); // directly show DRIVE INTO PORTFOLIO
			}
		}
	});
</script>

<div class="flex flex-col items-center justify-center min-h-[300px] relative z-20">
	<h1 bind:this={titleElement} class="title-font">
		<span class="sr-only">{firstText} {secondText}</span>
	</h1>

	{#if showArrow}
		<div class="mt-16 transition-all duration-1000 animate-bounce">
			<span class="text-4xl shimmer-text font-black cursor-default">▼</span>
		</div>
	{/if}
</div>

<style>
	/* Importing the specific fonts from your file */
	@import url('https://fonts.cdnfonts.com/css/potra');
	@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@800;900&display=swap');

	/* --- BASE STYLE --- */
	.title-font {
		font-weight: 900;
		text-transform: uppercase;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		line-height: 1.4;
		min-height: 1.5em;
		
		/* Applied POTRA font here */
		font-family: 'Potra', sans-serif;
		font-size: clamp(1.5rem, 6vw, 4.5rem);
		letter-spacing: 0.5rem;
	}

	/* --- DARK MODE DESIGN OVERRIDE --- */
	:global(.dark) .title-font {
		font-family: 'Potra', sans-serif; 
		letter-spacing: 0.8rem; 
	}

	/* --- GLITCH ARTIFACTS --- */
	:global(.glitch-phase) {
		color: #000000;
		filter: brightness(0.2) contrast(2);
		font-family: 'Exo 2', sans-serif; /* Glitch chars look better in Exo 2 */
	}

	:global(.dark .glitch-phase) {
		color: #ffffff;
		filter: brightness(0.8) contrast(1.5);
	}

	/* --- FINAL GOLD REVEAL --- */
	:global(.active-shimmer), .shimmer-text {
		background: linear-gradient(to bottom, #8A6624, #BF953F, #FCF6BA, #D4AF37, #AA771C);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: electricSnake 3.5s linear infinite;
	}

	@keyframes electricSnake {
		0%, 100% { filter: drop-shadow(0 0 2px rgba(252, 246, 186, 0.4)); }
		50% { filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.7)); }
	}
</style>