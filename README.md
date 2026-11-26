# EXHAIL — Digital Environment

A single-page artist website for EXHAIL, built as a static site for Cloudflare Pages.

## Included
- Cinematic transmission intro with subtle logo interference
- Original CSS-built architectural / digital environments (no album artwork used as page backgrounds)
- Single continuous scroll experience
- NET:VOID origin section
- Selected release cards and full SoundCloud playlist embed
- PL8LIST free-download destination
- Custom social / music connection hub for Instagram, Threads and SoundCloud
- Responsive navigation and reduced-motion support

## Files
- `index.html` — page structure and outbound links
- `styles.css` — visual system, environments and responsive layout
- `app.js` — boot sequence, scroll reveals, menu, and SoundCloud playlist widget integration
- `config.js` — optional future playlist proxy setting
- `releases.json` — reference list for the four local featured artworks
- `assets/` — EXHAIL logo and supplied release artwork

## Deploy with the existing Cloudflare Pages / GitHub setup
1. Open the `exhail-website` repository on GitHub.
2. Upload the contents of this folder to the repository root, replacing `index.html`, `styles.css`, `app.js`, `config.js`, and `README.md`.
3. Upload the `assets` folder contents, preserving the existing `assets/` folder and filenames.
4. Commit the changes to the `main` branch. Cloudflare Pages should start its automatic deployment.

Do not upload the outer ZIP file to the repository; extract it first.

## Important notes
- The SoundCloud iframe embeds the EXHAIL RELEASES playlist. The first four featured cards attempt to read playlist order through SoundCloud's Widget API. If SoundCloud does not return playlist data in a visitor's browser, the four supplied local featured cards remain as a fallback.
- `config.js` intentionally has no proxy URL configured. No server token, Instagram API, paid feed service, or third-party social-feed integration is used.
- Only confirmed profile destinations are included: Instagram, Threads, SoundCloud and PL8LIST. Add other streaming / social URLs once their exact destinations are confirmed.
- No YouTube or TikTok links are included.
