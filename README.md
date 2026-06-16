# Ninja Park Bottle Drive Fundraiser

A fully static GitHub Pages site for the Ninja Park Bottle Drive Fundraiser. The site is built for privacy and mobile responsiveness, with no backend, no analytics, and no tracking.

## What is included

- `index.html` — single-page responsive website
- `styles.css` — accessible styling and layout
- `script.js` — three built-in games: Bottle Catch, Recycle Sorter, Memory Match
- `SECURITY.md` — vulnerability reporting and privacy policy notes
- `LAUNCH_CHECKLIST.md` — publish and verification checklist
- `404.html` — custom GitHub Pages not found page
- `.nojekyll` — disables Jekyll processing on GitHub Pages

## Publish instructions

1. Confirm the repository uses the `main` branch.
2. Confirm the site files are at the repository root (`/`).
3. In GitHub, open the repository `Settings` > `Pages`.
4. Under Source, select `main` branch and `/ (root)` folder.
5. Save and wait for GitHub Pages to generate the site.
6. Visit the provided GitHub Pages URL.
7. Test the homepage, games, and custom `404.html` page.

## Local preview

Open `index.html` in a browser or use a local HTTP server if needed.

### Example local preview command

```bash
cd /Users/mufasa/Documents/GitHub/bottles-for-dreams
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Privacy and design notes

- No external scripts, fonts, or analytics are used.
- No forms send data to a backend.
- All game logic runs client-side in the browser.
- Section links and anchors are verified in the static page.
