/* =====================================================
   LEARNING PATH TRACKER - JAVASCRIPT
   Handles resources, progress tracking, and localStorage
   ===================================================== */

// ===========================================
// LEARNING RESOURCES DATA
// All resources are free, current (2024-2025), and from reputable sources
// ===========================================

const resources = {
    // ========== PLAN A: CYBERSECURITY ==========
    planA: {
        // --- SOC Analyst Resources ---
        'soc-courses': [
            {
                id: 'soc-1',
                title: 'TryHackMe - SOC Level 1 Path',
                url: 'https://tryhackme.com/path/outline/soclevel1',
                description: 'Comprehensive hands-on path covering SIEM, log analysis, and incident response.',
                tags: [{ text: 'TryHackMe', type: 'platform' }, { text: 'Interactive', type: 'type' }]
            },
            {
                id: 'soc-2',
                title: 'Blue Team Labs Online - Free Challenges',
                url: 'https://blueteamlabs.online/',
                description: 'Practice blue team skills with real-world scenarios and investigations.',
                tags: [{ text: 'BTLO', type: 'platform' }, { text: 'Hands-on Labs', type: 'type' }]
            },
            {
                id: 'soc-3',
                title: 'LetsDefend - SOC Analyst Training',
                url: 'https://letsdefend.io/',
                description: 'Free tier available with SOC analyst simulations and alert investigations.',
                tags: [{ text: 'LetsDefend', type: 'platform' }, { text: 'Simulation', type: 'type' }]
            },
            {
                id: 'soc-4',
                title: 'Cybrary - SOC Analyst Fundamentals',
                url: 'https://www.cybrary.it/',
                description: 'Free cybersecurity courses covering SOC fundamentals and tools.',
                tags: [{ text: 'Cybrary', type: 'platform' }, { text: 'Video Course', type: 'type' }]
            }
        ],
        'soc-docs': [
            {
                id: 'soc-doc-1',
                title: 'Splunk Free Training & Docs',
                url: 'https://www.splunk.com/en_us/training/free-courses.html',
                description: 'Official Splunk free courses and comprehensive documentation for SIEM.',
                tags: [{ text: 'Splunk', type: 'platform' }, { text: 'Official Docs', type: 'type' }]
            },
            {
                id: 'soc-doc-2',
                title: 'Elastic Security Documentation',
                url: 'https://www.elastic.co/guide/en/security/current/index.html',
                description: 'Free Elastic SIEM documentation and getting started guides.',
                tags: [{ text: 'Elastic', type: 'platform' }, { text: 'Official Docs', type: 'type' }]
            },
            {
                id: 'soc-doc-3',
                title: 'MITRE ATT&CK Framework',
                url: 'https://attack.mitre.org/',
                description: 'Essential knowledge base of adversary tactics and techniques.',
                tags: [{ text: 'MITRE', type: 'platform' }, { text: 'Framework', type: 'type' }]
            }
        ],
        'soc-youtube': [
            {
                id: 'soc-yt-1',
                title: 'John Hammond - SOC & Blue Team Content',
                url: 'https://www.youtube.com/@_JohnHammond',
                description: 'Regular uploads on malware analysis, CTFs, and security topics.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Active 2024', type: 'type' }]
            },
            {
                id: 'soc-yt-2',
                title: 'NetworkChuck - Security Fundamentals',
                url: 'https://www.youtube.com/@NetworkChuck',
                description: 'Beginner-friendly security and networking content with great energy.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Beginner', type: 'type' }]
            },
            {
                id: 'soc-yt-3',
                title: 'The Cyber Mentor - SOC Tutorials',
                url: 'https://www.youtube.com/@TCMSecurityAcademy',
                description: 'Practical security tutorials from industry professional.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Practical', type: 'type' }]
            }
        ],

        // --- Pentesting Resources ---
        'pentest-courses': [
            {
                id: 'pen-1',
                title: 'TryHackMe - Jr Penetration Tester Path',
                url: 'https://tryhackme.com/path/outline/jrpenetrationtester',
                description: 'Step-by-step path from basics to conducting penetration tests.',
                tags: [{ text: 'TryHackMe', type: 'platform' }, { text: 'Learning Path', type: 'type' }]
            },
            {
                id: 'pen-2',
                title: 'Hack The Box Academy - Free Modules',
                url: 'https://academy.hackthebox.com/',
                description: 'High-quality pentesting modules with hands-on exercises.',
                tags: [{ text: 'HTB Academy', type: 'platform' }, { text: 'Free Tier', type: 'type' }]
            },
            {
                id: 'pen-3',
                title: 'PortSwigger Web Security Academy',
                url: 'https://portswigger.net/web-security',
                description: 'Completely free, comprehensive web application security training.',
                tags: [{ text: 'PortSwigger', type: 'platform' }, { text: 'Web Security', type: 'type' }]
            },
            {
                id: 'pen-4',
                title: 'PentesterLab - Free Exercises',
                url: 'https://pentesterlab.com/exercises',
                description: 'Learn web penetration testing with practical exercises.',
                tags: [{ text: 'PentesterLab', type: 'platform' }, { text: 'Exercises', type: 'type' }]
            },
            {
                id: 'pen-5',
                title: 'OverTheWire Wargames',
                url: 'https://overthewire.org/wargames/',
                description: 'Classic security wargames for learning Linux and exploitation.',
                tags: [{ text: 'OverTheWire', type: 'platform' }, { text: 'Wargames', type: 'type' }]
            }
        ],
        'pentest-docs': [
            {
                id: 'pen-doc-1',
                title: 'OWASP Testing Guide',
                url: 'https://owasp.org/www-project-web-security-testing-guide/',
                description: 'Comprehensive web application security testing methodology.',
                tags: [{ text: 'OWASP', type: 'platform' }, { text: 'Methodology', type: 'type' }]
            },
            {
                id: 'pen-doc-2',
                title: 'HackTricks - Pentesting Wiki',
                url: 'https://book.hacktricks.xyz/',
                description: 'Massive collection of pentesting techniques and commands.',
                tags: [{ text: 'HackTricks', type: 'platform' }, { text: 'Wiki', type: 'type' }]
            },
            {
                id: 'pen-doc-3',
                title: 'PayloadsAllTheThings',
                url: 'https://github.com/swisskyrepo/PayloadsAllTheThings',
                description: 'List of useful payloads and bypasses for pentesting.',
                tags: [{ text: 'GitHub', type: 'platform' }, { text: 'Reference', type: 'type' }]
            }
        ],
        'pentest-youtube': [
            {
                id: 'pen-yt-1',
                title: 'IppSec - HTB Walkthroughs',
                url: 'https://www.youtube.com/@ippsec',
                description: 'Detailed Hack The Box machine walkthroughs with methodology.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Walkthroughs', type: 'type' }]
            },
            {
                id: 'pen-yt-2',
                title: 'The Cyber Mentor - Ethical Hacking',
                url: 'https://www.youtube.com/@TCMSecurityAcademy',
                description: 'Full ethical hacking courses available for free.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Full Course', type: 'type' }]
            },
            {
                id: 'pen-yt-3',
                title: 'LiveOverflow - Security Research',
                url: 'https://www.youtube.com/@LiveOverflow',
                description: 'Deep dives into security topics and CTF writeups.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Advanced', type: 'type' }]
            }
        ],

        // --- Red Teaming Resources ---
        'redteam-courses': [
            {
                id: 'red-1',
                title: 'TryHackMe - Red Team Path',
                url: 'https://tryhackme.com/path/outline/redteaming',
                description: 'Advanced path covering red team operations and techniques.',
                tags: [{ text: 'TryHackMe', type: 'platform' }, { text: 'Advanced', type: 'type' }]
            },
            {
                id: 'red-2',
                title: 'Hack The Box - Pro Labs (Free Starter)',
                url: 'https://www.hackthebox.com/',
                description: 'Start with free machines, progress to enterprise simulations.',
                tags: [{ text: 'HTB', type: 'platform' }, { text: 'Free Tier', type: 'type' }]
            },
            {
                id: 'red-3',
                title: 'DVWA - Damn Vulnerable Web App',
                url: 'https://github.com/digininja/DVWA',
                description: 'Practice web exploitation in a safe environment.',
                tags: [{ text: 'GitHub', type: 'platform' }, { text: 'Practice Lab', type: 'type' }]
            }
        ],
        'redteam-docs': [
            {
                id: 'red-doc-1',
                title: 'Red Team Development and Operations',
                url: 'https://redteam.guide/',
                description: 'Free online guide to red team concepts and operations.',
                tags: [{ text: 'RedTeam.Guide', type: 'platform' }, { text: 'Guide', type: 'type' }]
            },
            {
                id: 'red-doc-2',
                title: 'Atomic Red Team',
                url: 'https://github.com/redcanaryco/atomic-red-team',
                description: 'Library of simple tests mapped to MITRE ATT&CK.',
                tags: [{ text: 'GitHub', type: 'platform' }, { text: 'Testing', type: 'type' }]
            },
            {
                id: 'red-doc-3',
                title: 'The Hacker Playbook Blog',
                url: 'https://thehackerplaybook.com/dashboard/',
                description: 'Companion materials and updates for advanced techniques.',
                tags: [{ text: 'Blog', type: 'platform' }, { text: 'Still relevant', type: 'note' }]
            }
        ],
        'redteam-youtube': [
            {
                id: 'red-yt-1',
                title: 'STÖK - Bug Bounty & Red Team',
                url: 'https://www.youtube.com/@STOKfredrik',
                description: 'Bug bounty methodology and hacker culture content.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Active 2024', type: 'type' }]
            },
            {
                id: 'red-yt-2',
                title: 'Computerphile - Security Theory',
                url: 'https://www.youtube.com/@Computerphile',
                description: 'Deep explanations of security concepts and cryptography.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Theory', type: 'type' }]
            }
        ]
    },

    // ========== PLAN B: FULL-STACK WEB DEVELOPMENT ==========
    planB: {
        'courses': [
            {
                id: 'web-1',
                title: 'freeCodeCamp - Responsive Web Design',
                url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
                description: 'Learn HTML & CSS fundamentals with hands-on projects.',
                tags: [{ text: 'freeCodeCamp', type: 'platform' }, { text: 'Certification', type: 'type' }]
            },
            {
                id: 'web-2',
                title: 'freeCodeCamp - JavaScript Algorithms',
                url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
                description: 'Master JavaScript fundamentals and problem-solving.',
                tags: [{ text: 'freeCodeCamp', type: 'platform' }, { text: 'Certification', type: 'type' }]
            },
            {
                id: 'web-3',
                title: 'freeCodeCamp - Back End Python',
                url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
                description: 'Learn back-end development concepts and APIs.',
                tags: [{ text: 'freeCodeCamp', type: 'platform' }, { text: 'Certification', type: 'type' }]
            },
            {
                id: 'web-4',
                title: 'CS50 Web - Harvard (edX)',
                url: 'https://cs50.harvard.edu/web/',
                description: 'Free Harvard course on web development with Python and JavaScript.',
                tags: [{ text: 'Harvard/edX', type: 'platform' }, { text: 'University', type: 'type' }]
            },
            {
                id: 'web-5',
                title: 'The Odin Project - Full Stack Path',
                url: 'https://www.theodinproject.com/',
                description: 'Complete full-stack curriculum with hands-on projects.',
                tags: [{ text: 'Odin Project', type: 'platform' }, { text: 'Full Curriculum', type: 'type' }]
            },
            {
                id: 'web-6',
                title: 'Django Girls Tutorial',
                url: 'https://tutorial.djangogirls.org/',
                description: 'Beginner-friendly Django tutorial building a blog.',
                tags: [{ text: 'Django Girls', type: 'platform' }, { text: 'Beginner', type: 'type' }]
            }
        ],
        'docs': [
            {
                id: 'web-doc-1',
                title: 'MDN Web Docs',
                url: 'https://developer.mozilla.org/',
                description: 'The definitive resource for HTML, CSS, and JavaScript.',
                tags: [{ text: 'Mozilla', type: 'platform' }, { text: 'Reference', type: 'type' }]
            },
            {
                id: 'web-doc-2',
                title: 'Django Official Documentation',
                url: 'https://docs.djangoproject.com/',
                description: 'Comprehensive Django docs with excellent tutorial.',
                tags: [{ text: 'Django', type: 'platform' }, { text: 'Official', type: 'type' }]
            },
            {
                id: 'web-doc-3',
                title: 'Python Official Docs',
                url: 'https://docs.python.org/3/',
                description: 'Python language reference and standard library docs.',
                tags: [{ text: 'Python', type: 'platform' }, { text: 'Official', type: 'type' }]
            },
            {
                id: 'web-doc-4',
                title: 'JavaScript.info',
                url: 'https://javascript.info/',
                description: 'Modern JavaScript tutorial from basics to advanced.',
                tags: [{ text: 'JS.info', type: 'platform' }, { text: 'Tutorial', type: 'type' }]
            },
            {
                id: 'web-doc-5',
                title: 'CSS-Tricks',
                url: 'https://css-tricks.com/',
                description: 'Practical CSS guides, tips, and techniques.',
                tags: [{ text: 'CSS-Tricks', type: 'platform' }, { text: 'Reference', type: 'type' }]
            }
        ],
        'youtube': [
            {
                id: 'web-yt-1',
                title: 'Corey Schafer - Python & Django',
                url: 'https://www.youtube.com/@coreyms',
                description: 'Excellent Django tutorials and Python content.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Still relevant', type: 'note' }]
            },
            {
                id: 'web-yt-2',
                title: 'Traversy Media - Web Development',
                url: 'https://www.youtube.com/@TraversyMedia',
                description: 'Comprehensive web dev tutorials covering modern stack.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Active 2024', type: 'type' }]
            },
            {
                id: 'web-yt-3',
                title: 'freeCodeCamp YouTube',
                url: 'https://www.youtube.com/@freecodecamp',
                description: 'Full-length free coding courses and tutorials.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Full Courses', type: 'type' }]
            },
            {
                id: 'web-yt-4',
                title: 'Fireship - Quick Tech Tutorials',
                url: 'https://www.youtube.com/@Fireship',
                description: 'Fast-paced, informative web development content.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Active 2024', type: 'type' }]
            },
            {
                id: 'web-yt-5',
                title: 'Kevin Powell - CSS Expert',
                url: 'https://www.youtube.com/@KevinPowell',
                description: 'Master CSS with in-depth tutorials and tips.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'CSS Focus', type: 'type' }]
            }
        ]
    },

    // ========== PLAN C: IT / SECURITY SUPPORT ==========
    planC: {
        'courses': [
            {
                id: 'it-1',
                title: 'Professor Messer - CompTIA A+ (2024)',
                url: 'https://www.professormesser.com/free-a-plus-training/',
                description: 'Complete free A+ certification training, latest version.',
                tags: [{ text: 'Messer', type: 'platform' }, { text: 'Certification Prep', type: 'type' }]
            },
            {
                id: 'it-2',
                title: 'Professor Messer - CompTIA Network+',
                url: 'https://www.professormesser.com/network-plus/',
                description: 'Comprehensive Network+ training aligned with current exam.',
                tags: [{ text: 'Messer', type: 'platform' }, { text: 'Certification Prep', type: 'type' }]
            },
            {
                id: 'it-3',
                title: 'Professor Messer - CompTIA Security+',
                url: 'https://www.professormesser.com/security-plus/',
                description: 'Free Security+ certification training (SY0-701).',
                tags: [{ text: 'Messer', type: 'platform' }, { text: 'Certification Prep', type: 'type' }]
            },
            {
                id: 'it-4',
                title: 'Google IT Support Certificate (Audit)',
                url: 'https://www.coursera.org/professional-certificates/google-it-support',
                description: 'Audit courses for free - covers IT fundamentals.',
                tags: [{ text: 'Coursera', type: 'platform' }, { text: 'Free Audit', type: 'type' }]
            },
            {
                id: 'it-5',
                title: 'TryHackMe - Pre Security Path',
                url: 'https://tryhackme.com/path/outline/presecurity',
                description: 'Foundation path for IT and security basics.',
                tags: [{ text: 'TryHackMe', type: 'platform' }, { text: 'Beginner', type: 'type' }]
            }
        ],
        'docs': [
            {
                id: 'it-doc-1',
                title: 'Microsoft Learn - IT Admin',
                url: 'https://learn.microsoft.com/',
                description: 'Free Microsoft learning paths for Windows administration.',
                tags: [{ text: 'Microsoft', type: 'platform' }, { text: 'Official', type: 'type' }]
            },
            {
                id: 'it-doc-2',
                title: 'Linux Journey',
                url: 'https://linuxjourney.com/',
                description: 'Free interactive Linux learning from basics to advanced.',
                tags: [{ text: 'Linux Journey', type: 'platform' }, { text: 'Interactive', type: 'type' }]
            },
            {
                id: 'it-doc-3',
                title: 'Linux Command Line Basics',
                url: 'https://ubuntu.com/tutorials/command-line-for-beginners',
                description: 'Ubuntu official command line tutorial for beginners.',
                tags: [{ text: 'Ubuntu', type: 'platform' }, { text: 'Tutorial', type: 'type' }]
            },
            {
                id: 'it-doc-4',
                title: 'Cisco Networking Basics',
                url: 'https://skillsforall.com/course/networking-basics',
                description: 'Free Cisco networking fundamentals course.',
                tags: [{ text: 'Cisco', type: 'platform' }, { text: 'Free Course', type: 'type' }]
            }
        ],
        'youtube': [
            {
                id: 'it-yt-1',
                title: 'Professor Messer YouTube',
                url: 'https://www.youtube.com/@professormesser',
                description: 'All CompTIA training videos plus study groups.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Active 2024', type: 'type' }]
            },
            {
                id: 'it-yt-2',
                title: 'Learn Linux TV',
                url: 'https://www.youtube.com/@LearnLinuxTV',
                description: 'Excellent Linux tutorials for all skill levels.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Linux Focus', type: 'type' }]
            },
            {
                id: 'it-yt-3',
                title: 'PowerCert Animated Videos',
                url: 'https://www.youtube.com/@PowerCertAnimatedVideos',
                description: 'Simple animated explanations of IT concepts.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Beginner', type: 'type' }]
            },
            {
                id: 'it-yt-4',
                title: 'NetworkChuck',
                url: 'https://www.youtube.com/@NetworkChuck',
                description: 'Fun networking and IT content for beginners.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Active 2024', type: 'type' }]
            },
            {
                id: 'it-yt-5',
                title: 'David Bombal',
                url: 'https://www.youtube.com/@davidbombal',
                description: 'Networking, Python automation, and security content.',
                tags: [{ text: 'YouTube', type: 'platform' }, { text: 'Networking', type: 'type' }]
            }
        ]
    }
};


