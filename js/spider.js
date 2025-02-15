const spiderCanvas = document.getElementById('spiderCanvas');
const spiderCtx = spiderCanvas.getContext('2d');

spiderCanvas.width = window.innerWidth;
spiderCanvas.height = window.innerHeight;

// 🕷️ EFFET ARAIGNÉE (Avant-plan)
let points = [];
const maxPoints = 500;
const maxDistance = 125;

// Générer des points fixes
for (let i = 0; i < maxPoints; i++) {
    points.push({
        x: Math.random() * spiderCanvas.width,
        y: Math.random() * spiderCanvas.height,
        visible: false
    });
}

// Position de la souris
let mouse = { x: spiderCanvas.width / 2, y: spiderCanvas.height / 2 };

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Dessiner l'effet d'araignée
function drawSpiderWeb() {
    spiderCtx.clearRect(0, 0, spiderCanvas.width, spiderCanvas.height);

    // Réinitialiser la visibilité des points
    points.forEach(point => point.visible = false);

    // Dessiner les lignes entre la souris et les points
    for (let point of points) {
        let dist = Math.sqrt((point.x - mouse.x) ** 2 + (point.y - mouse.y) ** 2);
        if (dist < maxDistance) {
            point.visible = true;
            spiderCtx.strokeStyle = `rgba(0, 255, 0, ${1 - dist / maxDistance})`;
            spiderCtx.lineWidth = 3;
            spiderCtx.beginPath();
            spiderCtx.moveTo(mouse.x, mouse.y);
            spiderCtx.lineTo(point.x, point.y);
            spiderCtx.stroke();
        }
    }

    requestAnimationFrame(drawSpiderWeb);
}

drawSpiderWeb();
