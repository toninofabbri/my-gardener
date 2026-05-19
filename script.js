document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu if open
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for sticky header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookieBtn = document.getElementById('accept-cookie');

    // Check if user has already seen the banner
    if (!localStorage.getItem('cookieAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000); // Show after 1 second
    }

    acceptCookieBtn.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        cookieBanner.classList.remove('show');
    });

    // Promo Modal Logic
    const promoModal = document.getElementById('promo-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const buyTemplateBtn = document.getElementById('buy-template-btn');

    // Show modal after 3 seconds on first load, or checking session storage to not annoy user too much
    if (!sessionStorage.getItem('promoShown')) {
        setTimeout(() => {
            promoModal.classList.add('show');
            sessionStorage.setItem('promoShown', 'true');
        }, 3000);
    }

    const closeModal = () => {
        promoModal.classList.remove('show');
    };

    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    promoModal.addEventListener('click', (e) => {
        if (e.target === promoModal) {
            closeModal();
        }
    });

    buyTemplateBtn.addEventListener('click', () => {
        alert("Grazie per l'interesse! Questa è una demo, l'acquisto ti reindirizzerebbe al checkout.");
        closeModal();
    });

    // Form Submission (Prevent default for demo)
    const preventivoForm = document.getElementById('preventivo-form');
    if (preventivoForm) {
        preventivoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Richiesta preventivo inviata con successo! (Simulazione)");
            preventivoForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Iscrizione alla newsletter completata! (Simulazione)");
            newsletterForm.reset();
        });
    }
});