// ===========================================
// DOM ELEMENTS
// ===========================================
const planTabs = document.querySelectorAll('.plan-tab');
const planSections = document.querySelectorAll('.plan-section');
const resetBtn = document.getElementById('resetBtn');


// ===========================================
// INITIALIZATION
// ===========================================

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderAllResources();
    loadProgress();
    setupEventListeners();
});


// ===========================================
// RENDERING FUNCTIONS
// ===========================================

/**
 * Render all resources to the DOM
 */
function renderAllResources() {
    // Plan A - Cybersecurity
    renderResourceList('planA-soc-courses', resources.planA['soc-courses']);
    renderResourceList('planA-soc-docs', resources.planA['soc-docs']);
    renderResourceList('planA-soc-youtube', resources.planA['soc-youtube']);
    renderResourceList('planA-pentest-courses', resources.planA['pentest-courses']);
    renderResourceList('planA-pentest-docs', resources.planA['pentest-docs']);
    renderResourceList('planA-pentest-youtube', resources.planA['pentest-youtube']);
    renderResourceList('planA-redteam-courses', resources.planA['redteam-courses']);
    renderResourceList('planA-redteam-docs', resources.planA['redteam-docs']);
    renderResourceList('planA-redteam-youtube', resources.planA['redteam-youtube']);

    // Plan B - Web Development
    renderResourceList('planB-courses', resources.planB['courses']);
    renderResourceList('planB-docs', resources.planB['docs']);
    renderResourceList('planB-youtube', resources.planB['youtube']);

    // Plan C - IT Support
    renderResourceList('planC-courses', resources.planC['courses']);
    renderResourceList('planC-docs', resources.planC['docs']);
    renderResourceList('planC-youtube', resources.planC['youtube']);
}

