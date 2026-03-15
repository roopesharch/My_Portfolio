<script>
    import { onMount } from 'svelte';
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

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / rainFontSize);
            const startY = canvas.height / rainFontSize;
            drops = new Array(columns).fill(0).map(() => startY + Math.random() * 60);
            speeds = new Array(columns).fill(0).map(() => 0.4 + Math.random() * 0.8);
        }

        function draw() {
            // White background with slight trail for Light Mode
            ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = `900 ${rainFontSize}px "Exo 2"`;
            ctx.textAlign = "left";

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillStyle = (Math.random() > 0.98) ? "#FFFFFF" : rainGold[Math.floor(Math.random() * rainGold.length)];
                
                const jitter = (Math.random() - 0.5) * 2;
                ctx.fillText(text, (i * rainFontSize) + jitter, drops[i] * rainFontSize);

                // Organic Rising Logic (Original Gold Master)
                drops[i] -= speeds[i]; 
                if (drops[i] * rainFontSize < -50) {
                    drops[i] = (canvas.height / rainFontSize) + Math.random() * 15;
                    speeds[i] = 0.4 + Math.random() * 0.8;
                }
            }
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => window.removeEventListener('resize', resize);
    });
</script>

<canvas bind:this={canvas} class="fixed inset-0 z-[-1] bg-white"></canvas>