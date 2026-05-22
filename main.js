// Global Configuration
const CONFIG = {
    debugMode: false,
    soundEnabled: true,
    autoSave: true,
    theme: localStorage.getItem('theme') || 'light'
};

// Utility Functions
const showToast = (message, type = 'success') => {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => toast.classList.remove('show'), 3000);
};

const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

// Initialize Theme
document.addEventListener('DOMContentLoaded', () => {
    if (CONFIG.theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Smooth Scroll
    document.querySelectorAll('[data-scroll]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.closest('[data-scroll]').getAttribute('data-scroll');
            const section = document.getElementById(target);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Particle System
    createParticles();

    // Filter System
    initializeFilterSystem();

    // Contact Form
    initializeContactForm();

    // Gallery
    initializeGallery();
});

// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(30, 64, 175, ${Math.random() * 0.5});
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Filter System
function initializeFilterSystem() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.tip-card, .gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category') || card.getAttribute('data-filter');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Pesan berhasil dikirim! Kami akan membalas dalam 24 jam.', 'success');
        form.reset();
    });
}

// Gallery
function initializeGallery() {
    const galleryData = [
        { title: 'Tangkapan Trophy', category: 'trophy' },
        { title: 'Lele Besar', category: 'species' },
        { title: 'Teknik Casting', category: 'technique' },
        { title: 'Trout Mulus', category: 'species' },
        { title: 'Hasil Malam', category: 'trophy' },
        { title: 'Gurame Jumbo', category: 'species' },
        { title: 'Teknik Float', category: 'technique' },
        { title: 'Ikan Mas', category: 'species' },
    ];

    const gallery = document.getElementById('gallery');
    galleryData.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-filter', item.category);
        galleryItem.innerHTML = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-image" style="font-size: 3rem; color: white; opacity: 0.5;"></i>
            </div>
            <div class="gallery-overlay">
                <h3>${item.title}</h3>
                <p>${item.category}</p>
            </div>
        `;
        gallery.appendChild(galleryItem);
    });
}

// Water Canvas Animation
function initWaterCanvas() {
    const canvas = document.getElementById('waterCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;
    const waves = [
        { amplitude: 20, frequency: 0.01, speed: 0.05, offset: 0 },
        { amplitude: 15, frequency: 0.015, speed: 0.03, offset: 50 }
    ];

    function drawWaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;

        waves.forEach(wave => {
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                const y = wave.amplitude * Math.sin(x * wave.frequency + time * wave.speed + wave.offset) + canvas.height / 2;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        });

        time++;
        requestAnimationFrame(drawWaves);
    }

    drawWaves();
}

// Initialize on load
window.addEventListener('load', () => {
    initWaterCanvas();
});