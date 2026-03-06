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

// 2. LOGIQUE DE SCROLL ÉCRAN PAR ÉCRAN (DÉTECTION DYNAMIQUE)
window.addEventListener('wheel', (e) => {
    if (isAnimating) return;

    // On récupère toutes les sections + le footer
    const targets = [...document.querySelectorAll('section'), document.querySelector('footer')];

    // On trouve quelle section est actuellement la plus visible à l'écran
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

    // On décide de la direction
    if (e.deltaY > 0) {
        // Scroll vers le bas -> on va à la section suivante
        if (currentIndex < targets.length - 1) {
            scrollToTarget(targets[currentIndex + 1].offsetTop);
        }
    } else {
        // Scroll vers le haut -> on va à la section précédente
        if (currentIndex > 0) {
            scrollToTarget(targets[currentIndex - 1].offsetTop);
        }
    }
}, { passive: false });

function scrollToTarget(yPosition) {
    isAnimating = true;

    window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
    });

    // On réduit un peu le délai (600ms au lieu de 800ms) pour plus de nervosité
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// 3. LOGIQUE DU SLIDER PROJETS
const grid = document.querySelector('.project-grid');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', (e) => {
        grid.scrollLeft += grid.offsetWidth;
    });

    prevBtn.addEventListener('click', (e) => {
        grid.scrollLeft -= grid.offsetWidth;
    });
}

const langBtn = document.getElementById('lang-switch');
const langFlag = document.getElementById('lang-flag');

const translations = {
    fr: {
        bio: "Bio",
        projets: "Projets",
        contact: "Contact",
        welcome: "Bienvenue sur mon portfolio, prenez un café/thé et bonne visite ! ☕",
        tagline: "Développeuse de jeux vidéo & amoureuse des capybaras.💕",
        whoAmI: "Qui suis-je ?",
        bioText: "Passionnée par la création d'univers, je développe des jeux qui allient mécanique solide et ambiance relaxante...",
        btnHuman: "🤹 CV Version Humain",
        btnAts: "🤖 CV Version ATS",
        myProjects: "Mes Projets",
        moreProjects: "Voir + de projets",
        contactTitle: "Mon profil vous plaît? Contactez-moi !",
        contactDesc: "Veuillez sélectionner le moyen de contact souhaité, à très vite! ☺️"
    },
    en: {
        bio: "Bio",
        projets: "Projects",
        contact: "Contact",
        welcome: "Welcome to my portfolio, grab a coffee/tea and enjoy your visit! ☕",
        tagline: "Game Developer & Capybara lover.💕",
        whoAmI: "Who am I?",
        bioText: "Passionate about world-building, I develop games that combine solid mechanics with a relaxing atmosphere...",
        btnHuman: "🤹 Human Version CV",
        btnAts: "🤖 ATS Version CV",
        myProjects: "My Projects",
        moreProjects: "More projects",
        contactTitle: "Like my profile? Let's talk!",
        contactDesc: "Please select your preferred contact method, see you soon! ☺️"
    }
};

langBtn.addEventListener('click', () => {
    const currentLang = langBtn.getAttribute('data-lang');
    const newLang = currentLang === 'fr' ? 'en' : 'fr';

    // Mise à jour de l'icône (Assure-toi d'avoir flag-en.png et flag-fr.png)
    langFlag.src = newLang === 'fr' ? 'Images/Languages/French.png' : 'Images/Languages/English.png';
    langBtn.setAttribute('data-lang', newLang);

    // Traduction des éléments (Ajoute les IDs correspondants dans ton HTML)
    document.querySelector('a[href="#qui-suis-je"]').textContent = translations[newLang].bio;
    document.querySelector('a[href="#projets"]').textContent = translations[newLang].projets;
    document.querySelector('a[href="#contact"]').textContent = translations[newLang].contact;
    document.querySelector('.hero-content h1').textContent = translations[newLang].welcome;
    document.querySelector('.tagline').textContent = translations[newLang].tagline;
    document.querySelector('#qui-suis-je h2').textContent = translations[newLang].whoAmI;
    document.querySelector('.bio-text p').textContent = translations[newLang].bioText;
    document.querySelector('.btn-download:first-child').childNodes[0].textContent = translations[newLang].btnHuman;
    document.querySelector('.btn-ats').childNodes[0].textContent = translations[newLang].btnAts;
    document.querySelector('#projets h2').textContent = translations[newLang].myProjects;
    document.querySelector('.more-projects .btn-download:not(.btn-ats)').lastChild.textContent = translations[newLang].moreProjects;
    document.querySelector('.contact-card h2').textContent = translations[newLang].contactTitle;
    document.querySelector('.contact-card p').textContent = translations[newLang].contactDesc;
});

//Mes PRojets

function startProjectSlideshows() {
    // On récupère tous les placeholders de projets
    const placeholders = document.querySelectorAll('.project-placeholder');

    placeholders.forEach(container => {
        const images = container.querySelectorAll('img');

        // On ne lance le cycle que s'il y a plus d'une image
        if (images.length > 1) {
            let currentIndex = 0;

            setInterval(() => {
                // Retire la classe active de l'image actuelle
                images[currentIndex].classList.remove('active');

                // Passe à l'image suivante (et revient à 0 à la fin)
                currentIndex = (currentIndex + 1) % images.length;

                // Ajoute la classe active à la nouvelle image
                images[currentIndex].classList.add('active');
            }, 3000); // Change toutes les 3 secondes
        }
    });
}

// Lancer la fonction au chargement du script
startProjectSlideshows();