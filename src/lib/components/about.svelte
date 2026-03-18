<script lang="ts">
	import { theme } from '$lib/state/theme.svelte';
	import { onMount } from 'svelte';

	let videoElement: HTMLVideoElement;
	let isPlaying = $state(false);
	let isMuted = $state(true);

	// Narrative data curated from your 6+ years of experience 
	const journey = [
		{ 
			year: '2020', 
			event: 'Sun Technologies', 
			detail: 'Built REST API automation and mastered compliance validation for mobile apps[cite: 49, 51, 52].' 
		},
		{ 
			year: '2021', 
			event: 'Infosys LTD', 
			detail: 'Led test strategies for INDIGO and built CI/CD pipelines on Azure[cite: 45, 47, 48].' 
		},
		{ 
			year: '2023', 
			event: 'DecisionNxt', 
			detail: 'Led QA teams to 100% regression coverage and optimized ETL run times[cite: 41, 44].' 
		},
		{ 
			year: 'PRESENT', 
			event: 'V2Soft PVT LTD', 
			detail: 'Redesigning architectures for 70% growth and validating vehicle cloud data[cite: 15, 40].' 
		}
	];

	function togglePlay() {
		if (videoElement.paused) {
			videoElement.play();
			isPlaying = true;
		} else {
			videoElement.pause();
			isPlaying = false;
		}
	}

	function toggleMute() {
		isMuted = !isMuted;
		videoElement.muted = isMuted;
	}
</script>

