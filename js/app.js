const app = {
    // State
    currentTab: 'dashboard',
    selectedCountry: 'Uganda',
    selectedContinent: 'All',
    verifiedOnly: false,
    recentSearches: [],
    searchLoading: false,
    searchDebounceTimer: null,
    searchQuery: '',
    projectFilters: { plan: 'all', difficulty: 'all', status: 'all' },

    // Toast Notification System
    showToast(message, type = 'success', duration = 3000) {
        const container = document.getElementById('toast-container') || this.createToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
        const icon = document.createElement('span');
        icon.className = 'toast-icon';
        icon.textContent = icons[type] || 'ℹ️';
        const msg = document.createElement('span');
        msg.className = 'toast-msg';
        msg.textContent = String(message ?? '');
        toast.append(icon, msg);
        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('toast-show'));
        setTimeout(() => {
            toast.classList.remove('toast-show');
            toast.classList.add('toast-hide');
            setTimeout(() => toast.remove(), 400);
        }, duration);
    },

    createToastContainer() {
        const c = document.createElement('div');
        c.id = 'toast-container';
        document.body.appendChild(c);
        return c;
    },

    // Init
    init() {
        Storage.init();
        this.loadUiPrefs();
        this.cacheDOM();
        this.bindEvents();
        this.render();
        this.updateHeaderStats();
        this.setupScrollToTop();
        this.setupKeyboardShortcuts();

        // Update header stats every minute to refresh day of year and countdown
        setInterval(() => this.updateHeaderStats(), 60000);

        // Remove loader
        const loader = document.getElementById('app-loader');
        const appContainer = document.getElementById('app');
        if (loader) loader.style.display = 'none';
        if (appContainer) appContainer.style.display = 'block';
    },

    setupScrollToTop() {
        const btn = document.createElement('button');
        btn.id = 'scroll-top-btn';
        btn.className = 'glass';
        btn.innerHTML = '↑';
        btn.title = 'Scroll to top';
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 400);
        });
    },

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't fire when typing in inputs
            if (e.target.matches('input, textarea, select')) return;

            // Ctrl+K / Cmd+K = focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const search = document.getElementById('global-search');
                if (search) search.focus();
            }
            // 1-5 for tab switching
            const tabMap = { '1': 'dashboard', '2': 'planA', '3': 'planB', '4': 'projects', '5': 'uganda' };
            if (tabMap[e.key] && !e.ctrlKey && !e.metaKey && !e.altKey) {
                this.switchTab(tabMap[e.key]);
            }
        });
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
                    const backdrop = document.getElementById('sidebar-backdrop');
                    if (backdrop) backdrop.classList.toggle('active');
                }
            });
        }

        // Sidebar backdrop close
        const backdrop = document.getElementById('sidebar-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', () => {
                if (this.dom.sidebar) this.dom.sidebar.classList.remove('active');
                backdrop.classList.remove('active');
            });
        }

        // Global Search Listener
        document.addEventListener('input', (e) => {
            if (e.target.matches('#global-search')) {
                const query = e.target.value;
                if (query.length > 2) {
                    this.currentTab = 'search';
                    this.searchQuery = query;
                    this.searchLoading = true;
                    this.render();

                    if (this.searchDebounceTimer) {
                        clearTimeout(this.searchDebounceTimer);
                    }

                    this.searchDebounceTimer = setTimeout(() => {
                        if (this.currentTab === 'search' && this.searchQuery === query) {
                            this.searchLoading = false;
                            this.render();
                        }
                    }, 180);
                } else if (this.currentTab === 'search') {
                    this.searchLoading = false;
                    this.switchTab('dashboard');
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!e.target.matches('#global-search')) return;
            if (e.key === 'ArrowDown') {
                const firstChip = document.querySelector('.recent-search-chip');
                if (firstChip) {
                    e.preventDefault();
                    firstChip.focus();
                }
                return;
            }

            if (e.key !== 'Enter') return;

            const query = (e.target.value || '').trim();
            if (query.length > 2) {
                this.addRecentSearch(query);
            }
        });
    },

    // --- Project Logic ---
    updateProjectFilter(type, value) {
        this.projectFilters[type] = value;
        this.saveUiPrefs();
        this.render();
    },

    setCountry(countryName) {
        this.selectedCountry = countryName;
        this.saveUiPrefs();
        if (this.currentTab === 'uganda') {
            this.render();
        }
    },

    setContinent(continentName) {
        this.selectedContinent = continentName;
        this.saveUiPrefs();
        if (this.currentTab === 'uganda') {
            this.render();
        }
    },

    setVerifiedOnly(enabled) {
        this.verifiedOnly = !!enabled;
        this.saveUiPrefs();
        if (this.currentTab === 'uganda') {
            this.render();
        }
    },

    loadUiPrefs() {
        const settings = Storage.load(Storage.KEYS.SETTINGS, {});
        if (!settings || typeof settings !== 'object') return;

        if (typeof settings.selectedCountry === 'string' && settings.selectedCountry) {
            this.selectedCountry = settings.selectedCountry;
        }
        if (typeof settings.selectedContinent === 'string' && settings.selectedContinent) {
            this.selectedContinent = settings.selectedContinent;
        }
        if (typeof settings.verifiedOnly === 'boolean') {
            this.verifiedOnly = settings.verifiedOnly;
        }
        if (Array.isArray(settings.recentSearches)) {
            this.recentSearches = settings.recentSearches.filter(v => typeof v === 'string').slice(0, 8);
        }
        if (settings.projectFilters && typeof settings.projectFilters === 'object') {
            this.projectFilters = {
                ...this.projectFilters,
                ...settings.projectFilters
            };
        }
    },

    saveUiPrefs() {
        const settings = Storage.load(Storage.KEYS.SETTINGS, {});
        const next = {
            ...(settings || {}),
            selectedCountry: this.selectedCountry,
            selectedContinent: this.selectedContinent,
            verifiedOnly: this.verifiedOnly,
            recentSearches: this.recentSearches,
            projectFilters: this.projectFilters
        };
        Storage.save(Storage.KEYS.SETTINGS, next);
    },

    addRecentSearch(query) {
        const normalized = String(query || '').trim();
        if (normalized.length < 3) return;

        this.recentSearches = [
            normalized,
            ...this.recentSearches.filter(q => q.toLowerCase() !== normalized.toLowerCase())
        ].slice(0, 8);

        this.saveUiPrefs();
    },

    applyRecentSearch(encodedQuery) {
        let query = '';
        try {
            query = decodeURIComponent(encodedQuery || '');
        } catch {
            query = String(encodedQuery || '');
        }

        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.value = query;
        }

        this.addRecentSearch(query);
        this.currentTab = 'search';
        this.searchQuery = query;
        this.render();
    },

    clearRecentSearches() {
        this.recentSearches = [];
        this.saveUiPrefs();
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
            // Live step checkbox updates
            modal.querySelectorAll('.step-check').forEach(cb => {
                cb.addEventListener('change', (e) => {
                    const li = e.target.closest('.step-item');
                    if (li) li.classList.toggle('step-done', e.target.checked);
                    // Update step progress display
                    const total = modal.querySelectorAll('.step-check').length;
                    const done = modal.querySelectorAll('.step-check:checked').length;
                    const pct = Math.round((done / total) * 100);
                    const heading = modal.querySelector('.modal-main h4 small');
                    if (heading) heading.textContent = `(${done}/${total} — ${pct}%)`;
                    const bar = modal.querySelector('.modal-main .progress-bar');
                    if (bar) bar.style.width = `${pct}%`;
                });
            });
        }
        this.trapFocus(document.getElementById('project-modal'));
    },

    saveProjectDetails(id) {
        const status = document.getElementById('p-status').value;
        const time = document.getElementById('p-time').value;
        const notes = document.getElementById('p-notes').value;
        const link = document.getElementById('p-link').value;

        // Collect checked steps
        const stepChecks = document.querySelectorAll('.step-check');
        const stepsCompleted = [];
        stepChecks.forEach(cb => {
            if (cb.checked) stepsCompleted.push(parseInt(cb.dataset.step));
        });

        Storage.saveProjectState(id, {
            status, timeSpent: time, notes, demoLink: link,
            stepsCompleted,
            lastUpdated: new Date().toISOString()
        });

        const modal = document.getElementById('project-modal');
        if (modal) modal.remove();
        this.showToast('Progress saved!', 'success');
        this.render();
    },

    openResourceModal(planId, resourceName) {
        const meta = Storage.getResourceMeta(planId, resourceName) || { rating: 0, note: '' };
        const currentRating = Number.isInteger(meta.rating) ? Math.min(Math.max(meta.rating, 0), 5) : 0;

        const modalHtml = `
            <div class="modal-overlay" id="resource-modal">
                <div class="modal-content glass">
                    <button type="button" id="resource-modal-close" class="modal-close" aria-label="Close notes dialog">&times;</button>
                    <h3 id="resource-modal-title"></h3>
                    
                    <div class="mb-2">
                        <label>Difficulty / Rating:</label>
                        <div class="star-rating">
                            ${[1, 2, 3, 4, 5].map(i => `
                                <span class="star ${i <= currentRating ? 'active' : ''}" data-rating="${i}" role="button" tabindex="0" aria-label="Set rating ${i}">★</span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="mb-2">
                        <label>My Notes:</label>
                        <textarea id="modal-note" class="note-input glass" rows="4" placeholder="What did you learn?"></textarea>
                    </div>

                    <button type="button" id="resource-modal-save" class="btn-primary">Save Notes</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        // Close modal on overlay click
        const resourceModal = document.getElementById('resource-modal');
        if (resourceModal) {
            const closeBtn = document.getElementById('resource-modal-close');
            const title = document.getElementById('resource-modal-title');
            const noteInput = document.getElementById('modal-note');
            const saveBtn = document.getElementById('resource-modal-save');

            if (title) title.textContent = String(resourceName);
            if (noteInput) noteInput.value = String(meta.note || '');

            resourceModal.addEventListener('click', (e) => {
                if (e.target === resourceModal) resourceModal.remove();
            });
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal('resource-modal'));
            }
            if (saveBtn) {
                saveBtn.addEventListener('click', () => this.saveResourceMeta(planId, resourceName));
            }
            resourceModal.querySelectorAll('.star-rating .star').forEach(star => {
                const val = Number(star.dataset.rating);
                if (!Number.isFinite(val)) return;
                star.addEventListener('click', () => this.setRating(val));
                star.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.setRating(val);
                    }
                });
            });
        }
        this.trapFocus(document.getElementById('resource-modal'));
        this.tempRating = currentRating;
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
        if (!modal) return;
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
            const backdrop = document.getElementById('sidebar-backdrop');
            if (backdrop) backdrop.classList.remove('active');
        }
    },

    updateHeaderStats() {
        const now = new Date();
        
        // Calculate day of year
        const year = now.getFullYear();
        const startOfYear = new Date(year, 0, 1);
        const diffYear = now - startOfYear;
        const dayOfYear = Math.floor(diffYear / (1000 * 60 * 60 * 24)) + 1;
        
        // Check if leap year
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        const totalDaysInYear = isLeapYear ? 366 : 365;
        
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

        // Update day of year
        const dayOfYearEl = document.getElementById('day-of-year');
        if (dayOfYearEl) {
            dayOfYearEl.textContent = `${dayOfYear}/${totalDaysInYear}`;
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
        let html = '';
        try {
            switch (this.currentTab) {
                case 'dashboard': html = Views.dashboard(); break;
                case 'planA': html = Views.plan('A'); break;
                case 'planB': html = Views.plan('B'); break;
                case 'projects': html = Views.projects(); break;
                case 'uganda': html = Views.uganda(); break;
                case 'search': html = Views.search(this.searchQuery); break;
                default: html = '<h1>404 - Not Found</h1>';
            }
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

        const noteButtons = document.querySelectorAll('.resource-note-btn');
        noteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const planId = e.currentTarget.dataset.plan;
                const encodedName = e.currentTarget.dataset.resource || '';
                let resourceName = '';
                try {
                    resourceName = decodeURIComponent(encodedName);
                } catch {
                    resourceName = encodedName;
                }
                this.openResourceModal(planId, resourceName);
            });
        });

        // Security hardening for any dynamically rendered external links.
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            link.setAttribute('rel', 'noopener noreferrer');
        });

        const recentSearchChips = document.querySelectorAll('.recent-search-chip');
        recentSearchChips.forEach((chip, idx) => {
            chip.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const next = recentSearchChips[idx + 1] || recentSearchChips[0];
                    if (next) next.focus();
                    return;
                }
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prev = recentSearchChips[idx - 1] || recentSearchChips[recentSearchChips.length - 1];
                    if (prev) prev.focus();
                    return;
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const searchInput = document.getElementById('global-search');
                    if (searchInput) searchInput.focus();
                }
            });
        });


    },

    collectAllLinks() {
        const urls = new Set();
        const push = (url) => {
            if (typeof url === 'string' && /^https?:\/\//i.test(url)) {
                urls.add(url);
            }
        };

        Object.values(careerData.plans || {}).forEach(plan => {
            (plan.phases || []).forEach(phase => {
                (phase.resources || []).forEach(r => push(r.url));
                (phase.tools || []).forEach(t => push(t.url));
            });
        });

        (careerData.projects || []).forEach(project => {
            (project.tools || []).forEach(() => { /* tool names only in project schema */ });
        });

        const opportunities = careerData.opportunities || {};
        const global = opportunities.global || {};
        ['jobBoards', 'communities', 'scholarships', 'freelance'].forEach(key => {
            (global[key] || []).forEach(item => push(item.url));
        });

        Object.values(opportunities.countries || {}).forEach(country => {
            ['jobBoards', 'communities', 'programs'].forEach(key => {
                (country[key] || []).forEach(item => push(item.url));
            });
        });

        return [...urls];
    },

    async runLinkAudit() {
        const links = this.collectAllLinks();
        if (!links.length) {
            this.showToast('No links found for audit.', 'warning');
            return;
        }

        this.showToast(`Running browser link audit for ${links.length} links...`, 'info', 2500);

        const TIMEOUT_MS = 9000;
        const MAX_CONCURRENCY = 6;
        const results = [];
        let index = 0;

        const checkOne = async (url) => {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
            try {
                await fetch(url, {
                    method: 'GET',
                    mode: 'no-cors',
                    cache: 'no-store',
                    redirect: 'follow',
                    signal: controller.signal
                });
                clearTimeout(timer);
                return { url, status: 'reachable-or-cors-restricted', checkedAt: new Date().toISOString() };
            } catch (error) {
                clearTimeout(timer);
                return {
                    url,
                    status: error?.name === 'AbortError' ? 'timeout' : 'unreachable',
                    detail: String(error?.message || 'request failed'),
                    checkedAt: new Date().toISOString()
                };
            }
        };

        const worker = async () => {
            while (index < links.length) {
                const current = index;
                index += 1;
                results[current] = await checkOne(links[current]);
            }
        };

        const workers = Array.from({ length: Math.min(MAX_CONCURRENCY, links.length) }, () => worker());
        await Promise.all(workers);

        const broken = results.filter(r => r.status === 'unreachable' || r.status === 'timeout').length;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `pathweaver_link_audit_${timestamp}.json`;
        const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);

        this.showToast(`Link audit complete. ${broken} potential issues found. Report downloaded.`, broken ? 'warning' : 'success', 4500);
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
        URL.revokeObjectURL(url);
    },

    importData(input) {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            if (Storage.importData(e.target.result)) {
                app.showToast('Data imported successfully!', 'success');
                setTimeout(() => location.reload(), 1000);
            } else {
                app.showToast('Failed to import data.', 'error');
            }
        };
        reader.readAsText(file);
    },

    clearAllData() {
        if (confirm('Are you sure you want to clear all progress and data? This cannot be undone.')) {
            Storage.clearAll();
            this.showToast('All data cleared.', 'info');
            setTimeout(() => location.reload(), 1000);
        }
    }
};

