// Transition entre les projets au scroll & swipe vertical
const projects = document.querySelectorAll('.project');
let currentProject = 0;

// Met à jour l'affichage des fenêtres
function showProject(index) {
    projects.forEach((project, i) => {
        if (i === index) {
            project.classList.add("active");
        } else {
            project.classList.remove("active");
        }
    });
    currentProject = index;
}

// Défilement à la molette (PC)
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0 && currentProject < projects.length - 1) {
        showProject(currentProject + 1);
    } else if (event.deltaY < 0 && currentProject > 0) {
        showProject(currentProject - 1);
    }
});

// 📌 Gestion du swipe vertical pour mobile
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
});

window.addEventListener('touchmove', (event) => {
    touchEndY = event.touches[0].clientY;
});

window.addEventListener('touchend', () => {
    const swipeDistance = touchEndY - touchStartY;

    if (swipeDistance < -50 && currentProject < projects.length - 1) {
        showProject(currentProject + 1);
    } else if (swipeDistance > 50 && currentProject > 0) {
        showProject(currentProject - 1);
    }
});

// Affichage initial
showProject(0);