/**
 * Render a single resource list into a container
 * @param {string} containerId - The ID of the container element
 * @param {Array} resourceList - Array of resource objects
 */
function renderResourceList(containerId, resourceList) {
    const container = document.getElementById(containerId);
    if (!container || !resourceList) return;

    container.innerHTML = resourceList.map(resource => `
        <div class="resource-item" data-id="${resource.id}">
            <input 
                type="checkbox" 
                class="resource-checkbox" 
                id="${resource.id}"
                aria-label="Mark ${resource.title} as completed"
            >
            <div class="resource-content">
                <div class="resource-title">
                    <a href="${resource.url}" target="_blank" rel="noopener noreferrer">
                        ${resource.title} ↗
                    </a>
                </div>
                <p class="resource-description">${resource.description}</p>
                <div class="resource-tags">
                    ${resource.tags.map(tag => `
                        <span class="tag tag-${tag.type}">${tag.text}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}


// ===========================================
// PROGRESS TRACKING
// ===========================================

/**
 * Load saved progress from localStorage
 */
function loadProgress() {
    const savedProgress = localStorage.getItem('learningProgress');

    if (savedProgress) {
        const completedItems = JSON.parse(savedProgress);

        // Check each saved item and mark it as completed
        completedItems.forEach(itemId => {
            const checkbox = document.getElementById(itemId);
            if (checkbox) {
                checkbox.checked = true;
                checkbox.closest('.resource-item').classList.add('completed');
            }
        });
    }

    // Update progress bars for all plans
    updateAllProgress();
}

/**
 * Save current progress to localStorage
 */
function saveProgress() {
    const allCheckboxes = document.querySelectorAll('.resource-checkbox');
    const completedItems = [];

    allCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            completedItems.push(checkbox.id);
        }
    });

    localStorage.setItem('learningProgress', JSON.stringify(completedItems));
    updateAllProgress();
}

