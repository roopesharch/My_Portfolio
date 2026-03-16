<script>
    // CRITICAL: Ensure this is lowercase to match your folder tree
    import Projects from '$lib/components/projects.svelte';
    import { browser } from '$app/environment';
</script>

<div class="projects-page-container">
    {#if browser}
        <Projects />
    {/if}
</div>

<style>
    .projects-page-container {
        width: 100%;
        min-height: 100vh;
        overflow: hidden;
    }
</style>