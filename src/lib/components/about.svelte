<script lang="ts">
	import { onMount } from 'svelte';
	import { portfolioData, fetchPortfolioData } from '$lib/stores/portfolio';
	import { theme } from '$lib/state/theme.svelte';

	let isVisible = $state(false);
	let isVideoOpen = $state(false);
	let videoElement: HTMLVideoElement | null = $state(null);

	onMount(async () => {
		if (!$portfolioData) await fetchPortfolioData();
		setTimeout(() => { isVisible = true; }, 100);
	});

	const about = $derived($portfolioData?.about);
	const contact = $derived($portfolioData?.contact);

	function toggleVideo() {
		isVideoOpen = !isVideoOpen;
		if (!isVideoOpen && videoElement) videoElement.pause();
	}
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;500;800;900&display=swap" rel="stylesheet">
	<style>
		/* Global scroll restoration */
		html, body {
			overflow-y: auto !important;
			height: auto !important;
			margin: 0;
			padding: 0;
		}
	</style>
</svelte:head>

<div class="about-page-container" class:dark={theme.isDark}>
	{#if about}
		<div id="mainContent" class:visible={isVisible}>
			
			<header class="hero-section">
				<span class="eyebrow">STRATEGIC QUALITY LEADERSHIP</span>
				<h1 class="glaze-text">{about.name}</h1>
				<div class="role-row">
					{#each about.roles as role}
						<span class="tag">{role}</span>
					{/each}
				</div>
			</header>

			<div class="bento-layout">
				
				<section class="card bio-card">
					<div class="card-header">
						<i class="fa-solid fa-quote-left"></i>
						<span>EXECUTIVE SUMMARY</span>
					</div>
					<p class="mission-statement">{about.objective}</p>
					</section>

				<section class="card video-card" onclick={toggleVideo}>
					<div class="video-thumb">
						<img src={about.thumbnail} alt="Intro Video" />
						<div class="play-overlay">
							<div class="play-ring"><i class="fa-solid fa-play"></i></div>
							<span class="play-text">WATCH INTRO</span>
						</div>
					</div>
				</section>

				{#each about.sections as section}
					<section class="card philosophy-card">
						<div class="card-header">
							<i class="fa-solid fa-microchip"></i>
							<span>{section.label}</span>
						</div>
						<h3>{section.title}</h3>
						<p>{section.content}</p>
					</section>
				{/each}

				<section class="card stats-card">
					{#each about.stats as stat}
						<div class="stat-item">
							<span class="number">{stat.val}</span>
							<span class="label">{stat.label}</span>
						</div>
					{/each}
				</section>

			</div>

			<div class="footer-marquee">
				<div class="marquee-inner">
					{#each [...about.marquee, ...about.marquee] as text}
						<span class="m-text">{text}</span>
						<span class="m-sep">✦</span>
					{/each}
				</div>
			</div>

		</div>
	{/if}

	{#if isVideoOpen}
		<div class="video-modal" onclick={toggleVideo}>
			<div class="modal-box" onclick={e => e.stopPropagation()}>
				<button class="close-btn" onclick={toggleVideo}><i class="fa-solid fa-xmark"></i></button>
				<video bind:this={videoElement} src={about?.video_url} controls autoplay></video>
			</div>
		</div>
	{/if}
</div>

<style>
	.about-page-container {
		--purple: #4B0082;
		--gold: #D4AF37;
		--bg: #ffffff;
		--text: #333;
		--card-bg: #f9f9f9;
		--border: rgba(0, 0, 0, 0.05);

		width: 100%;
		min-height: 100vh;
		background: var(--bg);
		color: var(--text);
		font-family: 'Exo 2', sans-serif;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		transition: background 0.3s ease;
	}

	:global(.dark) .about-page-container {
		--bg: #0a0a0a;
		--text: #e0e0e0;
		--card-bg: #111111;
		--border: rgba(212, 175, 55, 0.1);
	}

	#mainContent {
		flex: 1;
		width: 100%;
		padding: 60px 20px 100px 10px; 
		box-sizing: border-box;
		opacity: 0;
		transform: translateY(20px);
		transition: 1s cubic-bezier(0.19, 1, 0.22, 1);
	}
	#mainContent.visible { opacity: 1; transform: translateY(0); }

	.hero-section { margin-bottom: 50px; }
	.eyebrow { font-weight: 800; font-size: 0.75rem; color: var(--purple); letter-spacing: 4px; display: block; margin-bottom: 8px; }
	:global(.dark) .eyebrow { color: var(--gold); }
	
	.glaze-text { 
		font-size: clamp(2.5rem, 8vw, 6.5rem); 
		font-weight: 900; 
		margin: 0; 
		line-height: 1.1;
		background: linear-gradient(90deg, var(--purple), var(--gold));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.role-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
	.tag { padding: 8px 18px; border: 1px solid var(--border); border-radius: 50px; font-size: 0.7rem; font-weight: 800; color: var(--purple); text-transform: uppercase; }
	:global(.dark) .tag { color: var(--gold); }

	.bento-layout {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: minmax(180px, auto);
		gap: 25px;
		width: 100%;
	}

	.card {
		background: var(--card-bg);
		border: 1px solid var(--border);
		border-radius: 28px;
		padding: 35px;
		transition: 0.3s ease;
	}
	.card:hover { border-color: var(--gold); transform: translateY(-5px); }

	.card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; font-weight: 900; font-size: 0.65rem; color: var(--purple); letter-spacing: 1px; }
	:global(.dark) .card-header { color: var(--gold); }

	.bio-card { grid-column: span 2; grid-row: span 2; display: flex; flex-direction: column; justify-content: center; }
	.mission-statement { font-size: clamp(1.1rem, 2.2vw, 1.8rem); line-height: 1.4; font-weight: 500; }

	.video-card { padding: 0; cursor: pointer; overflow: hidden; position: relative; }
	.video-thumb { width: 100%; height: 100%; }
	.video-thumb img { width: 100%; height: 100%; object-fit: cover; }
	.play-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; }
	.play-ring { width: 55px; height: 55px; border: 2px solid #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }

	.philosophy-card h3 { font-size: 1.3rem; margin-bottom: 12px; font-weight: 800; color: var(--purple); }
	:global(.dark) .philosophy-card h3 { color: var(--gold); }
	.philosophy-card p { font-size: 0.9rem; line-height: 1.6; opacity: 0.8; }

	.stats-card { display: flex; flex-direction: column; justify-content: space-around; text-align: center; }
	.number { display: block; font-size: 2.5rem; font-weight: 900; color: var(--purple); }
	:global(.dark) .number { color: var(--gold); }
	.label { font-size: 0.65rem; font-weight: 800; opacity: 0.6; text-transform: uppercase; }

	.footer-marquee { margin-top: 100px; padding: 25px 0; border-top: 1px solid var(--border); overflow: hidden; width: 100%; }
	.marquee-inner { display: flex; animation: scroll 50s linear infinite; white-space: nowrap; }
	.m-text { font-size: 1.8rem; font-weight: 900; opacity: 0.1; margin: 0 40px; }
	.m-sep { color: var(--gold); }

	@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

	.video-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center; }
	.modal-box { position: relative; width: 90%; max-width: 900px; }
	.close-btn { position: absolute; top: -50px; right: 0; background: none; border: none; color: #fff; font-size: 2rem; cursor: pointer; }
	video { width: 100%; border-radius: 20px; }

	@media (max-width: 1200px) {
		.bento-layout { grid-template-columns: 1fr 1fr; }
		.bio-card { grid-column: span 2; }
	}

	@media (max-width: 768px) {
		#mainContent { padding: 80px 20px; }
		.bento-layout { grid-template-columns: 1fr; }
		.bio-card { grid-column: span 1; }
	}
</style>