let noBtnClickCount = 0;
let fireworksInstance = null;
let audioUnmuted = false;
let volumeCheckInterval = null;
let volumeWarningShown = false;
const noBtn = document.getElementById('noBtn');
const suspenseMusic = document.getElementById('suspenseMusic');
const romanticMusic = document.getElementById('romanticMusic');

// Set volumes
suspenseMusic.volume = 1.0;
romanticMusic.volume = 0.4;

// Start muted autoplay on page load (bypasses browser autoplay restrictions)
window.addEventListener('load', function() {
    suspenseMusic.play().catch(error => {
        console.log('Autoplay started muted');
    });
    
    // Start volume monitoring
    startVolumeMonitoring();
});

// Function to monitor if audio is actually playing and show warnings
function startVolumeMonitoring() {
    volumeCheckInterval = setInterval(() => {
        // Only check after user has interacted and audio should be playing
        if (audioUnmuted && !volumeWarningShown) {
            // Check if suspense music is paused when it should be playing
            if (suspenseMusic.paused && !romanticMusic.paused) {
                // If romantic music is playing but suspense should be, don't show warning
                return;
            }
            if (suspenseMusic.paused && romanticMusic.paused) {
                showVolumeWarning();
            }
        }
    }, 3000); // Check every 3 seconds, less frequent
}

// Function to show volume warning overlay
function showVolumeWarning() {
    if (volumeWarningShown) return;
    
    volumeWarningShown = true;
    
    const warning = document.createElement('div');
    warning.id = 'volume-warning';
    warning.innerHTML = `
        <div class="volume-warning-content">
            <h3>Turn Up the Volume!</h3>
            <p>Increase phone volume to hear audio</p>
            <button class="volume-test-btn" onclick="testAudio()">Test Audio</button>
            <button class="volume-dismiss-btn" onclick="dismissVolumeWarning()">Got it!</button>
        </div>
    `;
    warning.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.5s ease;
    `;
    
    document.body.appendChild(warning);
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
        if (warning.parentNode) {
            dismissVolumeWarning();
        }
    }, 10000);
}

// Function to test audio playback
function testAudio() {
    unmuteAudio();
    suspenseMusic.play().then(() => {
        console.log('Audio test successful!');
        // Show success feedback
        const testBtn = document.querySelector('.volume-test-btn');
        if (testBtn) {
            testBtn.textContent = '✅ Audio Working!';
            testBtn.style.background = '#4CAF50';
            setTimeout(() => dismissVolumeWarning(), 2000);
        }
    }).catch(error => {
        console.log('Audio test failed:', error);
        const testBtn = document.querySelector('.volume-test-btn');
        if (testBtn) {
            testBtn.textContent = '❌ Check Volume';
            testBtn.style.background = '#f44336';
        }
    });
}

// Function to dismiss volume warning
function dismissVolumeWarning() {
    const warning = document.getElementById('volume-warning');
    if (warning) {
        warning.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => warning.remove(), 500);
    }
    volumeWarningShown = false;
}

// Function to add volume control button
function addVolumeControl() {
    // Remove existing volume control if present
    const existingControl = document.getElementById('volume-control');
    if (existingControl) {
        existingControl.remove();
    }
    
    const volumeControl = document.createElement('div');
    volumeControl.id = 'volume-control';
    volumeControl.innerHTML = `
        <div id="volume-text">Turn up the volume</div>
    `;
    volumeControl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        animation: slideInRight 0.5s ease;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px 15px;
        border-radius: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        font-weight: bold;
        color: #FF6B9D;
        font-size: 14px;
        text-align: center;
    `;
    
    document.body.appendChild(volumeControl);
}

// Function to toggle volume on/off
function toggleVolume() {
    // Removed - no longer needed
}

// Function to adjust volume via slider
function adjustVolume(value) {
    // Removed - no longer needed
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
        localStorage.setItem('userInteracted', 'true');
        console.log('Audio unmuted!');
        
        // Start playing suspense music after unmute
        suspenseMusic.play().then(() => {
            console.log('Suspense music started playing after unmute');
        }).catch(error => {
            console.log('Failed to start suspense music after unmute:', error);
        });
        
        // Clear volume monitoring since user has interacted
        if (volumeCheckInterval) {
            clearInterval(volumeCheckInterval);
        }
        
        // Add volume control button after successful unmute
        setTimeout(addVolumeControl, 1000);
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
    
    // Update volume control for celebration music
    setTimeout(() => {
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.value = romanticMusic.volume;
        }
    }, 500);
    
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
