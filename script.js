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
    
    
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});


const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});


document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});


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


document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});


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


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = form.querySelector('.form-submit');

    form.addEventListener('submit', function(e) {
        e.preventDefault();


        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';

        const formAction = form.getAttribute('action');
        
        
        const formData = new FormData(form);

        
        fetch(formAction, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(response => {
            
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Merci ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.';
            
            
            form.reset();
            
        
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer le message';
            
            
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.';
            
            
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer le message';
            
            console.error('Erreur:', error);
        });
    });
});


const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});


const competenceCards = document.querySelectorAll('.competence-card');
competenceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});


const projetCards = document.querySelectorAll('.projet-card');
projetCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});


const formationCards = document.querySelectorAll('.formation-card');
formationCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});


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