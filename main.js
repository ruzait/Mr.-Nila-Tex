let products = [];

const SHEET_ID = '1suwLcLGU4W5oonN_5Mt4h6HHOzCLER7U';

function convertGoogleDriveLink(url) {
    if (!url || !url.includes('drive.google.com')) {
        return url;
    }
    const fileId = url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
    if (fileId) {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
    }
    return url;
}

async function loadProductsFromExcel() {
    try {
        const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Sheet1`;
        
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error('File not found');
        
        const csvText = await response.text();
        const rows = Papa.parse(csvText).data;
        
        if (rows.length < 2) throw new Error('No data found');
        
        const headers = rows[0].map(h => (h || '').trim());
        
        products = rows.slice(1).filter(row => row.length > 1 && row[0]).map((row, index) => {
            const item = {};
            headers.forEach((header, i) => {
                item[header] = (row[i] || '').trim();
            });
            
            return {
                id: index + 1,
                name: item.Name || item.name || item.Product || '',
                category: (item.Category || item.category || 'general').toLowerCase(),
                price: parseFloat(item.Price || item.price || 0),
                oldPrice: parseFloat(item.OldPrice || item.oldPrice || 0) || null,
                image: convertGoogleDriveLink(item.Image || item.image || 'images/products/placeholder.jpg'),
                backImage: convertGoogleDriveLink(item['Back Image'] || item.backImage || item.Image || item.image || 'images/products/placeholder.jpg'),
                badge: item.Badge || item.badge || '',
                rating: parseFloat(item.Rating || item.rating || 4.0),
                description: item.Description || item.description || ''
            };
        });
        
        console.log('Products loaded:', products.length);
        return true;
    } catch (error) {
        console.error('Error loading products:', error);
        return false;
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 1500);

    const loaded = await loadProductsFromExcel();
    
    if (loaded && products.length > 0) {
        renderProducts('all');
    }
    initDynamicContent();

    initNavbar();
    initSearch();
    initFilters();
    initHeroSlider();
    initTestimonials();
    initCountdown();
    initForms();
    initBackToTop();
    initScrollReveal();
    initWhatsAppFloat();
});

function initWhatsAppFloat() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    const hero = document.querySelector('.hero');
    
    if (whatsappBtn && hero) {
        whatsappBtn.classList.add('hidden');
        
        window.addEventListener('scroll', () => {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            const scrollY = window.scrollY;
            
            if (scrollY > heroBottom - 100) {
                whatsappBtn.classList.remove('hidden');
            } else {
                whatsappBtn.classList.add('hidden');
            }
        });
    }
}

function initDynamicContent() {
    const shopStartYear = 2022;
    const currentYear = new Date().getFullYear();
    const yearsExperience = currentYear - shopStartYear;
    
    document.querySelectorAll('.exp-number').forEach(el => {
        el.textContent = yearsExperience + '+';
    });

    document.querySelectorAll('.exp-text').forEach(el => {
        el.textContent = 'Years';
    });

    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = currentYear;
    });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    });

    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 0) {
            renderProducts('all');
            document.querySelectorAll('.product-card').forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                if (title.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        } else {
            renderProducts('all');
        }
    });
}

function renderProducts(filter) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    filteredProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', product.category);
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index % 6) * 100);

        const stars = generateStars(product.rating);
        const badgeHTML = product.badge 
            ? `<span class="badge badge-${product.badge}">${product.badge}</span>` 
            : '';

        card.innerHTML = `
            <div class="product-badges">${badgeHTML}</div>
            <div class="product-image">
                <div class="image-flip">
                    <img src="${product.image}" alt="${product.name}" class="image-front" loading="lazy">
                    <img src="${product.backImage}" alt="${product.name} back" class="image-back" loading="lazy">
                </div>
                <div class="product-overlay">
                    <button class="quick-view" data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="add-wishlist"><i class="far fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="price-current">Rs. ${product.price.toLocaleString()}</span>
                    ${product.oldPrice ? `<span class="price-old">Rs. ${product.oldPrice.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span>(${product.rating})</span>
                </div>
                <a href="#contact" class="visit-btn">
                    <i class="fas fa-store"></i>
                    <span>Visit Showroom</span>
                </a>
            </div>
        `;

        grid.appendChild(card);
    });

    AOS.refresh();

    document.querySelectorAll('.add-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });

    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const product = products.find(p => p.id === id);
            if (product) {
                const message = `Hi! I'm interested in:\n\n${product.name}\nPrice: Rs. ${product.price.toLocaleString()}\n\nPlease let me know if this is available.`;
                const whatsappUrl = `https://wa.me/94754552963?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    });
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            renderProducts(filter);
        });
    });
}

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

function initTestimonials() {
    const track = document.querySelector('.testimonials-track');
    const prev = document.querySelector('.testimonial-prev');
    const next = document.querySelector('.testimonial-next');
    let index = 0;

    function getVisibleSlides() {
        return window.innerWidth < 768 ? 1 : 3;
    }

    function updatePosition() {
        const slideWidth = track.querySelector('.testimonial-card').offsetWidth + 30;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    next.addEventListener('click', () => {
        const maxIndex = track.children.length - getVisibleSlides();
        if (index < maxIndex) {
            index++;
            updatePosition();
        }
    });

    prev.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updatePosition();
        }
    });
}

function initCountdown() {
    const countdown = document.getElementById('countdown');
    let countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 7);

    function update() {
        const now = new Date().getTime();
        const distance = countdownDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

function initForms() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            btn.style.background = '#27ae60';
            this.reset();

            setTimeout(() => {
                btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 2000);
    });

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        const input = this.querySelector('input');
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i>';
            input.value = '';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-arrow-right"></i>';
            }, 2000);
        }, 1500);
    });
}

function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initScrollReveal() {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(el => observer.observe(el));
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function getCategoryName(category) {
    const names = {
        men: "Men's Wear",
        women: "Women's Wear",
        kids: 'Kids Wear',
        fabric: 'Textiles'
    };
    return names[category] || category;
}
