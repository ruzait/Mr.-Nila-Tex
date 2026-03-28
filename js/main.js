document.addEventListener('DOMContentLoaded', () => {
    initDynamicDates();
    initNavbar();
    initSmoothScroll();
    initWhatsAppButtons();
    initGSAPAnimations();
    initForm();
    initWhatsAppFloat();
    initGalleryTouch();
});

function initDynamicDates() {
    const currentYear = new Date().getFullYear();
    const establishmentYear = 2020;
    
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = currentYear;
    }
    
    const yearsOfExcellence = currentYear - establishmentYear;
    const yearsOfExcellenceEl = document.getElementById('yearsOfExcellence');
    if (yearsOfExcellenceEl) {
        yearsOfExcellenceEl.textContent = yearsOfExcellence + '+';
    }
    
    const yearsTextEl = document.getElementById('yearsText');
    if (yearsTextEl) {
        yearsTextEl.textContent = yearsOfExcellence + '+';
    }
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navClose = document.getElementById('navClose');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    if (navClose) {
        navClose.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.classList.contains('book-now-btn')) return;
        anchor.addEventListener('click', function(e) {
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
}

function initWhatsAppButtons() {
    const whatsappNumber = '94754740232';
    document.querySelectorAll('.book-now-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const message = this.getAttribute('data-message') || 'Hello! I would like to book Al-Zakki Banquet Hall for an event. Can you please provide more information?';
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    });
}

function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    gsap.fromTo('.about-image',
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.about',
                start: 'top 70%'
            }
        }
    );

    gsap.fromTo('.about-content',
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.2,
            scrollTrigger: {
                trigger: '.about',
                start: 'top 70%'
            }
        }
    );

    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        gsap.fromTo(item,
            { 
                opacity: 0, 
                x: -30 
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: 0.5 + (index * 0.15),
                scrollTrigger: {
                    trigger: '.features-list',
                    start: 'top 80%'
                },
                onComplete: () => {
                    gsap.fromTo(item.querySelector('.feature-icon'),
                        { scale: 0, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
                    );
                }
            }
        );
    });

    gsap.fromTo('.service-card',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%'
            }
        }
    );

    gsap.fromTo('.gallery-item',
        { opacity: 0, scale: 0.9 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.gallery-grid',
                start: 'top 80%'
            }
        }
    );

    gsap.fromTo('.pricing-card',
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.pricing-grid',
                start: 'top 80%'
            }
        }
    );

    gsap.fromTo('.contact-info',
        { opacity: 0, x: -30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 70%'
            }
        }
    );

    gsap.fromTo('.contact-form',
        { opacity: 0, x: 30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 70%'
            }
        }
    );
}

function initForm() {
    const form = document.getElementById('bookingForm');
    const dateInput = document.getElementById('eventDate');

    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const eventType = document.getElementById('eventType').value;
        const eventDate = document.getElementById('eventDate').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value;

        const eventTypeNames = {
            'wedding': 'Wedding Ceremony',
            'walima': 'Walima / Lunch Party',
            'conference': 'Conference Meeting',
            'official': 'Official Event',
            'awarding': 'Awarding Ceremony',
            'competition': 'Competition Event',
            'other': 'Other'
        };

        const whatsappMessage = `*🏛️ AL-ZAKKI BANQUET HALL - BOOKING REQUEST*%0A%0A` +
            `👤 *Name:* ${name}%0A` +
            `📞 *Phone:* ${phone}%0A` +
            `📧 *Email:* ${email}%0A` +
            `🎉 *Event Type:* ${eventTypeNames[eventType] || eventType}%0A` +
            `📅 *Event Date:* ${eventDate}%0A` +
            `👥 *Expected Guests:* ${guests || 'Not specified'}%0A` +
            `💬 *Additional Details:* ${message || 'None'}`;

        const whatsappUrl = `https://wa.me/94754740232?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
        
        form.reset();
    });
}

function initWhatsAppFloat() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    const contactSection = document.querySelector('#contact');

    if (whatsappBtn && contactSection) {
        function updateWhatsAppButton() {
            const scrollPos = window.pageYOffset;
            const contactTop = contactSection.offsetTop;
            const viewportHeight = window.innerHeight;
            
            if (scrollPos > 300 && scrollPos + viewportHeight < contactTop + 100) {
                whatsappBtn.classList.add('visible');
            } else {
                whatsappBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', updateWhatsAppButton);
        updateWhatsAppButton();
    }
}

function initGalleryTouch() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
            }
        });
    });
}
