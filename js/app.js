const app = {
    // State
    currentTab: 'dashboard',
    searchQuery: '',
    projectFilters: { plan: 'all', difficulty: 'all', status: 'all' },

    // Init
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.render();
        this.updateHeaderStats();

        // Remove loader
        document.getElementById('app-loader').style.display = 'none';
        document.getElementById('app').style.display = 'block';

        // Check for search in URL or state
        if (this.currentTab === 'search') this.renderSearch();
    },

    cacheDOM() {
        this.dom = {
            main: document.getElementById('main-content'),
            tabs: document.querySelectorAll('.nav-item'),
            daysLeft: document.getElementById('days-left'),
            currentDate: document.getElementById('current-date'),
            themeToggle: document.getElementById('theme-toggle')
        };
    },

    bindEvents() {
        // Tab Switching
        this.dom.tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Theme Toggle
        this.dom.themeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            this.dom.themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
        });

        // Global Search Listener
        document.addEventListener('input', (e) => {
            if (e.target.matches('#global-search')) {
                const query = e.target.value;
                if (query.length > 2) {
                    this.currentTab = 'search';
                    this.searchQuery = query;
                    this.render();
                } else if (this.currentTab === 'search' && query.length === 0) {
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
        this.trapFocus(document.getElementById('project-modal'));
    },

    saveProjectDetails(id) {
        const status = document.getElementById('p-status').value;
        const time = document.getElementById('p-time').value;
        const income = document.getElementById('p-income').value;
        const notes = document.getElementById('p-notes').value;
        const link = document.getElementById('p-link').value;
        const github = document.getElementById('p-github').value;

        Storage.saveProjectState(id, {
            status, timeSpent: time, incomeEarned: income, notes, demoLink: link, githubLink: github,
            lastUpdated: new Date().toISOString()
        });

        document.getElementById('project-modal').remove();
        this.render(); // Refresh to show updated status
    },

    openResourceModal(planId, resourceName) {
        const meta = Storage.getResourceMeta(planId, resourceName) || { rating: 0, note: '' };

        const modalHtml = `
            <div class="modal-overlay" id="resource-modal">
                <div class="modal-content">
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
                        <textarea id="modal-note" class="note-input" rows="4" placeholder="What did you learn?">${meta.note}</textarea>
                    </div>

                    <button class="btn-primary" onclick="app.saveResourceMeta('${planId}', '${resourceName}')">Save Notes</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
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
            // Restore focus to last active element if tracked, or main content
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

            if (e.shiftKey) { // if shift key pressed for shift + tab
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); // add focus for the last focusable element
                    e.preventDefault();
                }
            } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                    firstFocusableElement.focus(); // add focus for the first focusable element
                    e.preventDefault();
                }
            }
        });

        if (firstFocusableElement) firstFocusableElement.focus();
    },

    switchTab(tabId) {
        this.currentTab = tabId;
        // Update Nav UI
        this.dom.tabs.forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeTab) activeTab.classList.add('active');
        // Render View
        this.render();
    },

    updateHeaderStats() {
        // Date
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.dom.currentDate.textContent = now.toLocaleDateString('en-US', options);

        // Countdown (Dec 31, 2026) -> Assuming 2025 roadmap but user mentioned 2026 date in history, prompt says 2025. 
        // Current Local Year is 2026. User request says "Career Roadmap 2025". 
        // I'll stick to 2026-12-31 as "End of 2026" or "End of Roadmap" if it's a 2025 roadmap...
        // Wait, "From CS Student to Professional in 2025". It's 2026 now. 
        // I will update the countdown to 2026-12-31 for now as per previous code.
        const endYear = new Date('2026-12-31T23:59:59');
        const diff = endYear - now;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        this.dom.daysLeft.textContent = days > 0 ? days : 0;
    },

    // Rendering Engine
    render() {
        let html = '';
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
        this.dom.main.innerHTML = html;
        this.postRender();

        // Refocus search if needed
        if (this.currentTab === 'search') {
            const input = document.getElementById('global-search');
            if (input) {
                input.focus();
                // move cursor to end
                const len = input.value.length;
                input.setSelectionRange(len, len);
            }
        }
    },

    postRender() {
        // Re-attach listeners for dynamic content
        const checkboxes = document.querySelectorAll('.resource-check');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                const planId = e.target.dataset.plan;
                const resourceName = e.target.dataset.resource;
                Storage.toggleResource(planId, resourceName);
                this.refreshProgressUI(planId);
            });
        });

        // Income Form Listeners
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
                this.render(); // Re-render to show new list
            });
        }
    },

    refreshProgressUI(planId) {
        // Simple re-render for now
        if (this.currentTab === 'dashboard' || this.currentTab.startsWith('plan')) {
            this.render();
        }
    },

    // Export/Import (Exposed to Global)
    exportData() {
        const data = Storage.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'techpath_backup.json';
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
    }
};

// View Templates
const Views = {
    dashboard() {
        const plans = ['A', 'B', 'C'];
        let totalTotal = 0;
        let totalDone = 0;

        const planCards = plans.map(id => {
            const plan = careerData.plans[id];
            const allResources = plan.phases.flatMap(p => p.resources);
            const total = allResources.length;
            const completed = allResources.filter(r => Storage.isResourceCompleted(id, r.name)).length;
            const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

            totalTotal += total;
            totalDone += completed;

            return `
                <div class="card">
                    <h3 style="color: ${plan.color}">${plan.icon} ${plan.title}</h3>
                    <p>${plan.subtitle}</p>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${pct}%; background: ${plan.color}"></div>
                    </div>
                    <p class="text-center">${pct}% Completed</p>
                    <button onclick="app.switchTab('plan${id}')" class="btn-plan-view">View Plan</button>
                </div>
            `;
        }).join('');

        const globalPct = totalTotal === 0 ? 0 : Math.round((totalDone / totalTotal) * 100);

        // Project Stats
        const allProjects = careerData.projects;
        const pStates = Storage.getAllProjectStates();
        const pCompleted = allProjects.filter(p => (pStates[p.id]?.status || 'not-started') === 'completed' || (pStates[p.id]?.status || 'not-started') === 'deployed').length;
        const pInProgress = allProjects.filter(p => (pStates[p.id]?.status || 'not-started') === 'in-progress').length;

        return `
            <div class="search-box">
                <input type="text" id="global-search" class="search-input" placeholder="🔍 Search resources (e.g., 'Python', 'Security')..." value="${app.searchQuery || ''}">
            </div>

            <h2>👋 Welcome Back, Future Pro!</h2>
            <div class="card mb-2 overall-progress-card">
                <h3>Overall Progress</h3>
                <h1>${globalPct}%</h1>
                <div class="progress-container overall-progress-bar-container">
                    <div class="progress-bar overall-progress-bar" style="width: ${globalPct}%;"></div>
                </div>
                <div class="stats-grid">
                    <div>${totalDone}/${totalTotal} Resources</div>
                    <div>${pCompleted} Projects Done</div>
                    <div>${pInProgress} Active</div>
                </div>
            </div>
            <div class="grid">
                ${planCards}
            </div>
        `;
    },

    projects() {
        const { plan, difficulty, status } = app.projectFilters;
        let pList = careerData.projects;
        const pStates = Storage.getAllProjectStates();

        // Filtering
        if (plan !== 'all') pList = pList.filter(p => p.plan === plan);
        if (difficulty !== 'all') pList = pList.filter(p => p.difficulty.toLowerCase().includes(difficulty.toLowerCase()));
        if (status !== 'all') pList = pList.filter(p => {
            const s = pStates[p.id]?.status || 'not-started';
            return s === status;
        });

        // Mapping to HTML
        const cards = pList.map(p => {
            const state = pStates[p.id] || {};
            const st = state.status || 'not-started';
            const stDisplay = st.replace('-', ' ');
            const stClass = `status-${st}`;

            return `
                <div class="card">
                    <div class="project-card-header">
                        <span class="badge" style="background: ${careerData.plans[p.plan].color}">${careerData.plans[p.plan].icon} Plan ${p.plan}</span>
                        <span class="status-badge ${stClass}">${stDisplay}</span>
                    </div>
                    <h3>${p.name}</h3>
                    <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1rem;">${p.desc}</p>
                    
                    <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
                        <span class="difficulty-badge">${p.difficulty}</span>
                        <span class="difficulty-badge">⏱️ ${p.time}</span>
                    </div>

                    <button class="btn-primary" style="width:100%" onclick="app.openProjectModal(${p.id})">Details & Track</button>
                </div>
            `;
        }).join('');

        return `
            <h1>🚀 Project Tracker</h1>
            <div class="project-filters">
                <select class="filter-select" onchange="app.updateProjectFilter('plan', this.value)">
                    <option value="all" ${plan === 'all' ? 'selected' : ''}>All Plans</option>
                    <option value="A" ${plan === 'A' ? 'selected' : ''}>Plan A: Cybersecurity</option>
                    <option value="B" ${plan === 'B' ? 'selected' : ''}>Plan B: Django</option>
                    <option value="C" ${plan === 'C' ? 'selected' : ''}>Plan C: IT Support</option>
                </select>
                <select class="filter-select" onchange="app.updateProjectFilter('difficulty', this.value)">
                    <option value="all" ${difficulty === 'all' ? 'selected' : ''}>All Difficulties</option>
                    <option value="Beginner" ${difficulty === 'Beginner' ? 'selected' : ''}>Beginner</option>
                    <option value="Intermediate" ${difficulty === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                    <option value="Advanced" ${difficulty === 'Advanced' ? 'selected' : ''}>Advanced</option>
                </select>
                <select class="filter-select" onchange="app.updateProjectFilter('status', this.value)">
                    <option value="all" ${status === 'all' ? 'selected' : ''}>All Statuses</option>
                    <option value="not-started" ${status === 'not-started' ? 'selected' : ''}>Not Started</option>
                    <option value="in-progress" ${status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                    <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
            </div>
            
            <p>Showing ${pList.length} projects</p>
            <div class="grid">
                ${cards.length ? cards : '<p>No projects match your filters.</p>'}
            </div>
        `;
    },

    projectModal(p, state) {
        return `
            <div class="modal-overlay" id="project-modal">
                <div class="modal-content modal-large">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h2>${p.name}</h2>
                        <span class="modal-close" onclick="document.getElementById('project-modal').remove()">&times;</span>
                    </div>
                    
                    <div class="modal-body">
                        <p class="subtitle">${p.desc}</p>
                        
                        <div class="modal-grid">
                            <div>
                                <!-- Details -->
                                <div class="mb-2">
                                    <h4>Steps / Implementation Hints</h4>
                                    <ul style="padding-left:1.5rem;">
                                        ${p.steps.map(s => `<li>${s}</li>`).join('')}
                                    </ul>
                                </div>

                                <div class="mb-2">
                                    <h4>Skills & Tools</h4>
                                    <div>
                                        ${p.skills.map(s => `<span class="tag">${s}</span>`).join('')}
                                        ${p.tools.map(t => `<span class="tag" style="border-color:var(--accent-primary)">${t}</span>`).join('')}
                                    </div>
                                </div>

                                <div class="mb-2">
                                    <h4>Notes / Learnings</h4>
                                    <textarea id="p-notes" class="note-input" rows="5" placeholder="Document your journey here...">${state.notes || ''}</textarea>
                                </div>
                            </div>

                            <div style="background:var(--bg-primary); padding:1rem; border-radius:0.5rem; height:fit-content;">
                                <!-- Tracking Form -->
                                <h4 class="mt-2">Tracking</h4>
                                
                                <label>Status</label>
                                <select id="p-status" class="filter-select" style="width:100%; margin-bottom:1rem;">
                                    <option value="not-started" ${(state.status || 'not-started') === 'not-started' ? 'selected' : ''}>Not Started</option>
                                    <option value="planning" ${(state.status || '') === 'planning' ? 'selected' : ''}>Planning</option>
                                    <option value="in-progress" ${(state.status || '') === 'in-progress' ? 'selected' : ''}>In Progress</option>
                                    <option value="completed" ${(state.status || '') === 'completed' ? 'selected' : ''}>Completed</option>
                                    <option value="deployed" ${(state.status || '') === 'deployed' ? 'selected' : ''}>Deployed</option>
                                </select>

                                <label>Time Spent</label>
                                <input type="text" id="p-time" class="form-input" value="${state.timeSpent || ''}" placeholder="e.g. 5 hours">

                                <label>Income Earned (UGX)</label>
                                <input type="text" id="p-income" class="form-input" value="${state.incomeEarned || ''}" placeholder="e.g. 500000">

                                <label>Portfolio / Demo Link</label>
                                <input type="text" id="p-link" class="form-input" value="${state.demoLink || ''}" placeholder="https://...">

                                <label>GitHub Repo</label>
                                <input type="text" id="p-github" class="form-input" value="${state.githubLink || ''}" placeholder="https://github.com/...">

                                <button class="btn-primary" style="width:100%; margin-top:1rem;" onclick="app.saveProjectDetails(${p.id})">Save Progress</button>
                                
                                <div style="margin-top:2rem; font-size:0.8rem; color:var(--text-secondary);">
                                    <p><strong>Income Potential:</strong> ${p.income}</p>
                                    <p><strong>Portfolio Val:</strong> ${p.portfolio}</p>
                                </div>
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

        // Resources
        ['A', 'B', 'C'].forEach(id => {
            const plan = careerData.plans[id];
            plan.phases.forEach(phase => {
                phase.resources.forEach(r => {
                    if (r.name.toLowerCase().includes(lowerQ) || r.type.toLowerCase().includes(lowerQ) || r.platform.toLowerCase().includes(lowerQ)) {
                        results.push({ ...r, planId: id, planTitle: plan.title, category: 'Resource' });
                    }
                });
            });
        });

        // Projects
        careerData.projects.forEach(p => {
            if (p.name.toLowerCase().includes(lowerQ) || p.desc.toLowerCase().includes(lowerQ) || p.skills.some(s => s.toLowerCase().includes(lowerQ))) {
                results.push({ ...p, category: 'Project' });
            }
        });

        const list = results.map(r => {
            if (r.category === 'Resource') {
                return `
                    <div class="card mb-2">
                         <div style="display:flex; justify-content:space-between;">
                            <strong>${r.name}</strong>
                            <span class="badge" style="background:${careerData.plans[r.planId].color}">${r.category}</span>
                         </div>
                         <p><a href="${r.url}" target="_blank" class="resource-link">Open Resource</a></p>
                         <button class="btn-icon" onclick="app.switchTab('plan${r.planId}')">Go to Plan</button>
                    </div>
                `;
            } else {
                return `
                    <div class="card mb-2">
                         <div style="display:flex; justify-content:space-between;">
                            <strong>${r.name}</strong>
                            <span class="badge" style="background:${careerData.plans[r.plan].color}">${r.category}</span>
                         </div>
                         <p>${r.desc}</p>
                         <button class="btn-icon" onclick="app.switchTab('projects'); setTimeout(() => app.openProjectModal(${r.id}), 100);">View Project</button>
                    </div>
                `;
            }
        }).join('');

        return `
            <div class="search-box">
                <input type="text" id="global-search" class="search-input" placeholder="🔍 Search resources..." value="${query}" autofocus>
            </div>
            <h2>Search Results for "${query}"</h2>
            ${results.length ? list : '<p>No results found.</p>'}
        `;
    },

    plan(planLetter) {
        const plan = careerData.plans[planLetter];

        const phasesHtml = plan.phases.map(phase => {
            const resourceList = phase.resources.map(r => {
                const isChecked = Storage.isResourceCompleted(planLetter, r.name) ? 'checked' : '';
                const meta = Storage.getResourceMeta(planLetter, r.name);
                const hasNote = meta && (meta.note || meta.rating > 0);

                return `
                    <div class="resource-item">
                        <input type="checkbox" class="resource-check" data-plan="${planLetter}" data-resource="${r.name}" ${isChecked}>
                        <div style="flex-grow:1;">
                            <a href="${r.url}" target="_blank" class="resource-link">${r.name}</a>
                            ${hasNote ? `<span title="${meta.note} - Rating: ${meta.rating}/5">📝</span>` : ''}
                            <br>
                            <small style="color:var(--text-secondary)">${r.type} • ${r.platform}</small>
                        </div>
                        <button class="btn-icon" onclick="app.openResourceModal('${planLetter}', '${r.name.replace(/'/g, "\\'")}')">✏️</button>
                    </div>
                `;
            }).join('');

            // NEW: Phase Specific Tools
            const phaseToolsHtml = phase.tools ? `
                <div class="phase-tools mt-2">
                    <h4 style="font-size:0.9rem; margin-bottom:0.5rem;">🛠️ Essential Tools for this Phase:</h4>
                    <div class="tools-grid-compact">
                        ${phase.tools.map(t => `
                            <div class="tool-card-compact">
                                <a href="${t.url}" target="_blank" title="${t.desc}"><strong>${t.name}</strong></a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : '';

            // Phase Progress
            const total = phase.resources.length;
            const done = phase.resources.filter(r => Storage.isResourceCompleted(planLetter, r.name)).length;
            const pct = total === 0 ? 0 : Math.round((done / total) * 100);

            return `
                <div class="card mb-2">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h3>${phase.title}</h3>
                        <span class="badge">${phase.duration}</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${pct}%; background: ${plan.color}"></div>
                    </div>
                    <p class="text-right" style="font-size:0.8rem;">${done}/${total} Completed</p>
                    <div class="resource-list">
                        ${resourceList}
                    </div>
                    ${phaseToolsHtml}
                </div>
            `;
        }).join('');

        return `
            <div class="plan-header" style="border-bottom: 2px solid ${plan.color};">
                <h1 style="color: ${plan.color}">${plan.icon} ${plan.title}</h1>
                <p>${plan.subtitle}</p>
            </div>
            ${phasesHtml}
        `;
    },

    uganda() {
        const { communities, jobs } = careerData.uganda;

        const comms = communities.map(c => `<li><a href="${c.url}" target="_blank" class="resource-link">${c.name}</a></li>`).join('');
        const jobList = jobs.map(j => `<li><a href="${j.url}" target="_blank" class="resource-link">${j.name}</a></li>`).join('');

        return `
            <h1>🇺🇬 Uganda Tech Ecosystem</h1>
            <div class="grid">
                <div class="card">
                    <h3>Communities & Hubs</h3>
                    <ul>${comms}</ul>
                </div>
                <div class="card">
                    <h3>Job Boards</h3>
                    <ul>${jobList}</ul>
                </div>
            </div>
            <div class="card mt-2">
                <h3>Local Hack</h3>
                <p>Attend monthly meetups at Innovation Village or Outbox. Networking is 80% of job hunting in Kampala!</p>
            </div>
        `;
    },

    income() {
        const entries = Storage.getIncomeEntries();
        const total = entries.reduce((acc, curr) => acc + curr.amount, 0);
        const goal = 5000;
        const pct = Math.min((total / goal) * 100, 100);

        const listHtml = entries.map((e, idx) => `
            <li class="income-item">
                <div>
                    <strong>${e.project}</strong> (${e.client})<br>
                    <small>${e.date}</small>
                </div>
                <div style="text-align:right;">
                    <div style="color: var(--success); font-weight:bold;">+$${e.amount.toFixed(2)}</div>
                    <button class="btn-icon" onclick="Storage.deleteIncomeEntry(${idx}); app.render();" style="color:var(--danger)">🗑️</button>
                </div>
            </li>
        `).join('');

        return `
            <h1>💰 Income Tracker</h1>
            <div class="card text-center mb-2">
                <h3>Goal: $${goal.toLocaleString()}</h3>
                <h1 style="color: var(--success)">$${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h1>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${pct}%; background: var(--success)"></div>
                </div>
                <p class="subtitle">${pct.toFixed(1)}% of Goal Reached</p>
            </div>
            
            <div class="grid">
                <div class="card">
                    <h3>Add New Income</h3>
                    <form id="income-add-form">
                        <input type="text" id="inc-project" class="form-input" placeholder="Project Name (e.g., Website Fix)" required>
                        <input type="text" id="inc-client" class="form-input" placeholder="Client Name" required>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <input type="number" id="inc-amount" class="form-input" placeholder="Amount ($)" step="0.01" required>
                            <input type="date" id="inc-date" class="form-input" required>
                        </div>
                        <button type="submit" class="btn-primary" style="width:100%">Add Record</button>
                    </form>
                </div>
                
                <div class="card">
                    <h3>Transaction Log</h3>
                    ${entries.length ? `<ul class="income-list">${listHtml}</ul>` : '<p style="color: var(--text-secondary); font-style: italic;">No transactions yet.</p>'}
                </div>
            </div>
        `;
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
