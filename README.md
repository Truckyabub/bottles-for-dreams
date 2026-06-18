# Pa’s Place

Pa’s Place is a static family tribute website honouring George Alexander Carey, lovingly known as Pa George. It is designed as a respectful home for family stories, verified tournament details, sponsor recognition, photo memories, and the ongoing Pa George 9-Ball Tournament legacy.

## Open Locally

You can open `index.html` directly in a browser.

### Mac
1. Open the folder in Finder.
2. Double-click `index.html`.

### Windows
1. Open the folder in File Explorer.
2. Double-click `index.html`.

### Linux
1. Open the folder in your file manager.
2. Double-click `index.html`.

No build step is required.

## File Structure

- `index.html` - main website
- `styles.css` - screen styling
- `script.js` - menu, gallery, copy, print, and accessibility behavior
- `assets/css/print.css` - print-only event poster styling
- `assets/images/` - family-approved photos, if added later
- `CONTENT_GUIDE.md` - prompts and copy templates for family updates
- `PRIVACY_AND_SAFETY.md` - safety checklist before publishing
- `.nojekyll` - GitHub Pages compatibility marker

## How To Edit Text

Most content lives in `index.html`.

Edit these sections directly:
- Hero text and buttons
- About Pa George
- Tournament Legacy timeline
- Event info
- Sponsors
- Charity / giving back
- Memory wall
- Contact section

Keep the placeholder warnings in place until the family confirms the details.

## How To Replace Photos

Put approved images in `assets/images/` and keep the filenames in `index.html` aligned with the image files.

Current placeholder filenames:
- `assets/images/pa-george-1.jpg`
- `assets/images/tournament-1.jpg`
- `assets/images/family-1.jpg`
- `assets/images/players-1.jpg`
- `assets/images/sponsors-1.jpg`
- `assets/images/community-1.jpg`

If an image is missing, the site will show a styled placeholder card instead of breaking the layout.

## How To Update Tournament Date

Edit the Event Info section in `index.html`:
- Date
- Time
- Location
- Registration
- Entry Fee
- Contact
- Charity Recipient
- Silent Auction
- Sponsors

Only publish confirmed details.

## How To Add Sponsors

Replace the placeholder sponsor cards in the Sponsors section with family-approved names.

Do not add:
- fake logos
- unconfirmed business names
- sponsor claims without permission

## How To Update Charity Information Safely

Only list a charity once the family and partner organization have confirmed it.

Do not add:
- donation forms
- payment links
- e-transfer details
- totals that have not been verified

## GitHub Pages Deployment

From the project folder, run:

```bash
git init
git add .
git commit -m "Initial commit: Pa's Place website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pas-place.git
git push -u origin main
```

Then open the repository on GitHub and go to:

`Settings -> Pages -> Source: main branch / root folder`

The live URL will follow this format:

`https://YOUR_USERNAME.github.io/pas-place/`

## What Must Be Verified Before Publishing

- Life dates
- Family story text
- Favourite sayings
- Tournament history
- Event date, time, and location
- Registration and entry fee
- Charity recipient
- Sponsor names
- Silent auction details
- Contact email
- Photo permissions

## Update The Memory Wall

Edit the Memory Wall cards in `index.html` and only publish stories that the family has approved.

Keep the author name accurate and permission-based.

## Testing Checklist

- Open the site locally
- Check the mobile menu
- Check keyboard focus states
- Open and close gallery items
- Press Escape to close the gallery
- Copy event details
- Trigger print preview
- Confirm the back-to-top button works
- Resize from mobile to desktop
- Confirm there are no broken links

## Troubleshooting

- If a photo is missing, the placeholder card should appear automatically.
- If the menu does not open on mobile, check `script.js` for console errors.
- If print preview looks wrong, check `assets/css/print.css`.
- If a link seems dead, confirm the section ID or file path.

## Support And Maintenance

This is intended to be easy for family members to update without a developer. Keep edits small, verify every public detail, and preserve the respectful tone.

## Annual Update Checklist

- Refresh tournament details
- Update sponsor cards
- Add approved photos
- Add memory wall stories
- Verify charity information
- Review privacy and safety checklist
- Test mobile layout again

## License And Permissions

This site is a family legacy project. Only publish content that the Carey family has approved and that you have the right to use.
