const Storage = {
    // Keys
    KEYS: {
        PROGRESS: 'pathweaver_progress',
        INCOME: 'pathweaver_income',
        SETTINGS: 'pathweaver_settings',
        PROJECTS: 'pathweaver_projects'
    },

    // Initialize/Load Data
    init() {
        this.migrateLegacyKeys();
    },

    migrateLegacyKeys() {
        const legacyPrefix = 'techpath_';
        const keys = ['progress', 'income', 'settings', 'projects'];
        keys.forEach(k => {
            const oldKey = legacyPrefix + k;
            const newKey = this.KEYS[k.toUpperCase()];
            if (!newKey) return;

            const oldData = localStorage.getItem(oldKey);
            const newData = localStorage.getItem(newKey);

            // If we have old data but NO new data, migrate it
            if (oldData && !newData) {
                console.log(`[Pathweaver] Migrating legacy key: ${oldKey} -> ${newKey}`);
                localStorage.setItem(newKey, oldData);
            }
        });
    },

    load(key, defaultData = null) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultData;
    },

    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // Progress Helpers
    toggleResource(planId, resourceName) {
        const progress = this.load(this.KEYS.PROGRESS, {});
        if (!progress[planId]) progress[planId] = [];

        if (progress[planId].includes(resourceName)) {
            progress[planId] = progress[planId].filter(r => r !== resourceName);
        } else {
            progress[planId].push(resourceName);
        }

        this.save(this.KEYS.PROGRESS, progress);
        return progress;
    },

    isResourceCompleted(planId, resourceName) {
        const progress = this.load(this.KEYS.PROGRESS, {});
        return progress[planId] ? progress[planId].includes(resourceName) : false;
    },

    // Resource Metadata (Notes, Ratings)
    saveResourceMeta(planId, resourceName, metaData) {
        const key = `${this.KEYS.PROGRESS}_meta`;
        const allMeta = this.load(key, {});
        // Create unique ID for resource
        const id = `${planId}|${resourceName}`;
        allMeta[id] = metaData;
        this.save(key, allMeta);
    },

    getResourceMeta(planId, resourceName) {
        const key = `${this.KEYS.PROGRESS}_meta`;
        const allMeta = this.load(key, {});
        return allMeta[`${planId}|${resourceName}`] || null;
    },

    // Income Helpers
    addIncomeEntry(entry) {
        const income = this.load(this.KEYS.INCOME, []);
        income.push(entry);
        this.save(this.KEYS.INCOME, income);
        return income;
    },

    getIncomeEntries() {
        return this.load(this.KEYS.INCOME, []);
    },

    deleteIncomeEntry(index) {
        const income = this.load(this.KEYS.INCOME, []);
        // simple index based deletion
        if (index >= 0 && index < income.length) {
            income.splice(index, 1);
            this.save(this.KEYS.INCOME, income);
        }
        return income;
    },

    // Project Tracking
    saveProjectState(projectId, data) {
        const all = this.load(this.KEYS.PROJECTS, {});
        all[projectId] = { ...(all[projectId] || {}), ...data };
        this.save(this.KEYS.PROJECTS, all);
    },

    getProjectState(projectId) {
        const all = this.load(this.KEYS.PROJECTS, {});
        return all[projectId] || {};
    },

    getAllProjectStates() {
        return this.load(this.KEYS.PROJECTS, {});
    },

    // Export/Import
    exportData() {
        const allData = {};
        for (const key in this.KEYS) {
            allData[this.KEYS[key]] = this.load(this.KEYS[key]);
        }
        // Include resource metadata
        const metaKey = `${this.KEYS.PROGRESS}_meta`;
        allData[metaKey] = this.load(metaKey);
        return JSON.stringify(allData);
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            const validKeys = [...Object.values(this.KEYS), `${this.KEYS.PROGRESS}_meta`];
            for (const key in data) {
                if (validKeys.includes(key)) {
                    this.save(key, data[key]);
                }
            }
            return true;
        } catch (e) {
            console.error('Import failed', e);
            return false;
        }
    },

    clearAll() {
        Object.values(this.KEYS).forEach(key => localStorage.removeItem(key));
        localStorage.removeItem(`${this.KEYS.PROGRESS}_meta`);
    },

    // Global Stats for Dashboard
    getGlobalStats() {
        const progress = this.load(this.KEYS.PROGRESS, {});
        const projects = this.load(this.KEYS.PROJECTS, {});
        const income = this.load(this.KEYS.INCOME, []);

        let totalResources = 0;
        let completedResources = 0;

        // Sum up from careerData (available globally)
        if (typeof careerData !== 'undefined') {
            Object.keys(careerData.plans).forEach(planId => {
                careerData.plans[planId].phases.forEach(phase => {
                    totalResources += phase.resources.length;
                });
            });
        }

        Object.keys(progress).forEach(planId => {
            completedResources += progress[planId].length;
        });

        const activeProjects = Object.keys(projects).filter(id => projects[id].status !== 'completed' && projects[id].status !== 'deployed').length;

        // Sum regular income entries
        let totalIncome = income.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

        // ADD Project income earned
        Object.values(projects).forEach(pState => {
            if (pState.incomeEarned) {
                totalIncome += (parseFloat(pState.incomeEarned) || 0);
            }
        });

        return {
            totalResources,
            completedResources,
            activeProjects,
            totalIncome
        };
    }
};
