class FishingGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();

        this.gameState = 'idle'; // idle, playing, paused
        this.score = 0;
        this.catches = 0;
        this.timeLeft = 60;
        this.highScores = JSON.parse(localStorage.getItem('fishingScores')) || [];

        this.hook = { x: this.canvas.width / 2, y: 50, width: 15, height: 15 };
        this.fish = [];
        this.particles = [];
        this.power = 0;
        this.powerIncreasing = true;

        this.initEventListeners();
        this.generateFish();
        this.updateScoreBoard();
    }

    setupCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    initEventListeners() {
        document.getElementById('startGameBtn').addEventListener('click', () => this.start());
        document.getElementById('resetGameBtn').addEventListener('click', () => this.reset());
        this.canvas.addEventListener('mousedown', () => this.startPowerIncrease());
        this.canvas.addEventListener('mouseup', () => this.castLine());
        this.canvas.addEventListener('mousemove', (e) => this.updateMousePosition(e));
        this.canvas.addEventListener('click', (e) => this.checkFishClick(e));
    }

    start() {
        this.gameState = 'playing';
        this.score = 0;
        this.catches = 0;
        this.timeLeft = 60;
        this.fish = [];
        this.generateFish();
        this.updateScoreBoard();
        this.countDown();
        this.animate();
    }

    reset() {
        this.gameState = 'idle';
        this.score = 0;
        this.catches = 0;
        this.timeLeft = 60;
        this.fish = [];
        this.particles = [];
        this.hook = { x: this.canvas.width / 2, y: 50, width: 15, height: 15 };
        this.updateScoreBoard();
        this.draw();
    }

    startPowerIncrease() {
        if (this.gameState !== 'playing') return;
        this.powerIncreasing = true;
    }

    castLine() {
        this.powerIncreasing = false;
        if (this.gameState !== 'playing') return;

        const angle = (Math.random() - 0.5) * Math.PI / 3;
        const speed = this.power * 10;
        
        this.fish.forEach(fish => {
            const dist = Math.sqrt(
                Math.pow(this.hook.x - fish.x, 2) + 
                Math.pow(this.hook.y - fish.y, 2)
            );
            
            if (dist < 50 + this.power) {
                this.catchFish(fish);
            }
        });
    }

    updateMousePosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Constrain hook position
        this.hook.x = Math.max(this.hook.width, Math.min(x, this.canvas.width - this.hook.width));
        this.hook.y = Math.max(this.hook.height, Math.min(y, this.canvas.height - this.hook.height));
    }

    generateFish() {
        for (let i = 0; i < 8; i++) {
            this.fish.push({
                x: Math.random() * this.canvas.width,
                y: 100 + Math.random() * (this.canvas.height - 150),
                width: 30 + Math.random() * 20,
                height: 15 + Math.random() * 10,
                speed: 1 + Math.random() * 2,
                direction: Math.random() > 0.5 ? 1 : -1,
                color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`
            });
        }
    }

    checkFishClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.fish.forEach((fish, index) => {
            if (x > fish.x && x < fish.x + fish.width &&
                y > fish.y && y < fish.y + fish.height) {
                this.catchFish(fish, index);
            }
        });
    }

    catchFish(fish, index) {
        this.catches++;
        this.score += Math.round(fish.width * fish.height);
        
        // Particle effect
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: fish.x + fish.width / 2,
                y: fish.y + fish.height / 2,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1,
                color: fish.color
            });
        }

        this.fish.splice(index, 1);
        if (this.fish.length < 8) {
            this.fish.push({
                x: Math.random() * this.canvas.width,
                y: 100 + Math.random() * (this.canvas.height - 150),
                width: 30 + Math.random() * 20,
                height: 15 + Math.random() * 10,
                speed: 1 + Math.random() * 2,
                direction: Math.random() > 0.5 ? 1 : -1,
                color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`
            });
        }

        this.updateScoreBoard();
        showToast(`Tangkapan! +${Math.round(fish.width * fish.height)} poin`, 'success');
    }

    countDown() {
        if (this.gameState !== 'playing') return;
        
        this.timeLeft--;
        document.getElementById('gameTime').textContent = this.timeLeft;

        if (this.timeLeft <= 0) {
            this.endGame();
        } else {
            setTimeout(() => this.countDown(), 1000);
        }
    }

    endGame() {
        this.gameState = 'idle';
        this.highScores.push(this.score);
        this.highScores.sort((a, b) => b - a);
        this.highScores = this.highScores.slice(0, 5);
        localStorage.setItem('fishingScores', JSON.stringify(this.highScores));
        this.updateScoreBoard();
        showToast(`Game Over! Skor Akhir: ${this.score}`, 'success');
    }

    updateScoreBoard() {
        document.getElementById('gameScore').textContent = this.score;
        document.getElementById('catchCount').textContent = this.catches;

        const scoresList = document.getElementById('scoresList');
        scoresList.innerHTML = '';
        this.highScores.forEach((score, index) => {
            const li = document.createElement('li');
            li.textContent = `${score} poin`;
            scoresList.appendChild(li);
        });
    }

    animate() {
        if (this.gameState !== 'playing') return;

        this.draw();
        this.update();

        requestAnimationFrame(() => this.animate());
    }

    update() {
        // Update power
        if (this.powerIncreasing && this.power < 1) {
            this.power += 0.02;
        }
        if (this.power >= 1) this.powerIncreasing = false;
        document.getElementById('powerFill').style.width = (this.power * 100) + '%';

        // Update fish
        this.fish.forEach(fish => {
            fish.x += fish.speed * fish.direction;
            if (fish.x < 0 || fish.x + fish.width > this.canvas.width) {
                fish.direction *= -1;
            }
        });

        // Update particles
        this.particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life -= 0.02;

            if (p.life <= 0) {
                this.particles.splice(index, 1);
            }
        });
    }

    draw() {
        // Draw background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87ceeb');
        gradient.addColorStop(1, '#e0f6ff');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw fishing line
        this.ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.hook.x, this.hook.y);
        this.ctx.stroke();

        // Draw hook
        this.ctx.fillStyle = '#ffd700';
        this.ctx.beginPath();
        this.ctx.arc(this.hook.x, this.hook.y, this.hook.width, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw fish
        this.fish.forEach(fish => {
            this.ctx.fillStyle = fish.color;
            this.ctx.beginPath();
            // Simple fish shape
            this.ctx.ellipse(fish.x + fish.width / 2, fish.y + fish.height / 2,
                fish.width / 2, fish.height / 2, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw eye
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.arc(fish.x + fish.width - 5, fish.y + fish.height / 2, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw particles
        this.particles.forEach(p => {
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }
}

// Initialize game
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new FishingGame();
});