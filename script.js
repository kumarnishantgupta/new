// Add class to body to hide content initially
document.body.classList.add("loading");

// Preloader Logic
console.log("Starting preloader test");
const preloader = document.getElementById("preloader");
const percentage = document.querySelector(".percentage");
let loadPercent = 0;

if (!preloader || !percentage) {
    console.error("Preloader or percentage element not found!");
} else {
    const loadInterval = setInterval(() => {
        loadPercent += 1;
        percentage.textContent = `${loadPercent}%`;
        console.log("Counting: " + loadPercent);
        if (loadPercent >= 100) {
            clearInterval(loadInterval);
            preloader.classList.add("hidden");
            setTimeout(() => {
                preloader.style.display = "none";
                document.body.classList.remove("loading");
                document.body.style.overflow = "auto";
                const cursor = document.querySelector(".custom-cursor");
                if (cursor) cursor.style.display = "block";
                startAnimations();
            }, 500);
        }
    }, 50);
}

// Particles.js
try {
    particlesJS('particles-js', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: '#01fe87' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2, direction: 'none', random: false }
        },
        interactivity: {
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } }
        }
    });
} catch (e) {
    console.error("Particles.js failed: ", e);
}

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
if (!cursor) console.error('Custom cursor element not found!');
else {
    console.log('Custom cursor initialized');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.display = 'block';
    });
    document.querySelectorAll('a, button, .service, .portfolio-item, .cool-testimonial').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-icon');
    const menu = document.getElementById('fullscreen-menu');
    const closeBtn = document.getElementById('close-btn');
    const menuLinks = document.querySelectorAll('.fullscreen-menu a');

    if (!hamburger) console.error('Hamburger icon not found!');
    if (!menu) console.error('Fullscreen menu not found!');
    if (!closeBtn) console.error('Close button not found!');

    hamburger.addEventListener('click', () => {
        console.log('Hamburger clicked');
        if (menu) {
            menu.classList.add('show');
            if (typeof gsap !== 'undefined') {
                gsap.fromTo('.fullscreen-menu a', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
            }
        }
    });

    closeBtn.addEventListener('click', () => {
        console.log('Close button clicked');
        if (menu) menu.classList.remove('show');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Menu link clicked');
            if (menu) menu.classList.remove('show');
        });
    });
});

// GSAP Animations and Slider
function startAnimations() {
    if (typeof gsap !== 'undefined') {
        console.log("GSAP animations starting");
        // Hero Animations
        gsap.from('.hero h1', { opacity: 0, y: 50, duration: 1, delay: 0 });
        gsap.from('.hero p', { opacity: 0, y: 30, duration: 1, delay: 0.2 });
        
        
        // Testimonials Slider
        
        const slides = document.querySelectorAll('.testimonial-slide');
        if (slides.length === 0) {
            console.error("No testimonial slides found!");
            return;
        }
        
        let currentSlide = 0;
        slides[currentSlide].classList.add('active');

        function slideTestimonials() {
            const nextSlide = (currentSlide + 1) % slides.length;

            gsap.to(slides[currentSlide], { 
                opacity: 0, 
                x: -100, 
                duration: 0.5, 
                onComplete: () => {
                    slides[currentSlide].classList.remove('active');
                }
            });
            gsap.fromTo(slides[nextSlide], 
                { opacity: 0, x: 100 }, 
                { opacity: 1, x: 0, duration: 0.5, delay: 0.2, onComplete: () => {
                    slides[nextSlide].classList.add('active');
                    currentSlide = nextSlide;
                }
            });
        }

        // Initial animation for first slide
        gsap.from('#testimonials h2', { opacity: 0, scale: 0.8, duration: 1, delay: 0.6, ease: 'back.out(1.7)' });
        gsap.from(slides[0], { 
            opacity: 0, 
            scale: 0.5, 
            rotationX: 90, 
            duration: 1.2, 
            delay: 0.8, 
            ease: 'bounce.out',
            transformOrigin: 'top center'
        });

        // Start auto-sliding after initial animation
        setInterval(slideTestimonials, 3000);

        // Service Animations
        gsap.utils.toArray('.service').forEach((service, i) => {
            gsap.from(service, { scrollTrigger: { trigger: service, start: 'top 80%' }, opacity: 0, y: 50, duration: 1, delay: i * 0.2 });
        });
    } else {
        console.error("GSAP not loaded!");
    }
}

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(item, { opacity: 1, scale: 1, duration: 0.5, display: 'block' });
                } else {
                    item.style.opacity = '1';
                    item.style.display = 'block';
                }
            } else {
                if (typeof gsap !== 'undefined') {
                    gsap.to(item, { opacity: 0, scale: 0.8, duration: 0.5, onComplete: () => item.style.display = 'none' });
                } else {
                    item.style.opacity = '0';
                    item.style.display = 'none';
                }
            }
        });
    });
});

// Form Submission (Test Mode)
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Test mode)');
    e.target.reset();
});



