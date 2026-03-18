<script lang="ts">
	import { onMount } from 'svelte';
	import { portfolioData, fetchPortfolioData } from '$lib/stores/portfolio';
	import { theme } from '$lib/state/theme.svelte';

	let container: HTMLDivElement;
	let activeIndex = $state(0);
	let isVisible = $state(false);

	onMount(async () => {
		if (!$portfolioData) await fetchPortfolioData();
		setTimeout(() => { isVisible = true; }, 100);

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					activeIndex = parseInt(entry.target.getAttribute('data-index') || '0');
				}
			});
		}, { 
			root: container,
			threshold: 0.6 
		});

		const items = document.querySelectorAll('.experience-block');
		items.forEach(item => observer.observe(item));
	});

	function scrollToSection(index: number) {
		const target = document.querySelector(`[data-index="${index}"]`);
		target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
</script>

<div class="exp-universe" class:dark={theme.isDark}>
	<div id="travelOverlay" style:background-color={theme.isDark ? '#000000' : '#ffffff'}>
		<div class="dive-container">
			<div class="process-wall wall-top"></div>
			<div class="process-wall wall-bottom"></div>
		</div>
	</div>

	<div id="uiLayer" class:visible={isVisible}>
		<div class="static-title-container">
			<h2 class="main-page-title">EXPERIENCE</h2>
		</div>

		<div class="content-clipping-window">
			<div bind:this={container} class="main-scroll-container">
				{#if $portfolioData?.experience}
					{#each $portfolioData.experience as exp, i}
						<section class="experience-block" data-index={i}>
							<div class="content-safety-zone">
								
								<div class="experience-header-bar">
									<div class="logo-wrapper">
										<div class="logo-box-minimal">
											<img src={exp.company_logo} alt={exp.company} class="company-logo" />
										</div>
									</div>
									<div class="identity-box">
										<h3 class="role-text">{exp.role}</h3>
										<p class="company-text">
											<span class="co-name">{exp.company}</span> 
											<span class="divider">//</span> 
											<span class="tenure-val">{exp.tenure}</span>
										</p>
									</div>
									<div class="exp-tag">
										EXP_{String(i + 1).padStart(2, '0')}
									</div>
								</div>

								<div class="experience-content-body">
									<div class="summary-line">
										<p>{exp.one_liner}</p>
									</div>

									<div class="responsibilities-list">
										{#each exp.responsibilities as task, j}
											<div class="task-entry">
												<div class="task-counter">
													<span class="current">{String(j + 1).padStart(2, '0')}</span>
													<span class="total">/{String(exp.responsibilities.length).padStart(2, '0')}</span>
												</div>
												<p class="task-text">{task}</p>
											</div>
										{/each}
									</div>
								</div>

							</div>
						</section>
					{/each}
				{/if}
				<div class="bottom-spacer"></div>
			</div>
		</div>

		<div class="numeric-nav">
			{#each $portfolioData?.experience || [] as _, i}
				<button 
					class="nav-item" 
					class:active={i === activeIndex}
					onclick={() => scrollToSection(i)}
				>
					<span class="num">{String(i + 1).padStart(2, '0')}</span>
					<div class="nav-line"></div>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.exp-universe {
		position: fixed; inset: 0;
		width: 100%; height: 100vh;
		overflow: hidden;
	}

	#uiLayer {
		position: relative; z-index: 30;
		height: 100vh; opacity: 0;
		transition: opacity 1s ease;
	}
	#uiLayer.visible { opacity: 1; }

	@media (min-width: 1024px) {
		#uiLayer { margin-left: 260px; width: calc(100% - 280px); }
	}

	/* Static Title - Now Sharp and Bold */
	.static-title-container {
		position: absolute; top: 7vh; width: 100%;
		display: flex; justify-content: center; z-index: 100;
		pointer-events: none;
	}
	.main-page-title {
		font-family: 'Potra'; font-size: 2.8rem; letter-spacing: 12px;
		background: linear-gradient(to bottom, #BF953F, #FCF6BA, #AA771C);
		-webkit-background-clip: text; -webkit-text-fill-color: transparent;
		filter: none;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 8px;
	}

	/* Clipping Window */
	.content-clipping-window {
		position: absolute;
		top: 15vh;
		bottom: 15vh;
		width: 100%;
		overflow: hidden;
		z-index: 40;
	}

	.main-scroll-container {
		height: 100%; overflow-y: auto;
		scroll-behavior: smooth;
		scrollbar-width: none;
		padding: 0 5%;
	}
	.main-scroll-container::-webkit-scrollbar { display: none; }

	.experience-block {
		min-height: 70vh; 
		display: flex; align-items: center; justify-content: center;
		padding: 10vh 0;
	}

	.content-safety-zone {
		width: 95%; max-width: 1100px;
		display: flex; flex-direction: column; gap: 35px;
	}

	/* Header Styling */
	.experience-header-bar {
		display: flex; align-items: center; gap: 30px;
		border-bottom: 1px solid rgba(191, 149, 63, 0.4);
		padding-bottom: 20px;
	}

	/* Minimal Logo Style (No border/box) */
	.logo-box-minimal {
		width: 70px; height: 70px; flex-shrink: 0;
		display: flex; align-items: center; justify-content: center;
		transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.company-logo { 
		max-width: 100%; max-height: 100%; object-fit: contain;
		filter: contrast(1.1) brightness(1.1); 
	}
	.logo-box-minimal:hover { transform: scale(1.3); filter: drop-shadow(0 0 10px rgba(191, 149, 63, 0.6)); }

	.identity-box { flex-grow: 1; }
	.role-text {
		font-family: 'Potra'; font-size: 2rem; margin: 0;
		background: linear-gradient(to right, #BF953F, #FCF6BA);
		-webkit-background-clip: text; -webkit-text-fill-color: transparent;
	}

	.co-name {
		font-family: 'Exo 2'; font-weight: 900; 
		color: #2c3e50; 
		text-transform: uppercase; letter-spacing: 3px; font-size: 1rem;
	}
	:global(.dark) .co-name { color: #ffbf00; }

	.divider { color: #BF953F; margin: 0 8px; }
	.tenure-val { font-family: 'Exo 2'; color: #666; font-size: 0.9rem; }
	:global(.dark) .tenure-val { color: #aaa; }

	.exp-tag {
		font-family: 'Potra'; color: #BF953F; font-size: 0.75rem;
		border: 1px solid #BF953F; padding: 4px 10px;
	}

	.summary-line {
		font-family: 'Exo 2'; font-style: italic; color: #555;
		margin-bottom: 25px; border-left: 4px solid #BF953F; padding-left: 20px;
	}
	:global(.dark) .summary-line { color: #bbb; }

	.responsibilities-list { display: flex; flex-direction: column; gap: 20px; }
	.task-entry { display: flex; gap: 25px; align-items: flex-start; }
	
	.task-counter {
		display: flex; align-items: baseline; font-family: 'Potra';
		width: 55px; flex-shrink: 0;
	}
	.task-counter .current { color: #BF953F; font-size: 1.1rem; }
	.task-counter .total { color: #888; font-size: 0.65rem; margin-left: 2px; }

	.task-text { font-family: 'Exo 2'; font-size: 1rem; line-height: 1.6; color: #222; }
	:global(.dark) .task-text { color: #eee; }

	/* Numeric Navigation */
	.numeric-nav {
		position: fixed; right: 8px; top: 50%; transform: translateY(-50%);
		display: flex; flex-direction: column; gap: 25px; z-index: 100;
	}
	.nav-item { background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; justify-content: flex-end; }
	.num { font-family: 'Potra'; color: #888; font-size: 0.9rem; }
	.nav-line { width: 12px; height: 1px; background: #888; transition: 0.4s; }

	.nav-item.active .num { color: #BF953F; transform: scale(1.4); }
	.nav-item.active .nav-line { width: 35px; background: #BF953F; height: 2px; }

	.bottom-spacer { height: 20vh; }

	/* Walls */
	#travelOverlay { position: fixed; inset: 0; z-index: 5; perspective: 1000px; }
	.dive-container { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; }
	.process-wall {
		position: absolute; width: 450%; height: 2000px; left: -175%;
		background-image: url('/img/travel-wall.png'); background-size: 600px auto;
		animation: wallFlow 22s linear infinite;
	}
	.wall-top { top: -750px; transform: rotateX(90deg) translateZ(550px); }
	.wall-bottom { bottom: -750px; transform: rotateX(-90deg) translateZ(550px); animation-direction: reverse; }

	@keyframes wallFlow { from { background-position: 0 0; } to { background-position: 0 1200px; } }

	@media (max-width: 1023px) {
		.main-page-title { font-size: 1.8rem; letter-spacing: 5px; }
		.numeric-nav { display: none; }
	}
</style>