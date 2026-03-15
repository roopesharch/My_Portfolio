<script>
    // Svelte 5 "Rune" - this makes 'count' reactive automatically
    let count = $state(0);

    function increment() {
        count += 1;
    }
</script>

<section class="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
    <h2 class="text-5xl md:text-7xl font-black mb-4 tracking-tight">
        Building the <span class="text-blue-600">Future</span> of Web.
    </h2>
    
    <p class="text-gray-500 max-w-md mb-8">
        High-performance portfolio built with SvelteKit 5, GSAP animations, and Supabase.
    </p>

    <button 
        onclick={increment}
        class="px-8 py-3 bg-black text-white rounded-full font-semibold hover:scale-105 transition-transform active:scale-95"
    >
        Click Power: {count}
    </button>
</section>

<style>
    /* Custom styles can go here if Tailwind isn't enough */
</style>