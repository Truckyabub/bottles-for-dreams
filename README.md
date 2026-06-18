# Ninja Park

A polished website for the Ninja Park bottle drive & community fundraiser.

## Purpose

This site supports a local community fundraiser and bottle drive at Sunset Shores. It explains bottle collection, private support options, transparency, and contact details while keeping the project honest and safe.

## Files included

- `index.html` — homepage with mission, bottle bin details, support options, safety messaging, and preview disclaimers
- `styles.css` — responsive, accessible styling with a nature-inspired theme
- `script.js` — lightweight interactive preview and secure browser behavior
- `DONATION_TRANSPARENCY.md` — transparency and funds usage guidance
- `PRIVACY_AND_SECURITY.md` — privacy, donation, and security policies
- `DONATION_POLICY.md` — ethical donation guidance for the community project
- `CHILD_SAFETY_AND_ETHICS.md` — child safety, privacy, and ethics commitments
- `CULTURAL_RESPECT.md` — cultural humility and Indigenous respect guidance
- `ACCESSIBILITY_CHECKLIST.md` — accessibility review and checklist
- `FOUNDATION_GOVERNANCE.md` — governance and real-world confirmation guidance
- `LAUNCH_CHECKLIST.md` — final review tasks before public launch
- `SECURITY.md` — privacy-first security statement
- `404.html` — GitHub Pages fallback page
- `WEBSITE_AUDIT.md` — audit report for this update

## What changed

- Rebuilt the main page to match the required Ninja Park sections and wording.
- Improved accessibility with a skip link, keyboard focus styles, and responsive layout.
- Added clear disclaimers that this is a community fundraiser, not a registered charity (unless status is confirmed).
- Updated documentation files for launch readiness, privacy, transparency, and security.

## Preview status

This is a preview website for the Ninja Park community project. Official launch details such as exact bottle bin directions, contact information, and donation program details are intentionally withheld until confirmed by the project organizers.

## Preview locally

1. Open `index.html` in a modern browser.
2. For a local server preview, run:
   - `python3 -m http.server 8000`
   - open `http://localhost:8000`

## Publish with GitHub Pages

1. Confirm all project details are updated.
4. Confirm the robots meta tag in `index.html` is changed from `noindex, nofollow` to `index, follow` only when the campaign is ready to publish publicly.
3. Commit your changes and push to GitHub:
   - `git add .`
   - `git commit -m "Publish Ninja Park site with launch-ready content"`
   - `git push origin main`
4. Ensure GitHub Pages is enabled for the `main` branch and root folder.
5. Verify the live site at `https://<username>.github.io/<repository>/`.
