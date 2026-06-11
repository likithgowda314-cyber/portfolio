// ========== VANTA.JS BACKGROUND ==========
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xfb923c,
            backgroundColor: 0x140d0a,
            points: 12.00,
            maxDistance: 20.00,
            spacing: 16.00
        });
    }

    fetchGitHubProjects();
});

// ========== SMOOTH SCROLL (LENIS) ==========
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// ========== GSAP & SCROLLTRIGGER ==========
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
gsap.from(".hero-content", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.5
});

// Section Title Animations
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// About Text Animation
gsap.from(".about-text p", {
    scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
});

gsap.from(".about-terminal", {
    scrollTrigger: {
        trigger: ".about-terminal",
        start: "top 80%",
    },
    x: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Skills Animation
gsap.from(".skill-card", {
    scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "back.out(1.5)"
});

// ========== VANILLA TILT ==========
VanillaTilt.init(document.querySelectorAll(".skill-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// ========== TYPING ANIMATION ==========
const titles = [
    "Software Developer",
    "Automation Expert",
    "CLI Tool Builder",
    "AI Enthusiast",
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeTitle() {
    if(!typingElement) return;
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeTitle, 2000);
            return;
        }
        setTimeout(typeTitle, 80);
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeTitle, 500);
            return;
        }
        setTimeout(typeTitle, 40);
    }
}
setTimeout(typeTitle, 1000);

// ========== NAVBAR SCROLL & ACTIVE STATE ==========
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-cyan)';
        }
    });
});

// ========== MOBILE NAV TOGGLE ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ========== DYNAMIC GITHUB PROJECTS ==========
async function fetchGitHubProjects() {
    const grid = document.getElementById('projects-grid');
    const username = 'likithgowda314-cyber';
    const featuredRepos = ['clutter-clear', 'port-reaper', 'stack-sleuth', 'context-weaver'];

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const allRepos = await response.json();
        const projects = allRepos.filter(repo => featuredRepos.includes(repo.name));
        
        if (projects.length === 0) {
            grid.innerHTML = '<div class="loading-state">No projects found.</div>';
            return;
        }

        grid.innerHTML = ''; // Clear loading state

        projects.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            // Format Topics
            let topicsHtml = '';
            if (repo.topics && repo.topics.length > 0) {
                const limitedTopics = repo.topics.slice(0, 4);
                topicsHtml = `<div class="project-tech">${limitedTopics.map(t => `<span>${t}</span>`).join('')}</div>`;
            }

            card.innerHTML = `
                <div class="project-icon">&#128193;</div>
                <h3 class="project-name">${repo.name}</h3>
                <p class="project-desc">${repo.description || 'A developer tool.'}</p>
                ${topicsHtml}
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" class="project-link">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Source Code
                    </a>
                </div>
            `;
            grid.appendChild(card);
        });

        // Initialize GSAP & VanillaTilt for dynamic elements
        gsap.utils.toArray('.project-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: "top 85%" },
                y: 50, opacity: 0, duration: 0.8, ease: "power2.out"
            });
        });
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 5, speed: 400, glare: true, "max-glare": 0.1, scale: 1.02
        });

    } catch (error) {
        grid.innerHTML = '<div class="loading-state" style="color: #ef4444;">Unable to load projects right now.</div>';
        console.error('Error fetching repos:', error);
    }
}