/**
 * Update progress bars for all plans
 */
function updateAllProgress() {
    updatePlanProgress('planA');
    updatePlanProgress('planB');
    updatePlanProgress('planC');
}

/**
 * Update progress bar for a specific plan
 * @param {string} planId - The plan identifier (planA, planB, planC)
 */
function updatePlanProgress(planId) {
    const planSection = document.getElementById(planId);
    if (!planSection) return;

    const allCheckboxes = planSection.querySelectorAll('.resource-checkbox');
    const completedCheckboxes = planSection.querySelectorAll('.resource-checkbox:checked');

    const total = allCheckboxes.length;
    const completed = completedCheckboxes.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Update progress bar
    const progressBar = document.getElementById(`${planId}-progress-bar`);
    const progressText = document.getElementById(`${planId}-progress-text`);

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }

    if (progressText) {
        progressText.textContent = `${percentage}%`;
    }
}

/**
 * Reset all progress after confirmation
 */
function resetAllProgress() {
    const confirmed = confirm(
        '⚠️ Are you sure you want to reset ALL progress?\n\n' +
        'This will uncheck all completed items and cannot be undone.'
    );

    if (confirmed) {
        // Clear localStorage
        localStorage.removeItem('learningProgress');

        // Uncheck all checkboxes and remove completed class
        const allCheckboxes = document.querySelectorAll('.resource-checkbox');
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.closest('.resource-item').classList.remove('completed');
        });

        // Update all progress bars
        updateAllProgress();
    }
}


