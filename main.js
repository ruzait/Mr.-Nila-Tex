let products = [];

const CONFIG = {
    SHEET_ID: '1suwLcLGU4W5oonN_5Mt4h6HHOzCLER7U',
    WHATSAPP_NUMBER: '94754552963',
    COUNTDOWN_END_DATE: '2026-04-01T23:59:59',
    SHOP_START_YEAR: 2022,
    SHOP_NAME: 'Mr. Nila Tex',
    SHOP_TAGLINE: 'Premium Clothing & Textiles',
    CURRENCY: 'Rs.',
    CURRENCY_SYMBOL: 'Rs. ',
    PLACEHOLDER_IMAGE: 'images/products/placeholder.jpg',
    PRODUCT_CODE_PREFIX: 'MNT',
    EXPERIENCE_SUFFIX: 'Years',
    SHOW_DISCOUNT_PERCENT: true,
    SHOW_BADGE: true,
    SHOW_ADD_TO_CART: false,
    PRICE_COLORS: {
        DEFAULT: '#111111',
        OLD_PRICE: '#888888',
        DISCOUNT_GOLD: '#c9a959',
        DISCOUNT_MEDIUM: '#e67e22',
        DISCOUNT_HIGH: '#e74c3c',
        DISCOUNT_SUPER: '#27ae60'
    },
    DISCOUNT_THRESHOLDS: {
        SUPER: 50,
        HIGH: 30,
        MEDIUM: 15
    }
};

const CATEGORY_COLORS = {
    men: { bg: '#3498db', text: '#ffffff' },
    women: { bg: '#e91e63', text: '#ffffff' },
    kids: { bg: '#27ae60', text: '#ffffff' },
    fabric: { bg: '#c9a959', text: '#1a1a1a' },
    textiles: { bg: '#c9a959', text: '#1a1a1a' }
};

const NEW_CATEGORY_COLORS = [
    { bg: '#9b59b6', text: '#ffffff' },
    { bg: '#e74c3c', text: '#ffffff' },
    { bg: '#e67e22', text: '#ffffff' },
    { bg: '#1abc9c', text: '#ffffff' },
    { bg: '#607d8b', text: '#ffffff' },
    { bg: '#f39c12', text: '#1a1a1a' },
    { bg: '#3f51b5', text: '#ffffff' },
    { bg: '#00bcd4', text: '#ffffff' },
    { bg: '#795548', text: '#ffffff' },
    { bg: '#8bc34a', text: '#1a1a1a' }
];

let categoryColorIndex = {};

function getBadgeStyle(badgeText, category, productIndex) {
    if (!badgeText) return '';
    
    const badge = badgeText.toLowerCase();
    const keywordColors = {
        'new': { bg: '#27ae60', text: '#ffffff' },
        'hot': { bg: '#e74c3c', text: '#ffffff' },
        'sale': { bg: '#e74c3c', text: '#ffffff' },
        'trend': { bg: '#3498db', text: '#ffffff' },
        'limited': { bg: '#e67e22', text: '#ffffff' },
        'best seller': { bg: '#9b59b6', text: '#ffffff' }
    };
    
    for (const [key, colors] of Object.entries(keywordColors)) {
        if (badge.includes(key)) {
            return `style="background:${colors.bg};color:${colors.text};"`;
        }
    }
    
    let categoryKey = (category || '').toLowerCase();
    if (CATEGORY_COLORS[categoryKey]) {
        const colors = CATEGORY_COLORS[categoryKey];
        return `style="background:${colors.bg};color:${colors.text};"`;
    }
    
    if (!categoryColorIndex[categoryKey]) {
        const count = Object.keys(categoryColorIndex).length;
        categoryColorIndex[categoryKey] = count % NEW_CATEGORY_COLORS.length;
    }
    const colors = NEW_CATEGORY_COLORS[categoryColorIndex[categoryKey]];
    return `style="background:${colors.bg};color:${colors.text};"`;
}