// View Templates
const Views = {
    roadmapHighlights() {
        const insights = careerData.pdfInsights || {};
        const cards = Object.keys(careerData.plans).map(planLetter => {
            const plan = careerData.plans[planLetter];
            const insight = insights[planLetter];
            if (!insight) return '';

            const checkpoints = insight.checkpoints.slice(0, 4).map(c => `
                <li><strong>${c.skill}</strong> <span class="text-muted">${c.estimate}</span></li>
            `).join('');

            const certs = (insight.certifications?.beginner || []).slice(0, 3).map(cert => `
                <span class="skill-tag">${cert}</span>
            `).join('');

            return `
                <div class="glass p-2 intel-card" style="border-left: 4px solid ${plan.color};">
                    <div class="plan-progress-header">
                        <span>${plan.icon} ${plan.title}</span>
                        <button class="badge glass" onclick="app.switchTab('plan${planLetter}')">Open Plan</button>
                    </div>
                    <p class="text-muted mt-1">PDF-driven checkpoints from ${insight.source}</p>
                    <ul class="intel-list mt-1">${checkpoints}</ul>
                    <div class="mt-1 cert-chip-wrap">${certs}</div>
                </div>
            `;
        }).join('');

        return `
            <div class="dashboard-grid mt-2">
                ${cards}
            </div>
        `;
    },

    planIntel(planLetter) {
        const insight = (careerData.pdfInsights || {})[planLetter];
        if (!insight) return '';

        const checkpointRows = insight.checkpoints.map(c => `
            <div class="timeline-row">
                <div>
                    <strong>${c.skill}</strong>
                    <p class="text-muted">Suggested focus block from uploaded roadmap</p>
                </div>
                <div class="timeline-meta">
                    <span class="timeline-pill">${c.phase}</span>
                    <span class="timeline-time">${c.estimate}</span>
                </div>
            </div>
        `).join('');

        const domainCards = insight.domains.map(d => `
            <div class="domain-card">
                <h4>${d.title}</h4>
                <ul class="intel-list">
                    ${d.items.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        const beginnerCerts = (insight.certifications?.beginner || []).map(c => `<span class="skill-tag">${c}</span>`).join('');
        const advancedCerts = (insight.certifications?.advanced || []).map(c => `<span class="skill-tag">${c}</span>`).join('');

        return `
            <div class="responsive-grid mb-2">
                <section class="glass p-2 intel-card">
                    <h3>Roadmap Checkpoints</h3>
                    <p class="text-muted">Source: ${insight.source}</p>
                    <div class="timeline-board mt-1">${checkpointRows}</div>
                </section>
                <section class="glass p-2 intel-card">
                    <h3>Skill Clusters to Master</h3>
                    <div class="domain-grid mt-1">${domainCards}</div>
                </section>
            </div>
            <div class="responsive-grid mb-2">
                <section class="glass p-2 intel-card">
                    <h3>Certification Track</h3>
                    <p class="text-muted">Beginner foundations first, then role-specific depth.</p>
                    <div class="cert-stack mt-1">
                        <div>
                            <strong>Beginner</strong>
                            <div class="cert-chip-wrap mt-1">${beginnerCerts}</div>
                        </div>
                        <div class="mt-1">
                            <strong>Advanced</strong>
                            <div class="cert-chip-wrap mt-1">${advancedCerts}</div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    dashboard() {
        const stats = Storage.getGlobalStats();
        const progress = Storage.load(Storage.KEYS.PROGRESS, {});
        const recentSearches = app.recentSearches || [];

        // Calculate progress for all plans
        const planProgress = Object.keys(careerData.plans).map(id => {
            const plan = careerData.plans[id];
            const completed = progress[id] ? progress[id].length : 0;
            let total = 0;
            plan.phases.forEach(p => total += p.resources.length);
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            return { id, plan, completed, total, percent };
        });

        const overallCompleted = planProgress.reduce((s, p) => s + p.completed, 0);
        const overallTotal = planProgress.reduce((s, p) => s + p.total, 0);
        const overallPercent = overallTotal > 0 ? Math.round((overallCompleted / overallTotal) * 100) : 0;

        return `
            <div class="hero-section glass mb-2 dashboard-hero">
                <h1>Weave Your <span class="accent-text">Technical Destiny</span></h1>
                <p>Pathweaver now blends your progress tracking with curated checkpoints extracted from your uploaded cybersecurity and data analyst roadmaps.</p>
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
            </div>

            ${this.roadmapHighlights()}

            <div class="glass p-2 mt-2 mb-2">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                    <h3>Overall Mastery</h3>
                    <span class="text-muted" style="font-size:0.85rem;">${overallCompleted}/${overallTotal} resources &middot; ${overallPercent}%</span>
                </div>
                <div class="progress-container compact mb-2">
                    <div class="progress-bar" style="width: ${overallPercent}%;"></div>
                </div>
                <div class="all-plans-grid">
                    ${planProgress.map(pp => `
                        <div class="plan-progress-card glass p-1" onclick="app.switchTab('plan${pp.id}')" style="cursor:pointer; border-left: 4px solid ${pp.plan.color};">
                            <div class="plan-progress-header">
                                <span>${pp.plan.icon} ${pp.plan.title}</span>
                                <span class="accent-color" style="font-weight:700;">${pp.percent}%</span>
                            </div>
                            <div class="progress-container compact" style="margin:0.4rem 0 0.2rem;">
                                <div class="progress-bar" style="width: ${pp.percent}%;"></div>
                            </div>
                            <small class="text-muted">${pp.completed}/${pp.total} resources</small>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="dashboard-grid mt-2">
                <div class="glass p-2">
                    <h3>Quick Navigator</h3>
                    <div class="navigator-pills mt-1">
                        ${Object.entries(careerData.plans).map(([id, plan]) => `
                            <button class="badge glass pill" onclick="app.switchTab('plan${id}')">${plan.icon} ${plan.title}</button>
                        `).join('')}
                        <button class="badge glass pill" onclick="app.switchTab('projects')">🚀 Projects</button>
                        <button class="badge glass pill" onclick="app.switchTab('uganda')">🌍 Opportunities Hub</button>
                    </div>
                </div>
            </div>

            ${recentSearches.length ? `
                <div class="glass p-2 mt-2">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem;">
                        <h3>Recent Searches</h3>
                        <button class="badge glass" onclick="app.clearRecentSearches()">Clear</button>
                    </div>
                    <div class="navigator-pills mt-1">
                        ${recentSearches.map((q, idx) => `
                            <button class="badge glass pill recent-search-chip" data-chip-index="${idx}" onclick="app.applyRecentSearch('${encodeURIComponent(q)}')">${q}</button>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="glass p-2 mt-2">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap;">
                    <h3>Maintenance Tools</h3>
                    <button class="btn-secondary glass" onclick="app.runLinkAudit()">Run Link Audit</button>
                </div>
                <p class="text-muted mt-1">Runs a browser-based reachability check and downloads a JSON report.</p>
            </div>
        `;
    },

    projects() {
        const { plan, difficulty, status } = app.projectFilters;
        let pList = careerData.projects;
        const pStates = Storage.getAllProjectStates();

        // --- Completion Stats ---
        const allProjects = careerData.projects;
        const totalCount = allProjects.length;
        let completedCount = 0, inProgressCount = 0, deployedCount = 0, notStartedCount = 0;
        const planCounts = Object.keys(careerData.plans).reduce((acc, planId) => {
            acc[planId] = { total: 0, done: 0 };
            return acc;
        }, {});
        allProjects.forEach(p => {
            const s = pStates[p.id]?.status || 'not-started';
            if (!planCounts[p.plan]) {
                planCounts[p.plan] = { total: 0, done: 0 };
            }
            planCounts[p.plan].total++;
            if (s === 'completed' || s === 'deployed') { completedCount++; planCounts[p.plan].done++; }
            if (s === 'deployed') deployedCount++;
            if (s === 'in-progress') inProgressCount++;
            if (s === 'not-started') notStartedCount++;
        });
        const donePercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        // --- Filtering ---
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
            const stepsCompleted = state.stepsCompleted || [];
            const stepProgress = p.steps ? `${stepsCompleted.length}/${p.steps.length}` : '';

            // Gather tech tags for card preview
            const techPreview = [];
            if (p.technologies) {
                if (p.technologies.languages) techPreview.push(...p.technologies.languages);
                if (p.technologies.frameworks) techPreview.push(...p.technologies.frameworks);
            }

            return `
                <div class="card glass p-2 project-card">
                    <div class="project-card-header mb-1">
                        <span class="badge glass plan-badge" style="background: ${careerData.plans[p.plan].color}">${careerData.plans[p.plan].icon} Plan ${p.plan}</span>
                        <span class="status-badge ${stClass}">${stDisplay}</span>
                    </div>
                    <h3>${p.name}</h3>
                    ${p.portfolio ? '<span class="portfolio-badge">⭐ Portfolio-worthy</span>' : ''}
                    <p class="project-desc">${p.desc}</p>
                    <div class="project-meta">
                        <span class="meta-tag"><span class="meta-icon">📊</span> ${p.difficulty}</span>
                        <span class="meta-tag"><span class="meta-icon">⏱️</span> ${p.time}</span>
                    </div>
                    <div class="project-skills">
                        ${p.skills.slice(0, 3).map(s => `<span class="skill-tag">${s}</span>`).join('')}
                        ${p.skills.length > 3 ? `<span class="skill-tag">+${p.skills.length - 3}</span>` : ''}
                    </div>
                    ${techPreview.length ? `
                        <div class="tech-preview">
                            ${techPreview.slice(0, 4).map(t => `<span class="tech-tag tech-lang">${t}</span>`).join('')}
                            ${techPreview.length > 4 ? `<span class="tech-tag tech-other">+${techPreview.length - 4}</span>` : ''}
                        </div>
                    ` : ''}
                    ${stepsCompleted.length > 0 ? `
                        <div class="project-step-progress">
                            <div class="progress-container compact">
                                <div class="progress-bar" style="width: ${Math.round((stepsCompleted.length / p.steps.length) * 100)}%;"></div>
                            </div>
                            <small class="text-muted">${stepProgress} steps</small>
                        </div>
                    ` : ''}
                    <button class="btn-primary full-width" onclick="app.openProjectModal(${p.id})">Details</button>
                </div>
            `;
        }).join('');

        return `
            <div class="hero-section glass mb-2">
                <h1>🚀 Project Forge</h1>
                <p class="text-muted">${completedCount} of ${totalCount} completed &middot; ${inProgressCount} in-progress &middot; ${deployedCount} deployed</p>
                <div class="progress-container mt-1" style="max-width: 500px; margin-left: auto; margin-right: auto;">
                    <div class="progress-bar" style="width: ${donePercent}%;"></div>
                </div>
                <div class="project-stats-row mt-1">
                    ${Object.keys(planCounts).map(k => `
                        <span class="plan-stat-pill glass" style="border-color: ${careerData.plans[k].color}">
                            ${careerData.plans[k].icon} ${planCounts[k].done}/${planCounts[k].total}
                        </span>
                    `).join('')}
                </div>
                <div class="project-filters mt-1">
                    <select class="filter-select glass" onchange="app.updateProjectFilter('plan', this.value)">
                        <option value="all" ${plan === 'all' ? 'selected' : ''}>All Specializations</option>
                        ${Object.entries(careerData.plans).map(([id, p]) => `
                            <option value="${id}" ${plan === id ? 'selected' : ''}>${p.title} (${planCounts[id]?.total || 0})</option>
                        `).join('')}
                    </select>
                    <select class="filter-select glass" onchange="app.updateProjectFilter('difficulty', this.value)">
                        <option value="all" ${difficulty === 'all' ? 'selected' : ''}>All Difficulties</option>
                        <option value="beginner" ${difficulty === 'beginner' ? 'selected' : ''}>Beginner</option>
                        <option value="intermediate" ${difficulty === 'intermediate' ? 'selected' : ''}>Intermediate</option>
                        <option value="advanced" ${difficulty === 'advanced' ? 'selected' : ''}>Advanced</option>
                    </select>
                    <select class="filter-select glass" onchange="app.updateProjectFilter('status', this.value)">
                        <option value="all" ${status === 'all' ? 'selected' : ''}>All Statuses</option>
                        <option value="not-started" ${status === 'not-started' ? 'selected' : ''}>Not Started (${notStartedCount})</option>
                        <option value="in-progress" ${status === 'in-progress' ? 'selected' : ''}>In Progress (${inProgressCount})</option>
                        <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed (${completedCount - deployedCount})</option>
                        <option value="deployed" ${status === 'deployed' ? 'selected' : ''}>Deployed (${deployedCount})</option>
                    </select>
                </div>
            </div>
            <p class="text-muted mb-2" style="font-size: 0.85rem;">Showing ${pList.length} of ${totalCount} projects</p>
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
        const stepsCompleted = state.stepsCompleted || [];
        const stepsDone = stepsCompleted.length;
        const stepsTotal = p.steps.length;
        const stepsPercent = stepsTotal > 0 ? Math.round((stepsDone / stepsTotal) * 100) : 0;

        return `
            <div class="modal-overlay glass" id="project-modal">
                <div class="modal-content glass modal-large">
                    <div class="modal-header">
                        <h2>${p.name}</h2>
                        <span class="modal-close" onclick="document.getElementById('project-modal').remove()">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="modal-project-meta mb-2">
                            <span class="meta-tag"><span class="meta-icon">📊</span> ${p.difficulty}</span>
                            <span class="meta-tag"><span class="meta-icon">⏱️</span> ${p.time}</span>
                            <span class="badge glass plan-badge" style="background: ${careerData.plans[p.plan].color}">${careerData.plans[p.plan].icon} ${careerData.plans[p.plan].title}</span>
                        </div>
                        <div class="project-skills mb-2">
                            ${p.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                        </div>
                        <div class="problem-solution-section mb-2">
                            <div class="ps-card glass">
                                <h4 class="ps-heading"><span class="ps-icon">🔍</span> The Problem</h4>
                                <p class="ps-text">${p.problem || ''}</p>
                            </div>
                            <div class="ps-card glass">
                                <h4 class="ps-heading"><span class="ps-icon">💡</span> The Solution</h4>
                                <p class="ps-text">${p.solution || ''}</p>
                            </div>
                        </div>
                        ${p.technologies ? `
                        <div class="technologies-section mb-2">
                            <h4 class="accent-color"><span class="ps-icon">🛠️</span> Technologies</h4>
                            <div class="tech-categories">
                                ${p.technologies.languages && p.technologies.languages.length ? `
                                <div class="tech-category">
                                    <span class="tech-category-label">Languages</span>
                                    <div class="tech-tags">${p.technologies.languages.map(t => `<span class="tech-tag tech-lang">${t}</span>`).join('')}</div>
                                </div>` : ''}
                                ${p.technologies.frameworks && p.technologies.frameworks.length ? `
                                <div class="tech-category">
                                    <span class="tech-category-label">Frameworks</span>
                                    <div class="tech-tags">${p.technologies.frameworks.map(t => `<span class="tech-tag tech-fw">${t}</span>`).join('')}</div>
                                </div>` : ''}
                                ${p.technologies.databases && p.technologies.databases.length ? `
                                <div class="tech-category">
                                    <span class="tech-category-label">Databases</span>
                                    <div class="tech-tags">${p.technologies.databases.map(t => `<span class="tech-tag tech-db">${t}</span>`).join('')}</div>
                                </div>` : ''}
                                ${p.technologies.other && p.technologies.other.length ? `
                                <div class="tech-category">
                                    <span class="tech-category-label">Tools & Other</span>
                                    <div class="tech-tags">${p.technologies.other.map(t => `<span class="tech-tag tech-other">${t}</span>`).join('')}</div>
                                </div>` : ''}
                            </div>
                        </div>` : ''}
                        <div class="modal-grid">
                            <div class="modal-main">
                                <h4 class="accent-color">Architectural Steps <small class="text-muted">(${stepsDone}/${stepsTotal} — ${stepsPercent}%)</small></h4>
                                <div class="progress-container compact mb-1">
                                    <div class="progress-bar" style="width: ${stepsPercent}%;"></div>
                                </div>
                                <ul class="steps-list steps-checklist">
                                    ${p.steps.map((s, idx) => {
                                        const checked = stepsCompleted.includes(idx) ? 'checked' : '';
                                        return `
                                            <li class="step-item ${checked ? 'step-done' : ''}">
                                                <input type="checkbox" class="step-check" data-project="${p.id}" data-step="${idx}" ${checked}>
                                                <span class="step-text">${s}</span>
                                            </li>
                                        `;
                                    }).join('')}
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
                                    <label>DEPLOYMENT LINK</label>
                                    <input type="text" id="p-link" class="glass full-width" value="${state.demoLink || ''}">
                                </div>
                                <div class="input-group mt-1">
                                    <label>TOOLS</label>
                                    <div class="modal-tools-list">
                                        ${p.tools.map(t => `<span class="skill-tag">${t}</span>`).join('')}
                                    </div>
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
        if (app.searchLoading) {
            return `
                <div class="hero-section glass mb-2">
                    <h2>🔍 Search: "${query}"</h2>
                    <p class="text-muted">Preparing grouped results...</p>
                </div>
                <div class="glass p-3 text-center">
                    <div class="search-loader" aria-hidden="true"></div>
                    <p class="text-muted mt-1">Filtering plans, projects, and opportunities...</p>
                </div>
            `;
        }

        app.addRecentSearch(query);
        const lowerQ = query.toLowerCase();
        const results = [];
        const seen = new Set();

        const pushUnique = (item) => {
            const key = [
                item.category || '',
                item.name || '',
                item.url || '',
                item.planId || '',
                String(item.phaseIdx ?? '')
            ].join('|').toLowerCase();

            if (seen.has(key)) return;
            seen.add(key);
            results.push(item);
        };

        Object.keys(careerData.plans).forEach(id => {
            const plan = careerData.plans[id];
            plan.phases.forEach((phase, pIdx) => {
                // Search Phase Title
                if (phase.title.toLowerCase().includes(lowerQ)) {
                    pushUnique({ name: phase.title, planId: id, phaseIdx: pIdx, category: 'Phase' });
                }
                // Search Resources
                phase.resources.forEach(r => {
                    const searchable = (r.name + ' ' + (r.platform || '') + ' ' + (r.type || '')).toLowerCase();
                    if (searchable.includes(lowerQ)) {
                        pushUnique({ ...r, planId: id, phaseIdx: pIdx, category: 'Resource' });
                    }
                });
                // Search Tools
                if (phase.tools) {
                    phase.tools.forEach(t => {
                        const searchable = (t.name + ' ' + (t.desc || '')).toLowerCase();
                        if (searchable.includes(lowerQ)) {
                            pushUnique({ ...t, planId: id, phaseIdx: pIdx, category: 'Tool' });
                        }
                    });
                }
            });
        });

        careerData.projects.forEach(p => {
            let searchable = (p.name + ' ' + (p.desc || '') + ' ' + (p.skills.join(' ')) + ' ' + (p.steps.join(' '))).toLowerCase();
            // Include technologies, problem, and solution in search
            if (p.problem) searchable += ' ' + p.problem.toLowerCase();
            if (p.solution) searchable += ' ' + p.solution.toLowerCase();
            if (p.technologies) {
                const tech = p.technologies;
                searchable += ' ' + [...(tech.languages || []), ...(tech.frameworks || []), ...(tech.databases || []), ...(tech.other || [])].join(' ').toLowerCase();
            }
            if (searchable.includes(lowerQ)) {
                pushUnique({ ...p, category: 'Project' });
            }
        });

        const opportunities = careerData.opportunities || {};
        const global = opportunities.global || {};
        const globalLists = [
            ...(global.jobBoards || []),
            ...(global.communities || []),
            ...(global.scholarships || []),
            ...(global.freelance || [])
        ];
        globalLists.forEach(item => {
            const searchable = `${item.name} ${item.url}`.toLowerCase();
            if (searchable.includes(lowerQ)) {
                pushUnique({ ...item, category: 'Global Opportunity', tab: 'uganda' });
            }
        });

        const countryGroups = opportunities.countries || {};
        const countryMeta = opportunities.countryMeta || {};
        Object.entries(countryGroups).forEach(([country, groups]) => {
            const continent = countryMeta[country]?.continent || '';
            Object.values(groups).flat().forEach(item => {
                const searchable = `${item.name} ${item.url} ${country} ${continent}`.toLowerCase();
                if (searchable.includes(lowerQ)) {
                    pushUnique({ ...item, category: `${country} Opportunity`, tab: 'uganda' });
                }
            });
        });

        const grouped = {
            Learning: [],
            Projects: [],
            Opportunities: []
        };

        results.forEach(r => {
            if (r.category === 'Project') {
                grouped.Projects.push(r);
                return;
            }
            if ((r.category || '').includes('Opportunity')) {
                grouped.Opportunities.push(r);
                return;
            }
            grouped.Learning.push(r);
        });

        const renderItem = (r) => {
            const clickAction = r.category === 'Project'
                ? `app.switchTab('projects')`
                : `app.switchTab('plan${r.planId}', ${r.phaseIdx})`;

            const isOpportunity = r.tab === 'uganda';
            const finalClick = isOpportunity
                ? `app.switchTab('uganda')`
                : clickAction;

            return `
                <div class="card glass mb-2 p-1 search-result-card">
                    <div class="result-info">
                        <strong>${r.name}</strong>
                        <small class="text-muted">${r.category} ${r.planId ? `(${careerData.plans[r.planId].title})` : ''}</small>
                    </div>
                    <button class="badge glass" onclick="${finalClick}">View</button>
                </div>
            `;
        };

        const sections = Object.entries(grouped)
            .filter(([, items]) => items.length)
            .map(([label, items]) => `
                <section class="glass p-2 mb-2">
                    <h3>${label} <span class="text-muted">(${items.length})</span></h3>
                    <div class="search-results-list animate-fade-in mt-1">
                        ${items.map(renderItem).join('')}
                    </div>
                </section>
            `).join('');

        return `
            <div class="hero-section glass mb-2">
                <h2>🔍 Search: "${query}"</h2>
                <p class="text-muted">Detected ${results.length} relevant nodes.</p>
                ${app.recentSearches.length ? `
                    <div class="navigator-pills mt-1" style="justify-content:center;">
                        ${app.recentSearches.slice(0, 5).map((q, idx) => `
                            <button class="badge glass pill recent-search-chip" data-chip-index="${idx}" onclick="app.applyRecentSearch('${encodeURIComponent(q)}')">${q}</button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="search-results-wrap">
                ${results.length ? sections : `
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
        const plan = careerData.plans[planLetter];
        if (!plan) {
            throw new Error(`Plan data for '${planLetter}' is missing from careerData.`);
        }

        const phasesHtml = plan.phases.map((phase, idx) => {
            // Phase progress
            const phaseTotal = phase.resources.length;
            let phaseDone = 0;
            phase.resources.forEach(r => {
                if (Storage.isResourceCompleted(planLetter, r.name)) phaseDone++;
            });
            const phasePercent = phaseTotal > 0 ? Math.round((phaseDone / phaseTotal) * 100) : 0;

            const resourceList = phase.resources.map(r => {
                const isChecked = Storage.isResourceCompleted(planLetter, r.name) ? 'checked' : '';
                return `
                    <div class="resource-item">
                        <input type="checkbox" class="resource-check" data-plan="${planLetter}" data-resource="${r.name}" ${isChecked}>
                        <a href="${r.url}" target="_blank" class="resource-link">${r.name}</a>
                        <button type="button" class="btn-icon resource-note-btn" data-plan="${planLetter}" data-resource="${encodeURIComponent(r.name)}" aria-label="Open resource notes">✏️</button>
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
                    <div class="phase-header">
                        <h3>${phase.title}</h3>
                        <span class="phase-progress-label">${phaseDone}/${phaseTotal} &middot; ${phasePercent}%</span>
                    </div>
                    <div class="progress-container compact" style="margin: 0.5rem 0;">
                        <div class="progress-bar" style="width: ${phasePercent}%;"></div>
                    </div>
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
                ${this.planIntel(planLetter)}
                <div class="phases-wrapper">
                    ${phasesHtml}
                </div>
            </div>
        `;
    },

    uganda() {
        const opportunities = careerData.opportunities || {};
        const global = opportunities.global || {};
        const globalVerification = global.verification || {};
        const countryMeta = opportunities.countryMeta || {};
        const countries = opportunities.countries || {};
        const allCountryNames = Object.keys(countries);

        const continents = ['All', ...new Set(allCountryNames.map(c => countryMeta[c]?.continent || 'Other'))];
        const filteredCountryNames = app.selectedContinent === 'All'
            ? allCountryNames
            : allCountryNames.filter(c => (countryMeta[c]?.continent || 'Other') === app.selectedContinent);

        const activeCountry = filteredCountryNames.includes(app.selectedCountry)
            ? app.selectedCountry
            : (filteredCountryNames[0] || allCountryNames[0] || 'Uganda');

        if (app.selectedCountry !== activeCountry) {
            app.selectedCountry = activeCountry;
            app.saveUiPrefs();
        }

        const countryData = countries[activeCountry] || { jobBoards: [], communities: [], programs: [] };
        const activeMeta = countryMeta[activeCountry] || { continent: 'Other', verifiedOn: '' };

        const getFreshness = (verifiedOn) => {
            if (!verifiedOn) return { label: 'Review source', cls: 'stale' };
            const now = new Date();
            const date = new Date(verifiedOn);
            const ageDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
            if (ageDays <= 45) return { label: 'Verified recently', cls: 'recent' };
            if (ageDays <= 120) return { label: 'Needs quick recheck', cls: 'warning' };
            return { label: 'Review source', cls: 'stale' };
        };

        const renderLinkCard = (item, fallbackVerifiedOn = '') => {
            const freshness = getFreshness(item.verifiedOn || fallbackVerifiedOn);
            if (app.verifiedOnly && freshness.cls !== 'recent') {
                return '';
            }
            return `
                <a href="${item.url}" target="_blank" class="hub-link glass">
                    <span>${item.name}</span>
                    <small class="verify-pill ${freshness.cls}">${freshness.label}</small>
                </a>
            `;
        };

        const renderLinks = (items = [], fallbackVerifiedOn = '') => {
            const html = items.map(item => renderLinkCard(item, fallbackVerifiedOn)).join('');
            if (html.trim()) return html;
            return `
                <div class="hub-empty text-muted">No resources match the current freshness filter.</div>
            `;
        };

        return `
            <div class="hero-section glass mb-2 animate-fade-in">
                <h1>🌍 Global & Country Opportunities Hub</h1>
                <p class="text-muted">Discover global pathways and country-focused jobs, communities, and growth programs.</p>
            </div>

            <div class="glass p-2 mb-2 animate-fade-in">
                <div class="project-filters" style="margin-bottom:0;">
                    <label for="continent-select" class="text-muted" style="font-weight:600;">Continent</label>
                    <select id="continent-select" class="filter-select glass" onchange="app.setContinent(this.value)">
                        ${continents.map(cont => `<option value="${cont}" ${cont === app.selectedContinent ? 'selected' : ''}>${cont}</option>`).join('')}
                    </select>
                    <label for="country-select" class="text-muted" style="font-weight:600;">Choose Country Focus</label>
                    <select id="country-select" class="filter-select glass" onchange="app.setCountry(this.value)">
                        ${filteredCountryNames.map(c => `<option value="${c}" ${c === activeCountry ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                    <label class="verified-toggle glass" for="verified-only-toggle">
                        <input id="verified-only-toggle" type="checkbox" ${app.verifiedOnly ? 'checked' : ''} onchange="app.setVerifiedOnly(this.checked)">
                        <span>Show only verified recently</span>
                    </label>
                </div>
            </div>

            <div class="responsive-grid animate-fade-in" style="animation-delay: 0.2s">
                <div class="glass p-2">
                    <h3 class="accent-color mb-1">Global Job Boards</h3>
                    <div class="hub-list">
                        ${renderLinks(global.jobBoards, globalVerification.jobBoards)}
                    </div>
                </div>
                <div class="glass p-2">
                    <h3 class="violet-color mb-1">Global Communities</h3>
                    <div class="hub-list">
                        ${renderLinks(global.communities, globalVerification.communities)}
                    </div>
                </div>
                <div class="glass p-2">
                    <h3 class="accent-color mb-1">Global Scholarships & Learning Aid</h3>
                    <div class="hub-list">
                        ${renderLinks(global.scholarships, globalVerification.scholarships)}
                    </div>
                </div>
            </div>

            <div class="hero-section glass mt-2 mb-2 animate-fade-in" style="padding: 1.5rem; text-align:left;">
                <h2 style="margin-bottom:0.4rem;">${activeCountry} Opportunities</h2>
                <p class="text-muted">${activeMeta.continent} pathways to jobs, communities, and accelerators.</p>
            </div>

            <div class="responsive-grid animate-fade-in" style="animation-delay: 0.25s">
                <div class="glass p-2">
                    <h3 class="accent-color mb-1">${activeCountry} Job Boards</h3>
                    <div class="hub-list">
                        ${renderLinks(countryData.jobBoards, activeMeta.verifiedOn)}
                    </div>
                </div>
                <div class="glass p-2">
                    <h3 class="violet-color mb-1">${activeCountry} Communities</h3>
                    <div class="hub-list">
                        ${renderLinks(countryData.communities, activeMeta.verifiedOn)}
                    </div>
                </div>
                <div class="glass p-2">
                    <h3 class="accent-color mb-1">${activeCountry} Programs</h3>
                    <div class="hub-list">
                        ${renderLinks(countryData.programs, activeMeta.verifiedOn)}
                    </div>
                </div>
            </div>
        `;
    },


};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