// ===========================================
// EVENT LISTENERS
// ===========================================

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Plan tab switching
    planTabs.forEach(tab => {
        tab.addEventListener('click', () => switchPlan(tab));
    });

    // Checkbox changes (using event delegation)
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('resource-checkbox')) {
            handleCheckboxChange(e.target);
        }
    });

    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAllProgress);
    }

    // Theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

/**
 * Switch between plan tabs
 * @param {HTMLElement} clickedTab - The tab that was clicked
 */
function switchPlan(clickedTab) {
    const planId = clickedTab.dataset.plan;

    // Update active tab
    planTabs.forEach(tab => tab.classList.remove('active'));
    clickedTab.classList.add('active');

    // Update active section
    planSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === planId) {
            section.classList.add('active');
        }
    });
}

/**
 * Handle checkbox state changes
 * @param {HTMLInputElement} checkbox - The checkbox element
 */
function handleCheckboxChange(checkbox) {
    const resourceItem = checkbox.closest('.resource-item');

    if (checkbox.checked) {
        resourceItem.classList.add('completed');
    } else {
        resourceItem.classList.remove('completed');
    }

    // Save progress to localStorage
    saveProgress();
}


// ===========================================
// UTILITY FUNCTIONS
// ===========================================

/**
 * Get total resources count for a plan
 * @param {string} planId - The plan identifier
 * @returns {number} Total count of resources
 */
function getTotalResourcesForPlan(planId) {
    const plan = resources[planId];
    if (!plan) return 0;

    let total = 0;
    Object.values(plan).forEach(category => {
        total += category.length;
    });
    return total;
}

/**
 * Get completed resources count for a plan
 * @param {string} planId - The plan identifier
 * @returns {number} Completed count of resources
 */
function getCompletedResourcesForPlan(planId) {
    const planSection = document.getElementById(planId);
    if (!planSection) return 0;

    return planSection.querySelectorAll('.resource-checkbox:checked').length;
}


// ===========================================
// THEME TOGGLE
// ===========================================

/**
 * Initialize theme from localStorage or default to dark
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');

    // Default is dark mode (no data-theme attribute needed)
    // Only set attribute if user previously chose light mode
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
    }
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');

    if (currentTheme === 'light') {
        // Switch to dark mode
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        // Switch to light mode
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}


// Log initialization
console.log('🎯 SkillForge initialized!');
console.log(`Plan A: ${getTotalResourcesForPlan('planA')} resources`);
console.log(`Plan B: ${getTotalResourcesForPlan('planB')} resources`);
console.log(`Plan C: ${getTotalResourcesForPlan('planC')} resources`);
