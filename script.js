document.addEventListener('DOMContentLoaded', () => {

    const MOBILE_BREAKPOINT = 1023;
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

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

    /* ========== CARRUSEL NATURAL MOBILE & DESKTOP ========== */
    function createUltraNaturalCarousel(trackSelector) {
        const track = document.querySelector(trackSelector);
        if (!track) return;

        // estilos nativos para mobile
        track.style.overflowX = 'auto';
        track.style.scrollBehavior = 'smooth';
        track.style.webkitOverflowScrolling = 'touch';

        // arrastre con mouse en desktop
        if (!isMobile) {
            let isDown = false;
            let startX, scrollLeft;

            track.style.cursor = 'grab';

            track.addEventListener('mousedown', (e) => {
                isDown = true;
                track.style.cursor = 'grabbing';
                startX = e.pageX - track.offsetLeft;
                scrollLeft = track.scrollLeft;
                document.body.style.userSelect = 'none';
            });

            track.addEventListener('mouseleave', () => {
                isDown = false;
                track.style.cursor = 'grab';
                document.body.style.userSelect = '';
            });

            track.addEventListener('mouseup', () => {
                isDown = false;
                track.style.cursor = 'grab';
                document.body.style.userSelect = '';
            });

            track.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - track.offsetLeft;
                const walk = (x - startX);
                track.scrollLeft = scrollLeft - walk;
            });
        }
    }

    /* ========== INICIALIZACIÓN DE CARRUSELES ========== */
    createUltraNaturalCarousel(".whyus-grid-scroller");
    createUltraNaturalCarousel(".testimonials-grid-scroller");

});