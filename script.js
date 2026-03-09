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
        // On remplace \n\n par <br><br> pour l'interprétation HTML
        bio_text: "Étudiante au Gaming Campus, je suis passionnée par l'univers du jeu vidéo (et surtout par les capybaras !).<br><br>Très ouverte d’esprit et curieuse de nature, j’aime découvrir de nouvelles expériences et explorer le fonctionnement des mécaniques de jeu.<br><br>Mon objectif est d’intégrer un studio afin de mettre à profit mes compétences et de contribuer à des projets ambitieux qui donnent le sourire aux joueurs !",
        stack_title: "Stack technique :",
        btn_human: "🤹 CV Version Humain", btn_ats: "🤖 CV Version ATS",
        projects_title: "Mes Projets",
        desc_cyber: "Un Shoot-em Up dans un environnement cyberpunk à l'occasion d'une exposition au musée Malartre.",
        desc_whiskers: "Un platformer en co-op où le joueur voyagera dans le temps où collaboration est requise.",
        desc_testeur: "Un lot de 3 mini-jeux mettant en avant des physiques différentes :<br>- Marble Maze<br>- Claw Machine<br>- Destruct Boxes",
        btn_more_itch: "Voir + de projets",
        contact_title: "Mon profil vous plaît? Contactez-moi !",
        contact_desc: "Veuillez sélectionner le moyen de contact souhaité, à très vite! ☺️",
        btn_email: "Mon E-mail",
        btn_linkedin: "Mon LinkedIn",
        footer_text: "© 2026 Jacqueline | Fait avec ❤️ et beaucoup de Capybaras 🌿"
    },
    en: {
        nav_bio: "Bio", nav_projects: "Projects", nav_contact: "Contact",
        hero_welcome: "Welcome to my portfolio, grab a coffee/tea and enjoy your visit! ☕",
        hero_tagline: "Game Developer & Capybara lover.💕",
        bio_title: "Who am I?",
        bio_text: "A student at Gaming Campus, I am passionate about the world of video games (and especially capybaras!).<br><br>Open-minded and naturally curious, I love discovering new experiences and exploring how game mechanics work.<br><br>My goal is to join a studio to put my skills to use and contribute to ambitious projects that bring a smile to players' faces!",
        stack_title: "Technical Stack:",
        btn_human: "🤹 Human Version CV", btn_ats: "🤖 ATS Version CV",
        projects_title: "My Projects",
        desc_cyber: "A Shoot-em Up in a cyberpunk environment created for an exhibition at the Malartre Museum.",
        desc_whiskers: "A co-op platformer where players travel through time and collaboration is key.",
        desc_testeur: "A set of 3 mini-games showcasing different physics:<br>- Marble Maze<br>- Claw Machine<br>- Destruct Boxes",
        btn_more_itch: "More projects",
        contact_title: "Like my profile? Let's talk!",
        contact_desc: "Please select your preferred contact method, see you soon! ☺️",
        btn_email: "My E-mail",
        btn_linkedin: "My LinkedIn",
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
            const icon = element.querySelector('.btn-icon');

            // LOGIQUE DE MISE À JOUR :
            if (key === "bio_text" || key === "desc_testeur") {
                // Pour la bio, on utilise innerHTML pour activer les <br>
                element.innerHTML = translations[newLang][key];
            } else if (icon) {
                // Pour les boutons avec icônes
                element.innerHTML = icon.outerHTML + " " + translations[newLang][key];
            } else {
                // Pour le texte simple (titres, nav)
                element.textContent = translations[newLang][key];
            }
        }
    });
});