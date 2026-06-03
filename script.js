document.addEventListener('DOMContentLoaded', () => {

    const MOBILE_BREAKPOINT = 1023;

    /* ========== HEADER FIJO ========== */
    const header = document.getElementById('header');
    if (header) {
        // Ajustar el offset del body según la altura real del header
        const setBodyOffset = () => {
            const headerHeight = header.offsetHeight;
            document.body.style.paddingTop = `${headerHeight}px`;
        };
        setBodyOffset();
        window.addEventListener('resize', setBodyOffset);

        // Sombra sutil al hacer scroll
        const handleScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    /* ========== ANIMACIONES POR SCROLL ========== */
    const animatedElements = document.querySelectorAll(
        '.section-title, .flavor-card, .reason-card, .testimonial-card, .story-text, .story-image, .gallery-item, .location-card, .cta-inner'
    );
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0, rootMargin: '0px' });
        animatedElements.forEach(el => observer.observe(el));
    }

    /* ========== MENÚ MÓVIL CON OVERLAY ========== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('#main-nav');
    const overlay = document.getElementById('menuOverlay'); // <div id="menuOverlay" class="menu-overlay"></div> en tu HTML

    if (mobileMenuBtn && mainNav && overlay) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');

        const toggleMenu = () => {
            const isOpen = mainNav.classList.toggle('open');
            mobileMenuBtn.classList.toggle('is-active', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            overlay.classList.toggle('overlay-visible', isOpen);
            document.body.classList.toggle('no-scroll', isOpen);
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Cerrar menú al hacer click en un link
        mainNav.querySelectorAll('a')?.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= MOBILE_BREAKPOINT && mainNav.classList.contains('open')) toggleMenu();
            });
        });

        // Cerrar menú si se cambia a desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > MOBILE_BREAKPOINT && mainNav.classList.contains('open')) toggleMenu();
        });
    }

    /* ========== FILTRO DE SABORES ========== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const flavorCards = document.querySelectorAll('.flavor-card');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            flavorCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const isVisible = filter === 'all' || category === filter;
                const transitionTime = parseFloat(getComputedStyle(card).transitionDuration) * 1000 || 300;
                if (isVisible) {
                    card.style.display = 'block';
                    requestAnimationFrame(() => card.classList.add('visible'));
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => { card.style.display = 'none'; }, transitionTime);
                }
            });
        });
    });

    /* ========== BOTONES FLOTANTES DE PEDIDO ========== */
    const orderFab = document.querySelector('.order-fab');
    const flavorSection = document.querySelector('#flavors');
    const siteFooter = document.querySelector('footer');
    if (orderFab && flavorSection) {
        const toggleOrderFab = () => {
            const rect = flavorSection.getBoundingClientRect();
            // Mostrar solo cuando #flavors ha subido al menos a la mitad de la pantalla
            const inFlavors = rect.top < window.innerHeight / 2;
            const inFooter = siteFooter && siteFooter.getBoundingClientRect().top < window.innerHeight;
            orderFab.classList.toggle('order-fab--visible', inFlavors && !inFooter);
        };
        window.addEventListener('scroll', toggleOrderFab, { passive: true });
        window.addEventListener('resize', toggleOrderFab);
        toggleOrderFab();
    }

    /* ========== VIDEO LAZY PLAY ========== */
    const lazyVideos = document.querySelectorAll('video[preload="none"]');
    if (lazyVideos.length > 0) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        lazyVideos.forEach(v => videoObserver.observe(v));
    }

    /* ========== CARRUSEL CONTINUO ========== */
    function createMarqueeCarousel(trackSelector, speed = 0.4) {
        const track = document.querySelector(trackSelector);
        if (!track) return;

        track.style.scrollBehavior = 'auto';
        track.style.scrollSnapType = 'none';
        track.style.webkitOverflowScrolling = 'touch';

        // La posición se acumula en una variable propia para que el avance
        // fraccionario funcione aunque el navegador redondee scrollLeft.
        let pos = 0;

        const step = () => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (maxScroll > 0) {
                pos += speed;
                // Al llegar al final, vuelve de inmediato al inicio
                if (pos >= maxScroll) pos = 0;
                track.scrollLeft = pos;
            }
            requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    // Inicializar carruseles
    createMarqueeCarousel('.whyus-grid-scroller', 0.4);
    createMarqueeCarousel('.testimonials-grid-scroller', 0.4);

});