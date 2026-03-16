<script>
    import Title from '$lib/components/Title.svelte';
    import { goto } from '$app/navigation';

    function goToProjects() {
        goto('/projects');
    }
</script>

<section class="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
    <div class="relative z-10 w-full px-4 text-center">
        <div on:click={goToProjects} class="cursor-pointer">
            <Title 
                firstText="W E L C O M E" 
                secondText="DRIVE INTO PORTFOLIO" 
            />
        </div>
    </div>
</section>