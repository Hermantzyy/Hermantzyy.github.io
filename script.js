// Menu Data
const menuData = [
    {
        id: 1,
        name: 'Espresso',
        category: 'coffee',
        price: 25000,
        description: 'Kopi klasik yang kuat dan pekat',
        icon: '☕'
    },
    {
        id: 2,
        name: 'Cappuccino',
        category: 'coffee',
        price: 35000,
        description: 'Sempurna dengan busa susu yang lembut',
        icon: '☕'
    },
    {
        id: 3,
        name: 'Latte',
        category: 'coffee',
        price: 38000,
        description: 'Creamy dan smooth dengan sentuhan vanilla',
        icon: '☕'
    },
    {
        id: 4,
        name: 'Americano',
        category: 'coffee',
        price: 28000,
        description: 'Kopi hitam dengan rasa yang dalam',
        icon: '☕'
    },
    {
        id: 5,
        name: 'Croissant',
        category: 'pastry',
        price: 35000,
        description: 'Pastry almond yang renyah dan gurih',
        icon: '🥐'
    },
    {
        id: 6,
        name: 'Cheesecake',
        category: 'pastry',
        price: 45000,
        description: 'Lembut dengan tekstur creamy yang nikmat',
        icon: '🍰'
    },
    {
        id: 7,
        name: 'Chocolate Cake',
        category: 'pastry',
        price: 50000,
        description: 'Cake coklat premium dengan isian raichi',
        icon: '🍰'
    },
    {
        id: 8,
        name: 'Brownie',
        category: 'pastry',
        price: 30000,
        description: 'Chocolatey dan fudgy, cocok dengan kopi',
        icon: '🍫'
    },
    {
        id: 9,
        name: 'Iced Tea',
        category: 'drink',
        price: 18000,
        description: 'Teh dingin yang menyegarkan dengan lemon',
        icon: '🧃'
    },
    {
        id: 10,
        name: 'Smoothie Bowl',
        category: 'drink',
        price: 42000,
        description: 'Bowl buah-buahan segar dengan granola',
        icon: '🥤'
    },
    {
        id: 11,
        name: 'Iced Chocolate',
        category: 'drink',
        price: 32000,
        description: 'Coklat dingin yang kaya dan lezat',
        icon: '🍫'
    },
    {
        id: 12,
        name: 'Fresh Juice',
        category: 'drink',
        price: 28000,
        description: 'Jus jeruk segar yang nutritious',
        icon: '🧃'
    }
];

// Gallery Images Data
const galleryData = [
    { icon: '🏪', title: 'Suasana Nyaman' },
    { icon: '☕', title: 'Kopi Berkualitas' },
    { icon: '🎨', title: 'Interior Modern' },
    { icon: '🪑', title: 'Tempat Bekerja' },
    { icon: '🌟', title: 'Layanan Prima' },
    { icon: '🎵', title: 'Musik Santai' }
];

// Current Filter
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderGallery();
    setupEventListeners();
});

// Render Menu Items
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    const filteredMenu = currentFilter === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === currentFilter);

    filteredMenu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="menu-item-image">${item.icon}</div>
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    <span class="price">Rp ${item.price.toLocaleString('id-ID')}</span>
                    <button class="btn btn-secondary" onclick="addToCart('${item.name}', ${item.price})">
                        Pesan
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// Render Gallery
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';

    galleryData.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `${item.icon}`;
        galleryGrid.appendChild(galleryItem);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderMenu();
        });
    });

    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Pesan Anda telah terkirim! Terima kasih telah menghubungi kami.');
            contactForm.reset();
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Add to Cart Function
function addToCart(itemName, price) {
    showNotification(`${itemName} ditambahkan ke keranjang! (Rp ${price.toLocaleString('id-ID')})`);
    // You can implement actual cart functionality here
}

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #8B6F47;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll Animation
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

// Observe menu items on scroll
setTimeout(() => {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
}, 500);