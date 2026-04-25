// Initialize Lucide icons
lucide.createIcons();

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Virtual Piano Logic
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('mousedown', () => playNote(key));
    key.addEventListener('mouseup', () => stopNote(key));
    key.addEventListener('mouseleave', () => stopNote(key));
});

function playNote(key) {
    key.classList.add('active');
    // Here we could use Web Audio API to generate sound
    console.log(`Playing note: ${key.dataset.note}`);
    
    // Provide visual feedback/ripple
    createRipple(key);
}

function stopNote(key) {
    key.classList.remove('active');
}

function createRipple(key) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '100%';
    ripple.style.height = '100%';
    ripple.style.background = 'rgba(99, 102, 241, 0.3)';
    ripple.style.top = '0';
    ripple.style.left = '0';
    ripple.style.borderRadius = 'inherit';
    ripple.style.animation = 'ripple-out 0.5s ease-out forwards';
    key.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
@keyframes ripple-out {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(1.5); }
}
`;
document.head.appendChild(style);

// Navbar background shift on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 23, 42, 0.9)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.7)';
    }
});
