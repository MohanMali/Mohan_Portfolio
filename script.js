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
});

/* ==========================================================================
   1. Theme Switching (Light/Dark)
   ========================================================================== */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check saved preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else if (savedTheme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        // System preference default
        if (systemPrefersDark) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        }
    }
    
    // Toggle Event Listener
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
   2. Mobile Navigation menu
   ========================================================================== */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-item');
    
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

/* ==========================================================================
   3. Navbar Scroll effects
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
   4. Scroll Spy (Active section tracking)
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset for nav header height
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
   5. Dynamic Typewriter effect
   ========================================================================== */
function initTypewriter() {
    const typedTextElement = document.getElementById('typed-text');
    const words = [
        'DevOps Enthusiast',
        'Linux Administrator',
        'Automation Scripter',
        'Production Support Specialist'
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
            typeDelay = 50; // faster deleting
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 120; // regular typing
        }
        
        // Handle transitions
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeDelay = 2000; // pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 500; // brief pause before next word
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
    
    const terminalScripts = [
        { command: 'whoami', type: 'cmd' },
        { output: 'mohan_mali', type: 'out' },
        { command: 'cat roles.txt', type: 'cmd' },
        { output: '- Production Support (L2)\n- Linux Administration\n- Web Infrastructure (Nginx)\n- Python & Shell Automation\n- Transitioning to DevOps Engineer 🚀', type: 'out' },
        { command: 'docker -v', type: 'cmd' },
        { output: 'Docker version 24.0.7, build afdd53b', type: 'out' },
        { command: 'git status', type: 'cmd' },
        { output: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean', type: 'out' },
        { command: 'ping -c 3 devops_transition', type: 'cmd' },
        { output: 'PING devops_transition (127.0.0.1) 56(84) bytes of data.\n64 bytes from localhost: seq=1 time=0.04ms (Docker containerized)\n64 bytes from localhost: seq=2 time=0.03ms (AWS infrastructure)\n64 bytes from localhost: seq=3 time=0.03ms (CI/CD active)\n--- devops statistics ---\n3 pkts sent, 3 rcvd, 0% loss', type: 'out' },
        { command: 'echo "Ready to upgrade systems!"', type: 'cmd' },
        { output: 'Ready to upgrade systems!', type: 'out' }
    ];
    
    let lineIdx = 0;
    
    // Clear terminal layout first
    terminalBody.innerHTML = '';
    
    function addCursor() {
        const cursorLine = document.createElement('div');
        cursorLine.className = 'terminal-line cursor-line';
        cursorLine.innerHTML = `<span class="prompt">mohan@linux-server:~$</span> <span class="terminal-cursor"></span>`;
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
        line.innerHTML = `<span class="prompt">mohan@linux-server:~$</span> <span class="typed-command"></span>`;
        terminalBody.appendChild(line);
        
        const cmdSpan = line.querySelector('.typed-command');
        let charIdx = 0;
        
        function typeChar() {
            if (charIdx < cmdText.length) {
                cmdSpan.textContent += cmdText.charAt(charIdx);
                charIdx++;
                terminalBody.scrollTop = terminalBody.scrollHeight;
                setTimeout(typeChar, 80);
            } else {
                setTimeout(callback, 300);
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
        setTimeout(callback, 800);
    }
    
    function runNext() {
        if (lineIdx >= terminalScripts.length) {
            // Wait and start again (loop)
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
    
    // Start terminal loop
    addCursor();
    setTimeout(runNext, 1200);
    
    // Copy Terminal Text
    terminalCopy.addEventListener('click', () => {
        // Extract plain text from terminal
        const lines = Array.from(terminalBody.children).map(child => {
            if (child.classList.contains('cursor-line')) return '';
            return child.textContent.replace('mohan@linux-server:~$ ', '$ ');
        }).filter(t => t).join('\n');
        
        navigator.clipboard.writeText(lines).then(() => {
            // Flash copy icon
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
            // Update active state of button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            
            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const progressElement = card.querySelector('.progress');
                const widthValue = progressElement.style.width;
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('filtered-out');
                    
                    // Reset progress bar animation so it slides in again
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
    
    // Trigger initial progress animation for visibility on load
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
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const messageInput = document.getElementById('form-message');
        
        // Helper: Validate field
        function validateField(input, condition) {
            const group = input.parentElement;
            if (condition) {
                group.classList.remove('has-error');
            } else {
                group.classList.add('has-error');
                isValid = false;
            }
        }
        
        // Name Validation
        validateField(nameInput, nameInput.value.trim() !== '');
        
        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(emailInput, emailRegex.test(emailInput.value.trim()));
        
        // Message Validation
        validateField(messageInput, messageInput.value.trim() !== '');
        
        // If valid, submit form
        if (isValid) {
            // Show loading state
            statusAlert.className = 'form-status-alert loading';
            statusAlert.textContent = 'Deploying your message. Please wait...';
            
            const submitBtn = form.querySelector('.btn-submit');
            const submitText = submitBtn.querySelector('.btn-text-content');
            const submitIcon = submitBtn.querySelector('.send-icon');
            
            submitBtn.disabled = true;
            submitText.textContent = 'Sending...';
            submitIcon.className = 'fa-solid fa-spinner fa-spin send-icon';
            
            // Simulate API request (L2 support theme)
            setTimeout(() => {
                // Success output
                statusAlert.className = 'form-status-alert success';
                statusAlert.textContent = 'Thank you, Mohan! Your ticket has been logged and Mohan will contact you shortly.';
                
                // Reset form
                form.reset();
                
                // Restore button
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitIcon.className = 'fa-solid fa-paper-plane send-icon';
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    statusAlert.className = 'form-status-alert';
                    statusAlert.textContent = '';
                }, 6000);
                
            }, 1800);
        }
    });
    
    // Clear error tags on keyup/input
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
