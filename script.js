// ----------------- Enhanced Performance & Interactions -------------------
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Enhanced scroll-based navbar effects
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', throttle(() => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
}, 16)); // ~60fps

// Enhanced reactive background interactions
const homeSection = document.querySelector('.home');
const mouseFollower = document.querySelector('.mouse-follower');

// Mouse movement effect with performance optimization
homeSection.addEventListener('mousemove', throttle((e) => {
    const rect = homeSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseFollower.style.left = x + 'px';
    mouseFollower.style.top = y + 'px';
    mouseFollower.style.opacity = '1';
}, 16));

// Mouse leave effect
homeSection.addEventListener('mouseleave', () => {
    mouseFollower.style.opacity = '0';
});

// Enhanced click ripple effect
homeSection.addEventListener('click', (e) => {
    const rect = homeSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create multiple ripples for better effect
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = (100 + i * 50) + 'px';
            ripple.style.height = ripple.style.width;
            ripple.style.animationDelay = (i * 0.1) + 's';
            
            homeSection.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000 + i * 100);
        }, i * 100);
    }
});

// Enhanced parallax effect on scroll
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.particle, .floating-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 16));

// Enhanced button interactions with ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('btn-ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced reactive title effect
const homeTitle = document.querySelector('.home-title');
let titleAnimation;

homeTitle.addEventListener('mouseenter', () => {
    homeTitle.style.transform = 'scale(1.05)';
    homeTitle.style.textShadow = '0 0 40px rgba(37, 99, 235, 0.8)';
    
    // Add pulsing effect
    titleAnimation = setInterval(() => {
        homeTitle.style.textShadow = `0 0 ${40 + Math.random() * 20}px rgba(37, 99, 235, ${0.6 + Math.random() * 0.4})`;
    }, 200);
});

homeTitle.addEventListener('mouseleave', () => {
    homeTitle.style.transform = 'scale(1)';
    homeTitle.style.textShadow = '0 0 20px rgba(37, 99, 235, 0.3)';
    clearInterval(titleAnimation);
});

// Enhanced dynamic particle generation
let particleTimeout;
homeSection.addEventListener('mousemove', throttle((e) => {
    clearTimeout(particleTimeout);
    particleTimeout = setTimeout(() => {
        if (Math.random() > 0.8) {
            createDynamicParticle(e.clientX, e.clientY);
        }
    }, 100);
}, 100));

function createDynamicParticle(x, y) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    
    particle.style.position = 'absolute';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = `hsl(${217 + Math.random() * 20}, 70%, ${50 + Math.random() * 20}%)`;
    particle.style.borderRadius = '50%';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.opacity = '0.8';
    particle.style.pointerEvents = 'none';
    particle.style.animation = 'particleFade 2s ease-out forwards';
    particle.style.zIndex = '5';
    particle.style.boxShadow = `0 0 ${size * 2}px rgba(37, 99, 235, 0.4)`;
    
    homeSection.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Enhanced animations and styles
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes particleFade {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, -150px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes titleGlow {
        0%, 100% {
            text-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
        }
        50% {
            text-shadow: 0 0 30px rgba(37, 99, 235, 0.6), 0 0 40px rgba(37, 99, 235, 0.4);
        }
    }
    
    @keyframes highlightPulse {
        0%, 100% {
            transform: scaleX(1);
            opacity: 1;
        }
        50% {
            transform: scaleX(1.1);
            opacity: 0.8;
        }
    }
    
    .btn-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: btnRipple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes btnRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(enhancedStyles);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Enhanced smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Performance monitoring
if (window.performance && performance.memory) {
    console.log('Memory Usage:', {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB',
        total: Math.round(performance.memory.totalJSHeapSize / 1048576) + ' MB'
    });
}

// ----------------- Theme Logic -------------------
const toggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Load theme from localStorage
let savedTheme = localStorage.getItem("theme");

// Apply saved theme or default to light
if (savedTheme === "light") {
    htmlElement.classList.add("light");
    updateThemeIcon(true);
} else {
    updateThemeIcon(false);
}

// Auto-detect OS theme if none saved
if (!savedTheme) {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        htmlElement.classList.add("light");
        updateThemeIcon(true);
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}

// Update theme icon function
function updateThemeIcon(isLight) {
    if (isLight) {
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Toggle on click
toggle.addEventListener("click", () => {
    const isLight = htmlElement.classList.toggle("light");
    
    // Update icon
    updateThemeIcon(isLight);
    
    // Save preference
    localStorage.setItem("theme", isLight ? "light" : "dark");
    
    // Add a small animation effect
    toggle.style.transform = "scale(0.8)";
    setTimeout(() => {
        toggle.style.transform = "";
    }, 200);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem("theme")) {
        if (e.matches) {
            htmlElement.classList.add("light");
            updateThemeIcon(true);
        } else {
            htmlElement.classList.remove("light");
            updateThemeIcon(false);
        }
    }
});

// ---------------- Smooth Scroll ------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// ---------------- Mobile Menu --------------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// ---------------- Form Handler --------------------
document.querySelector('.contact-form')?.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
});
