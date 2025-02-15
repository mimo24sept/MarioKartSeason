export function startMatrixEffect() {
    const canvas = document.createElement("canvas");
    canvas.id = "matrixCanvas";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const columns = canvas.width / 14;
    const drops = Array(Math.floor(columns)).fill(0);

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "14px monospace";
        ctx.fillStyle = "#00ff00";

        drops.forEach((y, index) => {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, index * 14, y);
            drops[index] = y > canvas.height || Math.random() > 0.95 ? 0 : y + 14;
        });
    }

    setInterval(drawMatrix, 50);
}
