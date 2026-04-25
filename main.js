// Scroll animations or interactions can be added here
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Subtle parallax for the hero visual
window.addEventListener('scroll', () => {
    const visual = document.querySelector('.hero-visual');
    const scroll = window.pageYOffset;
    if (visual) {
        visual.style.transform = `translateY(calc(-50% + ${scroll * 0.1}px))`;
    }
});
