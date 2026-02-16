# Pathweaver Career Architect ✨

A professional, offline-capable career development tracking website.

## Features
- **3 Career Paths**: Cybersecurity, Django Development, IT Support.
- **Progress Tracking**: Checkboxes, progress bars, and localized data storage.
- **Ugandan Context**: Curated list of local hubs and job boards.
- **Zero Dependencies**: Pure HTML, CSS, JS. No npm install needed.
- **Dark/Light Mode**: Automatic theme switching.

## How to Use
1. **Open**: Double-click `index.html` to open in any browser.
2. **Track**: Navigate to your plan (e.g., Plan A) and check off resources as you complete them.
3. **Persist**: Your progress is saved automatically to your browser's LocalStorage. content will remain even if you close the browser.
4. **Backup**: Click "Export Data" in the footer to download a JSON backup of your progress. Use "Import Data" to restore it on another device.

## Deployment
This site is static and can be hosted for free anywhere.

### GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to Settings > Pages.
3. Select "Deploy from Branch" > "main" > "root".
4. Save. Your site will be live in seconds.

### Netlify
1. Drag and drop this entire folder into the Netlify Drop area.
2. Done!

## Customization
- **Data**: Edit `js/data.js` to change courses, add new plans, or update links.
- **Styles**: Edit `css/styles.css` to change colors (look for `:root` variables).

## Troubleshooting
- **Logo not showing?** Ensure `assets/logo.svg` exists.
- **Progress lost?** Ensure you are not browsing in "Incognito/Private" mode, as LocalStorage is cleared when closing private windows.

---
Built with ❤️ for Ugandan Tech Talent.
