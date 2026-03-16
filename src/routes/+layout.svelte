<script>
	import "../app.css";
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import PetraLoader from '$lib/components/PetraLoader.svelte';
	import Matrix from '$lib/components/Matrix.svelte';
	import Space from '$lib/components/Space.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';

	// Global States
	let isDark = $state(false);
	let isLoading = $state(true);
	let menuOpen = $state(false);

	/**
	 * Handles the transition from Loader to Site
	 * Triggered by PetraLoader.svelte
	 */
	function handleLoadingComplete() {
		isLoading = false;
		// Sync: Menu slides in 500ms after the loader starts dissolving
		setTimeout(() => {
			menuOpen = true;
		}, 500);
	}

	/**
	 * Theme Toggle Logic
	 * Syncs with localStorage and the <html> class
	 */
	function toggleTheme() {
		isDark = !isDark;
		if (browser) {
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
			document.documentElement.classList.toggle('dark', isDark);
		}
	}

	onMount(() => {
		if (browser) {
			// Check for saved user preference
			const savedTheme = localStorage.getItem('theme');
			isDark = savedTheme === 'dark';
			if (isDark) {
				document.documentElement.classList.add('dark');
			}
		}
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</svelte:head>

<div class={isDark ? 'dark' : ''}>
	<div class="min-h-screen transition-colors duration-700 {isDark ? 'bg-black text-white' : 'bg-white text-zinc-900'}">
		
		{#if isLoading}
			<div class="fixed inset-0 z-[100]">
				<PetraLoader onComplete={handleLoadingComplete} />
			</div>
		{/if}

		<SideMenu isOpen={menuOpen} />

		{#if !isLoading}
			<div class="fixed inset-0 z-0">
				{#if isDark}
					<Space />
				{:else}
					<Matrix />
				{/if}
			</div>

			<nav class="fixed top-0 w-full z-40 flex justify-end items-center px-10 py-8 pointer-events-none">
				<div class="flex items-center gap-4 pointer-events-auto">
					<span class="text-[15px] font-black tracking-[0.3em] uppercase transition-all duration-500 text-[#D4AF37]">
						{isDark ? 'Dark Mode' : 'Lite Mode'}
					</span>
					
					<button 
						onclick={toggleTheme} 
						aria-label="Toggle Theme"
						class="relative w-12 h-6 rounded-full border border-[#D4AF37]/40 transition-all duration-500 p-1 
						{isDark ? 'bg-zinc-900' : 'bg-zinc-100'}"
					>
						<div class="w-4 h-4 rounded-full transition-all duration-500 transform bg-[#D4AF37] {isDark ? 'translate-x-6' : 'translate-x-0'}"></div>
					</button>
				</div>
			</nav>

			<main class="relative z-10 transition-all duration-1000 ease-out {menuOpen ? 'lg:pl-[260px]' : 'pl-0'}">
				<div class="container mx-auto px-6">
					<slot />
				</div>
			</main>
		{/if}
	</div>
</div>

<style>
	/* Ensures smooth scrolling across the whole app */
	:global(html) {
		scroll-behavior: smooth;
		overflow-x: hidden;
	}

	/* Custom scrollbar to match the gold aesthetic */
	:global(::-webkit-scrollbar) {
		width: 6px;
	}
	:global(::-webkit-scrollbar-track) {
		background: transparent;
	}
	:global(::-webkit-scrollbar-thumb) {
		background: #D4AF37;
		border-radius: 10px;
	}

	/* Prevent interaction during loading */
	.min-h-screen {
		overflow-x: hidden;
	}
</style>