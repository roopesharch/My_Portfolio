<script>
	import "../app.css";
	import { theme } from '$lib/state/theme.svelte'; // Import our new store
	import { onMount } from 'svelte';
	import PetraLoader from '$lib/components/PetraLoader.svelte';
	import Matrix from '$lib/components/Matrix.svelte';
	import Space from '$lib/components/Space.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';

	let isLoading = $state(true);
	let menuOpen = $state(false);

	function handleLoadingComplete() {
		isLoading = false;
		setTimeout(() => { menuOpen = true; }, 500);
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</svelte:head>

<div class={theme.isDark ? 'dark' : ''}>
	<div class="min-h-screen transition-colors duration-700 {theme.isDark ? 'bg-black text-white' : 'bg-white text-zinc-900'}">
		
		{#if isLoading}
			<div class="fixed inset-0 z-[100]">
				<PetraLoader onComplete={handleLoadingComplete} />
			</div>
		{/if}

		<SideMenu isOpen={menuOpen} />

		{#if !isLoading}
			<div class="fixed inset-0 z-0">
				{#if theme.isDark}
					<Space />
				{:else}
					<Matrix />
				{/if}
			</div>

			<nav class="fixed top-0 w-full z-40 flex justify-end items-center px-10 py-8 pointer-events-none">
				<div class="flex items-center gap-4 pointer-events-auto">
					<span class="text-[10px] font-black tracking-[0.3em] uppercase text-[#D4AF37]">
						{theme.isDark ? '' : 'Lite Mode'}
					</span>
					
					<button 
						onclick={() => theme.toggle()} 
						aria-label="Toggle Theme"
						class="relative w-12 h-6 rounded-full border border-[#D4AF37]/40 p-1 {theme.isDark ? 'bg-zinc-900' : 'bg-zinc-100'}"
					>
						<div class="w-4 h-4 rounded-full transition-all duration-500 transform bg-[#D4AF37] {theme.isDark ? 'translate-x-6' : 'translate-x-0'}"></div>
					</button>
				</div>
			</nav>

			<main class="relative z-10 transition-all duration-1000 ease-out {menuOpen ? 'lg:pl-[260px]' : 'pl-0'}">
				<div class="container mx-auto px-6">
					<slot /> </div>
			</main>
		{/if}
	</div>
</div>