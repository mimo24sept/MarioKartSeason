// Gestion du défilement et des fenêtres
const projects = document.querySelectorAll('.project');
let currentProject = 0;

function showProject(index) {
    projects.forEach((project, i) => {
        project.classList.toggle('active', i === index);
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

// Gestion du swipe vertical pour mobile
let touchStartY = 0;
window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
});
window.addEventListener('touchend', (event) => {
    const touchEndY = event.changedTouches[0].clientY;
    if (touchStartY - touchEndY > 50 && currentProject < projects.length - 1) {
        showProject(currentProject + 1);
    } else if (touchEndY - touchStartY > 50 && currentProject > 0) {
        showProject(currentProject - 1);
    }
});

// Affichage initial
showProject(0);

// Gestion de l'inscription
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (localStorage.getItem(username)) {
        document.getElementById('register-status').innerText = '⚠️ Nom d\'utilisateur déjà pris.';
    } else {
        localStorage.setItem(username, password);
        document.getElementById('register-status').innerText = '✅ Compte créé avec succès !';
    }
});
