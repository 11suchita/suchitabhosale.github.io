// Hero Slider Functionality
let currentSlide = 1;
const totalSlides = 3;
let slideInterval;

function showSlide(slideNumber) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show current slide and activate corresponding dot
    slides[slideNumber - 1].classList.add('active');
    dots[slideNumber - 1].classList.add('active');

    currentSlide = slideNumber;
}

function nextSlide() {
    currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
    showSlide(currentSlide);
}

function currentSlide(n) {
    showSlide(n);
}

// Auto slide functionality
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    showSlide(1);
    startAutoSlide();

    // Pause auto-slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoSlide);
        heroSlider.addEventListener('mouseleave', startAutoSlide);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation delays to skills
    const skills = document.querySelectorAll('.skills li');
    skills.forEach((skill, index) => {
        skill.style.setProperty('--skill-order', index);
    });

    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.card, .skills li');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});

// Logging functionality
class PortfolioLogger {
    constructor() {
        this.logs = [];
        this.maxLogs = 100;
        this.init();
    }

    init() {
        console.log('🚀 Portfolio Logger initialized');
        this.logEvent('page_load', { timestamp: new Date().toISOString(), userAgent: navigator.userAgent });
    }

    logEvent(eventType, data = {}) {
        const logEntry = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            eventType,
            data,
            url: window.location.href
        };

        this.logs.push(logEntry);

        // Keep only the last maxLogs entries
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }

        // Store in localStorage for persistence
        try {
            localStorage.setItem('portfolio_logs', JSON.stringify(this.logs));
        } catch (e) {
            console.warn('Could not save logs to localStorage:', e);
        }

        // Console logging with emoji for better visibility
        const emoji = this.getEventEmoji(eventType);
        console.log(`${emoji} ${eventType}:`, data);
    }

    getEventEmoji(eventType) {
        const emojis = {
            page_load: '📄',
            slider_change: '🎠',
            navigation_click: '🧭',
            form_submit: '📝',
            map_interaction: '🗺️',
            scroll: '📜',
            button_click: '🔘',
            location_access: '📍'
        };
        return emojis[eventType] || '📋';
    }

    getLogs() {
        return this.logs;
    }

    exportLogs() {
        return JSON.stringify(this.logs, null, 2);
    }
}

// Initialize logger
const logger = new PortfolioLogger();

// Enhanced slider functionality with logging
function showSlide(slideNumber) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show current slide and activate corresponding dot
    slides[slideNumber - 1].classList.add('active');
    dots[slideNumber - 1].classList.add('active');

    currentSlide = slideNumber;

    // Log slider change
    logger.logEvent('slider_change', {
        slideNumber,
        slideContent: slides[slideNumber - 1].querySelector('h1').textContent
    });
}

function nextSlide() {
    currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
    showSlide(currentSlide);
}

function currentSlide(n) {
    showSlide(n);
}

// Auto slide functionality
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Enhanced DOM initialization with logging
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM Content Loaded - Initializing portfolio features');

    showSlide(1);
    startAutoSlide();

    // Pause auto-slide on hover with logging
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', function() {
            stopAutoSlide();
            logger.logEvent('slider_change', { action: 'paused', reason: 'hover' });
        });
        heroSlider.addEventListener('mouseleave', function() {
            startAutoSlide();
            logger.logEvent('slider_change', { action: 'resumed', reason: 'hover_end' });
        });
    }

    // Enhanced navigation with logging
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            logger.logEvent('navigation_click', {
                targetSection: targetId,
                linkText: this.textContent.trim()
            });

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation delays to skills with logging
    const skills = document.querySelectorAll('.skills li');
    skills.forEach((skill, index) => {
        skill.style.setProperty('--skill-order', index);
        skill.addEventListener('click', function() {
            logger.logEvent('button_click', {
                element: 'skill',
                skillName: this.textContent.trim(),
                index
            });
        });
    });

    // Contact form handling with logging
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            logger.logEvent('form_submit', {
                formType: 'contact',
                fields: Object.keys(formObject),
                messageLength: formObject.message ? formObject.message.length : 0
            });

            // Simulate form submission (in a real app, this would send to a server)
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();

            logger.logEvent('form_submit', { status: 'success', action: 'form_reset' });
        });
    }

    // Map interaction logging
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            logger.logEvent('map_interaction', {
                action: 'clicked',
                location: 'Indapur, Maharashtra'
            });
        });

        // Log when map loads
        const mapIframe = mapContainer.querySelector('iframe');
        if (mapIframe) {
            mapIframe.addEventListener('load', function() {
                logger.logEvent('map_interaction', {
                    action: 'loaded',
                    location: 'Indapur, Maharashtra'
                });
            });
        }
    }

    // Scroll logging
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercent = Math.round((scrollY / (documentHeight - windowHeight)) * 100);

            logger.logEvent('scroll', {
                scrollY,
                scrollPercent,
                windowHeight,
                documentHeight
            });
        }, 250); // Debounce scroll events
    });

    // Button click logging
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            logger.logEvent('button_click', {
                buttonText: this.textContent.trim(),
                buttonClass: this.className,
                href: this.href || null
            });
        });
    });

    // Intersection observer for scroll animations with logging
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';

                logger.logEvent('scroll', {
                    elementVisible: entry.target.id || entry.target.className,
                    intersectionRatio: entry.intersectionRatio
                });
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.card, .skills li');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    logger.logEvent('page_load', { status: 'dom_ready', features: 'slider,form,map,logging' });
});

