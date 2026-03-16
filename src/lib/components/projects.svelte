<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { portfolioData, fetchPortfolioData } from '$lib/stores/portfolio';
	import { theme } from '$lib/state/theme.svelte'; 

	// --- Props ---
	let { menuOpen = false } = $props();

	// --- Component State ---
	let viewport: HTMLDivElement;
	let activeIndex = $state(0);
	let isVisible = $state(false);

	onMount(async () => {
		if (!$portfolioData) await fetchPortfolioData();
		
		setTimeout(() => {
			isVisible = true;
			updateDots();
		}, 100);
	});

	function updateDots() {
		if (!viewport) return;
		const rowHeight = viewport.offsetHeight;
		activeIndex = Math.round(viewport.scrollTop / rowHeight);
	}

	function scrollBy(direction: number) {
		if (!viewport) return;
		viewport.scrollBy({ top: viewport.offsetHeight * direction, behavior: 'smooth' });
	}

	function scrollToItem(index: number) {
		const target = viewport.children[index] as HTMLElement;
		target?.scrollIntoView({ behavior: 'smooth' });
	}

	const getParts = (title: string) => {
		const parts = title.split(':');
		return {
			main: parts[0].trim(),
			sub: parts[1] ? parts[1].trim() : ""
		};
	};
</script>

