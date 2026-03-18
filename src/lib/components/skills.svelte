<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { portfolioData, fetchPortfolioData } from '$lib/stores/portfolio';
	import { theme } from '$lib/state/theme.svelte';

	// --- Component State ---
	let isVisible = $state(false);
	let hoveredIndex = $state(-1);

	onMount(async () => {
		if (!$portfolioData) await fetchPortfolioData();
		setTimeout(() => {
			isVisible = true;
		}, 100);
	});

	const skillCategories = $derived($portfolioData?.skills ? Object.entries($portfolioData.skills) : []);

	const getLocalIconPath = (name: string) => {
		const fileName = name.toLowerCase().trim().replace(/\s+/g, '_');
		return `/img/skills/${fileName}.png`;
	};

	const handleImageError = (e: Event) => {
		const target = e.target as HTMLImageElement;
		target.style.display = 'none';
	};
</script>

<div class="cinema-wrapper" class:dark-mode-active={theme.isDark}>
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

	<div id="skillsContent" class:visible={isVisible}>
		<header class="header-container">
			<h2 class="skills-main-title">TECHNICAL_STACK</h2>
		</header>

		<div class="skills-grid-container">
			{#each skillCategories as [category, subCategories], i}
				<div 
					class="skill-category-card" 
					in:fly={{ y: 30, delay: 150 * i, duration: 800 }}
					onmouseenter={() => hoveredIndex = i}
					onmouseleave={() => hoveredIndex = -1}
				>
					<div class="card-accent-bar"></div>
					
					<div class="category-header">
						<span class="category-index">MOD_{i + 1}</span>
						<h3 class="category-name">{category}</h3>
					</div>

					<div class="sub-category-content">
						{#each Object.entries(subCategories) as [subName, items]}
							<div class="sub-group">
								<h4 class="sub-title">{subName}</h4>
								<div class="tags-container">
									{#each items as item}
										<span class="skill-tag">
											<span class="skill-icon-wrap">
												<img 
													src={getLocalIconPath(item)} 
													alt={item} 
													class="skill-local-img"
													onerror={handleImageError}
												/>
											</span>
											{item}
										</span>
									{/each}
								</div>
							</div>
						{/each}
					</div>
					
					<div class="card-glow" class:active={hoveredIndex === i}></div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.cinema-wrapper {
		position: fixed; inset: 0; width: 100%; height: 100vh; overflow: hidden;
		transition: background-color 0.7s ease;
	}

	#skillsContent {
		z-index: 25; position: relative; height: 100vh; width: 100%;
		display: flex; flex-direction: column; 
		align-items: center; 
		justify-content: flex-start;
		padding-top: 10vh;
		opacity: 0; transition: opacity 1s ease;
	}
	#skillsContent.visible { opacity: 1; }

	@media (min-width: 1024px) {
		#skillsContent { margin-left: 280px; width: calc(100% - 280px); }
	}

	.header-container { flex-shrink: 0; margin-bottom: 30px; z-index: 30; }

	.skills-main-title {
		font-family: 'Potra', sans-serif;
		font-size: clamp(1.8rem, 4vw, 3rem);
		background: linear-gradient(to bottom, #BF953F, #FCF6BA, #AA771C);
		-webkit-background-clip: text; background-clip: text;
		-webkit-text-fill-color: transparent; letter-spacing: 4px; text-align: center;
		margin: 0;
		filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.15));
	}

	/* --- SNAKE SCROLLER PRESERVED --- */
	.skills-grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr));
		gap: 25px;
		width: 90%;
		max-width: 1400px;
		height: 65vh; 
		overflow-y: auto;
		padding: 10px 30px 60px 20px;
		align-items: start;
		-webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
		mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
		scrollbar-width: thin;
		scrollbar-color: #BF953F transparent;
	}

	.skills-grid-container::-webkit-scrollbar { width: 2px; display: block; }
	.skills-grid-container::-webkit-scrollbar-track { background: rgba(191, 149, 63, 0.05); margin: 20px 0; border-radius: 10px; }
	.skills-grid-container::-webkit-scrollbar-thumb {
		background: linear-gradient(to bottom, transparent, #FCF6BA, #BF953F, #AA771C, transparent);
		background-size: 100% 300%;
		border-radius: 20px;
		box-shadow: 0 0 12px rgba(191, 149, 63, 0.6);
		animation: snakeSlither 4s ease-in-out infinite;
	}

	@keyframes snakeSlither {
		0%, 100% { background-position: 0% 0%; }
		50% { background-position: 0% 100%; box-shadow: -2px 0 15px rgba(252, 246, 186, 0.9); }
	}

	/* --- CATEGORY TITLE FONT CHANGE --- */
	.category-name {
		font-family: 'Exo 2', sans-serif; /* Changed to a bolder, cleaner font */
		font-weight: 800; /* Extra bold for visibility */
		text-transform: uppercase;
		letter-spacing: 1px;
		background: linear-gradient(to bottom, #FCF6BA, #BF953F);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		font-size: 1.1rem;
		margin: 5px 0 0 0;
		filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
	}

	/* REMAINING STYLES UNTOUCHED */
	.skill-category-card { background: rgba(191, 149, 63, 0.04); border: 1px solid rgba(191, 149, 63, 0.15); padding: 25px; position: relative; backdrop-filter: blur(8px); transition: all 0.4s ease; display: flex; flex-direction: column; }
	.skill-category-card:hover { border-color: #BF953F; background: rgba(191, 149, 63, 0.08); transform: translateY(-5px); }
	.card-accent-bar { position: absolute; top: 0; left: 0; width: 4px; height: 30px; background: #BF953F; }
	.category-header { margin-bottom: 15px; border-bottom: 1px solid rgba(191, 149, 63, 0.2); padding-bottom: 10px; }
	.category-index { font-family: 'Exo 2', sans-serif; color: #BF953F; font-size: 0.65rem; letter-spacing: 2px; font-weight: 900; }
	.sub-group { margin-bottom: 15px; }
	.sub-title { font-family: 'Exo 2', sans-serif; color: #AA771C; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 1px; margin-bottom: 8px; font-weight: 800; }
	.tags-container { display: flex; flex-wrap: wrap; gap: 8px; }
	.skill-tag { display: flex; align-items: center; gap: 8px; padding: 5px 12px; font-size: 0.75rem; font-family: 'Exo 2', sans-serif; border: 1px solid rgba(191, 149, 63, 0.2); color: #18181b; background: rgba(191, 149, 63, 0.02); transition: all 0.2s ease; }
	.skill-icon-wrap { display: flex; align-items: center; justify-content: center; width: 18px; height: 18px; overflow: hidden; }
	.skill-local-img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 1px rgba(191, 149, 63, 0.4)); }
	:global(.dark) .skill-tag { color: #f3f4f6; background: rgba(255, 255, 255, 0.03); }
	.skill-category-card:hover .skill-tag { border-color: rgba(191, 149, 63, 0.5); background: rgba(191, 149, 63, 0.08); }
	.card-glow { position: absolute; inset: 0; box-shadow: 0 0 30px rgba(191, 149, 63, 0); pointer-events: none; transition: box-shadow 0.4s ease; z-index: -1; }
	.card-glow.active { box-shadow: 0 0 25px rgba(191, 149, 63, 0.1); }
	#travelOverlay { position: fixed; top: 0; right: 0; width: 100%; height: 100%; z-index: 5; perspective: 800px; overflow: hidden; }
	.dive-container { position: absolute; width: 100%; height: 100%; transform-style: preserve-3d; }
	.process-wall { position: absolute; width: 450%; height: 2000px; left: -175%; background-image: url('/img/travel-wall.png'); background-size: 600px auto; background-repeat: repeat; animation: wallFlow 20s linear infinite; }
	.wall-top { top: -835px; transform: rotateX(90deg) translateZ(549px); }
	.wall-bottom { bottom: -920px; transform: rotateX(-90deg) translateZ(450px); animation-direction: reverse; }
	@keyframes wallFlow { from { background-position: 0 0; } to { background-position: 0 1200px; } }
</style>