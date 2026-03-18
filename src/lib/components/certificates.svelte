<script lang="ts">
	import { onMount } from 'svelte';
	import { portfolioData, fetchPortfolioData } from '$lib/stores/portfolio';
	import { theme } from '$lib/state/theme.svelte';
	import { fade, fly, scale } from 'svelte/transition';

	let isVisible = $state(false);
	let activeIndex = $state(0);
	let isExpanded = $state(false);
	let isLoading = $state(true); // Track loading state for the preview

	onMount(async () => {
		if (!$portfolioData) await fetchPortfolioData();
		setTimeout(() => { isVisible = true; }, 100);
	});

	const setActive = (index: number) => {
		if (activeIndex !== index) {
			isLoading = true; // Reset loading when switching
			activeIndex = index;
		}
	};

	const toggleExpand = (e?: Event) => {
		if (e) e.stopPropagation();
		isExpanded = !isExpanded;
	};

	const isPDF = (url: string) => url?.toLowerCase().endsWith('.pdf');
</script>

{#if isExpanded && $portfolioData?.certifications[activeIndex]}
	<div 
		class="modal-overlay" 
		class:dark={theme.isDark}
		transition:fade={{ duration: 200 }}
		onclick={toggleExpand}
	>
		<div class="modal-content" transition:scale={{start: 0.9, duration: 300}} onclick={(e) => e.stopPropagation()}>
			{#if isPDF($portfolioData.certifications[activeIndex].image)}
				<iframe 
					src={$portfolioData.certifications[activeIndex].image} 
					title="Fullscreen PDF" 
					class="modal-frame"
				></iframe>
			{:else}
				<img src={$portfolioData.certifications[activeIndex].image} alt="Fullscreen" class="modal-img" />
			{/if}

			<button class="close-modal-bottom" onclick={toggleExpand}>
				<span>CLOSE [X]</span>
			</button>
		</div>
	</div>
{/if}

<div class="cert-universe" class:dark={theme.isDark}>
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

	<div id="uiLayer" class:visible={isVisible}>
		<div class="master-container">
			<header class="page-header">
				<h2 class="main-page-title">CERTIFICATIONS</h2>
			</header>

			<div class="gallery-wrapper">
				<div class="gallery-layout">
					
					<div class="preview-column">
						{#if $portfolioData?.certifications}
							{#key activeIndex} 
								<div class="projector-canvas" in:fly={{ y: 10, duration: 400 }} out:fade={{ duration: 100 }}>
									<div class="canvas-header">
										<span class="data-tag">REF_{activeIndex + 1}</span>
										<button class="expand-trigger" onclick={toggleExpand}>
											FULL_VIEW [+]
										</button>
									</div>
									
									<div class="document-display" onclick={toggleExpand}>
										{#if isLoading}
											<div class="loader-container" out:fade>
												<div class="scan-line"></div>
												<span class="loading-text">INITIALIZING_DATA...</span>
											</div>
										{/if}

										{#if $portfolioData.certifications[activeIndex].image}
											{#if isPDF($portfolioData.certifications[activeIndex].image)}
												<iframe 
													src="{$portfolioData.certifications[activeIndex].image}#toolbar=0&navpanes=0&scrollbar=0" 
													title="Cert Preview"
													class="pdf-frame-preview"
													onload={() => isLoading = false}
												></iframe>
											{:else}
												<img 
													src={$portfolioData.certifications[activeIndex].image} 
													alt={$portfolioData.certifications[activeIndex].name} 
													class="full-cert-img" 
													onload={() => isLoading = false}
												/>
											{/if}
										{/if}
									</div>

									<div class="canvas-footer">
										<div class="footer-gold-wrap">
											<span class="cert-year-badge">
												ISSUED <span class="year-highlight">{$portfolioData.certifications[activeIndex].year}</span>
											</span>
											<a href={$portfolioData.certifications[activeIndex].link} target="_blank" class="action-btn-styled">
												VERIFY_SOURCE <span class="arrow">→</span>
											</a>
										</div>
									</div>
								</div>
							{/key}
						{/if}
					</div>

					<div class="list-column">
						<div class="list-meta">
							<span>INDEX</span>
							<span>PATH</span>
						</div>
						<div class="cert-scroll-area">
							{#if $portfolioData?.certifications}
								{#each $portfolioData.certifications as cert, i}
									<button 
										class="cert-strip" 
										class:active={activeIndex === i}
										onmouseenter={() => setActive(i)}
									>
										<div class="strip-index">{String(i + 1).padStart(2, '0')}</div>
										<div class="strip-info">
											<span class="strip-provider">{cert.provider}</span>
											<h3 class="strip-name">{cert.name}</h3>
										</div>
									</button>
								{/each}
							{/if}
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.cert-universe { position: fixed; inset: 0; width: 100%; height: 100vh; overflow: hidden; }

	/* --- WALL ANIMATION --- */
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
		opacity: 0.8;
	}
	.wall-top { top: -834px; transform: rotateX(90deg) translateZ(549px); }
	.wall-bottom { 
		bottom: -930px; 
		transform: rotateX(-90deg) translateZ(450px); 
		animation-direction: reverse, normal;
	}
	@keyframes wallFlow { from { background-position: 0 0; } to { background-position: 0 1200px; } }
	@keyframes wallEntrance { 0% { opacity: 0; } 100% { opacity: 1; } }

	/* --- UI LAYOUT --- */
	#uiLayer { position: relative; z-index: 30; height: 100vh; opacity: 0; transition: opacity 1s; }
	#uiLayer.visible { opacity: 1; }

	@media (min-width: 1024px) {
		.master-container { margin-left: 280px; width: calc(100% - 280px); }
	}

	.master-container {
		height: 100vh; display: flex; flex-direction: column;
		padding: 2vh 5% 5vh 5%; 
	}

	.page-header { flex-shrink: 0; text-align: center; margin-top: 5vh; }
	.main-page-title {
		font-family: 'Potra'; font-size: 2.2rem; letter-spacing: 12px;
		background: linear-gradient(to bottom, #BF953F, #FCF6BA, #AA771C);
		-webkit-background-clip: text; -webkit-text-fill-color: transparent;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 8px;
	}

	.gallery-wrapper {
		flex-grow: 1; display: flex; align-items: center;
		justify-content: center; min-height: 0; padding-bottom: 5vh;
	}

	.gallery-layout {
		display: grid; grid-template-columns: 1.3fr 1fr;
		width: 100%; max-width: 1300px; gap: 50px; align-items: center;
	}

	.projector-canvas { width: 100%; max-width: 550px; display: flex; flex-direction: column; gap: 15px; }
	.canvas-header { display: flex; justify-content: space-between; font-family: 'Potra'; font-size: 0.6rem; color: #BF953F; }
	.expand-trigger { background: none; border: none; color: #BF953F; cursor: pointer; font-family: 'Potra'; transition: 0.3s; }
	
	.document-display {
		aspect-ratio: 1.4/1; background: transparent;
		border: 1px solid rgba(191, 149, 63, 0.5);
		position: relative; overflow: hidden; cursor: zoom-in;
		box-shadow: 0 0 20px rgba(191, 149, 63, 0.1);
	}

	.loader-container {
		position: absolute; inset: 0; display: flex; flex-direction: column;
		align-items: center; justify-content: center; background: #000; z-index: 10;
	}
	.scan-line {
		width: 80%; height: 2px; background: #BF953F;
		box-shadow: 0 0 15px #BF953F; animation: scan 2s ease-in-out infinite;
	}
	.loading-text {
		margin-top: 20px; font-family: 'Potra'; font-size: 0.6rem;
		color: #BF953F; letter-spacing: 3px; animation: pulse 1.5s infinite;
	}
	@keyframes scan { 
		0%, 100% { transform: translateY(-40px); opacity: 0; }
		50% { transform: translateY(40px); opacity: 1; }
	}
	@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

	.pdf-frame-preview { width: 100%; height: 100%; border: none; pointer-events: none; background: white; }
	
	/* FIXED: Locked positioning to prevent jumping */
	.full-cert-img { 
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 95%; 
		height: 95%; 
		object-fit: contain; 
		z-index: 3;
	}
	
	.canvas-footer { width: 100%; margin-top: 10px; }
	
	.footer-gold-wrap {
		display: flex; justify-content: space-between; align-items: center;
		padding: 10px 5px; 
		background: transparent;
		border-top: 1px solid rgba(191, 149, 63, 0.3);
	}

	.cert-year-badge { 
		font-family: 'Potra'; color: #BF953F; font-size: 0.75rem; 
		letter-spacing: 2px;
	}
	.year-highlight { color: #FCF6BA; font-weight: bold; text-shadow: 0 0 8px rgba(191, 149, 63, 0.4); }

	.action-btn-styled { 
		text-decoration: none; color: #BF953F; font-family: 'Potra'; 
		font-size: 0.75rem; letter-spacing: 1px; transition: 0.3s; 
		display: flex; align-items: center; gap: 8px; 
	}
	.action-btn-styled:hover { color: #fff; text-shadow: 0 0 10px #BF953F; }

	.list-column { display: flex; flex-direction: column; height: 55vh; min-height: 0; }
	.list-meta { display: flex; justify-content: space-between; font-family: 'Potra'; font-size: 0.55rem; color: #666; margin-bottom: 10px; padding: 0 15px; }
	.cert-scroll-area { overflow-y: auto; flex-grow: 1; scrollbar-width: none; display: flex; flex-direction: column; gap: 5px; }
	.cert-scroll-area::-webkit-scrollbar { display: none; }

	.cert-strip {
		background: rgba(255, 255, 255, 0.01); border: none;
		display: flex; align-items: center; gap: 20px; padding: 15px;
		cursor: pointer; text-align: left; transition: 0.3s;
	}
	:global(.dark) .cert-strip { background: rgba(0,0,0,0.2); }
	.cert-strip.active { background: rgba(191, 149, 63, 0.08); }
	.strip-name { font-family: 'Exo 2'; font-weight: 700; font-size: 0.9rem; color: #2c3e50; }
	:global(.dark) .strip-name { color: #fff; }
	.cert-strip.active .strip-name { color: #BF953F; }

	/* --- MODAL --- */
	.modal-overlay {
		position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
		z-index: 99999; background: rgba(255, 255, 255, 0.96);
		display: flex; align-items: center; justify-content: center;
		margin: 0 !important; padding-left: 280px; box-sizing: border-box;
		backdrop-filter: blur(10px);
	}
	.modal-overlay.dark { background: rgba(0, 0, 0, 0.96); }
	.modal-content { width: 80%; height: 75vh; position: relative; display: flex; flex-direction: column; align-items: center; }
	.close-modal-bottom { margin-top: 25px; background: rgba(191, 149, 63, 0.1); border: 1px solid #BF953F; color: #BF953F; font-family: 'Potra'; cursor: pointer; padding: 10px 25px; font-size: 0.8rem; letter-spacing: 4px; transition: 0.3s; border-radius: 2px; }
	.close-modal-bottom:hover { background: #BF953F; color: #000; box-shadow: 0 0 15px #BF953F; }
	.modal-img { width: 100%; height: 100%; object-fit: contain; }
	.modal-frame { width: 100%; height: 100%; border: none; background: white; border-radius: 4px; }

	@media (max-width: 1023px) {
		.gallery-layout { grid-template-columns: 1fr; }
		.preview-column { display: none; }
		.master-container { margin-left: 0; width: 100%; }
		.modal-overlay { padding-left: 0; }
		.modal-content { width: 95vw; }
	}
</style>