<script>
	import { onMount } from 'svelte';
	let { onComplete } = $props();

	let loadingPercent = $state(0);
	let loadingText = $state("LOADING SDET CORE");

	onMount(async () => {
		const { gsap } = await import('gsap');
		
		const path = document.querySelector('.path-animation');
		const pathLength = path.getTotalLength();

		gsap.set(path, { 
			strokeDasharray: pathLength, 
			strokeDashoffset: pathLength,
			opacity: 1
		});

		let tl = gsap.timeline({
			onComplete: () => {
				gsap.to(".loader-wrapper", {
					opacity: 0,
					duration: 0.8,
					delay: 0.5,
					ease: "power2.inOut",
					onComplete: () => onComplete()
				});
			}
		});

		tl.to({ val: 0 }, {
			val: 100,
			duration: 4,
			ease: "power1.inOut",
			onUpdate: function() {
				const currentVal = this.targets()[0].val;
				loadingPercent = Math.floor(currentVal);

				const progress = currentVal / 100;
				gsap.set(path, { strokeDashoffset: pathLength * (1 - progress) });
			}
		});

		gsap.fromTo(".loading-logo", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 });
	});
</script>

<div class="loader-wrapper fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden" style="transform: translateY(-2cm);">
	
	<div class="loading-logo mb-0">
		<img src="/img/logo.png" alt="Logo" class="w-60 h-70 object-contain" />
	</div>

	<div class="relative flex items-center justify-center w-full -mt-10"> 
		<svg 
			width="600" 
			height="160" 
			viewBox="0 20 200 60" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg" 
			class="w-[90vw] max-w-[1000px] drop-shadow-gold"
		>
			<defs>
				<linearGradient id="petraGoldFlow" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stop-color="#DAA520" />
					<stop offset="35%" stop-color="#FFD700" />
					<stop offset="50%" stop-color="#FFFFFF" />
					<stop offset="65%" stop-color="#FFD700" />
					<stop offset="100%" stop-color="#DAA520" />
					<animate attributeName="x1" from="-100%" to="100%" dur="3s" repeatCount="indefinite" />
					<animate attributeName="x2" from="0%" to="200%" dur="3s" repeatCount="indefinite" />
				</linearGradient>
			</defs>

			<path d="M50 25C20 25 20 75 50 75C80 75 120 25 150 25C180 25 180 75 150 75C120 75 80 25 50 25Z" 
				stroke="#F3F4F6" 
				stroke-width="2.5" 
				stroke-linecap="round" />

			<path d="M50 25C20 25 20 75 50 75C80 75 120 25 150 25C180 25 180 75 150 75C120 75 80 25 50 25Z" 
				stroke="url(#petraGoldFlow)" 
				stroke-width="2.5" 
				stroke-linecap="round"
				stroke-linejoin="round"
				class="path-animation"
				style="opacity: 0;" />
		</svg>
	</div>

	<div class="mt-4 text-center">
		<div class="text-[11px] uppercase tracking-[0.9em] text-zinc-400 mb-2 font-bold">
			{loadingText}
		</div>
		<div class="text-5xl font-extralight tracking-tighter text-zinc-900 mb-4 tabular-nums loading-percent">
			{loadingPercent}%
		</div>
		<div class="w-72 h-[1px] mx-auto overflow-hidden bg-zinc-100">
			<div class="h-full bg-gold-gradient transition-all duration-75 ease-out" style="width: {loadingPercent}%"></div>
		</div>
	</div>
</div>

<style>
	:global(.drop-shadow-gold) {
		filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.4));
	}

	.path-animation {
		transition: none;
	}

	.loading-percent {
		color: #111;
	}

	.bg-gold-gradient {
		/* Rich gold with a sharp white center shine */
		background: linear-gradient(90deg, #DAA520, #FFD700, #FFFFFF, #FFD700, #DAA520);
		background-size: 200% 100%;
		animation: goldFlow 3s linear infinite;
	}

	@keyframes goldFlow {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}
</style>