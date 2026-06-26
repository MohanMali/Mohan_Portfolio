/* ==========================================================================
    Mohan Mali Portfolio - JavaScript File
    ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Features ---
    initTheme();
    initMobileNav();
    initNavbarScroll();
    initScrollSpy();
    initTypewriter();
    initTerminalSimulation();
    initSkillsFilter();
    initContactForm();
    initThreeJS();
});

/* ==========================================================================
   1. Theme Switching (Light/Dark)
   ========================================================================== */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else if (savedTheme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        if (systemPrefersDark) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        }
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
}

/* ==========================================================================
   2. Mobile Navigation Menu
   ========================================================================== */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-item');
    
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

/* ==========================================================================
   3. Navbar Scroll Effects
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   4. Scroll Spy (Active Section Tracking)
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   5. Dynamic Typewriter Effect
   ========================================================================== */
function initTypewriter() {
    const typedTextElement = document.getElementById('typed-text');
    const words = [
        'Application Support Engineer',
        'Linux System Administrator',
        'Python Automation Engineer',
        'DevOps Enthusiast'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 40;
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 80;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeDelay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 400;
        }
        
        setTimeout(type, typeDelay);
    }
    
    type();
}

/* ==========================================================================
   6. Interactive Linux Terminal Simulator
   ========================================================================== */
