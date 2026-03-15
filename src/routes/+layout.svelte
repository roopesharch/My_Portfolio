<script>
	import "../app.css";
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import PetraLoader from '$lib/components/PetraLoader.svelte';
	import Matrix from '$lib/components/Matrix.svelte';
	import Space from '$lib/components/Space.svelte';

	let isDark = $state(false);
	let isLoading = $state(true);

	function handleLoadingComplete() {
		isLoading = false;
	}

	function toggleTheme() {
		isDark = !isDark;
		if (browser) {
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
			document.documentElement.classList.toggle('dark', isDark);
		}
	}

	onMount(() => {
		if (browser) {
			const savedTheme = localStorage.getItem('theme');
			isDark = savedTheme === 'dark';
			if (isDark) document.documentElement.classList.add('dark');
		}
	});
</script>

<div class={isDark ? 'dark' : ''}>
	<div class="min-h-screen transition-colors duration-700 {isDark ? 'bg-black text-white' : 'bg-white text-zinc-900'}">
		
		{#if isLoading}
			<div class="fixed inset-0 z-[100]">
				<PetraLoader onComplete={handleLoadingComplete} />
			</div>
		{/if}

		{#if !isLoading}
			<div class="fixed inset-0 z-0">
				{#if isDark}
					<Space />
				{:else}
					<Matrix />
				{/if}
			</div>

			<nav class="fixed top-0 w-full z-40 flex justify-end items-center px-10 py-8">
				<div class="flex items-center gap-4">
					<span class="text-xs font-black tracking-widest uppercase transition-all duration-500 text-[#D4AF37]">
						{isDark ? 'DARK MODE' : 'LIGHT MODE'}
					</span>
					
					<button 
						onclick={toggleTheme} 
						class="relative w-12 h-6 rounded-full border border-[#D4AF37] transition-all duration-500 p-1 
						{isDark ? 'bg-zinc-900' : 'bg-zinc-100'}"
					>
						<div class="w-4 h-4 rounded-full transition-all duration-500 transform bg-[#D4AF37] {isDark ? 'translate-x-6' : 'translate-x-0'}"></div>
					</button>
				</div>
			</nav>

			<main class="relative z-10">
				<slot />
			</main>
		{/if}
	</div>
</div>