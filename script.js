// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close menu when window is resized
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLL & ACTIVE NAV LINK
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill tags and experience cards
document.querySelectorAll('.skill-tag, .experience-card, .education-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Create mailto link
        const mailtoLink = `mailto:pritamsingh61753@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        // Open default email client
        window.location.href = mailtoLink;

        // Reset form
        contactForm.reset();
        alert('Email client opened. Please complete sending the email.');
    });
}

// ============================================
// SCROLL TO TOP FUNCTIONALITY
// ============================================

let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    font-size: 20px;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// PARALLAX EFFECT ON HERO SECTION
// ============================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ============================================
// SKILL TAG ANIMATION ON HOVER
// ============================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when hero is visible
const heroStats = document.querySelectorAll('.stat-card h3');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        heroStats.forEach((stat, index) => {
            const target = parseInt(stat.textContent);
            animateCounter(stat, target, 1500);
        });
        statsObserver.unobserve(entries[0].target);
    }
}, { threshold: 0.5 });

if (hero) {
    statsObserver.observe(hero);
}

// ============================================
// DARK MODE TOGGLE (Optional Feature)
// ============================================

// Check for saved dark mode preference or default to 'light mode'
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log(
    '%c Welcome to Pritam Singh\'s Portfolio! %c',
    'background: #0066cc; color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px; font-weight: bold;',
    'background: transparent;'
);
console.log(
    '%c Automation Test Engineer | SDET | QA Specialist %c',
    'color: #0066cc; font-size: 12px; font-weight: bold;',
    'color: #666;'
);
console.log('📧 Email: pritamsingh61753@gmail.com');
console.log('📱 Phone: +91 7903477029');
console.log('📍 Location: Bangalore, India');