<script>
    import Projects from '$lib/components/projects.svelte';
    import { browser } from '$app/environment';

    // Receive reactive states from layout slot
    let { isDark, menuOpen } = $props();
</script>

<div class="projects-page-container">
    {#if browser}
        <Projects {isDark} {menuOpen} />
    {/if}
</div>

<style>
    .projects-page-container {
        width: 100%;
        min-height: 100vh;
        overflow: hidden;
    }
</style>