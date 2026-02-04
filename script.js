let noBtnClickCount = 0;
let fireworksInterval;
let audioUnmuted = false;
const noBtn = document.getElementById('noBtn');
const suspenseMusic = document.getElementById('suspenseMusic');
const romanticMusic = document.getElementById('romanticMusic');

// Set volumes
suspenseMusic.volume = 0.4;
romanticMusic.volume = 0.4;

// Start muted autoplay on page load (bypasses browser autoplay restrictions)
window.addEventListener('load', function() {
    suspenseMusic.play().catch(error => {
        console.log('Autoplay started muted');
    });
});

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
    
    // Launch amazing fireworks using canvas-confetti
    launchFireworksShow();
    
    // Create massive confetti shower
    for (let i = 0; i < 150; i++) {
        setTimeout(() => createConfetti(), i * 20);
    }
    
    // Create sparkles continuously
    const sparkleInterval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
            createSparkle();
        }
    }, 200);
    
    // Keep confetti going
    setTimeout(() => {
        setInterval(() => {
            for (let i = 0; i < 5; i++) {
                createConfetti();
            }
        }, 500);
    }, 3000);
    
    // Add continuous firework bursts every 3 seconds
    setInterval(() => {
        confetti({
            particleCount: 120,
            startVelocity: 50,
            spread: 360,
            ticks: 100,
            gravity: 0.8,
            origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.2 + 0.2 },
            colors: ['#FF6B9D', '#F35588', '#FFD700', '#ff1493', '#00CED1', '#ffffff'],
            shapes: ['circle', 'square'],
            scalar: 1.3,
            zIndex: 10001
        });
    }, 3000);
    
    // Add side firework bursts
    setInterval(() => {
        confetti({
            particleCount: 80,
            angle: 60,
            startVelocity: 45,
            spread: 120,
            ticks: 100,
            gravity: 0.85,
            origin: { x: 0.1, y: 0.3 },
            colors: ['#FF6B9D', '#FFD700', '#00ff00'],
            zIndex: 10001
        });
        confetti({
            particleCount: 80,
            angle: 120,
            startVelocity: 45,
            spread: 120,
            ticks: 100,
            gravity: 0.85,
            origin: { x: 0.9, y: 0.3 },
            colors: ['#F35588', '#00bfff', '#ff1493'],
            zIndex: 10001
        });
    }, 4000);
}

// Professional fireworks using canvas-confetti library
function launchFireworksShow() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Realistic fireworks that explode in the sky
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 100;
        
        // Create firework explosions at random positions in the upper portion of screen
        confetti({
            particleCount,
            startVelocity: 45,
            spread: 360,
            ticks: 100,
            gravity: 0.8,
            decay: 0.91,
            scalar: 1.2,
            origin: { 
                x: randomInRange(0.2, 0.8), 
                y: randomInRange(0.2, 0.4) 
            },
            colors: ['#FFD700', '#FF6B9D', '#00ff00', '#00bfff', '#FF1744', '#ffffff'],
            shapes: ['circle', 'square'],
            zIndex: 10001
        });
    }, 400);

    // Additional spectacular firework bursts
    setTimeout(() => {
        confetti({
            particleCount: 150,
            startVelocity: 55,
            spread: 360,
            ticks: 120,
            gravity: 0.8,
            decay: 0.9,
            scalar: 1.5,
            origin: { x: 0.5, y: 0.3 },
            colors: ['#FFD700', '#FF6B9D', '#F35588', '#ffffff'],
            shapes: ['star', 'circle'],
            zIndex: 10001
        });
    }, 500);

    // Side fireworks
    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 60,
            startVelocity: 50,
            spread: 100,
            ticks: 100,
            gravity: 0.9,
            origin: { x: 0.1, y: 0.4 },
            colors: ['#00ff00', '#00bfff', '#FFD700'],
            zIndex: 10001
        });
        confetti({
            particleCount: 100,
            angle: 120,
            startVelocity: 50,
            spread: 100,
            ticks: 100,
            gravity: 0.9,
            origin: { x: 0.9, y: 0.4 },
            colors: ['#FF1744', '#FF69B4', '#ffffff'],
            zIndex: 10001
        });
    }, 1000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.background = ['#FF6B9D', '#F35588', '#FFD700', '#00ff00', '#00bfff', '#FF1744', '#FED6E3'][Math.floor(Math.random() * 7)];
    confetti.style.width = (Math.random() * 10 + 5) + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 5000);
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