function initTerminalSimulation() {
    const terminalBody = document.getElementById('terminal-body');
    const terminalCopy = document.getElementById('terminal-copy');
    if (!terminalBody) return;
    
    const terminalScripts = [
        { command: 'whoami', type: 'cmd' },
        { output: 'mohan_mali', type: 'out' },
        { command: 'cat intro.txt', type: 'cmd' },
        { output: 'Hi, I\'m Mohan Mali. I support enterprise applications, manage Linux servers, and write Python scripts to automate processes.', type: 'out' },
        { command: 'systemctl status nginx.service', type: 'cmd' },
        { output: '● nginx.service - A high performance web server\n   Loaded: loaded (/lib/systemd/system/nginx.service; enabled)\n   Active: active (running) since Thu 2026-06-25 09:00:15 IST\n   Main PID: 1423 (nginx)', type: 'out' },
        { command: 'ping -c 3 devops_skills_database', type: 'cmd' },
        { output: 'PING devops_skills_database (10.0.1.4) 56(84) bytes of data.\n64 bytes from 10.0.1.4: seq=1 time=0.04 ms (Docker)\n64 bytes from 10.0.1.4: seq=2 time=0.03 ms (AWS EC2)\n64 bytes from 10.0.1.4: seq=3 time=0.05 ms (Jenkins CI/CD)\n\n--- devops_skills ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss', type: 'out' },
        { command: 'echo "System ready."', type: 'cmd' },
        { output: 'System ready.', type: 'out' }
    ];
    
    let lineIdx = 0;
    terminalBody.innerHTML = '';
    
    function addCursor() {
        const cursorLine = document.createElement('div');
        cursorLine.className = 'terminal-line cursor-line';
        cursorLine.innerHTML = `<span class="prompt">mohan@portfolio:~$</span> <span class="terminal-cursor"></span>`;
        terminalBody.appendChild(cursorLine);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    function removeCursor() {
        const cursorLine = terminalBody.querySelector('.cursor-line');
        if (cursorLine) cursorLine.remove();
    }
    
    function typeCommand(cmdText, callback) {
        removeCursor();
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="prompt">mohan@portfolio:~$</span> <span class="typed-command"></span>`;
        terminalBody.appendChild(line);
        
        const cmdSpan = line.querySelector('.typed-command');
        let charIdx = 0;
        
        function typeChar() {
            if (charIdx < cmdText.length) {
                cmdSpan.textContent += cmdText.charAt(charIdx);
                charIdx++;
                terminalBody.scrollTop = terminalBody.scrollHeight;
                setTimeout(typeChar, 60);
            } else {
                setTimeout(callback, 200);
            }
        }
        typeChar();
    }
    
    function printOutput(outText, callback) {
        const outDiv = document.createElement('div');
        outDiv.className = 'terminal-output';
        outDiv.textContent = outText;
        terminalBody.appendChild(outDiv);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        setTimeout(callback, 1200);
    }
    
    function runNext() {
        if (lineIdx >= terminalScripts.length) {
            setTimeout(() => {
                terminalBody.innerHTML = '';
                lineIdx = 0;
                runNext();
            }, 6000);
            return;
        }
        
        const step = terminalScripts[lineIdx];
        lineIdx++;
        
        if (step.type === 'cmd') {
            typeCommand(step.command, runNext);
        } else if (step.type === 'out') {
            printOutput(step.output, () => {
                addCursor();
                runNext();
            });
        }
    }
    
    addCursor();
    setTimeout(runNext, 1000);
    
    terminalCopy.addEventListener('click', () => {
        const lines = Array.from(terminalBody.children).map(child => {
            if (child.classList.contains('cursor-line')) return '';
            return child.textContent.replace('mohan@portfolio:~$ ', '$ ');
        }).filter(t => t).join('\n');
        
        navigator.clipboard.writeText(lines).then(() => {
            terminalCopy.className = 'fa-solid fa-check copy-btn';
            terminalCopy.style.color = 'var(--success-color)';
            setTimeout(() => {
                terminalCopy.className = 'fa-solid fa-copy copy-btn';
                terminalCopy.style.color = '';
            }, 2000);
        });
    });
}

/* ==========================================================================
   7. Technical Skills Filtering
   ========================================================================== */
function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            
            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const progressElement = card.querySelector('.progress');
                const widthValue = progressElement.style.width;
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('filtered-out');
                    progressElement.style.width = '0%';
                    setTimeout(() => {
                        progressElement.style.width = widthValue;
                    }, 50);
                } else {
                    card.classList.add('filtered-out');
                }
            });
        });
    });
    
    setTimeout(() => {
        skillCards.forEach(card => {
            const progressElement = card.querySelector('.progress');
            const widthValue = progressElement.style.width;
            progressElement.style.width = '0%';
            setTimeout(() => {
                progressElement.style.width = widthValue;
            }, 100);
        });
    }, 500);
}

/* ==========================================================================
   8. Contact Form Validation & Simulated Submit
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    const statusAlert = document.getElementById('form-status');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const messageInput = document.getElementById('form-message');
        
        function validateField(input, condition) {
            const group = input.parentElement;
            if (condition) {
                group.classList.remove('has-error');
            } else {
                group.classList.add('has-error');
                isValid = false;
            }
        }
        
        validateField(nameInput, nameInput.value.trim() !== '');
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(emailInput, emailRegex.test(emailInput.value.trim()));
        
        validateField(messageInput, messageInput.value.trim() !== '');
        
        if (isValid) {
            statusAlert.className = 'form-status-alert loading';
            statusAlert.textContent = 'Sending message...';
            
            const submitBtn = form.querySelector('.btn-submit');
            const submitText = submitBtn.querySelector('.btn-text-content');
            const submitIcon = submitBtn.querySelector('.send-icon');
            
            submitBtn.disabled = true;
            submitText.textContent = 'Sending...';
            submitIcon.className = 'fa-solid fa-spinner fa-spin send-icon';
            
            setTimeout(() => {
                statusAlert.className = 'form-status-alert success';
                statusAlert.textContent = 'Message sent successfully! Thank you.';
                
                form.reset();
                
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitIcon.className = 'fa-solid fa-paper-plane send-icon';
                
                setTimeout(() => {
                    statusAlert.className = 'form-status-alert';
                    statusAlert.textContent = '';
                }, 5000);
                
            }, 1500);
        }
    });
    
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const group = input.parentElement;
            if (input.value.trim() !== '') {
                group.classList.remove('has-error');
            }
        });
    });
}

/* ==========================================================================
   9. Three.js Background Particle Starfield
   ========================================================================== */
function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Create Scene
    const scene = new THREE.Scene();

    // Setup Camera
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // Setup WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Dynamic Circular Particle Texture
    function createParticleTexture() {
        const pCanvas = document.createElement('canvas');
        pCanvas.width = 16;
        pCanvas.height = 16;
        const ctx = pCanvas.getContext('2d');
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(99, 102, 241, 0.8)'); // Indigo outer glow
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
        return new THREE.CanvasTexture(pCanvas);
    }

    // Build Drifting Space Stars
    const particlesCount = 900;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 12;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.04,
        map: createParticleTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse Tracking Parallax
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) - 0.5;
        mouseY = (event.clientY / window.innerHeight) - 0.5;
    });

    // Theme Swap Observer (Update particle visual tone)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(() => {
                const isLight = document.body.classList.contains('light-theme');
                // Change size/blending parameters if needed, or slightly shift opacity
                particlesMaterial.opacity = isLight ? 0.6 : 1.0;
            }, 60);
        });
    }

    // Resize Handler
    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Animation Tick Loop
    const clock = new THREE.Clock();
    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Slow drift rotation
        particlesMesh.rotation.y = elapsedTime * 0.02;
        particlesMesh.rotation.x = -elapsedTime * 0.01;

        // Apply mouse movement camera parallax
        const targetX = mouseX * 1.8;
        const targetY = -mouseY * 1.8;
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Render Frame
        renderer.render(scene, camera);

        // Schedule next frame
        requestAnimationFrame(tick);
    };

    tick();
}
