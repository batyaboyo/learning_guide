const app = {
    // State
    currentTab: 'dashboard',
    searchQuery: '',

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
        document.getElementById('resource-modal').remove();
        this.refreshProgressUI(planId);
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

        // Countdown (Dec 31, 2026)
        const endYear = new Date('2026-12-31');
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
        // Simple re-render for now, can be optimized to just update the bar
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
        // Calculate Global Stats
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
                    <button onclick="app.switchTab('plan${id}')" class="mt-2" style="width:100%; padding:0.5rem; cursor:pointer;">View Plan</button>
                </div>
            `;
        }).join('');

        const globalPct = totalTotal === 0 ? 0 : Math.round((totalDone / totalTotal) * 100);

        return `
            <div class="search-box">
                <input type="text" id="global-search" class="search-input" placeholder="🔍 Search resources (e.g., 'Python', 'Security')..." value="${app.searchQuery || ''}">
            </div>

            <h2>👋 Welcome Back, Future Pro!</h2>
            <div class="card mb-2" style="background: linear-gradient(45deg, #1e293b, #0f172a); border: 1px solid #334155; color: white;">
                <h3 style="color: white;">Overall Progress</h3>
                <h1 style="color: white;">${globalPct}%</h1>
                <div class="progress-container" style="height: 12px; background: rgba(255,255,255,0.2);">
                    <div class="progress-bar" style="width: ${globalPct}%; background: #fff;"></div>
                </div>
                <p style="color: #cbd5e1;">You have completed ${totalDone} out of ${totalTotal} milestones across all plans.</p>
            </div>
            <div class="grid">
                ${planCards}
            </div>
        `;
    },

    search(query) {
        if (!query) return this.dashboard();
        const lowerQ = query.toLowerCase();
        let results = [];

        ['A', 'B', 'C'].forEach(id => {
            const plan = careerData.plans[id];
            plan.phases.forEach(phase => {
                phase.resources.forEach(r => {
                    if (r.name.toLowerCase().includes(lowerQ) || r.type.toLowerCase().includes(lowerQ) || r.platform.toLowerCase().includes(lowerQ)) {
                        results.push({ ...r, planId: id, planTitle: plan.title });
                    }
                });
            });
        });

        const list = results.map(r => `
            <div class="card mb-2">
                 <div style="display:flex; justify-content:space-between;">
                    <strong>${r.name}</strong>
                    <span class="badge" style="background:${careerData.plans[r.planId].color}">${r.planTitle}</span>
                 </div>
                 <p><a href="${r.url}" target="_blank" class="resource-link">Open Resource</a></p>
                 <button class="btn-icon" onclick="app.switchTab('plan${r.planId}')">Go to Plan</button>
            </div>
        `).join('');

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
                </div>
            `;
        }).join('');

        return `
            <div style="border-bottom: 2px solid ${plan.color}; margin-bottom: 1rem; padding-bottom:1rem;">
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
