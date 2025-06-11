// Menu hamburger pour mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.service-card, .feature, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animation de l'icône électrique
    const electricHouse = document.querySelector('.electric-house');
    if (electricHouse) {
        electricHouse.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });

        electricHouse.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Smooth scroll pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulation d'envoi (dans un vrai site, ceci serait envoyé à un serveur)
            console.log('Données du formulaire:', data);
            
            // Affichage d'un message de confirmation
            alert('Merci pour votre demande ! Nous vous recontacterons rapidement.');
            
            // Réinitialisation du formulaire
            contactForm.reset();
        });
    }
});

// Fonction pour envoyer l'email
function sendEmail(e) {
    e.preventDefault();

    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';

    const templateParams = {
        from_name: form.name.value,
        from_email: form.email.value,
        phone: form.phone.value,
        service: form.service.value,
        urgency: form.urgency.value,
        message: form.message.value
    };

    emailjs.send('service_ft2412y', 'template_19l9t9o', templateParams)
        .then(function(response) {
            alert('Votre message a été envoyé avec succès ! Nous vous recontacterons rapidement.');
            form.reset();
        }, function(error) {
            alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer ou nous contacter par téléphone.');
        })
        .finally(function() {
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer ma demande';
        });

    return false;
}

