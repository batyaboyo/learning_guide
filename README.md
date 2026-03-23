# Pathweaver Career Architect

Pathweaver is a static career planning and progress-tracking web app for cybersecurity and data analyst learners.

It combines:

- Structured learning paths
- Project-based skill building
- PDF-derived roadmap guidance
- Global and country-based opportunity discovery

## What Is Included

- **Two full learning tracks**
	- Cybersecurity Path (SOC -> DFIR -> Pentesting -> Red Teaming -> AI Security)
	- Data Analyst Path (Excel -> SQL -> Python -> Dashboards -> Storytelling)
- **Progress tracking**
	- Resource checkboxes and per-phase progress bars
	- Dashboard-level total progress and completion summaries
- **Roadmap intelligence from uploaded PDFs**
	- Checkpoint timelines
	- Skill clusters to master
	- Beginner and advanced certification suggestions
- **Opportunities Hub (global + country)**
	- Global job boards, communities, scholarships, and freelance platforms
	- Country-focused resources with continent filtering
	- "Show only verified recently" toggle
	- Freshness labels based on verification dates
- **Project Forge**
	- Track project status (not started, in progress, completed, deployed)
	- Save notes, time invested, deployment links, and completed project steps
- **Search**
	- Unified search across plans, resources, tools, projects, and opportunities
- **Data portability**
	- Export/import local progress as JSON backup files
- **No build step**
	- Pure HTML/CSS/JavaScript (no npm install required)

## Quick Start

1. Open `index.html` in your browser.
2. Use the sidebar to switch between Dashboard, Plans, Projects, and Opportunities Hub.
3. Mark resources as complete and use notes for your learning log.
4. Use Export Data to create a backup of your local progress.

## Keyboard Shortcuts

- `Ctrl+K` (or `Cmd+K`): focus search
- `1`: Dashboard
- `2`: Cybersecurity plan
- `3`: Data Analyst plan
- `4`: Projects
- `5`: Opportunities Hub

## Data Storage

Progress is saved in browser LocalStorage. Current app keys include:

- `pathweaver_progress`
- `pathweaver_settings`
- `pathweaver_projects`
- `pathweaver_progress_meta`

If you clear browser storage or use private/incognito windows, data may be lost.

## Project Structure

- `index.html` - app shell and layout
- `css/styles.css` - visual design and responsive styling
- `js/data.js` - plans, projects, roadmap insights, opportunities data
- `js/storage.js` - LocalStorage logic, migrations, import/export
- `js/app.js` - app state, rendering, search, interactions
- `manifest.json` - installable web manifest metadata

## Deployment

This is a static site and can be deployed on any static host.

### GitHub Pages

1. Push the repository to GitHub.
2. Go to repository Settings -> Pages.
3. Choose "Deploy from a branch" and select `main` / root.
4. Save.

### Netlify

1. Drag and drop the project folder into Netlify Drop.
2. Site is deployed immediately.

## Screenshots

Recommended captures for documentation:

- Dashboard (overall progress + roadmap highlights)
- Cybersecurity plan (phase cards + checklist)
- Data Analyst plan (phase cards + checklist)
- Project Forge (filters + project cards)
- Opportunities Hub (continent/country filters + verified-only toggle)

Suggested naming convention if you add image files:

- `assets/screenshots/dashboard.png`
- `assets/screenshots/plan-cybersecurity.png`
- `assets/screenshots/plan-data-analyst.png`
- `assets/screenshots/projects.png`
- `assets/screenshots/opportunities-hub.png`

## Changelog

### 2026-03-23

- Added roadmap intelligence sourced from uploaded PDF roadmaps.
- Added dashboard roadmap highlight cards for both career tracks.
- Added plan-level checkpoint timelines, skill clusters, and certification tracks.
- Expanded opportunities from local-only to global plus country-based coverage.
- Added continent and country filtering in the Opportunities Hub.
- Added freshness labels and a verified-recently filter toggle for opportunities.
- Extended global search to include opportunities and continent-linked results.

## Notes

- A web manifest is included.
- A service worker is not included, so full offline behavior is browser-cache dependent.

## Customization

- Update learning content and opportunities in `js/data.js`.
- Update theme and component styles in `css/styles.css`.
- Extend behavior and views in `js/app.js`.

---

Built for practical, high-momentum career growth.
