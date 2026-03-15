<script>
    import { onMount } from 'svelte';

    let { isDark = false } = $props();
    let canvas;

    onMount(() => {
        const ctx = canvas.getContext('2d');
        const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const letters = (katakana + "0123456789").split("");

        const rainGold = ["#BF953F", "#FCF6BA", "#D4AF37", "#AA771C"];
        const rainFontSize = 14;

        let columns = 0;
        let drops = [];
        let speeds = [];
        let animationFrame;

        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / rainFontSize);
            const startY = canvas.height / rainFontSize;
            // Rain starts from bottom to top
            drops = new Array(columns).fill(0).map(() => startY + Math.random() * 60);
            speeds = new Array(columns).fill(0).map(() => 0.4 + Math.random() * 0.8);
        }

        function draw() {
            // Trail effect
            ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `900 ${rainFontSize}px "Exo 2"`;
            ctx.textAlign = "left";

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillStyle = Math.random() > 0.98 ? "#FFFFFF" : rainGold[Math.floor(Math.random() * rainGold.length)];
                
                const jitter = (Math.random() - 0.5) * 2;
                ctx.fillText(text, i * rainFontSize + jitter, drops[i] * rainFontSize);
                
                drops[i] -= speeds[i];

                if (drops[i] * rainFontSize < -50) {
                    drops[i] = canvas.height / rainFontSize + Math.random() * 15;
                    speeds[i] = 0.4 + Math.random() * 0.8;
                }
            }
        }

        window.addEventListener('resize', resize);
        resize();

        function loop() {
            draw();
            animationFrame = setTimeout(() => requestAnimationFrame(loop), 50);
        }
        loop();

        return () => {
            window.removeEventListener('resize', resize);
            clearTimeout(animationFrame);
        };
    });
</script>

<canvas
    bind:this={canvas}
    class="fixed inset-0 h-full w-full pointer-events-none transition-opacity duration-1000 {isDark ? 'opacity-0' : 'opacity-60'}"
    style="z-index: 1;"
></canvas>