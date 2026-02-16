const app = {
    // State
    currentTab: 'dashboard',
    searchQuery: '',
    projectFilters: { plan: 'all', difficulty: 'all', status: 'all' },

    // Init
    init() {
        Storage.init();
        this.cacheDOM();
        this.bindEvents();
        this.render();
        this.updateHeaderStats();

        // Remove loader
        const loader = document.getElementById('app-loader');
        const appContainer = document.getElementById('app');
        if (loader) loader.style.display = 'none';
        if (appContainer) appContainer.style.display = 'block';
    },

    cacheDOM() {
        this.dom = {
            main: document.getElementById('main-content'),
            sidebarLinks: document.querySelectorAll('.sidebar .nav-item'),
            daysLeft: document.getElementById('days-left'),
            themeToggle: document.getElementById('theme-toggle'),
            sidebar: document.querySelector('.sidebar'),
            mobileToggle: document.getElementById('mobile-menu-toggle')
        };
    },

    bindEvents() {
        // Tab Switching (Sidebar)
        this.dom.sidebarLinks.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const target = e.currentTarget;
                this.switchTab(target.dataset.tab);
            });
        });

        // Theme Toggle
        if (this.dom.themeToggle) {
            // Restore saved theme
            const savedTheme = localStorage.getItem('pathweaver_theme');
            if (savedTheme) {
                document.documentElement.setAttribute('data-theme', savedTheme);
                this.dom.themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
            }

            this.dom.themeToggle.addEventListener('click', () => {
                const html = document.documentElement;
                const current = html.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', next);
                this.dom.themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
                localStorage.setItem('pathweaver_theme', next);
            });
        }

        // Mobile Menu Toggle
        if (this.dom.mobileToggle) {
            this.dom.mobileToggle.addEventListener('click', () => {
                if (this.dom.sidebar) {
                    this.dom.sidebar.classList.toggle('active');
                }
            });
        }

        // Global Search Listener
        document.addEventListener('input', (e) => {
            if (e.target.matches('#global-search')) {
                const query = e.target.value;
                if (query.length > 2) {
                    this.currentTab = 'search';
                    this.searchQuery = query;
                    this.render();
                } else if (this.currentTab === 'search') {
                    this.switchTab('dashboard');
                }
            }
        });
    },

    // --- Project Logic ---
    updateProjectFilter(type, value) {
        this.projectFilters[type] = value;
        this.render();
    },

    openProjectModal(id) {
        const project = careerData.projects.find(p => p.id == id);
        if (!project) return;
        const state = Storage.getProjectState(id);

        const modalHtml = Views.projectModal(project, state);
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        // Close modal on overlay click
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });
        }
        this.trapFocus(document.getElementById('project-modal'));
    },

    saveProjectDetails(id) {
        const status = document.getElementById('p-status').value;
        const time = document.getElementById('p-time').value;
        const income = document.getElementById('p-income').value;
        const notes = document.getElementById('p-notes').value;
        const link = document.getElementById('p-link').value;

        Storage.saveProjectState(id, {
            status, timeSpent: time, incomeEarned: income, notes, demoLink: link,
            lastUpdated: new Date().toISOString()
        });

        const modal = document.getElementById('project-modal');
        if (modal) modal.remove();
        this.render(); // Refresh to show updated status
    },

    openResourceModal(planId, resourceName) {
        const meta = Storage.getResourceMeta(planId, resourceName) || { rating: 0, note: '' };

        const modalHtml = `
            <div class="modal-overlay" id="resource-modal">
                <div class="modal-content glass">
                    <span class="modal-close" onclick="document.getElementById('resource-modal').remove()">&times;</span>
                    <h3>${resourceName}</h3>
                    
                    <div class="mb-2">
                        <label>Difficulty / Rating:</label>
                        <div class="star-rating">
                            ${[1, 2, 3, 4, 5].map(i => `
                                <span class="star ${i <= meta.rating ? 'active' : ''}" onclick="app.setRating(${i})">★</span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="mb-2">
                        <label>My Notes:</label>
                        <textarea id="modal-note" class="note-input glass" rows="4" placeholder="What did you learn?">${meta.note}</textarea>
                    </div>

                    <button class="btn-primary" onclick="app.saveResourceMeta('${planId}', '${resourceName}')">Save Notes</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        // Close modal on overlay click
        const resourceModal = document.getElementById('resource-modal');
        if (resourceModal) {
            resourceModal.addEventListener('click', (e) => {
                if (e.target === resourceModal) resourceModal.remove();
            });
        }
        this.trapFocus(document.getElementById('resource-modal'));
        this.tempRating = meta.rating;
    },

    setRating(val) {
        this.tempRating = val;
        // Visual update
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach((s, idx) => {
            s.classList.toggle('active', idx < val);
        });
    },

    saveResourceMeta(planId, resourceName) {
        const note = document.getElementById('modal-note').value;
        Storage.saveResourceMeta(planId, resourceName, {
            rating: this.tempRating,
            note: note
        });
        this.closeModal('resource-modal');
        this.refreshProgressUI(planId);
    },

    closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.remove();
            if (this.lastActiveElement) {
                this.lastActiveElement.focus();
            }
        }
    },

    trapFocus(modal) {
        this.lastActiveElement = document.activeElement;
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        modal.addEventListener('keydown', (e) => {
            let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

            if (!isTabPressed) {
                if (e.key === 'Escape') this.closeModal(modal.id);
                return;
            }

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });

        if (firstFocusableElement) firstFocusableElement.focus();
    },

    switchTab(tab, phaseIdx = null) {
        console.log(`[Pathweaver] Switching to tab: ${tab}${phaseIdx !== null ? `, phase: ${phaseIdx}` : ''}`);
        this.currentTab = tab;

        // Update Sidebar UI
        const items = document.querySelectorAll('.sidebar .nav-item');
        items.forEach(t => t.classList.remove('active'));
        const activeItem = document.querySelector(`.sidebar [data-tab="${tab}"]`);
        if (activeItem) activeItem.classList.add('active');

        // Render View
        this.render();

        // Handle scrolling to phase if provided
        if (phaseIdx !== null) {
            setTimeout(() => {
                const planLetter = tab.replace('plan', '');
                const element = document.getElementById(`plan-${planLetter}-phase-${phaseIdx}`);
                if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768 && this.dom.sidebar) {
            this.dom.sidebar.classList.remove('active');
        }
    },

    updateHeaderStats() {
        const now = new Date();
        const endYear = new Date('2026-12-31T23:59:59');
        const diff = endYear - now;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        // Update current date
        const dateEl = document.getElementById('current-date');
        if (dateEl) {
            dateEl.textContent = now.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        }

        // Update countdowns (both sidebar and header)
        const daysEl = document.getElementById('days-left');
        const headerDaysEl = document.getElementById('header-days-left');

        const daysText = days > 0 ? days : 0;
        if (daysEl) daysEl.textContent = daysText;
        if (headerDaysEl) headerDaysEl.textContent = `${daysText} Days`;
    },

    // Rendering Engine
    render() {
        console.log(`[Pathweaver] Render starting for tab: ${this.currentTab}`);
        let html = '';
        try {
            switch (this.currentTab) {
                case 'dashboard': html = Views.dashboard(); break;
                case 'planA': html = Views.plan('A'); break;
                case 'planB': html = Views.plan('B'); break;
                case 'planC': html = Views.plan('C'); break;
                case 'projects': html = Views.projects(); break;
                case 'uganda': html = Views.uganda(); break;
                case 'income': html = Views.income(); break;
                case 'search': html = Views.search(this.searchQuery); break;
                default: html = '<h1>404 - Not Found</h1>';
            }
            console.log(`[Pathweaver] ${this.currentTab} HTML generated successfully (${html.length} chars)`);
        } catch (err) {
            console.error('[Pathweaver] Render Crash:', err);
            html = `
                <div class="glass p-3 text-center">
                    <h2 style="color: var(--error)">⚠️ Engine Stall</h2>
                    <p>We encountered a technical glitch while weaving this path.</p>
                    <pre style="font-size: 0.8rem; background: rgba(0,0,0,0.3); padding: 1rem; margin-top: 1rem; text-align: left;">${err.stack}</pre>
                    <button onclick="location.reload()" class="btn-primary mt-1">Restart Engine</button>
                </div>
            `;
        }

        if (this.dom.main) {
            this.dom.main.innerHTML = html;
        }
        this.postRender();
    },

    postRender() {
        const checkboxes = document.querySelectorAll('.resource-check');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                const planId = e.target.dataset.plan;
                const resourceName = e.target.dataset.resource;
                Storage.toggleResource(planId, resourceName);
                this.refreshProgressUI(planId);
            });
        });

        const incomeForm = document.getElementById('income-add-form');
        if (incomeForm) {
            incomeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const entry = {
                    project: document.getElementById('inc-project').value,
                    client: document.getElementById('inc-client').value,
                    amount: parseFloat(document.getElementById('inc-amount').value),
                    date: document.getElementById('inc-date').value
                };
                Storage.addIncomeEntry(entry);
                this.render();
            });
        }
    },

    refreshProgressUI(planId) {
        if (this.currentTab === 'dashboard' || this.currentTab.startsWith('plan')) {
            this.render();
        }
    },

    // Export/Import
    exportData() {
        const data = Storage.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pathweaver_backup.json';
        a.click();
    },

    importData(input) {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            if (Storage.importData(e.target.result)) {
                alert('Data imported successfully!');
                location.reload();
            } else {
                alert('Failed to import data.');
            }
        };
        reader.readAsText(file);
    },

    clearAllData() {
        if (confirm('Are you sure you want to clear all progress and data? This cannot be undone.')) {
            Storage.clearAll();
            alert('All data cleared.');
            location.reload();
        }
    }
};

