let noBtnClickCount = 0;
let fireworksInstance = null;
let audioUnmuted = false;
const noBtn = document.getElementById('noBtn');
const suspenseMusic = document.getElementById('suspenseMusic');
const romanticMusic = document.getElementById('romanticMusic');

// Set volumes
suspenseMusic.volume = 0.6;
romanticMusic.volume = 0.4;

// Start muted autoplay on page load (bypasses browser autoplay restrictions)
window.addEventListener('load', function() {
    suspenseMusic.play().catch(error => {
        console.log('Autoplay started muted');
    });
    
    // Force GIF animation by reloading them after a short delay
    setTimeout(forceGifAnimation, 100);
});

// Function to force GIF animations to play (especially on mobile)
function forceGifAnimation() {
    const allGifs = document.querySelectorAll('img[src$=".gif"]');
    allGifs.forEach(gif => {
        const src = gif.src;
        gif.src = '';
        gif.src = src;
    });
    console.log('GIF animations forced to reload');
}

// Error handling for audio files
suspenseMusic.addEventListener('error', function(e) {
    console.error('Suspense music failed to load:', e);
    console.log('Attempted path:', suspenseMusic.src);
});

romanticMusic.addEventListener('error', function(e) {
    console.error('Romantic music failed to load:', e);
    console.log('Attempted path:', romanticMusic.src);
});

// Success handlers
suspenseMusic.addEventListener('canplaythrough', function() {
    console.log('Suspense music loaded successfully!');
});

romanticMusic.addEventListener('canplaythrough', function() {
    console.log('Romantic music loaded successfully!');
});

// Function to unmute audio on first user interaction
function unmuteAudio() {
    if (!audioUnmuted) {
        suspenseMusic.muted = false;
        audioUnmuted = true;
        console.log('Audio unmuted!');
    }
}

// Unmute on any user interaction
['click', 'touchstart', 'keydown', 'mousemove'].forEach(event => {
    document.addEventListener(event, unmuteAudio, { once: true });
});

function switchToRomanticMusic() {
    suspenseMusic.pause();
    suspenseMusic.currentTime = 0;
    romanticMusic.play().then(() => {
        console.log('Romantic music started!');
    }).catch((error) => {
        console.log('Romantic music failed:', error);
    });
}

function moveButton(event) {
    if (event) {
        event.preventDefault();
    }
    
    // Ensure audio is unmuted on interaction
    unmuteAudio();
    
    noBtnClickCount++;
    
    const container = document.querySelector('.buttons');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;
    
    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;
    
    const newSize = Math.max(0.5, 1 - (noBtnClickCount * 0.1));
    noBtn.style.transform = `scale(${newSize})`;
    
    const noTexts = ['No 😢', 'Nope 😅', 'Nu-uh 🙈', 'Maybe? 🤔', 'Think again! 😏', 'Try Yes! 💕'];
    if (noBtnClickCount % 2 === 0) {
        noBtn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];
    }
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function handleYes() {
    // Ensure audio is unmuted
    unmuteAudio();
    
    // Switch to romantic music
    switchToRomanticMusic();
    
    const celebration = document.getElementById('celebration');
    celebration.classList.add('active');
    
    // Force celebration GIFs to animate after celebration screen appears
    setTimeout(() => {
        const celebrationGifs = celebration.querySelectorAll('img[src$=".gif"]');
        celebrationGifs.forEach(gif => {
            const src = gif.src;
            gif.src = '';
            gif.src = src;
        });
        console.log('Celebration GIFs animation triggered');
    }, 100);
    
    // Launch spectacular fireworks using Fireworks.js
    launchFireworksShow();
    
    // Create sparkles continuously
    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            createSparkle();
        }
    }, 300);
    
    // Create floating hearts
    setInterval(() => {
        createFloatingHeart();
    }, 500);
}

// Professional fireworks using Fireworks.js library
function launchFireworksShow() {
    const container = document.getElementById('fireworks-container');
    
    // Initialize Fireworks.js with spectacular settings
    fireworksInstance = new Fireworks.default(container, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 90,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 6,
        intensity: 35,
        flickering: 50,
        lineStyle: 'round',
        hue: {
            min: 0,
            max: 360
        },
        delay: {
            min: 30,
            max: 60
        },
        rocketsPoint: {
            min: 50,
            max: 50
        },
        lineWidth: {
            explosion: {
                min: 1,
                max: 4
            },
            trace: {
                min: 1,
                max: 2
            }
        },
        brightness: {
            min: 50,
            max: 80
        },
        decay: {
            min: 0.015,
            max: 0.03
        },
        mouse: {
            click: false,
            move: false,
            max: 1
        }
    });
    
    // Start the fireworks show
    fireworksInstance.start();
    
    console.log('🎆 Fireworks show started!');
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-celebration-heart';
    heart.textContent = ['💖', '💕', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    document.getElementById('celebration').appendChild(heart);
    
    setTimeout(() => heart.remove(), 7000);
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 2000);
}
