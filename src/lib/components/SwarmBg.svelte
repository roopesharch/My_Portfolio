<script>
    import { onMount } from 'svelte';
    let canvas;

    onMount(() => {
        const ctx = canvas.getContext('2d');
        const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const letters = (katakana + "0123456789").split("");
        
        let w, h;
        let characters = [];

        const setCanvasSize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        class FloatingKatana {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.z = Math.random() * 1000;
                this.char = letters[Math.floor(Math.random() * letters.length)];
                this.speed = 1 + Math.random() * 1.5;
            }
            update() {
                this.z -= this.speed;
                if (this.z <= 1) this.reset();
            }
            draw() {
                const scale = 400 / (400 + this.z);
                const x2d = (this.x - w / 2) * scale + w / 2;
                const y2d = (this.y - h / 2) * scale + h / 2;
                const opacity = (1000 - this.z) / 1000;

                ctx.fillStyle = `rgba(164, 94, 220, ${opacity})`; // Purple Swarm
                ctx.font = `${16 * scale}px "Exo 2"`;
                ctx.fillText(this.char, x2d, y2d);
            }
        }

        characters = Array.from({ length: 100 }, () => new FloatingKatana());

        function animate() {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);
            characters.forEach(c => {
                c.update();
                c.draw();
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', setCanvasSize);
        setCanvasSize();
        animate();

        return () => window.removeEventListener('resize', setCanvasSize);
    });
</script>

<canvas bind:this={canvas} class="fixed inset-0 z-[-1] bg-black"></canvas>