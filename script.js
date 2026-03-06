let isAnimating = false;

// 1. GESTION DU HEADER ET BOUTON RETOUR
window.addEventListener('scroll', () => {
    const backToTopButton = document.querySelector('.back-to-top');
    const nav = document.querySelector('nav');

    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
        nav.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
        nav.classList.remove('visible');
    }
});

// 2. LOGIQUE DE SCROLL ÉCRAN PAR ÉCRAN
window.addEventListener('wheel', (e) => {
    if (isAnimating) return;
    const targets = [...document.querySelectorAll('section'), document.querySelector('footer')];
    const currentScroll = window.scrollY;
    let currentIndex = 0;
    let minDistance = Math.abs(currentScroll - targets[0].offsetTop);

    targets.forEach((target, index) => {
        const distance = Math.abs(currentScroll - target.offsetTop);
        if (distance < minDistance) {
            minDistance = distance;
            currentIndex = index;
        }
    });

    if (e.deltaY > 0) {
        if (currentIndex < targets.length - 1) scrollToTarget(targets[currentIndex + 1].offsetTop);
    } else {
        if (currentIndex > 0) scrollToTarget(targets[currentIndex - 1].offsetTop);
    }
}, { passive: false });

function scrollToTarget(yPosition) {
    isAnimating = true;
    window.scrollTo({ top: yPosition, behavior: 'smooth' });
    setTimeout(() => { isAnimating = false; }, 600);
}

// 3. LOGIQUE DU SLIDER PROJETS
const grid = document.querySelector('.project-grid');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => { grid.scrollLeft += grid.offsetWidth; });
    prevBtn.addEventListener('click', () => { grid.scrollLeft -= grid.offsetWidth; });
}

// 4. DIAPORAMA AUTOMATIQUE DES IMAGES PROJETS
function startProjectSlideshows() {
    const placeholders = document.querySelectorAll('.project-placeholder');
    placeholders.forEach(container => {
        const images = container.querySelectorAll('img');
        if (images.length > 1) {
            let currentIndex = 0;
            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 3000);
        }
    });
}
document.addEventListener('DOMContentLoaded', startProjectSlideshows);

// 5. TRADUCTION AUTOMATISÉE
const translations = {
    fr: {
        nav_bio: "Bio", nav_projects: "Projets", nav_contact: "Contact",
        hero_welcome: "Bienvenue sur mon portfolio, prenez un café/thé et bonne visite ! ☕",
        hero_tagline: "Développeuse de jeux vidéo & amoureuse des capybaras.💕",
        bio_title: "Qui suis-je ?",
        bio_text: "Passionnée par la création d'univers, je développe des jeux qui allient mécanique solide et ambiance relaxante...",
        btn_human: "🤹 CV Version Humain", btn_ats: "🤖 CV Version ATS",
        projects_title: "Mes Projets",
        desc_cyber: "Un Shoot-em Up dans un environnement cyberpunk à l'occasion d'une exposition au musée Malartre.",
        desc_whiskers: "Un platformer en co-op où le joueur voyagera dans le temps où collaboration est requise.",
        title_testeur: "Testeur", desc_testeur: "Test de l'affichage du 3eme jeu",
        btn_more_itch: "Voir + de projets",
        contact_title: "Mon profil vous plaît? Contactez-moi !",
        contact_desc: "Veuillez sélectionner le moyen de contact souhaité, à très vite! ☺️",
        footer_text: "© 2026 Jacqueline | Fait avec ❤️ et beaucoup de Capybaras 🌿"
    },
    en: {
        nav_bio: "Bio", nav_projects: "Projects", nav_contact: "Contact",
        hero_welcome: "Welcome to my portfolio, grab a coffee/tea and enjoy your visit! ☕",
        hero_tagline: "Game Developer & Capybara lover.💕",
        bio_title: "Who am I?",
        bio_text: "Passionate about world-building, I develop games that combine solid mechanics with a relaxing atmosphere...",
        btn_human: "🤹 Human Version CV", btn_ats: "🤖 ATS Version CV",
        projects_title: "My Projects",
        desc_cyber: "A Shoot-em Up in a cyberpunk environment created for an exhibition at the Malartre Museum.",
        desc_whiskers: "A co-op platformer where players travel through time and collaboration is key.",
        title_testeur: "Tester", desc_testeur: "Testing the 3rd game display",
        btn_more_itch: "More projects",
        contact_title: "Like my profile? Let's talk!",
        contact_desc: "Please select your preferred contact method, see you soon! ☺️",
        footer_text: "© 2026 Jacqueline | Made with ❤️ and lots of Capybaras 🌿"
    }
};

const langBtn = document.getElementById('lang-switch');
const langFlag = document.getElementById('lang-flag');

langBtn.addEventListener('click', () => {
    const currentLang = langBtn.getAttribute('data-lang');
    const newLang = currentLang === 'fr' ? 'en' : 'fr';

    langFlag.src = newLang === 'fr' ? 'Images/Languages/French.png' : 'Images/Languages/English.png';
    langBtn.setAttribute('data-lang', newLang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[newLang][key]) {
            // Si l'élément contient une image (icône), on préserve l'icône
            const icon = element.querySelector('.btn-icon');
            if (icon) {
                element.innerHTML = icon.outerHTML + " " + translations[newLang][key];
            } else {
                element.textContent = translations[newLang][key];
            }
        }
    });
});