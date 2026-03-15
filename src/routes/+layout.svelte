<script>
	import "../app.css";
	import { browser } from '$app/environment';
	import PetraLoader from '$lib/components/PetraLoader.svelte';

	let isDark = $state(false);
	let isLoading = $state(true);

	function handleLoadingComplete() {
		isLoading = false;
	}

	function toggleTheme() {
		isDark = !isDark;
		if (browser) localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}
</script>

<div class={isDark ? 'dark' : ''}>
	<div class="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
		
		{#if isLoading}
			<PetraLoader onComplete={handleLoadingComplete} />
		{/if}

		<nav class="fixed top-0 w-full z-40 flex justify-between items-center px-10 py-8">
			<img src="/img/logo.png" alt="Logo" class="w-10 h-10 object-contain" />
			<button onclick={toggleTheme} class="cursor-pointer">
				{#if isDark}
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
				{/if}
			</button>
		</nav>

		<main>
			<slot />
		</main>
	</div>
</div>