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
        this.dom.themeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            this.dom.themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
        });

        // Mobile Menu Toggle
        if (this.dom.mobileToggle) {
            this.dom.mobileToggle.addEventListener('click', () => {
                this.dom.sidebar.classList.toggle('active');
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
                            \${[1, 2, 3, 4, 5].map(i => \`
                                <span class="star \${i <= meta.rating ? 'active' : ''}" onclick="app.setRating(\${i})">★</span>
                            \`).join('')}
                        </div>
                    </div>

                    <div class="mb-2">
                        <label>My Notes:</label>
                        <textarea id="modal-note" class="note-input" rows="4" placeholder="What did you learn?">\${meta.note}</textarea>
                    </div>

                    <button class="btn-primary" onclick="app.saveResourceMeta('\${planId}', '\${resourceName}')">Save Notes</button>
                </div>
            </div>
        \`;
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
        // Update Sidebar UI
        const items = document.querySelectorAll('.sidebar .nav-item');
        items.forEach(t => t.classList.remove('active'));
        const activeItem = document.querySelector(\`.sidebar [data-tab="\${tabId}"]\`);
        if (activeItem) activeItem.classList.add('active');

        // Render View
        this.render();
        window.scrollTo(0, 0); // Reset scroll on tab change

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            this.dom.sidebar.classList.remove('active');
        }
    },

    updateHeaderStats() {
        // Date Logic (Hidden in new UI but kept for storage/calc)
        const now = new Date();

        const endYear = new Date('2026-12-31T23:59:59');
        const diff = endYear - now;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const daysEl = document.getElementById('days-left');
        if (daysEl) daysEl.textContent = days > 0 ? days : 0;
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
        const stats = Storage.getGlobalStats();
        return \`
            <div class="hero-section glass mb-2" style="padding: 3rem; text-align: center; background: radial-gradient(circle at center, rgba(34, 211, 238, 0.1), transparent);">
                <h1 style="font-size: 3rem; margin-bottom: 1rem; font-weight: 900;">Weave Your <span style="color: var(--accent-cyan);">Technical Destiny</span></h1>
                <p style="font-size: 1.2rem; color: var(--text-muted); max-width: 700px; margin: 0 auto 2rem;">
                    Pathweaver is your high-performance career architect, designed to guide you from foundational learning to professional mastery in the 2026 tech landscape.
                </p>
                <div style="display: flex; justify-content: center; gap: 1rem;">
                    <button onclick="app.switchTab('planA')" class="btn-primary" style="padding: 1rem 2rem; border-radius: 30px;">Start Your Journey</button>
                    <button onclick="app.switchTab('projects')" class="btn-secondary glass" style="padding: 1rem 2rem; border-radius: 30px;">Explore Projects</button>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card glass p-2" style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎯</div>
                    <h3>\${stats.totalResources}</h3>
                    <p style="color: var(--text-muted);">Resources Tracked</p>
                </div>
                <div class="stat-card glass p-2" style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">✅</div>
                    <h3>\${stats.completedResources}</h3>
                    <p style="color: var(--text-muted);">Modules Completed</p>
                </div>
                <div class="stat-card glass p-2" style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🚀</div>
                    <h3>\${stats.activeProjects}</h3>
                    <p style="color: var(--text-muted);">Live Projects</p>
                </div>
                <div class="stat-card glass p-2" style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">💰</div>
                    <h3>\${stats.totalIncome.toLocaleString()}</h3>
                    <p style="color: var(--text-muted);">UGX Earned</p>
                </div>
            </div>

            <div class="dashboard-grid mt-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div class="glass p-2">
                    <h3>Current Focus</h3>
                    <p class="text-secondary">Pick up where you left off in your career path.</p>
                    <div class="mt-1" style="display: grid; gap: 1rem;">
                        <div class="focus-item glass p-1" style="display: flex; align-items: center; gap: 1rem; cursor: pointer; border: 1px solid rgba(255,255,255,0.05);" onclick="app.switchTab('planA')">
                            <span style="font-size: 2rem;">🛡️</span>
                            <div style="flex-grow: 1;">
                                <strong>Cybersecurity Architecture</strong>
                                <div class="progress-container" style="height: 6px; margin-top: 5px;">
                                    <div class="progress-bar" style="width: 15%; background: var(--accent-cyan);"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="glass p-2">
                    <h3>Quick Navigator</h3>
                    <div class="mt-1" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <button class="badge glass" onclick="app.switchTab('uganda')" style="cursor: pointer; padding: 0.5rem 1rem;">🇺🇬 local_hub</button>
                        <button class="badge glass" onclick="app.switchTab('projects')" style="cursor: pointer; padding: 0.5rem 1rem;">🚀 active_projects</button>
                        <button class="badge glass" onclick="app.switchTab('income')" style="cursor: pointer; padding: 0.5rem 1rem;">💰 earnings_tracker</button>
                    </div>
                </div>
            </div>
        \`;
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

        const cards = pList.map(p => {
            const state = pStates[p.id] || {};
            const st = state.status || 'not-started';
            const stDisplay = st.replace('-', ' ');
            const stClass = \`status-\${st}\`;

            return \`
                <div class="card glass p-2" style="border: 1px solid var(--glass-border);">
                    <div class="project-card-header mb-1" style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="badge glass" style="background: \${careerData.plans[p.plan].color}">\${careerData.plans[p.plan].icon} Plan \${p.plan}</span>
                        <span class="status-badge \${stClass}">\${stDisplay}</span>
                    </div>
                    <h3 style="margin-bottom: 0.5rem;">\${p.name}</h3>
                    <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:1rem;">\${p.desc}</p>
                    
                    <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
                        <span class="badge glass" style="font-size: 0.7rem;">📊 \${p.difficulty}</span>
                        <span class="badge glass" style="font-size: 0.7rem;">⏱️ \${p.time}</span>
                    </div>

                    <button class="btn-primary" style="width:100%; border-radius: 8px;" onclick="app.openProjectModal(\${p.id})">Details & Track</button>
                </div>
            \`;
        }).join('');

        return \`
            <div class="hero-section glass mb-2" style="padding: 2rem;">
                <h1 style="margin-bottom: 0.5rem;">🚀 Project Forge</h1>
                <p style="color: var(--text-muted);">Building real-world experience, one commit at a time.</p>
                
                <div class="project-filters mt-1" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <select class="filter-select glass" onchange="app.updateProjectFilter('plan', this.value)">
                        <option value="all" \${plan === 'all' ? 'selected' : ''}>All Specializations</option>
                        <option value="A" \${plan === 'A' ? 'selected' : ''}>Cybersecurity</option>
                        <option value="B" \${plan === 'B' ? 'selected' : ''}>Django Development</option>
                        <option value="C" \${plan === 'C' ? 'selected' : ''}>IT Support</option>
                    </select>
                    <select class="filter-select glass" onchange="app.updateProjectFilter('difficulty', this.value)">
                        <option value="all" \${difficulty === 'all' ? 'selected' : ''}>All Levels</option>
                        <option value="Beginner" \${difficulty === 'Beginner' ? 'selected' : ''}>Beginner</option>
                        <option value="Intermediate" \${difficulty === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                        <option value="Advanced" \${difficulty === 'Advanced' ? 'selected' : ''}>Advanced</option>
                    </select>
                    <select class="filter-select glass" onchange="app.updateProjectFilter('status', this.value)">
                        <option value="all" \${status === 'all' ? 'selected' : ''}>All Statuses</option>
                        <option value="not-started" \${status === 'not-started' ? 'selected' : ''}>Not Started</option>
                        <option value="in-progress" \${status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="completed" \${status === 'completed' ? 'selected' : ''}>Completed</option>
                        <option value="deployed" \${status === 'deployed' ? 'selected' : ''}>Deployed</option>
                    </select>
                </div>
            </div>
            
            <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                \${cards.length ? cards : '<p>No projects match your current workflow filters.</p>'}
            </div>
        \`;
    },

    projectModal(p, state) {
        return \`
            <div class="modal-overlay glass" id="project-modal" style="backdrop-filter: blur(20px);">
                <div class="modal-content glass p-3" style="max-width: 900px; border: 1px solid var(--glass-border); background: var(--void-panel);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2rem;">
                        <h2 style="font-size: 2rem; background: linear-gradient(to right, var(--accent-cyan), var(--accent-violet)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">\${p.name}</h2>
                        <span class="modal-close" onclick="document.getElementById('project-modal').remove()" style="font-size: 2rem; cursor: pointer; color: var(--text-muted);">&times;</span>
                    </div>
                    
                    <div class="modal-body">
                        <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2rem;">\${p.desc}</p>
                        
                        <div class="modal-grid" style="display: grid; grid-template-columns: 3fr 2fr; gap: 3rem;">
                            <div>
                                <div class="mb-2">
                                    <h4 style="color: var(--accent-cyan); margin-bottom: 1rem;">Architectural Steps</h4>
                                    <ul style="padding-left:1.5rem; color: var(--text-main); line-height: 1.8;">
                                        \${p.steps.map(s => \`<li>\${s}</li>\`).join('')}
                                    </ul>
                                </div>

                                <div class="mb-2">
                                    <h4 style="color: var(--accent-cyan); margin-bottom: 1rem;">Stack & Arsenal</h4>
                                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                        \${p.skills.map(s => \`<span class="badge glass" style="font-size: 0.8rem; border-color: var(--glass-border)">\${s}</span>\`).join('')}
                                        \${p.tools.map(t => \`<span class="badge glass" style="font-size: 0.8rem; border-color: var(--accent-violet); color: var(--accent-violet)">\${t}</span>\`).join('')}
                                    </div>
                                </div>

                                <div class="mb-2">
                                    <h4 style="color: var(--accent-cyan); margin-bottom: 1rem;">Developer Chronicles</h4>
                                    <textarea id="p-notes" class="glass" style="width: 100%; min-height: 120px; padding: 1rem; border-radius: 12px; font-size: 0.9rem;" placeholder="Log your technical hurdles and triumphs...">\${state.notes || ''}</textarea>
                                </div>
                            </div>

                            <div class="glass p-2" style="background: rgba(255,255,255,0.02); height: fit-content;">
                                <h4 style="margin-bottom: 1.5rem; text-align: center; letter-spacing: 1px;">FORGE PROGRESS</h4>
                                
                                <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">STATUS</label>
                                <select id="p-status" class="glass" style="width:100%; margin-bottom:1.5rem; padding: 0.6rem;">
                                    <option value="not-started" \${(state.status || 'not-started') === 'not-started' ? 'selected' : ''}>Not Started</option>
                                    <option value="planning" \${(state.status || '') === 'planning' ? 'selected' : ''}>Planning</option>
                                    <option value="in-progress" \${(state.status || '') === 'in-progress' ? 'selected' : ''}>In Progress</option>
                                    <option value="completed" \${(state.status || '') === 'completed' ? 'selected' : ''}>Completed</option>
                                    <option value="deployed" \${(state.status || '') === 'deployed' ? 'selected' : ''}>Deployed</option>
                                </select>

                                <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">TIME INVESTED</label>
                                <input type="text" id="p-time" class="glass" style="width: 100%; margin-bottom: 1.5rem; padding: 0.6rem;" value="\${state.timeSpent || ''}" placeholder="e.g. 12 hours">

                                <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">VALUATION (UGX)</label>
                                <input type="text" id="p-income" class="glass" style="width: 100%; margin-bottom: 1.5rem; padding: 0.6rem;" value="\${state.incomeEarned || ''}" placeholder="e.g. 250,000">

                                <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">DEPLOYMENT LINK</label>
                                <input type="text" id="p-link" class="glass" style="width: 100%; margin-bottom: 1.5rem; padding: 0.6rem;" value="\${state.demoLink || ''}" placeholder="https://...">

                                <button class="btn-primary" style="width:100%; margin-top:1rem; border-radius: 30px;" onclick="app.saveProjectDetails(\${p.id})">Synch Progress</button>
                                
                                <div style="margin-top:2rem; font-size:0.8rem; color:var(--text-muted); border-top: 1px solid var(--glass-border); padding-top: 1.5rem;">
                                    <p><strong>Yield Potential:</strong> \${p.income}</p>
                                    <p><strong>Social Capital:</strong> \${p.portfolio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        \`;
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
                return \`
                    <div class="card glass mb-2 p-1" style="display:flex; justify-content:space-between; align-items:center;">
                         <div>
                            <strong style="color: var(--accent-cyan);">\${r.name}</strong>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">\${r.planTitle} • \${r.type}</div>
                         </div>
                         <button class="badge glass" style="cursor: pointer; background: rgba(34, 211, 238, 0.1);" onclick="app.switchTab('plan\${r.planId}')">Observe Plan</button>
                    </div>
                \`;
            } else {
                return \`
                    <div class="card glass mb-2 p-1" style="display:flex; justify-content:space-between; align-items:center;">
                         <div>
                            <strong style="color: var(--accent-violet);">\${r.name}</strong>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">Career Forge Project</div>
                         </div>
                         <button class="badge glass" style="cursor: pointer; background: rgba(139, 92, 246, 0.1);" onclick="app.switchTab('projects'); setTimeout(() => app.openProjectModal(\${r.id}), 100);">View Blueprint</button>
                    </div>
                \`;
            }
        }).join('');

        return \`
            <div class="hero-section glass mb-2" style="padding: 2rem;">
                <h2 style="margin-bottom: 0.5rem;">🔍 Search Results: "\${query}"</h2>
                <p style="color: var(--text-muted);">Detected \${results.length} relevant technical nodes.</p>
            </div>
            <div style="max-width: 800px; margin: 0 auto;">
                \${results.length ? list : '<p style="text-align: center; color: var(--text-muted); padding: 3rem;">No technical records found matching that query.</p>'}
            </div>
        \`;
    },

    plan(planLetter) {
        const plan = careerData.plans[planLetter];

        const phasesHtml = plan.phases.map(phase => {
            const resourceList = phase.resources.map(r => {
                const isChecked = Storage.isResourceCompleted(planLetter, r.name) ? 'checked' : '';
                const meta = Storage.getResourceMeta(planLetter, r.name);
                const hasNote = meta && (meta.note || meta.rating > 0);

                return \`
                    <div class="resource-item">
                        <input type="checkbox" class="resource-check" data-plan="\${planLetter}" data-resource="\${r.name}" \${isChecked}>
                        <div style="flex-grow:1;">
                            <a href="\${r.url}" target="_blank" class="resource-link">\${r.name}</a>
                            \${hasNote ? \`<span title="\${meta.note} - Rating: \${meta.rating}/5">📝</span>\` : ''}
                            <br>
                            <small style="color:var(--text-secondary)">\${r.type} • \${r.platform}</small>
                        </div>
                        <button class="btn-icon" onclick="app.openResourceModal('\${planLetter}', '\${r.name.replace(/'/g, "\\\\'")}')">✏️</button>
                    </div>
                \`;
            }).join('');

            // NEW: Phase Specific Tools
            const phaseToolsHtml = phase.tools ? \`
                <div class="phase-tools mt-2">
                    <h4 style="font-size:0.9rem; margin-bottom:0.5rem;">🛠️ Essential Tools for this Phase:</h4>
                    <div class="tools-grid-compact">
                        \${phase.tools.map(t => \`
                            <div class="tool-card-compact">
                                <a href="\${t.url}" target="_blank" title="\${t.desc}"><strong>\${t.name}</strong></a>
                            </div>
                        \`).join('')}
                    </div>
                </div>
            \` : '';

            // Phase Progress
            const total = phase.resources.length;
            const done = phase.resources.filter(r => Storage.isResourceCompleted(planLetter, r.name)).length;
            const pct = total === 0 ? 0 : Math.round((done / total) * 100);

            return \`
                <div class="card glass mb-2 p-2" style="border: 1px solid var(--glass-border);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h3 style="margin: 0;">\${phase.title}</h3>
                        <span class="badge glass" style="background: rgba(255,255,255,0.05);">\${phase.duration}</span>
                    </div>
                    <div class="progress-container mt-1">
                        <div class="progress-bar" style="width: \${pct}%; background: \${plan.color}"></div>
                    </div>
                    <p class="text-right" style="font-size:0.8rem; margin: 0.5rem 0;">\${done}/\${total} Completed</p>
                    <div class="resource-list mt-1">
                        \${resourceList}
                    </div>
                    \${phaseToolsHtml}
                </div>
            \`;
        }).join('');

        return \`
            <div class="hero-section glass mb-2" style="padding: 2rem; border-left: 6px solid \${plan.color};">
                <h1 style="color: var(--text-main); margin-bottom: 0.5rem;">\${plan.icon} \${plan.title}</h1>
                <p style="color: var(--text-muted);">\${plan.subtitle}</p>
            </div>
            \${phasesHtml}
        \`;
    },

    uganda() {
        return \`
            <div class="hero-section glass mb-2" style="padding: 2rem;">
                <h1 style="margin-bottom: 0.5rem;">🇺🇬 Uganda Tech Hub</h1>
                <p style="color: var(--text-muted);">Empowering local talent with professional roadmaps.</p>
            </div>

            <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                <div class="glass p-2">
                    <h3 style="color: var(--accent-cyan); margin-bottom: 1.5rem;">🚀 Local Job Boards</h3>
                    <div class="resource-list">
                        <a href="https://www.brightermonday.co.ug/jobs/it-software" target="_blank" class="resource-link glass" style="display: block; margin-bottom: 0.8rem; padding: 0.8rem;">BrighterMonday IT</a>
                        <a href="https://www.kazijobs.com/" target="_blank" class="resource-link glass" style="display: block; margin-bottom: 0.8rem; padding: 0.8rem;">Kazi Jobs</a>
                        <a href="https://ug.linkedin.com/jobs/it-jobs" target="_blank" class="resource-link glass" style="display: block; margin-bottom: 0.8rem; padding: 0.8rem;">LinkedIn Uganda</a>
                    </div>
                </div>
                <div class="glass p-2">
                    <h3 style="color: var(--accent-violet); margin-bottom: 1.5rem;">🤝 Tech Communities</h3>
                    <div class="resource-list">
                        <a href="#" class="resource-link glass" style="display: block; margin-bottom: 0.8rem; padding: 0.8rem; opacity: 0.5;">Innovation Village (Kampala)</a>
                        <a href="#" class="resource-link glass" style="display: block; margin-bottom: 0.8rem; padding: 0.8rem; opacity: 0.5;">Outbox Hub</a>
                        <a href="#" class="resource-link glass" style="display: block; margin-bottom: 0.8rem; padding: 0.8rem; opacity: 0.5;">GDG Kampala</a>
                    </div>
                </div>
            </div>
        \`;
    },

    income() {
        const entries = Storage.getIncomeEntries();
        const total = entries.reduce((acc, curr) => acc + curr.amount, 0);

        return \`
            <div class="hero-section glass mb-2" style="padding: 2rem;">
                <h1 style="margin-bottom: 0.5rem;">💰 Wealth Weaver</h1>
                <p style="color: var(--text-muted);">Tracking your professional valuation in UGX.</p>
                <div class="mt-1">
                    <h2 style="color: var(--accent-cyan); font-size: 2.5rem;">\${total.toLocaleString()} UGX</h2>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">Total Portfolio Earnings</p>
                </div>
            </div>

            <div class="grid" style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
                <div class="glass p-2">
                    <h3>Log Transaction</h3>
                    <form id="income-add-form" class="mt-1" style="display: grid; gap: 1rem;">
                        <input type="text" id="inc-project" placeholder="Source (e.g., Freelance Web)" class="glass" style="width: 100%;" required>
                        <input type="text" id="inc-client" placeholder="Client Name" class="glass" style="width: 100%;" required>
                        <input type="number" id="inc-amount" placeholder="Amount (UGX)" class="glass" style="width: 100%;" required>
                        <input type="date" id="inc-date" class="glass" style="width: 100%;" required>
                        <button type="submit" class="btn-primary" style="width: 100%;">Add to Vault</button>
                    </form>
                </div>
                
                <div class="glass p-2">
                    <h3>Transaction Log</h3>
                    <div class="resource-list mt-1">
                        \${entries.length ? entries.map((e, idx) => \`
                            <div class="glass p-1 mb-1" style="display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(255,255,255,0.05);">
                                <div>
                                    <strong style="color: var(--text-main);">\${e.project}</strong>
                                    <div style="font-size: 0.8rem; color: var(--text-muted);">\${e.client} • \${e.date}</div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="color: var(--accent-emerald); font-weight: bold;">+\${parseFloat(e.amount).toLocaleString()}</span>
                                    <button class="btn-icon" onclick="Storage.deleteIncomeEntry(\${idx}); app.render();" style="color:var(--danger); border: none; background: transparent;">🗑️</button>
                                </div>
                            </div>
                        \`).join('') : '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">The vault is currently empty.</p>'}
                    </div>
                </div>
            </div>
        \`;
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
