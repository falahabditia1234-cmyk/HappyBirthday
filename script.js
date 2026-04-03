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