<div class="cinema-wrapper" class:dark-mode-active={theme.isDark} class:menu-open={menuOpen}>
	
	<div 
		id="travelOverlay" 
		style:background-color={theme.isDark ? '#000000' : '#ffffff'} 
		in:fade={{ duration: 700 }}
	>
		<div class="dive-container">
			<div class="process-wall wall-top"></div>
			<div class="process-wall wall-bottom"></div>
		</div>
	</div>

	<div id="projectsContent" class:visible={isVisible}>
		<h2 class="project-main-title">PROJECTS</h2>

		<div 
			bind:this={viewport} 
			class="project-scroll-viewport" 
			onscroll={updateDots}
		>
			{#if $portfolioData?.projects}
				{#each $portfolioData.projects as proj, i}
					{@const titles = getParts(proj.title)}
					<div class="project-row-item">
						<div class="project-display-card image-card">
							<div class="corner-border top-left"></div>
							<div class="corner-border bottom-right"></div>
							<div class="inner-image-wrap">
								<img 
									src={proj.image || `https://via.placeholder.com/600x400/000/BF953F?text=${titles.main}`} 
									alt={titles.main} 
									onerror={(e) => (e.currentTarget.src = 'https://via.placeholder.com/600x400/000/BF953F?text=Image+Missing')}
								/>
							</div>
						</div>

						<div class="project-display-card text-card">
							<div class="title-group">
								<h3 class="card-title">{titles.main}</h3>
								<p class="project-one-liner">{titles.sub || proj.tags?.slice(0, 3).join(' | ')}</p>
							</div>
							<p class="project-desc">{proj.description}</p>
							<div class="project-meta">
								<span class="project-date">{proj.date}</span>
								<a href={proj.link} target="_blank" class="project-link">VIEW SOURCE</a>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>

		{#if $portfolioData?.projects && $portfolioData.projects.length > 0}
			<div class="project-nav-rail">
				<button class="nav-arrow-btn" onclick={() => scrollBy(-1)} aria-label="Scroll Up">▲</button>
				<div class="dot-nav-container">
					{#each $portfolioData.projects as _, i}
						<button 
							class="nav-dot" 
							class:active={i === activeIndex} 
							onclick={() => scrollToItem(i)}
						></button>
					{/each}
				</div>
				<button class="nav-arrow-btn" onclick={() => scrollBy(1)} aria-label="Scroll Down">▼</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.cinema-wrapper {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		transition: background-color 0.7s ease;
		background-color: transparent; 
	}

	#projectsContent { 
		z-index: 25; 
		position: relative; 
		height: 100vh; 
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-top: 8vh;
		opacity: 0;
		/* Transition for moving the whole content block */
		transition: opacity 1s ease, margin-left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}
	#projectsContent.visible { opacity: 1; }

	/* SHIFT LOGIC: This ensures the content is pushed away from the sidebar */
	@media (min-width: 1024px) {
		#projectsContent {
			/* This pushes the container to the right of your sidebar */
			margin-left: 280px; 
			width: calc(100% - 280px);
		}
	}

	.project-main-title {
		font-family: 'Potra', sans-serif;
		font-size: 3.2rem;
		background: linear-gradient(to bottom, #BF953F, #FCF6BA, #AA771C);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		z-index: 30;
		animation: vibrateFlow 2s linear infinite;
		margin-bottom: 20px;
	}

	.project-scroll-viewport {
		width: 100%;
		height: 60vh;
		overflow-y: auto;
		scroll-snap-type: y mandatory;
		scrollbar-width: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		scroll-behavior: smooth;
		position: relative;
		z-index: 40; 
	}
	.project-scroll-viewport::-webkit-scrollbar { display: none; }

	.project-row-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90%;
		max-width: 1100px; 
		height: 60vh;
		gap: 40px;
		scroll-snap-align: center;
		flex-shrink: 0;
	}

	.image-card { flex: 1.2; position: relative; }
	.inner-image-wrap {
		width: 100%; height: 320px;
		border: 1px solid rgba(191, 149, 63, 0.2);
		position: relative; background: #000;
	}
	.inner-image-wrap img { width: 100%; height: 100%; object-fit: cover; }

	.corner-border {
		position: absolute; width: 35px; height: 35px;
		border: 3px solid #BF953F; z-index: 10;
	}
	.top-left { top: -4px; left: -4px; border-right: none; border-bottom: none; }
	.bottom-right { bottom: -4px; right: -4px; border-left: none; border-top: none; }

	.text-card { flex: 1; text-align: left; }
	.card-title {
		font-family: 'Potra', sans-serif;
		background: linear-gradient(to bottom, #FCF6BA 0%, #BF953F 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		font-size: 2.8rem; font-weight: bold; letter-spacing: 1px; margin: 0;
	}
	.project-one-liner {
		font-family: 'Exo 2', sans-serif;
		color: #AA771C; font-weight: 800; text-transform: uppercase;
		letter-spacing: 3px; font-size: 0.85rem;
	}
	
	.project-desc {
		color: #18181b; 
		font-family: 'Exo 2', sans-serif;
		line-height: 1.5; margin: 12px 0; font-size: 1rem;
		transition: color 0.7s ease;
	}
	
	:global(.dark) .project-desc { color: #ffffff; }

	.project-meta {
		display: flex; gap: 25px; border-top: 1px solid rgba(191, 149, 63, 0.2);
		padding-top: 12px;
	}
	.project-date, .project-link {
		color: #BF953F; font-family: 'Potra', sans-serif;
		font-size: 0.75rem; text-decoration: none; font-weight: bold;
	}

	.project-nav-rail {
		position: absolute; right: 25px; top: 50%;
		transform: translateY(-50%); display: flex;
		flex-direction: column; align-items: center;
		gap: 15px; z-index: 100;
	}

	.nav-arrow-btn {
		background: none; border: none; font-size: 1.5rem;
		cursor: pointer; transition: all 0.3s ease;
		background: linear-gradient(to bottom, #FCF6BA, #BF953F);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.dot-nav-container {
		display: flex; flex-direction: column; align-items: center;
		justify-content: center; gap: 20px; padding: 10px 0; min-height: 100px; 
	}

	.nav-dot {
		width: 8px; height: 8px; border-radius: 50%;
		background: #BF953F; box-shadow: 0 0 6px rgba(191, 149, 63, 0.4);
		cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		border: 1px solid rgba(252, 246, 186, 0.2); flex-shrink: 0; padding: 0;
	}

	.nav-dot.active {
		width: 16px; height: 16px;
		background: radial-gradient(circle at center, #FFF9C4 0%, #FCF6BA 40%, #BF953F 100%);
		box-shadow: 0 0 15px rgba(252, 246, 186, 1), 0 0 30px rgba(191, 149, 63, 0.6);
		border: 1px solid #FCF6BA;
	}

	#travelOverlay {
		position: fixed; top: 0; right: 0; width: 100%; height: 100%;
		z-index: 5; perspective: 800px; overflow: hidden;
		transition: background-color 0.7s ease;
	}
	.dive-container { position: absolute; width: 100%; height: 100%; transform-style: preserve-3d; }
	
	.process-wall {
		position: absolute; width: 450%; height: 2000px; left: -175%; 
		background-image: url('/img/travel-wall.png'); 
		background-size: 600px auto; background-repeat: repeat;
		animation: wallFlow 15s linear infinite, wallEntrance 2s ease-out forwards;
	}
	.wall-top { top: -750px; transform: rotateX(90deg) translateZ(549px); }
	.wall-bottom { 
		bottom: -750px; 
		transform: rotateX(-90deg) translateZ(450px); 
		animation-direction: reverse, normal;
	}

	@keyframes wallFlow { from { background-position: 0 0; } to { background-position: 0 1200px; } }
	@keyframes wallEntrance { 0% { opacity: 0; } 100% { opacity: 1; } }
	@keyframes vibrateFlow { 0% { background-position: 0% 0%; } 100% { background-position: 0% 200%; } }

	@media (max-width: 1023px) {
		#projectsContent { margin-left: 0; width: 100%; }
		.project-row-item { flex-direction: column; gap: 20px; height: auto; padding: 100px 0; }
		.text-card { text-align: center; }
		.project-meta { justify-content: center; }
		.project-main-title { font-size: 2rem; }
	}
</style>