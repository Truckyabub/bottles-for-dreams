# Ninja Park

A polished website for the Ninja Park bottle drive & community fundraiser.

## Purpose

This site supports a local community fundraiser and bottle drive at Sunset Shores. It explains bottle collection, private support options, transparency, and contact details while keeping the project honest and safe.

## Files included

- `index.html` — homepage with mission, bottle bin details, private support, transparency, vision, disclaimer, and contact sections
- `styles.css` — responsive, accessible styling with sunset and forest-inspired colors
- `script.js` — lightweight script for progress placeholders and secure external links
- `DONATION_TRANSPARENCY.md` — transparency and funds usage guidance
- `PRIVACY_AND_SECURITY.md` — privacy, donation, and security policies
- `LAUNCH_CHECKLIST.md` — final review tasks before public launch
- `SECURITY.md` — privacy-first security statement
- `404.html` — GitHub Pages fallback page
- `WEBSITE_AUDIT.md` — audit report for this update

## What changed

- Rebuilt the main page to match the required Ninja Park sections and wording.
- Improved accessibility with a skip link, keyboard focus styles, and responsive layout.
- Added clear disclaimers that this is a community fundraiser, not a registered charity (unless status is confirmed).
- Updated documentation files for launch readiness, privacy, transparency, and security.

## Remaining placeholders

- `[Add exact bin directions here]`
- `[Add contact email here]`
- `[insert goal]`
- `[insert amount]`
- `[insert milestone]`
- `[Organizer name or group]`
- `[Optional phone placeholder]`
- `[Social media placeholder]`

## Preview locally

1. Open `index.html` in a modern browser.
2. For a local server preview, run:
   - `python3 -m http.server 8000`
   - open `http://localhost:8000`

## Publish with GitHub Pages

1. Confirm all placeholders are updated.
2. Change the robots meta tag in `index.html` from `noindex, nofollow` to `index, follow` when the campaign is ready to publish publicly.
3. Commit your changes and push to GitHub:
   - `git add .`
   - `git commit -m "Publish Ninja Park site with launch-ready content"`
   - `git push origin main`
4. Ensure GitHub Pages is enabled for the `main` branch and root folder.
5. Verify the live site at `https://<username>.github.io/<repository>/`.
