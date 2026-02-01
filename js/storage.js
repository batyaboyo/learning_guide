const Storage = {
    // Keys
    KEYS: {
        PROGRESS: 'techpath_progress',
        INCOME: 'techpath_income',
        SETTINGS: 'techpath_settings',
        HABITS: 'techpath_habits',
        PROJECTS: 'techpath_projects'
    },

    // Initialize/Load Data
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
            allData[key] = this.load(this.KEYS[key]);
        }
        return JSON.stringify(allData);
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            for (const key in data) {
                if (Object.values(this.KEYS).includes(key)) {
                    this.save(key, data[key]);
                }
            }
            return true;
        } catch (e) {
            console.error('Import failed', e);
            return false;
        }
    }
};
