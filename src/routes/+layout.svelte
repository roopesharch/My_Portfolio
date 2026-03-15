<script>
	import "../app.css";
	let { children } = $props(); // Svelte 5 syntax to render page content
</script>

<nav class="p-6 flex justify-between items-center max-w-6xl mx-auto">
	<h1 class="font-bold text-xl tracking-tighter">ROOPESH</h1>
	<div class="space-x-6 text-sm font-medium">
		<a href="/" class="hover:text-blue-600 transition-colors">Home</a>
		<a href="/projects" class="hover:text-blue-600 transition-colors">Projects</a>
	</div>
</nav>

<main>
	{@render children()}
</main>

<footer class="p-10 text-center text-gray-400 text-xs">
	© 2026 Built with SvelteKit & GSAP
</footer>