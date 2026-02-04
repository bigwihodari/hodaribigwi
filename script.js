// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form will submit to Google Forms via AJAX (no page redirect)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = form.querySelector('.form-submit');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Désactiver le bouton pendant l'envoi
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';

        // Récupérer l'URL du formulaire
        const formAction = form.getAttribute('action');
        
        // Créer les données du formulaire
        const formData = new FormData(form);

        // Envoyer via fetch en mode no-cors (pour éviter les erreurs CORS)
        fetch(formAction, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(response => {
            // Avec no-cors, on ne peut pas lire la réponse, mais si on arrive ici, c'est que ça a marché
            // Afficher le message de succès
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Merci ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.';
            
            // Réinitialiser le formulaire
            form.reset();
            
            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer le message';
            
            // Faire disparaître le message après 5 secondes
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            // En cas d'erreur
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.';
            
            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer le message';
            
            console.error('Erreur:', error);
        });
    });
});

// Add animation delay to timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Add animation delay to competence cards
const competenceCards = document.querySelectorAll('.competence-card');
competenceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Add animation delay to projet cards
const projetCards = document.querySelectorAll('.projet-card');
projetCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Add animation delay to formation cards
const formationCards = document.querySelectorAll('.formation-card');
formationCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Active nav link on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('.section, .hero');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Download CV functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadCV');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Créer un lien temporaire pour forcer le téléchargement
            const link = document.createElement('a');
            link.href = 'CV_Hodari_BIGWI.pdf';
            link.download = 'CV_Hodari_BIGWI.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});