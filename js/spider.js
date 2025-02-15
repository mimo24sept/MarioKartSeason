const spiderCanvas = document.getElementById('spiderCanvas');
const spiderCtx = spiderCanvas.getContext('2d');

// Ajustement de la taille du canvas
function resizeSpiderCanvas() {
    spiderCanvas.width = window.innerWidth;
    spiderCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeSpiderCanvas);
resizeSpiderCanvas();

// Initialisation des points
let points = [];
const maxPoints = 150;
const activationDistance = 150;

// Générer des points aléatoires
for (let i = 0; i < maxPoints; i++) {
    points.push({
        x: Math.random() * spiderCanvas.width,
        y: Math.random() * spiderCanvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        opacity: 0,
        lifespan: 0  // durée de vie après désactivation
    });
}

// Position de la souris
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Animation de la toile
function drawSpiderWeb() {
    spiderCtx.clearRect(0, 0, spiderCanvas.width, spiderCanvas.height);

    // Déplacer les points et ajuster leur opacité
    for (let point of points) {
        point.x += point.vx;
        point.y += point.vy;

        // Rebondir sur les bords
        if (point.x <= 0 || point.x >= spiderCanvas.width) point.vx *= -1;
        if (point.y <= 0 || point.y >= spiderCanvas.height) point.vy *= -1;

        // Calcul de la distance avec la souris
        const distMouse = Math.hypot(point.x - mouse.x, point.y - mouse.y);
        if (distMouse < activationDistance) {
            point.opacity = Math.min(point.opacity + 0.05, 1);
            point.lifespan = 30; // réinitialise la durée de vie
        } else {
            if (point.lifespan > 0) {
                point.lifespan--;
                point.opacity = Math.max(point.opacity - 0.01, 0);
            } else {
                point.opacity = Math.max(point.opacity - 0.05, 0);
            }
        }
    }

    // Dessiner les lignes et les points activés
    let activePoints = points.filter(p => p.opacity > 0);

    // Relier les points activés entre eux et à la souris
    for (let i = 0; i < activePoints.length; i++) {
        let point = activePoints[i];
        const distMouse = Math.hypot(point.x - mouse.x, point.y - mouse.y);

        // Ligne vers la souris uniquement si distance < activationDistance
        if (distMouse < activationDistance) {
            spiderCtx.beginPath();
            spiderCtx.moveTo(mouse.x, mouse.y);
            spiderCtx.lineTo(point.x, point.y);
            spiderCtx.strokeStyle = `rgba(0, 255, 0, ${point.opacity})`;
            spiderCtx.lineWidth = 2;
            spiderCtx.stroke();
        }

        // Dessiner le point si actif
        spiderCtx.beginPath();
        spiderCtx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        spiderCtx.fillStyle = `rgba(0, 255, 0, ${point.opacity})`;
        spiderCtx.fill();

        // Lignes entre les points activés
        for (let j = i + 1; j < activePoints.length; j++) {
            let otherPoint = activePoints[j];
            let dist = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
            if (dist < activationDistance / 2) {
                spiderCtx.beginPath();
                spiderCtx.moveTo(point.x, point.y);
                spiderCtx.lineTo(otherPoint.x, otherPoint.y);
                const lineOpacity = Math.min(point.opacity, otherPoint.opacity) * 0.5;
                spiderCtx.strokeStyle = `rgba(0, 255, 0, ${lineOpacity})`;
                spiderCtx.lineWidth = 1;
                spiderCtx.stroke();
            }
        }
    }

    requestAnimationFrame(drawSpiderWeb);
}

drawSpiderWeb();
