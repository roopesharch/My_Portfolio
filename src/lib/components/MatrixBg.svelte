<script>
    import { onMount } from 'svelte';

    let canvas;

    onMount(() => {
        const ctx = canvas.getContext('2d');
        const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const letters = (katakana + "0123456789").split("");

        // Using your Royal Gold palette
        const goldPrimary = "#DAA520"; 
        const goldHighlight = "#FFFFFF"; // The "Shining" white highlight
        const rainGold = ["#BF953F", "#FFD700", "#DAA520", "#AA771C"];

        const wallFontSize = 22;   
        const rainFontSize = 14;   
        
        let columns = 0;
        let drops = [];
        let speeds = [];
        let animationPhase = 'blanket'; 
        let blanketY = 0; 
        let dissolveY = 0;
        let animationFrame;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / rainFontSize);
            const startY = canvas.height / rainFontSize;
            drops = new Array(columns).fill(0).map(() => startY + Math.random() * 60);
            speeds = new Array(columns).fill(0).map(() => 0.4 + Math.random() * 0.8);
            blanketY = 0;
            dissolveY = 0;
            animationPhase = 'blanket';
        }

        function draw() {
            // Keep background white for Lite Mode
            ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (animationPhase === 'blanket') {
                ctx.font = `900 ${wallFontSize}px "Exo 2"`;
                ctx.textAlign = "center";
                const wallCols = Math.floor(canvas.width / wallFontSize);

                for (let i = 0; i < wallCols; i++) {
                    const x = i * wallFontSize + wallFontSize / 2;
                    for (let j = 0; j < Math.floor(blanketY); j++) {
                        const y = j * wallFontSize + wallFontSize;
                        const text = letters[Math.floor(Math.random() * letters.length)];
                        ctx.fillStyle = Math.random() > 0.8 ? goldHighlight : goldPrimary;
                        ctx.fillText(text, x, y);
                    }
                }
                blanketY += 0.8; 
                if (blanketY * wallFontSize > canvas.height + 50) animationPhase = 'dissolve';

            } else if (animationPhase === 'dissolve') {
                ctx.font = `900 ${wallFontSize}px "Exo 2"`;
                ctx.textAlign = "center";
                const wallCols = Math.floor(canvas.width / wallFontSize);

                for (let i = 0; i < wallCols; i++) {
                    const x = i * wallFontSize + wallFontSize / 2;
                    for (let j = Math.floor(dissolveY); j < Math.floor(canvas.height / wallFontSize) + 1; j++) {
                        const y = j * wallFontSize + wallFontSize;
                        const text = letters[Math.floor(Math.random() * letters.length)];
                        ctx.fillStyle = Math.random() > 0.8 ? goldHighlight : goldPrimary