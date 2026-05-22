// ===== Product Data =====
const products = [
    {
        id: 1,
        title: 'Mobile Legend - Elite Account',
        category: 'mobile-legend',
        price: 'Rp 150.000',
        rating: 4.8,
        reviews: 245,
        description: 'Akun ML dengan hero lengkap dan skin legendaris',
        stock: 15,
        sold: 342,
        icon: 'fas fa-mobile-alt'
    },
    {
        id: 2,
        title: 'Free Fire - Rank Master',
        category: 'ff',
        price: 'Rp 120.000',
        rating: 4.7,
        reviews: 189,
        description: 'Akun FF dengan rank master dan item premium',
        stock: 22,
        sold: 298,
        icon: 'fas fa-fire'
    },
    {
        id: 3,
        title: 'PUBG Mobile - Top Tier',
        category: 'pubg',
        price: 'Rp 200.000',
        rating: 4.9,
        reviews: 156,
        description: 'Akun PUBG dengan stats bagus dan skin rare',
        stock: 8,
        sold: 127,
        icon: 'fas fa-crosshairs'
    },
    {
        id: 4,
        title: 'Valorant - Diamond Account',
        category: 'valorant',
        price: 'Rp 250.000',
        rating: 4.6,
        reviews: 98,
        description: 'Akun Valorant diamond dengan agent premium',
        stock: 5,
        sold: 84,
        icon: 'fas fa-shield-alt'
    },
    {
        id: 5,
        title: 'Clash of Clans - TH12',
        category: 'coc',
        price: 'Rp 180.000',
        rating: 4.8,
        reviews: 112,
        description: 'Akun COC Town Hall 12 dengan bangunan upgrade',
        stock: 12,
        sold: 203,
        icon: 'fas fa-chess-rook'
    },
    {
        id: 6,
        title: 'Roblox - Premium Bundle',
        category: 'roblox',
        price: 'Rp 100.000',
        rating: 4.5,
        reviews: 76,
        description: 'Akun Roblox dengan Robux dan item eksklusif',
        stock: 25,
        sold: 156,
        icon: 'fas fa-cube'
    },
    {
        id: 7,
        title: 'Mobile Legend - Top Up',
        category: 'mobile-legend',
        price: 'Rp 175.000',
        rating: 4.7,
        reviews: 198,
        description: 'Akun ML dengan credit tinggi dan hero terbaru',
        stock: 18,
        sold: 267,
        icon: 'fas fa-mobile-alt'
    },
    {
        id: 8,
        title: 'Free Fire - Weapon Master',
        category: 'ff',
        price: 'Rp 140.000',
        rating: 4.6,
        reviews: 143,
        description: 'Akun FF dengan koleksi senjata lengkap',
        stock: 20,
        sold: 224,
        icon: 'fas fa-fire'
    },
];

// ===== DOM Elements =====
const productGrid = document.getElementById('productGrid');
const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.close');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    addSmoothScrolling();
    observeElements();
});

// ===== Load Products =====
function loadProducts() {
    productGrid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s both`;
        
        const stockClass = product.stock < 10 ? 'low' : '';
        const stockBadge = product.stock < 5 ? '<span class="product-badge">Stok Terbatas!</span>' : '';
        
        productCard.innerHTML = `
            <div class="product-image">
                ${stockBadge}
                <i class="${product.icon}"></i>
            </div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-rating">
                    <span class="stars">⭐ ${product.rating}</span>
                    <span>(${product.reviews})</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">${product.price}</div>
                    <div class="product-stock ${stockClass}">Stok: ${product.stock}</div>
                </div>
            </div>
        `;
        
        productCard.addEventListener('click', () => openModal(product));
        productGrid.appendChild(productCard);
    });
}

// ===== Modal Functions =====
function openModal(product) {
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalRating').textContent = product.rating;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalStock').textContent = product.stock;
    document.getElementById('modalSold').textContent = product.sold;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// ===== Navigation =====
function setupEventListeners() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== Smooth Scroll Functions =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== Contact Form =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        nama: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        subjek: contactForm.querySelectorAll('input[type="text"]')[1].value,
        pesan: contactForm.querySelector('textarea').value
    };
    
    // Validasi form
    if (!data.nama || !data.email || !data.subjek || !data.pesan) {
        showNotification('Semua field harus diisi!', 'warning');
        return;
    }
    
    // Simulasi pengiriman
    showNotification('Pesan Anda sedang dikirim ke admin...', 'info');
    
    setTimeout(() => {
        showNotification('Terima kasih! Pesan Anda telah dikirim. Admin akan menghubungi Anda segera.', 'success');
        contactForm.reset();
    }, 1500);
});

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 30px;
        border-radius: 10px;
        background: ${type === 'success' ? '#00d084' : type === 'warning' ? '#ffa500' : '#00d4ff'};
        color: ${type === 'success' ? 'white' : type === 'warning' ? 'white' : 'white'};
        font-weight: 600;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Scroll Animations =====
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .feature-card, .category-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== Active Navigation Link =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Add CSS Animation Rules =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(500px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(500px);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #00d4ff;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===== Filter Products by Category =====
function filterByCategory(category) {
    const filteredProducts = category ? products.filter(p => p.category === category) : products;
    productGrid.innerHTML = '';
    loadProducts();
}

// ===== Category Card Click Event =====
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        filterByCategory(category);
        scrollToSection('products');
    });
});

// ===== Search Functionality =====
function searchProducts(query) {
    const filtered = products.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
    
    productGrid.innerHTML = '';
    
    if (filtered.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">Produk tidak ditemukan</p>';
        return;
    }
    
    filtered.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const stockClass = product.stock < 10 ? 'low' : '';
        const stockBadge = product.stock < 5 ? '<span class="product-badge">Stok Terbatas!</span>' : '';
        
        productCard.innerHTML = `
            <div class="product-image">
                ${stockBadge}
                <i class="${product.icon}"></i>
            </div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-rating">
                    <span class="stars">⭐ ${product.rating}</span>
                    <span>(${product.reviews})</span>
                </div>
                <p class="product-description">${product.description