// View Templates
const Views = {
    dashboard() {
        const stats = Storage.getGlobalStats();

        // Calculate progress for Plan A (featured)
        const planA = careerData.plans['A'];
        const progress = Storage.load(Storage.KEYS.PROGRESS, {});
        const completedA = progress['A'] ? progress['A'].length : 0;
        let totalA = 0;
        planA.phases.forEach(p => totalA += p.resources.length);
        const percentA = totalA > 0 ? Math.round((completedA / totalA) * 100) : 0;

        return `
            <div class="hero-section glass mb-2 dashboard-hero">
                <h1>Weave Your <span class="accent-text">Technical Destiny</span></h1>
                <p>Pathweaver is your high-performance career architect, designed to guide you to mastery.</p>
                <div class="hero-actions">
                    <button onclick="app.switchTab('planA')" class="btn-primary">Start Journey</button>
                    <button onclick="app.switchTab('projects')" class="btn-secondary glass">Explore Projects</button>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card glass p-2">
                    <div class="stat-icon">🎯</div>
                    <h3>${stats.totalResources}</h3>
                    <p class="text-muted">Resources Tracked</p>
                </div>
                <div class="stat-card glass p-2">
                    <div class="stat-icon">✅</div>
                    <h3>${stats.completedResources}</h3>
                    <p class="text-muted">Modules Completed</p>
                </div>
                <div class="stat-card glass p-2">
                    <div class="stat-icon">🚀</div>
                    <h3>${stats.activeProjects}</h3>
                    <p class="text-muted">Live Projects</p>
                </div>
                <div class="stat-card glass p-2">
                    <div class="stat-icon">💰</div>
                    <h3>${stats.totalIncome.toLocaleString()}</h3>
                    <p class="text-muted">Total UGX Earned</p>
                </div>
            </div>

            <div class="dashboard-grid mt-2">
                <div class="glass p-2">
                    <h3>Focus: ${planA.title}</h3>
                    <div class="mt-1">
                        <div class="focus-item glass p-1" onclick="app.switchTab('planA')">
                            <span class="focus-icon">${planA.icon}</span>
                            <div class="focus-details">
                                <strong>${planA.subtitle}</strong>
                                <div class="progress-info" style="display:flex; justify-content: space-between; font-size: 0.8rem;">
                                    <span>${percentA}% Completed</span>
                                    <span>${completedA}/${totalA} Resources</span>
                                </div>
                                <div class="progress-container compact">
                                    <div class="progress-bar" style="width: ${percentA}%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="glass p-2">
                    <h3>Quick Navigator</h3>
                    <div class="navigator-pills mt-1">
                        <button class="badge glass pill" onclick="app.switchTab('uganda')">🇺🇬 local_hub</button>
                        <button class="badge glass pill" onclick="app.switchTab('projects')">🚀 projects</button>
                        <button class="badge glass pill" onclick="app.switchTab('income')">💰 earnings</button>
                    </div>
                </div>
            </div>
        `;
    },

    projects() {
        const { plan, difficulty, status } = app.projectFilters;
        let pList = careerData.projects;
        const pStates = Storage.getAllProjectStates();

        if (plan !== 'all') pList = pList.filter(p => p.plan === plan);
        if (difficulty !== 'all') pList = pList.filter(p => p.difficulty.toLowerCase().includes(difficulty.toLowerCase()));
        if (status !== 'all') pList = pList.filter(p => {
            const s = pStates[p.id]?.status || 'not-started';
            return s === status;
        });

        const cards = pList.map(p => {
            const state = pStates[p.id] || {};
            const st = state.status || 'not-started';
            const stDisplay = st.replace('-', ' ');
            const stClass = `status-${st}`;

            return `
                <div class="card glass p-2">
                    <div class="project-card-header mb-1">
                        <span class="badge glass plan-badge" style="background: ${careerData.plans[p.plan].color}">${careerData.plans[p.plan].icon} Plan ${p.plan}</span>
                        <span class="status-badge ${stClass}">${stDisplay}</span>
                    </div>
                    <h3>${p.name}</h3>
                    <p class="project-desc">${p.desc}</p>
                    <button class="btn-primary full-width" onclick="app.openProjectModal(${p.id})">Details</button>
                </div>
            `;
        }).join('');

        return `
            <div class="hero-section glass mb-2">
                <h1>🚀 Project Forge</h1>
                <div class="project-filters mt-1">
                    <select class="filter-select glass" onchange="app.updateProjectFilter('plan', this.value)">
                        <option value="all" ${plan === 'all' ? 'selected' : ''}>All Specializations</option>
                        <option value="A" ${plan === 'A' ? 'selected' : ''}>Cybersecurity</option>
                        <option value="B" ${plan === 'B' ? 'selected' : ''}>Django Development</option>
                        <option value="C" ${plan === 'C' ? 'selected' : ''}>IT Support</option>
                    </select>
                </div>
            </div>
            <div class="grid animate-fade-in">
                ${cards.length ? cards : `
                    <div class="glass p-3 text-center full-width">
                        <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">🔍</div>
                        <h3>No Projects Found</h3>
                        <p class="text-muted">Adjust your filters to see more technical challenges.</p>
                    </div>
                `}
            </div>
        `;
    },

    projectModal(p, state) {
        return `
            <div class="modal-overlay glass" id="project-modal">
                <div class="modal-content glass modal-large">
                    <div class="modal-header">
                        <h2>${p.name}</h2>
                        <span class="modal-close" onclick="document.getElementById('project-modal').remove()">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="modal-grid">
                            <div class="modal-main">
                                <h4 class="accent-color">Architectural Steps</h4>
                                <ul class="steps-list">
                                    ${p.steps.map(s => `<li>${s}</li>`).join('')}
                                </ul>
                                <h4 class="accent-color mt-2">Developer Chronicles</h4>
                                <textarea id="p-notes" class="glass note-input" placeholder="Notes...">${state.notes || ''}</textarea>
                            </div>
                            <div class="modal-sidebar glass p-2">
                                <div class="input-group">
                                    <label>STATUS</label>
                                    <select id="p-status" class="glass full-width">
                                        <option value="not-started" ${(state.status || 'not-started') === 'not-started' ? 'selected' : ''}>Not Started</option>
                                        <option value="in-progress" ${(state.status || '') === 'in-progress' ? 'selected' : ''}>In Progress</option>
                                        <option value="completed" ${(state.status || '') === 'completed' ? 'selected' : ''}>Completed</option>
                                        <option value="deployed" ${(state.status || '') === 'deployed' ? 'selected' : ''}>Deployed</option>
                                    </select>
                                </div>
                                <div class="input-group mt-1">
                                    <label>TIME INVESTED</label>
                                    <input type="text" id="p-time" class="glass full-width" value="${state.timeSpent || ''}">
                                </div>
                                <div class="input-group mt-1">
                                    <label>INCOME (UGX)</label>
                                    <input type="text" id="p-income" class="glass full-width" value="${state.incomeEarned || ''}">
                                </div>
                                <div class="input-group mt-1">
                                    <label>DEPLOYMENT LINK</label>
                                    <input type="text" id="p-link" class="glass full-width" value="${state.demoLink || ''}">
                                </div>
                                <button class="btn-primary full-width mt-1" onclick="app.saveProjectDetails(${p.id})">Save Progress</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    search(query) {
        if (!query) return this.dashboard();
        const lowerQ = query.toLowerCase();
        let results = [];

        ['A', 'B', 'C'].forEach(id => {
            const plan = careerData.plans[id];
            plan.phases.forEach((phase, pIdx) => {
                // Search Phase Title
                if (phase.title.toLowerCase().includes(lowerQ)) {
                    results.push({ name: phase.title, planId: id, phaseIdx: pIdx, category: 'Phase' });
                }
                // Search Resources
                phase.resources.forEach(r => {
                    const searchable = (r.name + ' ' + (r.platform || '') + ' ' + (r.type || '')).toLowerCase();
                    if (searchable.includes(lowerQ)) {
                        results.push({ ...r, planId: id, phaseIdx: pIdx, category: 'Resource' });
                    }
                });
                // Search Tools
                if (phase.tools) {
                    phase.tools.forEach(t => {
                        const searchable = (t.name + ' ' + (t.desc || '')).toLowerCase();
                        if (searchable.includes(lowerQ)) {
                            results.push({ ...t, planId: id, phaseIdx: pIdx, category: 'Tool' });
                        }
                    });
                }
            });
        });

        careerData.projects.forEach(p => {
            const searchable = (p.name + ' ' + (p.desc || '') + ' ' + (p.skills.join(' ')) + ' ' + (p.steps.join(' '))).toLowerCase();
            if (searchable.includes(lowerQ)) {
                results.push({ ...p, category: 'Project' });
            }
        });

        const list = results.map(r => {
            const clickAction = r.category === 'Project'
                ? `app.switchTab('projects')`
                : `app.switchTab('plan${r.planId}', ${r.phaseIdx})`;

            return `
                <div class="card glass mb-2 p-1 search-result-card">
                    <div class="result-info">
                        <strong>${r.name}</strong>
                        <small class="text-muted">${r.category} ${r.planId ? `(${careerData.plans[r.planId].title})` : ''}</small>
                    </div>
                    <button class="badge glass" onclick="${clickAction}">View</button>
                </div>
            `;
        }).join('');

        return `
            <div class="hero-section glass mb-2">
                <h2>🔍 Search: "${query}"</h2>
                <p class="text-muted">Detected ${results.length} relevant nodes.</p>
            </div>
            <div class="search-results-list animate-fade-in">
                ${results.length ? list : `
                    <div class="glass p-3 text-center">
                        <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">🛰️</div>
                        <h3>Deep Space Search</h3>
                        <p class="text-muted">No signals matching "${query}" were found in our technical records.</p>
                    </div>
                `}
            </div>
        `;
    },

    plan(planLetter) {
        console.log(`[Pathweaver] Fetching Plan: ${planLetter}`);
        const plan = careerData.plans[planLetter];
        if (!plan) {
            throw new Error(`Plan data for '${planLetter}' is missing from careerData.`);
        }

        console.log(`[Pathweaver] Plan ${planLetter} (${plan.title}) - Phases: ${plan.phases.length}`);

        const phasesHtml = plan.phases.map((phase, idx) => {
            console.log(`[Pathweaver] Phase ${idx + 1}: ${phase.resources.length} resources found.`);
            const resourceList = phase.resources.map(r => {
                const isChecked = Storage.isResourceCompleted(planLetter, r.name) ? 'checked' : '';
                return `
                    <div class="resource-item">
                        <input type="checkbox" class="resource-check" data-plan="${planLetter}" data-resource="${r.name}" ${isChecked}>
                        <a href="${r.url}" target="_blank" class="resource-link">${r.name}</a>
                        <button class="btn-icon" onclick="app.openResourceModal('${planLetter}', '${r.name.replace(/'/g, "\\'")}')">✏️</button>
                    </div>
                `;
            }).join('');

            const toolsHtml = phase.tools ? `
                <div class="tools-grid-compact mt-1">
                    ${phase.tools.map(t => `<div class="tool-card-compact"><a href="${t.url}" target="_blank">${t.name}</a></div>`).join('')}
                </div>
            ` : '';

            return `
                <div id="plan-${planLetter}-phase-${idx}" class="card glass mb-2 p-2 plan-phase-card animate-fade-in" style="animation-delay: ${idx * 0.1}s">
                    <h3>${phase.title}</h3>
                    <div class="resource-list mt-1">${resourceList}</div>
                    ${toolsHtml}
                </div>
            `;
        }).join('');

        return `
            <div id="plan-view-${planLetter}" class="plan-container">
                <div class="hero-section glass mb-2 plan-hero" style="border-left: 6px solid ${plan.color};">
                    <h1>${plan.icon} ${plan.title}</h1>
                    <p class="text-muted">${plan.subtitle || ''}</p>
                </div>
                <div class="phases-wrapper">
                    ${phasesHtml}
                </div>
            </div>
        `;
    },

    uganda() {
        const jobsHtml = careerData.uganda.jobs.map(j => `
            <a href="${j.url}" target="_blank" class="hub-link glass">${j.name}</a>
        `).join('');

        const communitiesHtml = careerData.uganda.communities.map(c => `
            <a href="${c.url}" target="_blank" class="hub-link glass">${c.name}</a>
        `).join('');

        return `
            <div class="hero-section glass mb-2 animate-fade-in">
                <h1>🇺🇬 Uganda Tech Hub</h1>
                <p class="text-muted">Empowering local talent with professional roadmaps and local opportunities.</p>
            </div>
            <div class="responsive-grid animate-fade-in" style="animation-delay: 0.2s">
                <div class="glass p-2">
                    <h3 class="accent-color mb-1">Local Job Boards</h3>
                    <div class="hub-list">
                        ${jobsHtml}
                    </div>
                </div>
                <div class="glass p-2">
                    <h3 class="violet-color mb-1">Tech Communities</h3>
                    <div class="hub-list">
                        ${communitiesHtml}
                    </div>
                </div>
            </div>
        `;
    },

    income() {
        const entries = Storage.getIncomeEntries();
        const total = entries.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

        return `
            <div class="hero-section glass mb-2">
                <h1>💰 Wealth Weaver</h1>
                <div class="income-stats">
                    <h2 class="accent-color total-income">${total.toLocaleString()} UGX</h2>
                    <p class="text-muted">Total Portfolio Earnings</p>
                </div>
            </div>
            <div class="responsive-grid">
                <div class="glass p-2">
                    <h3>Log Transaction</h3>
                    <form id="income-add-form" class="mt-1">
                        <input type="text" id="inc-project" placeholder="Source" class="glass full-width" required>
                        <input type="text" id="inc-client" placeholder="Client" class="glass full-width" required>
                        <input type="number" id="inc-amount" placeholder="Amount" class="glass full-width" required>
                        <input type="date" id="inc-date" class="glass full-width" required>
                        <button type="submit" class="btn-primary full-width mt-1">Add to Vault</button>
                    </form>
                </div>
                <div class="glass p-2">
                    <h3>Transaction Log</h3>
                    <div class="income-log mt-1">
                        ${entries.length ? entries.map((e, idx) => `
                            <div class="glass p-1 mb-1 log-entry">
                                <div class="entry-info">
                                    <strong>${e.project}</strong>
                                    <small>${e.client}</small>
                                </div>
                                <div class="entry-math">
                                    <span class="earned-text">+${e.amount.toLocaleString()}</span>
                                    <button class="btn-icon delete-btn" onclick="Storage.deleteIncomeEntry(${idx}); app.render();">🗑️</button>
                                </div>
                            </div>
                        `).join('') : '<p class="text-center text-muted p-2">The vault is currently empty.</p>'}
                    </div>
                </div>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
