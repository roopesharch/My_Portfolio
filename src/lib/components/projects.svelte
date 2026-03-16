<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let showTravel = $state(true);
	let isVisible = $state(false);

	onMount(() => {
		setTimeout(() => {
			isVisible = true;
		}, 100);
	});
</script>

<div class="cinema-container {isVisible ? 'visible' : ''}">
	{#if showTravel}
		<div id="travelOverlay" in:fade={{ duration: 800 }}>
			<div class="dive-container">
				<div class="process-wall wall-top"></div>
				
				<div class="mid-void"></div>

				<div class="process-wall wall-bottom"></div>
			</div>
		</div>
	{/if}

	<div class="ui-content-area">
		<h2 class="scroll-text">  SCROLL PROJECTS</h2>
	</div>
</div>

<style>
	/* Main Container */
	.cinema-container {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100vh;
		opacity: 0;
		transition: opacity 1s ease;
		overflow: hidden;
		background: #ffffff; 
	}
	
	:global(.dark) .cinema-container {
		background: #000000;
	}

	.cinema-container.visible {
		opacity: 1;
	}

	/* The Travel Overlay */
	#travelOverlay {
		position: absolute;
		inset: 0;
		z-index: 1;
		perspective: 1000px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dive-container {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
	}

	/* The Moving Walls */
	.process-wall {
		position: absolute;
		width: 300%; /* Enough to cover screen during animation */
		left: -100%;
		background-image: url('/img/travel-wall.png');
		background-size: 350px auto; /* Bigger image → fewer repetitions */
		background-repeat: repeat;
		opacity: 1;
		image-rendering: auto; /* Smooth rendering, no sparkles */
	}

	/* Top and Bottom Wall Transforms */
	.wall-top {
		top: 0;
		height: 240px; /* Visual height of top wall */
		transform: rotateX(-80deg) translateZ(-50px); /* Slightly less extreme to remove shimmer */
		transform-origin: top;
		animation: wallFlow 10s linear infinite; /* Slower → smoother */
	}

	.wall-bottom {
		bottom: 0;
		height: 390px; /* Taller bottom wall */
		transform: rotateX(80deg) translateZ(-50px); /* Slightly less extreme */
		transform-origin: bottom;
		animation: wallFlow 5s linear infinite reverse;
	}

	/* UI Styling */
	.ui-content-area {
		position: absolute;
		inset: 0;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: right;
		padding-top: 60px;
		pointer-events: none;

	}

	/* --- UPDATED SCROLL TEXT --- */
	.scroll-text {

		/*transform: translateY(7vh); */
		font-family: 'Potra', sans-serif; /* Same as DRIVE INTO PORTFOLIO */
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.5rem;
		font-size: clamp(1.2rem, 4vw, 4.1rem);
		color: transparent;
		background: linear-gradient(to bottom, #8A6624, #BF953F, #FCF6BA, #D4AF37, #AA771C);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: electricSnake 3.5s linear infinite;
		text-align: center;
	}

	/* Wall Animation */

	@keyframes wallFlow {
	  from { background-position: 0 390px; }
	  to { background-position: 0 0; }
	}
</style>