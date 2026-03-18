<script lang="ts">
	import About from '$lib/components/about.svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		setTimeout(() => { visible = true; }, 100);
	});
</script>

<svelte:head>
	<title>About | Roopesh S</title>
</svelte:head>

{#if visible}
	<About />
{/if}