// Print portfolio function with logging
function printPortfolio() {
    logger.logEvent('button_click', { action: 'print_portfolio' });
    window.print();
}

// Location access logging (if geolocation is used)
if ('geolocation' in navigator) {
    navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
        logger.logEvent('location_access', {
            permission: result.state,
            available: true
        });
    });
} else {
    logger.logEvent('location_access', {
        available: false,
        reason: 'not_supported'
    });
}

// Add loading animation with logging
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    logger.logEvent('page_load', { status: 'fully_loaded', loadTime: performance.now() });
});

// Error logging
window.addEventListener('error', function(e) {
    logger.logEvent('error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
});

// Unhandled promise rejection logging
window.addEventListener('unhandledrejection', function(e) {
    logger.logEvent('error', {
        type: 'unhandled_promise_rejection',
        reason: e.reason
    });
});

// Make logger available globally for debugging
window.portfolioLogger = logger;

// Education Management Functions
let editingEducationCard = null;

function addEducation() {
    logger.logEvent('education_action', { action: 'add_new' });
    showEducationForm();
}

function editEducation(button) {
    const card = button.closest('.education-card');
    editingEducationCard = card;

    logger.logEvent('education_action', { action: 'edit', degree: card.querySelector('h3').textContent });

    // Populate form with existing data
    const form = showEducationForm();
    const degree = card.querySelector('h3').textContent;
    const paragraphs = card.querySelectorAll('p');

    form.querySelector('[name="degree"]').value = degree;
    form.querySelector('[name="institution"]').value = paragraphs[0].textContent.split(' (')[0];
    form.querySelector('[name="duration"]').value = paragraphs[0].textContent.match(/\(([^)]+)\)/)?.[1] || '';
    form.querySelector('[name="grade"]').value = paragraphs[1].textContent;
    form.querySelector('[name="description"]').value = paragraphs[2]?.textContent || '';
}

function deleteEducation(button) {
    if (confirm('Are you sure you want to delete this education entry?')) {
        const card = button.closest('.education-card');
        const degree = card.querySelector('h3').textContent;

        logger.logEvent('education_action', { action: 'delete', degree });

        card.remove();
        saveEducationToStorage();
    }
}

function showEducationForm() {
    const template = document.getElementById('education-form-template');
    const formContainer = template.cloneNode(true);
    formContainer.id = 'education-form-active';
    formContainer.style.display = 'block';

    const form = formContainer.querySelector('.education-form-content');
    form.addEventListener('submit', handleEducationFormSubmit);

    // Insert form after the education controls
    const controls = document.querySelector('.education-controls');
    controls.insertAdjacentElement('afterend', formContainer);

    // Focus on first input
    setTimeout(() => {
        formContainer.querySelector('[name="degree"]').focus();
    }, 100);

    return form;
}

function cancelEducationForm() {
    const formContainer = document.getElementById('education-form-active');
    if (formContainer) {
        formContainer.remove();
        editingEducationCard = null;
    }
    logger.logEvent('education_action', { action: 'cancel_form' });
}

function handleEducationFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const educationData = {
        degree: formData.get('degree'),
        institution: formData.get('institution'),
        duration: formData.get('duration'),
        grade: formData.get('grade'),
        description: formData.get('description')
    };

    if (editingEducationCard) {
        updateEducationCard(editingEducationCard, educationData);
        logger.logEvent('education_action', { action: 'update', degree: educationData.degree });
    } else {
        createEducationCard(educationData);
        logger.logEvent('education_action', { action: 'create', degree: educationData.degree });
    }

    cancelEducationForm();
    saveEducationToStorage();
}

