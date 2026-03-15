<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';

    let heroRef;

    onMount(() => {
        // Fade in the hero text once the loader is gone
        gsap.from(".hero-content", {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 4.2, // Starts right after the loader finishes
            ease: "power3.out"
        });
    });
</script>

<section class="relative h-screen flex items-center justify-center overflow-hidden px-6">
    <div class="hero-content text-center z-10">
        <h1 class="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
            SDET <span class="text-sky-500">&</span> AUTOMATION
        </h1>
        <p class="max-w-2xl mx-auto text-lg text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
            Building robust testing frameworks and elegant software solutions with 
            uncompromising precision.
        </p>
        
        <div class="mt-10 flex gap-4 justify-center">
            <button class="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-full font-medium hover:scale-105 transition-transform">
                View Projects
            </button>
            <button class="px-8 py-3 border border-zinc-200 dark:border-zinc-800 rounded-full font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                Contact Me
            </button>
        </div>
    </div>

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full"></div>
</section>