// =============================================
// Biq's Career Progress Tracker - JavaScript
// =============================================

// Configuration
const STORAGE_KEYS = {
    planA: 'biq_career_plan_a',
    planB: 'biq_career_plan_b',
    planC: 'biq_career_plan_c'
};

// =============================================
// Tab Navigation
// =============================================
function initTabs() {
    const tabButtons = document.querySelectorAll('.nav-tabs button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Remove active from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active to clicked button and target content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });

        // Keyboard Navigation
        button.addEventListener('keydown', (e) => {
            const index = Array.from(tabButtons).indexOf(e.target);
            let newIndex = null;

            if (e.key === 'ArrowRight') {
                newIndex = (index + 1) % tabButtons.length;
            } else if (e.key === 'ArrowLeft') {
                newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            }

            if (newIndex !== null) {
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
            }
        });
    });
}

// =============================================
// LocalStorage Functions
// =============================================
function saveProgress(plan, milestones) {
    const key = STORAGE_KEYS['plan' + plan.toUpperCase()];
    localStorage.setItem(key, JSON.stringify(milestones));
}

function loadProgress(plan) {
    const key = STORAGE_KEYS['plan' + plan.toUpperCase()];
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {};
}

// =============================================
// Progress Calculation & UI Updates
// =============================================
function calculateProgress(plan) {
    const checkboxes = document.querySelectorAll(`.milestone-checkbox[data-plan="${plan}"]`);
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
}

function updateProgressUI(plan) {
    const { completed, total, percentage } = calculateProgress(plan);

    // Update plan-specific progress bar
    const progressBar = document.getElementById(`plan-${plan}-progress`);
    const progressPercent = document.getElementById(`plan-${plan}-percent`);
    const progressCompleted = document.getElementById(`plan-${plan}-completed`);

    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressPercent) progressPercent.textContent = `${percentage}%`;
    if (progressCompleted) progressCompleted.textContent = `${completed} of ${total} milestones completed`;

    // Update dashboard progress
    const dashboardBar = document.getElementById(`dashboard-progress-${plan}`);
    const dashboardPercent = document.getElementById(`dashboard-percent-${plan}`);

    if (dashboardBar) dashboardBar.style.width = `${percentage}%`;
    if (dashboardPercent) dashboardPercent.textContent = `${percentage}%`;
}

function updateAllProgress() {
    ['a', 'b', 'c'].forEach(plan => updateProgressUI(plan));
}

// =============================================
// Milestone Checkbox Handling
// =============================================
function initMilestones() {
    const allCheckboxes = document.querySelectorAll('.milestone-checkbox');

    // Load saved states
    ['a', 'b', 'c'].forEach(plan => {
        const saved = loadProgress(plan);
        Object.keys(saved).forEach(id => {
            const checkbox = document.querySelector(`[data-id="${id}"]`);
            if (checkbox) {
                checkbox.checked = saved[id];
                updateMilestoneStyle(checkbox);
            }
        });
    });

    // Add event listeners
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    // Initial progress calculation
    updateAllProgress();
}

function handleCheckboxChange(event) {
    const checkbox = event.target;
    const plan = checkbox.dataset.plan;
    const id = checkbox.dataset.id;

    // Update visual style
    updateMilestoneStyle(checkbox);

    // Save to localStorage
    const currentSaved = loadProgress(plan);
    currentSaved[id] = checkbox.checked;
    saveProgress(plan, currentSaved);

    // Update progress bars
    updateProgressUI(plan);

    // Check for Phase Completion (Celebration)
    if (checkbox.checked) {
        checkPhaseCompletion(checkbox);
    }
}

function updateMilestoneStyle(checkbox) {
    const milestoneItem = checkbox.closest('.milestone-item');
    if (checkbox.checked) {
        milestoneItem.classList.add('completed');
    } else {
        milestoneItem.classList.remove('completed');
    }
}

// =============================================
// Celebration Logic (Confetti)
// =============================================
function checkPhaseCompletion(checkbox) {
    const phaseList = checkbox.closest('.milestone-list');
    if (!phaseList) return;

    const allInPhase = phaseList.querySelectorAll('.milestone-checkbox');
    const allChecked = Array.from(allInPhase).every(cb => cb.checked);

    if (allChecked) {
        triggerConfetti();
    }
}

function triggerConfetti() {
    const colors = ['#00d4aa', '#00ffc8', '#0ea5e9', '#6366f1', '#f43f5e', '#fbbf24'];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        createParticle(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createParticle(color) {
    const particle = document.createElement('div');
    particle.classList.add('confetti');

    // Random starting position
    const startX = Math.random() * window.innerWidth;
    particle.style.left = `${startX}px`;
    particle.style.top = `-10px`;
    particle.style.backgroundColor = color;

    // Random animation duration and delay
    const duration = Math.random() * 3 + 2; // 2-5s
    const delay = Math.random() * 2;

    particle.style.animation = `confetti-fall ${duration}s linear ${delay}s forwards`;

    document.body.appendChild(particle);

    // Cleanup
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

// =============================================
// Scroll Effect
// =============================================
function initScrollEffect() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}


// =============================================
// Milestone Item Click Handler
// =============================================
function initMilestoneClicks() {
    const milestoneItems = document.querySelectorAll('.milestone-item');
    milestoneItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Only trigger if not clicking directly on checkbox
            if (e.target.type !== 'checkbox') {
                const checkbox = item.querySelector('.milestone-checkbox');
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });
}

// =============================================
// Initialize Application
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initMilestones();
    initMilestoneClicks();
    initTheme();
    initScrollEffect();
    console.log('🔐 Biq\'s Career Progress Tracker initialized!');
    console.log('📊 Progress is automatically saved to localStorage.');
});

// =============================================
// Theme Management
// =============================================
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('biq_theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('biq_theme', newTheme);
    });
}