function formatCategoryName(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

function getPriceStyles(discount) {
    const { PRICE_COLORS, DISCOUNT_THRESHOLDS } = CONFIG;
    let badgeBg = PRICE_COLORS.DISCOUNT_GOLD;
    
    if (discount >= DISCOUNT_THRESHOLDS.SUPER) {
        badgeBg = PRICE_COLORS.DISCOUNT_SUPER;
    } else if (discount >= DISCOUNT_THRESHOLDS.HIGH) {
        badgeBg = PRICE_COLORS.DISCOUNT_HIGH;
    } else if (discount >= DISCOUNT_THRESHOLDS.MEDIUM) {
        badgeBg = PRICE_COLORS.DISCOUNT_MEDIUM;
    }
    
    return {
        priceColor: PRICE_COLORS.DEFAULT,
        oldPriceColor: PRICE_COLORS.OLD_PRICE,
        discountBadgeBg: badgeBg
    };
}

function formatPrice(price) {
    if (!price || isNaN(price)) return '0';
    return Math.round(price).toLocaleString();
}

function initDynamicFilters() {
    const categories = [...new Set(products.map(p => p.category))];
    const filterContainer = document.querySelector('.products-filter');
    
    let html = `<button class="filter-btn active" data-filter="all">All Items</button>`;
    categories.forEach(cat => {
        html += `<button class="filter-btn" data-filter="${cat}">${formatCategoryName(cat)}</button>`;
    });
    filterContainer.innerHTML = html;
    
    initFilters();
}

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
        const csvUrl = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Sheet1`;
        
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
            
            const price = parseFloat(item.Price || item.price || 0);
            const oldPrice = parseFloat(item.OldPrice || item.oldPrice || 0) || null;
            const sheetDiscount = parseFloat(item.Discount || item.discount || 0);
            const calculatedDiscount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;
            
            return {
                id: index + 1,
                name: item.Name || item.name || item.Product || '',
                category: (item.Category || item.category || 'general').toLowerCase(),
                price: price,
                oldPrice: oldPrice,
                discount: sheetDiscount > 0 ? sheetDiscount : calculatedDiscount,
                image: convertGoogleDriveLink(item.Image || item.image || CONFIG.PLACEHOLDER_IMAGE),
                backImage: convertGoogleDriveLink(item['Back Image'] || item.backImage || item.Image || item.image || CONFIG.PLACEHOLDER_IMAGE),
                badge: item.Badge || item.badge || '',
                description: item.Description || item.description || ''
            };
        });
        
        console.log('Products loaded from Google Sheets:', products.length);
        return true;
    } catch (error) {
        console.log('Google Sheets unavailable - no products displayed');
        products = [];
        return false;
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const isMobile = window.innerWidth <= 768;
    
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    const preloader = document.getElementById('preloader');
    
    await loadProductsFromExcel();
    
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 1500);

    if (products.length > 0) {
        initDynamicFilters();
        renderProducts('all');
    } else {
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = '<p style="text-align:center;padding:40px;">No products available at the moment.</p>';
    }
    initDynamicContent();

    initNavbar();
    initSearch();
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
        function checkScroll() {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            const scrollY = window.scrollY;
            
            if (scrollY > heroBottom) {
                whatsappBtn.classList.add('show');
            } else {
                whatsappBtn.classList.remove('show');
            }
        }
        
        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }
}

function initDynamicContent() {
    const currentYear = new Date().getFullYear();
    const yearsExperience = currentYear - CONFIG.SHOP_START_YEAR;
    
    document.querySelectorAll('.exp-number').forEach(el => {
        el.textContent = yearsExperience + '+';
    });

    document.querySelectorAll('.exp-text').forEach(el => {
        el.textContent = CONFIG.EXPERIENCE_SUFFIX;
    });

    document.querySelectorAll('.about-years').forEach(el => {
        el.textContent = yearsExperience;
    });

    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = currentYear;
    });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    window.addEventListener('scroll', () => {
        if (!navMenu.classList.contains('active')) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        navbar.classList.remove('menu-open');
        document.body.classList.remove('menu-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(document.body.dataset.scrollY || '0'));
    }

    function openMenu() {
        navToggle.classList.add('active');
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        navbar.classList.add('menu-open');
        document.body.classList.add('menu-open');
        document.body.dataset.scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
    }

    navToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navOverlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });
}

function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    
    if (!searchBtn || !searchOverlay || !searchClose || !searchInput) return;

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

        let badgeHTML = '';
        if (product.badge) {
            const badgeStyle = getBadgeStyle(product.badge, product.category, index);
            badgeHTML = `<span class="badge" ${badgeStyle}>${product.badge}</span>`;
        }

        const categoryName = formatCategoryName(product.category);
        const discount = product.discount || 0;
        const priceStyles = getPriceStyles(discount);
        
        card.innerHTML = `
            <div class="product-image">
                <div class="product-badges">${badgeHTML}</div>
                <div class="image-flip">
                    <img src="${product.image}" alt="${product.name}" class="image-front" loading="lazy">
                    <img src="${product.backImage}" alt="${product.name} back" class="image-back" loading="lazy">
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${categoryName}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price-box">
                    <span class="price-current" style="color:${priceStyles.priceColor}">${CONFIG.CURRENCY_SYMBOL}${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="price-old" style="color:${priceStyles.oldPriceColor}">${CONFIG.CURRENCY_SYMBOL}${formatPrice(product.oldPrice)}</span>` : ''}
                    ${discount > 0 ? `<span class="discount-tag" style="background:${priceStyles.discountBadgeBg}">-${discount}%</span>` : ''}
                </div>
                <button class="product-btn whatsapp-btn" data-id="${product.id}">
                    <i class="fab fa-whatsapp"></i>
                    <span>Order via WhatsApp</span>
                </button>
            </div>
        `;

        grid.appendChild(card);
    });

    document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const product = products.find(p => p.id === id);
            if (product) {
                const category = formatCategoryName(product.category);
                const discount = product.discount || 0;
                const message = `✨ *${CONFIG.SHOP_NAME.toUpperCase()}* ✨\n\n━━━━━━━━━━━━━━━━━━\n🛍️ *Product:* ${product.name}\n📂 *Category:* ${category}\n💰 *Price:* ${CONFIG.CURRENCY_SYMBOL}${formatPrice(product.price)}${product.oldPrice ? `\n📉 *Was:* ${CONFIG.CURRENCY_SYMBOL}${formatPrice(product.oldPrice)} (${discount}% OFF)` : ''}\n📦 *Code:* ${CONFIG.PRODUCT_CODE_PREFIX}-${String(product.id).padStart(4, '0')}\n━━━━━━━━━━━━━━━━━━\n\nHello! I'm interested in this product. Please share more details. 👋`;
                const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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
    
    if (!track || !prev || !next) return;
    
    let index = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function getVisibleSlides() {
        if (window.innerWidth <= 400) return 1;
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function updatePosition() {
        const cards = track.querySelectorAll('.testimonial-card');
        if (cards.length === 0) return;
        const slideWidth = cards[0].offsetWidth + (window.innerWidth <= 768 ? 15 : 30);
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    next.addEventListener('click', () => {
        const maxIndex = Math.max(0, track.children.length - getVisibleSlides());
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

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                next.click();
            } else {
                prev.click();
            }
        }
    }

    window.addEventListener('resize', () => {
        index = 0;
        updatePosition();
    });
}

function initCountdown() {
    const countdown = document.getElementById('countdown');
    if (!countdown) return;
    
    let countdownDate = new Date(CONFIG.COUNTDOWN_END_DATE).getTime();

    function update() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

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

    if (contactForm) {
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
    }

    if (newsletterForm) {
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
}

function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

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


