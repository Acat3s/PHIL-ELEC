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
            
            // Initialisation d'EmailJS avec votre Clé Publique
            emailjs.init('C8kk2E6XWL2xH4bi1'); 

            // Envoi du formulaire via EmailJS
            emailjs.sendForm('service_ft2412y', 'template_19l9t9o', this)
                .then(function() {
                    console.log('SUCCESS!');
                    alert('Merci pour votre message ! Il a été envoyé avec succès.');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Oups ! Une erreur est survenue. Votre message n\'a pas pu être envoyé. Veuillez réessayer.');
                });
        });
    }
});



// Fonctionnalités pour la page avis
function toggleReviewForm() {
    const form = document.getElementById('reviewForm');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
    } else {
        form.style.display = 'none';
    }
}

// Système d'étoiles pour les avis
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingInput = document.getElementById('rating');
    
    if (stars.length > 0) {
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingInput.value = rating;
                
                // Mettre à jour l'affichage des étoiles
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            star.addEventListener('mouseover', function() {
                const rating = this.getAttribute('data-rating');
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.style.opacity = '1';
                    } else {
                        s.style.opacity = '0.3';
                    }
                });
            });
        });
        
        // Restaurer l'état au survol
        const starContainer = document.querySelector('.star-rating');
        if (starContainer) {
            starContainer.addEventListener('mouseleave', function() {
                const currentRating = ratingInput.value;
                stars.forEach((s, i) => {
                    if (i < currentRating) {
                        s.style.opacity = '1';
                    } else {
                        s.style.opacity = '0.3';
                    }
                });
            });
        }
    }
    
    // Gestion du formulaire d'avis
    const reviewForm = document.querySelector('.review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation simple
            const name = document.getElementById('reviewerName').value;
            const rating = document.getElementById('rating').value;
            const text = document.getElementById('reviewText').value;
            const consent = document.getElementById('reviewConsent').checked;
            
            if (!name || !rating || !text || !consent) {
                alert('Veuillez remplir tous les champs obligatoires et accepter les conditions.');
                return;
            }
            
            // Simulation d'envoi
            alert('Merci pour votre témoignage ! Nous l\'examinerons avant publication.');
            
            // Réinitialiser le formulaire
            reviewForm.reset();
            stars.forEach(s => s.classList.remove('active'));
            document.getElementById('reviewForm').style.display = 'none';
        });
    }
});

// Rendre le logo cliquable vers la page d'accueil sur toutes les pages
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.site-logo').forEach(function(logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    });
});

// Rendre tout le conteneur .logo cliquable vers la page d'accueil
// (fallback pour garantir le clic)  
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.logo').forEach(function(logoContainer) {
        logoContainer.style.cursor = 'pointer';
        logoContainer.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    });
});