<div class="about-universe" class:dark={theme.isDark}>
	<div class="kinetic-bg">
		<span>SDET // DATA ENGINEER // FULL STACK // AI/ML TESTING</span>
	</div>

	<div class="scroll-wrapper">
		<section class="hero-section">
			<div class="video-frame">
				<div class="video-glitch-overlay"></div>
				
				<video 
					bind:this={videoElement}
					poster="/img/about-thumbnail.jpg" 
					loop 
					playsinline 
					class="intro-video"
				>
					<source src="/videos/about.mp4" type="video/mp4" />
				</video>

				<div class="video-controls">
					<button class="play-trigger" onclick={togglePlay} aria-label="Toggle Play">
						{#if !isPlaying}
							<div class="play-icon-large">
								<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
								<span class="play-text">PLAY BITE</span>
							</div>
						{:else}
							<div class="pause-indicator">
								<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
							</div>
						{/if}
					</button>

					<button class="mute-toggle" onclick={toggleMute}>
						{isMuted ? 'UNMUTE' : 'MUTE'}
					</button>
				</div>

				<div class="video-caption" class:fade-out={isPlaying}>
					<h1 class="glitch-text" data-text="ROOPESH S">ROOPESH S</h1>
					<p class="tagline">SDET // DATA ARCHITECT // AI QUALITY GUARDIAN</p>
				</div>
			</div>
		</section>

		<section class="persona-grid">
			<div class="bio-card">
				<h2 class="section-label">THE ARCHITECT</h2>
				<p class="bio-text">
					With over <strong>6 years of experience</strong>  in the forge of <strong>Test & Development</strong>, I don't just find bugs; 
					I architect reliability. My journey spans from <strong>Data Engineering</strong>  
					using PySpark and Databricks [cite: 29, 30] to validating the frontiers of <strong>LLM & RAG models</strong>[cite: 40].
				</p>
			</div>

			<div class="stats-box">
				<div class="stat-item">
					<span class="stat-val">6+</span>
					<span class="stat-lab">Years Exp </span>
				</div>
				<div class="stat-item">
					<span class="stat-val">70%</span>
					<span class="stat-lab">Perf Growth [cite: 40]</span>
				</div>
				<div class="stat-item">
					<span class="stat-val">5</span>
					<span class="stat-lab">Languages Spoken [cite: 92]</span>
				</div>
			</div>
		</section>

		<section class="journey-section">
			<h2 class="main-page-title">CREATIVE JOURNEY</h2>
			<div class="timeline-container">
				{#each journey as item}
					<div class="timeline-node">
						<div class="node-year">{item.year}</div>
						<div class="node-content">
							<h3>{item.event}</h3>
							<p>{item.detail}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<section class="interests-marquee">
			<div class="marquee-track">
				<span>POETRY [cite: 91] • CRICKET [cite: 85] • HIP-HOP [cite: 88] • HANDICRAFTS [cite: 90] • SWIMMING [cite: 87] • COUNSELLING [cite: 89]</span>
				<span>POETRY [cite: 91] • CRICKET [cite: 85] • HIP-HOP [cite: 88] • HANDICRAFTS [cite: 90] • SWIMMING [cite: 87] • COUNSELLING [cite: 89]</span>
			</div>
		</section>
        
        <div class="bottom-spacer"></div>
	</div>
</div>

<style>
	.about-universe {
		position: relative; width: 100%; min-height: 100vh;
		background: #ffffff; color: #222; overflow-x: hidden;
		transition: background 0.5s ease;
	}
	:global(.dark) .about-universe { background: #0a0a0a; color: #eee; }

	@media (min-width: 1024px) { .scroll-wrapper { margin-left: 260px; } }

	.kinetic-bg {
		position: fixed; top: 50%; left: 50%;
		transform: translate(-50%, -50%) rotate(-15deg);
		font-size: 15vw; font-weight: 900; opacity: 0.03;
		white-space: nowrap; pointer-events: none; z-index: 0;
	}

	/* Hero Video Section */
	.hero-section { height: 90vh; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; z-index: 10; }
	.video-frame {
		position: relative; width: 100%; max-width: 1200px; height: 70vh;
		border: 1px solid #BF953F; overflow: hidden; background: #000;
		box-shadow: 0 20px 50px rgba(0,0,0,0.3);
	}

	.intro-video { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.1); }
	.video-glitch-overlay { position: absolute; inset: 0; background: linear-gradient(rgba(191, 149, 63, 0.05) 50%, transparent 50%); background-size: 100% 4px; z-index: 2; pointer-events: none; }

	.video-controls { position: absolute; inset: 0; z-index: 20; display: flex; align-items: center; justify-content: center; }
	
	.play-trigger {
		background: none; border: none; cursor: pointer; color: #BF953F;
		transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	.play-trigger:hover { transform: scale(1.1); }

	.play-icon-large { display: flex; flex-direction: column; align-items: center; gap: 10px; }
	.play-icon-large svg { width: 100px; height: 100px; filter: drop-shadow(0 0 20px rgba(191, 149, 63, 0.8)); }
	.play-text { font-family: 'Potra'; letter-spacing: 5px; font-size: 1.2rem; }

	.pause-indicator { opacity: 0; transition: opacity 0.3s; color: #BF953F; }
	.video-frame:hover .pause-indicator { opacity: 0.8; }
	.pause-indicator svg { width: 60px; height: 60px; }

	.mute-toggle {
		position: absolute; top: 20px; right: 20px;
		background: rgba(0,0,0,0.5); border: 1px solid #BF953F;
		color: #BF953F; font-family: 'Potra'; padding: 5px 15px; font-size: 0.7rem; cursor: pointer;
	}

	.video-caption { position: absolute; bottom: 40px; left: 40px; z-index: 10; transition: opacity 0.5s; pointer-events: none; }
	.video-caption.fade-out { opacity: 0.2; }

	.glitch-text { font-family: 'Potra'; font-size: clamp(2.5rem, 6vw, 5rem); color: #fff; margin: 0; text-shadow: 2px 2px #BF953F; }
	.tagline { font-family: 'Exo 2'; color: #FCF6BA; letter-spacing: 4px; text-transform: uppercase; font-size: 0.85rem; }

	/* Persona Grid */
	.persona-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; padding: 5rem 10%; position: relative; z-index: 10; }
	.bio-text { font-family: 'Exo 2'; font-size: 1.3rem; line-height: 1.8; }
	.section-label { font-family: 'Potra'; color: #BF953F; font-size: 0.8rem; letter-spacing: 5px; margin-bottom: 20px; }
	.stats-box { display: flex; flex-direction: column; justify-content: center; gap: 30px; border-left: 1px solid rgba(191, 149, 63, 0.3); padding-left: 40px; }
	.stat-val { display: block; font-family: 'Potra'; font-size: 3rem; background: linear-gradient(to bottom, #BF953F, #FCF6BA); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
	.stat-lab { font-family: 'Exo 2'; text-transform: uppercase; font-size: 0.65rem; letter-spacing: 2px; }

	/* Timeline Journey */
	.journey-section { padding: 5rem 10%; background: rgba(191, 149, 63, 0.03); position: relative; z-index: 10; }
	.main-page-title { font-family: 'Potra'; font-size: 2.5rem; letter-spacing: 10px; background: linear-gradient(to bottom, #BF953F, #FCF6BA, #AA771C); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center; margin-bottom: 4rem; }
	.timeline-node { display: grid; grid-template-columns: 120px 1fr; padding: 35px 0; border-top: 1px solid rgba(191, 149, 63, 0.2); transition: background 0.3s; }
	.timeline-node:hover { background: rgba(191, 149, 63, 0.05); }
	.node-year { font-family: 'Potra'; font-size: 1.4rem; color: #BF953F; }
	.node-content h3 { margin: 0 0 10px 0; font-family: 'Exo 2'; text-transform: uppercase; letter-spacing: 2px; font-size: 1.1rem; }
	.node-content p { font-family: 'Exo 2'; color: #666; font-size: 0.95rem; line-height: 1.6; }
	:global(.dark) .node-content p { color: #bbb; }

	/* Interests Marquee */
	.interests-marquee { padding: 3rem 0; background: #BF953F; color: #000; transform: rotate(-1.5deg); width: 115%; margin-left: -7.5%; overflow: hidden; position: relative; z-index: 20; }
	.marquee-track { display: flex; white-space: nowrap; animation: marquee 40s linear infinite; }
	.marquee-track span { font-family: 'Potra'; font-size: 1.8rem; padding-right: 60px; font-weight: bold; }

	@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
	.bottom-spacer { height: 15vh; }

	@media (max-width: 1023px) {
		.persona-grid { grid-template-columns: 1fr; padding: 3rem 5%; }
		.hero-section { height: auto; padding: 4rem 1rem; }
		.video-frame { height: 45vh; }
		.play-icon-large svg { width: 70px; height: 70px; }
		.main-page-title { font-size: 1.8rem; }
		.timeline-node { grid-template-columns: 1fr; gap: 10px; }
	}
</style>