function createEducationCard(data) {
    const container = document.getElementById('education-container');

    const card = document.createElement('div');
    card.className = 'card education-card';
    card.innerHTML = `
        <div class="card-header">
            <h3>${data.degree}</h3>
            <button onclick="editEducation(this)" class="edit-btn">✏️</button>
            <button onclick="deleteEducation(this)" class="delete-btn">🗑️</button>
        </div>
        <p>${data.institution} (${data.duration})</p>
        <p>${data.grade}</p>
        ${data.description ? `<p>${data.description}</p>` : ''}
    `;

    container.appendChild(card);

    // Add animation
    setTimeout(() => {
        card.style.animation = 'fadeInUp 0.5s ease-out';
    }, 10);
}

function updateEducationCard(card, data) {
    card.innerHTML = `
        <div class="card-header">
            <h3>${data.degree}</h3>
            <button onclick="editEducation(this)" class="edit-btn">✏️</button>
            <button onclick="deleteEducation(this)" class="delete-btn">🗑️</button>
        </div>
        <p>${data.institution} (${data.duration})</p>
        <p>${data.grade}</p>
        ${data.description ? `<p>${data.description}</p>` : ''}
    `;
}

function saveEducationToStorage() {
    const educationCards = document.querySelectorAll('.education-card');
    const educationData = [];

    educationCards.forEach(card => {
        const degree = card.querySelector('h3').textContent;
        const paragraphs = card.querySelectorAll('p');

        educationData.push({
            degree,
            institution: paragraphs[0].textContent.split(' (')[0],
            duration: paragraphs[0].textContent.match(/\(([^)]+)\)/)?.[1] || '',
            grade: paragraphs[1].textContent,
            description: paragraphs[2]?.textContent || ''
        });
    });

    try {
        localStorage.setItem('portfolio_education', JSON.stringify(educationData));
        logger.logEvent('education_action', { action: 'save_to_storage', count: educationData.length });
    } catch (e) {
        console.warn('Could not save education data to localStorage:', e);
    }
}

function loadEducationFromStorage() {
    try {
        const savedData = localStorage.getItem('portfolio_education');
        if (savedData) {
            const educationData = JSON.parse(savedData);
            const container = document.getElementById('education-container');

            // Clear existing cards except the first two default ones if they exist
            const existingCards = container.querySelectorAll('.education-card');
            existingCards.forEach(card => card.remove());

            // Add saved education entries
            educationData.forEach(data => {
                createEducationCard(data);
            });

            logger.logEvent('education_action', { action: 'load_from_storage', count: educationData.length });
        }
    } catch (e) {
        console.warn('Could not load education data from localStorage:', e);
    }
}

// Initialize education functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Load saved education data
    loadEducationFromStorage();

    // Add education form event listeners
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cancelEducationForm();
        }
    });

    logger.logEvent('education_action', { action: 'initialize' });

    // Initialize particle effects
    initParticleEffects();

    // Initialize enhanced animations
    initEnhancedAnimations();
});

// Particle Effects System
function initParticleEffects() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
            createParticle(container);
        }, 6000);
    }
}

// Enhanced Animation System
function initEnhancedAnimations() {
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });

        button.addEventListener('click', function(e) {
            createSparkles(e.clientX, e.clientY);
        });
    });

    // Add parallax effect to hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add typing effect to hero text
    const heroText = document.querySelector('#home h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        setTimeout(typeWriter, 1000);
    }

    // Add ripple effect to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(102, 126, 234, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.offsetX - 10) + 'px';
            ripple.style.top = (e.offsetY - 10) + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Add sparkle effect
            createSparkles(e.clientX, e.clientY);
        });
    });

    // Add floating animation to icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';

                // Add stagger effect for multiple elements
                if (entry.target.classList.contains('skills')) {
                    const skillItems = entry.target.querySelectorAll('li');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animationPlayState = 'running';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.card, .skills li, .contact-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Add 3D tilt effect to photo
    const photoFrame = document.querySelector('.photo-frame');
    if (photoFrame) {
        photoFrame.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        photoFrame.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    // Add morphing background effect
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))';
        });

        section.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeInUp 1s ease-out';
        });
    });

    logger.logEvent('enhanced_animations', { status: 'initialized', features: ['particles', 'magnetic_buttons', 'parallax', 'typing_effect', 'ripple', '3d_tilt', 'morphing_bg'] });
}

// Sparkle effect function
function createSparkles(x, y) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-effect';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.setProperty('--random-x', (Math.random() - 0.5) * 100 + 'px');
        sparkle.style.setProperty('--random-y', (Math.random() - 0.5) * 100 + 'px');

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
