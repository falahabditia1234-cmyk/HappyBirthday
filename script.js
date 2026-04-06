// PIN CONFIG - UBAH DI SINI
const CORRECT_PIN = "29112025"; // PIN kamu

// Game State
let clickCount = 0;
let currentSlide = 0;
const totalSlides = 8;

// DOM Elements
const pinScreen = document.getElementById('pinScreen');
const gameScreen = document.getElementById('gameScreen');
const birthdayScreen = document.getElementById('birthdayScreen');
const memoryScreen = document.getElementById('memoryScreen');

const pinInput = document.getElementById('pinInput');
const pinError = document.getElementById('pinError');
const clickCountEl = document.getElementById('clickCount');
const movingBtn = document.getElementById('movingBtn');
const slideIndicator = document.getElementById('slideIndicator');

// 1. CHECK PIN - FIXED
function checkPin() {
    console.log('PIN checked:', pinInput.value); // DEBUG
    const inputPin = pinInput.value.trim();
    
    if (inputPin === CORRECT_PIN) {
        pinScreen.classList.remove('active');
        gameScreen.classList.add('active');
        pinInput.value = '';
        console.log('PIN CORRECT!'); // DEBUG
    } else {
        pinError.classList.add('show');
        pinInput.style.border = '2px solid #ff6b6b';
        setTimeout(() => {
            pinError.classList.remove('show');
            pinInput.style.border = 'none';
        }, 2000);
        console.log('PIN WRONG'); // DEBUG
    }
}

// Enter key support
pinInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        checkPin();
    }
});

// 2. MINI GAME
movingBtn.addEventListener('click', () => {
    clickCount++;
    clickCountEl.textContent = clickCount;
    
    if (clickCount >= 19) {
        gameScreen.classList.remove('active');
        birthdayScreen.classList.add('active');
    }
});

// 3. NAVIGATION - SIMPLIFIED
function goToPin() {
    gameScreen.classList.remove('active');
    pinScreen.classList.add('active');
    resetGame();
}

function goToBirthday() {
    memoryScreen.classList.remove('active');
    birthdayScreen.classList.add('active');
}

function goToMemory() {
    birthdayScreen.classList.remove('active');
    memoryScreen.classList.add('active');
    updateSlideIndicator();
}

// 4. GALLERY SLIDES
function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add('active');
    
    updateSlideIndicator();
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    slides[currentSlide].classList.add('active');
    
    updateSlideIndicator();
}

function updateSlideIndicator() {
    slideIndicator.textContent = `${currentSlide + 1} / ${totalSlides}`;
}

function resetGame() {
    clickCount = 0;
    clickCountEl.textContent = '0';
}

// Touch/swipe untuk gallery
let startX = 0;
memoryScreen.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

memoryScreen.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
    }
});

// Auto-focus PIN input
window.onload = () => {
    pinInput.focus();
    console.log('Website loaded! PIN:', CORRECT_PIN);
};

// 💕 HUJAN HATI - TAMBAH SEBELUM AKHIR
let rainInterval;

function startHeartRain() {
    // Hapus hujan lama
    if (rainInterval) clearInterval(rainInterval);
    
    rainInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = `heart ${['blue','cyan','light'][Math.floor(Math.random()*3)]}`;
        heart.innerHTML = ['💙','💖','💕','💎'][Math.floor(Math.random()*4)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 4) + 's';
        heart.style.fontSize = (Math.random() * 8 + 14) + 'px';
        
        document.getElementById('gameScreen').appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }, 250); // Hati baru tiap 250ms
}

function stopHeartRain() {
    if (rainInterval) {
        clearInterval(rainInterval);
        rainInterval = null;
    }
    // Hapus semua hati
    document.querySelectorAll('.heart').forEach(h => h.remove());
}

// ← TAMBAH INI DI AKHIR SCRIPT

class LoveRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.drops = [];
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createDrop() {
        return {
            x: Math.random() * this.canvas.width,
            y: -30,
            vy: Math.random() * 3 + 2,
            size: Math.random() * 5 + 3,
            rotation: 0,
            opacity: 1,
            heart: ['💙','❄️','🐳','🐬','🔵','🩵','🌊'][Math.floor(Math.random()*7)]
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.drops.length < 100) {
            this.drops.push(this.createDrop());
        }

        this.drops.forEach((drop, i) => {
            drop.y += drop.vy;
            drop.rotation += 2;
            drop.opacity -= 0.008;

            // Glow effect
            this.ctx.save();
            this.ctx.globalAlpha = drop.opacity;
            this.ctx.shadowColor = '#ff69b4';
            this.ctx.shadowBlur = 12;
            this.ctx.font = `${drop.size*2}px Arial`;
            
            this.ctx.save();
            this.ctx.translate(drop.x, drop.y);
            this.ctx.rotate(drop.rotation * Math.PI / 180);
            this.ctx.fillText(drop.heart, 0, 0);
            this.ctx.restore();
            
            this.ctx.restore();

            if (drop.y > this.canvas.height || drop.opacity <= 0) {
                this.drops.splice(i, 1);
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Start hujan love
const loveRain = new LoveRain('loveRainCanvas');

// ← TAMBAH INI DI SCRIPT.JS

// Musik Happy Birthday
const music = document.getElementById('birthdayMusic');
const musicBtn = document.getElementById('musicToggle');

let musicPlaying = false;

// Auto play saat user interact pertama
function initMusic() {
    music.volume = 0.4; // Volume 40%
    
    musicBtn.addEventListener('click', toggleMusic);
    
    // User gesture untuk autoplay
    document.addEventListener('click', function firstClick() {
        if (!musicPlaying) {
            playMusic();
            document.removeEventListener('click', firstClick);
        }
    }, { once: true });
}

function playMusic() {
    music.play().then(() => {
        musicPlaying = true;
        musicBtn.classList.add('playing');
    }).catch(() => {
        // Fallback jika autoplay diblokir
    });
}

function toggleMusic() {
    if (musicPlaying) {
        music.pause();
        musicBtn.classList.remove('playing');
        musicPlaying = false;
    } else {
        playMusic();
    }
}

// Panggil saat halaman load
window.addEventListener('load', initMusic);

// Restart musik saat game mulai
function startGame() {
    // ... kode game kamu ...
    if (musicPlaying) {
        music.currentTime = 0;
        music.play();
    }
}