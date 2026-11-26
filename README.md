# EXHAIL // OFFICIAL SITE

An immersive, continuous artist website for EXHAIL, built around the black, white, electric-blue, cyan, grain, and restrained glitch language of the supplied release artwork. Original supplied SVG logo and release artwork are preserved.

## Preview
Open `index.html` in a browser with an internet connection. The SoundCloud playlist embed and its Widget API require internet access. The four supplied 1080×1080 artwork files are shown as a local fallback if SoundCloud's Widget API is unavailable. For the four supplied releases, the site prefers those full-resolution local files even when SoundCloud returns smaller artwork thumbnails.

## Selected Transmissions
The page uses the official SoundCloud Widget API against the embedded EXHAIL RELEASES playlist. It requests the playlist's sound list and renders the first four entries in the playlist's current order. Reordering the playlist should therefore reorder the four featured tiles automatically. This should be tested against the live playlist after deployment; SoundCloud controls availability and returned metadata.

## Free music
The OPEN FREQUENCY portal links directly to https://pl8list.com/exhail. Downloads remain hosted on PL8LIST; this site acts as the gateway.

## Deploy update
Upload/replace `index.html`, `styles.css`, and `app.js` in the root of the existing GitHub repository, then commit the changes. Cloudflare Pages should automatically deploy the new commit. The existing `assets/` folder and `config.js` remain required and unchanged.

## Identity update
EXHAIL was established in 2022. The opening boot sequence stages a short signal-interference / logo-materialization / identity-lock animation. The release covers remain release artwork only; section backgrounds are original CSS-generated environments inspired by their visual language, not cover images used as backgrounds. The EXHAIL logo is rendered with a bright white treatment and cyan glow for contrast.
